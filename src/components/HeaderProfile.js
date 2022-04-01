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
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HeaderProfile = (props) => {
  const userId = props.userId;
  const userIdConnected = auth()?.currentUser?.uid;
  const pageProfile = props.pageProfile;
  const [user, setUser] = useState();
  const [contactsMessages, setContactsMessages] = useState([]);
  const [userState, setUserState] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    getUserInformations();
    getContactsMessages();
    userEnQuestion();
  }, [])
  const getUserInformations = () => {
    firestore().collection('Users').doc(userId).onSnapshot((snapshot) => setUser(snapshot.data()));
  };

  const userEnQuestion = () => {
    auth().onAuthStateChanged((user) => {
      if (user != null) {
        if (user.uid == userId) {
          setUserState(true);
        } else {
          setUserState(false);
        }
      }

    })
  }

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
    <View>
      {!userState ? (
        <>

          <View>
            {user ?
              <>
                <View style={styles.userBtnWrapper2}>
                  <View><Image source={{ uri: user.userImg }} style={styles.photoProfile} /></View>

                  <View style={{width: '60%'}}>
                    <Text style={styles.pseudo}>{user.pseudo} </Text>
                    <Text style={styles.nom}>{user.prenom} {user.nom}</Text>
                    <TouchableOpacity
                      style={styles.userBtn2}
                      onPress={() => nouveauMessage()}>
                      <Text style={{ color: 'white' , textAlign: 'center'}}>Envoyer un message</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View><Text style={styles.bio}>{user.bio}</Text></View>
              </> : <><Text>wesh</Text></>
            }

          </View>


        </>
      ) : (
        <>
          <View>
            {user ?
              <>
                <View style={styles.userBtnWrapper2}>
                  <View><Image source={{ uri: user.userImg }} style={styles.photoProfile} /></View>
                  <View style={{width: '60%'}}>
                    <TouchableOpacity
                      style={styles.userBtn}
                      onPress={() => {
                        navigation.navigate('EditProfile', { userId: userId });
                      }}>
                      <Text style={{ color: 'white', textAlign: 'center'}}>Modifier mon profil</Text>
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={styles.pseudo}>{user.pseudo} </Text>
                    <Text numberOfLines={1} style={styles.nom}>{user.prenom} {user.nom}</Text>
                  </View>
                </View>
                {pageProfile ? 
                <>
                 <View><Text style={styles.bio}>{user.bio}</Text></View>
                </> : <></>
                }
               
              </> : <></>
            }
          </View>
        </>
      )}
    </View>

  );
}


const styles = StyleSheet.create({
  photoProfile: {
    width: 125,
    height: 125,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 150,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "black"
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },

  userBtnWrapper2: {
    flexDirection: 'row',
  },
  userBtn: {
    backgroundColor: "#771822",
    padding: 10,
    marginLeft: 15,
    width: '95%',
    borderRadius: 20,
    marginTop: Dimensions.get('window').height / 40,
  },
  userBtn2:{
    backgroundColor: "#771822",
    padding: 10,
    marginLeft: 15,
    width: '70%',
    borderRadius: 20,
    marginTop: Dimensions.get('window').height / 40,
  },
  nom: {
    marginLeft: 15,
    color: "#771822",
    fontSize: Dimensions.get('window').height / 35,
  },
  pseudo: {
    marginLeft: 15,
    color: 'black',
    fontSize: Dimensions.get('window').height / 25,
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
    width: 60,
    height: 50,
  },

  bio: {
    marginTop: 20,
    fontSize: 20,
    color: 'black',
    marginLeft: 15,
    marginRight: 15,
    padding: 5
  }
});

export default HeaderProfile;