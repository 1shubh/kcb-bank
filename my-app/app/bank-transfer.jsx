import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Dropdown } from "react-native-element-dropdown";
import { RadioButton } from "react-native-paper";
import CustomButton from "../components/CutomeButton";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from "react-native-indicators";

const BankTransfer = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedTransferType, setSelectedTransferType] = useState("kcb-bank");

  const [recipientAccount, setRecipientAccount] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(false); // Loading state

  const data = [{ label: "KCB Bank ******2924", value: "1" }];

  // Validate form
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
    if (validateForm()) {
      setLoading(true); // Set loading to true
      // Simulate a network request (replace this with your actual transfer logic)
      setTimeout(() => {
        setLoading(false); // Stop loading
        Alert.alert("Success", "The amount has been successfully transferred.");
        router.push("/(tabs)"); // Navigate back to tabs after 10 seconds
      }, 10000); // Simulating a 10-second delay
    } else {
      Alert.alert("Error", "Please fill out all fields correctly.");
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="flex-row gap-10 items-center px-7">
        <Ionicons
          name="arrow-back"
          size={30}
          color="black"
          onPress={() => router.back()}
        />
        <Text className="font-light text-[20px] text-black uppercase">
          Bank Transfers
        </Text>
      </View>
      <View className="mt-20 relative justify-center">
        <View className="border-2 border-primary w-full bg-primary" />
        <View className="rounded-full ml-10 absolute bg-[#e9f9fd] border-2 border-white w-[80px] h-[80px] items-center justify-center">
          <Feather name="send" size={40} color="#60b8cb" />
        </View>
      </View>

      {loading ? ( // Show spinner instead of the form when loading
        <View className="h-full w-full flex-col items-center  justify-center">
          {/* <ActivityIndicator size="4xl" color="#63bc46" /> */}
          <View className="h-[100] w-full">
            <MaterialIndicator color="#63bc46" size={100} />
          </View>
          <Text className="text-[#63bc46] text-2xl font-dBold">Hold on...</Text>
        </View>
      ) : (
        <ScrollView className="h-full">
          <View className="mt-5">
            {/* Transfer Type Selection */}
            <View className="w-full h-[100px] bg-[#f1f1f1] mt-[50px] flex-row items-center justify-between px-10">
              <View className="items-center">
                <RadioButton.Android
                  value="kcb-bank"
                  status={
                    selectedTransferType === "kcb-bank"
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => setSelectedTransferType("kcb-bank")}
                  color="#63bc46"
                />
                <Text className="text-[15px] text-secondary uppercase">
                  KCB Account
                </Text>
              </View>
              <View className="items-center">
                <RadioButton.Android
                  value="other-bank"
                  status={
                    selectedTransferType === "other-bank"
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => setSelectedTransferType("other-bank")}
                  color="#63bc46"
                />
                <Text className="text-[15px] text-secondary uppercase">
                  Other Bank
                </Text>
              </View>
              <View className="items-center">
                <RadioButton.Android
                  value="mobile"
                  status={
                    selectedTransferType === "mobile" ? "checked" : "unchecked"
                  }
                  onPress={() => setSelectedTransferType("mobile")}
                  color="#63bc46"
                />
                <Text className="text-[15px] text-secondary uppercase">
                  Mobile
                </Text>
              </View>
            </View>

            {/* Conditional Form Rendering */}
            <View className="bg-white mt-5 w-[90%] ml-auto mr-auto">
              {selectedTransferType === "kcb-bank" && (
                <>
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocus && { borderColor: "blue" },
                    ]}
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
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(item) => {
                      setValue(item.value);
                      setIsFocus(false);
                    }}
                  />
                </>
              )}

              {/* Form Fields */}
              <View className="ml-auto mr-auto mt-5 h-20 px-4 border-b border-black-200 focus:border-secondary flex flex-row items-center">
                <TextInput
                  className="flex-1 text-black font-psemibold text-[18px]"
                  placeholder="RECIPIENT ACCOUNT"
                  value={recipientAccount}
                  onChangeText={setRecipientAccount}
                  placeholderTextColor="black"
                />
              </View>

              <View className="ml-auto mr-auto mt-5 h-20 px-4 border-b border-black-200 focus:border-secondary flex flex-row items-center">
                <TextInput
                  className="flex-1 text-black font-psemibold text-[18px]"
                  placeholder="RECIPIENT NAME"
                  value={recipientName}
                  onChangeText={setRecipientName}
                  placeholderTextColor="black"
                />
              </View>

              <View className="ml-auto mr-auto mt-5 h-20 px-4 border-b border-black-200 focus:border-secondary flex flex-row items-center">
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
                title="PROCEED"
                containerStyles="bg-primary w-[50%] ml-auto mr-auto mt-5"
                textStyles="text-white"
                handlePress={handleProceed}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default BankTransfer;

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
});
