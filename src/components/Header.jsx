import React from 'react'

import logo from '../images/logo.svg'
import Name from './Name'

import './style/header.css'


const Header = ({hasLogin,onClick}) => (
    <div className="Header">
        {/*<img src={logo} alt="logo"/>*/}
        {/*{!hasLogin ? <Name /> : <span>你已经有了</span>}*/}
        {/*{!hasLogin ? <Name /> : null}*/}
        <Name hasLogin={hasLogin} onClick={onClick}/>
    </div>
)

export default Header
