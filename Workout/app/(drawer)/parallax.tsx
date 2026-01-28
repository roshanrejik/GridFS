import { ParallaxCard } from '@/components/parallax-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedRef, useScrollOffset } from 'react-native-reanimated';

export default function ParallaxScreen() {
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollY = useScrollOffset(scrollRef);

    return (
        <ThemedView style={{ flex: 1 }}>
            <Animated.ScrollView ref={scrollRef} contentContainerStyle={styles.container}>
                <ThemedText type="subtitle" style={styles.header}>Parallax Cards Demo</ThemedText>
                <ThemedText style={styles.description}>
                    Scroll down to see the depth effect in the cards.
                </ThemedText>

                <ParallaxCard
                    scrollY={scrollY}
                    title="Northern Lights"
                    imageSource={{ uri: 'https://images.unsplash.com/photo-1531366930477-d9cd0c7f792e?auto=format&fit=crop&q=80&w=1000' }}
                />

                <ParallaxCard
                    scrollY={scrollY}
                    title="Ocean Waves"
                    imageSource={{ uri: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&q=80&w=1000' }}
                />

                <View style={{ height: 400 }} />
            </Animated.ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    header: {
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        textAlign: 'center',
        marginBottom: 30,
    },
});
