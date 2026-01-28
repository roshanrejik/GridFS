import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import React from 'react';

export default function DrawerLayout() {
    const colorScheme = useColorScheme();

    return (
        <Drawer
            screenOptions={{
                drawerActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: true,
            }}
        >
            <Drawer.Screen
                name="index"
                options={{
                    drawerLabel: 'Home',
                    title: 'Home',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="error-utils"
                options={{
                    drawerLabel: 'ErrorUtils PoC',
                    title: 'Error Handling',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="alert-circle-outline" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="loading-spinner"
                options={{
                    drawerLabel: 'Loading Spinner',
                    title: 'Custom Spinner',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="refresh-outline" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="transitions"
                options={{
                    drawerLabel: 'Transitions',
                    title: 'Custom Transitions',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="swap-horizontal-outline" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="accessibility"
                options={{
                    drawerLabel: 'Accessibility',
                    title: 'A11y Testing',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="body-outline" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="parallax"
                options={{
                    drawerLabel: 'Parallax Effect',
                    title: 'Scroll Parallax',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="layers-outline" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="raf"
                options={{
                    drawerLabel: 'requestAnimationFrame',
                    title: 'Manual Animation (RAF)',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="flash-outline" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="data-sync"
                options={{
                    drawerLabel: 'Data Sync PoC',
                    title: 'Consistency & Sync',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="sync-outline" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="webview-poc"
                options={{
                    drawerLabel: 'WebView Bridge',
                    title: 'Native-Web Bridge',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="globe-outline" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="orientation"
                options={{
                    drawerLabel: 'Orientation Demo',
                    title: 'Responsive Layout',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="resize-outline" size={size} color={color} />
                    ),
                }}
            />
        </Drawer>
    );
}
