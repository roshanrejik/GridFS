import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function DetailsScreen() {
    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: 'Details', headerShown: true }} />
            <ThemedText type="title">Details Screen</ThemedText>
            <ThemedText style={styles.text}>
                This screen was navigated into using a custom transition animation configured in the root layout.
            </ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    text: {
        marginTop: 10,
        textAlign: 'center',
    },
});
