import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    Pressable,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import ThemeToggleButton from '../Components/ThemeToggleButton';
import {useTheme} from "../context/ThemeContext";

export const SettingsScreen: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [username, setUsername] = useState('João Silva');

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={[styles.headerText, { color: theme.colors.text }]}>Configurações</Text>
                <ThemeToggleButton toggleTheme={toggleTheme} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.subtitleText }]}>Perfil</Text>

                    <View style={styles.settingItem}>
                        <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Nome do Usuário</Text>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    backgroundColor: theme.colors.inputBackground,
                                    color: theme.colors.inputText,
                                },
                            ]}
                            value={username}
                            onChangeText={setUsername}
                            placeholder="Digite seu nome"
                            placeholderTextColor={theme.colors.placeholder}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.subtitleText }]}>Preferências</Text>

                    <TouchableOpacity style={[styles.settingItem, styles.settingRow]}>
                        <Feather name="bell" size={20} color={theme.colors.text} />
                        <Text style={[styles.settingLabel, { marginLeft: 10, color: theme.colors.text }]}>
                            Notificações
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.settingItem, styles.settingRow]}>
                        <Feather name="globe" size={20} color={theme.colors.text} />
                        <Text style={[styles.settingLabel, { marginLeft: 10, color: theme.colors.text }]}>
                            Idioma
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.subtitleText }]}>Segurança</Text>

                    <TouchableOpacity style={[styles.settingItem, styles.settingRow]}>
                        <Feather name="lock" size={20} color={theme.colors.text} />
                        <Text style={[styles.settingLabel, { marginLeft: 10, color: theme.colors.text }]}>
                            Alterar Senha
                        </Text>
                    </TouchableOpacity>
                </View>
                <Pressable
                    style={[styles.footerButton, { backgroundColor: theme.colors.primary }]}
                >
                    <Ionicons name="checkmark-done-outline" size={24} color="#fff" />
                    <Text style={styles.footerButtonText}>Salvar Alterações</Text>
                </Pressable>

            </ScrollView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    settingItem: {
        marginBottom: 15,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    settingLabel: {
        fontSize: 16,
    },
    input: {
        height: 45,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        marginTop: 6,
    },
    footerButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        borderRadius: 10,
        marginTop: 20,
    },
    footerButtonText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
});

