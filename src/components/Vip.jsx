import React from 'react'

import market from '../images/market.png'
import market_m from '../images/market_m.png'
import Modal from 'react-modal';
import connect from "react-redux/es/connect/connect";

import {addBanana} from "../contracts/chain";
import vip_m from "../images/vip_m.png";

const {
    pc_media
} = require('../config')

const nervos = require("../nervos");

const vipModalStyle = {
    content: {
        top: '80%',
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

class Vip extends React.Component {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            input: ''
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this._addBanana = this._addBanana.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    componentDidMount() {

    }

    _addBanana() {
        let value = this.state.input;
        addBanana(value)
            .then(_ => this.closeModal())
    }


    render() {
        return (
            <React.Fragment>
                <picture>
                    <source srcSet={vip_m} media={pc_media}/>
                    <img className="vip_button ui_button" src={vip_m} onClick={() => this.openModal()}/>
                </picture>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={vipModalStyle}
                    contentLabel=""
                >
                    <div className="vip-bg">

                        <span className="vip-btn" onClick={this.closeModal}>&nbsp;</span>

                        <input className="vip-input" value={this.state.input} onChange={event => this.setState({input: event.target.value})}/>

                        <span className="vip-btn" onClick={this._addBanana}>&nbsp;</span>
                    </div>
                </Modal>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Vip);
