import { AccessibilityDemo } from '@/components/accessibility-demo';
import { ThemedText } from '@/components/themed-text';
import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function AccessibilityScreen() {
    const [isSubscribed, setIsSubscribed] = useState(false);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ThemedText type="subtitle">Accessibility PoC</ThemedText>
            <ThemedText style={styles.description}>
                Testing how screen readers interact with components using specific roles and states.
            </ThemedText>

            <AccessibilityDemo
                checked={isSubscribed}
                onToggle={() => setIsSubscribed(!isSubscribed)}
            />

            <ThemedText style={styles.hint}>Tappable checkbox</ThemedText>

            <AccessibilityDemo
                checked={false}
                onToggle={() => { }}
                disabled={true}
            />
            <ThemedText style={styles.hint}>Disabled checkbox</ThemedText>
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
        marginBottom: 30,
    },
    hint: {
        fontSize: 12,
        marginTop: 5,
        marginBottom: 20,
        opacity: 0.6,
    }
});
