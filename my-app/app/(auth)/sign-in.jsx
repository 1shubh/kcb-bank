import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { useGlobalSearchParams, useRouter, Link } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import CustomButton from "../../components/CutomeButton";
import Ionicons from "@expo/vector-icons/Ionicons";

const Signin = () => {
  const router = useRouter();
  const { selectedCountry, countryCode } = useGlobalSearchParams(); // Extract the country name and code
  const [country, setCountry] = useState(selectedCountry || "Choose Country");

  return (
    <SafeAreaView className="bg-white h-full">
      {/* Back Button and Title */}
      <View className="flex-row items-center gap-10 py-5 px-1">
        <Link href={"/"}>
          <Ionicons name="arrow-back" size={20} color="black" />
        </Link>
        <Text className="font-normal text-[15px]">Get Started</Text>
      </View>

      {/* Icon */}
      <View className="w-[150px] h-[150px] rounded-full ml-auto mr-auto mt-5 items-center justify-center">
        <Entypo name="stopwatch" size={70} color="#1f2c4c" />
      </View>

      {/* Welcome Text */}
      <Text className="text-center text-[30px] text-secondary font-bold">
        GET
      </Text>
      <Text className="text-center text-[45px] text-primary font-dBold mt-0">
        STARTED
      </Text>
      <Text className="text-secondary text-[15px] font-semibold text-center w-[40%] ml-auto mr-auto mt-5">
        Hi, to proceed kindly enter your phone number.
      </Text>

      {/* Country Input */}
      <TouchableOpacity
        className="w-[80%] ml-auto mr-auto mt-10 h-10 px-4 border-b-[0.5px] border-black-200 focus:border-secondary flex flex-row items-center"
        onPress={() => router.push("/country-list")}
      >
        <Text className="flex-1 text-black font-psemibold text-base">
          {`${country}`}
        </Text>
      </TouchableOpacity>

      {/* Phone Number Input */}
      <View className="w-[80%] ml-auto mr-auto mt-10 h-10 px-4 border-b border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-black font-psemibold text-base"
          placeholder={"Mobile Number"}
          placeholderTextColor="black"
        />
      </View>

      {/* Terms Text */}
      <Text className="w-[50%] ml-auto mr-auto text-center mt-5">
        By entering your phone number you agree to the terms of service of the
        KCB Bank App
      </Text>

      {/* Proceed Button */}
      <CustomButton
        title={"PROCEED"}
        containerStyles={"bg-primary w-[50%] ml-auto mr-auto mt-5"}
        textStyles={"text-white"}
        type="number"
        handlePress={() => router.push("/(tabs)")}
      />
    </SafeAreaView>
  );
};

export default Signin;
