import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function ErrorUtilsScreen() {
    return (
        <ThemedView style={styles.container}>
            <ThemedText type="subtitle">ErrorUtils PoC</ThemedText>
            <ThemedText style={styles.description}>
                Tap the button below to trigger an asynchronous error in 2 seconds. This error will be
                caught by the global handler.
            </ThemedText>
            <TouchableOpacity
                style={styles.errorButton}
                onPress={() => {
                    console.log('Error will be triggered in 2s...');
                    setTimeout(() => {
                        throw new Error('This is a simulated global asynchronous error!');
                    }, 2000);
                }}>
                <ThemedText style={styles.errorButtonText}>Trigger Global Error</ThemedText>
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
    errorButton: {
        backgroundColor: '#ff4444',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    errorButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
