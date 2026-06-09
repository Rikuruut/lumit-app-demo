import { useEffect } from "react";
import {Text, View, Image, StyleSheet} from "react-native";
import { router } from "expo-router";

const lumiImage = require("../assets/lumi.png");

export default function SplashScreen() {
    // 画面遷移のためのタイマーを設定
    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace("/tutorial"); // 5秒後にホーム画面へ遷移
        }, 5000); // 5000ミリ秒 = 5秒
        // タイマーリセット
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Image source={lumiImage} style={styles.character} />
            <Text style={styles.title}>Lumit</Text>
        </View>
);
}


/*----------------------------
    装飾用のスタイル
----------------------------*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF7D6",
        alignItems: "center",
        justifyContent: "center",
    },
    character: {
        width: 180,
        height: 180,
        resizeMode: "contain",
        marginBottom: 24,
    },
    title: {
        fontSize: 48,
        fontWeight: "bold",
        color: "#F5A623",
    },
});