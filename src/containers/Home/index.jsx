import React from 'react'
import bg from '../../images/bg.png'
import bg_m from '../../images/frontbg.jpg'
import desk_m from '../../images/desk_m.png'
import goHome_m from '../../images/goHome_m.png'

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

import PicWall from '../../components/PicWall.jsx'
import Bed from '../../components/Bed.jsx'
import Monkey from '../../components/Monkey.jsx'
import Tree from '../../components/Tree.jsx'
import Market from '../../components/Market.jsx'
import Bag from '../../components/Bag.jsx'
import Wallet from '../../components/Wallet.jsx'
import Quilt from '../../components/Quilt.jsx'
import PC from '../../components/PC.jsx'
import Vip from '../../components/Vip.jsx'

import {connect} from 'react-redux';
import './home.css'

import axios from 'axios'
const {
    apiAddress, pc_media
} = require('../../config')

// const mobile_media = "(max-width:30em)"

class Home extends React.Component {
    state = {
        picWall: [], //照片墙
    }
    componentDidMount() {
        //只需加载一次的数据
        this._getMonkeycount();
        this._getMarket();
        //开始判断
        this._checkLoginStatus();
    }
    _loadData() {
        setInterval(() => this._refreshStatus(), 15000)
        if (this.props.monkey.state === true) {
            let timeToGo = Math.floor(Math.random() * 10 + 10) * 1000;
            setTimeout(() => {
                this._checkWalkout()
            }, timeToGo)
        } else if (this.props.monkey.state === false) {
            let timeToBack = Math.floor(Math.random() * 10 + 10) * 10000;
            setTimeout(() => {
                this._backHome()
            }, timeToBack)
        }
        this._make_checkHome()
    }

    _make_checkHome = async function () {
        let timing = Math.floor(Math.random() * 10 + 300) * 1000;
        await setTimeout(() => {
            this._checkHome()
            this._make_checkHome()
        }, timing)
    }

    // _start_checkHome = async function () {
    //     let timing = Math.floor(Math.random() * 10 + 10) * 1000;
    //     setInterval(() => this._checkHome(), timing)
    // }


    _checkHome() {
        if (this.props.monkey.state === true) {
            this._checkWalkout()
        } else if (this.props.monkey.state === false) {
            this._backHome()
        }
    }

    _refreshStatus() {
        this._getTree();
        this._getMonkey();
        this._getBag();
        this._getPicWall();
    }


    _checkWalkout() {
        let truthBeTold = window.confirm('主人我想出去玩了，给我点旅费吧');
        if (truthBeTold) {
            checkWalkout()
                .then(_ => {
                        let timeToBack = Math.floor(Math.random() * 10 + 10) * 1000;
                        setTimeout(() => {
                            this._backHome()
                        }, timeToBack)
                        this._getMonkey()
                    }
                )
                .catch(err => alert('_checkWalkout' + err.message));
        } else window.alert("哼！ o(*≧д≦)o!!");
    }

    _backHome() {
        if(!this.props.hasMonkey){
            alert('还没有猴子！')
        }else {
            if (this.props.monkey.state) {
                alert('主人我还没走呢ㄟ( ▔, ▔ )ㄏ')
            } else {
                let truthBeTold = window.confirm('主人我想回来了，给我点旅费吧');
                if (truthBeTold) {
                    backHome()
                        .then(_ => {
                            let timeToGo = Math.floor(Math.random() * 10 + 10) * 1000;
                            setTimeout(() => {
                                this._checkWalkout()
                            }, timeToGo)
                            this._getMonkey()
                        })
                        .catch(err => alert('backHome' + err.message));
                } else window.alert("哼！ o(*≧д≦)o!!");
            }
        }
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
            .catch(err => alert(err.message));
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
                    alert('travel monkey也是游戏的主人公，一只喜欢旅行的猴子，玩家首次登录可以免费领取一只属于你的猴子，它会随机外出旅游，随机回家，是一只很自由的猴子。整个游戏中的金币就是左上角的香蕉，不论是在商店购物，还是猴子外出或者回家向你索要旅费（不给旅费它当然是不会出去旅游或者回家的），要的都是香蕉～下面我们看下具体玩法。\n' +
                        '1. 香蕉树。香蕉树上有香蕉时，可以点击香蕉收割，收割的香蕉会增加到你的香蕉总数里面。（ps.当香蕉树上没有香蕉的时候，进行购物有一定概率会使香蕉树重新长出香蕉哦～）\n' +
                        '2.充值。当然充值也是充香蕉，用的是我们的NATT代币进行1:1的充值哦～\n' +
                        '3.商店。在商店可以用香蕉为猴子购买商品，这会让小猴子变开心，增大外出旅游的概率。\n' +
                        '4.背包。在背包里可以查看当前小猴子拥有的物品。\n' +
                        '5.相册。小猴子每次外出旅游，都会寄一张它的游行照回来，在相册可以查看你的猴子寄给你的照片。\n' +
                        '6.快回家。当你好久没有见到你的猴子，而它还在旅游的时候，你可以通过花费10根香蕉来强制你的小猴子回家\n' +
                        '\n' +
                        '\n')
                    alert('看你没猴子，免费送你一个，收好了！')
                    this._freeMonkey()
                    getMonkey()
                        .then((arr) => {
                            let monkey = {}
                            if( arr[5]==='0'){
                                monkey = {
                                    key: '0',
                                    gene: '0',
                                    mood: '0',
                                    banana: '0',
                                    state: false,
                                    owner: '0'
                                }
                            }else {
                                monkey = {
                                    key: arr[0],
                                    gene: arr[1],
                                    mood: arr[2],
                                    banana: arr[3],
                                    state: arr[4],
                                    owner: arr[5]
                                }
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
                            let monkey = {}
                            if( arr[5]==='0'){
                                monkey = {
                                    key: '0',
                                    gene: '0',
                                    mood: '0',
                                    banana: '0',
                                    state: false,
                                    owner: '0'
                                }
                            }else {
                                monkey = {
                                    key: arr[0],
                                    gene: arr[1],
                                    mood: arr[2],
                                    banana: arr[3],
                                    state: arr[4],
                                    owner: arr[5]
                                }
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
                let monkey = {}
                if( arr[5]==='0'){
                    monkey = {
                        key: '0',
                        gene: '0',
                        mood: '0',
                        banana: '0',
                        state: false,
                        owner: '0'
                    }
                }else {
                    monkey = {
                        key: arr[0],
                        gene: arr[1],
                        mood: arr[2],
                        banana: arr[3],
                        state: arr[4],
                        owner: arr[5]
                    }
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
                        if (index_uniq === -1) {
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
                Promise.all(indexs.map(idx =>
                    getPicture(idx))).then(pics => {
                    let picWall = []
                    pics.map(pic => {
                        let picString = pic[1] + '-' + pic[2] + '-' + pic[3]
                        picWall.push(picString)
                    })
                    axios.post(apiAddress + '/bitrun/api/v1/get_images', {"images": picWall.join(",")})
                        .then((res) => {
                            console.log(res);
                            picWall = res.data
                            this.props.setPicWall(picWall)
                        })
                        .catch(e => alert("err:"+JSON.stringify(e)))
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
            .catch(err => alert('getBananaFromTree' + err.message));
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
                    <img className="bg" src={bg_m} alt="" />
                </picture>
                <picture>
                    <source srcSet={bg} media={pc_media}/>
                    <img className="desk" src={desk_m} alt="" />
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
                    <img className="goHome_button ui_button" src={goHome_m} onClick={() => this._backHome()} alt="" />
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