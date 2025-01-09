import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 29.99,
    date: new Date("2024-12-19"),
  },
  {
    id: "e2",
    description: "A pair of pants",
    amount: 89.29,
    date: new Date("2025-01-05"),
  },
  {
    id: "e3",
    description: "Some Bananas",
    amount: 3.74,
    date: new Date("2024-12-29"),
  },
  {
    id: "e4",
    description: "First edition LOTR book",
    amount: 559.99,
    date: new Date("2025-01-02"),
  },
  {
    id: "e5",
    description: "A new videogame",
    amount: 59.99,
    date: new Date("2024-12-30"),
  },
  {
    id: "e6",
    description: "A pair of shoes",
    amount: 29.99,
    date: new Date("2024-12-19"),
  },
  {
    id: "e7",
    description: "A pair of pants",
    amount: 89.29,
    date: new Date("2025-01-05"),
  },
  {
    id: "e8",
    description: "Some Bananas",
    amount: 3.74,
    date: new Date("2024-12-29"),
  },
  {
    id: "e9",
    description: "First edition LOTR book",
    amount: 559.99,
    date: new Date("2025-01-02"),
  },
  {
    id: "e10",
    description: "A new videogame",
    amount: 59.99,
    date: new Date("2024-12-30"),
  },
  {
    id: "e11",
    description: "test length",
    amount: 10.234,
    date: new Date("2025-01-01"),
  },
  {
    id: "e12",
    description: "test length 2",
    amount: 10.236,
    date: new Date("2025-01-02"),
  },
  {
    id: "e13",
    description: "test length 3",
    amount: 10.234,
    date: new Date("2025-01-03"),
  },
  {
    id: "e14",
    description: "test length 4",
    amount: 10.234,
    date: new Date("2024-12-31"),
  },
  {
    id: "e15",
    description: "future test",
    amount: 59.99,
    date: new Date("2025-02-14"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  updateExpense: (id) => {},
  deleteExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
