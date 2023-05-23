import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '../../../constants/icons'
import { colors } from '../../../constants/colors'
import { DIMENSIONS } from '../../../common/utils'

export default function OverviewCard({ onPress, bg,icon, number, title,...props}:any) {
  return (
    <TouchableOpacity style={[styles.container, {backgroundColor:bg}]} onPress={onPress}>
       {icon}
      <Text style={styles.number}> {number}</Text>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles= StyleSheet.create({
  container:{
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    paddingVertical:17,
    borderRadius:8,
    width: (DIMENSIONS.width - 58) / 2,
    marginBottom:8
  },
  number:{
    color:colors.c_3A3A3C,
    fontSize:28,
    lineHeight: 36,
    marginTop:15,
    fontWeight: '600',
  },
  title:{
    color:colors.c_3A3A3C,
    fontSize:16,
    lineHeight: 22,
    fontWeight: '600',
  },
  icon:{

  }

})