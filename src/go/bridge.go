package main

import "syscall/js"

var (
	// bridgeName is the namesace for all functions and values set.
	//
	// The returning JavaScript proxy via the webpack loader will look for functions and values under this namespace.
	bridgeName = "__go_wasm__"

	// The JS object of the __go_wasm__ value.
	bridge js.Value

	// Wrapper is a simple JS function that when called with a Go Function, will return a new function that will throw
	// if the property `error` is an instance of JavaScript's `error`.
	//
	// All Go functions in the bridgeName proxy are expected to be the result of calling wrapper with the Go function.
	wrapper js.Value
)

// newReturnValue creates an object with the value as the result.
// See wrapGoFunc for the reasoning behind style style of returning values from Go functions.
func newReturnValue(value interface{}) js.Value {
	jsObject := js.Global().Get("Object").New()
	jsObject.Set("result", value)

	return jsObject
}

// newReturnError creates an object with the goError's message and creates a Javascript Error object with the message.
//
// See wrapGoFunc for the reasoning behind style style of returning values from Go functions.
func newReturnError(goErr error) js.Value {
	jsObject := js.Global().Get("Object").New()
	jsError := js.Global().Get("Error")
	jsObject.Set("error", jsError.New(goErr.Error()))

	return jsObject
}

// Using this wrapper makes it possible to throw errors in go-fashion.
// This means that all wrapped functions must return value and an error (respectively).
//
// The __wrapper__ function from JS will automatically throw if the returned object has an 'error' property.
// Inversely, it will automatically give the result value if that property exists.
// All Go functions directly returned via wasm should keep this in mind.
func wrapGoFunc(f func(js.Value, []js.Value) (interface{}, error)) js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		res, err := f(this, args)
		if err != nil {
			return newReturnError(err)
		}

		return newReturnValue(res)
	})
}

func setFunc(name string, f func(js.Value, []js.Value) (interface{}, error)) {
	bridge.Set(name, wrapper.Invoke(wrapGoFunc(f)))
}

func setValue(name string, value interface{}) {
	bridge.Set(name, value)
}

// Toggling the __ready__ value in the bridge lets JS know that everything is setup.
// Setting __ready__ to true can help prevent possible race conditions of Wasm being called before everything is
// registered, and potentially crashing applications.
func ready() {
	bridge.Set("__ready__", true)
	<-make(chan bool, 0) // To use anything from Go WASM, the program may not exit.
}

// We want to make sure that this is always ran first. This means that we can make sure that whenever functions are
// initialized, they are able to be set to the bridge and wrapper.
func init() {
	bridge = js.Global().Get(bridgeName)
	wrapper = bridge.Get("__wrapper__")
}
