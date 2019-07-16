import * as actionTypes from "./actionTypes";

/*
    storeResult:

    Simulate prior to action (action to store result) that we reached 
    out to the server to store the result there and only update our state 
    once this is successful.

    - With redux-thunk we have access to 'dispatch' function
    - Redux-thunk is middleware.  Middleware runs between the dispatching of an action and 
      the point of time the action reaches the reducer.
    - The thing we do here is we still dispatch an 'action', but then redux-thunk middleware 
      steps in, has access to the 'action' in there, basically 'blocks' the 'old action'
      we could say, and 'dispatches it again in the future'.  Now the 'new action' will
      reach the reducer, but in between, 'redux-thunk' is 'able to wait' because it can
      dispatch an action 'whenever' it wants.
      This is the asyn part and that is why we can execute async code inside of the returned
      function.
    - Below we return a function which will eventually run the 'dispatch' action
  */

// saveResult is our 'synchronous' action creator
export const saveResult = res => {
  return { type: actionTypes.STORE_RESULT, result: res };
};

// This action creator is only possible due to redux-thunk and are called in between.
// They never make it to the reducer.  We only use these as 'utility step' between
// to run our asynchronous code
export const storeResult = res => {
  // This function is doing the 'blocking'.  It 'blocks' the 'old action'
  // from reaching the reducer.
  return function(dispatch) {
    // Asycn code
    setTimeout(() => {
      /*
              Now we would create and infinite loop if we dispatch 'storeResult' ie our action creator.
              - So what we typically do is we 'create asynchronous action creators' which in the end
              dispatches actions created by synchronous ones.
          */
      dispatch(saveResult(res)); // Here we can now dispatch whatever action we want to dispatch which actually updates the state in the store.
    }, 2000);
  };

  // If this acttion creator acts just to return an action and no asynchronous tasks like above.
  //   return { type: STORE_RESULT, result: res };
};

export const deleteResult = resElId => {
  return { type: actionTypes.DELETE_RESULT, resultElId: resElId };
};
