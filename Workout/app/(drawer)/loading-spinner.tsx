import { LoadingSpinner } from '@/components/loading-spinner';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function LoadingSpinnerScreen() {
    const [isSpinning, setIsSpinning] = useState(false);

    const showSpinner = () => {
        setIsSpinning(true);
        setTimeout(() => {
            setIsSpinning(false);
        }, 3000);
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="subtitle">Custom Loading Spinner PoC</ThemedText>
            <ThemedText style={styles.description}>
                Tap the button below to see the custom loading spinner overlay.
            </ThemedText>
            <TouchableOpacity style={styles.spinnerButton} onPress={showSpinner}>
                <ThemedText style={styles.spinnerButtonText}>Show Loading Spinner</ThemedText>
            </TouchableOpacity>
            <LoadingSpinner visible={isSpinning} message="Processing Request..." />
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
    spinnerButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    spinnerButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
