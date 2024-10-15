import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

const banks = [
  { id: "1", name: "ABC Bank", logo: "" },
  { id: "2", name: "ABSA", logo: "" },
  { id: "3", name: "Access bank kenya plc", logo: "" },
  { id: "4", name: "bank of africa", logo: "" },
  { id: "5", name: "bank of baroda kenya ltd", logo: "" },
  { id: "6", name: "chase bank", logo: "" },
  { id: "7", name: "cid bank kenya", logo: "" },
  { id: "8", name: "citibank", logo: "" },
  { id: "9", name: "consolidated bank of kenya", logo: "" },
  { id: "10", name: "cooperative bank", logo: "" },
  { id: "11", name: "credit bank", logo: "" },
  { id: "12", name: "caritas microfinance bank", logo: "" },
];

const OtherBankList = () => {
  const [searchVisible, setSearchVisible] = useState(false); // Toggle for search input
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [FilteredBanks, setFilteredBanks] = useState(banks); // State for filtered countries

  // Function to handle country selection
  const handleBankSelect = (bank) => {
    router.push({
      pathname: "bank-transfer",
      params: { selectedBank: bank.name, bankSelected: true },
    });
  };

  // Function to handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    // Filter countries based on query
    const filtered = banks.filter(
      (banks) =>
        banks.name.toLowerCase().includes(query.toLowerCase()) ||
        banks.code.includes(query)
    );
    setFilteredBanks(filtered);
  };
  return (
    <SafeAreaView>
      {/* Header with Back Button and Title/Search */}
      <View className="flex-row justify-between items-center py-5 px-5 bg-primary">
        <View className="flex-row gap-5 items-center">
          <Ionicons
            name="arrow-back"
            size={20}
            color="white"
            onPress={() => router.back()}
          />
          {searchVisible ? (
            // Search Input
            <View className="border-b border-b-white">
              <TextInput
                value={searchQuery}
                onChangeText={handleSearch}
                placeholder="Search country"
                placeholderTextColor="white" // Set placeholder text color to white
                className="text-white text-[18px] font-semibold bg-primary"
                style={{ borderBottomWidth: 0 }} // Remove the input border
              />
            </View>
          ) : (
            // Title Text
            <Text className="font-semibold text-[17px] text-white uppercase">
              Select Bank
            </Text>
          )}
        </View>

        <View className="">
          {/* Toggle Search Input */}
          <Ionicons
            name={searchVisible ? "close" : "search"}
            size={20}
            color="white"
            onPress={() => {
              if (searchVisible) {
                // Clear search when closing
                setSearchQuery("");
                setFilteredBanks(banks);
              }
              setSearchVisible(!searchVisible);
            }}
          />
        </View>
      </View>
      <View className="bg-white h-full pb-40">
        <FlatList
          data={FilteredBanks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleBankSelect(item)}
              key={item.id}
            >
              <View className="p-4 border-b border-gray-200 flex-row items-center gap-3">
                <View className="w-[50px] h-[50px] bg-primary rounded-full items-center justify-center">
                  <Text className="text-white font-dBold uppercase text-xl">
                    {item.name.charAt(0)}
                  </Text>
                </View>
                <Text className="text-black text-lg uppercase">
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default OtherBankList;
