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

const colorMapping = {
  A: "#FF5733",
  B: "#33FF57",
  C: "#3357FF",
  D: "#F3FF33",
  E: "#FF33D4",
  F: "#FF6F33",
  G: "#57FF33",
  H: "#33FFF7",
  I: "#FF3333",
  J: "#F333FF",
  K: "#FFC133",
  L: "#C7FF33",
  M: "#33FF96",
  N: "#8A33FF",
  O: "#FF33A2",
  P: "#33A8FF",
  Q: "#FFA833",
  R: "#FFD433",
  S: "#E833FF",
  T: "#FF333F",
  U: "#33FFDD",
  V: "#FF7E33",
  W: "#87FF33",
  X: "#33DFFF",
  Y: "#33FF9F",
  Z: "#FF333B",
};

// Function to get color based on the first character
const getColorForCharacter = (char) => {
  const uppercaseChar = char.toUpperCase();
  return colorMapping[uppercaseChar] || "#CCCCCC"; // Default to gray if character not found
};

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
  { id: "13", name: "Kenya Commercial Bank", logo: "" },
  { id: "14", name: "Equity Bank Kenya", logo: "" },
  { id: "15", name: "Co-operative Bank of Kenya", logo: "" },
  { id: "16", name: "Standard Chartered Kenya", logo: "" },
  { id: "17", name: "Barclays Bank of Kenya", logo: "" },
  { id: "18", name: "Diamond Trust Bank", logo: "" },
  { id: "19", name: "National Bank of Kenya", logo: "" },
  { id: "20", name: "I&M Bank Kenya", logo: "" },
  { id: "21", name: "Family Bank Kenya", logo: "" },
  { id: "22", name: "NCBA Bank Kenya", logo: "" },
  { id: "23", name: "Stanbic Bank Kenya", logo: "" },
  { id: "24", name: "Absa Bank Kenya", logo: "" },
  { id: "25", name: "Citibank Kenya", logo: "" },
  { id: "26", name: "Gulf African Bank", logo: "" },
  { id: "27", name: "Housing Finance Bank", logo: "" },
  { id: "28", name: "Prime Bank Kenya", logo: "" },
  { id: "29", name: "Victoria Commercial Bank", logo: "" },
  { id: "30", name: "Bank of Africa Kenya", logo: "" },
  { id: "31", name: "Bank of Baroda Kenya", logo: "" },
  { id: "32", name: "Consolidated Bank of Kenya", logo: "" },
  { id: "33", name: "Development Bank of Kenya", logo: "" },
  { id: "34", name: "Ecobank Kenya", logo: "" },
  { id: "35", name: "First Community Bank", logo: "" },
  { id: "36", name: "Guaranty Trust Bank Kenya", logo: "" },
  { id: "37", name: "Habib Bank AG Zurich", logo: "" },
  { id: "38", name: "Jamii Bora Bank", logo: "" },
  { id: "39", name: "Middle East Bank Kenya", logo: "" },
  { id: "40", name: "Oriental Commercial Bank", logo: "" },
  { id: "41", name: "Paramount Universal Bank", logo: "" },
  { id: "42", name: "Spire Bank", logo: "" },
  { id: "43", name: "United Bank for Africa Kenya", logo: "" },
];

const OtherBankList = () => {
  const [searchVisible, setSearchVisible] = useState(false); // Toggle for search input
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [FilteredBanks, setFilteredBanks] = useState(banks); // State for filtered countries

  // Function to handle country selection
  const handleBankSelect = (bank) => {
    router.push({
      pathname: "other-bank-transfer",
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
            onPress={() => router.push("/other-bank-transfer")}
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
            <Text className="font-mnsemibold text-[17px] text-white uppercase">
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
                <View
                  className="w-[50px] h-[50px] rounded-full items-center justify-center"
                  style={{
                    backgroundColor: getColorForCharacter(item.name.charAt(0)),
                  }} // Use the color mapping here
                >
                  <Text className="text-white font-mnbold uppercase text-xl">
                    {item.name.charAt(0)}
                  </Text>
                </View>
                <Text className="text-secondary text-lg font-mnsemibold uppercase">
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
