import { Button,Text, View } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
    return (
        <View>
            <Text>ホーム画面</Text>
            <Button title="レッスンへ" onPress={() => router.push("/lesson")} />
        </View>
    );
}