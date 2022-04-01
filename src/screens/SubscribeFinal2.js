import React, { useState } from 'react';
import { Text, Button, TextInput, Alert, ScrollView, Image, Dimensions, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Animatable from 'react-native-animatable';
import Firebase from '../util/Firebase';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash'
const SubscribeFinal2 = ({ navigation, route }) => {
    const { email, password,prenom,nom, pseudo, age, statut } = route.params;
    // const [prenom, setPrenom] = useState('');
    // const [nom, setNom] = useState('');
    // const [pseudo, setPseudo] = useState('');
    // const [age, setAge] = useState('');
    // const [statut, setStatut] = useState('Étudiant');
    const [themes, setThemes] = useState([]);
    const [selectedThemes, setSelectedThemes] = useState([]);
    const THEME_OPTIONS = [
        {
          item: 'Etudes',
          id: 'etudes',
        },
        {
          item: 'IUT',
          id: 'iut',
        },
        {
          item: 'Gaming',
          id: 'gaming',
        },
        {
          item: 'Art',
          id: 'art',
        },
        {
          item: 'Programmation',
          id: 'programmation',
        },
        {
          item: 'Infos',
          id: 'infos',
        },
        {
          item: 'Informatique',
          id: 'informatique',
        },
        {
          item: 'Culture',
          id: 'culture',
        },
        
      ]
      
    const inscription = () => {
        if (email == '' || password == '' || nom == '' || prenom == '' || pseudo == '' || age == '' || statut == '') {
            alert("Remplissez bien tous les champs");
        } else {
            let thms = [];
            for (let theme of selectedThemes) {
                console.log(theme);
                thms.push(theme.id);
            }
            setThemes(thms);
            Firebase.inscription(email, password, prenom, nom, pseudo, age, statut,thms);
        }

    };

    function onMultiChange() {
        return (item) => setSelectedThemes(xorBy(selectedThemes, [item], 'id'))
      }

    return (
        <Animatable.View animation="fadeInUpBig" duration={1500} style={{ flex: 1, backgroundColor: '#ffffff' }}
            showsVerticalScrollIndicator={false}>
            <View style={styles.bottomView}>
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
                <View>
                    
                    <Text style={{ fontWeight: 'bold', marginLeft: 15, fontSize: Dimensions.get('window').height / 50, marginTop: 30, marginLeft: '10%'}}>THEMES QUE TU AIMES</Text>
                        <View style={styles.select}>
                        <SelectBox
                            label="Sélectionner les thèmes qui vous attirent le plus"
                            options={THEME_OPTIONS}
                            selectedValues={selectedThemes}
                            onMultiSelect={onMultiChange()}
                            onTapClose={onMultiChange()}
                            isMulti
                        />
                        </View>
                        
                    <TouchableOpacity
                        style={styles.button}

                    >
                        <Text style={{ color: '#ffffff', fontWeight: 'bold' }} onPress={() => inscription()}>FINALISER L'INSCRIPTION</Text>
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center' }}>Déja inscrit ? <Text onPress={() => navigation.navigate('Login')} style={{ textAlign: 'center', color: '#771822', fontWeight: 'bold' }} >Connexion</Text></Text>

                    <Text onPress={() => navigation.navigate('Support')} style={{ textAlign: 'center', color: '#771822', fontWeight: 'bold'}} >Support ParisHub</Text>


                </View>

            </View>
        </Animatable.View>
    );
};

export default SubscribeFinal2;

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
        marginTop: 100,
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
    select: {
        width: '80%',
        alignSelf: 'center',
        color: 'black'
    }

});
