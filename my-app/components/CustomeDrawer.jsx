import React, { useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";

const { width } = Dimensions.get("window");

const CustomDrawer = ({ isOpen, setIsOpen }) => {
  const drawerWidth = width * 0.75;
  const translateX = useRef(new Animated.Value(-drawerWidth)).current;

  // Log the animation value when triggered
  useEffect(() => {
    console.log("Drawer isOpen:", isOpen); // Debugging the isOpen value
    Animated.timing(translateX, {
      toValue: isOpen ? 0 : -drawerWidth,
      duration: 300,
      useNativeDriver: true,
    }).start(() => console.log("Drawer Animation Finished")); // Log when animation completes
  }, [isOpen]);

  return (
    <SafeAreaView style={{ position: "absolute", top: 0, left: 0, width: 50, height: "100%", zIndex: 1 }}>
      <Animated.View
        style={{
          width: "50%",
          height: "100%",
          backgroundColor: "#1e2559",
          transform: [{ translateX }],
        }}
      >
        {/* Drawer Content */}
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text></Text>
            <TouchableOpacity onPress={() => setIsOpen(false)}>
              <AntDesign name="closecircle" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setIsOpen(false)}>
            <Text style={{ fontSize: 18, color: "white", marginBottom: 15 }}>Link 1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsOpen(false)}>
            <Text style={{ fontSize: 18, color: "white", marginBottom: 15 }}>Link 2</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default CustomDrawer;
