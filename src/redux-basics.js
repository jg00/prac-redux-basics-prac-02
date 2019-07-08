// Run with Node
const redux = require("redux");
const createStore = redux.createStore;

const initialState = {
  counter: 0
};

// Reducer - Remember we only immutably update state.  Also this is 'synchronous'.
const rootReducer = (state = initialState, action) => {
  if (action.type === "INC_COUNTER") {
    // Do not use state.counter++

    /* One way to immutably update state
    let updatedState = { ...state };
    updatedState.counter += 1;
    return updatedState;
    */

    /* Another way to update in one step
        Copy old state
        Then overwrite the one property you want to adjust
        If that value is also a JS object, you need to copy that first too so you never mutate any data.

    */
    return {
      ...state, // Copy old state with the spread operator
      counter: state.counter + 1 // and then override the one property.
    };
  }

  if (action.type === "ADD_COUNTER") {
    return {
      ...state,
      counter: state.counter + action.value
    };
  }
  return state;
};

// Store
const store = createStore(rootReducer);
console.log("a-Initial state", store.getState());

// Typically set up right after the store is created so we get informed about any future dispatches (Excutes for every store.dispatch())
// For every dispatch action, the subscription is triggered.
// Subscription - gets function() argument which executes when state is updated (ie when action reaches reducer)
// The function we pass to .subscribe does not get any arguments
store.subscribe(() => {
  console.log("[Subscription]", store.getState());
});

// Dispatch Action
store.dispatch({ type: "INC_COUNTER" });
store.dispatch({ type: "ADD_COUNTER", value: 10 });
console.log("b-Dispatch Actions", store.getState());
