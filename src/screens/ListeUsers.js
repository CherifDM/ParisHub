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
  ActivityIndicator, FlatList, Dimensions, TouchableOpacity, Image
} from 'react-native';
import Header from '../components/Header';
import firestore from '@react-native-firebase/firestore';
import UsersMessage from '../components/UsersMessage';
import SearchBox from '../components/SearchBox';
import Firebase from '../util/Firebase';
import auth from '@react-native-firebase/auth';
const ListeUsers = ({ route, navigation }) => {
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
      let isMounted = true;
      firestore().collection('Users').where('userId', 'not-in', [userId, "null"]).onSnapshot((snapshot) => {
        if (isMounted) {
          setUsers(snapshot.docs.map((doc) => ({ data: doc.data() })));
        }
      });
    } catch (e) {
      console.log(e);
    }
    return () => {
      isMounted = false;
    };
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
      <View style={styles.postView}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Image source={require('../images/back.png')} style={styles.retour} /></TouchableOpacity>
        <Image source={require('../images/parishubLogo.png')} style={styles.logo} />
          <View style={{ position: 'absolute', right: 0, marginRight: 10, marginTop: Dimensions.get('window').height / 40 }}>
            <TouchableOpacity onPress={() => navigation.navigate('MonProfil', { userId: userId })}>
              <Image style={{ width: 30, height: 30 }} source={require('../images/user.png')} />
            </TouchableOpacity>
          </View>


      </View>
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
                <UsersMessage
                  userIdOther={item.data.userId}
                  prenom={item.data.prenom}
                  pseudo={item.data.pseudo}
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
                <UsersMessage
                  userIdOther={item.data.userId}
                  prenom={item.data.prenom}
                  pseudo={item.data.pseudo}
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

export default ListeUsers;

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

  retour: {
    width: 30,
    height: 30,
    marginLeft: 20
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
});


