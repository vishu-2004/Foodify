import { View, Image, TextInput, Pressable,ActivityIndicator } from "react-native";
import React, { useState ,useContext} from "react";
import Typography from "../components/Typography/Typography";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../lib/supabase";
import { ModalContext } from "../Contexts/modalContext";
import { useAuth } from "../Contexts/AuthContext";
import { ScreenNavigationProp } from "../navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const navigation = useNavigation<ScreenNavigationProp>();
  const [loading,setLoading] = useState(false);
  const modalCtx = useContext(ModalContext);
  const {fetchSession} = useAuth();

  const handleSignIn = async () => {
    if (!email || !password ) {
      modalCtx.openModal(
        "Incomplete",
        "Please fill out all fields to continue.",
        "OK"
      );
      return;
    }

   

    setLoading(true);

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (authError) {
      modalCtx.openModal("Error", authError.message, "OK");
      setLoading(false);
      return;
    }

    

  
    else {
      modalCtx.openModal("Success", "Logged In successfully!", "OK");
      
      setEmail("");
      setPassword("");
      await fetchSession();
     
      navigation.navigate("MainApp");
    }

    setLoading(false);
  };
  return (
    <View className="flex-1 bg-[#c1dce5] ">
      <Image
        source={require("../assets/authPics/logindown.jpg")}
        className="h-[100%] w-[100%] absolute -z-10"
      />
      <View className="flex-1 items-center justify-center">
        <View className="absolute items-center  bottom-[-20] rounded-3xl bg-white w-[93%] h-[80%]">
          <Image
            source={require("../assets/authPics/loginup.png")}
            className="absolute top-[-150] z-10 h-[286] w-[340]"
          />
          <View className="flex-1 mt-[80]">
            <Image
              source={require("../assets/logo.png")}
              className="h-[66] w-[66] mb-2 ml-1 mr-[230]"
            />
            <Typography variant="xxl" class="text-[30px] pl-1 tracking-wide">
              Welcome to
            </Typography>
            <Typography
              bold
              class="text-[30px] mt-[-9] ml-1 tracking-wider text-primaryOrange"
            >
              Foodify
            </Typography>

            <View className="mt-4">
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
              <TouchableOpacity>
                <Typography class="text-center text-[13px] underline mt-2 mr-[149]">
                  Forget your password?
                </Typography>
              </TouchableOpacity>
            </View>
            <Pressable 
              onPress={() => {
                handleSignIn();
              }}
              disabled={loading}
            className="bg-primaryOrange  mt-7 rounded-3xl w-[320px] justify-center h-[50px]">
              
              {loading ? (
                <ActivityIndicator size="small" color="#fff" /> 
              ) : (
                <Typography
                  variant="normal"
                  bold
                  class="text-white text-center"
                >
                  Log In
                </Typography>
              )}
              
            </Pressable>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUpPage");
              }}
            >
              <Typography class="text-[13px] mt-2 text-center">
                Don't have an account?
                <Typography
                  bold
                  class="text-[13px]   text-primaryOrange underline"
                >
                  {" "}
                  Sign Up
                </Typography>
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginPage;
