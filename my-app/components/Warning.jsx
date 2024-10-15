import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
const Warning = ({
  setShowConfirmation,
  confirmTransfer,
  amount,
  data,
  recipientAccount,
  otherBank,
}) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.confirmationContainer}>
        <View>
          <View className="border-2 border-[#19c1ef] rounded-full p-5 items-center justify-center w-[150px] h-[150px] ml-auto mr-auto">
            <MaterialIcons name="send-to-mobile" size={80} color="#19c1ef" />
          </View>
          <Text className="text-center text-2xl mt-1 font-dBold text-[#19c1ef]">
            Pesalink Transfer
          </Text>
          <Text style={styles.confirmationText}>
            You are transferring {amount} from {data[0].label} to the account{" "}
            {recipientAccount} at {otherBank}. Do you want to proceed?
          </Text>
          <View className="flex-col gap-2">
            <TouchableOpacity
              className="bg-[#19c1ef] px-10 py-2 rounded-[20px]"
              onPress={confirmTransfer}
            >
              <Text className="text-white text-xl text-center">Proceed</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowConfirmation(false)}>
              <Text className="text-black text-center mt-1 text-xl">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Warning;

const styles = StyleSheet.create({
  dropdown: {
    height: 60,
    borderColor: "gray",
    borderBottomWidth: 1,
    paddingHorizontal: 8,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // White background with slight transparency
  },
  spinnerContainer: {
    backgroundColor: "#fff",
    padding: 10,
    width: "80%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  confirmationContainer: {
    backgroundColor: "#fff",
    padding: 20,
    width: "80%",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  confirmationText: {
    color: "#000",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  confirmButton: {
    backgroundColor: "#63bc46",
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ff4444",
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
