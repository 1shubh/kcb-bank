import { View, Text } from "react-native";
import React from "react";

const Activity = ({ month, amount }) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(month);
  const updatedmonth = monthNames[date.getMonth()];
  return (
    <View>
      <View className="w-[200px] h-[200px] items-center justify-center border-[10px] border-[#0086b9] ml-auto mr-auto mt-5 rounded-full">
        <View>
          <Text className="border border-secondary px-5 py-1 rounded-[20px] text-secondary uppercase font-mnsemibold" maxFontSizeMultiplier={1}>
            {updatedmonth}
          </Text>
          <Text className="text-center font-mnsemibold mt-2 text-[16px]" maxFontSizeMultiplier={1}>
            KES {amount}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center justify-center w-full ml-auto mr-auto mt-5">
        <View className="h-[15px] w-[15px] bg-secondary rounded-full"></View>
        <Text className="ml-2 text-secondary font-mnregular uppercase text-[12px]" maxFontSizeMultiplier={1}>
          General
        </Text>
      </View>
      <View className="w-[80%] py-2 ml-auto mr-auto mt-5 border-t border-secondary flex-row justify-between">
        <Text className="text-[14px] uppercase text-secondary font-mnsemibold"  maxFontSizeMultiplier={1}>
          General
        </Text>
        <Text className="text-[13px] uppercase font-mnregular text-secondary">
          KES <Text className="text-[15px] font-mnsemibold"  maxFontSizeMultiplier={1}>{amount}</Text>
        </Text>
      </View>
    </View>
  );
};

export default Activity;
