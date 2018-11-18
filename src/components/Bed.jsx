import React from 'react'
import './style/bed.css'
import bed from "../images/bed.png";
import bed_m from "../images/bed_m.png";
const {
    pc_media
} = require('../config')


const Bed = () => (
    <picture>
        <source srcSet={bed} media={pc_media} />
        <img src={bed_m} className="bg_bed"/>
    </picture>

)

export default Bed
