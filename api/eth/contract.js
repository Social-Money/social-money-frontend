// import web3 from './web3'
import SocialMoneyFactoryJsonData from './SocialMoneyFactory.json'
import SocialMoneyJsonData from './SocialMoney.json'
import UniswapFactoryABI from './uniswap_factory.json'

const factoryAddress = '0x57DAE729e185B0b7e22636F6d4D3214c800C086b' // THE CONTRACT ADDRESS
const uniswapFactoryAddress = '0x09cc1a1c32b4adcff81fa3b44a142d6e023bc2eb' // THE CONTRACT ADDRESS

export default {
  factoryContractInstance() {
    const instance = new window.web3.eth.Contract(SocialMoneyFactoryJsonData.abi, factoryAddress)
    return instance
  },
  erc20Instance(_address) {
    const instance = new window.web3.eth.Contract(SocialMoneyJsonData.abi, _address)
    return instance
  },
  uniswapFactoryInstance() {
    const instance = new window.web3.eth.Contract(UniswapFactoryABI, uniswapFactoryAddress)
    return instance
  }

}
