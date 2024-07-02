import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { cn } from './utils'
import { colors } from '../../theme/theme'

interface Props extends TouchableOpacityProps {
  isLoading?: boolean
  classNames?: string
  children: React.ReactNode
}
const StyledButton = ({ classNames, children, isLoading = false, ...props}: Props) => {
  return (
    <TouchableOpacity
      className={cn('flex flex-row w-1/3 space-x-2 items-center justify-center px-2.5 py-2 rounded-md bg-blue-800', classNames)}
      {...props}
    >
      <Text className='text-white font-bold text-base'>{children}</Text>
      {isLoading && <ActivityIndicator color='white'/>}
    </TouchableOpacity>
  )
}

export default StyledButton