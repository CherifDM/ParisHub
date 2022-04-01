import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Dimensions, ScrollView, TouchableOpacity } from 'react-native';

import ContactsMessage from '../components/ContactsMessages';
import firestore from '@react-native-firebase/firestore';
import Header from '../components/Header';
import auth from '@react-native-firebase/auth';

const ListeContactsMessages = ({ navigation, route }) => {
  const userId = auth().currentUser.uid;
  const [ContactsMessages, setContactsMessages] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const fetchContactsMessages = () => {
      try {
        firestore().collection('ContactsMessages').where('userIds', 'array-contains', userId).orderBy('datedernierMessage' , 'desc').onSnapshot((snapshot) => {
          if (isMounted) {
            if(snapshot!=null){
              setContactsMessages(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
            }
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
    fetchContactsMessages();
    return () => {
      isMounted = false;
    };
  }, []);



  if(ContactsMessages.length == 0) {
    return (
      <View style={{ flex: 1, backgroundColor: "white", }}>
        <Header />
        <ScrollView>
          <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('ListeUsers', { userId: userId })}>
            <Text style={{ color: "white" }}>Nouveau message</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: "white", }}>
        <Header />
        <FlatList
          data={ContactsMessages}
          renderItem={({ item }) => (
            <ContactsMessage
              userIds={item.data.userIds}
              id={item.id}
              userIdConnected={userId}
              dateDernierMessage={item.data.datedernierMessage}
              dernierMessage={item.data.dernierMessage}
            />
          )}
        />

        <View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListeUsers', { userId: userId })}>
            <Text style={{ color: "white" }}>Nouveau message</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

};

export default ListeContactsMessages;

const styles = StyleSheet.create({
  container: {
    //flex: 1, 
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    bottom: 0,
    alignItems: "center",
    backgroundColor: "#771822",
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: Dimensions.get('window').height / 100,
    borderRadius: 20
  },
  button2: {
    bottom: 0,
    alignItems: "center",
    backgroundColor: "#771822",
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: Dimensions.get('window').height / 3,
    marginBottom: Dimensions.get('window').height / 100,
    borderRadius: 20
  },
});