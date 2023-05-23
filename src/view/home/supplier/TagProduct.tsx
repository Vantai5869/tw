import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { MEDIA } from "../../../constants/media";
import { colors } from "../../../constants/colors";
import { IconAngleRight, IconArrowRight } from "../../../constants/icons";

interface IPropType {
  title: string;
  quantity: number;
  image?: string;
  onPress?: () => void;
  hideImage?: boolean;
}

const TagProduct = (props: IPropType) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.viewContainer}>
        {props.hideImage ? null : (
          <View style={styles.imageView}>
            <Image
              source={props.image ? props.image : MEDIA.IMAGE_AVT}
              style={styles.image}
            />
          </View>
        )}
        <View style={styles.content}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.quantity}>{props.quantity} sản phẩm</Text>
        </View>
      </View>
      <View>
        <IconAngleRight
          width={20}
          height={20}
          stroke={colors.c_000_04}
          fill={colors.c_000_04}
        />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    flexDirection: "column",
    justifyContent: "center",
    // paddingLeft: 20,
  },
  viewContainer: {
    flexDirection: "row",
  },
  imageView: {
    width: 76,
    height: 76,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.c_000_01,
    marginRight: 20,
  },
  image: { width: 76, height: 76, borderRadius: 8 },
  title: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    color: colors.c_3A3A3C,
  },
  quantity: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 14,
    color: colors.c_8E8E93,
  },
});
export default TagProduct;
