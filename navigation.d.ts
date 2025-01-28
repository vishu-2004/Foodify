

export type AuthStackParamList = {
    OptionPage: undefined;
    LogInPage: undefined;
    SignUpPage: undefined;

}
export type HomeStackParamList = {
    home: undefined;
    SearchScreen: undefined;
    RecipeDetailsScreen: undefined;
    RecipeOfTheDayDetails: undefined;
}

export type PostRecipeStackParamList = {
    AiRecipeDisplay: undefined;
    PostRecipe: undefined;
}
export type FavouritesStackParamList = {
    Favourites: undefined;
}
export type ProfileStackParamList = {
    Profile: undefined;
}
export type RootStackParamList = {
    Splash: undefined;
    Auth: AuthStackParamList;
    MainApp: undefined
}
export type TabStackParamList = {
    Home: HomeStackParamList;
    Generate:PostRecipeStackParamList;
    Favourites:FavouritesStackParamList;
    Profile:ProfileStackParamList;
}
export type ScreenNavigationProp = NativeStackScreenProps<
    AuthStackParamList,
    HomeStackParamList,
    PostRecipeStackParamList,
    FavouritesStackParamList,
    ProfileStackParamList,
    RootStackParamList


>