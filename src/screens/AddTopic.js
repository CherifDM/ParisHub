import React, {useState} from "react";
import { Button, StatusBar, StyleSheet, View,Alert,} from "react-native";

import ImagePicker from 'react-native-image-crop-picker';
import {
    InputField,
    InputWrapper,
    AddImage,
    SubmitBtn,
    SubmitBtnText,
  } from '../components/AddPostComponent.js';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash'

const AddTopic = ({navigation,route}) => {
    const [image, setImage] = useState(null);
    const [selectedThemes, setSelectedThemes] = useState([]);
    const [description, setDescription] = useState(null);
    const [nom, setNom] = useState(null);
    const [themes, setThemes] = useState([]);
    const user = auth().currentUser;
    const userId = auth().currentUser.uid;
    const THEME_OPTIONS = [
      {
        item: 'Etudes',
        id: 'etudes',
      },
      {
        item: 'IUT',
        id: 'iut',
      },
      {
        item: 'Gaming',
        id: 'gaming',
      },
      {
        item: 'Art',
        id: 'art',
      },
      {
        item: 'Programmation',
        id: 'programmation',
      },
      {
        item: 'Infos',
        id: 'infos',
      },
      {
        item: 'Informatique',
        id: 'informatique',
      },
      {
        item: 'Culture',
        id: 'culture',
      },
      
    ]
    
    
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
        const imageUrl = await uploadImage();

       
        let thms = [];//= selectedThemes.map((doc) => (doc.id));
        for (let theme of selectedThemes) {
          thms.push(theme.id);
      }
         setThemes(thms);



         const res =  firestore()
        .collection('Topics')
        .add({
          createurId: user.uid,
          createurNom:user.displayName,
          nom:nom,
          description: description,
          themes:thms,
          photo: imageUrl,
          dateCreation: firestore.Timestamp.fromDate(new Date()),
          followers: [],
          nbFollowers:0,
        })
        .then(() => {
          setDescription(null);
        })
        .catch((error) => {
          console.log("Une erreur est survenue lors de la tentative d'ajout du topic", error);
        });
        //navigation.navigate('HomeScreen');
      }
    
      const uploadImage = async () => {
        
        if( image == null ) {
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
    
      return (
        <View style={styles.container}>
          <InputWrapper>
            {image != null ? <AddImage source={{uri: image}} /> : null}
            <SubmitBtn onPress={submitPost}>
                <SubmitBtnText>Post</SubmitBtnText>
              </SubmitBtn>
            <InputField
              placeholder="Nom de topic "
              multiline
              numberOfLines={1}
              value={nom}
              onChangeText={(content) => setNom(content)}
            />

            <InputField
              placeholder="Description de topic"
              multiline
              numberOfLines={3}
              value={description}
              onChangeText={(content) => setDescription(content)}
            />

            <SelectBox
                label="Select multiple"
                options={THEME_OPTIONS}
                selectedValues={selectedThemes}
                onMultiSelect={onMultiChange()}
                onTapClose={onMultiChange()}
                isMulti
              />
         
              
          </InputWrapper>
          <Button    title="Choose Photo" onPress={choosePhotoFromLibrary} />
        </View>
      );
      function onMultiChange() {
        return (item) => setSelectedThemes(xorBy(selectedThemes, [item], 'id'))
      }
    
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "white",
    padding: 8
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default AddTopic;