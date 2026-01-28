import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export const RafDemo: React.FC = () => {
    const [scale, setScale] = useState(1);
    const [isActive, setIsActive] = useState(false);
    const rafId = useRef<number | null>(null);
    const startTime = useRef<number | null>(null);

    const animate = (time: number) => {
        if (!startTime.current) startTime.current = time;
        const elapsed = time - startTime.current;

        // Pulse between 1 and 1.5 every 2 seconds
        const newScale = 1 + 0.25 * Math.sin(elapsed / 300);
        setScale(newScale);

        rafId.current = requestAnimationFrame(animate);
    };

    const toggleAnimation = () => {
        if (isActive) {
            if (rafId.current) cancelAnimationFrame(rafId.current);
            setIsActive(false);
            setScale(1);
            startTime.current = null;
        } else {
            setIsActive(true);
            rafId.current = requestAnimationFrame(animate);
        }
    };

    useEffect(() => {
        return () => {
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, []);

    return (
        <ThemedView style={styles.container}>
            <View style={[styles.box, { transform: [{ scale }] }]} />
            <TouchableOpacity
                style={[styles.button, isActive && styles.activeButton]}
                onPress={toggleAnimation}
            >
                <ThemedText style={styles.buttonText}>
                    {isActive ? 'Stop RAF Loop' : 'Start RAF Loop'}
                </ThemedText>
            </TouchableOpacity>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 20,
        gap: 30,
    },
    box: {
        width: 100,
        height: 100,
        backgroundColor: '#FF9500',
        borderRadius: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        minWidth: 150,
        alignItems: 'center',
    },
    activeButton: {
        backgroundColor: '#FF3B30',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
