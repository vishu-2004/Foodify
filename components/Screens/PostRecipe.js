import { View, Text } from 'react-native'
import React from 'react'
import LargeRecipeCard from './LargeRecipeCard';

const PostRecipe = () => {
  return (
    <View>
      <Text>PostRecipe</Text>
      <LargeRecipeCard />
      <LargeRecipeCard/>
      <LargeRecipeCard/>
    </View>
  );
}

export default PostRecipe