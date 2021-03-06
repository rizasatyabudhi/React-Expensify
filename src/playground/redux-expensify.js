import { createStore, combineReducers } from "redux";
import uuid from "uuid";

// ADD_EXPENSE
const addExpense = (
  { description = "", note = "", amount = 0, createdAt = 0 } = {}
) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

// REMOVE_EXPEMSE
const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});
// EDIT_EXPENSE

const editExpense = (id, update) => ({
  type: "EDIT_EXPENSE",
  id,
  update
});
// SET_TEXT_FILTER
const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text
});

// SORT_BY_DATE
// SORT_BY_AMOUNT
// SET_START_DATE
// SET_END_DATE

// Expenses Reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      // Remove an item based on a given id
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_EXPENSE":
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            // replace old expense with new expense from action.update
            ...action.update
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

// Filters Reducer

const filtersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return { ...state, text: action.text };
    default:
      return state;
  }
};

// Store Creator
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  console.log(store.getState());
});

const expenseOne = store.dispatch(
  addExpense({
    description: "Rent",
    rent: 100
  })
);

const expenseTwo = store.dispatch(
  addExpense({
    description: "Book",
    rent: 200
  })
);

store.dispatch(
  removeExpense({
    id: expenseOne.expense.id
  })
);

store.dispatch(editExpense(expenseTwo.expense.id, { amount: 18000 }));
store.dispatch(setTextFilter("rent"));
const demoState = {
  expenses: [
    {
      id: "wejopfjewf",
      description: "January Rent",
      note: "This was the final payment for that address",
      amount: 54000,
      createdAt: 0
    }
  ],
  filter: {
    text: "rent",
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined
  }
};
