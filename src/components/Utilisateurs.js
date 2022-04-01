import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Dimensions,
  Button, FlatList
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Utilisateurs = (props) => {
  const userId = props.userId;
  const userIdConnected = props.userIdConnected;
  const navigation = useNavigation();
  const bio = props.bio;
  const [contactsMessages, setContactsMessages] = useState([]);

  useEffect(() => {
    getContactsMessages();
  }, []);
  const getContactsMessages = () => {
    firestore().collection('ContactsMessages').onSnapshot((snapshot) => setContactsMessages(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))));
  }

  const verification = () => {
    const list = [];
    list.includes
    for (let i = 0; i < contactsMessages.length; i++) {
      if (contactsMessages[i].data.userIds.includes(userId, 0) && contactsMessages[i].data.userIds.includes(userIdConnected, 0)) {
        return contactsMessages[i].id;
      }
    }
    return false;
  }

  const nouveauMessage = () => {
    if (verification() == false) {
      firestore().collection('ContactsMessages').add({
        userIds: [userId, userIdConnected],
        datedernierMessage: firestore.Timestamp.fromDate(new Date())
      }).then((res) => {
        navigation.navigate('ListeMessages', { idDoc: res.id, userIdOther: userId });
      });
    } else {
      navigation.navigate('ListeMessages', { idDoc: verification(), userIdOther: userId});
    }
  }
  
  return (

    <View style={styles.postView}>
      <View style={styles.postDetails}>
        <TouchableOpacity onPress={() => navigation.navigate('MonProfil', { userId: userId })}>
          <Image source={{ uri: props.userImg }} style={styles.photoProfile} />
        </TouchableOpacity>
        <View style={{maxWidth: '70%'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.userPseudo}>{props.pseudo} </Text>
            <Text style={styles.userNom}>{props.prenom}</Text>
          </View>
          <View>
          <Text numberOfLines={2}>{bio}</Text>
          </View>
        </View>
        <View style={{width:'10%',flexGrow: 1}}>
        {userId!= "null" ?
        <>
        <TouchableOpacity onPress={() => nouveauMessage()}>
            <Image source={require('../images/envoi_msg.png')} style={{width: 40, height: 40, alignSelf: 'flex-end'}}/>
        </TouchableOpacity>
        </> : <></>
        }
        </View>

      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  postView: {
    borderWidth: 1,
    borderColor: 'black',
    fontWeight: '700',
    backgroundColor: '#f2dfc1', //#2296F3, d8e2dc CECECE
    //backgroundColor: '#EDF7FB',

    // paddingLeft: 5,
    // paddingRight: 5,
    padding: 5,
    margin: 5,
    borderRadius: 9,
    marginBottom: 10,
    alignContent: 'flex-start',
  },
  postDetails: {
    alignContent: 'flex-start',
    //justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 3,
    flexBasis: 'auto',
  },
  PostText: {
    textAlign: 'justify',
    fontSize: 25,
  },
  photoProfile: {
    // flex: 1,
    //flex: 2,
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 150,
    // borderColor: 'black',
    // borderWidth: 0.3,
  },
  photo: {
    // flex: 1,
    marginBottom: 10,
    marginTop: 7,
    width: '100%',
    height: Dimensions.get('window').width / 1.1,

    // borderColor: 'black',
    // borderWidth: 0.3,
  },
  userPseudo: {
    marginRight: 10,
    //marginTop: 10,
    fontSize: 15,
    fontWeight: '800',
    // flex: 2,
  },
  userNom: {
    //marginTop: 10,
    fontWeight: '400',
    fontStyle: 'italic'
  },
});

export default Utilisateurs;