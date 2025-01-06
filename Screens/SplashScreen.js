import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import Typography from "../components/Typography/Typography";
import { useAuth } from "../Contexts/AuthContext";

const SplashScreen = () => {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  const navigation = useNavigation();
  const { session, loading } = useAuth();

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;

    let ring1Timeout;
    let ring2Timeout;

    if (!loading) {
       ring1Timeout = setTimeout(() => {
        ring1padding.value = withSpring(40);
      }, 100);

       ring2Timeout = setTimeout(() => {
        ring2padding.value = withSpring(20);
      }, 200);
    }

    const navigationTimeout = setTimeout(() => {
      if (!loading && session) {
        navigation.replace("MainApp");
      } else if (!loading && !session) {
        navigation.replace("Auth");
      }
    }, 2000);

    return () => {
      clearTimeout(ring1Timeout);
      clearTimeout(ring2Timeout);
      clearTimeout(navigationTimeout);
    };
  }, [loading, session, navigation, ring1padding, ring2padding]);

  const outerCircleStyle = useAnimatedStyle(() => {
    return {
      padding: ring1padding.value,
    };
  });

  const innerCircleStyle = useAnimatedStyle(() => {
    return {
      padding: ring2padding.value,
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Animated.View style={[styles.OuterCircle, outerCircleStyle]}>
        <Animated.View style={[styles.innerCircle, innerCircleStyle]}>
          <Image style={styles.image} source={require("../assets/Bowl.png")} />
        </Animated.View>
      </Animated.View>
      <View style={styles.textContainer}>
        <Typography bold className="text-white pt-10 text-[39px]">
          Foodify
        </Typography>
        <Typography bold class="text-white text-[20px]">
          DIY Cooking!
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FC8019",
    paddingTop: 40,
  },
  OuterCircle: {
    borderRadius: 180,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    borderRadius: 190,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    opacity: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    zIndex: 1,
    marginTop: 16,
  },
  textContainer: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
