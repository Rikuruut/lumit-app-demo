import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// === セクション1のレッスンデータ ===
const section1Lessons = [
    { id: "1-1", title: "上から下へ", status: "completed" },
    { id: "1-2", title: "順番が違ったら…", status: "current" },
    { id: "1-3", title: "フローチャートを読んでみよう", status: "locked" },
];

// === 状態ごとの色（face: ブロックの面 / edge: 下の影）===
const statusColors: Record<string, { face: string; edge: string }> = {
    completed: { face: "#8BC34A", edge: "#689F38" },
    current: { face: "#F5A623", edge: "#D98512" },
    locked: { face: "#BDBDBD", edge: "#9E9E9E" },
};

// === 状態ごとのアイコン ===
const statusIcons: Record<string, "checkmark" | "play" | "lock-closed"> = {
    completed: "checkmark",
    current: "play",
    locked: "lock-closed",
};

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>

                {/* === ヘッダー === */}
                <View style={styles.header}>
                    <Text style={styles.logo}>Lumit</Text>
                    <View style={styles.stats}>
                        <View style={styles.statItem}>
                            <Ionicons name="flame" size={18} color="#FF6B35" />
                            <Text style={styles.statText}>3</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Ionicons name="star" size={18} color="#F5A623" />
                            <Text style={styles.statText}>120</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Ionicons name="ellipse" size={18} color="#FFC107" />
                            <Text style={styles.statText}>50</Text>
                        </View>
                    </View>
                </View>

                {/* === セクションカード（C字ブラケット）=== */}
                <View style={styles.sectionCard}>

                    {/* セクションヘッダー */}
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionBadge}>
                            <Ionicons name="code-slash" size={18} color="#FFFFFF" />
                        </View>
                        <Text style={styles.sectionTitle}>セクション1：順次処理</Text>
                    </View>

                    {/* レッスンブロック（配列をmapで展開） */}
                    {section1Lessons.map((lesson) => {
                        const colors = statusColors[lesson.status];
                        return (
                            <TouchableOpacity
                                key={lesson.id}
                                activeOpacity={0.8}
                                onPress={() => router.push("/lesson")}
                                style={[
                                    styles.block,
                                    { backgroundColor: colors.face, borderBottomColor: colors.edge },
                                ]}
                            >
                                {/* IDバッジ */}
                                <View style={styles.idBadge}>
                                    <Text style={styles.idText}>{lesson.id}</Text>
                                </View>

                                {/* レッスン名 */}
                                <Text style={styles.blockTitle}>{lesson.title}</Text>

                                {/* ステータスアイコン（丸） */}
                                <View style={styles.statusCircle}>
                                    <Ionicons
                                        name={statusIcons[lesson.status]}
                                        size={16}
                                        color={colors.face}
                                    />
                                </View>
                            </TouchableOpacity>
                        );
                    })}

                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

/*----------------------------
    装飾用のスタイル
----------------------------*/
const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: "#FFFFFF" },
    scroll: { flex: 1 },
    scrollContent: { padding: 16 },

    // ヘッダー
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    logo: { fontSize: 26, fontWeight: "bold", color: "#F5A623" },
    stats: { flexDirection: "row", gap: 14 },
    statItem: { flexDirection: "row", alignItems: "center", gap: 4 },
    statText: { fontSize: 14, fontWeight: "bold", color: "#666" },

    // セクションカード
    sectionCard: {
        backgroundColor: "#F5A623",
        borderRadius: 20,
        padding: 12,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 6,
        paddingHorizontal: 4,
        marginBottom: 10,
    },
    sectionBadge: {
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        borderRadius: 8,
        padding: 6,
        marginRight: 10,
    },
    sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#FFFFFF" },

    // レッスンブロック
    block: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginBottom: 12,
        marginHorizontal: 6,
        borderBottomWidth: 4,
    },
    idBadge: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginRight: 12,
    },
    idText: { fontSize: 14, fontWeight: "bold", color: "#555" },
    blockTitle: { flex: 1, fontSize: 16, fontWeight: "bold", color: "#FFFFFF" },
    statusCircle: {
        backgroundColor: "#FFFFFF",
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 8,
    },
});