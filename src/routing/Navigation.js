import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PostDetails from "../screens/PostDetails";
import AllPostList from "../screens/AllPostList";
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
        name="postlist"
        component={AllPostList}
        options={{ title: "Posts" }}
      />
      <Stack.Screen
        name="postdetails"
        component={PostDetails}
        options={{ title: "Post Details" }}
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
