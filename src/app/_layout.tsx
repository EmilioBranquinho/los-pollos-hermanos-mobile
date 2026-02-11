import { Stack } from 'expo-router';
import AuthProvider from "../contexts/AuthContext"
import { StatusBar } from 'react-native';

export default function RootLayout() {
  return (
    <AuthProvider>
        <StatusBar backgroundColor="#1d1d2e" barStyle="light-content" translucent={false}/>
      <Stack screenOptions={{ headerShown: false }}    />
    </AuthProvider>
  );
}
