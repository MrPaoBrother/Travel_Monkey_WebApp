const {
  default: AppChain
} = require('@appchain/base')

const config = require('./config')

var appchain;

if (typeof window.appchain !== 'undefined') {
  appchain = AppChain(window.appchain.currentProvider);
  appchain.currentProvider.setHost(config.chain);
} else {
  console.log('No appchain ? You should consider trying Neuron!')
  appchain = AppChain(config.chain);
}

module.exports = appchain
