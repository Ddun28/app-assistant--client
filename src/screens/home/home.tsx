import { View, Text, StatusBar, Button } from 'react-native'
import React from 'react'
import Layout from '../layout'
import { useUserStorage } from '../../stores/user/user.store'
import * as SecureStore from 'expo-secure-store';
import { colors } from '../../theme/theme'
import StyledButton from '../../components/ui/StyledButton';

const Home = ({navigation}: any) => {

  const user = useUserStorage(state => state.user)

  return (
    <Layout>

      <Text className='text-black ml-3'>home</Text>
      <Button
        title='Cerrar Sesion'
        onPress={() => navigation.navigate("Auth")}
      />
      <View className='flex items-center mt-2 justify-center border-b pb-4'> 
        <Text className='text-3xl mt-2 text-gray-700'>Dashboard</Text>
      </View>
  <View className='flex m-2'>
    <Text className='text-xl mt-2 text-gray-700'>Bienvenido</Text>
      <Text className='text-black text-xl font-medium'>{user.firstname} {user.lastname}</Text>
  </View>
  <Text>Rol: {
    user.access === "admin" ? "Administrativo" :
    user.access === "teacher" ? "Profesor" : 
    user.access === "student" ? "Estudiante" : "Otro rol"
        }
</Text>
      <Text className='text-white'>home</Text>
      <StyledButton onPress={() => navigation.navigate("Auth")}>
        Cerrar Sesion
      </StyledButton>
      <Text>{user.firstname}</Text>
      <Text>{user.lastname}</Text>
      <Text>{user.access}</Text>
    </Layout>
  )
}

export default Home