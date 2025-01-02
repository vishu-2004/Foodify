import { View, Text, Image, TextInput, Pressable,Alert ,Linking} from "react-native";
import React, { useState } from "react";
import Typography from "../components/Typography/Typography";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import AntDesign from "@expo/vector-icons/AntDesign";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const navigation = useNavigation();

  const pickImageAsync = async () => {
    try {
      // Check media library permissions
      
  
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
  
      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      } else {
        Alert.alert('No image selected', 'You did not select any image.');
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };
  return (
    <View className="flex-1 w-full    items-center bg-[#245882] ">
      <Image
        source={require("../assets/authPics/signup.png")}
        className="h-[314px] w-[100%] top-1 absolute -z-10"
      />

      <Image
        source={require("../assets/authPics/signup2.png")}
        className="h-[620] absolute top-[208] w-[90%]"
      />
      <View className="absolute bg-white bottom-[-31] left-3 rounded-3xl z-10 h-[80%] w-[20%]"></View>
      <View className="absolute bg-white bottom-[-31] right-3 rounded-3xl z-10 h-[80%] w-[19%]"></View>
      <Image
        source={require("../assets/logo.png")}
        className="h-[66] absolute w-[66] z-30 top-[255] left-[40]"
      />
      <View className="flex-1 items-center z-20 justify-center">
        <View className="absolute items-center  bottom-[-154] rounded-3xl bg-white w-[93%] h-[80%]">
          <ScrollView className="flex-1 ">
            <Typography variant="xxl" class="text-[30px] pl-1 tracking-wide">
              SignUp
            </Typography>

            <View className="mt-1  ">
              <View className=" flex-row  mt-1 gap-x-3 mb-4 ml-[-5px]">
                <View>
                  <Image
                    source={
                      profileImage
                        ? { uri: profileImage }
                        : require("../assets/authPics/profilepic.png")
                    }
                    className="h-1 w-1 rounded-full border-2 border-gray-300"
                    style={{ height: 60, width: 63 }}
                  />
                  <TouchableOpacity
                    className="absolute bottom-0 right-0 items-center pt-1 bg-[#4E63AE] h-1 w-1 rounded-full"
                    style={{ height: 30, width: 30 }}
                    onPress={() => pickImageAsync()}
                  >
                    <AntDesign name="camerao" size={19} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
              <TextInput
                placeholder="Enter name"
                className="border-black text-base font-Poppins mb-3 pl-4 border rounded-3xl h-[50px] w-[320px]"
                onChangeText={(text) => setName(text)}
              />
              <TextInput
                placeholder="Email"
                className="border-black text-base font-Poppins pt-1 pl-4 border rounded-3xl h-[50px] w-[320px]"
                onChangeText={(text) => setEmail(text)}
                autoCapitalize="none"
              />

              <TextInput
                placeholder="Password"
                className="border-black mt-3 text-base font-Poppins pt-1 pl-4 border rounded-3xl h-[50px] w-[320px] "
                secureTextEntry
                autoCapitalize="none"
                onChangeText={(text) => setPassword(text)}
              />
              <TextInput
                placeholder="Confirm password"
                className="border-black mt-3 text-base font-Poppins pt-1 pl-4 border rounded-3xl h-[50px] w-[320px] "
                secureTextEntry
                autoCapitalize="none"
                onChangeText={(text) => setConfirmPass(text)}
              />
            </View>
            <Pressable className="bg-primaryOrange  mt-5 rounded-3xl w-[320px] justify-center h-[50px]">
              <Typography variant="normal" bold class="text-white text-center">
                Sign Up
              </Typography>
            </Pressable>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("LogInPage");
              }}
            >
              <Typography class="text-[13px] mt-2 text-center">
                Already have an account?
                <Typography
                  bold
                  class="text-[13px]   text-primaryOrange underline"
                >
                  {" "}
                  Log In
                </Typography>
              </Typography>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default SignUpPage;
