import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    SharedValue,
    useAnimatedStyle
} from 'react-native-reanimated';
import { ThemedText } from './themed-text';

interface ParallaxCardProps {
    scrollY: SharedValue<number>;
    title: string;
    imageSource: any;
}

export const ParallaxCard: React.FC<ParallaxCardProps> = ({ scrollY, title, imageSource }) => {
    const animatedStyle = useAnimatedStyle(() => {
        // Shifting the image background. Using a larger range since cards are at the bottom.
        const translateY = interpolate(
            scrollY.value,
            [0, 3000], // Increased range to account for cards at the bottom
            [0, -200], // Increased movement
            Extrapolation.CLAMP
        );

        return {
            transform: [{ translateY }],
        };
    });

    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <Animated.Image
                    source={imageSource}
                    style={[styles.image, animatedStyle]}
                    resizeMode="cover"
                />
                <View style={styles.overlay} />
                <ThemedText type="subtitle" style={styles.title}>{title}</ThemedText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        height: 200,
        width: '100%',
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 20,
        backgroundColor: '#eee',
    },
    imageContainer: {
        flex: 1,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '150%', // Taller than container to allow for vertical shift
        position: 'absolute',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    title: {
        color: 'white',
        textAlign: 'center',
        padding: 20,
    },
});
