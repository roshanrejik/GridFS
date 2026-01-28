import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ImageBackground, ImageResizeMode, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const SAMPLE_IMAGE = { uri: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=1000' };

export default function ImageBackgroundScreen() {
    const [resizeMode, setResizeMode] = useState<ImageResizeMode>('cover');

    const modes: ImageResizeMode[] = ['cover', 'contain', 'stretch', 'repeat', 'center'];

    return (
        <ThemedView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <ThemedText type="subtitle">ImageBackground Demo</ThemedText>
                <ThemedText style={styles.description}>
                    Use <ThemedText type="defaultSemiBold">ImageBackground</ThemedText> to place content over images.
                </ThemedText>

                <ImageBackground
                    source={SAMPLE_IMAGE}
                    resizeMode={resizeMode}
                    style={styles.hero}
                    imageStyle={styles.imageStyle}
                >
                    <View style={styles.overlay}>
                        <ThemedText style={styles.heroTitle}>Ocean Exploration</ThemedText>
                        <ThemedText style={styles.heroSubtitle}>Dive into the deep blue</ThemedText>
                        <TouchableOpacity style={styles.heroButton}>
                            <ThemedText style={styles.buttonText}>Start Adventure</ThemedText>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>Adjust Resize Mode:</ThemedText>
                <View style={styles.modeContainer}>
                    {modes.map((mode) => (
                        <TouchableOpacity
                            key={mode}
                            style={[styles.modeButton, resizeMode === mode && styles.activeMode]}
                            onPress={() => setResizeMode(mode)}
                        >
                            <ThemedText style={styles.modeText}>{mode}</ThemedText>
                        </TouchableOpacity>
                    ))}
                </View>

                <ThemedView style={styles.infoBox}>
                    <Ionicons name="information-circle-outline" size={20} color="#007AFF" />
                    <ThemedText style={styles.infoText}>
                        The container elements (Title, Button) are children of the <ThemedText type="defaultSemiBold">ImageBackground</ThemedText> component.
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
        marginBottom: 20,
    },
    hero: {
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        overflow: 'hidden',
    },
    imageStyle: {
        borderRadius: 20,
        opacity: 0.8,
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: 30,
        borderRadius: 20,
        alignItems: 'center',
        width: '80%',
    },
    heroTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    heroSubtitle: {
        color: 'white',
        fontSize: 14,
        marginBottom: 20,
        opacity: 0.9,
    },
    heroButton: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
    },
    sectionTitle: {
        marginBottom: 10,
    },
    modeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 30,
    },
    modeButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    activeMode: {
        backgroundColor: '#007AFF',
    },
    modeText: {
        fontSize: 12,
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,122,255,0.1)',
        padding: 15,
        borderRadius: 12,
        gap: 10,
        alignItems: 'center',
    },
    infoText: {
        flex: 1,
        fontSize: 13,
    }
});
