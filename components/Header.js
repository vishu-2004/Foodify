import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  BackHandler,
} from 'react-native';
import React, { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchFocus, setSearchQuery } from '../redux/action';
import { useNavigation } from '@react-navigation/native';

const Header = ({ autoFocus = false }) => {
  const dispatch = useDispatch();
  const searchFocus = useSelector((state) => state.recipeReducer.searchFocus);
  const searchQuery = useSelector((state) => state.recipeReducer.searchQuery);
  const navigation = useNavigation();

  const handleFocus = () => {
    if (!searchFocus) {
      navigation.navigate("SearchScreen");
    }
  };

  const handleBlur = () => {
    if (searchFocus) {
      console.log("Input blurred");
      dispatch(setSearchFocus(false));
      dispatch(setSearchQuery(''));
    }
  };

  const handleQueryChange = (text) => {
    dispatch(setSearchQuery(text));
  };

  useEffect(() => {
    const handleBackPress = () => {
      if (searchFocus) {
        dispatch(setSearchFocus(false)); // Set focus to false if input is focused
        return true; // Prevent default back behavior (app won't close)
      }
      return false; // Allow default back behavior (app can close)
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    return () => backHandler.remove(); // Clean up listener on unmount
  }, []);

  return (
    <View className="sticky">
      <SafeAreaView>
        <View className="bg-slate-100 w-[100%] h-25 pt-[40] pb-3 flex flex-row items-center justify-between shadow-sm border-b-1 border-black fixed">

          <View className="items-center bg-slate-200 w-[85%] flex-row ml-7 rounded-3xl">
            <TouchableOpacity>
              <FontAwesome
                style={{
                  marginLeft: 6,
                  marginRight: -7,
                  backgroundColor: "white",
                  padding: 8,
                  borderRadius: 25,
                }}
                name="search"
                size={21}
                color="black"
              />
            </TouchableOpacity>
            <TextInput
              cursorColor={"#FC8019"}
              className="w-[90%] font-PoppinsMedium mt-1 h-12 ml-4 rounded-2xl overflow-hidden"
              placeholder="Search for Recipes"
              onChangeText={handleQueryChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={searchQuery}
              autoFocus={autoFocus}
              
            />
          </View>
          {/* <TouchableOpacity>
            <FontAwesome
              style={{ marginRight: 24 }}
              name="bell-o"
              size={28}
              color="black"
            />
          </TouchableOpacity> */}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Header;
