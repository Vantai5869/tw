import React from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../constants/colors";
import { MEDIA } from "../constants/media";
import { DIMENSIONS } from "../common/utils";
// import LinearGradient from 'react-native-linear-gradient';

export interface TCardPerchase {
  productName: string;
  source: any;
  onPress?: () => void;
}
export default function CardPerchase(props: TCardPerchase) {
  const onPress = () => {
    if (props.onPress?.()) {
      props.onPress?.();
    } else {
      Alert.alert("Coming Soon");
    }
  };
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      style={styles.cardContainer}
    >
      <View style={styles.text}>
        <Text style={styles.productName}>{props.productName}</Text>
      </View>
      <View style={styles.imageWapper}>
        <Image
          source={MEDIA.IMAGE_LOGO}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.c_F4F4F2,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 13,
    // width:159,
    width: (DIMENSIONS.width - 68) / 2,
    height: 88,
    marginLeft: 4.5,
    marginRight: 4.5,
    marginBottom: 8,
  },
  imageWapper: {
    width: "30%",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  text: {
    flex: 1,
  },
  productName: {
    color: colors.c_2E2E2E,
    lineHeight: 14,
    fontSize: 12,
    fontWeight: "500",
    // fontFamily:"Inter",
  },
});
