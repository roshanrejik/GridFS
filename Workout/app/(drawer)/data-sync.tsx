import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { DataItem, SyncOperation, syncService } from '@/services/sync-service';
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function DataSyncScreen() {
    const [localData, setLocalData] = useState<DataItem[]>([]);
    const [serverData, setServerData] = useState<DataItem[]>([]);
    const [queue, setQueue] = useState<SyncOperation[]>([]);
    const [isOnline, setIsOnline] = useState(syncService.getOnlineStatus());

    const refresh = useCallback(() => {
        setLocalData(syncService.getLocalData());
        setServerData(syncService.getServerData());
        setQueue(syncService.getQueue());
        setIsOnline(syncService.getOnlineStatus());
    }, []);

    useEffect(() => {
        refresh();
        const interval = setInterval(refresh, 1000);
        return () => clearInterval(interval);
    }, [refresh]);

    const handleUpdateLocal = (id: string) => {
        syncService.updateItem(id, `Local ${new Date().toLocaleTimeString()}`);
        refresh();
    };

    const handleToggleOnline = () => {
        syncService.setOnline(!isOnline);
        refresh();
    };

    const handleSimulateConflict = (id: string) => {
        syncService.forceServerUpdate(id, 'Conflict from Server');
        Alert.alert('Simulated', 'The server has been updated independently. Try updating local now to see the conflict logic in logs.');
        refresh();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ThemedView style={styles.header}>
                <ThemedText type="subtitle">Data Consistency PoC</ThemedText>
                <TouchableOpacity
                    style={[styles.statusBadge, { backgroundColor: isOnline ? '#34C759' : '#FF3B30' }]}
                    onPress={handleToggleOnline}
                >
                    <Ionicons name={isOnline ? 'cloud-done' : 'cloud-offline'} size={16} color="white" />
                    <ThemedText style={styles.statusText}>{isOnline ? 'Online' : 'Offline'}</ThemedText>
                </TouchableOpacity>
            </ThemedView>

            <ThemedView style={styles.section}>
                <ThemedText type="defaultSemiBold">Local Database (Client)</ThemedText>
                {localData.map(item => (
                    <View key={item.id} style={styles.itemRow}>
                        <View>
                            <ThemedText>{item.value}</ThemedText>
                            <ThemedText style={styles.version}>v{item.version}</ThemedText>
                        </View>
                        <View style={styles.actions}>
                            <TouchableOpacity onPress={() => handleUpdateLocal(item.id)}>
                                <Ionicons name="create-outline" size={24} color="#007AFF" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ThemedView>

            <ThemedView style={styles.section}>
                <ThemedText type="defaultSemiBold">Sync Queue ({queue.length})</ThemedText>
                {queue.length === 0 ? (
                    <ThemedText style={styles.empty}>Queue is empty</ThemedText>
                ) : (
                    queue.map(op => (
                        <View key={op.id} style={styles.queueItem}>
                            <ThemedText style={styles.queueText}>{op.type}: {op.item.value}</ThemedText>
                        </View>
                    ))
                )}
            </ThemedView>

            <ThemedView style={styles.section}>
                <ThemedText type="defaultSemiBold">Server State (Simulated)</ThemedText>
                {serverData.map(item => (
                    <View key={item.id} style={styles.itemRow}>
                        <View>
                            <ThemedText>{item.value}</ThemedText>
                            <ThemedText style={styles.version}>v{item.version}</ThemedText>
                        </View>
                        <TouchableOpacity onPress={() => handleSimulateConflict(item.id)}>
                            <ThemedText style={styles.conflictBtn}>Cause Conflict</ThemedText>
                        </TouchableOpacity>
                    </View>
                ))}
            </ThemedView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        gap: 5,
    },
    statusText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    section: {
        backgroundColor: 'rgba(0,0,0,0.03)',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
    },
    version: {
        fontSize: 10,
        opacity: 0.5,
    },
    actions: {
        flexDirection: 'row',
        gap: 15,
    },
    empty: {
        fontSize: 12,
        opacity: 0.5,
        marginTop: 10,
    },
    queueItem: {
        padding: 8,
        backgroundColor: '#FFF9C4',
        borderRadius: 4,
        marginTop: 5,
    },
    queueText: {
        fontSize: 12,
    },
    conflictBtn: {
        fontSize: 12,
        color: '#FF3B30',
        textDecorationLine: 'underline',
    }
});
