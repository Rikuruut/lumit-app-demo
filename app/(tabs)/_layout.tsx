import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { View } from "react-native";
import { Stack } from "expo-router";

export default function TabsLayout() {

    // タブバーのUI調整
    const tabSettings = {
        tabBarActiveTintColor: "#F5A623",
        tabBarInactiveTintColor: "#B0B0B0",
        tabBarStyle: {
            backgroundColor: "#FFFFFF",
        },
        headerShown: false,
        tabBarShowLabel: false,
    };


    return (
        //タブバー
        <Tabs
            initialRouteName="home"
            screenOptions={tabSettings}>
            {/* ホームアイコン */}
            <Tabs.Screen name="home" options={{
                title: "ホーム",
                tabBarIcon: ({ color, size, focused }) => (
                    <View style={{ alignItems: "center" }}>
                        <View style={{
                            width: 40,
                            height: 3,
                            backgroundColor: focused ? "#F5A623" : "transparent",
                            borderRadius: 2,
                        }} />
                        <Ionicons name={focused ? "home" : "home-outline"} size={28} color={color} />
                    </View>
                ),
            }} />
            {/* 実績アイコン */}
            <Tabs.Screen name="jisseki" options={{
                title: "実績",
                tabBarIcon: ({ color, size, focused }) => (
                    <View style={{ alignItems: "center"}}>
                        <View style={{
                            width: 40,
                            height: 3,
                            backgroundColor: focused ? "#F5A623" : "transparent",
                            borderRadius: 2,
                        }} />
                        <Ionicons
                            name={focused ? "trophy" : "trophy-outline"}
                            size={28}
                            color={color}
                        />
                    </View>
                ),
            }} />
            {/* 図鑑アイコン */}
            <Tabs.Screen name="zukan" options={{
                title: "図鑑",
                tabBarIcon: ({ color,focused }) => (
                    <View style={{ alignItems: "center"}}>
                        <View style={{
                            width: 40,
                            height: 3,
                            backgroundColor: focused ? "#F5A623" : "transparent",
                            borderRadius: 2,
                        }} />
                        <Ionicons
                            name={focused ? "book" : "book-outline"}
                            size={28}
                            color={color}
                        />
                    </View>
                ),
            }} />
            {/* マイページ */}
            <Tabs.Screen name="mypage" options={{
                title: "マイページ",
                tabBarIcon: ({ color,focused }) => (
                    <View style={{ alignItems: "center"}}>
                        <View style={{
                            width: 40,
                            height: 3,
                            backgroundColor: focused ? "#F5A623" : "transparent",
                            borderRadius: 2,
                        }} />
                        <Ionicons
                            name={focused ? "person" : "person-outline"}
                            size={28}
                            color={color}
                        />
                    </View>
                ),
            }} />
        </Tabs>
    );
}