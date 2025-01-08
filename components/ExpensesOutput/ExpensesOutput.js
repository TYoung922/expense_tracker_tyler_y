import { StyleSheet, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

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
];

function ExpensesOutput({ expenses, expensesPeriod }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
