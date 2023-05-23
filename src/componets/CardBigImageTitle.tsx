import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { DIMENSIONS } from "../common/utils";
import { colors } from "../constants/colors";
import { MEDIA } from "../constants/media";
import { ScreenNames } from "../navigation/screen";
interface PropsType {
  nameCompany: string;
  logo: string;
  id: string | number;
}
interface TCardImage {
  data: PropsType;
}
const CardBigImageTitle = (props: TCardImage) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={
            props.data?.logo ? { uri: props.data?.logo } : MEDIA.IMAGE_LOGO
          }
        />
        {/* <Image style={styles.image} source={props.data.url} /> */}
      </View>
      <View style={styles.title}>
        <Text style={styles.textTitle}>{props.data?.nameCompany}</Text>
      </View>
    </View>
  );
};
export default CardBigImageTitle;
const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 3,
    width: (DIMENSIONS.width - 56) / 2,
    marginBottom: 17,
  },
  imageContainer: {
    backgroundColor: colors.c_light_gray,
    width: (DIMENSIONS.width - 56) / 2,
    height: (DIMENSIONS.width - 56) / 2 - 26,
    borderRadius: 10,
  },
  image: {
    width: (DIMENSIONS.width - 56) / 2,
    height: (DIMENSIONS.width - 56) / 2 - 26,
    borderRadius: 10,
  },
  title: {
    // borderWidth: 1,
    // borderColor: "red",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  textTitle: {
    fontSize: 14,
    fontWeight: "500",
    // textAlign: "center",
  },
});
