import React from 'react'

import market from '../images/market.png'
import market_m from '../images/market_m.png'
import goods0 from '../images/goods0.png'
import goods1 from '../images/goods1.png'
import goods2 from '../images/goods2.png'
import goods3 from '../images/goods3.png'
import goods4 from '../images/goods4.png'
import Modal from 'react-modal';
import connect from "react-redux/es/connect/connect";

import {buyProduct, getMonkey, getowner2product, getProduct} from "../contracts/chain";

const {
    pc_media
} = require('../config')

require('./style/market.css')

const marketModalStyle = {
    content: {
        padding: "4vw",
        top: '50%',
        left: '50%',
        width: '100%',
        height: '100%',
        background: 'none',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class Market extends React.Component {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            goodsPics: [goods0, goods1, goods2, goods3, goods4],
            // goodsNames: ['2', '5', '1', '10', '3']
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    componentDidMount() {

    }

    _buyProduct(i, value) {
        if(!this.props.hasMonkey){
            alert('还没有猴子！')
        }else {
            buyProduct(i, value).then(_ => {
                this._getMonkey()
                this._getBag()
            })
        }
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


    Goods = (i, goodsPic, goods) => {
        return (
            <div key={i} className="goods-bg" onClick={() => this._buyProduct(i + 1, goods.price)}>
                <div className="goods-pic-box">
                    <img src={goodsPic} className="goods-pic" alt="" />
                </div>
                <span className="goods-price">{goods.price}</span>
            </div>
        )
    }

    render() {
        return (
            <React.Fragment>
                <picture>
                    <source srcSet={market} media={pc_media}/>
                    <img src={market_m} className="market-button ui_button" onClick={this.openModal} alt="" />
                </picture>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={marketModalStyle}
                    contentLabel=""
                >
                    <div className="market-bg">
                        <div className="goods-container">
                            {this.props.market.map((goods, idx) => (
                                this.Goods(idx, this.state.goodsPics[goods.key - 1], goods)
                            ))}
                        </div>
                        <div className="market-frontbg"/>

                        <span className="market-title">点击商品直接购买</span>
                        <span className="market-close-btn" onClick={this.closeModal}>关闭</span>
                    </div>
                </Modal>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        market: state.market,
        hasMonkey: state.hasMonkey
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setMonkey(b) {
            dispatch({type: 'setMonkey', data: b});
        },
        //
        setBag(bag) {
            dispatch({type: 'setBag', data: bag});
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Market);
