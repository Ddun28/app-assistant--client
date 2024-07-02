import { View, Text } from 'react-native'
import React from 'react'
import { TextInput, TextInputProps } from 'react-native-paper'
import { colors } from '../../theme/theme'
import { cn } from './utils'
interface Props extends TextInputProps {
  classNames?: string
}
const StyledInput = ({classNames, ...props}: Props) => {
  return (
    <TextInput
      mode='outlined'
      textColor={colors.light.foreground}
      className={cn("w-full text-base h-14 text-white bg-transparent font-bold", classNames)}
      theme={{dark: true, colors: {onSurfaceDisabled: colors.dark['muted']}}}
      activeOutlineColor={colors.dark.primary}
      outlineColor={colors.dark.muted}
      {...props}
    />
  )
}

export default StyledInput