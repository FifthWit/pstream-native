import { Stack } from 'expo-router';

export default function MediaLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: 'var(--background)' },
        headerShown: false,
      }}
    />
  );
}
