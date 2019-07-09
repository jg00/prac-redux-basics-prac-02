const initialState = { counter: 0 };

const reducer = (state = initialState, action) => {
  if (action.type === "INCREMENT") {
    return {
      ...state, // Here didnt have to copy state object b/c counter is the only property.  Kept here anyways.
      counter: state.counter + 1
    };
  }

  if (action.type === "DECREMENT") {
    return {
      ...state, // Here didnt have to copy state object b/c counter is the only property.  Kept here anyways.
      counter: state.counter - 1
    };
  }

  if (action.type === "ADD") {
    return {
      ...state,
      counter: state.counter + action.val
    };
  }

  if (action.type === "SUBTRACT") {
    return {
      ...state,
      counter: state.counter - action.val
    };
  }

  return state;
};

export default reducer;
