import React, { useState, useEffect } from 'react';
import { Text, Button, TextInput, Alert, ScrollView, Image, Dimensions, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Animatable from 'react-native-animatable';
import Firebase from '../util/Firebase';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
import firestore from '@react-native-firebase/firestore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const SubscribeFinal = ({ navigation, route }) => {
    const { email, password } = route.params;
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [age, setAge] = useState('');
    const [statut, setStatut] = useState('Étudiant');
    const [users, setUsers] = useState([]);
    
      
    const inscription = () => {
        if (email == '' || password == '' || nom == '' || prenom == '' || pseudo == '' || age == '' || statut == '') {
            alert("Remplissez bien tous les champs");
        } else {
            if(verification()){
                navigation.navigate('SubscribeFinal2', {email: email, password: password, prenom: prenom, nom: nom, pseudo: pseudo, age: age, statut: statut});
            }
        }

    };

    const verification = () => {
        for (let i = 0; i < users.length; i++) {
            if (pseudo == users[i].data.pseudo) {
                alert("Pseudo déjà utilisé, choisis-en un autre !");
                return false;
            }
        }
        if (age > 100 || age < 15) {
            
            alert("Votre âge doit être compris entre 15 et 100 ans !");
            return false;
        }
        if(prenom.match(/\d/) || nom.match(/\d/)){
            alert("Votre prénom ou votre nom ne doit pas contenir de numéros");
            return false;
        }

        if(!Number.isInteger(age)){
            alert('Votre âge doit être un nombre !');
            return false;
        }
        return true;
    }

    useEffect(() => {
        firestore().collection('Users').onSnapshot((snapshot) => setUsers(snapshot.docs.map((doc) => ({ data: doc.data() }))));
    }, []);



    return (
        <Animatable.View animation="fadeInUpBig" duration={1500} style={{ flex: 1, backgroundColor: '#ffffff' }}
            showsVerticalScrollIndicator={false}>
            <ScrollView style={styles.bottomView}>
                <View >
                    <Image
                        source={require('../images/img2.png')}

                        style={{
                            width: 80,
                            height: 70

                        }}

                    />
                    <Text style={{ color: '#323e4a', textAlign: 'center', fontSize: Dimensions.get('window').height / 25, fontWeight: 'bold' }}>Dis-nous en plus</Text>
                    <Text style={{ color: '#323e4a', textAlign: 'center', fontSize: Dimensions.get('window').height / 25, fontWeight: 'bold' }}>sur toi...</Text>
                </View>
                <KeyboardAwareScrollView>
                <View>
                    <Text style={{ fontWeight: 'bold', marginLeft: 15, fontSize: Dimensions.get('window').height / 50, }}>PRÉNOM</Text>

                    <View style={styles.inputContainer}>
                        <TextInput
                            value={prenom}
                            style={styles.input}
                            onChangeText={setPrenom}
                            numberOfLines={1}
                            placeholder="Nicolas"
                        />
                    </View>
                    <Text style={{ fontWeight: 'bold', marginLeft: 15, fontSize: Dimensions.get('window').height / 50, }}>NOM</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={nom}
                            style={styles.input}
                            onChangeText={setNom}
                            numberOfLines={1}
                            placeholder="Cuzon"
                        />
                    </View>
                    <Text style={{ fontWeight: 'bold', marginLeft: 15, fontSize: Dimensions.get('window').height / 50, }}>PSEUDO</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={pseudo}
                            style={styles.input}
                            onChangeText={setPseudo}
                            numberOfLines={1}
                            placeholder="NicoCuzon78350"
                        />
                    </View>
                    <Text style={{ fontWeight: 'bold', marginLeft: 15, fontSize: Dimensions.get('window').height / 50, }}>ÂGE</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={age}
                            style={styles.input}
                            numberOfLines={1}
                            onChangeText={setAge}
                            keyboardType={"numeric"}
                            placeholder="19"
                        />
                    </View>
                    <Text style={{ fontWeight: 'bold', marginLeft: 15, fontSize: Dimensions.get('window').height / 50, }}>TU ES...</Text>
                    <View style={styles.inputContainer}>

                        <Picker
                            selectedValue={statut}
                            onValueChange={setStatut}
                            style={styles.input}
                            numberOfLines={1}
                        >
                            <Picker.Item label="Étudiant" value="étudiant" />
                            <Picker.Item label="Ancien étudiant" value="Ancien étudiant" />
                            <Picker.Item label="Terminale" value="terminale" />
                            <Picker.Item label="Professeur" value="Professeur" />
                            <Picker.Item label="Personnel" value="Personnel" />
                        </Picker>

                    </View>
                    {/* <Text style={{ fontWeight: 'bold', marginLeft: 15, fontSize: Dimensions.get('window').height / 50, }}>THEMES QUE TU AIMES</Text>

                        <SelectBox
                            label="Select multiple"
                            options={THEME_OPTIONS}
                            selectedValues={selectedThemes}
                            onMultiSelect={onMultiChange()}
                            onTapClose={onMultiChange()}
                            isMulti
                        /> */}


                    <TouchableOpacity
                        style={styles.button}

                    >
                        <Text style={{ color: '#ffffff', fontWeight: 'bold' }} onPress={() => inscription()}>PASSER A L'ETAPE SUIVANTE</Text>
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center' }}>Déja inscrit ? <Text onPress={() => navigation.navigate('Login')} style={{ textAlign: 'center', color: '#771822', fontWeight: 'bold' }} >Connexion</Text></Text>
                    <Text onPress={() => navigation.navigate('Support')} style={{ textAlign: 'center', color: '#771822', fontWeight: 'bold', marginTop: '15%' }} >Support ParisHub</Text>



                </View>
                </KeyboardAwareScrollView>
            </ScrollView>
        </Animatable.View>
    );
};

export default SubscribeFinal;

const styles = StyleSheet.create({
    bottomView: {
        flex: 1.5,
        backgroundColor: '#f2dfc1',
    },

    button: {
        alignItems: "center",
        backgroundColor: "#771822",
        padding: 10,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 20
    },

    inputContainer: {
        marginTop: Dimensions.get('window').height / 100,
        marginBottom: Dimensions.get('window').height / 200,
        marginLeft: Dimensions.get('window').height / 40,
        marginRight: Dimensions.get('window').height / 40,
        height: Dimensions.get('window').height / 15,
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
        fontSize: Dimensions.get('window').height / 40,
        fontFamily: 'Lato-Regular',
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },



});
