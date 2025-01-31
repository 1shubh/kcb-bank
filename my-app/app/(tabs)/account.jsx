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
import Activity from "../../components/Activity";
import Budget from "../../components/Budget";
import Accounts from "../../components/Accounts";
import { icons } from "../../constants/icons";

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
  const [Statement, setStatement] = useState([]);
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
        setStatement(data.statement);
      } else {
        console.error("Failed to fetch user data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const latestStatement = Statement.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )[0];

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
        className="h-full"
      >
        {loading || !userData ? (
          <View className="h-screen items-center justify-center">
            <ActivityIndicator size={"large"} />
          </View>
        ) : (
          <>
            <View className="flex-row gap-10 items-center px-7">
              <Ionicons
                name="arrow-back"
                size={30}
                color="black"
                onPress={() => router.back()}
              />
              <Text
                className="font-mnlight text-[18px] text-black uppercase"
                maxFontSizeMultiplier={1}
              >
                ACCOUNT
              </Text>
            </View>
            <View className="p-7 flex-row items-center justify-between">
              <View>
                <View>
                  <Text className="font-mnbold text-secondary text-[12px]"  maxFontSizeMultiplier={1}>
                    KCB BANK
                  </Text>
                  <Text className="font-mnbold text-primary text-[16px]"  maxFontSizeMultiplier={1}>
                    {userData?.accountNumber}
                  </Text>
                </View>
                <View className="mt-5">
                  <Text className="font-mnbold text-secondary uppercase"  maxFontSizeMultiplier={1}>
                    Available Balance
                  </Text>
                  <Text className="font-mnbold text-primary text-[25px]"  maxFontSizeMultiplier={1}>
                    KES {userData?.balance}
                  </Text>
                </View>
                <View className="mt-5">
                  <Text className="font-mnbold text-secondary uppercase"  maxFontSizeMultiplier={1}>
                    Ledger Balance
                  </Text>
                  <Text className="font-mnbold text-primary text-[25px]"  maxFontSizeMultiplier={1}>
                    KES {userData?.balance}
                  </Text>
                </View>
              </View>
              <View className="w-[100px] border-2 border-gray-100 h-[100px] rounded-full items-center justify-center overflow-hidden">
                {/* {userData?.image ? (
                  <Image
                    source={{ uri: userData.image }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                ) : (
                  <Feather name="user" size={45} color="white" />
                )} */}
                <Image
                  source={icons.accountAvatar}
                  className="w-full h-full" // Use full width and height
                  resizeMode="cover" // Use cover for better fitting
                />
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
                  `}
                  onPress={() => setSelectedButton(ele.title)}
                >
                  <Text
                    className={`text-center font-mnsemibold uppercase object-cover ${
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
            {selectedButton === "Accounts" ? (
              <Accounts
                accountNumber={userData.accountNumber}
                balance={userData.balance}
              />
            ) : selectedButton === "Activity" ? (
              <Activity
                amount={latestStatement?.amount}
                month={latestStatement?.date}
              />
            ) : (
              <Budget />
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;
