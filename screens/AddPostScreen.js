import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function AddPostScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Add Post screen</Text>
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
    text: {
        fontSize: 20,
        color: '#333333',
    },
});
