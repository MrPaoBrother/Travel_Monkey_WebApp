import React from 'react'


import bag from '../images/bag.png'
import bag_m from '../images/bag_m.png'
import goods0 from '../images/goods0.png'
import goods1 from '../images/goods1.png'
import goods2 from '../images/goods2.png'
import goods3 from '../images/goods3.png'
import goods4 from '../images/goods4.png'
import Modal from 'react-modal';
import {simpleStoreContract} from '../simpleStore'
import bg from "../images/bg.png";
import connect from "react-redux/es/connect/connect";


const {
    pc_media
} = require('../config')

require('./style/bag.css')

const bagModalStyle = {
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


class Bag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            goodsPics: [goods0, goods1, goods2, goods3, goods4],
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

    Thing = (i, goodsPic, goods) => {
        // console.log(thingPic)
        return (
            <div key={i} className="goods-bg">
                <div className="goods-pic-box">
                    <img src={goodsPic} className="goods-pic"/>
                </div>
                <span className="goods-price">{goods.price} X{goods.count}</span>
            </div>
        )
    }

    render() {
        return (
            <React.Fragment>
                <picture>
                    <source srcset={bag} media={pc_media}/>
                    <img src={bag_m} className="bag-button ui_button" onClick={this.openModal}/>
                </picture>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={bagModalStyle}
                    contentLabel=""
                >

                    <div className="bag-bg">
                        <div className="goods-container">
                            {this.props.bag.map((goods, idx) => (
                                this.Thing(idx, this.state.goodsPics[goods.key - 1], goods)
                            ))}
                        </div>
                        <span className="market-close-btn" onClick={this.closeModal}>关闭</span>
                    </div>
                </Modal>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        bag: state.bag,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Bag)
