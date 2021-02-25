import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { 
    Container,
} from '../styles/FeedStyles';
import { FlatList } from 'react-native-gesture-handler';
import PostCard from '../components/PostCard';

const Posts = [
    {
      id: '1',
      userName: 'Jenny Doe',
      userImg: require('../assets/users/user-3.jpg'),
      postTime: '4 mins ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: require('../assets/posts/post-img-3.jpg'),
      liked: true,
      likes: '14',
      comments: '5',
    },
    {
      id: '2',
      userName: 'John Doe',
      userImg: require('../assets/users/user-1.jpg'),
      postTime: '2 hours ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: 'none',
      liked: false,
      likes: '8',
      comments: '0',
    },
    {
      id: '3',
      userName: 'Ken William',
      userImg: require('../assets/users/user-4.jpg'),
      postTime: '1 hours ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: require('../assets/posts/post-img-2.jpg'),
      liked: true,
      likes: '1',
      comments: '0',
    },
    {
      id: '4',
      userName: 'Selina Paul',
      userImg: require('../assets/users/user-6.jpg'),
      postTime: '1 day ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: require('../assets/posts/post-img-4.jpg'),
      liked: true,
      likes: '22',
      comments: '4',
    },
    {
      id: '5',
      userName: 'Christy Alex',
      userImg: require('../assets/users/user-7.jpg'),
      postTime: '2 days ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: 'none',
      liked: false,
      likes: '0',
      comments: '0',
    },
  ];
export default function HomeScreen() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const list = [];

        await firestore()
        .collection('posts')
        .orderBy('postTime', 'desc')
        .get()
        .then((querySnapshot) => {
          // console.log('Total posts: ', querySnapshot.size);
          querySnapshot.forEach(doc => {
            const { post, postImg, postTime, userId, likes, comments } = doc.data();
            list.push({
              id: doc.id,
              userId,
              userName: 'Test name',
              userImg: 'https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5ed554fab14861000600baf1%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D53%26cropX2%3D739%26cropY1%3D114%26cropY2%3D800',
              postTime,
              post,
              postImg,
              liked: false,
              likes,
              comments
            });
          });
        });

        setPosts(list);

        if(loading) {
          setLoading(false);
        }
        console.log('Posts: ', list);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPosts();
  }, []);
    return (
        <Container>
            <FlatList 
                data={posts}
                renderItem={({item}) => <PostCard item={item} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </Container>
    )
}
