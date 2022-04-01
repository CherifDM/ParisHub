import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    
  } from 'react-native';



const Topic = (props) => {
  const getNbFollowers = (nbFollowers) =>{
    if(nbFollowers < 1000){
      return nbFollowers;
    } else if(nbFollowers>=1000 && nbFollowers<1000000){
      return Math.floor(nbFollowers/1000)+'K';
    }
  }
    return (
        <View style={styles.topicView}>

            <View style={styles.topicHeader}>
              <View style={{width:'13%'}}>
                <Image source={{uri: props.topicPhoto}} style={styles.topicPhoto}/>
              </View>
              <View style={{flexGrow:1}}>
                <Text style={styles.headerTitle}>{props.nom}</Text>
              </View>
            </View>

            <View
            style={{
                borderBottomColor: 'black',
                borderBottomWidth: 0.5,
            }}
            />
            <View style={styles.topicContent}>
                <View style={styles.detailsView}>
                <Text style={styles.topicDetails}> Créé par : {props.createurNom}</Text>
                </View>
                <View style={styles.detailsView}>
                <Text style={styles.topicDetails}>Créé le : {props.dateCreation}</Text>
                </View>
                <View style={styles.detailsView}>
                <Text style={styles.topicDetails}>{getNbFollowers(props.nombreFollower)} membres</Text>
                
                </View> 
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    topicView: {
      fontWeight: '700',
      //backgroundColor: 'grey', #2296F3, d8e2dc
      backgroundColor: '#F2F2F2',
      
      // paddingLeft: 5,
      // paddingRight: 5,
      // padding: 5,
      margin: 5,
      borderRadius: 25,
      marginBottom: 10,
      borderColor: 'black',
      borderWidth: 1,
      
    },
    topicHeader:{
      alignContent: 'flex-start',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      //height:'15%',
      marginBottom:3,
      paddingHorizontal:10,
      paddingTop:5,
      //padding: 5,
  
      // borderColor: 'blue',
      // borderWidth: 0.3,
    },
    headerTitle: {
        fontWeight: 'bold',
        color: "#000000",
        textDecorationLine: 'underline',
        //flex: 1000
        width: '70%'
        
    },
    topicPhoto: {
      //flex: 1,
      width: 30,
      height: 30,
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
      justifyContent:'space-between',
      width:'80%',
      alignSelf:'center'

     // flexWrap: 'wrap',
      //flexShrink: 0
    },
    detailsView: {
        //flexWrap: 'wrap',
        flexShrink: 1,
        marginLeft: 5,
        marginRight: 5,
        //justifyContent:'center',
        //alignContent:'center',
        width:'30%',
        alignItems:'baseline',
        // borderColor:'black',
        // borderWidth:1
        
    },
    
    topicDetails: {
      marginRight: 10,
      fontSize: 12,
      fontWeight: '400',
      textAlign:'center',
      alignSelf:'center'
    //   flexShrink: 1,
      // flex: 2,
    },
    userNom: {
      fontWeight: '400',
      flex: 1,
    },
  });
    
    export default Topic;
 