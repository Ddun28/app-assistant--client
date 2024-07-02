import { View, Text, Button } from 'react-native'
import React from 'react'
import { cn } from '../components/ui/utils'
import { colors } from '../theme/theme'
import Constants from 'expo-constants';

interface Props {
  children: React.ReactNode
  classNames?: string
} 

const Layout = ({children, classNames}: Props) => {
  return (
    // bg-[#111827]
    // bg-[#ebebeb]
    <View 
      className={cn("flex-1 items-center justify-center overflow-hidden h-full w-full", classNames)}
      // style={{marginTop: HeaderSpacing}}
    >
      {children}
    </View>
  )
}

export default Layout

export const HeaderSpacing = Constants.statusBarHeight - 30