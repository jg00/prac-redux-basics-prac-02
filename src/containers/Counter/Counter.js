import React, { Component } from "react";
import { connect } from "react-redux";

import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";

class Counter extends Component {
  state = {
    counter: 0
  };

  counterChangedHandler = (action, value) => {
    switch (action) {
      case "inc":
        this.setState(prevState => {
          return { counter: prevState.counter + 1 };
        });
        break;
      case "dec":
        this.setState(prevState => {
          return { counter: prevState.counter - 1 };
        });
        break;
      case "add":
        this.setState(prevState => {
          return { counter: prevState.counter + value };
        });
        break;
      case "sub":
        this.setState(prevState => {
          return { counter: prevState.counter - value };
        });
        break;
      default:
        this.setState(prevState => ({
          counter: prevState
        }));
    }
  };

  render() {
    return (
      <div>
        <CounterOutput value={this.props.ctr} />
        <CounterControl
          label="Increment"
          clicked={this.props.onIncrementCounter}
        />
        <CounterControl
          label="Decrement"
          clicked={this.props.onDecrementCounter}
        />
        <CounterControl label="Add 5" clicked={this.props.onAddCounter} />
        <CounterControl
          label="Subtract 5"
          clicked={this.props.onSubtractCounter}
        />
      </div>
    );
  }
}

/*
  We pass two pieces of info to connect ()
  1 slice of data we want to 'get' (Which part of application state is interesting to us?)
  2 action type we want to 'set'

  The function set to mapStateToProps will eventually be executed by the 'react-redux' package because we pass state to it
  - Below (state) is the state from redux which will be retreived and passed down to this Counter component as props.
  - mapStateToProps() returns an object that is a map of slices of state from redux and assigned to user defined properties which is passed on
  to Counter component.

*/

/* 
  So here we are saying please give me the state.counter we have in our global app state managed by redux
  and give to me in the form of a property 'ctr' which we can use in this component called Counter using props.counter.
  We will no longer manage state using the local class component's 'state'.

  This is the 'get' part of subscribe
*/
const mapStateToProps = state => {
  return {
    ctr: state.counter
  };
};

/*
  Here we say which kind of actions do want to dispatch to the store.
  Will need action type and payload.
  This receives the dispatch() function which we can execute as an argumen
*/
const mapDispatchToProps = dispatch => {
  return {
    onIncrementCounter: () => dispatch({ type: "INCREMENT" }),
    onDecrementCounter: () => dispatch({ type: "DECREMENT" }),
    onAddCounter: () => dispatch({ type: "ADD", val: 5 }),
    onSubtractCounter: () => dispatch({ type: "SUBTRACT", val: 5 })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
