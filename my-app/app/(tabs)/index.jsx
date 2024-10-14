import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "@expo/vector-icons/Entypo";
import logo from "../../assets/images/logo.png";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Octicons from "@expo/vector-icons/Octicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import CustomDrawer from "../../components/CustomeDrawer";

let quickLinks = [
  {
    title: "Send to Mobile",
    icon: (
      <View className="rounded-full bg-[#ecf7ea] w-[50px] h-[50px] items-center justify-center">
        <MaterialIcons name="send-to-mobile" size={30} color="#76b461" />
      </View>
    ),
    href: "",
  },
  {
    title: "Bank Transfer",
    icon: (
      <View className="rounded-full bg-[#e9f9fd] w-[50px] h-[50px] items-center justify-center">
        <Feather name="send" size={30} color="#60b8cb" />
      </View>
    ),
    href: "/bank-transfer",
  },
  {
    title: "Buy Airtime",
    icon: (
      <View className="rounded-full bg-[#fdf4e2] w-[50px] h-[50px] items-center justify-center">
        <MaterialIcons name="phone-callback" size={30} color="#d8ac55" />
      </View>
    ),
    href: "",
  },
  {
    title: "Insurance",
    icon: (
      <View className="rounded-full bg-[#e7f8d2] w-[50px] h-[50px] items-center justify-center">
        <FontAwesome6 name="hands-holding-child" size={24} color="#499b2f" />
      </View>
    ),
    href: "",
  },
  {
    title: "Withdraw",
    icon: (
      <View className="rounded-full bg-[#e5e6ed] w-[50px] h-[50px] items-center justify-center">
        <FontAwesome6 name="money-bill-transfer" size={24} color="#4e4e6a" />
      </View>
    ),
    href: "",
  },
  {
    title: "Card Service",
    icon: (
      <View className="rounded-full bg-[#e4f2f0] w-[50px] h-[50px] items-center justify-center">
        <Octicons name="credit-card" size={30} color="#6fa09b" />
      </View>
    ),
    href: "",
  },
];

const otherLinks = [
  {
    title: "Paybill",
    icon: (
      <View className="rounded-full bg-[#861054] w-[50px] h-[50px] items-center justify-center">
        <FontAwesome5 name="receipt" size={24} color="white" />
      </View>
    ),
  },
  {
    title: "Buy goods",
    icon: (
      <View className="rounded-full bg-[#861054] w-[50px] h-[50px] items-center justify-center">
        <FontAwesome5 name="file-invoice-dollar" size={24} color="white" />
      </View>
    ),
  },
  {
    title: "Lipa karo",
    icon: (
      <View className="rounded-full bg-[#861054] w-[50px] h-[50px] items-center justify-center">
        <FontAwesome5 name="user-graduate" size={24} color="white" />
      </View>
    ),
  },
];

const HomeScreen = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    console.log("Drawer toggled, isDrawerOpen:", !isDrawerOpen); // Debugging the state change
  };
  return (
    <>
      {/* <CustomDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} /> */}

      <SafeAreaView className="bg-[#f1f1f1] h-full">
        <LinearGradient
          colors={[
            "#63bc46",
            "#00b15c",
            "#00a06c",
            "#008b74",
            "#007374",
            "#005a6d",
            "#0e425f",
            "#1f2c4c",
          ]}
          start={{ x: 1, y: 0 }} // Start at the top right
          end={{ x: 1, y: 1 }} // End at the bottom left
          className="h-[45%] rounded-b-[80px]"
        >
          {/* navbar */}
          <View className="px-5 flex-row items-center gap-10">
            <TouchableOpacity onPress={toggleDrawer}>
              <Entypo name="menu" size={45} color="white" />
            </TouchableOpacity>
            <Image
              source={logo}
              className="w-[160px] h-[84px]"
              resizeMode="contain"
            />
          </View>

          {/* user details */}
          <View className="flex-row items-center w-[75%] justify-between mt-5 ml-auto mr-auto">
            <View className="w-[50%]">
              <Text className="text-[#68b352] font-dBold">Good Evening</Text>
              <Text className="text-3xl font-dBold text-white">User name</Text>
            </View>
            <View className="w-[100px] h-[100px] border-2 border-white rounded-full items-center justify-center">
              <Feather name="user" size={45} color="white" />
            </View>
          </View>

          {/* Quick links */}
          <View className="w-[80%] ml-auto mr-auto mt-10 bg-white rounded-[30px] p-5 shadow-xl">
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {quickLinks.map((ele, i) => {
                return (
                  <View
                    key={i}
                    style={{
                      width: "30%", // Set width to create 3 columns
                      alignItems: "center", // Center the items
                      marginBottom: 20, // Space between rows
                    }}
                  >
                    <TouchableOpacity onPress={() => router.push(ele.href)}>
                      {ele.icon}
                    </TouchableOpacity>

                    <Text
                      style={{ textAlign: "center", marginTop: 5 }}
                      className="text-[10px] font-semibold uppercase"
                    >
                      {ele.title}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </LinearGradient>
        <Text className=" text-secondary text-[14px] font-semibold mt-[145px] w-[80%] ml-auto mr-auto">
          VOOMA PAY
        </Text>
        {/* voompa links */}
        <View className="w-[80%] ml-auto mr-auto flex-row flex-wrap mt-5 justify-between">
          {otherLinks.map((ele, i) => {
            return (
              <TouchableOpacity
                key={i}
                className="w-[31%] p-3 bg-white rounded-xl items-center shadow-xl"
              >
                {ele.icon}
                <Text
                  style={{ textAlign: "center", marginTop: 5 }}
                  className="text-[10px] font-semibold uppercase"
                >
                  {ele.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
