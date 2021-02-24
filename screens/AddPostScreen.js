import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { InputWrapper, InputField } from '../styles/AddPostStyles';

export default function AddPostScreen() {
    return (
        <View style={styles.container}>
            <InputWrapper>
                <InputField 
                    placeholder="What's on your mind?"
                    multiline
                    numberOfLines={4}
                />
            </InputWrapper>
            <ActionButton buttonColor="rgba(231,76,60,1)">
                <ActionButton.Item 
                    buttonColor='#9b59b6' 
                    title="Take Photo" 
                    onPress={() => console.log("notes tapped!")}
                >
                    <Ionicons name="camera-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item 
                    buttonColor='#3498db' 
                    title="Choose Photo" 
                    onPress={() => {}}
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
