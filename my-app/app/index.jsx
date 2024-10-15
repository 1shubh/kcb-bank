import { View, Text, StyleSheet, Image } from "react-native";
import { Redirect, router } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import logo from "../assets/images/logo.png";
import { BankingIcon } from "../constants/icons";
import CustomButton from "../components/CutomeButton";
import { useGlobalContext } from "../context/GlobalProvider";
const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();
  if (!loading && isLogged) return <Redirect href="/(tabs)" />;

  return (
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
      start={{ x: 1, y: 0.1 }} // Start at the top right
      end={{ x: 0, y: 1 }} // End at the bottom left
      style={styles.container}
    >
      <SafeAreaView>
        <Image
          source={logo}
          className="w-[160px] h-[84px] m-auto mt-10"
          resizeMode="contain"
        />
        <View className="flex-row items-center justify-center mt-20">
          <BankingIcon width={120} height={130} />
        </View>
        <View className="mt-10">
          <Text className="text-center text-primary font-bold text-[45px] font-dBold">
            Welcome
          </Text>
          <Text className="text-white text-center mt-1 w-[50%] m-auto text-[15px]">
            Welcome to the new {"\n"} and revamped KCB app.
          </Text>
        </View>
        <View className="w-[80%] m-auto mt-40">
          <CustomButton
            containerStyles={"border border-white"}
            title={"Learn More"}
            textStyles={"text-white"}
          />
          <CustomButton
            containerStyles={"mt-5 bg-primary"}
            title={"Get Started"}
            textStyles={"text-white"}
            handlePress={() => router.push("/sign-in")}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    marginTop: 20,
  },
});

export default Welcome;
