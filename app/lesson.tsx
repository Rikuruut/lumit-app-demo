import { Pressable,Text, View } from 'react-native';
import { useState } from 'react';

export default function LessonScreen() {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const question = {
        text: "次のうち一番大きい数は？",
        choices: [1, 5, 3, 4],
        answer: 5,
    };
    
    return (
        <View>
            <Text>{question.text}</Text>

            {question.choices.map((choice) => (
                <Pressable key={choice} onPress={() => console.log(choice)}>
                    <Text>{choice}</Text>
                </Pressable>
            ))}
        </View>
    );
}