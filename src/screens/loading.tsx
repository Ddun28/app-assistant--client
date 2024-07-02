import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import Layout from './layout'
import { colors } from '../theme/theme'
import { ActivityIndicator } from 'react-native-paper'
import { autoLogin } from '../api/auth/auth.api'
import * as SecureStore from 'expo-secure-store';

const Loading = ({ navigation }: any) => {

  useEffect(() => {
    const handle = async () => {
      const user = await SecureStore.getItemAsync("user");
      const token = await SecureStore.getItemAsync("token");  
      if (token && user) {
        const res = await autoLogin(JSON.parse(user)._id, token);
        if (res.status === 401) {
          navigation.navigate("Auth"); // Navigate to Auth screen on unauthorized
        } else {
          if (res.data.access === "student") {
            navigation.navigate("StudentHome"); // Navigate to Home screen on success
          } else {
            navigation.navigate("TeacherHome"); // Navigate to Home screen on success
          }
        }
      } else {
        navigation.navigate("Auth"); // Navigate to Auth screen if no token or user
      }
    }
    handle();
  }, []);

  return (
    <Layout classNames='flex items-center justify-center'>
      <StatusBar animated={true} backgroundColor={colors.dark.primary} barStyle="light-content" />
      <ActivityIndicator color={colors.light.primary} size="large" animating={true} />
    </Layout>
  );
};

export default Loading;