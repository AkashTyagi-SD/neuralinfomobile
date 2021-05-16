import React from "react";
import { View, Image } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { useNavigation } from "@react-navigation/native";
function SplashScreen() {
  const navigation = useNavigation();

  const openNextScreen = () => {
    navigation.replace("tablelist");
  };

  return (
   
      <Onboarding
        onSkip={() => {
          openNextScreen();
        }}
        onDone={() => {
          openNextScreen();
        }}
        pages={[
          {
            backgroundColor: "#fff",
            image: (
              <Image
              style={{height:100,width:100}}
                source={{
                  uri: 'https://reactnative.dev/img/tiny_logo.png'
                }}
              />
            ),
            title: "Onboarding",
            subtitle: "First React Native Onboarding Swiper",
          },
          {
            backgroundColor: "#fff",
            image: (
              <Image
              style={{height:100,width:100}}
                source={{
                  uri: 'https://reactnative.dev/img/tiny_logo.png'
                }}
              />
            ),
            title: "Onboarding",
            subtitle: "Second React Native Onboarding Swiper",
          },
          {
            backgroundColor: "#fff",
            image: (
              <Image
              style={{height:100,width:100}}
                source={{
                  uri: 'https://reactnative.dev/img/tiny_logo.png'
                }}
              />
            ),
            title: "Onboarding",
            subtitle: "Done with React Native Onboarding Swiper",
          },
        ]}
      />
    
  );
}

export default SplashScreen;
