/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';

import {
  ScrollView,
  StyleSheet,
  View,
  Button,
  Text,
  ActivityIndicator, FlatList, Dimensions
} from 'react-native';
import Header from '../components/Header';
import firestore from '@react-native-firebase/firestore';
import Utilisateurs from '../components/Utilisateurs';
import SearchBox from '../components/SearchBox';
import Firebase from '../util/Firebase';
import auth from '@react-native-firebase/auth';

const ListeUtilisateurs = ({ route, navigation }) => {
  const userId = auth().currentUser.uid;
  const [users, setUsers] = useState([]);
  const[term, setTerm] = useState('');
  const[searchedUsers, setSearchedUsers] = useState([]);
  const[searching, setSearching] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = () => {
    try {
      firestore().collection('Users').where('userId', '!=', userId).onSnapshot((snapshot) => setUsers(snapshot.docs.map((doc) => ({ data: doc.data() }))));
    } catch (e) {
      console.log(e);
    }
  };

  const fetchSearchedToppics = (SearchTerm) => {
    const term1 = SearchTerm.toLowerCase();
  try{
   let isMounted = true;
      firestore().collection("Users").onSnapshot((snapshot) => {
      if(isMounted){
          const search = snapshot.docs.map((doc) => ({data: doc.data()}));
          const results = search.filter(element => element.data.pseudo.toLowerCase().includes(term1));
          setSearchedUsers(results);
      }
    });
  }catch(e){
    console.log(e);
  }
  return () => {
   isMounted = false;
 };
};


const searchHandle = (text) => {
  
  if(text!=""){
    setTerm(text);
    fetchSearchedToppics(text);
    setSearching(true);
  } else {
    setSearching(false);
  }

  
}


  return (
    <View style={{ flex: 1, backgroundColor: "white", }}>
      <Header />
      <SearchBox
        placeHolder = 'Rechercher un utilisateur'
        search = {searchHandle}
      />
      {(!searching ) ? 
      
      <>
      
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <View>
            <Utilisateurs
              userId={item.data.userId}
              prenom={item.data.prenom}
              pseudo={item.data.pseudo}
              bio={item.data.bio}
              userImg={item.data.userImg}
              userIdConnected={userId}
            />
          </View>

        )}
      />
      </> 
      
      : 

      <>
      <FlatList
        data={searchedUsers}
        renderItem={({ item }) => (
          <View>
            <Utilisateurs
              userId={item.data.userId}
              prenom={item.data.prenom}
              pseudo={item.data.pseudo}
              bio={item.data.bio}
              userImg={item.data.userImg}
              userIdConnected={userId}
            />
          </View>

        )}
      />
      </>
    }

      
    </View>
  );

};

export default ListeUtilisateurs;

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});


