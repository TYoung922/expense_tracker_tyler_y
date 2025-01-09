import { StyleSheet, View, Text } from "react-native";
import Input from "./Input";
import { GlobalStyles } from "../../constants/styles";
import { useState } from "react";

function ExpenseForm() {
  const [inputValue, setinputValue] = useState({
    amount: "",
    date: "",
    description: "",
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setinputValue((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  return (
    <View style={styles.form}>
      <Text style={styles.titel}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInputStyle}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputValue.amount,
          }}
        />
        <Input
          style={styles.rowInputStyle}
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputValue.date,
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputValue.description,
        }}
      />
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInputStyle: {
    flex: 1,
  },
  form: {
    marginTop: 80,
  },
  titel: {
    fontSize: 24,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary50,
    marginVertical: 24,
    textAlign: "center",
  },
});
