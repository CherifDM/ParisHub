/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useCallback } from 'react';

import {
  ScrollView,
  StyleSheet,
  View,
  Button,
  Text,
  ActivityIndicator, FlatList, Dimensions, RefreshControl
} from 'react-native';
import Post from '../components/Post';
import Header from '../components/Header';
import firestore from '@react-native-firebase/firestore';
import Firebase from '../util/Firebase';
import auth from '@react-native-firebase/auth';
import _ from "lodash"

const HomeScreen = ({ route, navigation }) => {
  const userId = auth().currentUser.uid;
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    try {
      setPosts(null);
      firestore()
        .collection('Posts').orderBy('postTime', 'desc')
        
        .get()
        .then((querySnapshot) => {
          setPosts(querySnapshot.docs.map(doc => doc.data()));
        });
    } catch (e) {
      console.log(e);
    }
  };
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPosts();
    setRefreshing(false);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'white',}}>
      <Header />
      <FlatList
        data={posts}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        renderItem={({ item }) => (
          <View>
            <Post
              content={item.content}
              photo={item.photo}
              userId={item.userId}
              date={item.postTime}
            />
          </View>

        )}
      />
    </View>
  );



};

export default HomeScreen;

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});


