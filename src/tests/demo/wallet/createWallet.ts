import { WalletAPI } from "api";
import { HebaoAPI } from "api/hebap_api";
import { NetworkWallet } from "defs";
import { DEFAULT_TIMEOUT } from "tests/MockData";

const getAppConfig = async () => {
  const api = new WalletAPI({
    baseUrl: 'http://aa65c5ccf949448559c0dc8c814e2d4c-1601735065.us-east-2.elb.amazonaws.com',
    chainId: 1,
  })
  const response: any = await api
    .getHebaoConfig({
      network: NetworkWallet.GOERLI
    })
  const networkConfig = JSON.parse(response.raw_data.networkConfigsJsonString) 
  const GOERLIConfig = JSON.parse(networkConfig.GOERLI) 
  return GOERLIConfig as any
}

it(
  'createWallet1',
  async () => {
    const api = new HebaoAPI({
      baseUrl: 'http://aa65c5ccf949448559c0dc8c814e2d4c-1601735065.us-east-2.elb.amazonaws.com',
      chainId: 1,
    })
    const owner = '0x7db25c006CC266916f805972605D88D0b479BF4f'
    const salt = '7';
    const ecdsaPrivateKey = '073dff6ee3a6130d0ba104538be27559e4d78742814b472bb72e89568ea1a37a'
    const {address: wallet} = await api.computeWalletAddress({
      network: 'GOERLI',
      owner,
      salt,
    })
    const requestId = '7db25c006CC266916f805972605D88D0b479BF4f' + new Date().getTime()
    const email = 'jingguo.li.uk@gmail.com';
    const isWaitDeposit = false
    const response = await api
      .lockCreateWalletGasSettings(
        {
          owner,
          salt,
          wallet: wallet,
          requestId,
          // : '7db25c006CC266916f805972605D88D0b479BF4f17024663200251',
          authentication: {
            email
          },
          network: 'GOERLI',
          isWaitDeposit
        },
        ecdsaPrivateKey
      )
    console.log(response.data)


    const config = await getAppConfig()
    // const owner = '0x7db25c006CC266916f805972605D88D0b479BF4f'
    // const wallet = '0xE1B54BD415Dfbb3EE39d15C74a3d1005e8B2F5AF'
    const walletFactoryAddress = config.latestWalletFactory
    
    const feeAmount = response.data.base.gasPrices[zeroAddress()]
    const guardians = [config.officialGuardian]
    const inheritor = zeroAddress()
    const feeRecipient = config.feeRecipient
    const feeToken = zeroAddress()
    const quota = BigNumber.from('0') 
    // const salt = formatBytes32String("0x5");
    const maxFeeAmount = parseEther('0.1');
    const { txSignature } = signCreateWallet(
      walletFactoryAddress,
      owner,
      guardians,
      quota,
      inheritor,
      feeRecipient,
      feeToken,
      maxFeeAmount,
      salt,
      ecdsaPrivateKey,
      5
    )
    const createWalletData = new Interface(walletFactory).encodeFunctionData('createWallet', [
      {
        owner,
        guardians,
        quota,
        inheritor,
        feeRecipient,
        feeToken,
        salt,
        maxFeeAmount,
        signature: Buffer.from(txSignature.slice(2), "hex")
      },
      feeAmount
    ])

    const input1 = {
      owner,
      salt,
      requestId,
      authentication: {
        email
      },
      network: 'GOERLI',
      data: createWalletData,
      from: wallet,
      to: wallet,
      isWaitDeposit
    } 
    
    const askdlaksld: any = await api
      .createWallet(
        input1,
        '073dff6ee3a6130d0ba104538be27559e4d78742814b472bb72e89568ea1a37a'
      )
      // 
      if (askdlaksld.data.actionResult === 'CHALLENGE') {
        const securityId = askdlaksld.data.securityResult.securityId
        console.log('requestId', requestId)
        console.log('securityId', securityId)
        console.log('input1', JSON.stringify(input1))
        debugger

        // debugger
        // api.verifyCode({
        //   securityId
        // })

        // const readline = require('readline').createInterface({
        //   input: process.stdin,
        //   output: process.stdout,
        // });
        // readline.question(`What's your name?`, (name: string) => {
        //   console.log(`Hi ${name}!`);
        //   readline.close();
        // });

      }
    
    // console.log(askdlaksld)
  },
  DEFAULT_TIMEOUT,
)
it(
  'createWallet2',
  async () => {
    const api = new HebaoAPI({
      baseUrl: 'http://aa65c5ccf949448559c0dc8c814e2d4c-1601735065.us-east-2.elb.amazonaws.com',
      chainId: 1,
    })
    const response = await api.verifyCode({
      securityId: 'fECv3S0GGz2K',
      code: '972517'
    })
debugger
  },
  DEFAULT_TIMEOUT,
)
it(
  'createWallet3',
  async () => {
    const api = new HebaoAPI({
      baseUrl: 'http://aa65c5ccf949448559c0dc8c814e2d4c-1601735065.us-east-2.elb.amazonaws.com',
      chainId: 1,
    })
    const securityId = 'ijX5I2wDYlHv'
    const inputStr = '{"owner":"0x7db25c006CC266916f805972605D88D0b479BF4f","salt":"7","requestId":"7db25c006CC266916f805972605D88D0b479BF4f1703579460944","authentication":{"email":"jingguo.li.uk@gmail.com"},"network":"GOERLI","data":"0xd92d1f5600000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000a7d8c00000000000000000000000007db25c006cc266916f805972605d88d0b479bf4f0000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000dfa9b2ab43b881430b6f52122618cc6b8f3a2c90000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000016345785d8a0000000000000000000000000000000000000000000000000000000000000000000700000000000000000000000000000000000000000000000000000000000001600000000000000000000000000000000000000000000000000000000000000001000000000000000000000000f7410703db972ef5926a6f5514d3d87fbb697d4900000000000000000000000000000000000000000000000000000000000000421993f78ef918105a06cd8e8e7411f1ee4b74a55d1f065fc24a694c5cccbf38f807c2510a5d719d2c500342b19ac2954ae402b0bcb4db9c959bf7bb5c33bd0b181c02000000000000000000000000000000000000000000000000000000000000","from":"0x55c1c111ca947e9de7980c18ca0d939d907aa3d7","to":"0x55c1c111ca947e9de7980c18ca0d939d907aa3d7","isWaitDeposit":false}'
    const input1 = JSON.parse(inputStr)
    const askdlaksld: any = await api
      .createWallet(
        {...input1, securityId},
        '073dff6ee3a6130d0ba104538be27559e4d78742814b472bb72e89568ea1a37a'
      ).catch(e => {
        debugger
      })
      debugger

    // console.log(askdlaksld)
  },
  DEFAULT_TIMEOUT,
)
it(
  'createWallet4',
  async () => {
    const api = new HebaoAPI({
      baseUrl: 'http://aa65c5ccf949448559c0dc8c814e2d4c-1601735065.us-east-2.elb.amazonaws.com',
      chainId: 1,
    })
    // const securityId = 'QzeOYrkas8yf'
    // const inputStr = '{"owner":"0x7db25c006CC266916f805972605D88D0b479BF4f","salt":"0x5","requestId":"7db25c006CC266916f805972605D88D0b479BF4f1702613500158","authentication":{"email":"jingguo.li.uk@gmail.com"},"network":"GOERLI","data":"0xd92d1f5600000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000cdfe600000000000000000000000007db25c006cc266916f805972605d88d0b479bf4f0000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000dfa9b2ab43b881430b6f52122618cc6b8f3a2c900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000cdfe60000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000001600000000000000000000000000000000000000000000000000000000000000001000000000000000000000000f7410703db972ef5926a6f5514d3d87fbb697d49000000000000000000000000000000000000000000000000000000000000004288df0d3ec6f81d162ec70825dd07422ed07a63af9dcf883b171a377f5af2bbae7cad644e2370e53808ff7765f09f6a5f649e859c77e2907cb13d7849197ea9191c02000000000000000000000000000000000000000000000000000000000000","from":"0x4Df502382C241c23E686110a927E46413deA51C4","to":"0x4Df502382C241c23E686110a927E46413deA51C4"}'
    // const input1 = JSON.parse(inputStr)
    const askdlaksld = await api
      .getWallet(
        {network: 'GOERLI', owner: "0x7db25c006CC266916f805972605D88D0b479BF4f", wallet: '0x55c1c111ca947e9de7980c18ca0d939d907aa3d7', timestamp: new Date().getTime()},
        '073dff6ee3a6130d0ba104538be27559e4d78742814b472bb72e89568ea1a37a'
      )
    // askdlaksld.apiKey
    debugger

    // console.log(askdlaksld)
  },
  DEFAULT_TIMEOUT,
)
it(
  'createWallet5',
  async () => {
    const api = new HebaoAPI({
      baseUrl: 'http://aa65c5ccf949448559c0dc8c814e2d4c-1601735065.us-east-2.elb.amazonaws.com',
      chainId: 1,
    })
    // activateCreateWalletGasSettings
    // const securityId = 'QzeOYrkas8yf'
    // const inputStr = '{"owner":"0x7db25c006CC266916f805972605D88D0b479BF4f","salt":"0x5","requestId":"7db25c006CC266916f805972605D88D0b479BF4f1702613500158","authentication":{"email":"jingguo.li.uk@gmail.com"},"network":"GOERLI","data":"0xd92d1f5600000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000cdfe600000000000000000000000007db25c006cc266916f805972605d88d0b479bf4f0000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000dfa9b2ab43b881430b6f52122618cc6b8f3a2c900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000cdfe60000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000001600000000000000000000000000000000000000000000000000000000000000001000000000000000000000000f7410703db972ef5926a6f5514d3d87fbb697d49000000000000000000000000000000000000000000000000000000000000004288df0d3ec6f81d162ec70825dd07422ed07a63af9dcf883b171a377f5af2bbae7cad644e2370e53808ff7765f09f6a5f649e859c77e2907cb13d7849197ea9191c02000000000000000000000000000000000000000000000000000000000000","from":"0x4Df502382C241c23E686110a927E46413deA51C4","to":"0x4Df502382C241c23E686110a927E46413deA51C4"}'
    // const input1 = JSON.parse(inputStr)
    const requestId = '7db25c006CC266916f805972605D88D0b479BF4f' + new Date().getTime()
    console.log('requestId', requestId)
    const askdlaksld: any = await api.activateCreateWalletGasSettings(
      {
        email: 'jingguo.li.uk@gmail.com',
        network: 'GOERLI',
        owner: '0x7db25c006CC266916f805972605D88D0b479BF4f',
        wallet: '0x55C1C111cA947E9DE7980c18ca0D939d907Aa3D7',
        requestId
      },
      '073dff6ee3a6130d0ba104538be27559e4d78742814b472bb72e89568ea1a37a',
    )
    const input2 = {
      owner: '0x7db25c006CC266916f805972605D88D0b479BF4f',
      // email: 'jingguo.li.uk@gmail.com',
      network: 'GOERLI',
      from: '0x55C1C111cA947E9DE7980c18ca0D939d907Aa3D7',
      requestId
    }
    console.log('input2', JSON.stringify( input2))
    const b = await api.activateCreateWallet(input2, '073dff6ee3a6130d0ba104538be27559e4d78742814b472bb72e89568ea1a37a').catch(e => {
      debugger
    })
    debugger

    // console.log(askdlaksld)
  },
  DEFAULT_TIMEOUT,
)
it.only(
  'createWallet6',
  async () => {
    const api = new HebaoAPI({
      baseUrl: 'http://aa65c5ccf949448559c0dc8c814e2d4c-1601735065.us-east-2.elb.amazonaws.com',
      chainId: 1,
    })
    // activateCreateWalletGasSettings
    // const securityId = 'QzeOYrkas8yf'
    // const inputStr = '{"owner":"0x7db25c006CC266916f805972605D88D0b479BF4f","salt":"0x5","requestId":"7db25c006CC266916f805972605D88D0b479BF4f1702613500158","authentication":{"email":"jingguo.li.uk@gmail.com"},"network":"GOERLI","data":"0xd92d1f5600000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000cdfe600000000000000000000000007db25c006cc266916f805972605d88d0b479bf4f0000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000dfa9b2ab43b881430b6f52122618cc6b8f3a2c900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000cdfe60000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000001600000000000000000000000000000000000000000000000000000000000000001000000000000000000000000f7410703db972ef5926a6f5514d3d87fbb697d49000000000000000000000000000000000000000000000000000000000000004288df0d3ec6f81d162ec70825dd07422ed07a63af9dcf883b171a377f5af2bbae7cad644e2370e53808ff7765f09f6a5f649e859c77e2907cb13d7849197ea9191c02000000000000000000000000000000000000000000000000000000000000","from":"0x4Df502382C241c23E686110a927E46413deA51C4","to":"0x4Df502382C241c23E686110a927E46413deA51C4"}'
    // const input1 = JSON.parse(inputStr)
    const input2 = '{"owner":"0x7db25c006CC266916f805972605D88D0b479BF4f","network":"GOERLI","from":"0x55C1C111cA947E9DE7980c18ca0D939d907Aa3D7","requestId":"7db25c006CC266916f805972605D88D0b479BF4f1703580809276"}'
    const securityId = 'fECv3S0GGz2K'
    const b = await api.activateCreateWallet({...JSON.parse(input2), data: '0xd92d1f5600000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000a7d8c00000000000000000000000007db25c006cc266916f805972605d88d0b479bf4f0000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000dfa9b2ab43b881430b6f52122618cc6b8f3a2c90000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000016345785d8a0000000000000000000000000000000000000000000000000000000000000000000700000000000000000000000000000000000000000000000000000000000001600000000000000000000000000000000000000000000000000000000000000001000000000000000000000000f7410703db972ef5926a6f5514d3d87fbb697d4900000000000000000000000000000000000000000000000000000000000000421993f78ef918105a06cd8e8e7411f1ee4b74a55d1f065fc24a694c5cccbf38f807c2510a5d719d2c500342b19ac2954ae402b0bcb4db9c959bf7bb5c33bd0b181c02000000000000000000000000000000000000000000000000000000000000', securityId}, '073dff6ee3a6130d0ba104538be27559e4d78742814b472bb72e89568ea1a37a').catch(e => {
      debugger
    })
    debugger

    // console.log(askdlaksld)
  },
  DEFAULT_TIMEOUT,
)