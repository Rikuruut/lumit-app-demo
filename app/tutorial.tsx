import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useState } from 'react';

// スライドデータ
const tutorialSlides = [
    {
        title: "先入観を取り除く",
        content: "やあ！ぼくLumi。一緒にプログラミングを学んでいこう！\n\n「プログラミングって難しそう…」「英語ばかりで意味わからん」\n\n…わかる。でもそのイメージ、ちょっと待って。",
    },
    {
        title: "日常の例で説明",
        content: "プログラミングって一言で言うと「コンピュータへの指示書」。\n\n例えばカップ麺を作るとき…\n① お湯を沸かす\n② お湯を注ぐ\n③ 3分待つ\n\nこれ、順番を間違えたら食べられないよね。",
    },
    {
        title: "コンピュータは上から読む",
        content: "コンピュータも同じで、命令を上から1つずつ実行していく。\n\n① 「こんにちは」と表示する\n② 「今日もいい天気」と表示する\n③ 「またね！」と表示する\n\n必ずこの順番通り。③から始めたり②を飛ばしたりは絶対しない。",
    },
    {
        title: "Lumitで学ぶこと",
        content: "Lumitでは「どう考えるか」という思考の部分を鍛えていく。\n\n特定の言語より、考え方が大事。どの言語を学べばいいか悩まなくていい。\n\nじゃあさっそくやってみよう！",
    },
];

export default function TutorialScreen() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slide = tutorialSlides[currentSlide];
    const total = tutorialSlides.length;
    const isLast = currentSlide === total - 1;

    const handleNext = () => {
        if (isLast) {
            router.replace("/home");
        } else {
            setCurrentSlide(currentSlide + 1);
        }
    };

    return (
        <SafeAreaView style={styles.safe}>

            {/* 進捗ドット */}
            <View style={styles.dots}>
                {tutorialSlides.map((_, i) => (
                    <View
                        key={i}
                        style={[styles.dot, i === currentSlide && styles.dotActive]}
                    />
                ))}
            </View>

            {/* スライド内容 */}
            <View style={styles.slideArea}>
                <Text style={styles.title}>{slide.title}</Text>
                <Text style={styles.content}>{slide.content}</Text>
            </View>

            {/* ボタンエリア */}
            <View style={styles.buttonArea}>
                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                    <Text style={styles.nextText}>
                        {isLast ? "はじめる →" : "つぎへ →"}
                    </Text>
                </TouchableOpacity>

                {/* スキップボタン（最後のスライド以外に表示） */}
                {!isLast && (
                    <TouchableOpacity onPress={() => router.replace("/home")}>
                        <Text style={styles.skipText}>スキップ</Text>
                    </TouchableOpacity>
                )}
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: "#FFF8EC" },

    // 進捗ドット
    dots: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 8,
        paddingTop: 24,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#E0E0E0",
    },
    dotActive: {
        backgroundColor: "#F5A623",
        width: 24,
    },

    // スライド
    slideArea: {
        flex: 1,
        padding: 32,
        justifyContent: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#F5A623",
        marginBottom: 24,
    },
    content: {
        fontSize: 16,
        color: "#444",
        lineHeight: 26,
    },

    // ボタン
    buttonArea: {
        padding: 24,
        gap: 12,
        alignItems: "center",
    },
    nextButton: {
        width: "100%",
        backgroundColor: "#F5A623",
        borderRadius: 14,
        padding: 16,
        alignItems: "center",
        borderBottomWidth: 4,
        borderBottomColor: "#D98512",
    },
    nextText: { fontSize: 18, fontWeight: "bold", color: "#FFFFFF" },
    skipText: { fontSize: 14, color: "#AAAAAA" },
});