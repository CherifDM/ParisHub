import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class Firebase {

    static connexion = (email, password) => {
        return auth().signInWithEmailAndPassword(email, password);
        
    };

    static inscription = async (email, password, prenom, nom, pseudo, age, statut,thms) => {
        return auth().createUserWithEmailAndPassword(email, password)
            .then((res) => {
                const ajout = {
                    bio: "Je suis nouveau sur ParisHub, le réseau social interne à l'IUT ! ",
                    userId: res.user.uid,
                    prenom: prenom,
                    nom: nom,
                    pseudo: pseudo,
                    age: age,
                    themes: thms,
                    email: email,
                    password: password,
                    statut: statut,
                    userImg: "https://media.istockphoto.com/vectors/simple-man-head-icon-set-vector-id1196083861?k=20&m=1196083861&s=612x612&w=0&h=XNRxC4ohwTlL7KBis1Dc_MZASQSKfC9IoBfe2Oq9eL0="
                }
                firestore().collection('Users').doc(res.user.uid).set(ajout);
                const update = {
                    photoURL: ajout.userImg,
                    displayName: prenom
                };
                auth().currentUser.updateProfile(update);


            });
    };

    static modifierPassword = async (email) => {
        return auth().sendPasswordResetEmail(email)
            .then(() => {
                alert('Regardez dans vos mails (checkez également vos spams)')
            }).catch(function (e) {
                console.log(e)
            })
    }

    static deconnexion = () => {
        return auth().signOut();
    };
};

export default Firebase;