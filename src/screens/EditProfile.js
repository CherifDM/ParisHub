import React, { useEffect, useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
  StyleSheet,
  Alert, Dimensions, Image
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  InputField,
  InputWrapper,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
  StatusWrapper,
} from '../components/AddPostComponent.js';
import { ImageProfile } from '../components/AddPostComponent';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Firebase from '../util/Firebase';
import { FlatList } from 'react-native-gesture-handler';
import Header from '../components/Header';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

const EditProfile = ({ navigation, route }) => {
  const [pseudo, setPseudo] = useState();
  const [pseudoPrevious, setPseudoPrevious] = useState();
  const [nom, setNom] = useState();
  const [users, setUsers] = useState();
  const [prenom, setPrenom] = useState();
  const [userImg, setUserImg] = useState();
  const [image, setImage] = useState();
  const [bio, setBio] = useState();
  const { userId } = route.params;

  useEffect(() => {
    firestore().collection('Users').onSnapshot((snapshot) => setUsers(snapshot.docs.map((doc) => ({ data: doc.data() }))));
    firestore().collection('Users').doc(userId).onSnapshot(document => {
      setNom(document.data().nom);
      setPrenom(document.data().prenom);
      setPseudo(document.data().pseudo);
      setPseudoPrevious(document.data().pseudo);
      setBio(document.data().bio);
      setImage(document.data().userImg);
      setUserImg(document.data().userImg);
    }

    )
  }, [])
  
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1000,
      height: 1000,
      cropping: true,
    }).then((image) => {
      const imageUri = image.path;
      setUserImg(imageUri);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1000,
      height: 1000,
      cropping: true,
    }).then((image) => {
      const imageUri = image.path;
      setUserImg(imageUri);
    });
  };

  const verification = () => {
    for (let i = 0; i < users.length; i++) {
      if (pseudo == users[i].data.pseudo && pseudo!=pseudoPrevious) {
          return false;
      }
    }
    return true;
  }

  const SubmitChanges = async () => {
    if(verification()){
      const imageUrl = await uploadImage();
      firestore()
        .collection('Users').doc(userId).update({
          pseudo: pseudo,
          nom: nom,
          prenom: prenom,
          userImg: imageUrl,
          bio: bio
        })
        .then(() => {
          const profile = {
            photoURL: imageUrl
          }
          auth().currentUser.updateProfile(profile);
          Alert.alert(
            'Modification effectuée !',
          );
        })
        .catch((error) => {
          console.log("Une erreur est survenue lors de la tentative d'ajout du post", error);
        });
      navigation.navigate('MonProfil', { userId: userId });
    }else{
      alert("Pseudo déjà pris, choisis-en un autre !");
    }
    
  }


  const uploadImage = async () => {

    if (userImg == image) {
      return image;
    }
    const uploadUri = userImg;
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

  return (
    <View style={styles.container}>
      <View style={styles.postView}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Image source={require('../images/back.png')} style={styles.retour} /></TouchableOpacity>
        <Image source={require('../images/parishubLogo.png')} style={styles.logo} />

      </View>
      <KeyboardAwareScrollView>
        <View>
          <Text style={{ fontWeight: 'bold', marginLeft: 20, marginTop: 20 }}>PHOTO DE PROFIL</Text>
          <View style={styles.userBtnWrapper2}>
            <View>{userImg != image ? <ImageProfile source={{ uri: userImg }} /> : <ImageProfile source={{ uri: image }} />}</View>
            <View>
              <TouchableOpacity style={styles.button} onPress={() => takePhotoFromCamera()}>
                <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>PRENDS UNE PHOTO</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button2} onPress={() => choosePhotoFromLibrary()}>
                <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>IMPORTE UNE PHOTO</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={{ fontWeight: 'bold', marginLeft: 20, marginTop: 10 }}>NOM</Text>
        <InputWrapper>
          <View style={styles.inputContainer}>
            <TextInput
              value={nom}
              onChangeText={setNom}
              style={styles.input}
            //numberOfLines={1}
            />
          </View>
        </InputWrapper>
        <Text style={{ fontWeight: 'bold', marginLeft: 20, marginTop: 10 }}>PRENOM</Text>
        <InputWrapper>
          <View style={styles.inputContainer}>
            <TextInput
              value={prenom}
              onChangeText={(content) => setPrenom(content)}
              style={styles.input}
            //numberOfLines={1}
            />
          </View>
        </InputWrapper>
        <Text style={{ fontWeight: 'bold', marginLeft: 20, marginTop: 10 }}>PSEUDO</Text>
        <InputWrapper>
          <View style={styles.inputContainer}>
            <TextInput
              value={pseudo}
              onChangeText={(content) => setPseudo(content)}
              style={styles.input}
            //numberOfLines={1}
            />
          </View>
        </InputWrapper>
        <Text style={{ fontWeight: 'bold', marginLeft: 20, marginTop: 10 }}>BIO</Text>
        <InputWrapper>
          <View style={styles.inputContainer2}>
            <TextInput
              value={bio}
              onChangeText={(content) => setBio(content)}
              style={styles.input}
              multiline={true}
              maxLength={65}
            //numberOfLines={1}
            />
          </View>
        </InputWrapper>
        <TouchableOpacity style={styles.button2} onPress={SubmitChanges}>
          <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Enregistrer les modifications !</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>

    </View>
  );
}
export default EditProfile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 10
  },
  btno1: {
    alignItems: "center",
    backgroundColor: "#771822",
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
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
  inputContainer2: {
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    height: Dimensions.get('window').height / 10,
    borderColor: '#ccc',
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  button: {
    alignItems: "center",
    backgroundColor: "#771822",
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: Dimensions.get('window').height / 70,
    marginBottom: Dimensions.get('window').height / 100,
    borderRadius: 20,
    marginTop: 20
  },
  button2: {
    alignItems: "center",
    backgroundColor: "#771822",
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: Dimensions.get('window').height / 70,
    marginBottom: Dimensions.get('window').height / 100,
    borderRadius: 20,
    marginTop: 5
  },
  userBtnWrapper2: {
    flexDirection: 'row',
  },
  logo: {
    flex: 1,
    resizeMode: 'center',
  },
  postView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '10%',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flexDirection: 'row'
  },

  retour: {
    width: 30,
    height: 30,
    marginLeft: 20
  },
});

