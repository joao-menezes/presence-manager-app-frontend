import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

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
    { userId: "8", username: "Juliana Almeida", totalClasses: 20, attendedClasses: 16 },
    { userId: "9", username: "Felipe Martins", totalClasses: 20, attendedClasses: 14 },
    { userId: "10", username: "Larissa Mendes", totalClasses: 20, attendedClasses: 13 }
];

export const StatisticsScreen = () => {
    const [users, setUsers] = useState<User[]>(mockUsers);

    const totalPresence = users.reduce((acc, user) => acc + user.attendedClasses, 0);
    const averagePresence = users.length > 0
        ? (totalPresence / (users.length * 20)) * 100
        : 0;

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Estatísticas de Presença</Text>

            <View style={styles.statsContainer}>
                <Text style={styles.statText}>
                    Média de Presença: <Text style={styles.statHighlight}>{averagePresence.toFixed(2)}%</Text>
                </Text>
            </View>

            <Text style={styles.subTitle}>Presença por Aluno</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <BarChart
                    data={{
                        labels: users.map(user => user.username.split(" ")[0]),
                        datasets: [{ data: users.map(user => user.attendedClasses) }]
                    }}
                    width={Math.max(Dimensions.get("window").width, users.length * 60)}
                    height={260}
                    chartConfig={{
                        backgroundColor: "#1E2923",
                        backgroundGradientFrom: "#2C5364",
                        backgroundGradientTo: "#203A43",
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: () => "#fff",
                        barPercentage: 0.6,
                        propsForDots: { r: "6", strokeWidth: "2", stroke: "#ffa726" }
                    }}
                    verticalLabelRotation={30}
                    yAxisLabel=""
                    yAxisSuffix=" aulas"
                    style={styles.chart}
                />
            </ScrollView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F8FA",
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        color: "#333",
        marginBottom: 20,
    },
    subTitle: {
        fontSize: 22,
        fontWeight: "600",
        color: "#444",
        marginBottom: 10,
        textAlign: "center",
    },
    statsContainer: {
        backgroundColor: "#FFFFFF",
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
        color: "#555",
        textAlign: "center",
        marginBottom: 10,
    },
    statHighlight: {
        fontWeight: "bold",
        color: "#4CAF50",
    },
    chart: {
        marginVertical: 20,
        borderRadius: 12,
        elevation: 2,
    }
});
