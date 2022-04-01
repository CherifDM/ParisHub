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
    TouchableOpacity,
  } from 'react-native';

const Icon = (props) => {
    return (
        <View style={styles(props).iconView}>
                <Image source={props.iconImage} style={styles(props).icon}/>
        </View>
    );
}

const styles = (props) => StyleSheet.create({
    iconView: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        flex:1,
        // height: 25,
        // height: 30,
        // paddingTop: 10,
        // paddingBottom: 10,
        // marginBottom: 1,

        //borderColor: 'black',
        // borderWidth: 1,
        
    },
    icon: {
        //flex: 1,
        width: 30,
        height: 30,
        resizeMode: 'center',
        opacity: props.focus? 1 : 0.4,
    },
  });


export default Icon;