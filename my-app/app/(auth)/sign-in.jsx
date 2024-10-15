import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { useGlobalSearchParams, useRouter, Link } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import CustomButton from "../../components/CutomeButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useGlobalContext } from "../../context/GlobalProvider";

const Signin = () => {
  const router = useRouter();
  const { selectedCountry } = useGlobalSearchParams();
  const [country, setCountry] = useState(selectedCountry || "Choose Country");
  const { login, loading, error, user,setUser, setIsLogged } = useGlobalContext(); // Get login and loading/error states from global context
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  

  const handleLogin = async () => {
    // Validate input
    if (!mobileNumber || !password) {
      Alert.alert("Error", "Please enter both mobile number and PIN.");
      return;
    }
    await login(mobileNumber, password); // Call the login function from context
    // Check if the user is logged in and redirect to the main screen
    if (user) {
      router.push("/(tabs)"); // Navigate after successful login
    }
  };
  

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
      <Text className="text-center text-[30px] text-secondary font-bold">GET</Text>
      <Text className="text-center text-[45px] text-primary font-dBold mt-0">STARTED</Text>
      <Text className="text-secondary text-[15px] font-semibold text-center w-[40%] ml-auto mr-auto mt-5">
        Hi, to proceed kindly enter your phone number.
      </Text>

      {/* Country Input */}
      <TouchableOpacity
        className="w-[80%] ml-auto mr-auto mt-10 h-10 px-4 border-b-[0.5px] border-black-200 focus:border-secondary flex flex-row items-center"
        onPress={() => router.push("/country-list")}
      >
        <Text className="flex-1 text-black font-psemibold text-base">{`${country}`}</Text>
      </TouchableOpacity>

      {/* Phone Number Input */}
      <View className="w-[80%] ml-auto mr-auto mt-10 h-10 px-4 border-b border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-black font-psemibold text-base"
          placeholder={"Mobile Number"}
          placeholderTextColor="black"
          keyboardType="phone-pad"
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />
      </View>

      {/* PIN Input */}
      <View className="w-[80%] ml-auto mr-auto mt-10 h-10 px-4 border-b border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-black font-psemibold text-base"
          placeholder={"PIN"}
          placeholderTextColor="black"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Error Message */}
      {error ? (
        <Text className="text-red-500 text-center mt-2">{error}</Text>
      ) : null}

      {/* Terms Text */}
      <Text className="w-[50%] ml-auto mr-auto text-center mt-5">
        By entering your phone number you agree to the terms of service of the KCB Bank App
      </Text>

      {/* Proceed Button */}
      <CustomButton
        title={loading ? "Please wait..." : "PROCEED"}
        containerStyles={`bg-primary w-[50%] ml-auto mr-auto mt-5 ${loading ? "opacity-50" : ""}`}
        textStyles={"text-white"}
        handlePress={handleLogin} // Call the handleLogin function on press
        disabled={loading} // Disable button while loading
      />

      {/* Loading Indicator */}
      {loading && (
        <ActivityIndicator size="large" color="#1f2c4c" style={{ marginTop: 20 }} />
      )}
    </SafeAreaView>
  );
};

export default Signin;
