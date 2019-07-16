export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const ADD = "ADD";
export const SUBTRACT = "SUBTRACT";
export const STORE_RESULT = "STORE_RESULT";
export const DELETE_RESULT = "DELETE_RESULT";

export const increment = () => {
  return { type: INCREMENT };
};

export const decrement = () => {
  return { type: DECREMENT };
};

export const add = value => {
  return { type: ADD, val: value };
};

export const subtract = value => {
  return { type: SUBTRACT, val: value };
};

export const storeResult = res => {
  /*
    Simulate prior to action (action to store result) that 
    we reached out to the server to store the result there
    and only update our state once this is successful.
  */

  return { type: STORE_RESULT, result: res };
};

export const deleteResult = resElId => {
  return { type: DELETE_RESULT, resultElId: resElId };
};
