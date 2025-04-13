// NavigationDrawer.tsx

import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { ListItem, Icon } from '@rneui/base';
import {PresenceListScreen} from "./PresenceListScreen";
import {UserContext} from "../context/UserContext";

const Drawer = createDrawerNavigator();

export default function NavigationDrawer() {
    const { username, userIcon } = useContext(UserContext);

    return (
        <Drawer.Navigator
            initialRouteName="Lista de Presença"
            drawerContent={(props) => (
                <SafeAreaView style={{ flex: 1 }}>
                    {/* Cabeçalho do Drawer com ícone de login e nome */}
                    <View style={styles.headerContainer}>
                        <Ionicons name={userIcon} size={40} color="#007bff" />
                        <Text style={styles.headerText}>{username}</Text>
                    </View>

                    {/* Opções do Drawer */}
                    <ListItem
                        containerStyle={styles.listItem}
                        onPress={() => props.navigation.navigate('Lista de Presença')}
                    >
                        <Icon name="list" type="font-awesome" color="#007bff" />
                        <ListItem.Content>
                            <ListItem.Title>Lista de Presença</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>

                    <ListItem
                        containerStyle={styles.listItem}
                        onPress={() => props.navigation.navigate('Configurações')}
                    >
                        <Icon name="cogs" type="font-awesome" color="#007bff" />
                        <ListItem.Content>
                            <ListItem.Title>Configurações</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                </SafeAreaView>
            )}
        >
            <Drawer.Screen name="Lista de Presença" component={PresenceListScreen} />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f5f5f5',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
    },
    listItem: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 10,
        elevation: 3,
    },
});
