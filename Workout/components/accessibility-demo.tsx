import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './themed-text';

interface AccessibilityDemoProps {
    checked: boolean;
    onToggle: () => void;
    disabled?: boolean;
}

export const AccessibilityDemo: React.FC<AccessibilityDemoProps> = ({
    checked,
    onToggle,
    disabled = false
}) => {
    return (
        <TouchableOpacity
            onPress={onToggle}
            disabled={disabled}
            // CRITICAL: Defining the role so screen readers know what this is
            accessibilityRole="checkbox"
            // CRITICAL: Defining the state so screen readers can announce it
            accessibilityState={{
                checked,
                disabled,
            }}
            accessibilityLabel="Newsletter Subscription"
            accessibilityHint="Toggles your subscription to the newsletter"
            style={[styles.container, disabled && styles.disabled]}
        >
            <View style={[styles.checkbox, checked && styles.checked]}>
                {checked && <Ionicons name="checkmark" size={18} color="white" />}
            </View>
            <ThemedText style={styles.label}>Subscribe to Newsletter</ThemedText>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 8,
        marginTop: 10,
    },
    disabled: {
        opacity: 0.5,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    checked: {
        backgroundColor: '#007AFF',
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
    },
});
