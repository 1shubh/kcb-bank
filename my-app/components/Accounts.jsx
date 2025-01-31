import { View, Text, Image } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "./CutomeButton";
import { router } from "expo-router";
const Accounts = ({ accountNumber, balance, userData }) => {
  return (
    <View className="w-[80%] ml-auto mr-auto mt-5 h-[200px]">
      <Text className="uppercase font-bold" maxFontSizeMultiplier={1}>Accounts</Text>
      <View className="mt-5 flex-row items-center justify-between relative">
        <View className="w-[60px] h-[60px] border border-gray-300 rounded-full items-center justify-center">
          <Feather name="user" size={30} color="black" />
        </View>
        <View className="w-[55%] h-full absolute left-[60px] top-[10px]">
          <Text className="pl-3 border-b-[1px] border-b-gray-300 font-mnbold"maxFontSizeMultiplier={1}>
           {accountNumber}
          </Text>
          <View className="pl-3">
            <Text className="uppercase font-mnsemibold text-[10px] text-primary" maxFontSizeMultiplier={1}>
              Available Balance
            </Text>
            <Text className="font-bold "maxFontSizeMultiplier={1}>KES {balance}</Text>
            <Text className="uppercase font-mnsemibold text-[10px] text-primary">
              Ledger Balance
            </Text>
            <Text className="font-mnbold" maxFontSizeMultiplier={1}>KES {balance}</Text>
          </View>
        </View>
        <CustomButton
          title={"statement"}
          containerStyles={"border h-[30px] w-[30%] bg-secondary"}
          textStyles={"text-white uppercase text-[12px] font-mnregular"}
          handlePress={()=>router.push("/account-statement")}
        />
      </View>
    </View>
  );
};

export default Accounts;
