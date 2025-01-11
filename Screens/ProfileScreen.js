import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Typography from "../components/Typography/Typography";
import { useAuth } from "../Contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { ModalContext } from "../Contexts/modalContext";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { randomUUID } from "expo-crypto";
import { decode } from "base64-arraybuffer";

const ProfileScreen = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const { profile, setProfile } = useAuth();
  const modalCtx = useContext(ModalContext);
  const [loading, setLoading] = useState(true);
  const [userName, setuserName] = useState(profile?.name ? profile.name : "");
  const [isRead, setIsRead] = useState(true);

  useEffect(() => {
    const fetchProfileImage = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("users")
          .select("photo_url")
          .eq("id", profile.id)
          .single();

        if (error) throw error;

        if (data?.photo_url) {
          console.log(data.photo_url);

          const { data: publicUrlData } = supabase.storage
            .from("user_pics")
            .getPublicUrl(data.photo_url);

          if (publicUrlData?.publicUrl) {
            setSelectedImage(publicUrlData.publicUrl);
            console.log(publicUrlData.publicUrl);
          }
        }
      } catch (err) {
        console.error("Error fetching profile image:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileImage();
  }, []);

  const handleLogOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error logging out:", error.message);
        modalCtx.openModal("Error", "Logout failed. Please try again.", "OK");
      } else {
        modalCtx.openModal("Success", "Succesfully logged out", "OK");

        navigation.navigate("Splash");
        setProfile(null);
      }
    } catch (err) {
      console.error("Unexpected error during logout:", err);
    }
  };
  const pickImageAsync = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        setSelectedImage(imageUri);

        if (!imageUri?.startsWith("file://")) {
          throw new Error("Invalid image URI format");
        }

        const base64 = await FileSystem.readAsStringAsync(imageUri, {
          encoding: "base64",
        });

        const filePath = `${randomUUID()}.png`;
        const contentType = "image/png";

        const { data, error: uploadError } = await supabase.storage
          .from("user_pics")
          .upload(filePath, decode(base64), { contentType });

        if (uploadError) {
          throw new Error(uploadError.message);
        }

        const imgPath = data.path;

        const { data: publicURLData } = await supabase.storage
          .from("user_pics")
          .getPublicUrl(imgPath);

        if (!publicURLData) {
          throw new Error("Failed to retrieve the public URL.");
        }

        const { error: updateError } = await supabase
          .from("users")
          .update({ photo_url: imgPath })
          .eq("id", profile.id);

        if (updateError) {
          throw new Error(updateError.message);
        }

        setSelectedImage(imageUri);
        console.log("Image uploaded and stored successfully!");
      } else {
        modalCtx.openModal("Note", "You did not select any image.", "OK");
      }
    } catch (error) {
      console.error("Error uploading image:", error.message);
      modalCtx.openModal("Error", error.message, "OK");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View className="flex-1 items-center  bg-white ">
      <Image
        source={require("../assets/bg.jpg")}
        className="h-[31.7%] top-[-30] w-[100%] rounded-2xl absolute -z-10"
      />
      <View className="bg-white w-[130] h-[130] mt-[140] border-black border rounded-full">
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Image
            source={
              selectedImage !== ""
                ? { uri: selectedImage }
                : require("../assets/pic.jpg")
            }
            className="h-[100%] w-[100%] rounded-full border-2 border-gray-300"
          />
        )}

        <TouchableOpacity
          className="absolute bottom-0 right-0 justify-center items-center pt-1 bg-[#4E63AE] h-1 w-1 rounded-full"
          style={{ height: 40, width: 40 }}
          onPress={pickImageAsync}
        >
          <AntDesign
            name="camerao"
            size={22}
            color="white"
            style={{ marginBottom: 3 }}
          />
        </TouchableOpacity>
      </View>
      <View className="flex-1 w-full h-full pl-3">
        <Typography bold class="mt-8 text-[24px] mr-[210]">
          <Typography variant="xl" class="text-primaryOrange text-[26px]">
            User
          </Typography>{" "}
          Details:
        </Typography>
        <Typography variant="normal" class="mt-2 ml-2">
          Name:
        </Typography>
        
        
        <View className="bg-white border-2 font-Poppins pl-3 text-base border-primaryOrange w-[80%] h-[50] rounded-2xl ml-2 mt-2">
            <Typography variant="normal" class="mt-3">{profile.name}</Typography>
        </View>
        <Typography variant="normal" class="mt-2 ml-2">
          Email:
        </Typography>
        <View className="bg-white border-2 font-Poppins pl-3 text-base border-primaryOrange w-[80%] h-[50] rounded-2xl ml-2 mt-2">
            <Typography variant="normal" class="mt-3">{profile.email}</Typography>
        </View>

        <Pressable
          className="justify-center ml-[5] mt-[50]  flex-row rounded-3xl items-center h-[9.6%] w-[94%] bg-primaryOrange"
          onPress={handleLogOut}
        >
          <MaterialIcons
            name="logout"
            size={24}
            color="white"
            style={{ marginLeft: -75, marginRight: 60 }}
          />
          <Typography variant="normal" bold class="text-white text-center ">
            Log out
          </Typography>
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileScreen;
