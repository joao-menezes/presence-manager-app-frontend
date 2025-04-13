import React, { useState } from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {User} from "../interface/user.interface";

export function PresenceListScreen() {
    const [users, setUsers] = useState<User[]>([]);

    return (
        <SafeAreaView style={styles.container}>
           <View>
               <Text>Pagina de Configurções</Text>
           </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 10,
    },
    searchInput: {
        marginVertical: 10,
    },
    inputContainer: {
        borderBottomWidth: 0,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 10,
        elevation: 2,
    },
    listItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 5,
        elevation: 1,
    },
    avatar: {
        backgroundColor: '#007bff',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
    checkboxContainer: {
        padding: 0,
        margin: 0,
        backgroundColor: 'transparent',
    },
});