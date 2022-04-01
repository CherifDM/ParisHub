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
const MonProfil = ({ navigation, route }) => {
  const { userId } = route.params;
  const [posts, setPosts] = useState([]);
  const [userState, setUserState] = useState();


  const fetchPosts = () => {
    try {
      if (userId != null) {
        firestore().collection('Posts').where('userId', '==', userId).onSnapshot((snapshot) => setPosts(snapshot.docs.map((doc) => ({ data: doc.data() }))));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deconnexion = () => {
    Firebase.deconnexion();
    navigation.navigate('Login');
  }

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

  useEffect(() => {
    fetchPosts();
    userEnQuestion();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.postView}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Image source={require('../images/back.png')} style={styles.retour} /></TouchableOpacity>
        <Image source={require('../images/parishubLogo.png')} style={styles.logo} />
        {userState ? (<>
          <View style={{ position: 'absolute', right: 0, marginRight: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Reglages', { userId: userId })}>
              <Image style={{ width: 32, height: 32}} source={require('../images/SettingsIcon.png')} />
            </TouchableOpacity>
          </View>
        </>
        ) : (<></>)}


      </View>
      <HeaderProfile
        userId={userId}
        pageProfile={true}
      />
      
      <View
        style={styles.container}
        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
        showsVerticalScrollIndicator={false}>


        
        <View style={styles.userInfoWrapper}>
          {userId != "null" ?
          <>
           <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{posts.length}</Text>
            <Text style={styles.userInfoSubTitle}>Posts</Text>
          </View>
          </> : <><Text>L'utilisateur a été supprimé</Text></>
          }
        </View>

        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <View>

              <Post
                content={item.data.content}
                photo={item.data.photo}
                userId={item.data.userId}
                date={item.data.postTime}
              />
            </View>

          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default MonProfil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
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
    marginLeft: 20,
    marginBottom: 10
  }

});