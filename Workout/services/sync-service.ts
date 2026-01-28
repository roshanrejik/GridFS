export interface DataItem {
    id: string;
    value: string;
    version: number;
}

export interface SyncOperation {
    id: string;
    type: 'UPDATE' | 'CREATE';
    item: DataItem;
    timestamp: number;
}

class SyncService {
    private localDb: Map<string, DataItem> = new Map();
    private serverDb: Map<string, DataItem> = new Map();
    private offlineQueue: SyncOperation[] = [];
    private isOnline: boolean = true;

    constructor() {
        // Initial Seed
        const item = { id: '1', value: 'Original Value', version: 1 };
        this.localDb.set('1', { ...item });
        this.serverDb.set('1', { ...item });
    }

    setOnline(status: boolean) {
        this.isOnline = status;
        if (status) this.processQueue();
    }

    getOnlineStatus() {
        return this.isOnline;
    }

    getLocalData() {
        return Array.from(this.localDb.values());
    }

    getServerData() {
        return Array.from(this.serverDb.values());
    }

    getQueue() {
        return [...this.offlineQueue];
    }

    updateItem(id: string, newValue: string) {
        const item = this.localDb.get(id);
        if (!item) return;

        item.value = newValue;
        item.version += 1;
        this.localDb.set(id, { ...item });

        const operation: SyncOperation = {
            id: Math.random().toString(36).substr(2, 9),
            type: 'UPDATE',
            item: { ...item },
            timestamp: Date.now(),
        };

        if (this.isOnline) {
            this.syncToServer(operation);
        } else {
            this.offlineQueue.push(operation);
        }
    }

    private syncToServer(op: SyncOperation) {
        const serverItem = this.serverDb.get(op.item.id);

        // Conflict Detection: If server version is higher or different than expected local previous version
        if (serverItem && serverItem.version >= op.item.version) {
            console.warn('Conflict detected for item:', op.item.id);
            return 'CONFLICT';
        }

        // Simulate Network Delay
        setTimeout(() => {
            this.serverDb.set(op.item.id, { ...op.item });
        }, 500);
        return 'SUCCESS';
    }

    private processQueue() {
        if (this.offlineQueue.length === 0) return;

        const queue = [...this.offlineQueue];
        this.offlineQueue = [];

        queue.forEach(op => {
            this.syncToServer(op);
        });
    }

    forceServerUpdate(id: string, newValue: string) {
        const item = this.serverDb.get(id);
        if (item) {
            item.value = newValue;
            item.version += 1;
            this.serverDb.set(id, { ...item });
        }
    }
}

export const syncService = new SyncService();
