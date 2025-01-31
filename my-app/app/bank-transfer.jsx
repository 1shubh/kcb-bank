import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
  TextInput,
} from "react-native";
import Warning from "../components/Warning";
import Otp from "../components/Otp";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useNavigation, useGlobalSearchParams } from "expo-router";
import { RadioButton } from "react-native-paper";
import { MaterialIndicator } from "react-native-indicators";
import KcbAccountForm from "../components/KcbAccountForm";
import OtherBankForm from "../components/OtherBankForm";
import { icons } from "../constants/icons";
import { Dropdown } from "react-native-element-dropdown";
import CustomButton from "../components/CutomeButton";
import { useGlobalContext } from "../context/GlobalProvider";

const BankTransfer = () => {
  const { user } = useGlobalContext();
  const [isFocus, setIsFocus] = useState(false);
  const navigation = useNavigation();
  const {
    selectedBank,
    bankSelected,
    verified,
    amountTransfered,
    accountNumber,
  } = useGlobalSearchParams();
  const [selectedTransferType, setSelectedTransferType] = useState("kcb-bank");
  const [recipientAccount, setRecipientAccount] = useState("");
  const [otherBank, setOtherBank] = useState(selectedBank || "Select Bank");
  const [loading, setLoading] = useState(false);
  const [recipientName, setRecipientName] = useState("");
  const [amount, setAmount] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [step, setStep] = useState(1);
  const { pinVerified, currentStep } = useGlobalSearchParams();
  const data = [{ label: "KCB Bank ******2924", value: "1" }];
  useEffect(() => {
    if (verified) {
      setStep(3);
      setShowConfirmation(true);
      setAmount(amountTransfered);
      setRecipientAccount(accountNumber);
    }
  }, [verified]);

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
    const isValid = validateForm();

    if (isValid) {
      setShowConfirmation(true); // Show confirmation dialog
    } else {
      Alert.alert("Validation Error", "Please check your input.");
    }
    setLoading(false); // Hide the spinner after validation
  };

  const HandleProceed = () => {
    // When navigating to the pin screen, pass a callback param to redirect back
    router.push({
      pathname: "pin-screen",
      params: {
        // You can pass any necessary parameters here
        fromForm: true,
        TransferringAmount: amount,
        transferingTo: recipientName,
        recipientAccountNumber: recipientAccount,
        bankName: otherBank || "Select Bank",
      },
    });
  };

  const confirmTransfer = async (otp) => {
    setLoading(true); // Show loading indicator
    try {
      // Proceed with the transfer logic using OTP
      const response = await fetch(
        "https://bank-backend-1-4cqz.onrender.com/api/users/transfer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: parseFloat(amount),
            recipientAccountNumber: recipientAccount,
            mobileNumber: user.user.mobileNumber, // Sender's mobile number
          }),
        }
      );
      // Handle the response
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.message) {
        router.push({
          pathname: "success",
          params: {
            amountTranfered: amount,
            recipientAccountNumber: recipientAccount,
          },
        });
      } else {
        Alert.alert("Error", "Transfer failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while processing the transfer.");
    } finally {
      setLoading(false); // Hide loading indicator
      setShowConfirmation(false); // Hide confirmation
    }
  };
  const handleOtherBankPress = () => {
    // Simply switch the transfer type without locking it
    setSelectedTransferType("other-bank");
    navigation.navigate("select-bank");
  };

  return (
    <>
      <SafeAreaView className="bg-white h-full relative">
        <View className="flex-row gap-10 items-center px-7">
          <Ionicons
            name="arrow-back"
            size={30}
            color="black"
            onPress={() => router.back()}
          />
          <Text
            className="font-mnlight text-[20px] text-black uppercase"
            maxFontSizeMultiplier={1.2}
          >
            Bank Transfers
          </Text>
        </View>

        <View className="mt-20 relative justify-center">
          <View className="border-2 border-primary w-full bg-primary" />
          <View className="rounded-full ml-10 absolute bg-[#e9f9fd] border-2 border-white w-[90px] h-[90px] items-center justify-center">
            <Image
              source={icons.bankTransferIcon}
              className="w-full h-full object-contain"
            />
          </View>
        </View>
        <ScrollView className="h-full relative">
          <View className="mt-5">
            <View className="w-full h-fit flex-1 bg-[#f1f1f1] mt-[50px] py-2 text-secondary">
              <Text
                className="text-center text-xl uppercase px-2 font-mnmedium"
                maxFontSizeMultiplier={1.2}
              >
                Send To
              </Text>
              <View className="flex-row items-center justify-around">
                <View className="items-center w-[33.33%]">
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
                  <View
                    className="flex-1 items-center"
                    maxFontSizeMultiplier={1.2}
                  >
                    <Text
                      className="text-[15px] text-secondary uppercase font-mnmedium"
                      maxFontSizeMultiplier={1.2}
                    >
                      KCB Account
                    </Text>
                  </View>
                </View>
                <View className="items-center w-[33.33%]">
                  <RadioButton.Android
                    value="other-bank"
                    status={
                      selectedTransferType === "other-bank"
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={handleOtherBankPress} // This function switches to other bank
                    color="#63bc46"
                  />
                  <View
                    className="flex-1 items-center"
                    maxFontSizeMultiplier={1.2}
                  >
                    <Text className="text-[15px] text-secondary font-mnmedium uppercase">
                      Other Bank
                    </Text>
                    <Text className="text-[13px] font-mregular text-primary">
                      [PESALINK]
                    </Text>
                  </View>
                </View>
                <View className="items-center w-[33.33%]">
                  <RadioButton.Android
                    value="mobile"
                    status={
                      selectedTransferType === "mobile"
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() => router.push("/mobile-transfer")}
                    color="#63bc46"
                  />
                  <View
                    className="flex-1 items-center"
                    maxFontSizeMultiplier={1.2}
                  >
                    <Text
                      className="text-[15px] text-secondary uppercase font-mnmedium"
                      maxFontSizeMultiplier={1.2}
                    >
                      Mobile
                    </Text>
                    <Text className="text-[13px] font-mregular text-primary">
                      [PESALINK]
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="bg-white mt-5 w-[90%] ml-auto mr-auto">
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
                  className="flex-1 text-secondary font-mnregular text-[18px]"
                  placeholder="RECIPIENT ACCOUNT"
                  value={recipientAccount}
                  onChangeText={setRecipientAccount}
                  placeholderTextColor="black"
                />
              </View>
              <View className="ml-auto mr-auto mt-5 h-10 px-4 border-b border-black-200 focus:border-secondary flex flex-row items-center">
                <TextInput
                  className="flex-1 text-secondary font-mnregular text-[18px]"
                  placeholder="RECIPIENT NAME"
                  value={recipientName}
                  onChangeText={setRecipientName}
                  placeholderTextColor="black"
                />
              </View>
              <View className="ml-auto mr-auto mt-5 h-10 px-4 border-b border-black-200 focus:border-secondary flex flex-row items-center">
                <TextInput
                  className="flex-1 text-secondary font-mnregular text-[18px]"
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
                containerStyles="bg-secondary w-[50%] text-[15px] h-[40px] ml-auto mr-auto mt-5"
                textStyles="text-white font-mnmedium"
                handlePress={handleProceed}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
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
      {showConfirmation &&
        (step === 3 ? (
          <Otp
            confirmTransfer={confirmTransfer}
            amount={amount}
            recipientAccount={recipientAccount}
          />
        ) : (
          <Warning
            setShowConfirmation={setShowConfirmation}
            confirmTransfer={HandleProceed}
            amount={amount}
            data={data}
            recipientAccount={recipientAccount}
            recipientName={recipientName}
            step={step}
            setStep={setStep}
          />
        ))}
    </>
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
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // White background with slight transparency
  },
  spinnerContainer: {
    backgroundColor: "#fff", // White background for the spinner container
    padding: 10,
    width: "80%",
    borderRadius: 10,
    shadowColor: "#000", // Shadow properties
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
    alignItems: "center", // Center the content
  },
  loadingText: {
    marginTop: 10,
    color: "#000", // Text color for better visibility on white background
    fontSize: 18,
  },
});
