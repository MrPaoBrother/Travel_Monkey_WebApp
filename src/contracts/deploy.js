const nervos = require('../nervos')
const {
    abi,
    bytecode
} = require('./compiled.js')

const transaction = require('./transaction')
let _contractAddress = ''
// contract contract instance
const myContract = new nervos.appchain.Contract(abi)

nervos.appchain.getBlockNumber().then(current => {
    transaction.validUntilBlock = +current + 88 // update transaction.validUntilBlock
    // deploy contract
    return myContract.deploy({
        data: bytecode,
        arguments: [],
    }).send(transaction)
}).then(txRes => {
    if (txRes.hash) {
        // get transaction receipt
        return nervos.listeners.listenToTransactionReceipt(txRes.hash)
    } else {
        throw new Error("No Transaction Hash Received")
    }
})
    .then(res => {
        const {
            contractAddress,
            errorMessage,
        } = res
        if (errorMessage) throw new Error(errorMessage)
        console.log(`contractAddress is: ${contractAddress}`)
        _contractAddress = contractAddress
        return nervos.appchain.storeAbi(contractAddress, abi, transaction) // store abi on the chain
    }).then(res => {
    if (res.errorMessage) throw new Error(res.errorMessage)
    return nervos.appchain.getAbi(_contractAddress).then(console.log) // get abi from the chain
}).catch(err => console.error(err))
