import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import { Redirect, router } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import logo from "../assets/images/logo.png";
import { BankingIcon, icons } from "../constants/icons";
import CustomButton from "../components/CutomeButton";
import { useGlobalContext } from "../context/GlobalProvider";
import { images } from "../constants/images";

const Welcome = () => {
  const { loading, isLogged, user } = useGlobalContext();
  if (!loading && isLogged && user) return <Redirect href="/(tabs)" />;

  return (
    <ImageBackground
      source={images.homebg}
      style={styles.backgroundImage}
      resizeMode="cover"
      className="h-full w-full"
    >
      <SafeAreaView style={styles.safeArea}>
        <View>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <View style={styles.iconContainer}>
            <Image
              source={icons.welcomeIcon}
              resizeMode="contain"
              className="border w-[250px] h-[250px]"
            />
          </View>
          <View style={styles.textContainer}>
            <Text
              style={styles.welcomeText}
              maxFontSizeMultiplier={1.2}
              className="font-mbold"
            >
              Welcome
            </Text>
            <Text
              style={styles.subText}
              maxFontSizeMultiplier={1.2}
              className="font-mregular"
            >
              Welcome to the new {"\n"} and revamped KCB app.
            </Text>
          </View>
        </View>

        {/* Place buttons at the end */}
        <View style={styles.buttonsContainer}>
          <CustomButton
            containerStyles={"border border-white h-[40px]"}
            title={"Learn More"}
            textStyles={"text-white text-[15px] uppercase font-mregular"}
          />
          <CustomButton
            containerStyles={"mt-5 bg-primary h-[40px]"}
            title={"Get Started"}
            textStyles={"text-white text-[15px] uppercase font-mregular"}
            handlePress={() => router.push("/sign-in")}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: "space-between", // Ensures content is spread out
  },
  logo: {
    width: 160,
    height: 80,
    alignSelf: "center",
    marginTop: 0,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  textContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  welcomeText: {
    color: "#63bc46",
    fontSize: 55,
  },
  subText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    marginTop: 10,
    width: "50%",
  },
  buttonsContainer: {
    width: "60%",
    alignSelf: "center",
    marginBottom: 30, // Gives space from the bottom of the screen
  },
});

export default Welcome;
