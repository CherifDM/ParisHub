import React, { useEffect, useState } from 'react';
import { Text, Button, TextInput, Alert, ScrollView, ImageBackground, Dimensions, View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import * as Animatable from 'react-native-animatable';
import Firebase from '../util/Firebase';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const connexion = () => {
        if (email == '' || password == '') {
            alert("Remplissez bien tous les champs");
        } else {
            Firebase.connexion(email, password).catch((e) => {
                console.log(e);
                alert("Email/mot de passe incorrect.");
            });
        }
    }

    useEffect(() => {
        const loggedIn = auth().onAuthStateChanged((user) => {
            if (user) {
                navigation.navigate('MainStack');
            }
        })
        return loggedIn;
    }, [])

    return (
        <Animatable.View animation="fadeInUpBig" duration={1500} style={{ flex: 1, backgroundColor: '#ffffff' }}
            showsVerticalScrollIndicator={false}>
                
            <ImageBackground
                source={require('../images/ph.jpg')}

                style={{
                    height: Dimensions.get('window').height / 2.7
                }}>

            </ImageBackground>
            <View style={styles.bottomView}>
                <View style={{ padding: Dimensions.get('window').height / 50 }}>
                    <Text style={{ color: '#323e4a', textAlign: 'center', fontSize: Dimensions.get('window').height / 22, fontWeight: 'bold' }}>Bienvenue !</Text>
                </View>
                <KeyboardAwareScrollView>
                <View>
                
                    <Text style={{ fontWeight: 'bold', marginLeft: 20 }}>EMAIL</Text>
                    <View style={styles.inputContainer}>
                        <View style={styles.iconStyle}>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </View>
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
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
                            onChangeText={setPassword}
                            style={styles.input}
                            numberOfLines={1}
                            placeholder="•••••••••••"
                        />
                    </View>
                   
                    <TouchableOpacity style={styles.button} onPress={() => connexion()}>
                        <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>CONNEXION</Text>
                    </TouchableOpacity>

                    <Text style={{ textAlign: 'center' }}>Tu n'as pas de compte ? </Text>
                    <Text onPress={() => navigation.navigate('Subscribe')} style={{ textAlign: 'center', color: '#771822', fontWeight: 'bold' }} >Créez-en un !</Text>
                    <Text onPress={() => navigation.navigate('Support')} style={{ textAlign: 'center', color: '#771822', fontWeight: 'bold', marginTop: '15%' }} >Support ParisHub</Text>
                </View>
                </KeyboardAwareScrollView>
            </View>
        </Animatable.View>
    );
};

export default LoginScreen;

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
