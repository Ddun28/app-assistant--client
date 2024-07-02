import { View, Text, Image, ActivityIndicator, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Layout from '../../layout'
import { useUserStorage } from '../../../stores/user/user.store'
import * as SecureStore from 'expo-secure-store';
import { colors } from '../../../theme/theme'
import StyledButton from '../../../components/ui/StyledButton';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { fetchQrCode } from '../../../api/qr/qr.api';

export const StudentHome = ({navigation}:any) => {

  const handleUserLogout = useUserStorage(state => state.handleUserLogout);
  const user = useUserStorage(state => state.user);

  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const [isDownloadLoading, setIsDownloadLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);;
  const [isQrLoading, setIsQrLoading] = useState(true);

  useEffect(() => {
    const getQrCode = async () => {
      if (user && user._id) {
        try {
          const qrImage = await fetchQrCode(user._id);
          setQrCode(qrImage);
        } catch (error) {
          console.error('Error fetching QR code:', error);
        } finally {
          setIsQrLoading(false);
        }
      }
    };
    getQrCode();
  }, [user]);

  const handleDownload = async () => {
    setIsDownloadLoading(true);
    try {
      if (!qrCode) {
        throw new Error('No se ha encontrado ningún código QR para descargar.');
      }
      if (typeof qrCode !== 'string') {
        throw new Error('El código QR no es una cadena de texto.');
      }

      // Solicitar permiso para almacenamiento
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Permiso para acceder al almacenamiento no concedido.');
      }
  
      // Eliminar el prefijo "data:image/png;base64,"
      const base64QR = qrCode.replace('data:image/png;base64,', '');
  
      const fileUri = FileSystem.documentDirectory + 'qr-code.png';
  
         // Guardar en el sistema de archivos
         await FileSystem.writeAsStringAsync(fileUri, base64QR, { encoding: FileSystem.EncodingType.Base64 });

         // Guardar en la biblioteca de medios
         const asset = await MediaLibrary.createAssetAsync(fileUri);
         await MediaLibrary.createAlbumAsync('Download', asset, false);
   
         Alert.alert('Éxito', 'Código QR descargado exitosamente.');
       } catch (error) {
         console.error('Error al descargar el código QR:', error);
         Alert.alert('Error', 'No se pudo descargar el código QR.');
       } finally {
         setIsDownloadLoading(false);
       }
   
};

  const handleLogout = async () => {
    setIsLogoutLoading(true);
    try {
        await SecureStore.deleteItemAsync('token');
        await SecureStore.deleteItemAsync('user');
        handleUserLogout();
        navigation.navigate('Auth');
    } catch (error) {
        console.error('Error', error);
    } finally {
        setIsLogoutLoading(false);
    }
  }
  
  return (
    <Layout classNames='flex flex-col h-full w-full'>
      <View className='flex justify-end bottom-52 mt-6 border-b-8 p-3 border-orange-200 '>
        <View className='flex items-center flex-row justify-start w-full'>
          <Text className='text-4xl font-semibold mr-16' style={{color: colors.light.primary}}>Home</Text>
          <StyledButton isLoading={isLogoutLoading} onPress={handleLogout}>
              Cerrar Sesion
            </StyledButton>
        </View>
      </View>
      <View className='px-4 space-y-14 bottom-44 justify-start'>
        <View className='justify-between items-start flex-row'>
          {user ? (
            <Text className='text-xl mt-2 text-gray-700'>Bienvenido, {user.firstname} {user.lastname}</Text>
          ) : (
            <Text className='text-xl mt-2 text-gray-700'>Cargando...</Text>
          )}
          <Text className='text-black text-xl font-medium'></Text>
        </View>
        <View className='justify-center space-y-3 items-center'>
          {isQrLoading ? (
            <ActivityIndicator size="large" color={colors.light.primary} />
          ) : (
            qrCode && <Image source={{ uri: qrCode }} style={{ width: 200, height: 200 }} />
          )}

          <StyledButton classNames='w-[80%]' isLoading={isDownloadLoading} onPress={handleDownload}>Descargar Qr</StyledButton>
          </View>
        </View>   
    </Layout>
  )
}
