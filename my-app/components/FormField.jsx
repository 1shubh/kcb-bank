import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";


const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  return (
    <View className={`space-y-2 mt-5 ${otherStyles}`}>
      <Text className="text-base text-primary font-pmedium uppercase">{title}</Text>
      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />
      </View>
    </View>
  );
};

export default FormField;
