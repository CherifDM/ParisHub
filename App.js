/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useContext, useEffect } from 'react';
 import { View, ActivityIndicator, Image, ImageBackground, Dimensions } from 'react-native';
 import { createStackNavigator } from '@react-navigation/stack';
 import { NavigationContainer } from '@react-navigation/native';
 import LoginScreen from './src/screens/Login';
 import Subscribe from './src/screens/Subscribe';
 import SubscribeFinal from './src/screens/SubscribeFinal';
 import ListeMessages from './src/screens/ListeMessages';
 import MonProfil from './src/screens/MonProfil';
 import ListeUsers from './src/screens/ListeUsers';
 import MainStack from './src/stack/MainStack';
 import Reglages from './src/screens/Reglages';
 import EditProfile from './src/screens/EditProfile';
 import InfosProfile from './src/screens/InfosProfile';
 import AddTopic from './src/screens/AddTopic';
 import SingleTopicScreen from './src/screens/SingleTopicScreen';
 import SubscribeFinal2 from './src/screens/SubscribeFinal2';
 import Support from './src/screens/Support';
 const Stack = createStackNavigator();
 const App = () => {
   const [isLoading, setIsLoading] = React.useState(true);
   useEffect(() => {
     setTimeout(() => {
       setIsLoading(false);
     }, 1000);
   }, []);
   if (isLoading) {
     return (
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <Image
           source={require('./src/images/img.png')}
 
           style={{
             height: Dimensions.get('window').height / 1.5
           }}
 
         />
         <ActivityIndicator size="large" />
       </View>
     )
   }
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" headerMode="none">
          <Stack.Screen name="AddTopic" component={AddTopic}/>
          <Stack.Screen name="SingleTopicScreen" component={SingleTopicScreen}/>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Subscribe" component={Subscribe} />
          <Stack.Screen name="Support" component={Support} />
          <Stack.Screen name="SubscribeFinal" component={SubscribeFinal} />
          <Stack.Screen name="MainStack" component={MainStack} />
          <Stack.Screen name="ListeMessages" component={ListeMessages} />
          <Stack.Screen name="MonProfil" component={MonProfil}/>
          <Stack.Screen name="ListeUsers" component={ListeUsers}/>
          <Stack.Screen name="Reglages" component={Reglages}/>
          <Stack.Screen name="EditProfile" component={EditProfile}/>
          <Stack.Screen name="InfosProfile" component={InfosProfile}/>
          <Stack.Screen name="SubscribeFinal2" component={SubscribeFinal2}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
};
 
 











 export default App;
 