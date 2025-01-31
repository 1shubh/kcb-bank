import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { useGlobalSearchParams, useRouter, Link } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import CustomButton from "../../components/CutomeButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useEffect } from "react";
import { Image } from "react-native";
import { icons } from "../../constants/icons";

const Signin = () => {
  const router = useRouter();
  const {
    selectedCountry,
    countryCode,
    countrySelected,
  } = useGlobalSearchParams();
  const [country, setCountry] = useState(selectedCountry || "Kenya");
  const [selctedCountryCode, setCountryCode] = useState(countryCode || "+254");

  const [countryselcected, setCountrSelected] = useState(false);
  const {
    login,
    loading,
    error,
    user,
    setUser,
    setIsLogged,
    isLogged,
  } = useGlobalContext(); // Get login and loading/error states from global context
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (countrySelected) {
      setCountrSelected(true);
    }
  }, []);
  const handleLogin = async () => {
    // Validate input
    if (!mobileNumber) {
      Alert.alert("Error", "Please enter valid mobile number and country code");
      return;
    }
    // await login(mobileNumber, password); // Call the login function from context
    // // Check if the user is logged in and redirect to the main screen
    // if (user || isLogged) {
    //   router.push("/(tabs)"); // Navigate after successful login
    // }
    router.push({
      pathname: "sign-in-pin-screen",
      params: {
        mobileNumber: mobileNumber,
        countryCode: countryCode,
        error: error,
      },
    });
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView className="bg-white">
        {/* Back Button and Title */}
        <View className="flex-row items-center gap-10 py-3 px-1">
          <Link href={"/"}>
            <Ionicons name="arrow-back" size={25} color="black" />
          </Link>
          <Text className="font-mnlight uppercase text-[15px]">
            Get Started
          </Text>
        </View>

        {/* Icon */}
        <View className="w-[150px] h-[150px] p-5 border-[5px] border-gray-300 rounded-full ml-auto mr-auto mt-2 items-center justify-center">
          <Image
            source={icons.signinicon}
            className="w-full h-full"
            resizeMethod="contain"
          />
        </View>

        {/* Welcome Text */}
        <Text
          className="text-center text-[30px] text-secondary font-mregular mt-1"
          maxFontSizeMultiplier={1.2}
        >
          GET
        </Text>
        <Text
          className="text-center text-[45px] text-primary font-mnbold mt-0"
          maxFontSizeMultiplier={1.2}
        >
          STARTED
        </Text>
        <View className="" >
          <Text className="text-secondary text-[16px] text-center ml-auto mr-auto mt-2 font-mnregular" maxFontSizeMultiplier={1.2}>
            Hi, to proceed kindly enter
          </Text>

          <Text className="text-secondary text-[16px] text-center ml-auto mr-auto mt-2 font-mnregular leading-1" maxFontSizeMultiplier={1.2}>
            your phone number.
          </Text>
        </View>

        {/* Country Input */}
        <TouchableOpacity
          className="w-[70%] ml-auto mr-auto mt-10 h-10 px-0 border-b-[0.5px] border-black-200 focus:border-secondary flex flex-row items-center"
          onPress={() => router.push("/country-list")}
        >
          <Text className="flex-1 text-black font-psemibold text-base">{`${country}`}</Text>
        </TouchableOpacity>

        {/* Phone Number Input */}
        <View className="w-[70%] ml-auto mr-auto mt-5 h-10 px-0 justify-between focus:border-secondary flex flex-row items-center">
          <View className="h-full border-b border-black-200 w-[20%]">
            <Text
              className="flex-1 text-black font-psemibold text-[15px] mt-3 text-center"
              maxFontSizeMultiplier={1.2}
            >
              {selctedCountryCode}
            </Text>
          </View>
          <View className="w-[75%] h-full border-b border-black-200">
            <TextInput
              className="flex-1 text-black font-psemibold text-base"
              placeholder={"7xxxxxxx"}
              placeholderTextColor="grey"
              keyboardType="phone-pad"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              maxFontSizeMultiplier={1.2}
            />
          </View>
        </View>

        {/* PIN Input */}
        {/* <View className="w-[70%] ml-auto mr-auto mt-5 h-10 px-4 border-b border-black-200 focus:border-secondary flex flex-row items-center">
          <TextInput
            className="flex-1 text-black font-psemibold text-base"
            placeholder={"PIN"}
            placeholderTextColor="gray"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View> */}

        {/* Error Message */}
        {error ? (
          <Text
            className="text-red-500 text-center mt-2"
            maxFontSizeMultiplier={1.2}
          >
            {error}
          </Text>
        ) : null}

        {/* Terms Text */}
        <Text
          className="w-[70%] ml-auto mr-auto text-center mt-5 font-mnregular"
          maxFontSizeMultiplier={1.2}
        >
          By entering your phone number you agree to the
          <Text className="text-primary"> Terms of Service </Text>
          of the KCB Bank App
        </Text>

        {/* Proceed Button */}
        <CustomButton
          title={loading ? "Please wait..." : "PROCEED"}
          containerStyles={`bg-primary w-[50%] ml-auto mr-auto mt-5 h-[50px] ${
            loading ? "opacity-50" : ""
          }`}
          textStyles={"text-white"}
          handlePress={handleLogin} // Call the handleLogin function on press
          disabled={loading} // Disable button while loading
        />

        {/* Loading Indicator */}
        {loading && (
          <ActivityIndicator
            size="large"
            color="#1f2c4c"
            style={{ marginTop: 20 }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;
