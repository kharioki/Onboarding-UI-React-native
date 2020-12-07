import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FormButton from '../components/FormButton';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Homescreen</Text>
            <FormButton buttonTitle='Logout' onPress={() => {}} />
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
