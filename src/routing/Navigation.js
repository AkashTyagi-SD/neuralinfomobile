import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PostDetails from "../screens/PostDetails";
import AllPostList from "../screens/AllPostList";
import ImagePicke from "../screens/ImagePicke";
import SplashScreen from "../screens/SplashScreen";
import MapScreen from "../screens/MapScreen";
const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1E90FF",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitleAlign: "center",
      }}
    >
     <Stack.Screen
        name="spla"
        component={SplashScreen}
        options={{ title: "AllPostList" }}
      />
      <Stack.Screen
        name="tablelist"
        component={AllPostList}
        options={{ title: "AllPostList" }}
      />
      <Stack.Screen
        name="postdetails"
        component={PostDetails}
        options={{ title: "Post Details" }}
      />
      <Stack.Screen
      name="imagepick"
      component={ImagePicke}
      options={{title:"Image Select"}}
      />
       <Stack.Screen
      name="mapscreen"
      component={MapScreen}
      options={{title:"Map Screen"}}
      />
    </Stack.Navigator>
  );
}
function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default Navigation;
