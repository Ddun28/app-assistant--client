import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { cn } from './utils'

{/* <Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Make changes to your account here.</TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs> */}

type TabsProps = {
  defaultValue: string
  classNames?: string
}

const Tabs: React.FC<TabsProps> = ({ children, defaultValue, classNames }) => {
  const [value, setValue] = useState<string>(defaultValue);

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <View className={cn("bg-[#111827] h-full w-full", classNames)}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement<any>, {
          value,
          onValueChange: handleValueChange,
        })
      )}
    </View>
  );
};

type TabsListProps = {
  children: React.ReactNode
  classNames?: string
}

const TabsList = ({children, classNames}: TabsListProps) => {
  <View className={cn("flex flex-row items-center justify-center", classNames)}>
    {children}
  </View>
}

type TabsTriggerProps = {
  children: React.ReactNode
  value: string
  classNames?: string
}

const TabsTrigger = ({children, value, classNames}: TabsTriggerProps) => {
  <View className={cn("flex flex-row items-center justify-center", classNames)}>
    {children}
  </View>
}

type TabsContentProps = {
  children: React.ReactNode
  value: string
  classNames?: string
}

const TabsContent = ({children, value, classNames}: TabsContentProps) => {
  <View className={cn("flex flex-row items-center justify-center", classNames)}>
    {children}
  </View>
}


export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
}