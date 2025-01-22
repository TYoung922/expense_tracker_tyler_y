import { StyleSheet, View, Text, Switch } from "react-native";
import Input from "./Input";
import { GlobalStyles } from "../../constants/styles";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
// import Switch from "../UI/Switch";

function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      //   isValid: defaultValues ? true : false,
      //   isValid: !!defaultValues,
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      //   isValid: !!defaultValues,
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      //   isValid: !!defaultValues,
      isValid: true,
    },
    isIncome: {
      value: defaultValues ? defaultValues.isIncome : false, // default to expense
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
      isIncome: inputs.isIncome.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // show feedback
      //   Alert.alert("Invalid input", "Please check your input values");
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  const [isEnabled, setIsEnabled] = useState(inputs.isIncome.value);
  // const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => {
      const newValue = !previousState;
      setInputs((curInputs) => ({
        ...curInputs,
        isIncome: { value: newValue, isValid: true },
      }));
      return newValue;
    });
  };

  return (
    <View style={styles.form}>
      <Text style={styles.titel}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInputStyle}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInputStyle}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Text style={styles.switchText}>Income or Expense</Text>
      <View style={styles.switchContainer}>
        <Switch
          trackColor={{
            false: "#767577",
            true: GlobalStyles.colors.primary200,
          }}
          thumbColor={isEnabled ? GlobalStyles.colors.accent500 : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        {!isEnabled && (
          <Text style={styles.switchText}>This is an expense.</Text>
        )}
        {isEnabled && <Text style={styles.switchText}>This is income.</Text>}
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
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
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 5,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchText: {
    color: GlobalStyles.colors.primary100,
    paddingLeft: 10,
  },
});
