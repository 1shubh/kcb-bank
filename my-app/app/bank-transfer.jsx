import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useNavigation, useGlobalSearchParams } from "expo-router";
import { RadioButton } from "react-native-paper";
import { MaterialIndicator } from "react-native-indicators";
import KcbAccountForm from "../components/KcbAccountForm";
import OtherBankForm from "../components/OtherBankForm";

const BankTransfer = () => {
  const navigation = useNavigation();
  const { selectedBank, bankSelected } = useGlobalSearchParams();
  const [selectedTransferType, setSelectedTransferType] = useState("kcb-bank");
  const [recipientAccount, setRecipientAccount] = useState("");
  const [otherBank, setOtherBank] = useState(selectedBank || "Select Bank");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (bankSelected) {
      setSelectedTransferType("other-bank");
    }
  }, [bankSelected]); // Ensure the effect runs when bankSelected changes

  const validateForm = () => {
    // Validation logic (ensure you define all variables used here)
    let valid = true;
    if (!recipientAccount.trim()) {
      valid = false;
    }
    return valid;
  };

  const handleProceed = () => {
    if (validateForm()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        Alert.alert("Success", "The amount has been successfully transferred.");
        router.push("/(tabs)");
      }, 10000);
    } else {
      Alert.alert("Error", "Please fill out all fields correctly.");
    }
  };

  const handleOtherBankPress = () => {
    // Simply switch the transfer type without locking it
    setSelectedTransferType("other-bank");
    navigation.navigate("select-bank", { setRecipientAccount });
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

      {loading ? (
        <View className="h-full w-full flex-col items-center justify-center">
          <View className="h-[100] w-full">
            <MaterialIndicator color="#63bc46" size={100} />
          </View>
          <Text className="text-[#63bc46] text-2xl font-dBold">Hold on...</Text>
        </View>
      ) : (
        <ScrollView className="h-full">
          <View className="mt-5">
            <View className="w-full h-[100px] flex-1 bg-[#f1f1f1] mt-[50px] py-2 text-secondary">
              <Text className="text-center text-xl uppercase px-2">
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
                  <Text className="text-[15px] text-secondary uppercase">
                    KCB Account
                  </Text>
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
                  <Text className="text-[15px] text-secondary uppercase">
                    Other Bank
                  </Text>
                </View>
                <View className="items-center w-[33.33%]">
                  <RadioButton.Android
                    value="mobile"
                    status={
                      selectedTransferType === "mobile"
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() => setSelectedTransferType("mobile")}
                    color="#63bc46"
                  />
                  <Text className="text-[15px] text-secondary uppercase">
                    Mobile
                  </Text>
                </View>
              </View>
            </View>

            <View className="bg-white mt-5 w-[90%] ml-auto mr-auto">
              {selectedTransferType === "kcb-bank" ? (
                <KcbAccountForm
                  recipientAccount={recipientAccount}
                  setRecipientAccount={setRecipientAccount}
                />
              ) : (
                <OtherBankForm
                  otherBank={otherBank}
                  setOtherBank={setOtherBank}
                  recipientAccount={recipientAccount}
                  setRecipientAccount={setRecipientAccount}
                />
              )}
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
    height: "100%",
  },
});
