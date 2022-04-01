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
import {format} from 'date-fns';

import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Post = (props) => {
  const userId = props.userId;
  const [user, setUser] = useState();
  const navigation = useNavigation();
  const date = props.date;
  const d = date.toDate();
  const dateFinal = format(d, 'dd/MM/yyyy à HH:mm:ss');
  useEffect(() => {
    getUserInformations();
  }, [])
  const getUserInformations = () => {
      firestore().collection('Users').doc(userId).onSnapshot(snapshot => setUser(snapshot.data()));
  };

  return (

    <View style={styles.postView}>
      <View>
        {user ?
          <>
            <View style={styles.postDetails}>
              {user.userId != "null"? 
              <>
                <TouchableOpacity onPress={() => navigation.navigate('MonProfil', { userId: userId })}>
                <Image source={{ uri: user.userImg }} style={styles.photoProfile} />
              </TouchableOpacity>

              <Text style={styles.userPseudo}>{user.pseudo} </Text>
              <Text style={styles.userNom}>{user.prenom}</Text>
              </> : <>
              <TouchableOpacity>
                <Image source={{ uri: user.userImg }} style={styles.photoProfile} />
              </TouchableOpacity>

              <Text style={styles.userPseudo}>{user.pseudo} </Text>
              <Text style={styles.userNom}>{user.prenom}</Text>
              <Text></Text>
              </>
              }
              
            </View>
          </> : <></>
        }
      </View>

      <View style={styles.postTitle}>
        {props.photo != null ? <Image source={{ uri: props.photo }} style={styles.photo} /> : null}

        <Text style={styles.PostText}>{props.content}</Text>
        <Text style={styles.date}>{dateFinal}</Text>
      </View>

    </View>



  );
}


const styles = StyleSheet.create({
  postView: {
    fontWeight: '700',
    backgroundColor: '#f2dfc1', //#2296F3, d8e2dc CECECE #f2dfc1
    borderColor: 'e3e7eb',
    borderWidth: 1,
    //backgroundColor: '#EDF7FB',

    // paddingLeft: 5,
    // paddingRight: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    borderRadius: 15,
    marginBottom: 15,
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
    fontSize: 18,
    color: 'black',
    marginBottom: 10
  },
  photoProfile: {
    // flex: 1,
    //flex: 2,
    width: 40,
    height: 40,
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
    borderRadius:15
    // borderColor: 'black',
    // borderWidth: 0.3,
  },
  userPseudo: {
    marginRight: 10,
    marginTop: 10,
    fontSize: 15,
    fontWeight: '800',
    color: '#323f4b'
    // flex: 2,
  },
  userNom: {
    marginTop: 10,
    //fontWeight: '400',
    flex: 1,
    fontStyle: 'italic',
    fontWeight: 'bold'
  },

  date: {
    fontStyle: 'italic',
    right: 0,
    textAlign: 'right'
  }
});

export default Post;