import React, { Component } from "react";
import { connect } from "react-redux";

import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";

// import { increment } from "../../store/actions/actions"; // Import functions individually
import * as actionCreators from "../../store/actions/actions";

// import * as actionTypes from "../../store/actions";

class Counter extends Component {
  /* Local component state handling no longer needed.  Instead we handle state through redux global state via props.
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
  */

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
        <CounterControl label="Add 10" clicked={this.props.onAddCounter} />
        <CounterControl
          label="Subtract 15"
          clicked={this.props.onSubtractCounter}
        />
        <hr />
        <button onClick={() => this.props.onStoreResult(this.props.ctr)}>
          Store Result
        </button>
        <ul>
          {this.props.storedResults.map(strResult => (
            <li
              key={strResult.id}
              onClick={() => this.props.onDeleteResult(strResult.id)}
            >
              {strResult.value}
            </li>
          ))}
        </ul>
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
    ctr: state.ctr.counter,
    storedResults: state.res.results
  };
};

/*
  Here we say which kind of actions do want to dispatch to the store.
  Will need action type and payload.
  This receives the dispatch() function which we can execute as an argumen
*/
const mapDispatchToProps = dispatch => {
  return {
    // Using action creators
    onIncrementCounter: () => dispatch(actionCreators.increment()), // increment() function is executed to return the action
    onDecrementCounter: () => dispatch(actionCreators.decrement()),
    onAddCounter: () => dispatch(actionCreators.add(10)),
    onSubtractCounter: () => dispatch(actionCreators.subtract(15)),

    onStoreResult: result => dispatch(actionCreators.storeResult(result)),
    onDeleteResult: id => dispatch(actionCreators.deleteResult(id))

    /* Prior to using action creators
    onIncrementCounter: () => dispatch({ type: actionTypes.INCREMENT }),
    onDecrementCounter: () => dispatch({ type: actionTypes.DECREMENT }),
    onAddCounter: () => dispatch({ type: actionTypes.ADD, val: 5 }),
    onSubtractCounter: () => dispatch({ type: actionTypes.SUBTRACT, val: 5 }),

    onStoreResult: result =>
      dispatch({ type: actionTypes.STORE_RESULT, result: result }),
    onDeleteResult: id =>
      dispatch({ type: actionTypes.DELETE_RESULT, resultElId: id })
    */
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
