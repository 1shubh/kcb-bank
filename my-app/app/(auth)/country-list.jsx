import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

const countries = [
  { name: "United States", code: "+1" },
  { name: "Kenya", code: "+254" },
  { name: "United Kingdom", code: "+44" },
  // Add more countries
];

const CountryList = () => {
  const navigation = useNavigation();
  const [searchVisible, setSearchVisible] = useState(false); // Toggle for search input
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [filteredCountries, setFilteredCountries] = useState(countries); // State for filtered countries

  // Function to handle country selection
  const handleCountrySelect = (country) => {
    // Pass the selected country name and code to the sign-in screen as strings
    router.push({
      pathname: "sign-in",
      params: { selectedCountry: country.name, countryCode: country.code },
    });
  };

  // Function to handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    // Filter countries based on query
    const filtered = countries.filter(
      (country) =>
        country.name.toLowerCase().includes(query.toLowerCase()) ||
        country.code.includes(query)
    );
    setFilteredCountries(filtered);
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
            <TextInput
              value={searchQuery}
              onChangeText={handleSearch}
              placeholder="Search country"
              placeholderTextColor="white" // Set placeholder text color to white
              className="text-white text-[18px] font-semibold bg-primary"
              style={{ borderBottomWidth: 0 }} // Remove the input border
            />
          ) : (
            // Title Text
            <Text className="font-semibold text-[17px] text-white uppercase">
              Choose country
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
                setFilteredCountries(countries);
              }
              setSearchVisible(!searchVisible);
            }}
          />
        </View>
      </View>

      {/* Country List */}
      <View className="bg-white h-full">
        <FlatList
          data={filteredCountries}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleCountrySelect(item)}>
              <View className="p-4 border-b border-gray-200">
                <Text className="text-black text-lg">
                  {item.name} ({item.code})
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default CountryList;
