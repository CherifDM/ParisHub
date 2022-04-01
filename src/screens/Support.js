import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  TextInput,
  Button,
  View,
  Alert,
  StyleSheet,
  Image, Text, Dimensions
} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.postView}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
        <Image source={require('../images/back.png')} style={styles.back} />
      </TouchableOpacity>
      <Image source={require('../images/parishubsupportLogo.png')} style={styles.logo} />
    </View>
  );
}

const Support = ({ navigation }) => {
  const [mail, setMail] = useState([]);
  const [question, setQuestion] = useState([]);
  const [name, setName] = useState([]);

  const submitQuestion = async () => {
    if (mail == "" || question == "" || name == "") {
      Alert.alert('Attention !',
        'Remplissez bien tous les champs');
    } else {
      firestore()
        .collection('Support')
        .add({
          email: mail,
          name: name,
          question: question,
          date: firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log('Question envoyée');
          Alert.alert(
            'Votre requête a été envoyée au support !',
            'Votre demande sera traitée dans les délais les plus brefs',
          );
        })
        .catch((error) => {
          console.log('La connexion à firebase a échoué.', error);
        });
      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.form}>
        <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>Bienvenue sur Paris HUB Support</Text>
        <TextInput
          style={styles.input}
          placeholder="Votre nom ?"
          value={name}
          onChangeText={(content) => setName(content)}
        />
        <TextInput
          style={styles.input}
          placeholder="Votre email ?"
          value={mail}
          onChangeText={(content) => setMail(content)}
        />
        <TextInput
          style={styles.input}
          placeholder="Votre demande ?"
          multiline
          numberOfLines={4}
          value={question}
          onChangeText={(content) => setQuestion(content)}
        />
        <TouchableOpacity style={styles.button2} onPress={() => submitQuestion()} >
              <Text style={{ color: '#ffffff', fontWeight: 'bold', textAlign: 'center' }}>Envoyer la demande</Text>
            </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button2: {
    alignSelf: "center",
    backgroundColor: "#771822",
    padding: 10,
    //alignSelf: 'center',
    width: '90%',
    borderRadius: 20,
    marginTop: 10,
    marginRight: 10
  },
  postView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flexDirection: 'row'
  },
  logo: {
    flex: 1,
    resizeMode: 'center'
  },
  back: {
    width: 30,
    height: 30,
    marginLeft: 10
  },
  form: {
    marginTop: Dimensions.get('window').height / 6,
    padding: 30,
    borderRadius: 8,
    color: "#666",
    backgroundColor: "#eaeaea",
    marginHorizontal: 10,
    borderWidth: 1
  },
  container: {
    flex: 1,
    //alignItems: "center"
  },
  input: {
    borderRadius: 7,
    margin: 5,
    backgroundColor: 'white'
  }
});

export default Support;