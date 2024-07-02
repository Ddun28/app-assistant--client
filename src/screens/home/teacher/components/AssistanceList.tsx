import { View, Text } from 'react-native'
import React from 'react'
import { z } from 'zod'

export const AssistanceList = () => {
  
  const assistanceList: AssistanceItemProps[] = [
    {
      name: 'Gabriel Paez',
      document: 'V - 30098144',
      type: 'asistente'
    },
    {
      name: 'Daniel Dun',
      document: 'V - 31998144',
      type: 'asistente'
    }, 
    {
      name: 'Paco Perez',
      document: 'V - 33998144',
      type: 'ausente'
    } 
  ]
  
  return (
    <View className='flex flex-col items-center justify-center w-full h-fit space-y-2 py-2'>
      {
        assistanceList.map((item, index) => (
          <AssistanceItem key={index} name={item.name} document={item.document} type={item.type}/>
        ))
      }
    </View>
  )
}

const AssistanceItemSchema = z.object({
  name: z.string(),
  document: z.string(),
  type: z.enum(['asistente', 'ausente']),
})

type AssistanceItemProps = z.infer<typeof AssistanceItemSchema> 

const AssistanceItem = ({name, document, type }: AssistanceItemProps) => {
  return (
    <View className='bg-gray-50 flex flex-row items-center justify-between w-full h-fit px-3 py-3 mb-1 rounded-md border-slate-800 border-2'>
      <View className='flex flex-row items-center justify-start space-x-3 w-1/3'>
        <Text className='text-base font-semibold text-blue-950'>{name}</Text>
      </View>
      <View className='flex flex-row items-center justify-center space-x-3 w-1/3'>
        <Text className='text-base font-semibold text-blue-950'>{document}</Text>
      </View>
      <View className='flex flex-row items-center justify-end space-x-3 w-1/3'>
        <View className={`bg-green-500 w-2 h-2 rounded-full ${type === 'asistente' ? 'bg-green-500' : 'bg-red-500 mr-2'}`}/>
        <Text className='text-base font-semibold text-blue-950 capitalize'>{type}</Text>
      </View>
    </View>
  )
}