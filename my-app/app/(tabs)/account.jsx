import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useGlobalContext } from "../../context/GlobalProvider";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";

// Button options for accounts, activity, budgets
const buttons = [
  { title: "Accounts", id: 1 },
  { title: "Activity", id: 2 },
  { title: "Budgets", id: 3 },
];

const Account = () => {
  const { loading, user, login } = useGlobalContext();
  const [selectedButton, setSelectedButton] = useState("Activity");
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState(null); // Store fetched user data

  // Function to fetch user data by mobile number
  const fetchUserByMobile = async () => {
    try {
      const mobileNumber = user?.user?.mobileNumber; // Assuming mobileNumber is available in global context
      if (!mobileNumber) return;

      const response = await fetch(`https://bank-backend-a00q.onrender.com/api/users/getUserByMobile/${mobileNumber}`);
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
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading || !userData ? (
          <ActivityIndicator />
        ) : (
          <>
            <View className="flex-row gap-10 items-center px-7">
              <Ionicons
                name="arrow-back"
                size={30}
                color="black"
                onPress={() => router.back()}
              />
              <Text className="font-light text-[18px] text-black uppercase">
                ACCOUNT
              </Text>
            </View>
            <View className="p-10 flex-row items-center justify-between">
              <View>
                <View>
                  <Text className="font-dBold text-secondary text-[12px]">
                    {userData?.name || "Bank Name"}
                  </Text>
                  <Text className="font-dBold text-primary text-[16px]">
                    {userData?.accountNumber}
                  </Text>
                </View>
                <View className="mt-5">
                  <Text className="font-dBold text-secondary uppercase">
                    Available Balance
                  </Text>
                  <Text className="font-dBold text-primary text-[25px]">
                    KES {userData?.balance}
                  </Text>
                </View>
                <View className="mt-5">
                  <Text className="font-dBold text-secondary uppercase">
                    Ledger Balance
                  </Text>
                  <Text className="font-dBold text-primary text-[25px]">
                    KES {userData?.balance}
                  </Text>
                </View>
              </View>
              <View className="w-[100px] h-[100px] border-2 border-white rounded-full items-center justify-center overflow-hidden">
                {userData?.image ? (
                  <Image
                    source={{ uri: userData.image }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                ) : (
                  <Feather name="user" size={45} color="white" />
                )}
              </View>
            </View>
            {/* Other UI components */}
            <View className="flex-row items-center w-[80%] h-10 rounded-[20px] ml-auto mr-auto border border-gray-300">
            {buttons.map((ele) => (
                <TouchableOpacity
                  key={ele.id}
                  className={`w-[33.33%] h-full items-center justify-center ${
                    selectedButton === ele.title ? "bg-primary" : ""
                  } ${
                    selectedButton === "Accounts" ? "rounded-l-[20px]" : ""
                  } ${selectedButton === "Budgets" ? "rounded-r-[20px]" : ""}}
                  onPress={() => setSelectedButton(ele.title)`}
                >
                  <Text
                    className={`text-center font-semibold uppercase object-cover ${
                      selectedButton === ele.title
                        ? "text-white"
                        : "text-secondary"
                    }`}
                  >
                    {ele.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View className="w-[200px] h-[200px] items-center justify-center border-[10px] border-[#0086b9] ml-auto mr-auto mt-5 rounded-full">
              <View>
                <Text className="border border-secondary px-5 py-1 rounded-[20px] text-secondary uppercase font-semibold">
                  October
                </Text>
                <Text className="text-center mt-2 text-[16px]">KES 500</Text>
              </View>
            </View>
            <View className="flex-row items-center justify-center w-[20%] ml-auto mr-auto mt-5">
              <View className="h-[10px] w-[10px] bg-secondary rounded-full"></View>
              <Text className="ml-2 text-secondary font-semibold uppercase">
                General
              </Text>
            </View>
            <View className="w-[80%] py-2 ml-auto mr-auto mt-5 border-t border-secondary flex-row justify-between">
              <Text className="text-[14px] uppercase font-semibold">
                General
              </Text>
              <Text className="text-[14px] uppercase font-semibold">
                KES 500
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;
