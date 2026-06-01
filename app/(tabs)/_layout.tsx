import {Tabs} from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { View } from "react-native";
import { Stack } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';



export default function  TabsLayout() {

// タブバーのUI調整
const tabSettings = {
    tabBarActiveTintColor: "#F5A623",
    tabBarInactiveTintColor: "#B0B0B0",
    tabBarStyle: { backgroundColor: "#FFFFFF",
    },
    headerShown: false,
};


    return (
        <Tabs
         initialRouteName="home"
         screenOptions={tabSettings}>
            <Tabs.Screen name="home" options={{ title: "ホーム",
                tabBarIcon: ({ color, size, focused }) => (
                    <View style={{
                        backgroundColor: focused ? "#FFF0C8" : "transparent",
                        borderRadius: 12,
                        padding: 1,
                        overflow: "visible",
                    }}>
                    <Ionicons name="home-outline" size={24} color="black" />                    </View>
                ),
             }} />

            <Tabs.Screen name="jisseki" options={{ title: "実績",
                tabBarIcon: ({ color, size }) => (
                    <AntDesign name="trophy" size={24} color="black" />                ),
             }} />

            <Tabs.Screen name="zukan" options={{ title: "図鑑",
                tabBarIcon: ({ color, size }) => (
                    <Feather name="book-open" size={24} color="black" />                ),
             }} />
            <Tabs.Screen name="mypage" options={{ title: "マイページ",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="person-outline" size={24} color="black" />                ),
             }} />
        </Tabs>
    );
}