/* tslint:disable */
// @ts-nocheck
import { addHexPrefix, clearHexPrefix, toBuffer, toHex } from '../../../utils/formatter'
import ethereumjsAbi from 'ethereumjs-abi'
import BN from 'bn.js'

export class AbiFunction {
  name
  inputTypes
  inputs
  outputTypes
  outputs
  constant
  methodAbiHash
  constructor({ inputs, name, outputs, constant }: any) {
    this.name = name
    this.inputTypes = inputs.map(({ type }) => type)
    this.inputs = inputs
    this.outputTypes = outputs.map(({ type }) => type)
    this.outputs = outputs
    this.constant = constant
    this.methodAbiHash = toHex(ethereumjsAbi.methodID(name, this.inputTypes))
  }

  /**
   * @description Returns encoded methodId and inputs
   * @param inputs Object, examples {owner:'0x000...}
   * @returns {string}
   */
  encodeInputs(inputs) {
    const abiInputs = this.parseInputs(inputs)
    return this.methodAbiHash + clearHexPrefix(toHex(ethereumjsAbi.rawEncode(this.inputTypes, abiInputs)))
  }

  /**
   * @description decode ethereum jsonrpc response result
   * @param outputs
   * @returns {*}
   */
  decodeOutputs(outputs) {
    return this.parseOutputs(ethereumjsAbi.rawDecode(this.outputTypes, toBuffer(outputs)))
  }

  /**
   * @description decode encoded inputs
   * @param encoded
   * @returns {*}
   */
  decodeEncodedInputs(encoded) {
    return this.parseOutputs(ethereumjsAbi.rawDecode(this.inputTypes, toBuffer(addHexPrefix(encoded))))
  }

  parseInputs(inputs = {}) {
    return this.inputs.map(({ name, type }) => {
      if (inputs[name] === undefined) {
        throw new Error(`Parameter ${name} of type ${type} is required!`)
      }
      return inputs[name]
    })
  }

  parseOutputs(outputs) {
    return outputs.map((output) => {
      if (output instanceof BN) {
        return toHex(output)
      }
      return output
    })
  }
}
