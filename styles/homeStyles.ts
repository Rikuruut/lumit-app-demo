import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: "#FFFFFF" },
    scroll: { flex: 1 },
    scrollContent: { padding: 16 },

    // ヘッダー
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        paddingHorizontal: 16,
    },
    logoArea: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    lumiIcon: {
        width: 32,
        height: 32,
    },
    logo: { fontSize: 26, fontWeight: "bold", color: "#F5A623" },
    stats: { flexDirection: "row", gap: 14 },
    statItem: { flexDirection: "row", alignItems: "center", gap: 4 },
    statText: { fontSize: 14, fontWeight: "bold", color: "#666" },

    // セクション
    sectionWrapper: { position: "relative" },
    sectionContent: {
        paddingTop: 6,
        paddingBottom: 40,
    },

    // セクションヘッダー
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 14,
        paddingTop: 1,
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

    // レッスンブロック
    block: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginBottom: 12,
        marginLeft: 58,
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