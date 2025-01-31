import { View, Text, Image, ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../context/GlobalProvider";
import { useState } from "react";
import { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import CircularProgress from "../components/Circle";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "../components/CutomeButton";
import { icons } from "../constants/icons";
const Menu = () => {
  const { loading, user, login, logout } = useGlobalContext();
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

  const handleLogout = () => {
    logout();
    router.replace("/sign-in");
  };
  return (
    <SafeAreaView className="bg-secondary h-full">
      <View className="flex-row justify-between items-center py-5 px-5 bg-white">
        <View className="flex-row gap-5 items-center">
          <Ionicons
            name="arrow-back"
            size={20}
            color="black"
            onPress={() => router.back()}
          />

          <Text className="font-semibold text-[17px] text-black uppercase">
            Menu
          </Text>
        </View>
      </View>
      {loading || !userData ? (
        <View className="h-screen items-center justify-center">
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <View className="px-5">
          <View className="mt-5 flex-row items-center justify-between">
            <Text className="text-white text-xl font-dBold">
              {userData?.name}
            </Text>
            <View className="w-[100px] h-[100px] rounded-full items-center justify-center overflow-hidden">
              <Image
                source={icons.greenUser}
                className="w-full h-full" // Use full width and height
                resizeMode="cover" // Use cover for better fitting
              />
            </View>
          </View>
          <CustomButton
            title={"Edit Profile"}
            containerStyles={"mt-5 border py-2 w-[50%] bg-primary"}
            textStyles={"text-white uppercase font-psemibold"}
            handlePress={() => router.push("/edit-profile")}
          />
          <CustomButton
            title={"Logout"}
            containerStyles={"mt-5 border py-2 w-[50%] bg-primary"}
            textStyles={"text-white uppercase font-psemibold"}
            handlePress={handleLogout}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Menu;
