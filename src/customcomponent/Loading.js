import React from 'react';
import { View,Text, ActivityIndicator} from 'react-native';
export default function Loading(props) {
  return (
    <View>
      <ActivityIndicator size='large' color='#1E90FF' animating={props.loading} />
      <Text>Please wait</Text>
    </View>
  );
}
