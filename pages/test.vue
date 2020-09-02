<template>
  <div>
    <button @click="getEarned">get earned</button>
    <button @click="approve">approve</button>
    <br>
    <button @click="stake">stake</button>
    <br>
    <button @click="getReward">getReward</button>
    <br>
    <button @click="withdraw">withdraw</button>
    <br>
    <button @click="notifyRewardAmount">notifyRewardAmount</button>
    <!-- <div class="grid-wrapper no-overflow">
      <div class="m-grid is-animating"></div>
    </div> -->
  </div>
</template>
<script>
// import Web3 from 'web3'
// import yamABI from '@/api/eth/yam.json'
import { MaxUint256 } from '@ethersproject/constants'

import YAMETH from '@/api/eth/YAMETHPool.json'
import WETH from '@/api/eth/WETH.json'
export default {
  name: 'Test',
  data() {
    return {
      YAMETHPoolAddress: '0x3f76b69cc30423fCbF26a4fcDD970eFA33cEb34D',
      stakedTokenAddress: '0x22Ab8313899FF0933466b215d74f91bcC136Ae3C'
      // YAMETHPoolAddress: '0xdb7Db117fe445923aa480C12429b58Ea0c5D4788'
      // YAMETHPoolAddress: '0xB1b5710aC0cEB194490daE47BFEc3D8230e0E17b' // sqrt version
    }
  },
  mounted() {
    /* const infuraKey = 'e25357f98f9446e3bbdca110b0fefdf1'
    // const tokenAddress = '0xAba8cAc6866B83Ae4eec97DD07ED254282f6aD8A'
    const YAMETHPoolAddress = '0xF24A7C90d0EAd647022AF922Fe994E063080beF2'

    const ApiEndpoint = `https://mainnet.infura.io/v3/${infuraKey}`
    const WssEndpoint = `wss://mainnet.infura.io/ws/v3/${infuraKey}`
    const HttpProvider = new Web3.providers.HttpProvider(ApiEndpoint)
    const WebsocketProvider = new Web3.providers.WebsocketProvider(WssEndpoint)
    const web3 = new Web3(HttpProvider)
    web3.setProvider(WebsocketProvider)
    const pool = new web3.eth.Contract(YAMETH.abi, YAMETHPoolAddress)
    console.log(pool)
    const totalSupply = await pool.methods.earned('0x0d8E708F9CfF2634169D7c221CF6bfA0C5731d63').call()
    console.log(totalSupply) */
  },
  methods: {
    YAMETHPoolInstance() {
      const instance = new window.web3.eth.Contract(YAMETH.abi, this.YAMETHPoolAddress)
      return instance
    },
    WETHInstance() {
      const instance = new window.web3.eth.Contract(WETH.abi, this.stakedTokenAddress)
      return instance
    },
    async getEarned() {
      const web3 = window.web3
      const coinbase = await web3.eth.getCoinbase()
      const pool = this.YAMETHPoolInstance()
      // const sqrtTotalSupply = await pool.methods.sqrtTotalSupply().call()
      // console.log('sqrtTotalSupply', sqrtTotalSupply)
      const rewardPerToken = await pool.methods.rewardPerToken().call()
      console.log('rewardPerToken: ', parseInt(rewardPerToken) / (10 ** 18))
      const earned = await pool.methods.earned(coinbase).call()
      const earned2 = await pool.methods.earned('0x0d8E708F9CfF2634169D7c221CF6bfA0C5731d63').call()
      console.log('earned', parseInt(earned) / (10 ** 18))
      console.log('earned2', parseInt(earned2) / (10 ** 18))
      const lastTimeRewardApplicable = await pool.methods.lastTimeRewardApplicable().call()
      console.log('lastTimeRewardApplicable:', lastTimeRewardApplicable)
      const rewardDistribution = await pool.methods.rewardDistribution().call()
      const totalSupply = await pool.methods.totalSupply().call()
      const sqrtTotalSupply = await pool.methods.sqrtTotalSupply().call()
      const balanceOf = await pool.methods.balanceOf(coinbase).call()
      const userRewardPerTokenPaid = await pool.methods.userRewardPerTokenPaid(coinbase).call()
      const rewards = await pool.methods.rewards(coinbase).call()
      console.log('rewardDistribution:', rewardDistribution)
      console.log('totalSupply:', parseInt(totalSupply) / (10 ** 18))
      console.log('sqrtTotalSupply:', parseInt(sqrtTotalSupply) / (10 ** 18))
      console.log('balanceOf:', balanceOf)
      console.log('userRewardPerTokenPaid:', parseInt(userRewardPerTokenPaid) / (10 ** 18))
      console.log('rewards:', rewards)
    },
    async approve() {
      const web3 = window.web3
      const coinbase = await web3.eth.getCoinbase()
      const instance = this.WETHInstance()
      // const amount = web3.utils.toBN(2 ** 256 - 1).mul(web3.utils.toBN(10 ** 18)) // 1000
      await instance.methods.approve(this.YAMETHPoolAddress, MaxUint256.toString()).send({
        from: coinbase
      })
    },
    async stake() {
      const web3 = window.web3
      const coinbase = await web3.eth.getCoinbase()
      const ethAmount = web3.utils.toBN(400).mul(web3.utils.toBN(10 ** 18)) // 1000
      const pool = this.YAMETHPoolInstance()
      await pool.methods.stake(ethAmount).send({
        from: coinbase
      })
    },
    async getReward() {
      const web3 = window.web3
      const coinbase = await web3.eth.getCoinbase()
      // const amount = web3.utils.toBN(1000).mul(web3.utils.toBN(10 ** 18)) // 1000
      const pool = this.YAMETHPoolInstance()
      await pool.methods.getReward().send({
        from: coinbase
      })
    },
    async withdraw() {
      const web3 = window.web3
      const coinbase = await web3.eth.getCoinbase()
      const amount = web3.utils.toBN(900).mul(web3.utils.toBN(10 ** 18)) // 1000
      const pool = this.YAMETHPoolInstance()
      await pool.methods.withdraw(amount).send({
        from: coinbase
      })
    },
    async notifyRewardAmount() {
      const web3 = window.web3
      const coinbase = await web3.eth.getCoinbase()
      const amount = web3.utils.toBN(1000).mul(web3.utils.toBN(10 ** 18)) // 1000
      const pool = this.YAMETHPoolInstance()
      await pool.methods.notifyRewardAmount(amount).send({
        from: coinbase
      })
    }
  }
}
</script>
<style lang="scss">
@keyframes fly {
  0% {
    transform: perspective(300px) rotateX(80deg) translateY(0%);
  }
  100% {
      transform: perspective(300px) rotateX(80deg) translateY(50px);
  }
}
.grid-wrapper {
  width: 100%;
  height: 100vh;
  min-height: 400px;
}
.grid-wrapper::after {
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(transparent 70%, rgba(0, 0, 0, 0.7) 120%);
    background-size: 3px 3px;
    z-index: 999;
    pointer-events: none;
}
.no-overflow {
  overflow: hidden;
}
.m-grid.is-animating {
    animation: 3s linear 0s infinite normal none running fly;
}
.m-grid {
    position: absolute;
    top: 50%;
    margin-top: -75vh;
    left: 50%;
    margin-left: -100vw;
    width: 200vw;
    height: 150vh;
    transform: scaleY(0);
    background-image: linear-gradient(0deg, transparent 24%, rgba(236, 0, 140, 0.5) 25%, rgba(236, 0, 140, 0.9) 26%, transparent 27%, transparent 74%, rgba(236, 0, 140, 0.5) 75%, rgba(236, 0, 140, 0.9) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(236, 0, 140, 0.75) 25%, rgba(236, 0, 140, 0.25) 26%, transparent 27%, transparent 74%, rgba(236, 0, 140, 0.75) 75%, rgba(236, 0, 140, 0.25) 76%, transparent 77%, transparent);
    background-size: 50px 50px;
}
</style>
