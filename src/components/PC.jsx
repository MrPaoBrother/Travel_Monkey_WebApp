import React from 'react'
import pc from '../images/pc.png'
import pc_m from '../images/pc_m.png'
import pc_screen from '../images/pc.png'
import modalStyle from '../modalStyle'
import './style/pc.css'
import Modal from "react-modal";
import axios from "axios";
import banana_m from "../images/banana_m.png";

const {
    apiAddress, pc_media
} = require('../config')

const pcModalStyle = {
    content: {
        top: '75%',
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

class PC extends React.Component {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            pic: ''
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
        axios.get(apiAddress + '/bitrun/api/v1/get_image/1')
            .then((res) => {
                console.log(res);
                this.setState({pic: res.data})
            })
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }


    componentDidMount() {
    }

    render() {
        return (
            <div>
                <picture>
                    <source srcSet={pc} media={pc_media}/>
                    <img src={pc_m} className="bg_pc" onClick={this.openModal}/>
                </picture>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={pcModalStyle}
                    contentLabel=""
                >
                    <img src={this.state.pic} className="pc" onClick={this.closeModal}/>
                </Modal>
            </div>
        )
    }
}


export default PC
