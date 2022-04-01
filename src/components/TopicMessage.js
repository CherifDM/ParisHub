import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
  } from 'react-native';
  import Colors from '../util/Colors';

const TopicMessage = (props) => {
    return (
        <View style={styles.postView}>
          <View style={styles.postDetails}>
            <Image source={{uri: props.userPhoto}} style={styles.photoProile}/>
            <View style={styles.userNames}>
            <Text style={styles.userPseudo}>{props.userPseudo} </Text>
            <Text style={styles.userNom}>{props.userPrenom} {props.userNom}</Text>
            </View>
            
            {/* <Text style={styles.userNom}>{props.userPrenom}</Text> */}
          </View>

          <View style={styles.postTitle}>
            <Text>{props.message}</Text>
          </View>
          
        </View>

        
      
    );
  }

  
const styles = StyleSheet.create({
  postView: {
    fontWeight: '700',
    //backgroundColor: 'grey', #2296F3, d8e2dc
    backgroundColor: Colors.TERTIARY,
    
    // paddingLeft: 5,
    // paddingRight: 5,
    padding: 5,
    margin: 5,
    borderRadius: 9,
    marginBottom: 10,
    borderWidth:1,

    //height:60
  },
  postDetails:{
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom:3,

    // borderColor: 'black',
    // borderWidth: 0.3,
  },
  postTitle: {
    fontSize: 24,
    fontWeight: '600',
    //paddingVertical:2
  },
  photoProile: {
    // flex: 1,
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 100

    // borderColor: 'black',
    // borderWidth: 0.3,
  },
  userNames:{
    flexDirection:'row',
    alignContent:'flex-end',
    justifyContent:'flex-end',
  },
  userPseudo: {
    marginRight: 10,
    fontSize: 15,
    fontWeight: '800',
    // flex: 2,
  },
  userNom: {
    fontWeight: '400',
    fontStyle: 'italic',
    fontSize:11,
    
    // flex: 1,
  },
});
  
  export default TopicMessage;