import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView, FlatList, Dimensions
} from 'react-native';
import Post from '../components/Post';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import Firebase from '../util/Firebase';
import HeaderProfile from '../components/HeaderProfile';
const InfosProfile = ({ navigation, route }) => {
  const { userId } = route.params;
  const [userInfos, setUserInfos] = useState();


  const user = () => {
    try {
      firestore().collection('Users').doc(userId).onSnapshot(snapshot => {
        setUserInfos(snapshot.data());
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    user();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", }}>
      <View style={styles.postView}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Image source={require('../images/back.png')} style={styles.retour} /></TouchableOpacity>
        <Image source={require('../images/parishubLogo.png')} style={styles.logo} />

      </View>
      {userInfos ?
        <>
          <View>
            <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, marginBottom: 30, marginTop: 30 }}>Prénom : {userInfos.prenom} </Text>
            <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, marginBottom: 30, marginTop: 30 }}>Nom : {userInfos.nom}</Text>
            <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, marginBottom: 30, marginTop: 30 }}>Email : {userInfos.email}</Text>
            <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, marginBottom: 30, marginTop: 30 }}>Pseudo : {userInfos.pseudo}</Text>
            <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, marginBottom: 30, marginTop: 30 }}>Statut : {userInfos.statut}</Text>
          </View>
        </> : <></>}
    </SafeAreaView>

  );
};

export default InfosProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
    backgroundColor: '#C4C4C4',
    paddingVertical: 10
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
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
  }

});