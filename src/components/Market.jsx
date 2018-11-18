import React from 'react'

import market_bg from '../images/market-bg.png'
import market_pricebar from '../images/market-priceban.png'
import market from '../images/market.png'
import market_m from '../images/market_m.png'
import goods0 from '../images/goods0.png'
import goods1 from '../images/goods1.png'
import goods2 from '../images/goods2.png'
import goods3 from '../images/goods3.png'
import goods4 from '../images/goods4.png'
import market_confirm from '../images/market-confirm.png'
import market_pocket from '../images/market-pocket.png'
import Modal from 'react-modal';
import {simpleStoreContract, transaction} from '../simpleStore'
import bag_m from "../images/bag_m.png";
import bag from "../images/bag.png";
import tree_noFruit from "../images/tree_nofruit.png";
import tree_m from "../images/tree_m.png";
import connect from "react-redux/es/connect/connect";

import {buyProduct} from "../contracts/chain";

const {
    pc_media
} = require('../config')

require('./style/market.css')

const nervos = require("../nervos");

const marketModalStyle = {
    content: {
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
        buyProduct(i, value)
    }


    Goods = (i, goodsPic, goods) => {
        return (
            <div key={i} className="goods-bg" onClick={() => this._buyProduct(i+1, goods.price)}>
                <div className="goods-pic-box">
                    <img src={goodsPic} className="goods-pic"/>
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
                    <img src={market_m} className="market-button ui_button" onClick={this.openModal}/>
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
                                this.Goods(idx, this.state.goodsPics[goods.key-1], goods)
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Market);
