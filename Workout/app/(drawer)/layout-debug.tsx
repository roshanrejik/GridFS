import { DebugContainer } from '@/components/debug-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, View } from 'react-native';

export default function LayoutDebugScreen() {
    const [debugEnabled, setDebugEnabled] = useState(false);

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.header}>
                <ThemedText type="subtitle">Layout Debugger PoC</ThemedText>
                <View style={styles.switchRow}>
                    <ThemedText style={styles.switchLabel}>Debug Borders</ThemedText>
                    <Switch
                        value={debugEnabled}
                        onValueChange={setDebugEnabled}
                        trackColor={{ false: '#767577', true: '#34C759' }}
                    />
                </View>
            </ThemedView>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <ThemedText style={styles.infoText}>
                    Toggling debug borders helps identify invisible margins, padding, and alignment offsets.
                </ThemedText>

                <DebugContainer enabled={debugEnabled} color="#007AFF" style={styles.parentBox}>
                    <ThemedText type="defaultSemiBold">Parent Container (Blue)</ThemedText>

                    <DebugContainer enabled={debugEnabled} color="#34C759" style={styles.middleBox}>
                        <ThemedText>Nested Box (Green)</ThemedText>

                        <View style={styles.horizontalRow}>
                            <DebugContainer enabled={debugEnabled} color="#FF9500" style={styles.smallBox}>
                                <ThemedText style={styles.smallText}>Box 1</ThemedText>
                            </DebugContainer>
                            <DebugContainer enabled={debugEnabled} color="#FF2D55" style={styles.smallBox}>
                                <ThemedText style={styles.smallText}>Box 2</ThemedText>
                            </DebugContainer>
                        </View>
                    </DebugContainer>

                    <DebugContainer enabled={debugEnabled} color="#AF52DE" style={styles.bottomBox}>
                        <ThemedText>Spacing Demo (Purple)</ThemedText>
                    </DebugContainer>
                </DebugContainer>

                <ThemedView style={styles.legend}>
                    <ThemedText type="defaultSemiBold">Legend (When Enabled):</ThemedText>
                    <ThemedText>• Solid Border: Component Outer Boundary</ThemedText>
                    <ThemedText>• Faint Background: Internal Component Area</ThemedText>
                </ThemedView>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    switchLabel: {
        fontSize: 12,
        opacity: 0.6,
    },
    scrollContent: {
        padding: 20,
    },
    infoText: {
        marginBottom: 20,
        textAlign: 'center',
        opacity: 0.8,
    },
    parentBox: {
        padding: 20,
        borderRadius: 12,
        gap: 15,
    },
    middleBox: {
        padding: 15,
        borderRadius: 8,
        gap: 10,
    },
    horizontalRow: {
        flexDirection: 'row',
        gap: 10,
    },
    smallBox: {
        flex: 1,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    smallText: {
        fontSize: 10,
    },
    bottomBox: {
        marginTop: 10,
        padding: 10,
        borderRadius: 8,
    },
    legend: {
        marginTop: 30,
        padding: 15,
        backgroundColor: 'rgba(0,0,0,0.03)',
        borderRadius: 8,
        gap: 5,
    }
});
