// const {
//     default: Nervos
// } = require('@nervos/chain')
//
// const config = require('./config')
//
// const nervos = Nervos(config.chain) // config.chain indicates that the address of Appchain to interact
// const account = nervos.appchain.accounts.privateKeyToAccount(config.privateKey) // create account by private key from config
//
// nervos.appchain.accounts.wallet.add(account) // add account to nervos
//
// module.exports = nervos

const {
    default: Nervos
} = require('@nervos/chain')

if (typeof window.nervos !== 'undefined') {
    window.nervos = Nervos(window.nervos.currentProvider);
    window.nervos.currentProvider.setHost("http://121.196.200.225:1337");
} else {
    console.log('No Nervos web3? You should consider trying Neuron!')
    window.nervos = Nervos('http://121.196.200.225:1337');
}
var nervos = window.nervos

module.exports = nervos
