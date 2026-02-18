import { Redirect, Stack } from 'expo-router';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export default function AuthLayout() {
  const { isAuthenticated } = useContext(AuthContext);

  // if (isAuthenticated) {
  //   return <Redirect href="/dashboard" />;
  // }

  return <Stack screenOptions={{ headerShown: false }} />;
}
