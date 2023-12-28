package main

func main() {
	setFunc("getEddsaSigNftOrder", getEddsaSigNftOrder)
	setFunc("getLockHashAndEddsaSignature", getLockHashAndEddsaSignature)
	setFunc("generateKeyPair", generateKeyPair)
	setFunc("signRequest", signRequest)
	setFunc("getEdDSASigWithPoseidon",getEdDSASigWithPoseidon)
	setFunc("genSigWithPadding",genSigWithPadding)
	setFunc("getEdDSASigWithPoseidonHash",getEdDSASigWithPoseidonHash)
	ready()
}

