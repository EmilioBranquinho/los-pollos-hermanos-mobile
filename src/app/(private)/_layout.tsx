import { Redirect, router, Stack } from 'expo-router';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Router } from 'expo-router';

export default function PrivateLayout() {


  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/signIn" />;
  }

  return <Stack screenOptions={{ headerShown: false }}>
         <Stack.Screen
            name="finishOrder"
            options={{
              headerShown: true,
              title: "Finalizando",
              headerStyle: {
                backgroundColor: "#1c0f0a",       
              },
              headerTintColor: "#FFF",
                headerLeft: () => (
      <Feather
        name="arrow-left"
        size={24}
        color="#FFF"
        onPress={() => router.back()}
        style={{ marginLeft: 16 }}
      />
    ),
            }}
          />
  </Stack>;
}
