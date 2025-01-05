import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

export default function Error({albumsError}) {
    
  return (
    <SafeAreaView>
      <Text style={{color:'#fff'}}>{albumsError}</Text>
    </SafeAreaView>
  )
}