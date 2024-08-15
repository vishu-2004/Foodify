import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput ,ScrollView} from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';


const Header = () => {
  
  return (
   <View >
    <SafeAreaView>
      <ScrollView
      showsVerticalScrollIndicator={false}
      
      >
      <View className = "bg-slate-100 w-[100%] h-25 pt-10 pb-2 flex flex-row j items-center justify-between shadow-black  shadow-lg border-b-1 border-black">
        <View className="items-center bg-slate-200 w-[75%] flex-row ml-7 rounded-3xl">
          <TouchableOpacity>
        <FontAwesome style={{marginLeft:6,marginRight:-7,backgroundColor:"white",padding:8,borderRadius:25}} name="search" size={21} color="black" />
        </TouchableOpacity>
        <TextInput cursorColor={"#FC8019"} className = "   w-[80%] h-12 ml-4 rounded-2xl overflow-hidden " placeholder='Search for Recipes'  inputMode='search'  />

        </View>
        <TouchableOpacity>
        <FontAwesome style={{marginRight:24}} name="bell-o" size={28} color="black"  />
        </TouchableOpacity>
      </View>
      
      </ScrollView>
    </SafeAreaView>
   </View>
  );
}

export default Header;

