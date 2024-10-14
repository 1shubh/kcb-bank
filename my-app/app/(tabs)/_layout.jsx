import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome6,
  SimpleLineIcons,
} from "@expo/vector-icons"; // Correct imports
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

const Tablayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 100,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: "#f1f1f1",
          borderColor: "#f1f1f1",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? "#1f2c4c" : "transparent",
                padding: 15,
                borderRadius: 50,
              }}
            >
              <Ionicons
                name={focused ? "home-outline" : "home-outline"}
                size={24} // Adjust the size if needed
                color={focused ? "white" : "#63bc46"}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ color: focused ? "#1f2c4c" : "#1f2c4c" }}
              className="text-[15px] font-bold"
            >
              Home
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="savings"
        options={{
          title: "Savings",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? "#1f2c4c" : "transparent",
                padding: 15,
                borderRadius: 50,
              }}
            >
              <MaterialCommunityIcons
                name={focused ? "piggy-bank-outline" : "piggy-bank-outline"} // Piggy bank icon
                size={30} // Adjust size if needed
                color={focused ? "white" : "#63bc46"}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ color: focused ? "#1f2c4c" : "#1f2c4c" }}
              className="text-[15px] font-bold"
            >
              Savings
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="loan"
        options={{
          title: "Loan",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? "#1f2c4c" : "transparent",
                padding: 15,
                borderRadius: 50,
              }}
            >
              <FontAwesome6
                name={focused ? "hand-holding-dollar" : "hand-holding-dollar"} // Piggy bank icon
                size={25} // Adjust size if needed
                color={focused ? "white" : "#63bc46"}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ color: focused ? "#1f2c4c" : "#1f2c4c" }}
              className="text-[15px] font-bold"
            >
              Loan
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? "#1f2c4c" : "transparent",
                padding: 15,
                borderRadius: 50,
              }}
            >
              <SimpleLineIcons
                name={focused ? "wallet" : "wallet"}
                size={25} // Adjust size if needed
                color={focused ? "white" : "#63bc46"}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ color: focused ? "#1f2c4c" : "#1f2c4c" }}
              className="text-[15px] font-bold"
            >
              Account
            </Text>
          ),
        }}
      />
    </Tabs>
  );
};

export default Tablayout;
