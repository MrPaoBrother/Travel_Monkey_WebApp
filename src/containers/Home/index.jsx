import React from 'react'
import bg from '../../images/bg.png'
import bg_m from '../../images/frontbg.jpg'
import desk_m from '../../images/desk_m.png'
import goHome_m from '../../images/goHome_m.png'
import vip_m from '../../images/vip_m.png'

import {
    getMonkeycount,
    checkFirst,
    getBananacount,
    getMonkey,

    getowner2picture,
    getPicturelength,
    getPicture,

    getowner2product,
    getProductlength,
    getProduct,

    freeMonkey,
    addBanana,
    getBananaFromTree,
    checkWalkout,
    backHome
} from "../../contracts/chain";

import frontbg from '../../images/frontbg.png'
import frontbg_m from '../../images/frontbg_m.png'

import pc from '../../images/pc.png'

import quilt from '../../images/quilt.png'

// import bg from "../../public/images/bg.png"

import PicWall from '../../components/PicWall.jsx'
import Bed from '../../components/Bed.jsx'
import Monkey from '../../components/Monkey.jsx'
import Header from '../../components/Header.jsx'
import Tree from '../../components/Tree.jsx'
import Market from '../../components/Market.jsx'
import Bag from '../../components/Bag.jsx'
import Wallet from '../../components/Wallet.jsx'
import Quilt from '../../components/Quilt.jsx'
import PC from '../../components/PC.jsx'
import Vip from '../../components/Vip.jsx'

import {connect} from 'react-redux';


import './home.css'

import {transaction, simpleStoreContract} from '../../simpleStore'

// import nervos from '../../nervos'

import axios from 'axios'

const nervos = require("../../nervos");

const {
    apiAddress, pc_media
} = require('../../config')

// const from = '9b408a683b284fd3dae967bfe50528b0983c4865'

// const from = window.neuron.getAccount()


const mobile_media = "(max-width:30em)"


class Home extends React.Component {
    state = {
        picWall: [], //照片墙
    }

    componentDidMount() {

        //只需加载一次的数据
        this._getMonkeycount()
        this._getMarket();
        //开始判断
        this._checkLoginStatus();
    }


    _loadData() {
        setInterval(() => this._refreshStatus(), 5000)

        if (this.props.monkey.state === true) {
            let timeToGo = Math.floor(Math.random() * 10 + 10) * 1000;
            setTimeout(() => {
                this._checkWalkout()
            }, timeToGo)
        } else if (this.props.monkey.state === false) {
            let timeToBack = Math.floor(Math.random() * 10 + 10) * 1000;
            setTimeout(() => {
                this._backHome()
            }, timeToBack)
        }


    }

    _refreshStatus() {
        this._getTree();
        this._getMonkey();

        this._getBag();
        this._getPicWall();
    }


    _checkWalkout() {
        alert('主人我想出去玩了，给我点旅费吧')
        checkWalkout()
            .then(_ => {
                    let timeToBack = Math.floor(Math.random() * 10 + 10) * 1000;
                    setTimeout(() => {
                        this._backHome()
                    }, timeToBack)
                    this._getPicWall()
                }
            )
            .catch(err => alert('_checkWalkout' + err));
    }

    _backHome() {
        alert('主人我想回来了，给我点旅费吧')
        backHome()
            .then(_ => {
                let timeToGo = Math.floor(Math.random() * 10 + 10) * 1000;
                setTimeout(() => {
                    this._checkWalkout()
                }, timeToGo)
            })
            .catch(err => alert('backHome' + err));
    }

    // _storyHappen() {
    //     axios.post(apiAddress + '/bitrun/api/v1/story_happen', {
    //         "address": window.neuron.getAccount(),
    //         "randombackground": this.props.status[0],
    //         "randomanimals": this.props.status[1],
    //         "state": this.props.status[2],
    //         "timestamp": (60 + Math.round(new Date().getTime() / 1000)).toString()
    //     }).then(res => console.log('story_happen', res))
    // }

    _getTree() {
        getBananacount()
            .then(treeFruits => {
                this.props.setTreeFruits(treeFruits)
            })
            .catch(e => alert(e))

    }

    // _refreshTravleStatus() {
    //     axios.get(apiAddress + '/bitrun/api/v1/get_monkey_status/' + window.neuron.getAccount())
    //         .then((res) => {
    //             console.log("get_monkey_status", res);
    //             // this._getPicWall()
    //             if (res.data.status != 2) {
    //                 this.setState({
    //                     picWall: [...this.state.picWall, res.data.pic_url],
    //                     where: res.data.status
    //                 })
    //             } else {
    //                 this.setState({
    //                     picWall: [...this.state.picWall, res.data.pic_url],
    //                     where: res.data.status
    //                 })
    //                 clearInterval(this.timer)
    //             }
    //         })
    //
    // }

    _getMonkeycount() {
        getMonkeycount()
            .then(n => {
                this.props.setMonkeyNum(n)
                alert('这个星球已经有' + n + '只猴子了')
            })
            .catch(err => alert(err));
    }


    loadPic() {
        axios.post(apiAddress + '/bitrun/api/v1/get_images', {
            images: '1-0-1,1-1-1,1-2-1,2-1-1',
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    _checkLoginStatus() {
        checkFirst()
            .then(status => {
                this.props.setHasMonkey(status)
                if (!status) {
                    alert('看你没猴子，免费送你一个，收好了！')
                    this._freeMonkey()
                    getMonkey()
                        .then((arr) => {
                                let monkey = {
                                    key: arr[0],
                                    gene: arr[1],
                                    mood: arr[2],
                                    banana: arr[3],
                                    state: arr[4],
                                    owner: arr[5]
                                }
                                this.props.setMonkey(monkey)
                                this._loadData()
                                // alert('monkey' + JSON.stringify(monkey))
                                //key gene mood banana state owner
                            }
                        )
                        .catch(e => alert(e))
                }
                else {
                    getMonkey()
                        .then((arr) => {
                                let monkey = {
                                    key: arr[0],
                                    gene: arr[1],
                                    mood: arr[2],
                                    banana: arr[3],
                                    state: arr[4],
                                    owner: arr[5]
                                }
                                this.props.setMonkey(monkey)
                                this._loadData()
                                // alert('monkey' + JSON.stringify(monkey))
                                //key gene mood banana state owner
                            }
                        )
                        .catch(e => alert(e))
                }
            })
            .catch(e => alert(e))
    }


    _getMonkey() {
        getMonkey()
            .then((arr) => {
                    let monkey = {
                        key: arr[0],
                        gene: arr[1],
                        mood: arr[2],
                        banana: arr[3],
                        state: arr[4],
                        owner: arr[5]
                    }
                    this.props.setMonkey(monkey)
                    // alert('monkey' + JSON.stringify(monkey))
                    //key gene mood banana state owner
                }
            )
            .catch(e => alert(e))
    }

    _getBag() {
        getowner2product()
            .then(indexs => {
                Promise.all(indexs.map(idx =>
                    getProduct(idx))).then(goodses => {
                    let bag = []
                    let bag_uniq = []
                    goodses.map(goods => {
                        let goodsTyped = {
                            key: goods[0],
                            name: goods[1],
                            price: goods[2],
                            effect: goods[3]
                        }
                        // let index = bag.indexOf(goodsTyped)
                        let index_uniq = bag_uniq.indexOf(goodsTyped.key)
                        // alert('index_uniq '+index_uniq)
                        // alert()
                        if (index_uniq == -1) {
                            bag_uniq.push(goodsTyped.key)
                            goodsTyped.count = 1
                            bag.push(goodsTyped)
                        } else {
                            bag[index_uniq].count++
                        }
                    })
                    this.props.setBag(bag)
                    // alert('bag_uniq' + JSON.stringify(bag_uniq))
                    // alert('bag' + JSON.stringify(bag))
                })
            })
    }

    _getMarket() {
        getProductlength()
            .then(len => {
                let marketIdxs = []
                for (let i = 1; i < len; i++) {
                    marketIdxs.push(i)
                }
                Promise.all(marketIdxs.map(idx =>
                    getProduct(idx))).then(goodses => {
                    let market = []
                    goodses.map(goods => {
                        let goodsTyped = {
                            key: goods[0],
                            name: goods[1],
                            price: goods[2],
                            effect: goods[3]
                        }
                        market.push(goodsTyped)
                    })
                    this.props.setMarket(market)
                    // alert('market' + JSON.stringify(market))
                })

            })
    }


    _getPicWall() {
        getowner2picture()
            .then(indexs => {
                // alert(JSON.stringify(indexs))
                Promise.all(indexs.map(idx =>
                    getPicture(idx))).then(pics => {
                    let picWall = []
                    pics.map(pic => {
                        let picString = pic[1] + '-' + pic[2] + '-' + pic[3]
                        picWall.push(picString)
                    })

                    // alert('picWallstr' + picWall.join(","))
                    axios.post(apiAddress + '/bitrun/api/v1/get_images', {"images": picWall.join(",")})
                        .then((res) => {
                            console.log(res);
                            picWall = res.data
                            this.props.setPicWall(picWall)
                            // alert('picWall' + JSON.stringify(picWall))
                        })
                        .catch(e=>alert(JSON.stringify(e)))

                })
            })
    }

    _freeMonkey() {
        freeMonkey().then(
            this._getMonkey()
        )
    }

    _getBananaFromTree() {
        getBananaFromTree()
            .then(_ => {
                this._getTree()
                this._getMonkey()
            })
            .catch(err => alert('getBananaFromTree' + err));
    }


    _refreshBag() {
        let oldData = this.props.bag
        let bagInterval = setInterval(
            () => {
                if (this.props.bag === oldData) {
                    this._getBag()
                } else {
                    clearInterval(bagInterval)
                }
            }, 3000
        )
    }

    render() {
        return (
            <div className='stage'>
                {/*<Header hasLogin={this.state.hasLogin} onClick={this.freeMonkey.bind(this)}/>*/}
                <picture>
                    <source srcset={bg} media={pc_media}/>
                    <img className="bg" src={bg_m}/>
                </picture>
                <picture>
                    <source srcSet={bg} media={pc_media}/>
                    <img className="desk" src={desk_m}/>
                </picture>

                <Tree onClick={() => this._getBananaFromTree()}/>
                <PC data={this.props.Screen}/>
                <Bed/>
                <Monkey data={this.props.monkeyClass} where={this.props.where}/>
                <Quilt/>

                {/*<picture>*/}
                    {/*<source srcSet={frontbg} media={pc_media}/>*/}
                    {/*<img className="bg_frontbg" src={frontbg_m}/>*/}
                {/*</picture>*/}

                <PicWall data={this.props.picWall}/>
                <Market/>
                <Bag/>
                <Wallet fruits={this.props.fruits}/>

                <Vip/>
                <picture>
                    <source srcSet={goHome_m} media={pc_media}/>
                    <img className="goHome_button ui_button" src={goHome_m} onClick={() => this._backHome()}/>
                </picture>


            </div>)
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        //
        setMonkeyNum(n) {
            dispatch({type: 'setMonkeyNum', data: n});
        },
        setHasMonkey(b) {
            dispatch({type: 'setHasMonkey', data: b});
        },
        setMonkey(b) {
            dispatch({type: 'setMonkey', data: b});
        },

        setTreeFruits(treeFruits) {
            dispatch({type: 'setTreeFruits', data: treeFruits});
        },
        //
        setBag(bag) {
            dispatch({type: 'setBag', data: bag});
        },
        setPicWall(picWall) {
            dispatch({type: 'setPicWall', data: picWall});
        },
        setMarket(market) {
            dispatch({type: 'setMarket', data: market});
        },
        //
        addProduct(goodsTyped) {
            dispatch({type: 'addProduct', data: goodsTyped});
        },
        clearPicWall() {
            dispatch({type: 'clearPicWall'});
        },
        clearMarket() {
            dispatch({type: 'clearMarket'});
        },


    }
}

const mapStateToProps = (state) => {
    return {
        hasMonkey: state.hasMonkey, //有无猴
        monkey: state.monkey, //猴子状态
        fruits: state.monkey.banana, //钱
        treeFruits: state.treeFruits, //树上钱
        bag: state.bag, //背包
        picWall: state.picWall, //照片墙
        market: state.market, //商店
        marketData: state.marketData, //商店数据
        Screen: state.Screen, //电脑图片
        picArray: state.picArray, //照片墙图片序号
        picArrayy: state.picArrayy, //照片墙图片序号
        status: state.status
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
