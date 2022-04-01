import React, { useState, useEffect } from 'react';
   
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

  import Icon from '../components/Icon';
  import TopicScreen from '../screens/TopicScreen';
  import ListeUtilisateurs from '../screens/ListeUtilisateurs';
  import AddPost from '../screens/AddPost';
  import ListeContactsMessages from '../screens/ListeContactsMessages';
  import HomeScreen from '../screens/HomeScreen';
  import auth from '@react-native-firebase/auth';

 
  




 const Tab = createBottomTabNavigator();

const MainStack = ({ navigation }) => {
    
    const[UserID,setUserID] = useState();
    const getUserId  = auth().onAuthStateChanged((user) => {
        if(user){
            setUserID(user.uid);
            return user.uid;
        } else {
            
            navigation.navigate('Login');
        }
      })

    return(
        
            <Tab.Navigator screenOptions={{ headerShown: false, showLabel: false, }} 
            /*tabBarOptions={{ showLabel: false, }}*/
            tabBarOptions={{
            showLabel: false,
            // activeTintColor: '#fff',
            // inactiveTintColor: '#696969',
            // activeBackgroundColor: '#696969',
            // inactiveBackgroundColor: '#fff',
            //     style: {
            //             backgroundColor: '#696969',
            //             paddingBottom: 3
            //     }
            }}
            >
                
                <Tab.Screen name="HomeScreen" component={HomeScreen} 
                
                    options={{
                        tabBarIcon: ({color, size, focused}) => (
                            <Icon iconImage = {require('../images/Home.png')} focus = {focused}/>
                        ),
                    }}
                    initialParams={{userId: UserID}}
                    
                    
                />
                <Tab.Screen name="ListeUtilisateurs"  component={ListeUtilisateurs} 
                    options={{
                        tabBarIcon: ({color, size, focused}) => (
                            <Icon iconImage = {require('../images/searchProfil.png')} focus = {focused}/>
                        ),
                    }}
                    initialParams={{userId: UserID}}
                /> 

                <Tab.Screen name="ListeContactsMessages" component={ListeContactsMessages}      
                    options={{
                        tabBarIcon: ({color, size, focused}) => (
                            <Icon iconImage = {require('../images/dm.png')} focus = {focused}/>
                        ),
                    }}
                    initialParams={{userId: UserID}}
                /> 

                

                <Tab.Screen name="TopicScreen" component={TopicScreen} 
                    options={{
                        tabBarIcon: ({color, size, focused}) => (
                            <Icon iconImage = {require('../images/logTopic.png')} focus = {focused}/> 
                        ),
                    }}
                    initialParams={{userId: UserID}}
                /> 

                <Tab.Screen name="AddPost" component={AddPost} 
                    options={{
                        tabBarIcon: ({color, size, focused}) => (
                            <Icon iconImage = {require('../images/plus.png')} focus = {focused}/>
                        ),
                    }}
                    initialParams={{userId: UserID}}
                /> 

            </Tab.Navigator>


    );
};

export default MainStack;