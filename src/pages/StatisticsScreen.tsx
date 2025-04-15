import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";

type User = {
    userId: string;
    username: string;
    totalClasses: number;
    attendedClasses: number;
};

const mockUsers: User[] = [
    { userId: "1", username: "João Silva", totalClasses: 20, attendedClasses: 18 },
    { userId: "2", username: "Maria Oliveira", totalClasses: 20, attendedClasses: 15 },
    { userId: "3", username: "Pedro Souza", totalClasses: 20, attendedClasses: 17 },
    { userId: "4", username: "Ana Costa", totalClasses: 20, attendedClasses: 20 },
    { userId: "5", username: "Lucas Pereira", totalClasses: 20, attendedClasses: 12 },
    { userId: "6", username: "Carla Rocha", totalClasses: 20, attendedClasses: 19 },
    { userId: "7", username: "Rafael Santos", totalClasses: 20, attendedClasses: 10 },
    { userId: "8", username: "Juliana Almeida", totalClasses: 20, attendedClasses: 10 },
    { userId: "9", username: "Felipe Martins", totalClasses: 20, attendedClasses: 14 },
    { userId: "10", username: "Larissa Mendes", totalClasses: 20, attendedClasses: 13 },
];

export const StatisticsScreen = () => {
    const [users] = useState<User[]>(mockUsers);
    const { t } = useTranslation();
    const { theme } = useTheme();

    const totalPresence = users.reduce((acc, user) => acc + user.attendedClasses, 0);
    const averagePresence =
        users.length > 0 ? (totalPresence / (users.length * 20)) * 100 : 0;

    const totalMonthlyClasses = 20 * users.length;
    const monthlyPresence = (totalPresence / totalMonthlyClasses) * 100;

    const totalAnnualClasses = 240 * users.length;
    const annualPresence = (totalPresence / totalAnnualClasses) * 100;

    const sortedUsers = [...users].sort((a, b) => b.attendedClasses - a.attendedClasses);

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.title, { color: theme.colors.text }]}>{t("attendanceStats")}</Text>

            <View style={[styles.statsContainer, { backgroundColor: theme.colors.card }]}>
                <Text style={[styles.statText, { color: theme.colors.text }]}>
                    {t("averageAttendance")}:{" "}
                    <Text style={[styles.statHighlight, { color: theme.colors.primary }]}>
                        {averagePresence.toFixed(2)}%
                    </Text>
                </Text>
            </View>

            <View style={[styles.statsContainer, { backgroundColor: theme.colors.card }]}>
                <Text style={[styles.statText, { color: theme.colors.text }]}>
                    {t('monthlyAverage')}: <Text style={[styles.statHighlight, { color: theme.colors.primary }]}>{monthlyPresence.toFixed(2)}%</Text>
                </Text>
                <Text style={[styles.statText, { color: theme.colors.text }]}>
                    {t('annualAverage')}: <Text style={[styles.statHighlight, { color: theme.colors.primary }]}>{annualPresence.toFixed(2)}%</Text>
                </Text>
            </View>

            <Text style={[styles.subTitle, { color: theme.colors.text }]}>
                {t("attendancePerStudent")}
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20 }}>
                <LineChart
                    data={{
                        labels: sortedUsers.map((user) => user.username.split(" ")[0]),
                        datasets: [
                            {
                                data: sortedUsers.map((user) => user.attendedClasses),
                                strokeWidth: 2,
                            },
                        ],
                    }}
                    width={Math.max(Dimensions.get("window").width, sortedUsers.length * 70)}
                    height={220}
                    chartConfig={{
                        backgroundColor: theme.colors.card,
                        backgroundGradientFrom: theme.colors.primary,
                        backgroundGradientTo: theme.colors.primary,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        strokeWidth: 2,
                        barPercentage: 0.5,
                        propsForDots: {
                            r: "5",
                            strokeWidth: "2",
                            stroke: theme.colors.primary,
                        },
                    }}
                    style={styles.chart}
                />
            </ScrollView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    subTitle: {
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 10,
        textAlign: "center",
    },
    statsContainer: {
        padding: 20,
        borderRadius: 8,
        elevation: 5,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
    },
    statText: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 10,
    },
    statHighlight: {
        fontWeight: "bold",
    },
    chart: {
        marginVertical: 20,
        borderRadius: 12,
        elevation: 2,
    },
    userContainer: {
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
    },
    userName: {
        fontSize: 18,
    },
    userPresence: {
        fontSize: 16,
    },
});
