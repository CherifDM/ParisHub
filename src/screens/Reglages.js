import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Modal,
  Button
} from 'react-native';
import Post from '../components/Post';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Firebase from '../util/Firebase';
import HeaderProfile from '../components/HeaderProfile';
const MonProfil = ({ navigation, route }) => {
  const { userId } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const setPassword = () => {

    Firebase.modifierPassword(auth().currentUser.email);
  }

  const supprimerCompte = async () => {
    await auth().currentUser.delete();
    await firestore().collection('Users').doc(userId).update({ prenom: "deleted", nom: "deleted", userId: "null" });
    Firebase.deconnexion();
    alert("Ton compte a été supprimé !");
    navigation.navigate('Login');
  }

  const deconnexion = () => {
    Firebase.deconnexion();
    alert("Tu as été déconnecté(e) ! ");
    navigation.navigate('Login');
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.postView}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Image source={require('../images/back.png')} style={styles.retour} /></TouchableOpacity>
        <Image source={require('../images/parishubLogo.png')} style={styles.logo} />

      </View>
      <View
        style={styles.container}
        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
        showsVerticalScrollIndicator={false}>

        <HeaderProfile
          userId={userId}
          pageProfile={false}
        />
        <TouchableOpacity onPress={() => navigation.navigate('InfosProfile', { userId: userId })}>
          <View style={styles.userBtnWrapper} >
            <Image style={styles.image} source={require('../images/user2.png')} />
            <View style={{ marginLeft: 20, marginTop: 10 }}>
              <Text style={styles.infos}>Informations du compte</Text>
              <Text style={{ color: 'black' }}>Informations personnelles comme </Text>
              <Text style={{ color: 'black' }}> l'adresse mail associée, le pseudo...</Text>
            </View>
            <Image style={styles.image2} source={require('../images/go.png')} />

          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPassword()}>
          <View style={styles.userBtnWrapper}>
            <Image style={styles.image} source={require('../images/cle.png')} />
            <View style={{ marginLeft: 20, marginTop: 10 }}>
              <Text style={styles.infos}>Mot de passe</Text>
              <Text style={{ color: 'black' }}>Changer le mot de passe en </Text>
              <Text style={{ color: 'black' }}> toute sécurité</Text>
            </View>
            <Image style={styles.image2} source={require('../images/go.png')} />

          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deconnexion()}>
          <View style={styles.userBtnWrapper}>
            <Image style={styles.image3} source={require('../images/disconnect.png')} />
            <View style={{ marginLeft: 20, marginTop: 10 }}>
              <Text style={styles.infos}>Se déconnecter du compte</Text>
              <Text style={{ color: 'black' }}>Déconnexion de ton compte,</Text>
              <Text style={{ color: 'black' }}> on espère te revoir très vite !</Text>
            </View>
            <Image style={styles.image2} source={require('../images/go.png')} />

          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Support')}>
          <View style={styles.userBtnWrapper}>
            <Image style={styles.image3} source={require('../images/sav.png')} />
            <View style={{ marginLeft: 20, marginTop: 10 }}>
              <Text style={styles.infos}>Support de ParisHub</Text>
              <Text style={{ color: 'black' }}>Une question ? Pose-la à travvers</Text>
              <Text style={{ color: 'black' }}>notre merveilleux formulaire !</Text>
            </View>
            <Image style={styles.image2} source={require('../images/go.png')} />

          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.userBtnWrapper}>
            <Image style={styles.image} source={require('../images/remove.png')} />
            <View style={{ marginLeft: 20, marginTop: 10 }}>
              <Text style={styles.infoss}>Supprimer ton compte</Text>
              <Text style={{ color: 'black' }}>Suppression complète du compte</Text>
              <Text style={{ color: 'black' }}>Attention: opération irréversible</Text>
            </View>
            <Image style={styles.image2} source={require('../images/go.png')} />

          </View>
        </TouchableOpacity>

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modalView}>
              <Text style={{ textAlign: 'center' }}>Vous êtes sûr de vouloir supprimer votre compte ?</Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={styles.bouton}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    supprimerCompte();
                  }}>
                  <Text style={{ color: 'white' }}>Oui</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.bouton}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <Text style={{ color: 'white' }}>Non</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default MonProfil;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
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
  },

  userBtnWrapper: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10
  },
  image: {
    width: 80,
    height: 80,
  },

  image2: {
    width: 40,
    height: 40,
    right: 0,
    marginTop: 20,
    position: 'absolute'
  },

  image3: {
    width: 70,
    height: 70,
    marginLeft: 10
  },

  infos: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black'
  },

  infoss: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#771822',

  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  bouton: {
    backgroundColor: "#771822",
    paddingRight: 25,
    paddingLeft: 25,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 15,
    borderRadius: 20,
    marginTop: 10,
  },

});