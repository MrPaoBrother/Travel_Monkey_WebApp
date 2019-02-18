import React from 'react'
import Modal from 'react-modal';
import connect from "react-redux/es/connect/connect";

import {addBanana, getBananacount, getMonkey} from "../contracts/chain";
import vip_m from "../images/vip_m.png";

const {
    pc_media
} = require('../config')

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
        if(!this.props.hasMonkey){
            alert('还没有猴子！')
        }else {
            let value = this.state.input;
            let re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/

            if (!re.test(value)) {
                alert('请输入数字！')
            }else {
                addBanana(value)
                    .then(_ => {
                        this._getMonkey()
                        this._getTree()
                        this.closeModal()
                    })
            }
        }


    }

    _getTree() {
        getBananacount()
            .then(treeFruits => {
                this.props.setTreeFruits(treeFruits)
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


    render() {
        return (
            <React.Fragment>
                <picture>
                    <source srcSet={vip_m} media={pc_media}/>
                    <img className="vip_button ui_button" src={vip_m} onClick={() => this.openModal()} alt="vip" />
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
    return {
        hasMonkey:state.hasMonkey
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setMonkey(b) {
            dispatch({type: 'setMonkey', data: b});
        },

        setTreeFruits(treeFruits) {
            dispatch({type: 'setTreeFruits', data: treeFruits});
        },}
}

export default connect(mapStateToProps, mapDispatchToProps)(Vip);
