import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
import ActionButton from 'react-native-action-button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import { AuthContext } from '../navigation/AuthProvider';

import { 
    InputWrapper, 
    InputField, 
    AddImage,
    SubmitBtn,
    SubmitBtnText,
    StatusWrapper
} from '../styles/AddPostStyles';

export default function AddPostScreen() {
    const {user, logout} = useContext(AuthContext);
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [post, setPost] = useState(null);

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
          width: 1200,
          height: 780,
          cropping: true,
        }).then((image) => {
          console.log(image);
          const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
          setImage(imageUri);
        });
    };
    
    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
          width: 1200,
          height: 780,
          cropping: true,
        }).then((image) => {
          console.log(image);
          const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
          setImage(imageUri);
        });
    };

    const submitPost = async () => {
        const imageUrl = await uploadImage();
        console.log('Image url: ', imageUrl);

        firestore()
        .collection('posts')
        .add({
            userId: user.uid,
            post: post,
            postImg: imageUrl,
            postTime: firestore.Timestamp.fromDate(new Date()),
            likes: null,
            commments: null,
        })
        .then(() => {
            console.log('Post Added!')
            Alert.alert(
                'Post Published!',
                'Your post has been published Successfully!!!'
            );
            setPost(null);
        })
        .catch((error) => {
            console.log('Something went wrong ', error);
        })
    }

    const uploadImage = async () => {
        if(image == null) {
            return null;
        }
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        // Add timestamp to file name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;

        setUploading(true);
        setTransferred(0);

        const storageRef = storage().ref(`photos/${filename}`);
        const task = storageRef.putFile(uploadUri);

        // set transferred state
        task.on('state_changed', taskSnapshot => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);

            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
            );
        });

        try {
            await task;

            const url = await storageRef.getDownloadURL();
            setUploading(false);
            setImage(null);

            return url;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    return (
        <View style={styles.container}>
            <InputWrapper>
                {image !== null ? <AddImage source={{uri: image}} /> : null}

                <InputField 
                    placeholder="What's on your mind?"
                    multiline
                    numberOfLines={4}
                    value={post}
                    onChangeText={(content) => setPost(content)}
                />
                {uploading ? (
                    <StatusWrapper>
                        <Text>{transferred}% Completed</Text>
                        <ActivityIndicator size='large' color='#0000ff' />
                    </StatusWrapper>
                ) : (
                    <SubmitBtn onPress={submitPost}>
                        <SubmitBtnText>Post</SubmitBtnText>
                    </SubmitBtn>
                )}
            </InputWrapper>

            <ActionButton buttonColor="rgba(231,76,60,1)">
                <ActionButton.Item 
                    buttonColor='#9b59b6' 
                    title="Take Photo" 
                    onPress={takePhotoFromCamera}
                >
                    <Ionicons name="camera-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item 
                    buttonColor='#3498db' 
                    title="Choose Photo" 
                    onPress={choosePhotoFromLibrary}
                >
                    <Ionicons name="md-images-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});
