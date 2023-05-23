import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
import { MEDIA } from "../constants/media";
import { DIMENSIONS } from "../common/utils";
// import LinearGradient from 'react-native-linear-gradient';

export interface TCardStore {
  nameStore: string;
  source: any;
}
export default function CardStoreFavourite(props: TCardStore) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        source={MEDIA.IMAGE_LOGO}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.boxLike}>
        <Text style={styles.txtLike}>Yêu thích</Text>
      </View>

      <Text style={styles.nameStore}>{props.nameStore}</Text>
      <View style={styles.mask}></View>
      {/* <LinearGradient
        // start={{ x: 0, y: 30 }} end={{ x: 0, y: 30 }}
        style={styles.mask}
        colors={['rgba(185, 185, 185, 1)','rgba(0, 0, 0, 0)']}
      /> */}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: (DIMENSIONS.width - 56) / 2,
    height: 134,
    marginRight: 6,
    marginBottom: 8,
  },
  mask: {
    position: "absolute",
    top: 0,
    left: 0,
    width: (DIMENSIONS.width - 56) / 2,
    height: 134,
    borderRadius: 10,
    opacity: 1,
    backgroundColor: "rgba(185, 185, 185, 1",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  txtLike: {
    color: colors.c_ffffff,
    fontSize: 8,
    fontWeight: "400",
  },
  boxLike: {
    position: "absolute",
    top: 7,
    left: 7,
    backgroundColor: colors.c_EC4037,
    paddingVertical: 2.5,
    paddingHorizontal: 6.5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  nameStore: {
    position: "absolute",
    bottom: 7,
    left: 7,
    color: colors.c_ffffff,
    fontSize: 13,
    fontWeight: "500",
  },
});
