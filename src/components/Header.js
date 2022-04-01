import React from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';



const Header = () => {
  const navigation = useNavigation();

  const monProfil = () => {
    const loggedIn = auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('MonProfil', {
          userId: user.uid
        });
      }
    })
    return loggedIn;

  }
  return (
    <View style={styles.postView}>
      <Image source={require('../images/parishubLogo.png')} style={styles.logo} />
      <TouchableOpacity onPress={() => monProfil()} style={styles.button}>
        <Image source={require('../images/user2.png')} style={styles.user} />
      </TouchableOpacity>

    </View>

  );
}


const styles = StyleSheet.create({
  postView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flexDirection: 'row'
  },
  logo: {
    flex: 1,
    // width: '100%', test
    // height: '100%',
    resizeMode: 'center',
    marginLeft: 40
  },

  user: {
    width: 60,
    height: 50

  },
});

export default Header;