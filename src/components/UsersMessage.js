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
  Button, FlatList, SegmentedControlIOSBase
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const UsersMessage = (props) => {
  const userIdOther = props.userIdOther;
  const userIdConnected = props.userIdConnected;
  const [contactsMessages, setContactsMessages] = useState([]);
  const navigation = useNavigation();
  //const [idDoc, setIdDoc] = useState();

  useEffect(() => {
    //on verifiera après si un contact message existe déjà ou s'il faut le créer
    firestore().collection('ContactsMessages').onSnapshot((snapshot) => setContactsMessages(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))));
  }, []);

  const verification = () => {
    for (let i = 0; i < contactsMessages.length; i++) {
      if (contactsMessages[i].data.userIds.includes(userIdOther, 0) && contactsMessages[i].data.userIds.includes(userIdConnected, 0)) {
        return contactsMessages[i].id;
      }
    }
    return false;
  }

  const nouveauMessage = () => {
    if (verification() == false) {
      firestore().collection('ContactsMessages').add({
        userIds: [userIdOther, userIdConnected],
        datedernierMessage: firestore.Timestamp.fromDate(new Date())
      }).then((res) => {
        navigation.navigate('ListeMessages', { idDoc: res.id, userIdOther: userIdOther });
      });
    } else {
      navigation.navigate('ListeMessages', { idDoc: verification(), userIdOther: userIdOther });
    }
  }

  return (

    <View style={styles.postView}>
      <View style={styles.postDetails} >
        <TouchableOpacity onPress={() => nouveauMessage()}>
          <Image source={{ uri: props.userImg }} style={styles.photoProfile} />
        </TouchableOpacity>
        <Text style={styles.userPseudo}>{props.pseudo} </Text>
        <Text style={styles.userNom}>{props.prenom}</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  postView: {
    fontWeight: '700',
    backgroundColor: '#f2dfc1', //#2296F3, d8e2dc CECECE
    //backgroundColor: '#EDF7FB',

    // paddingLeft: 5,
    // paddingRight: 5,
    padding: 5,
    margin: 5,
    borderRadius: 9,
    marginBottom: 10,
    borderColor:'black',
    borderWidth:1
  },
  postDetails: {
    alignContent: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 3,

    // borderColor: 'black',
    // borderWidth: 0.3,
  },
  postTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'justify',
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
    marginTop: 10,
    fontSize: 15,
    fontWeight: '800',
    // flex: 2,
  },
  userNom: {
    marginTop: 10,
    fontWeight: '400',
    flex: 1,
  },
});

export default UsersMessage;