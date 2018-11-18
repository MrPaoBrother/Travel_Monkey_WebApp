import React from 'react'

import Modal from 'react-modal';
import {simpleStoreContract} from '../simpleStore'

// import {transaction, simpleStoreContract} from '../../simpleStore'

import nervos from '../nervos'

import {connect} from 'react-redux';


const from = '9b408a683b284fd3dae967bfe50528b0983c4865'

require('./style/name.css')

const nameModalStyle = {
    content: {
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class Name extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            times: [],
            texts: [],
            modalIsOpen: !this.props.hasLogin,
            newName: ""
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false})
    }

    setNewName = e => {
        this.setState({newName: e.target.value})
    }

    componentDidMount() {
        console.log("hasLogin:", this.props.hasLogin)
        if (!this.props.hasLogin) {
            this.openModal()
            // this.freeMonkey()
        }

    }


    render() {
        if (this.props.hasLogin) {
            return (
                <div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={nameModalStyle}
                        contentLabel=""
                    >

                        <div className="name-bg">
                            看你还没来过，送你个猴吧
                            <button onClick={this.props.onClickFreeMonkey}>点击</button>
                        </div>
                    </Modal>
                </div>
            )
        }

    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClickFreeMonkey() {
            const action = {
                type: 'free_monkey'
            }
            dispatch(action);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Name)
