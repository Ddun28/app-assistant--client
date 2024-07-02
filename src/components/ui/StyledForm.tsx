import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'
import StyledInput from './StyledInput';
import { colors } from '../../theme/theme';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, ActivityIndicator } from 'react-native-paper';
import { z } from 'zod';
import StyledButton from './StyledButton';


const InputSchema = z.object({
  header: z.string(),
  key: z.string(),
  type: z.enum(['email', 'password', "text", "date", "select", "checkbox", "file"]),
  regex: z.string().optional()
});
type Input = z.infer<typeof InputSchema>

interface Props {
  inputs: Input[]
  isLoading: boolean
  submitError: {
    message: string
    error: boolean,
  }
  onSubmit: (data: any) => Promise<any>
}

const StyledForm = ({inputs, isLoading, onSubmit, submitError}: Props) => {
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const { handleSubmit, control, formState: { errors }, setError} = useForm()

  const onSubmitForm = handleSubmit(async (data) => {
    Object.keys(data).forEach(async (key: string) => {
      if (data[key] === "" || data[key] === undefined) {
        setError(key, { type: "required" })
      } else {
        await onSubmit(data)
        if (submitError.error) {
          setError(key, { type: "required" })
        }
      }
    })
  })


  return (
    <View className='flex flex-col space-y-1 items-end justify-center w-full'>
      {
        inputs.map((input, index) => (
          <Controller 
            name={input.key}
            key={input.key}
            control={control}
            render={({ field: { onChange, onBlur, value, disabled } }) => (
              <View className='flex flex-col items-start justify-center space-y-1 w-full p-0 pb-2' style={{borderColor: colors.light.primary}}>
                {
                  errors[input.key] 
                    ? <Text className='text-red-700 text-base font-bold ml-1'>{input.header}*</Text>
                    : <Text className='text-slate-700 text-base font-bold ml-1'>{input.header}*</Text>
                }
                <StyledInput
                  onBlur={onBlur}
                  error={errors[input.key] ? true : false}
                  onChangeText={onChange}
                  value={value}
                  classNames='w-full text-red-300'
                  placeholder={input.header}
                  disabled={disabled}
                  {...{ outlineStyle: isLoading && { borderColor: colors.dark.muted } }}
                  //! ! deprecation warning with react-native-paper TextInput.Icon must be remove in future versions.
                  {...{ 
                    right: input.type === 'password' && (
                      <TextInput.Icon icon={!viewPassword ? "eye" : "eye-off"} onPress={() => setViewPassword(!viewPassword)} key={Math.random()}/>
                    ),
                    secureTextEntry: input.type === 'password' && viewPassword
                  }}
                />
              </View>
            )}
          />
      ))}
      <View className={`flex flex-row items-center ${submitError.error ? 'justify-between' : 'justify-end'} w-full`}>
        {submitError.error && <Text className='text-red-700 text-base font-bold ml-1'>{submitError.message}</Text>}
        <StyledButton 
          isLoading={isLoading} 
          color={colors.dark.primary} 
          onPress={onSubmitForm}
          classNames='mx-1'
          disabled={isLoading}
        >Aceptar</StyledButton>
      </View>
    </View>
  )
}

export default StyledForm