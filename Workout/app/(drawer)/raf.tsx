import { RafDemo } from '@/components/raf-demo';
import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function RafScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ThemedText type="subtitle">requestAnimationFrame PoC</ThemedText>
            <ThemedText style={styles.description}>
                This demo uses the low-level <ThemedText type="defaultSemiBold">requestAnimationFrame</ThemedText> API to
                drive a manual animation loop synchronized with the device's refresh rate.
            </ThemedText>

            <RafDemo />

            <ThemedText style={styles.note}>
                Note: The 'Animated' library uses this internally. For custom high-performance
                animations or game loops, RAF is the foundational tool.
            </ThemedText>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    description: {
        textAlign: 'center',
        marginBottom: 20,
    },
    note: {
        marginTop: 40,
        fontSize: 12,
        opacity: 0.6,
        textAlign: 'center',
    }
});
