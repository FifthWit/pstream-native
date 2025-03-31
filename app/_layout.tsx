import { Stack } from 'expo-router/stack';
import '../global.css';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#120a11' },
      }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
