import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Linking, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function DeepLinkingScreen() {
    const params = useLocalSearchParams();
    const hasParams = Object.keys(params).length > 0;

    const simulateExternalLink = (query: string) => {
        const url = `workout://deep-linking?${query}`;
        Linking.openURL(url);
    };

    return (
        <ThemedView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <ThemedText type="subtitle">Deep Linking PoC</ThemedText>
                <ThemedText style={styles.description}>
                    This page demonstrates how to extract parameters from a URL scheme like
                    <ThemedText type="defaultSemiBold"> workout://deep-linking?param=value</ThemedText>.
                </ThemedText>

                <View style={styles.paramsCard}>
                    <ThemedText type="defaultSemiBold">Extracted Parameters:</ThemedText>
                    {hasParams ? (
                        Object.entries(params).map(([key, value]) => (
                            <View key={key} style={styles.paramRow}>
                                <ThemedText style={styles.paramKey}>{key}:</ThemedText>
                                <ThemedText style={styles.paramValue}>{value}</ThemedText>
                            </View>
                        ))
                    ) : (
                        <ThemedText style={styles.emptyText}>No parameters detected. Launch this page via a link!</ThemedText>
                    )}
                </View>

                <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>Test Link Simulation:</ThemedText>
                <View style={styles.buttonGrid}>
                    <TouchableOpacity
                        style={styles.testButton}
                        onPress={() => simulateExternalLink('name=Agent&id=123')}
                    >
                        <Ionicons name="link-outline" size={20} color="white" />
                        <ThemedText style={styles.buttonText}>Open with Name & ID</ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.testButton, { backgroundColor: '#AF52DE' }]}
                        onPress={() => simulateExternalLink('theme=dark&status=active')}
                    >
                        <Ionicons name="options-outline" size={20} color="white" />
                        <ThemedText style={styles.buttonText}>Open with Settings</ThemedText>
                    </TouchableOpacity>
                </View>

                <ThemedView style={styles.infoBox}>
                    <ThemedText type="defaultSemiBold">How to test manually:</ThemedText>
                    <ThemedText style={styles.code}>
                        npx uri-scheme open "workout://deep-linking?user=DeepMind&id=7" --ios
                    </ThemedText>
                </ThemedView>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
    },
    description: {
        marginBottom: 25,
        lineHeight: 20,
    },
    paramsCard: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        padding: 20,
        borderRadius: 15,
        marginBottom: 30,
    },
    paramRow: {
        flexDirection: 'row',
        marginTop: 10,
        gap: 10,
    },
    paramKey: {
        fontWeight: 'bold',
        color: '#007AFF',
    },
    paramValue: {
        opacity: 0.8,
    },
    emptyText: {
        marginTop: 10,
        fontStyle: 'italic',
        opacity: 0.5,
    },
    sectionTitle: {
        marginBottom: 15,
    },
    buttonGrid: {
        gap: 12,
        marginBottom: 30,
    },
    testButton: {
        flexDirection: 'row',
        backgroundColor: '#34C759',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    infoBox: {
        backgroundColor: '#000',
        padding: 15,
        borderRadius: 10,
    },
    code: {
        color: '#34C759',
        fontSize: 10,
        marginTop: 5,
        fontFamily: 'monospace',
    }
});
