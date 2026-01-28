import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

const HTML_CONTENT = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, sans-serif; padding: 20px; background-color: #f0f0f0; }
    .card { background: white; padding: 15px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
    button { background: #007AFF; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }
    h2 { color: #333; }
  </style>
</head>
<body>
  <div class="card">
    <h2>Web Content Layer</h2>
    <p>This content is rendered inside a <strong>WebView</strong>.</p>
    <button onclick="sendToNative()">Send Message to Native App</button>
  </div>

  <script>
    function sendToNative() {
      const data = { type: 'GREETING', message: 'Hello from the Web Layer!' };
      window.ReactNativeWebView.postMessage(JSON.stringify(data));
    }

    // Listener for messages from Native
    window.addEventListener('message', function(event) {
      alert('Native says: ' + event.data);
    });
  </script>
</body>
</html>
`;

export default function WebViewPocScreen() {
    const webViewRef = useRef<WebView>(null);
    const [loading, setLoading] = useState(true);

    const onMessage = (event: WebViewMessageEvent) => {
        try {
            const data = JSON.parse(event.nativeEvent.data);
            if (data.type === 'GREETING') {
                Alert.alert('Message Received', data.message);
            }
        } catch (e) {
            console.error('Failed to parse message from WebView', e);
        }
    };

    const sendToWeb = () => {
        const message = "Native Layer is calling you!";
        // Injecting JS to communicate Native -> Web
        webViewRef.current?.injectJavaScript(`window.postMessage("${message}", "*"); true;`);
    };

    return (
        <ThemedView style={styles.container}>
            <View style={styles.nativeLayer}>
                <ThemedText type="subtitle">Native App Layer</ThemedText>
                <TouchableOpacity style={styles.button} onPress={sendToWeb}>
                    <Ionicons name="paper-plane-outline" size={20} color="white" />
                    <ThemedText style={styles.buttonText}>Send Message to Web</ThemedText>
                </TouchableOpacity>
            </View>

            <View style={styles.webContainer}>
                <WebView
                    ref={webViewRef}
                    originWhitelist={['*']}
                    source={{ html: HTML_CONTENT }}
                    onMessage={onMessage}
                    onLoadEnd={() => setLoading(false)}
                    style={styles.webview}
                />
                {loading && (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#007AFF" />
                    </View>
                )}
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    nativeLayer: {
        padding: 20,
        backgroundColor: 'rgba(0,122,255,0.1)',
        alignItems: 'center',
        gap: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    webContainer: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        gap: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    loader: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
