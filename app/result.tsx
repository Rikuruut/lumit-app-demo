import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

export default function ResultScreen() {
    const { correct, total } = useLocalSearchParams();
    const correctNum = Number(correct);
    const totalNum = Number(total);
    const xp = correctNum * 10;
    const coins = correctNum * 5;

    return (
        <SafeAreaView style={styles.safe}>

            {/* タイトル */}
            <View style={styles.titleArea}>
                <Text style={styles.title}>レッスン完了！🎉</Text>
            </View>

            {/* スコアカード */}
            <View style={styles.scoreCard}>
                <Text style={styles.scoreItem}>正解数　{correctNum} / {totalNum}</Text>
                <Text style={styles.scoreItem}>⭐ XP　+{xp}</Text>
                <Text style={styles.scoreItem}>🪙 コイン　+{coins}</Text>
            </View>

            {/* ボタンエリア */}
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    style={styles.buttonPrimary}
                    onPress={() => router.replace("/lesson")}
                >
                    <Text style={styles.buttonText}>もう一度挑戦</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonPrimary}
                    onPress={() => router.replace("/(tabs)/home")}
                >
                    <Text style={styles.buttonText}>次のレッスンへ</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonSecondary}
                    onPress={() => router.replace("/(tabs)/home")}
                >
                    <Text style={styles.buttonSecondaryText}>ホームに戻る</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: "#FFF8EC" },
    titleArea: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#F5A623",
    },
    scoreCard: {
        margin: 24,
        padding: 24,
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        gap: 12,
        borderBottomWidth: 4,
        borderBottomColor: "#E0E0E0",
    },
    scoreItem: {
        fontSize: 18,
        color: "#333",
        fontWeight: "bold",
    },
    buttonArea: {
        padding: 24,
        gap: 12,
    },
    buttonPrimary: {
        backgroundColor: "#F5A623",
        borderRadius: 14,
        padding: 16,
        alignItems: "center",
        borderBottomWidth: 4,
        borderBottomColor: "#D98512",
    },
    buttonSecondary: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        padding: 16,
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#E0E0E0",
    },
    buttonText: { fontSize: 16, fontWeight: "bold", color: "#FFFFFF" },
    buttonSecondaryText: { fontSize: 16, fontWeight: "bold", color: "#888" },
});