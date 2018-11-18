import React from 'react'
import quilt from '../images/quilt.png'
import quilt_m from '../images/quilt_m.png'
import './style/quilt.css'

const {
    pc_media
} = require('../config')


const Quilt = () => (
    <picture>
        <source srcSet={quilt} media={pc_media}/>
        <img src={quilt_m} className="bg_quilt"/>
    </picture>

)

export default Quilt
