const initialState = { counter: 0, results: [] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      /*
        Do not do this.  
          const newState = state // This is mutating the current state because we are simply referencing the state object.
          newState.counter = state.counter + 1
          return newState
        What we need to do is copy the state and that is done a few ways.
      */

      // Here is one way to clone the object
      const newState = Object.assign({}, state); // This will 'clone' the old object in an immutable way giving us a new object
      newState = state.counter + 1;
      return newState;

    case "DECREMENT":
      // Here is another way to clone the object directly is by distributing the properties of the old state, and then updating the property.
      return {
        ...state, // Tells JS to spread the properties and values of the original state, distributes it's properties and values into this new object
        // And then, this steps either adds an additional property to this new object
        // OR if the property was already present due to us distributing the old state
        // properties, update this property (ie here only 'counter' property. Leave results [].)
        counter: state.counter - 1
      };
    case "ADD":
      return {
        ...state,
        counter: state.counter + action.val
      };
    case "SUBTRACT":
      return {
        ...state,
        counter: state.counter - action.val
      };

    case "STORE_RESULT":
      let updatedState = { ...state };
      let updatedResults = [...updatedState.results];
      updatedResults.push(updatedState.counter);
      console.log(updatedState);
      console.log(updatedResults);

      return updatedState;

    // case "DELETE_RESULT":
    //   return {
    //     ...state,
    //     counter: state.counter - action.val
    //   };

    default:
      return state;
  }
};

export default reducer;
