import { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { router } from 'expo-router';

// === セクション1のレッスンデータ ===
const section1Lessons = [
    { id: "1-1", title: "上から下へ", status: "completed" },
    { id: "1-2", title: "順番が違ったら…", status: "current" },
    { id: "1-3", title: "フローチャートを読んでみよう", status: "locked" },
];

// === 状態ごとの色 ===
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

// === C型クランプのパスを W×H から計算する ===
// バー高さや角丸は固定px。WとHだけ可変にして歪みを防ぐ。
function buildClampPath(W: number, H: number) {
    const SPINE = 50;          // 左の垂直バー幅
    const TOP_H = 40;          // 上部バー高さ
    const BOT_H = 40;          // 下部バー高さ
    const R = 14;              // 外側の角丸
    const NR = 5;              // ノッチ/タブの角丸
    const BODY_BOTTOM = H - 10;          // タブを除いた本体下端
    const BOT_TOP = BODY_BOTTOM - BOT_H; // 下部バー上端
    const N_L = 18, N_W = 22, N_D = 10;  // ノッチ/タブ（左端・幅・深さ）
    const N_R = N_L + N_W;

    return [
        `M ${R},0`,
        `L ${N_L},0`,
        `Q ${N_L},${N_D} ${N_L + NR},${N_D}`,        // ▼メスノッチ
        `L ${N_R - NR},${N_D}`,
        `Q ${N_R},${N_D} ${N_R},0`,
        `L ${W - R},0`,
        `A ${R},${R} 0 0 1 ${W},${R}`,               // 右上
        `L ${W},${TOP_H - R}`,
        `A ${R},${R} 0 0 1 ${W - R},${TOP_H}`,       // 上部バー右下
        `L ${SPINE + R},${TOP_H}`,
        `A ${R},${R} 0 0 0 ${SPINE},${TOP_H + R}`,   // 凹コーナー
        `L ${SPINE},${BOT_TOP - R}`,
        `A ${R},${R} 0 0 0 ${SPINE + R},${BOT_TOP}`, // 凹コーナー
        `L ${W - R},${BOT_TOP}`,
        `A ${R},${R} 0 0 1 ${W},${BOT_TOP + R}`,     // 下部バー右上
        `L ${W},${BODY_BOTTOM - R}`,
        `A ${R},${R} 0 0 1 ${W - R},${BODY_BOTTOM}`, // 右下
        `L ${N_R},${BODY_BOTTOM}`,
        `Q ${N_R},${H} ${N_R - NR},${H}`,            // ▲オスタブ
        `L ${N_L + NR},${H}`,
        `Q ${N_L},${H} ${N_L},${BODY_BOTTOM}`,
        `L ${R},${BODY_BOTTOM}`,
        `A ${R},${R} 0 0 1 0,${BODY_BOTTOM - R}`,    // 左下
        `L 0,${R}`,
        `A ${R},${R} 0 0 1 ${R},0`,                  // 左上
        `Z`,
    ].join(" ");
}

export default function HomeScreen() {
    // セクションの実寸を保持する（onLayoutで測る）
    const [size, setSize] = useState({ w: 0, h: 0 });

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

                {/* === セクション（C型クランプSVG＋中身を重ねる）=== */}
                <View
                    style={styles.sectionWrapper}
                    onLayout={(e) => {
                        const { width, height } = e.nativeEvent.layout;
                        setSize({ w: width, h: height });
                    }}
                >
                    {/* 背景のクランプ（測定後に描画） */}
                    {size.w > 0 && (
                        <Svg
                            style={StyleSheet.absoluteFill}
                            width={size.w}
                            height={size.h}
                            viewBox={`0 0 ${size.w} ${size.h}`}
                        >
                            <Defs>
                                <LinearGradient id="clampGrad" x1="0" y1="0" x2="0" y2="1">
                                    <Stop offset="0" stopColor="#FFB84D" />
                                    <Stop offset="1" stopColor="#F5A623" />
                                </LinearGradient>
                                <LinearGradient id="gloss" x1="0" y1="0" x2="0" y2="1">
                                    <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.20" />
                                    <Stop offset="0.6" stopColor="#FFFFFF" stopOpacity="0" />
                                </LinearGradient>
                            </Defs>
                            <Path d={buildClampPath(size.w, size.h)} fill="url(#clampGrad)" />
                            <Path d={buildClampPath(size.w, size.h)} fill="url(#gloss)" />
                        </Svg>
                    )}

                    {/* 中身（クランプの上に重なる） */}
                    <View style={styles.sectionContent}>

                        {/* セクションヘッダー（上部バーに乗る） */}
                        <View style={styles.sectionHeader}>
                            <View style={styles.sectionBadge}>
                                <Ionicons name="code-slash" size={18} color="#FFFFFF" />
                            </View>
                            <Text style={styles.sectionTitle}>セクション1：順次処理</Text>
                        </View>

                        {/* レッスンブロック（クランプの口の中に入る） */}
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
                                    <View style={styles.idBadge}>
                                        <Text style={styles.idText}>{lesson.id}</Text>
                                    </View>
                                    <Text style={styles.blockTitle}>{lesson.title}</Text>
                                    <View style={styles.statusCircle}>
                                        <Ionicons name={statusIcons[lesson.status]} size={16} color={colors.face} />
                                    </View>
                                </TouchableOpacity>
                            );
                        })}

                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

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

    // セクション（クランプの土台。背景色はSVGが担うので無し）
    sectionWrapper: { position: "relative" },
    sectionContent: {
        paddingTop: 6,
        paddingBottom: 40,   // ← 下部バー分。ブロックがバーに重ならないよう調整
    },

    // セクションヘッダー（上部バーに乗る）
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 14,     // ← </>バッジを左端寄りに
        paddingVertical: 6,
        marginBottom: 8,
    },
    sectionBadge: {
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        borderRadius: 8,
        padding: 6,
        marginRight: 10,
    },
    sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#FFFFFF" },

    // レッスンブロック（口の中に収める）
    block: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginBottom: 12,
        marginLeft: 58,      // ← 左の垂直バーを避ける
        marginRight: 14,
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
