import {
  View,
  
  Image,
  TextInput,
  Pressable,
  Alert,
  
} from "react-native";
import React, { useContext, useState } from "react";
import Typography from "../components/Typography/Typography";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

import { ModalContext } from "../Contexts/modalContext";
import { supabase } from "../lib/supabase";
import { ActivityIndicator } from "react-native";
import { ScreenNavigationProp } from "../navigation";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  // const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<ScreenNavigationProp>();
  const modalCtx = useContext(ModalContext);

 

  const handleSignUp = async () => {
    if (!email || !password || !confirmPass || !name) {
      modalCtx.openModal(
        "Incomplete",
        "Please fill out all fields to continue.",
        "OK"
      );
      return;
    }

    if (confirmPass !== password) {
      modalCtx.openModal(
        "Password Mismatch",
        "Your password and confirm password do not match.",
        "OK"
      );
      return;
    }

    setLoading(true);

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (authError) {
      modalCtx.openModal("Error", authError.message, "OK");
      setLoading(false);
      return;
    }

    const { user } = authData;
    const { error: insertError } = await supabase.from("users").insert([
      {
        id: user?.id,
        email: email,
        name: name,
      },
    ]);

    if (insertError) {
      console.error(insertError.message);
      modalCtx.openModal("Error in insert", insertError.message, "OK");
    } else {
      modalCtx.openModal("Success", "Account created successfully!", "OK");
      setConfirmPass("");
      setEmail("");
      setPassword("");
      setName("");
      navigation.navigate("LogInPage");
    }

    setLoading(false);
  };
  return (
    <View className="flex-1 w-full    items-center bg-[#245882] ">
      <Image
        source={require("../assets/authPics/logindown.jpg")}
        className="h-[100%] w-[100%] absolute -z-10"
      />

      <View className="flex-1 items-center  justify-center">
        <View className="absolute items-center  bottom-[-34] rounded-3xl bg-white w-[93%] h-[80%]">
          <Image
            source={require("../assets/authPics/signup.png")}
            className="h-[300px] w-[86%] left-5 top-[-170] absolute z-10"
          />
          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 mt-[70] ">
            <Image
              source={require("../assets/logo.png")}
              className="h-[66]  w-[66]  "
            />
            <Typography variant="xxl" class="text-[30px] pl-1 tracking-wide">
              SignUp
            </Typography>

            <View className="mt-3  ">
              <TextInput
                value={name}
                placeholder="Enter name"
                className="border-black text-base font-Poppins mb-3 pl-4 border rounded-3xl h-[50px] w-[320px]"
                onChangeText={(text) => setName(text)}
              />
              <TextInput
                value={email}
                placeholder="Email"
                className="border-black text-base font-Poppins pt-1 pl-4 border rounded-3xl h-[50px] w-[320px]"
                onChangeText={(text) => setEmail(text)}
                autoCapitalize="none"
              />

              <TextInput
                value={password}
                placeholder="Password"
                className="border-black mt-3 text-base font-Poppins pt-1 pl-4 border rounded-3xl h-[50px] w-[320px] "
                secureTextEntry
                autoCapitalize="none"
                onChangeText={(text) => setPassword(text)}
              />
              <TextInput
                value={confirmPass}
                placeholder="Confirm password"
                className="border-black mt-3 text-base font-Poppins pt-1 pl-4 border rounded-3xl h-[50px] w-[320px] "
                secureTextEntry
                autoCapitalize="none"
                onChangeText={(text) => setConfirmPass(text)}
              />
            </View>
            <Pressable
              onPress={() => {
                handleSignUp();
              }}
              disabled={loading}
              className="bg-primaryOrange mt-5 rounded-3xl w-[320px] justify-center h-[50px]"
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" /> 
              ) : (
                <Typography
                  variant="normal"
                  bold
                  class="text-white text-center"
                >
                  Sign Up
                </Typography>
              )}
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
                > Log In
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
