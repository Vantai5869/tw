import React from "react";
import { StyleSheet } from "react-native";
import ContentLoader from "react-native-easy-content-loader";
import { DIMENSIONS } from "../../common/utils";
import { colors } from "../../constants/colors";

const BigPanel = () => {
  return (
    <ContentLoader
      active
      pWidth={["70%", "40%", "30%", "30%", "90%"]}
      pHeight={[10, 5, 5, 10, 20]}
      pRows={5}
      //   paragraphStyles={styles.loaderPara}
      containerStyles={styles.sellingProductLoader}
      titleStyles={styles.sellingProductImageLoader}
    ></ContentLoader>
  );
};
export default BigPanel;
export const styles = StyleSheet.create({
  sellingProductLoader: {
    width: (DIMENSIONS.width - 60) / 2,
    // marginRight: 10,
    borderWidth: 1,
    borderColor: colors.c_000_01,
    backgroundColor: colors.c_ffffff,
    borderRadius: 10,
    // paddingHorizontal: 13,
    paddingLeft: 0,
    // marginBottom: 10,
  },
  sellingProductImageLoader: {
    width: (DIMENSIONS.width - 60) / 2 - 2,
    height: ((DIMENSIONS.width - 60) / 2) * 0.75,
    marginBottom: 10,
  },
});
