import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomButton from "../components/CutomeButton";
import { router, useGlobalSearchParams } from "expo-router";
const Success = () => {
  const {
    amountTranfered,
    recipientAccountNumber,
    mobileBank,
  } = useGlobalSearchParams();

  return (
    <SafeAreaView className="h-full bg-white">
      <View className="items-center justify-center mt-40">
        <View className="border-[5px] mt-10 border-gray-100 h-[120px] w-[120px] rounded-full items-center justify-center p-5 ml-auto mr-auto">
          <AntDesign name="check" size={50} color="#63bc46" />
        </View>
        <Text className="text-primary uppercase text-center text-[20px] mt-5 font-mnbold">
          {mobileBank ? `SENT TO ${mobileBank}` : " Cash transferred"}
        </Text>
        <View className="w-[50%] border border-secondary ml-auto mr-auto mt-3 bg-secondary"></View>
        <Text className="text-center text-[20px] mt-5 font-mnsemibold">
          KES {amountTranfered}
        </Text>
        <Text className="text-center w-[80%] ml-auto mr-auto font-mnmedium mt-4" maxFontSizeMultiplier={1.1}>
          Your transaction is in process, please wait for the confirmation
          message
        </Text>
      </View>
      <CustomButton
        title={"Okay thanks"}
        containerStyles={"bg-primary mt-20 w-[60%] ml-auto mr-auto h-[50px]"}
        textStyles={"text-white uppercase font-mnmedium"}
        handlePress={() => router.push("/(tabs)")}
      />
    </SafeAreaView>
  );
};

export default Success;
