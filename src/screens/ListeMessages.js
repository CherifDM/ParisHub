import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { FirebaseStorageTypes } from '@react-native-firebase/storage';

import {
  ScrollView,
  StyleSheet,
  View,
  Button, TouchableOpacity, Image,
  Text,
  ActivityIndicator, FlatList, Dimensions
} from 'react-native';
const ListeMessages = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  const [infos, setInfos] = useState([]);
  const { idDoc, userIdOther } = route.params;
  useLayoutEffect(() => {
    firestore().collection('ContactsMessages').doc(idDoc).collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => setMessages(
        snapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        }))
      ));

    firestore().collection("Users").doc(userIdOther).onSnapshot(document => {
      setInfos(document.data());
    })
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat
      .append(previousMessages, messages))
    const {
      _id,
      createdAt,
      text,
      user
    } = messages[0];
    firestore().collection('ContactsMessages').doc(idDoc).collection('messages').add({
      _id,
      createdAt,
      text,
      user
    })
    firestore().collection('ContactsMessages').doc(idDoc).update({datedernierMessage: createdAt, dernierMessage: text});
  }, [])


  return (
    <View style={{ flex: 1, backgroundColor: "white", }}>
      {infos ?
        <>
          <View style={styles.postView}>

            <TouchableOpacity onPress={() => navigation.goBack()}><Image source={require('../images/back.png')} style={styles.retour} /></TouchableOpacity>
            <View style={{ flexDirection: 'row', marginLeft: 70 }}>
              <TouchableOpacity onPress={() => navigation.navigate('MonProfil', { userId: infos.userId })}>
                <Image source={{ uri: infos.userImg }} style={styles.photoProfile} />
              </TouchableOpacity>
              <Text style={{ marginTop: 13, fontSize: 20, fontWeight: 'bold', color: 'black' }}>{infos.pseudo}</Text>
            </View>


          </View>
          <View style={{ flex: 1 , backgroundColor: "white",}}>
            {infos.userId!= null ?
            <>
            <GiftedChat
              messages={messages}
              showAvatarForEveryMessage={true}
              onSend={messages => onSend(messages)}
              user={{
                _id: auth()?.currentUser?.email,
                name: auth()?.currentUser?.displayName,
                avatar: auth()?.currentUser?.photoURL
              }}
            />
            </> : <></>
            }
          </View>
        </> : <></>
      }
    </View>

  )
}

export default ListeMessages;

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    resizeMode: 'center',
  },
  postView: {
    height: 70,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flexDirection: 'row'
  },

  retour: {
    width: 30,
    height: 30,
    marginTop: 10,
    marginLeft: 20
  },
  photoProfile: {
    // flex: 1,
    //flex: 2,
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 150,
    marginTop: 8
    // borderColor: 'black',
    // borderWidth: 0.3,
  },
});