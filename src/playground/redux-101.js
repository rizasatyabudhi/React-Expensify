import { createStore } from "redux";

// Action Creators
const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: "INCREMENT",
  incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: "DECREMENT",
  decrementBy
});

const resetCount = () => ({
  type: "RESET"
});

const setCount = ({ setBy = 1 } = {}) => ({
  type: "SET",
  setBy
});

// Reducers
const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + action.incrementBy
      };
    case "DECREMENT":
      return {
        count: state.count - action.decrementBy
      };
    case "RESET":
      return {
        count: 0
      };
    case "SET":
      return {
        count: action.setBy
      };
    default:
      return state;
  }
};

const store = createStore(countReducer);

// Actions
// I'd like to increment the count
store.dispatch(incrementCount({ incrementBy: 5 }));
store.dispatch(decrementCount({ decrementBy: 10 }));
store.dispatch(resetCount());
store.dispatch(setCount({ setBy: 1000 }));
// I'd like to reset the count to zero

// decrement by 10
