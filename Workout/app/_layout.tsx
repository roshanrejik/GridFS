import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Alert } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

// Global error handler
const defaultHandler = ErrorUtils.getGlobalHandler();

ErrorUtils.setGlobalHandler((error, isFatal) => {
  console.log('Global Error Caught:', error.message);

  if (isFatal) {
    Alert.alert(
      'Unexpected Error',
      `A fatal error occurred: ${error.message}. The app may need to restart.`,
      [{ text: 'OK', onPress: () => defaultHandler(error, isFatal) }]
    );
  } else {
    // For non-fatal errors, we just log and let it be
    defaultHandler(error, isFatal);
  }
});

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen
          name="details"
          options={{
            title: 'Details',
            animation: 'slide_from_bottom',
            headerShown: true
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
