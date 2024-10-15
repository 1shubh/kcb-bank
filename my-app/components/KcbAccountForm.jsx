import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import CustomButton from "./CutomeButton";

const KcbAccountForm = ({recipientAccount,setRecipientAccount}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [recipientName, setRecipientName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false); // State for loading spinner
  const data = [{ label: "KCB Bank ******2924", value: "1" }];

  const validateForm = () => {
    let valid = true;
    if (
      !recipientAccount.trim() ||
      !recipientName.trim() ||
      !amount ||
      isNaN(amount) ||
      parseFloat(amount) <= 0
    ) {
      valid = false;
    }
    return valid;
  };

  const handleProceed = () => {
    setLoading(true); // Show the spinner
    setTimeout(() => {
      const isValid = validateForm();
      if (isValid) {
        // Handle form submission logic here
        console.log("Form is valid, proceed with submission!");
      } else {
        console.log("Validation failed, please check your input.");
      }
      setLoading(false); // Hide the spinner after validation
    }, 2000); // Simulating an asynchronous operation
  };

  return (
    <>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select KCB Account" : "..."}
        searchPlaceholder="Search..."
        value={"1"}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
      <View className="ml-auto mr-auto mt-5 h-10 px-4 border-b border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-black font-psemibold text-[18px]"
          placeholder="RECIPIENT ACCOUNT"
          value={recipientAccount}
          onChangeText={setRecipientAccount}
          placeholderTextColor="black"
        />
      </View>

      <View className="ml-auto mr-auto mt-5 h-10 px-4 border-b border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-black font-psemibold text-[18px]"
          placeholder="RECIPIENT NAME"
          value={recipientName}
          onChangeText={setRecipientName}
          placeholderTextColor="black"
        />
      </View>

      <View className="ml-auto mr-auto mt-5 h-10 px-4 border-b border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-black font-psemibold text-[18px]"
          placeholder="AMOUNT"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholderTextColor="black"
        />
      </View>

      {/* Proceed Button */}
      <CustomButton
        title="SUBMIT"
        containerStyles="bg-secondary w-[50%] ml-auto mr-auto mt-5"
        textStyles="text-white"
        handlePress={handleProceed}
      />

      {/* Overlay Spinner */}
      {loading && (
        <View style={styles.overlay}>
          <View
            style={styles.spinnerContainer}
            className="flex-row gap-5 items-center"
          >
            <ActivityIndicator size="large" color="#00ff00" />
            <Text style={styles.loadingText}>Validating...</Text>
          </View>
        </View>
      )}
    </>
  );
};

export default KcbAccountForm;

const styles = StyleSheet.create({
    spinnerContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
      height: "100%", // Ensure it takes full height while loading
    },
    holdOnText: {
      marginLeft: 10,
      fontSize: 16,
      color: "#63bc46",
    },
    dropdown: {
      height: 60,
      borderColor: "gray",
      borderBottomWidth: 1,
      paddingHorizontal: 8,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      backgroundColor: 'rgba(255, 255, 255, 0.9)', // White background with slight transparency
    },
    spinnerContainer: {
      backgroundColor: '#fff', // White background for the spinner container
      padding: 10,
      width:"80%",
      borderRadius: 10,
      shadowColor: '#000', // Shadow properties
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5, // For Android shadow
      alignItems: 'center', // Center the content
    },
    loadingText: {
      marginTop: 10,
      color: '#000', // Text color for better visibility on white background
      fontSize: 18,
    },
  });
  