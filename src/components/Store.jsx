import React from 'react'
import {simpleStoreContract} from '../simpleStore'

require('./tree.css')


const Fruit = () => {
    return (
        <div className="fruit-bg">
            fruits
        </div>
    )
}

class Tree extends React.Component {
    state = {
        fruits: []
    }

    getFruitData(){
        return [1, 2, 3, 4, 5, 6]
    }
    componentDidMount() {
        let FruitData = this.getFruitData()
        this.setState({
            fruits:FruitData
        })
    }




    render() {
        return (
            <div>
                <img className="bg_tree" src={tree} />
                {this.state.fruits.map((item, index) => (
                    <Fruit/>
                ))}

            </div>
        )
    }
}

export default Tree
