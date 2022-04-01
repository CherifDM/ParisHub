import React, { useState, useEffect, useCallback } from 'react';
import {useFocusEffect} from '@react-navigation/native'

 import {

   StyleSheet,
    Text,
   View,
   Image,
   KeyboardAvoidingView
 } from 'react-native';
 import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
 import Colors from '../util/Colors';




import firestore from "@react-native-firebase/firestore";
import Header from '../components/Header';
import TopicMessage from '../components/TopicMessage';
import { FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';



 
 const SingleTopicScreen = ({route, navigation}) => {
  const userId = auth().currentUser.uid;
  const [user, setUser] = useState()
  const [createur, setCreateur] = useState()
    const { docId } = route.params;
    const [text, setText] = useState('');
    const [topicMessages, setTopicMessages] = useState();
    const [following, setFollowing] = useState(false);
    const [followedTopics, setFollowedTopics] = useState()
    const [working, setWorking] = useState(false);
    const [scrollView, setScrollView] = useState()
    const[nbFocus, setNbFocus] = useState();
   const [topic, setTopic] = useState();
   useEffect( () => {
     fetchUser();
        fetchToppic();
        fetchToppicMessages();
        // scrollView.scrollTo({y:0});
    },[]);

    // {nbFocus=0?
    //   <>
    //     {scrollView.scrollToEnd({ animated: false }) }
    //   </>
    //   :
    //   <></>}


    useEffect( () => {

      if(scrollView){
        scrollView.scrollToEnd({ animated: true });
      }
      
     });

     useFocusEffect(
      useCallback(() => {
        console.log("Page focused");
        //scrollView.scrollToEnd({ animated: true });
        return () => {
          console.log("Page unfocused");
        };
      }, [])
    );


   const fetchToppic = () => {
    try{
     let isMounted = true;
     firestore().collection('Topics').doc(docId).onSnapshot((snapshot) => {
        if(isMounted){    
           setTopic(snapshot.data());
           const createurId = snapshot.data().createurId;
           firestore().collection('Users').doc(createurId).onSnapshot((createurSnapshot) => {
            if(isMounted){         
               setCreateur(createurSnapshot);
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

  const fetchUser = () => {
   try{
    let isMounted = true;
    firestore().collection('Users').doc(userId).onSnapshot((snapshot) => {
       if(isMounted){
         const userData = {
          nom: snapshot.data().nom,
          prenom: snapshot.data().prenom,
          pseudo: snapshot.data().pseudo,
          avatar: snapshot.data().userImg,
         }
          setUser(userData);
          const followedTopics = snapshot.data().followedTopics;
          setFollowedTopics(followedTopics);
         
          if(followedTopics){
            if(followedTopics.includes(docId)){
              console.log("followed topics : "+followedTopics)
              setFollowing(true);
            }
          }
       }
     });

   }catch(e){
     console.log(e);
   }
   return () => {
    isMounted = false;
  };
 };


 const unfollowTopic = () => {
  if(!working){
    setFollowing(false);
    setWorking(true);
  //const topicFollowers = topic.followers.filter(x => x !== userId);
    firestore().collection('Topics').doc(docId)
    .update({
      nbFollowers: topic.nbFollowers - 1,
    })
    .then(() => {
      const ft = followedTopics.filter(x => x !== docId);
      firestore().collection('Users').doc(userId)
      .update({
        followedTopics: ft,
      })
      .then(() => {
        console.log('Unfollowed topic!');
        setFollowedTopics(ft);
        setFollowing(false);
        setWorking(false);
      });
    });
  } else{
    alert('HEY IM WORKING');
  }

  
 }
 const followTopic = () => {

  if(!working){
    setFollowing(true);
    setWorking(true);
    // const topicFollowers = topic.nbFollowers;
    // topicFollowers.push(userId);

    firestore().collection('Topics').doc(docId)
    .update({
      nbFollowers: topic.nbFollowers + 1,
    })
    .then(() => {
      const ft = followedTopics;
      ft.push(docId);
      firestore().collection('Users').doc(userId)
      .update({
        followedTopics: ft,
      })
      .then(() => {
        console.log('Followed topic!');
        setFollowedTopics(ft);
        setFollowing(true);
        setWorking(false);
      });
    });
  }else{
    alert('HEY IM WORKING');
  }
    

    
}


  const fetchToppicMessages = () => {
    console.log("fetching topic messages")
    try{
     let isMounted = true;
     firestore().collection('Topics').doc(docId).collection('Messages').orderBy('createdAt','asc').onSnapshot((snapshot) => {
        if(isMounted){
            setTopicMessages(snapshot.docs.map((doc) => ({data: doc.data()})));
        //    console.log("got topic : "+topic.nom);
        //    setTopic(snapshot.data());
        }
      });

    }catch(e){
      console.log(e);
    }
    return () => {
     isMounted = false;
   };
  };
  

  function sendMessage(){
      
      // console.log(auth()?.currentUser);
    firestore().collection('Topics').doc(docId).collection('Messages').add({
        message: text,
        createdAt: firestore.Timestamp.fromDate(new Date()),
        user: user,

      }) 
      setText('');
  }
 
   return (
     
     <View style={{flex: 1}}>
     <Header/>
     {/* <TouchableOpacity
                      style={styles.userBtn}
                      onPress={() => navigation.navigate('TabTest')}>
                      <Text style={{ color: 'white' }}>TabTest</Text>
                    </TouchableOpacity> */}
     {topic ?
     <>
     
     <KeyboardAwareScrollView style={{flexGrow:1, height:'100%'}} ref={view => setScrollView(view)}> 
          <View style={styles.topicHeade}>
              <View style={styles.topicHeader}>
                  <Image source={{uri: topic.photo}} style={styles.topicPhoto}/>
                  
                  <Text style={styles.headerTitle}>{topic.nom}</Text>
                  {following==true?
                 
                  <>
                  
                  <TouchableOpacity
                      style={styles.userBtn}
                      onPress={() => unfollowTopic()}>
                      <Text style={{ color: 'white' }}>Ne plus suivre</Text>
                    </TouchableOpacity>
                  </>
                  :
                  <>
                  <TouchableOpacity
                      style={styles.userBtn}
                      onPress={() => followTopic()}>
                      <Text style={{ color: 'white' }}>Suivre ce topic</Text>
                    </TouchableOpacity>
                  </>
                  }
                    
              </View>
              <View style={styles.topicContent}>
                  <View style={styles.detailsView}>
                  
                  <Text style={styles.topicDetails}>Topic cree par : {topic.createurNom}</Text>
                  
                  
                  </View>
                  <View style={styles.detailsView}>
                  <Text style={styles.topicDetails}>Date de création : {new Date(topic.dateCreation.seconds * 1000).toLocaleDateString("fr-FR")}</Text>
                  </View>
                  <View style={styles.detailsView}>
                  <Text style={styles.topicDetails}>{topic.nbFollowers} personnes suivent ce topic</Text>
                  </View> 
              </View>
          </View>
          
          <View style={styles.chatView}>  
               
          
            <View style={{ }}>
            
            <FlatList 
                data={topicMessages}
                renderItem={({item}) => (                           
                        <TopicMessage
                            message = {item.data.message}
                            userNom = {item.data.user.nom}
                            userPrenom = {item.data.user.prenom}
                            userPseudo = {item.data.user.pseudo}
                            userPhoto = {item.data.user.avatar}
                        /> 
                                          
                )}
              />

              {/* <ScrollView>
                {topicMessages ?
                  <>
                  {topicMessages.map((item, i)=>{ 
                            return(
                              <TopicMessage
                                    message = {item.data.message}
                                    userNom = {item.data.user.nom}
                                    userNPrenom = {item.data.user.prenom}
                                    userPseudo = {item.data.user.pseudo}
                                    userPhoto = {item.data.user.avatar}
                                />
                            )
                            
                            })}  
                  </> 
                  :
                  <>
                            <Text>No messages here!</Text>
                  </>}
              </ScrollView> */}
            </View>
            <View style={{minHeight:'100%', maxHeight:'12%', position:'absolute', height:2000, bottom:20}}>
              
            </View>  
          </View>
     </KeyboardAwareScrollView>
     <TextInput
                  style={styles.input}
                  placeholder = 'Message here'
                  value={text}
                  onChangeText={newText => setText(newText)}
                  onSubmitEditing = {sendMessage}   
              />
     
   
      {/* <View style={styles.chatView}>
        
      </View> */}
     </>
     :
     <></>}
        {/* {console.log('scroll : '+scrollView)} */}
        {/* {scrollView? scrollView.scrollToEnd({ animated: false }) : console.log("AHHHHHHHHH")} */}
          {/* {scrollView.scrollToEnd({ animated: false }) } */}
     </View>
 
 
   );
 };
 
 const styles = StyleSheet.create({
      topicHeade:{
        backgroundColor: Colors.SECONDARY,
      },  
      chatView:{
        flexDirection:'column-reverse',
        flexGrow:1,
        //backgroundColor:'black',
        
      },
      topicHeader:{
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        //height:'15%',
        marginBottom:3,
        padding: 5,
    
        // borderColor: 'blue',
        // borderWidth: 0.3,
      },
      headerTitle: {
          fontWeight: 'bold',
          color: "#000000",
          textDecorationLine: 'underline',
          //flex: 1000
          //width: '60%'
          
      },
      userBtn: {
        backgroundColor: "#771822",
        padding: 10,
        marginLeft: 15,
        width: '95%',
        borderRadius: 20,
        // marginTop: Dimensions.get('window').height / 40,
      },
      topicPhoto: {
        //flex: 1,
        width: 35,
        height: 35,
        resizeMode: 'cover',
        borderRadius: 100,
        marginRight: 10,
        
    
        // borderColor: 'black',
        // borderWidth: 0.3,
      },
      topicContent: {
        // fontSize: 24,
        // fontWeight: '600',
        height: 60,
        flexDirection: 'row',
        padding: 8,
  
       // flexWrap: 'wrap',
        //flexShrink: 0
      },
      detailsView: {
          //flexWrap: 'wrap',
          flexShrink: 1,
          paddingLeft: 5,
          paddingRight: 5,
          
      },
      
      topicDetails: {
        marginRight: 10,
        fontSize: 12,
        fontWeight: '400',
      //   flexShrink: 1,
        // flex: 2,
      },
      userNom: {
        fontWeight: '400',
        flex: 1,
      },
 });
 
 export default SingleTopicScreen;
 