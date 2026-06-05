import { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { router } from 'expo-router';
import { styles } from '../../styles/homeStyles';  // ← スタイルを別ファイルから読み込む

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
function buildClampPath(W: number, H: number) {
    const SPINE = 50;
    const TOP_H = 40;
    const BOT_H = 40;
    const R = 14;
    const NR = 5;
    const BODY_BOTTOM = H - 10;
    const BOT_TOP = BODY_BOTTOM - BOT_H;
    const N_L = 18, N_W = 22, N_D = 10;
    const N_R = N_L + N_W;

    return [
        `M ${R},0`,
        `L ${N_L},0`,
        `Q ${N_L},${N_D} ${N_L + NR},${N_D}`,
        `L ${N_R - NR},${N_D}`,
        `Q ${N_R},${N_D} ${N_R},0`,
        `L ${W - R},0`,
        `A ${R},${R} 0 0 1 ${W},${R}`,
        `L ${W},${TOP_H - R}`,
        `A ${R},${R} 0 0 1 ${W - R},${TOP_H}`,
        `L ${SPINE + R},${TOP_H}`,
        `A ${R},${R} 0 0 0 ${SPINE},${TOP_H + R}`,
        `L ${SPINE},${BOT_TOP - R}`,
        `A ${R},${R} 0 0 0 ${SPINE + R},${BOT_TOP}`,
        `L ${W - R},${BOT_TOP}`,
        `A ${R},${R} 0 0 1 ${W},${BOT_TOP + R}`,
        `L ${W},${BODY_BOTTOM - R}`,
        `A ${R},${R} 0 0 1 ${W - R},${BODY_BOTTOM}`,
        `L ${N_R},${BODY_BOTTOM}`,
        `Q ${N_R},${H} ${N_R - NR},${H}`,
        `L ${N_L + NR},${H}`,
        `Q ${N_L},${H} ${N_L},${BODY_BOTTOM}`,
        `L ${R},${BODY_BOTTOM}`,
        `A ${R},${R} 0 0 1 0,${BODY_BOTTOM - R}`,
        `L 0,${R}`,
        `A ${R},${R} 0 0 1 ${R},0`,
        `Z`,
    ].join(" ");
}

export default function HomeScreen() {
    const [size, setSize] = useState({ w: 0, h: 0 });

    return (
        <SafeAreaView style={styles.safe}>

            {/* === ヘッダー === */}
            <View style={styles.header}>
                <View style={styles.logoArea}>
                    <Image
                        source={require("../../assets/lumi.png")}
                        style={styles.lumiIcon}
                    />
                    <Text style={styles.logo}>Lumit</Text>
                </View>
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

            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>

                {/* === セクション（C型クランプSVG＋中身を重ねる）=== */}
                <View
                    style={styles.sectionWrapper}
                    onLayout={(e) => {
                        const { width, height } = e.nativeEvent.layout;
                        setSize({ w: width, h: height });
                    }}
                >
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
                            <Path d={buildClampPath(size.w, size.h)} fill="url(#clampGrad)" stroke={"#D98512"} strokeWidth={3} />
                            <Path d={buildClampPath(size.w, size.h)} fill="url(#gloss)" />
                        </Svg>
                    )}

                    {/* 中身 */}
                    <View style={styles.sectionContent}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.sectionBadge}>
                                <Ionicons name="code-slash" size={18} color="#FFFFFF" />
                            </View>
                            <Text style={styles.sectionTitle}>セクション1：順次処理</Text>
                        </View>

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