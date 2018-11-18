import React from 'react'

import Modal from 'react-modal';
import {simpleStoreContract} from '../simpleStore'

// import {transaction, simpleStoreContract} from '../../simpleStore'

import nervos from '../nervos'

import wallet from '../images/wallet.png'
import wallet_m from '../images/wallet_m.png'
import walletModalStyle  from '../modalStyle'
import bag from "../images/bag.png";
import bag_m from "../images/bag_m.png";


const {
    pc_media
} = require('../config')


require('./style/wallet.css')

class Wallet extends React.Component {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            newWallet: ""
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

    setNewWallet = e => {
        this.setState({newWallet: e.target.value})
    }

    componentDidMount() {
        // this.openModal()
    }

    render() {
        return (
            <div>
                <picture>
                    <source srcSet={wallet} media={pc_media}/>
                    <img src={wallet_m} className="wallet-button ui_button" />
                </picture>
                <span className="wallet-button-span">{this.props.fruits}</span>
            </div>
        )
    }
}

export default Wallet
