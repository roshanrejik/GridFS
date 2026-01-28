import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, RefreshControl, SectionList, StyleSheet, TouchableOpacity, View } from 'react-native';

// Generate Mock Data
const FLAT_DATA = Array.from({ length: 50 }, (_, i) => ({
    id: `flat-${i}`,
    title: `Workout Session #${i + 1}`,
    duration: `${Math.floor(Math.random() * 60) + 15} min`,
}));

const SECTION_DATA = [
    {
        title: 'Cardio',
        data: [
            { id: 's1', title: 'Running', duration: '30 min' },
            { id: 's2', title: 'Cycling', duration: '45 min' },
        ],
    },
    {
        title: 'Strength',
        data: [
            { id: 's3', title: 'Bench Press', duration: '15 min' },
            { id: 's4', title: 'Deadlift', duration: '20 min' },
            { id: 's5', title: 'Squats', duration: '15 min' },
        ],
    },
    {
        title: 'Flexibility',
        data: [
            { id: 's6', title: 'Yoga', duration: '60 min' },
            { id: 's7', title: 'Stretching', duration: '10 min' },
        ],
    },
];

export default function ListsPocScreen() {
    const [viewMode, setViewMode] = useState<'FLAT' | 'SECTION'>('FLAT');
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 2000);
    }, []);

    const renderFlatItem = ({ item }: { item: typeof FLAT_DATA[0] }) => (
        <View style={styles.itemCard}>
            <View style={styles.itemIcon}>
                <Ionicons name="fitness-outline" size={24} color="#007AFF" />
            </View>
            <View style={styles.itemInfo}>
                <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
                <ThemedText style={styles.itemSub}>{item.duration}</ThemedText>
            </View>
        </View>
    );

    const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => (
        <ThemedView style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
        </ThemedView>
    );

    return (
        <ThemedView style={styles.container}>
            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    style={[styles.toggleBtn, viewMode === 'FLAT' && styles.activeToggle]}
                    onPress={() => setViewMode('FLAT')}
                >
                    <ThemedText style={[styles.toggleText, viewMode === 'FLAT' && styles.activeToggleText]}>FlatList</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.toggleBtn, viewMode === 'SECTION' && styles.activeToggle]}
                    onPress={() => setViewMode('SECTION')}
                >
                    <ThemedText style={[styles.toggleText, viewMode === 'SECTION' && styles.activeToggleText]}>SectionList</ThemedText>
                </TouchableOpacity>
            </View>

            {viewMode === 'FLAT' ? (
                <FlatList
                    data={FLAT_DATA}
                    keyExtractor={(item) => item.id}
                    renderItem={renderFlatItem}
                    contentContainerStyle={styles.listContent}
                    ItemSeparatorComponent={() => <View style={styles.divider} />}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                />
            ) : (
                <SectionList
                    sections={SECTION_DATA}
                    keyExtractor={(item) => item.id}
                    renderItem={renderFlatItem}
                    renderSectionHeader={renderSectionHeader}
                    contentContainerStyle={styles.listContent}
                    stickySectionHeadersEnabled={true}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                />
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toggleContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.03)',
        margin: 15,
        borderRadius: 10,
    },
    toggleBtn: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        borderRadius: 8,
    },
    activeToggle: {
        backgroundColor: '#007AFF',
    },
    toggleText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    activeToggleText: {
        color: 'white',
    },
    listContent: {
        padding: 15,
    },
    itemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        gap: 15,
    },
    itemIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(0,122,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemInfo: {
        flex: 1,
    },
    itemSub: {
        fontSize: 12,
        opacity: 0.6,
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#ccc',
    },
    sectionHeader: {
        paddingVertical: 8,
        backgroundColor: 'white',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007AFF',
    },
});
