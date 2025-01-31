import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
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
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants/icons";
import ImageSwiper from "../../components/Swiper";

let quickLinks = [
  {
    title: "Send to Mobile",
    icon: (
      <View className="rounded-full w-[60px] h-[60px] items-center justify-center">
        <Image
          source={icons.mobileTranferIcon}
          className="w-full h-full"
          resizeMethod="cover"
        />
      </View>
    ),
    href: "/mobile-transfer",
  },
  {
    title: "Bank Transfer",
    icon: (
      <View className="rounded-full w-[60px] h-[60px] items-center justify-center">
        <Image
          source={icons.bankTransferIcon}
          className="w-full h-full"
          resizeMethod="cover"
        />
      </View>
    ),
    href: "/bank-transfer",
  },
  {
    title: "Buy Airtime",
    icon: (
      <View className="rounded-full w-[60px] h-[60px] items-center justify-center">
        <Image
          source={icons.phoneicon}
          className="w-full h-full"
          resizeMethod="cover"
        />
      </View>
    ),
    href: "",
  },
  {
    title: "Insurance",
    icon: (
      <View className="rounded-full w-[60px] h-[60px] items-center justify-center">
        <Image
          source={icons.insurance}
          className="w-full h-full"
          resizeMethod="cover"
        />
      </View>
    ),
    href: "",
  },
  {
    title: "Withdraw",
    icon: (
      <View className="rounded-full w-[60px] h-[60px] items-center justify-center">
        <Image
          source={icons.withdrawicon}
          className="w-full h-full"
          resizeMethod="cover"
        />
      </View>
    ),
    href: "",
  },
  {
    title: "Card Service",
    icon: (
      <View className="rounded-full w-[60px] h-[60px] items-center justify-center">
        <Image
          source={icons.cardIcon}
          className="w-full h-full"
          resizeMethod="cover"
        />
      </View>
    ),
    href: "",
  },
];

const otherLinks = [
  {
    title: "Paybill",
    icon: (
      <View className="rounded-full w-[50px] h-[50px] items-center justify-center">
        <Image
          source={icons.voompabill}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
    ),
  },
  {
    title: "Buy goods",
    icon: (
      <View className="rounded-full w-[50px] h-[50px] items-center justify-center">
        <Image
          source={icons.vompaphone}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
    ),
  },
  {
    title: "Lipa karo",
    icon: (
      <View className="rounded-full w-[50px] h-[50px] items-center justify-center">
        <Image
          source={icons.schoolBoy}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
    ),
  },
];

const HomeScreen = () => {
  const { login, loading, error, user, isLogged } = useGlobalContext();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    router.push("/menu");
  };

  const username = user?.user.name;
  const nameParts = username.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts[1] ? nameParts[1].charAt(0) : "";
  return (
    <SafeAreaView className="bg-[#f1f1f1] h-full">
      <ScrollView>
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
            <View className="w-[55%]">
              <Text className="text-[#68b352] font-mnbold text-[14px]">
                Good Evening
              </Text>
              <Text className="text-[28px] font-mnregular text-white uppercase">
                {loading ? "" : `${firstName} ${lastName}.`}
              </Text>
            </View>

            <View className="w-[80px] h-[80px] rounded-full items-center justify-center overflow-hidden">
              {/* {user && user?.user.image ? (
                <Image
                  source={{ uri: user?.user.image }}
                  className="w-full h-full" // Use full width and height
                  resizeMode="cover" // Use cover for better fitting
                />
              ) : (
                <Feather name="user" size={45} color="white" />
              )} */}
              <Image
                source={icons.userIcon}
                className="w-full h-full" // Use full width and height
                resizeMode="cover" // Use cover for better fitting
              />
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
                      className="text-[9.5px] font-mnsemibold uppercase"
                    >
                      {ele.title}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </LinearGradient>
        <Text className=" text-secondary text-[14px] font-mnmedium mt-[100px] w-[80%] ml-auto mr-auto">
          VOOMA PAY
        </Text>
        {/* voompa links */}
        <View className="w-[80%] ml-auto mr-auto flex-row flex-wrap mt-1 justify-between">
          {otherLinks.map((ele, i) => {
            return (
              <TouchableOpacity
                key={i}
                className="w-[31%] p-3 bg-white rounded-xl items-center shadow-xl"
              >
                {ele.icon}
                <Text
                  style={{ textAlign: "center", marginTop: 5 }}
                  className="text-[10px] font-mnsemibold uppercase"
                >
                  {ele.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View className="mt-3 h-[200px] w-[100%] ml-auto mr-auto">
          <Text className=" text-secondary text-[14px] mb-2 font-mnmedium uppercase w-[80%] ml-auto mr-auto">
            Deals
          </Text>
          <ImageSwiper />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
