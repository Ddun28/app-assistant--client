import { View, Text, TouchableOpacity, Touchable } from 'react-native';
import React, { useState } from 'react'
import Layout from '../../layout'
import Camera from './components/Camera';
import { AssistanceList } from './components/AssistanceList';
import { Icon } from '@rneui/themed';
import StyledButton from '../../../components/ui/StyledButton';
import { useUserStorage } from '../../../stores/user/user.store';
import * as SecureStore from 'expo-secure-store';
import { colors } from '../../../theme/theme';
export const TeacherHome = ({navigation}: any) => {

  const [cameraEnable, setCameraEnable] = useState<boolean>(false)
  const [scanned, setScanned] = useState<boolean>(false)
  const [assitantList, setAssitantList] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false);

  const handleUserLogout = useUserStorage(state => state.handleUserLogout);
  const user = useUserStorage(state => state.user);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
        await SecureStore.deleteItemAsync('token');
        await SecureStore.deleteItemAsync('user');
        handleUserLogout();
        navigation.navigate('Auth');
    } catch (error) {
        console.error('Error', error);
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <Layout classNames='flex flex-col h-full w-full'>
      {/* Bento Design */}
      <View className='flex flex-col justify-start items-center w-full h-full px-3 py-4 space-y-7'>
        <View className='flex items-center flex-row justify-start w-full'>
          <Text className='text-4xl font-semibold mr-16' style={{color: colors.light.primary}}>Home</Text>
          <StyledButton isLoading={isLoading} onPress={handleLogout}>
            Cerrar Sesion
          </StyledButton>
        </View>
        <View className='flex flex-col items-center justify-between w-full h-1/2 rounded-lg border-3 border-blue-800 overflow-hidden'>
          <View className='bg-indigo-200/70 w-full h-[85%] flex justify-center items-center'>
            {
              cameraEnable 
                ? <Camera setScanned={setCameraEnable}/> 
                : <Icon name='qrcode-scan' type='material-community' color='hsl(222 73.3% 37.8%)' size={200} />
            }
          </View>
          <TouchableOpacity 
            className='w-full bg-blue-800 border-t border-white rounded-t-none py-4 flex flex-row items-center justify-center space-x-3'
            onPress={() => setCameraEnable(!cameraEnable)}
          >
            <Text className='text-white font-semibold text-lg'>Escanear QR</Text>
            <Icon name='barcode-scan' type='material-community' color='white'/>
          </TouchableOpacity>
        </View>
        <View className=' w-fit rounded-lg'>
          <AssistanceList />
        </View>
      </View>
    </Layout>
  )
}
