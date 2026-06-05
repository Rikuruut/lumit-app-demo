import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';




// 問題データ
const lessonQuestions = [
  {
    id: 1,
    type: "choice",
    question: "朝起きてから学校に行くまでの順番として正しいのはどれ？",
    choices: [
      "服を着る → 起きる → ごはんを食べる",
      "起きる → 服を着る → ごはんを食べる",
      "ごはんを食べる → 起きる → 服を着る",
      "服を着る → ごはんを食べる → 起きる",
    ],
    answer: "起きる → 服を着る → ごはんを食べる",
  },
  {
    id: 2,
    type: "choice",
    question: "カップ麺を作る順番として正しいのはどれ？",
    choices: [
      "お湯を沸かす → フタを開ける → お湯を注ぐ",
      "フタを開ける → お湯を注ぐ → お湯を沸かす",
      "お湯を注ぐ → お湯を沸かす → フタを開ける",
      "フタを開ける → お湯を沸かす → お湯を注ぐ",
    ],
    answer: "お湯を沸かす → フタを開ける → お湯を注ぐ",
  },
];

export default function LessonScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const question = lessonQuestions[currentIndex];
  const total = lessonQuestions.length;

  return (
    <SafeAreaView style={styles.safe}>

      {/* 進捗バー */}
      <View style={styles.progressBar}>
        <Text style={styles.progressText}>
          [{currentIndex + 1}/{total}]
        </Text>
      </View>

      {/* 問題文 */}
      <View style={styles.questionBox}>
        <Text style={styles.questionText}>{question.question}</Text>
      </View>

      {/* 回答エリア */}
      <View style={styles.choicesArea}>
        {question.choices.map((choice) => (
          <TouchableOpacity
            key={choice}
            onPress={() => setSelected(choice)}
            style={[
              styles.choiceButton,
              selected === choice && styles.choiceSelected,
            ]}
          >
            <Text style={styles.choiceText}>{choice}</Text>
          </TouchableOpacity>
        ))}
      </View>


      {/* 送信ボタン */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          if (selected !== null) setIsAnswered(true);
        }}
      >
        <Text style={styles.submitText}>こたえる</Text>
      </TouchableOpacity>
      {/* フィードバック（回答後に表示） */}
      {isAnswered && (
        <View style={[
          styles.feedback,
          selected === question.answer ? styles.feedbackCorrect : styles.feedbackWrong
        ]}>
          <Text style={styles.feedbackText}>
            {selected === question.answer ? "🎉 せいかい！" : "😢 ちがうよ…"}
          </Text>
          <Text style={styles.feedbackComment}>
            {selected === question.answer
              ? "順番通りに実行するのがプログラムの基本だよ！"
              : `正解は「${question.answer}」だよ！`}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFF8EC" },
  progressBar: { padding: 16, alignItems: "center" },
  progressText: { fontSize: 16, fontFamily: "monospace", color: "#888" },
  questionBox: { flex: 1, justifyContent: "center", padding: 24 },
  questionText: { fontSize: 20, fontWeight: "bold", color: "#333", textAlign: "center" },
  submitButton: {
    margin: 16,
    backgroundColor: "#F5A623",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    borderBottomWidth: 4,
    borderBottomColor: "#D98512",
  },

  choicesArea: { paddingHorizontal: 16, gap: 12 },
  choiceButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderBottomWidth: 4,
    borderBottomColor: "#E0E0E0",
  },
  choiceSelected: {
    borderColor: "#F5A623",
    borderBottomColor: "#D98512",
    backgroundColor: "#FFF8EC",
  },
  choiceText: { fontSize: 16, color: "#333" },

  feedback: {
    margin: 16,
    padding: 16,
    borderRadius: 14,
  },
  feedbackCorrect: { backgroundColor: "#E8F5E9" },
  feedbackWrong: { backgroundColor: "#FFEBEE" },
  feedbackText: { fontSize: 18, fontWeight: "bold", marginBottom: 6 },
  feedbackComment: { fontSize: 14, color: "#555" },


  submitText: { fontSize: 18, fontWeight: "bold", color: "#FFFFFF" },
});