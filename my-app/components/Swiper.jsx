import { View, Text ,Image,StyleSheet} from "react-native";
import React from "react";
import Swiper from "react-native-swiper";
import banner1 from "../assets/images/banner-1.jpg";
import banner2 from "../assets/images/banner-2.jpg";
import banner3 from "../assets/images/banner-3.jpg";

const images = [
  { id: 1, uri: banner1 },
  { id: 2, uri: banner2 },
  { id: 3, uri: banner3 },
];
const ImageSwiper = () => {
  return (
    <Swiper
      dotColor="#ffffff"
      activeDotColor="red"
      showsPagination={true}
      autoplay={true}
      style={{ height: 200}} // Set height for the Swiper
    >
      {images.map((image) => (
        <View key={image.id} className="flex-1 justify-center items-center rounded-xl">
          <Image source={image.uri} style={styles.image} />
        </View>
      ))}
    </Swiper>
  );
};

export default ImageSwiper;
const styles = StyleSheet.create({
    imageContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: "100%",
      height: "100%", // Ensure the image takes up the entire Swiper height
      resizeMode: "contain",
    },
  });
  