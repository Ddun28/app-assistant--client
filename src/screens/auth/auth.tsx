import React, { useState } from 'react'
import { View, Text, Image } from 'react-native'
import Layout from '../layout'
import StyledForm from '../../components/ui/StyledForm';
import { IUser, IUserAuth } from '../../schemas/user.scheme';
import { authUser } from '../../api/auth/auth.api';
import { useUserStorage } from '../../stores/user/user.store';
import * as SecureStore from 'expo-secure-store';
import { colors } from '../../theme/theme';

const Auth = ({navigation}: any) => {

  const handleLogin = useUserStorage(state => state.handleUserLogin)

  const [submitError, setSubmitError] = useState<{error: boolean, message: string}>({
    error: false,
    message: "Credenciales invalidas."
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  

  const handleSubmit = async (credentials: IUserAuth) => {
    setIsLoading(true)
    setSubmitError({...submitError, error: false})
    const { status, data } = await authUser(credentials.password, credentials.document)
    if (status === 201) {
      const { user, token }: { user: IUser, token: string } = data
      console.log(user)
      handleLogin(user, token)
      SecureStore.setItemAsync("token", token)
      SecureStore.setItemAsync("user", JSON.stringify(user))
      user.access === "student" ? navigation.navigate("StudentHome") : navigation.navigate("TeacherHome")
      setIsLoading(false)
    } else {
      setSubmitError({...submitError, error: true})
      setIsLoading(false)

      return {
        error: true, 
        message: 'Credenciales invalidas.'
      }
    }
  }

  return (
    <Layout classNames='flex-1 px-0 absolute justify-around space-y-2 w-full'>
      <View className='flex flex-col mt-3 bg-[#9cbffe] h-full items-center justify-center w-full bottom-10'>
        <View className='flex items-center flex-row justify-start'>
          <Text className='text-4xl font-semibold ' style={{color: colors.light.primary}}>Iniciar Sesion</Text>
        </View>
        <View className='flex-row justify-center mt-2'>
          <Image
            source={require("../../../assets/undraw_apps.png")}
            style={{ width: 220, height: 220, bottom: 15 }}
          />
        </View>
      </View>
      <View className='flex h-[67%] bg-white px-8 pt-6 pb-6 w-full' style={{borderTopLeftRadius: 33, borderTopRightRadius: 33}}>
        <StyledForm
          inputs={[
            {
              header: "Documento de identidad",
              key: 'document',
              type: "text"
            },
            {
              header: "Contraseña",
              key: 'password',
              type: "password"
            }
          ]}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          submitError={submitError}
        />
      </View>
    </Layout>
  );
}

export default Auth