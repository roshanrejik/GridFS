import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';

export default function OrientationScreen() {
    const { width, height, scale, fontScale } = useWindowDimensions();
    const isLandscape = width > height;

    return (
        <ThemedView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <ThemedView style={styles.header}>
                    <ThemedText type="subtitle">Orientation & Responsive Layout</ThemedText>
                    <ThemedView style={[styles.badge, { backgroundColor: isLandscape ? '#AF52DE' : '#007AFF' }]}>
                        <Ionicons name={isLandscape ? 'desktop-outline' : 'phone-portrait-outline'} size={14} color="white" />
                        <ThemedText style={styles.badgeText}>{isLandscape ? 'Landscape' : 'Portrait'}</ThemedText>
                    </ThemedView>
                </ThemedView>

                <ThemedView style={styles.metricsGrid}>
                    <MetricCard label="Width" value={`${width.toFixed(0)}px`} />
                    <MetricCard label="Height" value={`${height.toFixed(0)}px`} />
                    <MetricCard label="Scale" value={scale.toString()} />
                    <MetricCard label="Font Scale" value={fontScale.toString()} />
                </ThemedView>

                <ThemedText style={styles.instruction}>Rotate your device to see the layout adapt!</ThemedText>

                <View style={[styles.adaptiveContainer, isLandscape && styles.landscapeContainer]}>
                    <View style={[styles.demoBox, isLandscape ? styles.demoBoxLandscape : styles.demoBoxPortrait]}>
                        <ThemedText type="defaultSemiBold">Primary Panel</ThemedText>
                        <ThemedText style={styles.boxText}>In landscape, I take up half the width. In portrait, I take up the full width.</ThemedText>
                    </View>

                    <View style={[styles.demoBox, isLandscape ? styles.demoBoxLandscape : styles.demoBoxPortrait, { backgroundColor: '#FFCC00' }]}>
                        <ThemedText type="defaultSemiBold">Secondary Panel</ThemedText>
                        <ThemedText style={styles.boxText}>I snap next to the primary panel when you rotate to landscape!</ThemedText>
                    </View>
                </View>
            </ScrollView>
        </ThemedView>
    );
}

const MetricCard = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.metricCard}>
        <ThemedText style={styles.metricLabel}>{label}</ThemedText>
        <ThemedText type="defaultSemiBold">{value}</ThemedText>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    metricsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 30,
    },
    metricCard: {
        flex: 1,
        minWidth: '45%',
        backgroundColor: 'rgba(0,0,0,0.05)',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    metricLabel: {
        fontSize: 12,
        opacity: 0.6,
        marginBottom: 4,
    },
    instruction: {
        textAlign: 'center',
        fontStyle: 'italic',
        marginBottom: 20,
        opacity: 0.7,
    },
    adaptiveContainer: {
        gap: 15,
    },
    landscapeContainer: {
        flexDirection: 'row',
    },
    demoBox: {
        padding: 20,
        borderRadius: 15,
        backgroundColor: '#34C759',
        justifyContent: 'center',
        minHeight: 150,
    },
    demoBoxPortrait: {
        width: '100%',
    },
    demoBoxLandscape: {
        flex: 1,
    },
    boxText: {
        marginTop: 8,
        fontSize: 14,
    }
});
