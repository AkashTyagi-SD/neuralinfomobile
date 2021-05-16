import React, { Fragment, useState,useEffect } from 'react';

import * as ImagePicker from 'expo-image-picker';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
  Platform 
} from 'react-native';

// const options = {
//     title: 'Select Avatar',
//     customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
//     storageOptions: {
//       skipBackup: true,
//       path: 'images',
//     },
//   };


function ImagePicke() {
    const [filepath,setFilepath]=useState({ data: '',
    uri: ''});
    const [fileData,setFileData]=useState('');
    const [fileUri,setFileUri]=useState('');
  
    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
         
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }

          const { statusgallery } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (statusgallery !== 'granted') {
            alert('Sorry, we need gallery permissions to make this work!');
          }
        }
      })();
    }, []);

    const pickImageFromCamera = async () => {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setFileUri(result.uri);
      }
    };
    
    const pickImageFromGallery = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        allowsMultipleSelection:true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setFileUri(result.uri);
      }
    };
    
    
    function renderFileData() {
        if (fileData) {
          return <Image source={{ uri: 'data:image/jpeg;base64,' + fileData }}
            style={styles.images}
          />
        } else {
        //   return <Image source={require('./assets/dummy.png')}
        //     style={styles.images}
        //   />
        }
      }
    
     function renderFileUri() {
        if (fileUri) {
          return <Image
            source={{ uri: fileUri }}
            style={styles.images}
          />
        } else {
        //   return <Image
        //     source={require('./assets/galeryImages.jpg')}
        //     style={styles.images}
        //   />
        }
      }
    return (
        <Fragment>
             <StatusBar barStyle="dark-content" />
             <SafeAreaView>
             <View style={styles.body}>
            <Text style={{textAlign:'center',fontSize:20,paddingBottom:10}} >Pick Images from Camera & Gallery</Text>
            <View style={styles.ImageSections}>
              <View>
                {renderFileData()}
                <Text  style={{textAlign:'center'}}>Base 64 String</Text>
              </View>
              <View>
                {renderFileUri()}
                <Text style={{textAlign:'center'}}>File Uri</Text>
              </View>
            </View>

            <View style={styles.btnParentSection}>
              <TouchableOpacity onPress={()=>{pickImage()}} style={styles.btnSection}  >
                <Text style={styles.btnText}>Choose File</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>{pickImageFromCamera()}} style={styles.btnSection}  >
                <Text style={styles.btnText}>Directly Launch Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>{pickImageFromGallery()}} style={styles.btnSection}  >
                <Text style={styles.btnText}>Directly Launch Image Library</Text>
              </TouchableOpacity>
            </View>

          </View>
                 </SafeAreaView>
        </Fragment>
    )
}

export default ImagePicke

const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: 'green',
    },
  
    body: {
      backgroundColor: 'green',
      justifyContent: 'center',
      borderColor: 'black',
      borderWidth: 1,
      height: Dimensions.get('screen').height - 20,
      width: Dimensions.get('screen').width
    },
    ImageSections: {
      display: 'flex',
      flexDirection: 'row',
      paddingHorizontal: 8,
      paddingVertical: 8,
      justifyContent: 'center'
    },
    images: {
      width: 150,
      height: 150,
      borderColor: 'black',
      borderWidth: 1,
      marginHorizontal: 3
    },
    btnParentSection: {
      alignItems: 'center',
      marginTop:10
    },
    btnSection: {
      width: 225,
      height: 50,
      backgroundColor: '#DCDCDC',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 3,
      marginBottom:10
    },
    btnText: {
      textAlign: 'center',
      color: 'gray',
      fontSize: 14,
      fontWeight:'bold'
    }
  });