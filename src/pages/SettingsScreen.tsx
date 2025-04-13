import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Switch, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../assets/themes/ThemeContext';

export const SettingsScreen: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [username, setUsername] = useState("João Silva");

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.headerContainer}>
                <Text style={[styles.headerText, { color: theme.colors.text }]}>Configurações</Text>
            </View>

            <View style={styles.settingItem}>
                <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Nome do Usuário</Text>
                <TextInput
                    style={[styles.input, { backgroundColor: theme.colors.inputBackground, color: theme.colors.inputText }]}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Digite seu nome"
                    placeholderTextColor={theme.colors.text}
                />
            </View>

            <View style={styles.settingItem}>
                <View style={styles.row}>
                    <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Modo Escuro</Text>
                    <Switch
                        value={theme.dark}
                        onValueChange={toggleTheme}
                        trackColor={{ false: '#767577', true: theme.colors.secondary || '#bb86fc' }}
                        thumbColor={theme.dark ? theme.colors.primary || '#6200ee' : '#f4f3f4'}
                    />
                </View>
            </View>

            <TouchableOpacity style={[styles.footerButton, { backgroundColor: "#ff4d4d" }]}>
                <Ionicons name="log-out-outline" size={24} color={"#fff"} />
                <Text style={[styles.footerButtonText, {color: "#fff"}]}>Sair</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    headerContainer: {
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 32,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    settingItem: {
        marginVertical: 12,
        paddingHorizontal: 10,
    },
    settingLabel: {
        fontSize: 18,
        fontWeight: '600',
    },
    input: {
        height: 45,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 15,
        marginTop: 5,
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        padding: 10,
        borderRadius: 10,
    },
    footerButtonText: {
        marginLeft: 10,
        fontSize: 16,
    },
});
