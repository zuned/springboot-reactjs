import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'

class Counter extends Component {
    constructor() {
        super();
        this.state = {
            counter : 0
        }

        this.updateState = this.updateState.bind(this);
    }

    render() {
        return (
            <div className="counter">
              <CounterButton updateState={this.updateState}></CounterButton>
              <CounterButton by={5} updateState={this.updateState}></CounterButton>
              <CounterButton by={10} updateState={this.updateState} > </CounterButton>
              <span className="count" 
                //style={style}
                >{this.state.counter}</span>
            </div>
          )
    }

    updateState(by) {
        console.log(`Increment Called from Child for ${by}`);
        this.setState((preState)=>{
            return {counter : preState.counter + by}
        });
        // this.setState({
        //     counter : this.state.counter + by
        // });
    }
}


class CounterButton extends Component {
    constructor() {
        super();
        this.state = {
            counter : 0
        }

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.updateState = this.updateState.bind(this);
        this.reset = this.reset.bind(this);
    }
    render () {
       // const style = {fontSize:"50px", padding : "15px 30px"};
        return (
            <div className="counter">
                <Button variant="outline-primary" onClick={this.increment}>+{this.props.by}</Button>{' '}
                <Button variant="outline-primary" onClick={this.decrement}>-{this.props.by}</Button>{' '}
                <span className="count" 
                //style={style}
                >{this.state.counter}</span>
                 <Button variant="outline-primary" onClick={this.reset}>Reset</Button>{' '}
            </div>
        )
    }

    increment() {
        this.updateState(this.props.by);
    }

    decrement(){
        this.updateState(-this.props.by);
    }

    updateState(by){
        this.setState({
            counter : this.state.counter + by
        });
        this.props.updateState(by);
    }

    reset() {
        this.updateState(this.state.counter * -1);
    }
}

CounterButton.defaultProps = {
    by : 1
}

CounterButton.propTypes = {
    by : PropTypes.number
}

export default Counter