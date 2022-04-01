import React, {useState} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    TextInput,
  } from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../util/Colors';
const SearchBox = (props) => {
    const [text, setText] = useState('');

    function setLists(searchItem){
        props.search(text);
        // props.setList(props.search(searchItem))
    }
    function cancel(){
        setText('');
        props.search('');
    }

    return(
        <View style={styles.searchView}>
            {/* <Image source={require('../assets/images/search.png'), /> */}
            <Image source={require('../images/search.png')} style={styles.icon}/>
            <TextInput 
                style={styles.input}
                placeholder = {props.placeHolder}
                value={text}
                onChangeText={newText => setText(newText)}
                onSubmitEditing = {setLists}  
            />
            <TouchableOpacity onPress={() => cancel()}>
                <Image source={require('../images/cancel.png')} style={styles.iconRight}/>
            </TouchableOpacity>
        </View>
    )
    
}
const styles = StyleSheet.create({
    searchView:{
        borderColor: '#323f4b',
        borderWidth: 0.7,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 9,
        marginHorizontal: 5,
        paddingHorizontal:10,
        //borderColor:Colors.TERTIARY,
        borderWidth:1,
        marginVertical:5
        
    },
    input: {
        width: '60%',
        flexGrow:1,
        color: '#323f4b',
        fontWeight:'bold',
        fontStyle:'italic'
    },
    icon:{
        width: 20,
        height: 20,
        marginRight: 10,
    },
    iconRight:{
        width: 15,
        height: 15,
        marginRight: 10,

        
        
    }
});

export default SearchBox;