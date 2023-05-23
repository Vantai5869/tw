import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { MEDIA } from "../../../../constants/media";
import { DIMENSIONS } from "../../../../common/utils";
import { colors } from "../../../../constants/colors";

export default function CardItem({ title, detail, props }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.imgWapper}>
        <Image
          source={MEDIA.IMAGE_BG_INFO}
          style={[styles.img, styles.img1]}
          resizeMode="cover"
        />
        <Image
          source={MEDIA.IMAGE_BG_IMPORTPD}
          style={[styles.img, styles.img2]}
          resizeMode="cover"
        />
        <Image
          source={MEDIA.LOGO_BOARDING_1}
          style={[styles.img, styles.img3]}
          resizeMode="cover"
        />
        <Image
          source={MEDIA.PRODUCT_DETAIL}
          style={[styles.img, styles.img4]}
          resizeMode="cover"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.detail}>{detail + "sản phẩm"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingVertical: 16,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderStyle: "solid",
  },

  imgWapper: {
    width: (DIMENSIONS.width - 58) / 4,
    height: (DIMENSIONS.width - 58) / 4,
    flexDirection: "row",
    flexWrap: "wrap",
    overflow: "hidden",
    borderRadius: 15,
  },
  img: {
    width: "50%",
    height: "50%",
  },
  img1: {
    borderTopLeftRadius: 10,
  },
  img2: {
    borderTopRightRadius: 10,
  },
  img3: {
    borderBottomLeftRadius: 10,
  },
  img4: {
    borderBottomRightRadius: 10,
  },
  content: {
    marginLeft: 8,
  },
  title: {
    color: colors.c_1F1F1F,
    fontSize: 16,
    lineHeight: 22,
  },
  detail: {
    marginTop: 8,
    fontSize: 12,
    color: colors.c_667403,
  },
});
