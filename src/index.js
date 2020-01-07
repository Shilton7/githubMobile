import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import './config/Reactotron';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

console.tron.log('Rodando');

export default function App() {
    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>
                {' '}
                Welcome to React Native, by Shilton
            </Text>
        </View>
    );
}
