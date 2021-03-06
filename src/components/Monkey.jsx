import React from 'react'
import monkey from '../images/bit_0_0.png'
import monkey_ from '../images/bit_0_1.png'
import monkeyNaked from '../images/bit.png'

import './style/monkey.css'
import connect from "react-redux/es/connect/connect";


class Monkey extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            action: true
        }
        this.tick = this.tick.bind(this)
    }

    tick() {
        this.setState({
            action: !this.state.action
        })
    }


    componentDidMount() {
        setInterval(this.tick, 1000);
    }

    render() {
        if (!this.props.monkey.state) {
            return (
                <div className="bg_bit"></div>
            )
        } else if (this.props.bag.length === 0) {
            return (
                <img className="bg_bit" src={monkeyNaked} alt="bg_bit" />
            )
        } else {
            return (
                <img className="bg_bit" src={this.state.action ? monkey : monkey_} alt="bg_bit" />
            );
        }

    }


}

const mapStateToProps = (state) => {
    return {
        monkey: state.monkey, //猴子
        bag: state.bag //背包
    }
}

const mapDispatchToProps = (dispatch) => {
    return
}

export default connect(mapStateToProps, mapDispatchToProps)(Monkey);
