import React from 'react'

import {connect} from 'react-redux';

import tree_hasFruit from '../images/tree_hasfruit.png'
import tree_noFruit from '../images/tree_nofruit.png'
import tree_m from '../images/tree_m.png'
import banana_m from '../images/banana_m.png'
import quilt from "../images/quilt.png";
import quilt_m from "../images/quilt_m.png";

require('./style/tree.css')


const {
    pc_media
} = require('../config')

class Tree extends React.Component {



    render() {
        if (this.props.treeFruits == 0) {
            return (
                <React.Fragment>
                    <picture>
                        <source srcSet={tree_noFruit} media={pc_media}/>
                        <img src={tree_m} className="bg_tree"/>
                    </picture>
                </React.Fragment>
            )
        }
        else {
            return (
                <React.Fragment>
                    <picture>
                        <source srcSet={tree_noFruit} media={pc_media}/>
                        <img src={tree_m} className="bg_tree"/>
                    </picture>
                    <picture>
                        <source srcSet={banana_m} media={pc_media}/>
                        <img src={banana_m} className="bg_banana"
                             onClick={this.props.onClick}/>
                    </picture>
                </React.Fragment>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        treeFruits: state.treeFruits, //树上钱
    }
}

const mapDispatchToProps = (dispatch) => {
    return
}


export default connect(mapStateToProps, mapDispatchToProps)(Tree);
