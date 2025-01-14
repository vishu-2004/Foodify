import { View, Image, Pressable } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Typography from "../components/Typography/Typography";
import { useNavigation } from "@react-navigation/native";

const OptionPage = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-primaryOrange">
      <StatusBar style="dark" />
      <View className="flex-1 h-[70%] justify-center items-center">
        <Image source={require('../assets/authPics/options.png')} className="absolute  z-10 h-[98%] w-[98%] bottom-5 right-3"/>
        <Image source={require('../assets/authPics/vector.png')} className="absolute -z-10 h-[100%] w-[100%] top-5  "/>
      </View>
      <View className=" justify-center bottom-[117]   items-center  relative z-10">
        <Typography variant="xxl" bold class="text-white  text-center w-[327]">Achieve your health goals with joy and confidence!</Typography>
        <Pressable onPress={()=>{
          navigation.navigate("LogInPage")
        }} className="bg-white w-[327] h-[54] mt-8  justify-center rounded-lg">
          <Typography variant="normal" bold class="text-center text-primaryOrange ">Log In</Typography>

        </Pressable>
        <Pressable onPress={()=>{
          navigation.navigate("SignUpPage");
        }} className="mt-5">
          <Typography variant="normal"bold class="text-white">Create new account</Typography>
        </Pressable>
      </View>
    </View>
  );
};

export default OptionPage;
