import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, FlatList, StyleSheet, Pressable, Text, TouchableOpacity } from 'react-native';
import { Input, ListItem, CheckBox, Avatar } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { User } from "../interface/user.interface";
import ToastService from "../service/toast.service";
import { useTheme } from '../assets/themes/ThemeContext';
import { filterUsers } from '../service/search.service';
import {ApiService} from "../service/api.service";
import {logger} from "react-native-reanimated/lib/typescript/logger";

export function PresenceListScreen() {
    const { theme } = useTheme();
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string>('');
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const mockUsers = [
        { userId: "1", username: "João Silva", age: 28 },
        { userId: "2", username: "Maria Oliveira", age: 34 },
        { userId: "3", username: "Pedro Souza", age: 23 },
        { userId: "4", username: "Ana Costa", age: 41 },
        { userId: "5", username: "Lucas Pereira", age: 29 },
        { userId: "6", username: "Carla Rocha", age: 33 },
        { userId: "7", username: "Rafael Santos", age: 27 },
        { userId: "8", username: "Juliana Almeida", age: 35 },
        { userId: "9", username: "Felipe Martins", age: 25 },
        { userId: "10", username: "Larissa Mendes", age: 22 }
    ];

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userData = await ApiService.getUsers();
                setUsers(userData);
                setFilteredUsers(userData);
            } catch (error: any) {
                console.error('Erro ao buscar usuários:', error);
                if (error.response) {
                    console.error('Resposta do servidor:', error.response.data);
                    console.error('Status:', error.response.status);
                } else if (error.request) {
                    console.error('Nenhuma resposta recebida:', error.request);
                } else {
                    console.error('Erro na configuração da requisição:', error.message);
                }
                setError?.('Falha ao carregar os dados dos usuários');
                setUsers(mockUsers);
                setFilteredUsers(mockUsers);
            }
        };

        fetchUsers();
    }, []);


    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const filtered = filterUsers(users, query);
        setFilteredUsers(filtered);
    };

    const handleCheckBoxChange = (userId: string) => {
        if (selectedItems.includes(userId)) {
            setSelectedItems(selectedItems.filter((id) => id !== userId));
        } else {
            setSelectedItems([...selectedItems, userId]);
        }
    };

    const savePresenceList = async (presenceList: User[]) => {
        if (!presenceList) {
            return ToastService.showError("Erro!", "Lista de presença não definida.");
        }

        if (presenceList.length === 0) {
            return ToastService.showInfo("Atenção!", "Nenhum usuário foi adicionado à lista.");
        }

        try {
            await ApiService.savePresence(presenceList);
            ToastService.showSuccess("Sucesso!", "Lista salva com sucesso.");
        } catch (error) {
            ToastService.showError("Erro!", "Erro ao salvar lista de presença.");
            console.error("savePresenceList error", error);
        }
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
            <Input
                placeholder="Buscar por nome ou idade..."
                value={searchQuery}
                onChangeText={handleSearch}
                containerStyle={[styles.searchInput]}
                leftIcon={<Ionicons name="search" size={20} color={theme.colors.text} />}
                inputContainerStyle={[
                    styles.inputContainer,
                    {
                        borderColor: theme.colors.border,
                        backgroundColor: theme.colors.inputBackground,
                    }
                ]}
                placeholderTextColor={theme.colors.placeholder}
            />
            <TouchableOpacity
                onPress={() => savePresenceList(mockUsers)}
                style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}
                activeOpacity={0.7}
            >
                <Ionicons name={"save-outline"} size={20} color="#fff" />
                <Text style={[styles.saveButtonText, {color: "#fff"}]}>Salvar</Text>
            </TouchableOpacity>

            <FlatList
                data={filteredUsers}
                keyExtractor={(item) => item.userId}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => handleCheckBoxChange(item.userId)}
                        style={({ pressed }) => [
                            styles.listItem,
                            {
                                backgroundColor: pressed
                                    ? theme.colors.selectedItem
                                    : theme.colors.card
                            }
                        ]}
                    >
                        <ListItem bottomDivider containerStyle={[styles.listItemContainer, { backgroundColor: theme.colors.card }]}>
                            <Avatar
                                rounded
                                title={item.username[0]}
                                containerStyle={[
                                    styles.avatar,
                                    {
                                        backgroundColor: theme.colors.avatarBackground,
                                    }
                                ]}
                            />
                            <ListItem.Content>
                                <ListItem.Title style={[styles.title, { color: theme.colors.text }]}>{item.username}</ListItem.Title>
                                <ListItem.Subtitle style={[styles.subtitle, { color: theme.colors.subtitleText }]}>{item.age} anos</ListItem.Subtitle>
                            </ListItem.Content>
                            <CheckBox
                                checked={selectedItems.includes(item.userId)}
                                onPress={() => handleCheckBoxChange(item.userId)}
                                containerStyle={[styles.checkboxContainer, { backgroundColor: 'transparent' }]}
                                checkedColor={theme.colors.primary}
                            />
                        </ListItem>
                    </Pressable>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 10,
    },
    searchInput: {
        marginVertical: 15,
    },
    inputContainer: {
        borderBottomWidth: 1,
        paddingHorizontal: 15,
        borderRadius: 20,
        elevation: 3,
    },
    saveButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -10,
        marginBottom: 15,
        padding: 10,
        borderRadius: 10,
    },
    saveButtonText: {
        marginLeft: 10,
        fontSize: 16,
    },
    listItem: {
        marginVertical: 5,
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 1,
    },
    listItemContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15,
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
    },
    checkboxContainer: {
        padding: 0,
        margin: 0,
    },
});
