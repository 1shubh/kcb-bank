import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import Checkbox from "expo-checkbox"; // Ensure this is installed
import { router } from "expo-router";

const SelectDuration = () => {
  const [selectedDuration, setSelectedDuration] = useState({
    twoMonths: true,
    threeMonths: false,
    sixMonths: false,
  });

  const handleCheckBoxChange = (duration) => {
    // Only allow one checkbox to be selected at a time
    setSelectedDuration({
      twoMonths: duration === "twoMonths",
      threeMonths: duration === "threeMonths",
      sixMonths: duration === "sixMonths",
    });

    // Navigate back to the account statement page
    router.push("/account-statement");
  };

  return (
    <SafeAreaView className="bg-white h-full">
      {/* Header */}
      <View className="flex-row justify-between items-center py-5 px-5 bg-primary">
        <View className="flex-row gap-5 items-center">
          <Ionicons
            name="arrow-back"
            size={20}
            color="white"
            onPress={() => router.push("/account-statement")}
          />
          <Text className="font-semibold text-[17px] text-white uppercase">
            Select Duration
          </Text>
        </View>
      </View>

      {/* Duration Selection */}
      <View className="w-[80%] mr-auto ml-auto mt-5">
        {/* Two Months */}
        <View className="flex-row items-center justify-between">
          <Text
            className="border-b border-b-primary pb-5 uppercase w-[80%] text-primary"
            maxFontSizeMultiplier={1}
          >
            Two Months
          </Text>
          <Checkbox
            value={selectedDuration.twoMonths}
            onValueChange={() => handleCheckBoxChange("twoMonths")}
            color={"#63bc46"}
          />
        </View>

        {/* Three Months */}
        <View className="flex-row items-center justify-between mt-2">
          <Text
            className="border-b border-b-primary pb-5 uppercase w-[80%] text-primary"
            maxFontSizeMultiplier={1}
          >
            Three Months
          </Text>
          <Checkbox
            value={selectedDuration.threeMonths}
            onValueChange={() => handleCheckBoxChange("threeMonths")}
            color={"#63bc46"}
          />
        </View>

        {/* Six Months */}
        <View className="flex-row items-center justify-between mt-2">
          <Text
            className="border-b border-b-primary pb-5 uppercase w-[80%] text-primary"
            maxFontSizeMultiplier={1}
          >
            Six Months
          </Text>
          <Checkbox
            value={selectedDuration.sixMonths}
            onValueChange={() => handleCheckBoxChange("sixMonths")}
            color={"#63bc46"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SelectDuration;
