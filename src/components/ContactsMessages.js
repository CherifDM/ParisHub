import React, { useEffect, useState, useRef } from 'react';
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
import {format} from 'date-fns';
const ContactsMessage = (props) => {
  const userIds = props.userIds;
  const userIdConnected = props.userIdConnected;
  const idDoc = props.id;
  const dateDernierMessage = props.dateDernierMessage;
  const d = dateDernierMessage?  dateDernierMessage.toDate() : null;
  const dateFinal = d != null ? format(d, 'dd/MM/yyyy à HH:mm:ss') : null;
  const dernierMessage = props.dernierMessage;
  const dernierMessageFinal = dernierMessage ? dernierMessage : null;
  const [user, setUser] = useState();
  const navigation = useNavigation();
  const [userIdOther,setUserIdOther] = useState();
  useEffect(() => {
    //let isMounted = true;
    const getUserInformations = () => {

      let userIdOther = null;
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i] != userIdConnected) {
          userIdOther = userIds[i];
        }
      }
      setUserIdOther(userIdOther);
        firestore().collection('Users').doc(userIdOther).onSnapshot(document => {
          setUser(document.data());
        })


      //});
    };
    getUserInformations();
    // return () => {
    //   isMounted = false;
    // };
  }, []);

  return (
    <View>
      {user ?
        <>
          <View>
            {user.userId != "null" ?
              <>
                <View style={styles.postView}>
                  <View>
                    <View style={styles.postDetails}>
                      <TouchableOpacity onPress={() => navigation.navigate('ListeMessages', { idDoc: idDoc, userIdOther: userIdOther })}>
                        <Image source={{ uri: user.userImg }} style={styles.photoProfile} />
                      </TouchableOpacity>
                      <View style={{maxWidth: '80%'}}>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.userPseudo}>{user.pseudo}</Text>
                          <Text style={styles.userNom}>{user.prenom}</Text>
                          
                        </View>
                        {dernierMessageFinal ?
                        <>
                        <View>
                        <Text numberOfLines={1}>{dernierMessageFinal}</Text>
                        </View>
                        </> : <></>
                        }
                        
                      </View>
                     
                    </View>
                    {dateFinal ?
                    <>
                    <View>
                        <Text style={{textAlign: 'right'}}>{dateFinal}</Text>
                      </View>
                    </> : <></>
                    }
                  </View>
                </View>
              </> : <>
              <View style={styles.postView2}>
                  <View>
                    <View style={styles.postDetails}>
                      <TouchableOpacity>
                        <Image source={{ uri: user.userImg }} style={styles.photoProfile} />
                      </TouchableOpacity>
                      <Text style={styles.userPseudo}>{user.pseudo} </Text>
                      <Text style={styles.userNom}>{user.prenom}</Text>
                    </View>
                    
                  </View>
                </View>
              </>
            }
            {/* <Text>{userIdDestinataire}</Text>
              <Text>{userIdEmetteur}</Text>
              <Text>{idDoc}</Text> */}

          </View>
        </> : <></>
      }
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
  postView2: {
    fontWeight: '700',
    backgroundColor: '#e3e3e3', //#2296F3, d8e2dc CECECE
    //backgroundColor: '#EDF7FB',

    // paddingLeft: 5,
    // paddingRight: 5,
    padding: 5,
    margin: 5,
    borderRadius: 9,
    marginBottom: 10,
  },
  postDetails: {
    alignContent: 'flex-start',
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
    //flex: 1,
  },
});

export default ContactsMessage;