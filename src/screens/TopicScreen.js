
import React,{useEffect, useState, useLayoutEffect} from 'react';


import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
  FlatList
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



import SearchBox from '../components/SearchBox'
import Topic from '../components/Topic'
import Header from '../components/Header';

import firestore from "@react-native-firebase/firestore";
import auth from '@react-native-firebase/auth';


const TopicScreen  = ({navigation}) => {
   const userId =auth().currentUser.uid;
   const [themes, setThemes] = useState([]);
   const [user, setUser] = useState(null);
   const [followedTopics, setFollowedTopics] = useState([]);
   const [recommendedTopics, setRecommendedTopics] = useState([]);
   const[populaires, setPopulaire] = useState([]);
   const[searchedTopics, setSearchedTopics] = useState([]);
   const[searching, setSearching] = useState(false);
   const[term, setTerm] = useState('');


   useEffect( () => {
       setTerm('');
        fetchFollowedToppics();
         fetchPopularToppics();
         fetchRecommendedToppics();

       
     },[]);

     

     



   
     const fetchRecommendedToppics = () => {
       try{
        let isMounted = true;
           
        firestore().collection('Users').doc(userId).onSnapshot(snapshot => {

           if(isMounted){
              const user1 = snapshot.data();
              setThemes(snapshot.data().themes);
              setUser(user1);

              firestore().collection('Topics').onSnapshot((snapshot) => {               
               if(isMounted){
                   const topics = snapshot.docs.map((doc) => ({id: doc.id, data: doc.data()}));
                    const themes =  user1.themes;
                    let recommendedTopics =null;              
                       if(themes.length>0){
                           recommendedTopics =[];
                           topics.map((tpc, i)=>{ 
                           let topicThemes = tpc.data.themes;
                           let intersection = themes.filter(x => topicThemes.includes(x));
                           if(intersection.length>0){
                               recommendedTopics.push(tpc)                          
                           }                               
                          })
                       }                  
                    setRecommendedTopics(recommendedTopics);
               }
             });

           }
         });


       
       }catch(e){
         console.log(e);
       }
       return () => {
        isMounted = false;
      };
     };
       const fetchPopularToppics =  () => {
         try{
          let isMounted1 = true;
          firestore().collection('Topics').orderBy('nbFollowers',  'desc').limit(3).onSnapshot((snapshot) => {
           if(isMounted1){
            setPopulaire(snapshot.docs.map((doc) => ({id: doc.id, data: doc.data()})));
           }
         });
         }catch(e){
           console.log(e);
         }
         return () => {
          isMounted1 = false;
        };
       };

       const fetchFollowedToppics =  () => {
           try{
            let isMounted = true;
            firestore().collection('Topics').where('followers','array-contains',userId).onSnapshot((snapshot) => {
               if(isMounted){
                   setFollowedTopics(snapshot.docs.map((doc) => ({id: doc.id, data: doc.data()})));      
               }
             });
           }catch(e){
             console.log(e);
           }
           return () => {
            isMounted = false;
          };
         };



         const fetchSearchedToppics = (SearchTerm) => {
             const term1 = SearchTerm.toLowerCase();
           try{
            let isMounted = true;
               firestore().collection('Topics').onSnapshot((snapshot) => {
               if(isMounted){
                   const search = snapshot.docs.map((doc) => ({id: doc.id, data: doc.data()}));
                   const results = search.filter(element => element.data.nom.toLowerCase().includes(term1));
                   setSearchedTopics(results);
               }
             });
           }catch(e){
             console.log(e);
           }
           return () => {
            isMounted = false;
          };
         };


   const searchHandle = (text) => {
       setTerm(text);
       fetchSearchedToppics(text);
       setSearching(true);
   }

   
   return (
       <SafeAreaView style={{backgroundColor:'white'}}>
       <Header/>
       <View style={styles.topicsView}>
           
               <SearchBox
                   placeHolder = 'Rechercher un topic'
                   search = {searchHandle}
               />

               <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddTopic')}>
               <Text style={{color:"white"}}>Nouveau Topic</Text>
               </TouchableOpacity>
               

           {(!searching || term == "") ? 
           <>
           <ScrollView>
                   
                   
               <View>
                   <View>
                   <Text style={{fontWeight:'800', marginLeft:10, color: "#000000",}}>Les Plus Populaires</Text>
                   {populaires.map((item, i)=>{ 
                       return(
                           
                           <TouchableOpacity onPress={() => navigation.navigate('SingleTopicScreen',{docId: item.id})}>
                               <Topic
                                   nom = {item.data.nom}
                                   createurNom = {item.data.createurNom}
                                   dateCreation = {new Date(item.data.dateCreation.seconds * 1000).toLocaleDateString("fr-FR")}
                                   nombreFollower = {item.data.nbFollowers}//{item.data.followers.size}
                                   topicPhoto = {item.data.photo}     
                               />
                           </TouchableOpacity>
                       )
                       
                       })}      
                           
                   
                   
                   {recommendedTopics?
                   <>
                   {console.log(recommendedTopics)}
                   <Text style={{fontWeight:'800', marginLeft:10, color: "#000000", }}> Topics Recommendé</Text>
                   {recommendedTopics.map((item, i)=>{ 
                       return(
                           
                           <TouchableOpacity onPress={() => navigation.navigate('SingleTopicScreen',{docId: item.id})}>
                               <Topic
                                   nom = {item.data.nom}
                                   createurNom = {item.data.createurNom}
                                   dateCreation = {new Date(item.data.dateCreation.seconds * 1000).toLocaleDateString("fr-FR")}
                                   nombreFollower = {item.data.nbFollowers}//{item.data.followers.size}
                                   topicPhoto = {item.data.photo}     
                               />
                           </TouchableOpacity>
                       )
                       
                       
                       })} 
                       
                   </>
                   
                   :
                   <>
                       
                   </>}
                   

                  
                   </View>
                  
            
               </View>
               </ScrollView>
           
           </>
           :
           <>
              
               <View>
               
               <Text style={{fontWeight:'800', marginLeft:10, color: "#000000"}}> searching for {term}</Text>
                   <FlatList 
                       data={searchedTopics}
                       renderItem={({item}) => (
                           <TouchableOpacity onPress={() => navigation.navigate('SingleTopicScreen',{docId: item.id})}>
                               <Topic
                                   nom = {item.data.nom}
                                   createurNom = {item.data.createurNom}
                                   dateCreation = {new Date(item.data.dateCreation.seconds * 1000).toLocaleDateString("fr-FR")}
                                   nombreFollower = {item.data.nbFollowers}
                                   topicPhoto = {item.data.photo}     
                               />
                           </TouchableOpacity>
                       )}
                   />
               </View>
           </>
           }          
       </View>

   </SafeAreaView>
   )
   
}








const styles = StyleSheet.create({
   topicsView: {
       paddingLeft: 5,
       paddingRight: 5,
       paddingTop: 10,
       backgroundColor: '#FFFFFFF',
       height:'100%',

   },
   button: {
       bottom:0,
       alignItems: "center",
       backgroundColor: "#771822",
       padding: 10,
       marginLeft: 20,
       marginRight: 20,
       marginBottom: Dimensions.get('window').height / 100,
       borderRadius: 20
   },
})

export default TopicScreen;
