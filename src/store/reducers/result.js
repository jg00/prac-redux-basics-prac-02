import * as actionTypes from "../actions/actionTypes";

const initialState = { results: [] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      // Note that the reducer function has to run asynchronously
      // You cannot run asynchronous code here because for example if you have a setTiemout that runs after two seconds, by then
      // the switch statement is already done by then.
      //    setTimeout(() => console.log("some async code"), 2000);

      // We can howerver execute async code with the help of action creators.

      return {
        ...state,
        // results: state.results.concat({ id: new Date(), value: state.counter })  // replaced to get value as action payload
        results: state.results.concat({ id: new Date(), value: action.result })

        /* 
            Note we are still need the value for state.counter.  However, we cannot do state.ctr.coounter b/c
            we do not have access to the global state in reducers.  To get the value
            we just pass it on as an action payload.
        */
      };

    case actionTypes.DELETE_RESULT:
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
