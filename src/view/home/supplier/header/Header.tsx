import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import HeaderBar from "./HeaderBar";
import { FacebookLoader } from "react-native-easy-content-loader";
import { colors } from "../../../../constants/colors";
import { IconStar } from "../../../../constants/icons";

interface IData {
  id: string;
  name: string;
  rate: number;
  totalProduct: number;
  image: string;
  status: string;
  background: string;
}

const HeaderShop = ({ ...props }, data: IData) => {
  return (
    <View style={styles.containerView}>
      <HeaderBar
        containerStyle={{ paddingHorizontal: 0, paddingVertical: 0 }}
        showFilter={true}
        goBack={true}
        {...props}
        lightStyle={true}
      />
      {props?.data?.id ? (
        <View style={styles.detailInfo}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: props.data?.logo ? props.data.logo : null,
              }}
            />
          </View>
          <View>
            <View style={styles.detailView}>
              <Text style={styles.textHeaderName}>
                {props.data?.nameCompany}
              </Text>
            </View>
            <View style={styles.detailView}>
              <Text style={styles.textHeaderTotal}>
                {props.data?.totalProduct} Sản phẩm
              </Text>
            </View>
            <View style={styles.detailView}>
              <View style={styles.detailRate}>
                <IconStar
                  width={15}
                  height={15}
                  stroke={colors.c_FEB336}
                  fill={colors.c_FEB336}
                />
                <View style={styles.viewRate}>
                  <Text style={styles.rate}>{props.data?.rate}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <FacebookLoader active pRows={0} />
      )}
      {/* <FacebookLoader active  /> */}
    </View>
  );
};
export default HeaderShop;
const styles = StyleSheet.create({
  containerView: {
    backgroundColor: colors.c_4B4B4B,
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  detailInfo: {
    paddingBottom: 40,
    paddingTop: 25,
    flexDirection: "row",
    // paddingHorizontal: 24,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 55,
  },
  imageContainer: {
    // borderWidth: 1,
    backgroundColor: colors.c_ffffff,
    width: 55,
    height: 55,
    borderRadius: 55,
  },
  detailView: {
    marginLeft: 18,
  },
  textHeaderName: {
    lineHeight: 18,
    fontSize: 16,
    fontWeight: "600",
    color: colors.c_ffffff,
  },
  textHeaderTotal: {
    lineHeight: 18,
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
  },
  textHeaderStatus: {
    lineHeight: 18,
    fontSize: 12,
    fontWeight: "400",
    color: colors.c_D7D7D7,
  },
  detailRate: {
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
  },
  viewRate: {
    paddingLeft: 10,
  },
  rate: {
    color: colors.c_FEB336,
  },
});
