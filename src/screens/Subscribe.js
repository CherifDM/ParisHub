import React, { useState, useEffect } from 'react';
import { Text, Button, TextInput, Alert, ScrollView, ImageBackground, Dimensions, View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import * as Animatable from 'react-native-animatable';
import Firebase from '../util/Firebase';
import firestore from '@react-native-firebase/firestore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Subscribe = ({ navigation }) => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);

    const inscription = () => {
        if (validateEmail(mail) == false) {
            alert("L'email n'est pas correcte");
            return false;
        }
        if (validatePass(password) == false) {
            alert("Le mot de passe n'est pas bon");
            return false;
        }
        for (let i = 0; i < users.length; i++) {
            if (mail == users[i].data.email) {
                alert("Email déjà présent dans la base, connectez-vous !");
                return false;
            }
        }
        return true;
    };

    const validation = () => {
        if (inscription()) {
            navigation.navigate('SubscribeFinal', {
                email: mail,
                password: password
            });
        }
    }

    useEffect(() => {
        firestore().collection('Users').onSnapshot((snapshot) => setUsers(snapshot.docs.map((doc) => ({ data: doc.data() }))));
    }, []);
    const validateEmail = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            setMail(text);
            return false;
        }
        else {
            setMail(text);
            return true;
        }
    }
    const validatePass = (text) => {
        if (text.length < 6) {
            setPassword(text);
            return false;
        }
        else {
            setPassword(text);
            return true;
        }
    }
    return (
        <Animatable.View animation="fadeInUpBig" duration={1500} style={{ flex: 1, backgroundColor: '#ffffff' }}
            showsVerticalScrollIndicator={false}>
            <ImageBackground
                source={require('../images/ph.jpg')}

                style={{
                    height: Dimensions.get('window').height / 2.5
                }}>

            </ImageBackground>
            <View style={styles.bottomView}>
                <View style={{ padding: Dimensions.get('window').height / 50, }}>
                    <Text style={{ color: '#323e4a', textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>Inscris-toi !</Text>
                </View>
                <KeyboardAwareScrollView>
                <View>
                    <Text style={{ fontWeight: 'bold', marginLeft: 20 }}>EMAIL</Text>

                    <View style={styles.inputContainer}>
                        <View style={styles.iconStyle}>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </View>
                        <TextInput
                            value={mail}
                            style={styles.input}
                            onChangeText={(mail) => validateEmail(mail)}
                            numberOfLines={1}
                            placeholder="prenom.nom@[etu.]u-paris.fr"
                        />
                    </View>
                    <Text style={{ fontWeight: 'bold', marginLeft: 20 }}>MOT DE PASSE</Text>
                    <View style={styles.inputContainer}>
                        <View style={styles.iconStyle}>
                            <FontAwesomeIcon icon={faLock} />
                        </View>
                        <TextInput
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(password) => validatePass(password)}
                            style={styles.input}
                            numberOfLines={1}
                            placeholder="•••••••••••"
                        />
                    </View>


                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => validation()}
                    >
                        <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>INSCRIPTION</Text>
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center' }}>Déja inscrit ? <Text onPress={() => navigation.navigate('Login')} style={{ textAlign: 'center', color: '#771822', fontWeight: 'bold' }} >Connexion</Text></Text>
                    <Text onPress={() => navigation.navigate('Support')} style={{ textAlign: 'center', color: '#771822', fontWeight: 'bold', marginTop: '15%' }} >Support ParisHub</Text>



                </View>
                </KeyboardAwareScrollView>
            </View>
        </Animatable.View>
    );
};

export default Subscribe;

const styles = StyleSheet.create({
    bottomView: {
        flex: 1.5,
        backgroundColor: '#f2dfc1',
        height: 10,//Dimensions.get('window').height,
        borderTopStartRadius: 60,
        borderTopEndRadius: 60
    },

    button: {
        alignItems: "center",
        backgroundColor: "#771822",
        padding: 10,
        marginLeft: 20,
        marginRight: 20,
        marginTop: Dimensions.get('window').height / 70,
        marginBottom: Dimensions.get('window').height / 100,
        borderRadius: 20
    },

    inputContainer: {
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        height: Dimensions.get('window').height / 13,
        borderColor: '#ccc',
        borderRadius: 5,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    iconStyle: {
        padding: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#ccc',
        borderRightWidth: 1,
        width: 50,
    },
    input: {
        padding: 10,
        flex: 1,
        fontSize: 16,
        fontFamily: 'Lato-Regular',
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },



});
