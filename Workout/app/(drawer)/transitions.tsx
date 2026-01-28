import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function TransitionsScreen() {
    const router = useRouter();

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="subtitle">Custom Transition PoC</ThemedText>
            <ThemedText style={styles.description}>
                Tap the button below to see a custom "slide from bottom" transition.
            </ThemedText>
            <TouchableOpacity
                style={styles.transitionButton}
                onPress={() => router.push('/details')}>
                <ThemedText style={styles.transitionButtonText}>Go to Details</ThemedText>
            </TouchableOpacity>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    description: {
        textAlign: 'center',
        marginBottom: 20,
    },
    transitionButton: {
        backgroundColor: '#34C759',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    transitionButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
