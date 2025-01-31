import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../context/GlobalProvider";
import { useState } from "react";
import { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import CircularProgress from "../components/Circle";
import { router } from "expo-router";

const AccountStatement = () => {
  const { loading, user, login } = useGlobalContext();
  const [selectedButton, setSelectedButton] = useState("Activity");
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState(null); // Store fetched user data

  // Function to fetch user data by mobile number
  const fetchUserByMobile = async () => {
    try {
      const mobileNumber = user?.user?.mobileNumber; // Assuming mobileNumber is available in global context
      if (!mobileNumber) return;

      const response = await fetch(
        `https://bank-backend-1-4cqz.onrender.com/api/users/getUserByMobile/${mobileNumber}`
      );
      const data = await response.json();

      if (response.ok) {
        setUserData(data); // Save fetched user data
      } else {
        console.error("Failed to fetch user data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Call the function to fetch data when component mounts
  useEffect(() => {
    fetchUserByMobile();
  }, []);

  // Refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await login(); // Optionally refresh the global context user data
      await fetchUserByMobile(); // Refresh user data
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false); // End refreshing state
    }
  };
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="flex-row justify-between items-center py-5 px-5 bg-primary">
        <View className="flex-row gap-5 items-center">
          <Ionicons
            name="arrow-back"
            size={20}
            color="white"
            onPress={() => router.back()}
          />

          <Text className="font-semibold text-[17px] text-white uppercase">
            Account statement
          </Text>
        </View>
      </View>
      <TouchableOpacity
        className="w-[50%] h-[50px] border-primary border items-center justify-center ml-auto mr-auto mt-5"
        onPress={() => router.push("/select-duration")}
      >
        <Text className="uppercase text-xl text-primary font-semibold">
          Duration
        </Text>
      </TouchableOpacity>
      <View className="border-b pb-10 w-[90%] ml-auto mr-auto">
        <View className="mt-2">
          <Text className="text-center uppercase text-secondary text-[16px]">
            october 2024
          </Text>
        </View>
        <View className="flex-row items-center justify-between w-[80%] ml-auto mr-auto nt-2">
          <View>
            <CircularProgress percentage={51} radius={60} strokeWidth={5} />
            <Text
              className="text-center text-primary font-semibold mt-2"
              maxFontSizeMultiplier={1}
            >
              KES {userData?.balance}
            </Text>
          </View>
          <View>
            <CircularProgress percentage={49} radius={60} strokeWidth={5} />
            <Text
              className="text-center text-primary font-semibold mt-2"
              maxFontSizeMultiplier={1}
            >
              KES {userData?.balance}
            </Text>
          </View>
        </View>
      </View>
      <View className="border-b pb-10 w-[90%] ml-auto mr-auto mt-5">
        <View className="mt-2">
          <Text className="text-center uppercase text-secondary text-[16px]">
            september 2024
          </Text>
        </View>
        <View className="flex-row items-center justify-between w-[80%] ml-auto mr-auto nt-2">
          <View>
            <CircularProgress percentage={50} radius={60} strokeWidth={5} />
            <Text
              className="text-center text-primary font-semibold mt-2"
              maxFontSizeMultiplier={1}
            >
              KES {userData?.balance}
            </Text>
          </View>
          <View>
            <CircularProgress percentage={50} radius={60} strokeWidth={5} />
            <Text
              className="text-center text-primary font-semibold mt-2"
              maxFontSizeMultiplier={1}
            >
              KES {userData?.balance}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AccountStatement;
