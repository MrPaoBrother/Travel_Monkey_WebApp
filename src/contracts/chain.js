import {abi, bytecode} from "../contracts/compiled";

const {
    contractAddress
} = require('../config')

const nervos = require("../nervos");
const transaction = require("./transaction");

export const getAbi = function (contractAddress) {
    return nervos.appchain.getAbi(contractAddress);
};

export const getContract = function (abi, contractAddress) {
    return new nervos.appchain.Contract(abi, contractAddress);
};


export const getTokenContract = function () {
    return getContract(abi, contractAddress);
};


export const getTX = (m) =>
    nervos.appchain.getBlockNumber().then(current => {
        // const tx = {
        //   ...transaction,
        //   from: "your address",
        //   validUntilBlock: +current + 88,
        //   privateKey:
        //     "your private key"
        // };
        let tx = {
            ...transaction,
            from: window.neuron.getAccount(),
            validUntilBlock: +current + 88
        };
        if (m !== 0) {
            tx = {
                ...tx,
                value: '0x0' + m,
            };
        }
        return tx;
    });

// 0-0 获取猴子数量 n-1
export const getMonkeycount = async function () {
    return await new Promise((resolve, reject) => {
        getTokenContract()
            .methods.getMonkeycount()
            .call({from: window.neuron.getAccount()})
            .then(n => resolve(n - 1))
            .catch(err => reject(err));
    });
};


// 0-1 获取用户是否有猴子 bool
export const checkFirst = async function () {
    return await new Promise((resolve, reject) => {
        getTokenContract()
            .methods.checkFirst()
            .call({from: window.neuron.getAccount()})
            .then(n => resolve(!n))
            .catch(err => reject(err));
    });
};


// 0-2 获取香蕉数量 n
export const getBananacount = async function () {
    return await new Promise((resolve, reject) => {
        getTokenContract()
            .methods.getBananacount()
            .call({from: window.neuron.getAccount()})
            .then(n => resolve(n))
            .catch(err => reject(err));
    });
};


// 0-3 获取猴子状态 array
export const getMonkey = async function () {
    return await new Promise((resolve, reject) => {
        getTokenContract()
            .methods.getMonkey()
            .call({from: window.neuron.getAccount()})
            .then(n => resolve(n))
            .catch(err => reject(err));
    });
};

// 1-0 获取玩家拥有的图片 n
export const getowner2picture = async function () {
    return await new Promise((resolve, reject) => {
        getTokenContract()
            .methods.getowner2picture()
            .call({from: window.neuron.getAccount()})
            .then(n => resolve(n))
            .catch(err => reject(err));
    });
};

// 1-1 获取图片长度 n
export const getPicturelength = async function () {
    return await new Promise((resolve, reject) => {
        getTokenContract()
            .methods.getPicturelength()
            .call({from: window.neuron.getAccount()})
            .then(n => resolve(n))
            .catch(err => reject(err));
    });
};

// 1-2 获取图片状态 array
export const getPicture = async function (i) {
    return await new Promise((resolve, reject) => {
        getTokenContract()
            .methods.getPicture(i)
            .call({from: window.neuron.getAccount()})
            .then(n => resolve(n))
            .catch(err => reject(err));
    });
};

// 2-0 获取玩家拥有的装备 array
export const getowner2product = async function () {
    return await new Promise((resolve, reject) => {
        getTokenContract()
            .methods.getowner2product()
            .call({from: window.neuron.getAccount()})
            .then(n => resolve(n))
            .catch(err => reject(err));
    });
};

// 2-1 获取装备长度 n
export const getProductlength = async function () {
    return await new Promise((resolve, reject) => {
        getTokenContract()
            .methods.getProductlength()
            .call({from: window.neuron.getAccount()})
            .then(n => resolve(n))
            .catch(err => reject(err));
    });
};

// 2-2 获取装备状态 array
export const getProduct = async function (i) {
    return await new Promise((resolve, reject) => {
        getTokenContract()
            .methods.getProduct(i)
            .call({from: window.neuron.getAccount()})
            .then(n => resolve(n))
            .catch(err => reject(err));
    });
};

// 3-0 解放猴子
export const freeMonkey = async function () {
    return await new Promise((resolve, reject) => {
        getTX(0).then(tx => {
            getTokenContract()
                .methods.freeMonkey()
                .send(tx)
                .then(res => {
                    alert(JSON.stringify(res));
                    let hash;
                    if (JSON.stringify(res).indexOf("hash") !== -1) {
                        hash = res.hash;
                    } else {
                        hash = res;
                    }
                    alert(hash)
                    if (hash) {
                        window.nervos.listeners
                            .listenToTransactionReceipt(hash)
                            .then(receipt => {
                                console.log(receipt);
                                if (!receipt.errorMessage) {
                                    resolve(receipt);
                                } else {
                                    reject(receipt.errorMessage);
                                }
                            })
                            .catch(err => {
                                console.log(err);
                                reject(err);
                            });
                    } else {
                        reject("No Transaction Hash Received");
                    }
                })
                .catch(err => {
                    alert(err);
                    resolve(err.errorMessage);
                });
        });
    });
};

// 3-1 买香蕉
export const addBanana = async function (n) {
    return await new Promise((resolve, reject) => {
        getTX(n + 1).then(tx => {
            getTokenContract()
                .methods.addBanana(n)
                .send(tx)
                .then(res => {
                    alert(JSON.stringify(res));
                    let hash;
                    if (JSON.stringify(res).indexOf("hash") !== -1) {
                        hash = res.hash;
                    } else {
                        hash = res;
                    }
                    if (hash) {
                        window.nervos.listeners
                            .listenToTransactionReceipt(hash)
                            .then(receipt => {
                                console.log(receipt);
                                if (!receipt.errorMessage) {
                                    resolve(receipt);
                                } else {
                                    reject(receipt.errorMessage);
                                }
                            })
                            .catch(err => {
                                alert(err);
                                reject(err);
                            });
                    } else {
                        reject("No Transaction Hash Received");
                    }
                })
                .catch(err => {
                    alert(err);
                    resolve(err.errorMessage);
                });
        });
    });
};

// 3-2 收割香蕉
export const getBananaFromTree = async function () {
    return await new Promise((resolve, reject) => {
        getTX(0).then(tx => {
            getTokenContract()
                .methods.getBananaFromTree()
                .send(tx)
                .then(res => {
                    alert('getBananaFromTree suc' + JSON.stringify(res));
                    let hash;
                    if (JSON.stringify(res).indexOf("hash") !== -1) {
                        hash = res.hash;
                    } else {
                        hash = res;
                    }
                    if (hash) {
                        window.nervos.listeners
                            .listenToTransactionReceipt(hash)
                            .then(receipt => {
                                console.log(receipt);
                                if (!receipt.errorMessage) {
                                    resolve(receipt);
                                } else {
                                    reject(receipt.errorMessage);
                                }
                            })
                            .catch(err => {
                                alert('listenToTransactionReceipt' + err);
                                reject(err);
                            });
                    } else {
                        reject("No Transaction Hash Received");
                    }
                })
                .catch(err => {
                    alert('getBananaFromTree fail' + err);
                    resolve(err.errorMessage);
                });
        });
    });
};

// 3-3  买商品
export const buyProduct = async function (i,value) {
    return await new Promise((resolve, reject) => {
        getTX(value).then(tx => {
            getTokenContract()
                .methods.buyProduct(i)
                .send(tx)
                .then(res => {
                    alert('购买商品' + i + '成功！交易hash为' + res.hash)
                    let hash;
                    if (JSON.stringify(res).indexOf("hash") !== -1) {
                        hash = res.hash;
                    } else {
                        hash = res;
                    }
                    if (hash) {
                        window.nervos.listeners
                            .listenToTransactionReceipt(hash)
                            .then(receipt => {
                                console.log(receipt);
                                if (!receipt.errorMessage) {
                                    resolve(receipt);
                                } else {
                                    reject(receipt.errorMessage);
                                }
                            })
                            .catch(err => {
                                alert('listenToTransactionReceipt' + err);
                                reject(err);
                            });
                    } else {
                        reject("No Transaction Hash Received");
                    }
                })
                .catch(err => {
                    alert('buyProduct fail' + err);
                    resolve(err.errorMessage);
                });
        });
    });
};

//  3-4  检查是否出门
export const checkWalkout = async function () {
    return await new Promise((resolve, reject) => {
        getTX(0).then(tx => {
            getTokenContract()
                .methods.checkWalkout()
                .send(tx)
                .then(res => {
                    alert('checkWalkout suc' + JSON.stringify(res));
                    let hash;
                    if (JSON.stringify(res).indexOf("hash") !== -1) {
                        hash = res.hash;
                    } else {
                        hash = res;
                    }
                    if (hash) {
                        window.nervos.listeners
                            .listenToTransactionReceipt(hash)
                            .then(receipt => {
                                console.log(receipt);
                                if (!receipt.errorMessage) {
                                    resolve(receipt);
                                } else {
                                    reject(receipt.errorMessage);
                                }
                            })
                            .catch(err => {
                                alert('listenToTransactionReceipt' + err);
                                reject(err);
                            });
                    } else {
                        reject("No Transaction Hash Received");
                    }
                })
                .catch(err => {
                    alert('checkWalkout fail' + err);
                    resolve(err.errorMessage);
                });
        });
    });
};

//  3-4  猴子回家
export const backHome = async function () {
    return await new Promise((resolve, reject) => {
        getTX(0).then(tx => {
            getTokenContract()
                .methods.backHome()
                .send(tx)
                .then(res => {
                    alert('backHome suc' + JSON.stringify(res));
                    let hash;
                    if (JSON.stringify(res).indexOf("hash") !== -1) {
                        hash = res.hash;
                    } else {
                        hash = res;
                    }
                    if (hash) {
                        window.nervos.listeners
                            .listenToTransactionReceipt(hash)
                            .then(receipt => {
                                console.log(receipt);
                                if (!receipt.errorMessage) {
                                    resolve(receipt);
                                } else {
                                    reject(receipt.errorMessage);
                                }
                            })
                            .catch(err => {
                                alert('listenToTransactionReceipt' + err);
                                reject(err);
                            });
                    } else {
                        reject("No Transaction Hash Received");
                    }
                })
                .catch(err => {
                    alert('checkWalkout fail' + err);
                    resolve(err.errorMessage);
                });
        });
    });
};