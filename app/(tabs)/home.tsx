import { Button,Text, View } from 'react-native';
import { router, Tabs } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    return (
        <SafeAreaView style={{ flex: 1,backgroundColor: "blue"}}>
            <Text>ホーム画面</Text>
        </SafeAreaView>
    );
}