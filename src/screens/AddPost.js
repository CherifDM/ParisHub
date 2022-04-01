import React, { useState } from "react";
import { Button, PermissionsAndroid, SafeAreaView, StatusBar, Image, StyleSheet, TextInput, Text, View, TouchableOpacity, Platform, Alert, ActivityIndicator, Dimensions } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import {
  InputField,
  InputWrapper,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
  StatusWrapper,
} from '../components/AddPostComponent.js';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Header from '../components/Header';

const AddPost = ({ navigation, route }) => {
  const [image, setImage] = useState(null);
  const [post, setPost] = useState(null);
  const userId = auth().currentUser.uid;
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1000,
      height: 1000,
      cropping: true,
    }).then((image) => {
      const imageUri = image.path;
      setImage(imageUri);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1000,
      height: 1000,
      cropping: true,
    }).then((image) => {
      const imageUri = image.path;
      setImage(imageUri);
    });
  };

  const submitPost = async () => {
    if(image==null && post== null){
      alert("Tu ne peux pas publier de post vide !");
    }else{
      const imageUrl = await uploadImage();

      firestore()
        .collection('Posts')
        .add({
          userId: userId,
          content: post,
          photo: imageUrl,
          postTime: firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          Alert.alert(
            'Post publié !',
          );
          setPost(null);
          setImage(null);
        })
        .catch((error) => {
          console.log("Une erreur est survenue lors de la tentative d'ajout du post", error);
        });
      navigation.navigate('MonProfil', { userId: userId });
    }
    
  }

  const uploadImage = async () => {

    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);


    try {
      await task;

      const url = await storageRef.getDownloadURL();
      return url;

    } catch (e) {
      console.log(e);
      return null;
    }

  };

  if (image != null) {
    return (
      <View style={styles.container}>
        <Header />
        <KeyboardAwareScrollView>
          <InputWrapper>
            <AddImage source={{ uri: image }} />

            <View style={styles.inputContainer}>
              <TextInput
                value={post}
                onChangeText={(content) => setPost(content)}
                style={styles.input}
                multiline={true}
                maxLength={400}
                placeholder="Votre message ?"
              />
            </View>


            <View style={styles.buttons}>
              <TouchableOpacity style={styles.btno1} onPress={takePhotoFromCamera}>
                <Text style={{ color: 'white' }}>Prends une photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btno2} onPress={choosePhotoFromLibrary}>
                <Text style={{ color: 'white' }}>Importe une photo</Text>
              </TouchableOpacity>

            </View>

            <TouchableOpacity style={styles.button2} onPress={submitPost}>
              <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Ajoute le post !</Text>
            </TouchableOpacity>
          </InputWrapper>
        </KeyboardAwareScrollView>

      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Header />
        <KeyboardAwareScrollView>
          <InputWrapper>
          <AddImage source={require('../images/ajout.png')}/>
            <View style={styles.inputContainer}>
              <TextInput
                value={post}
                onChangeText={(content) => setPost(content)}
                style={styles.input}
                multiline={true}
                maxLength={400}
                placeholder="Votre message ?"
              />
            </View>


            <View style={styles.buttons}>
              <TouchableOpacity style={styles.btno1} onPress={takePhotoFromCamera}>
                <Text style={{ color: 'white' }}>Prenez une photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btno2} onPress={choosePhotoFromLibrary}>
                <Text style={{ color: 'white' }}>Importez une photo</Text>
              </TouchableOpacity>

            </View>

            <TouchableOpacity style={styles.button2} onPress={submitPost}>
              <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Ajoutez le post !</Text>
            </TouchableOpacity>
          </InputWrapper>
        </KeyboardAwareScrollView>

      </View>
    );
  }



}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    //paddingTop: StatusBar.currentHeight,
    backgroundColor: "white",
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  button2: {
    alignItems: "center",
    backgroundColor: "#771822",
    padding: 10,
    //alignSelf: 'center',
    width: '90%',
    borderRadius: 20,
    marginTop: 10,
    marginRight: 10
  },
  btno1: {
    alignItems: "center",
    backgroundColor: "#771822",
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    marginRight: 10
  },
  btno2: {
    alignItems: "center",
    backgroundColor: "#771822",
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  buttons: {
    //flex:1,
    flexDirection: 'row',
    alignContent: "space-between",
    flexWrap: 'wrap'
  },

  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },

  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    height: Dimensions.get('window').height / 13,
    borderColor: '#ccc',
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },



});

export default AddPost;