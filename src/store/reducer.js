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
      newState.counter = state.counter + 1;
      return newState; // This then becomes the new state

    case "DECREMENT":
      // Here is another way to clone the object directly is by distributing the properties of the old state, and then updating the property.
      return {
        // This would be creating a new object and populating it with properties of the original state.
        ...state, // Tells JS to spread the properties and values of the original state, distributes it's properties and values into this new object
        // And then, the next steps either adds an additional property to this new object
        // OR if the property was already present due to us distributing the old state
        // properties, update this property (ie here only 'counter' property.
        // we are leaving results array untouched.)
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
      return {
        // Here we update immutably by using .concat() instead of .push()
        // Where as .push manipulates (updates) the original state (ie mutates it),
        // .concat() "returns a new array (important)" and that is why you can do below.
        // .concat() returns a new array (which is the old array) plus the argument you add to .concat().
        // .concat() is an immutable way of updating a property with an array as a value.
        ...state,
        results: state.results.concat({ id: new Date(), value: state.counter })
      };

    /* Another way to update immutably vs using concat() above.
      let updatedState = { ...state };
      let updatedResults = [...updatedState.results];
      updatedResults.push(updatedState.counter);
      console.log(updatedState);
      console.log(updatedResults);
      return updatedState;
      */

    case "DELETE_RESULT":
      /* Do not do this way.  'splice()' mutates
          const id = 2
          state.results.splice(id, 1)  // This 'mutates' the original array.
      */

      /*
      One way is to make a copy of the array
        const id = 2;
        const newArray = [...state.results] // Distribute all elements.  
          // Important - if the elements are objects {}, the objects themselves are still pointing to the same
          // object as before.  So if you need to change a property in that object you have to make a copy of that object.
          // Removing an object from an array though, this is fine because you do not touch the object,
          // you are just removing the object from the array.
        newArray.splice(id,1)
        return {
          ..state,
          results: newArray
        }
      */

      /*
      // Another way is to use the .filter() method (works for primitive types only)
      // .filter() returns a new array.
      // .filter() takes a function.  The function is executed on each element of the array.
        const updatedArray = state.results.filter((result, index) => index !== id )
      */

      /*  
        In our scenario, we have array of objects for results.
      */
      const updatedArray = state.results.filter(
        result => result.id !== action.resultElId
      );

      return {
        ...state,
        results: updatedArray
      };

    default:
      return state;
  }
};

export default reducer;
