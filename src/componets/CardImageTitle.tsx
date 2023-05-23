import React, { useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import ContentLoader from "react-native-easy-content-loader";
import { ScrollView } from "react-native-gesture-handler";
import { DIMENSIONS } from "../common/utils";
import { colors } from "../constants/colors";
import { MEDIA } from "../constants/media";
import { useSelector } from "react-redux";
import { selectHome } from "../redux/slice/Home/home";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../navigation/screen";
interface PropsType {
  name: string;
  url: string;
  id: string;
}
interface TCardImage {
  data: PropsType;
}
export default function CardImageTitle(props: TCardImage) {
  
  return (
    <View style={styles.containerCustom} >
      {props.data.id != undefined ? (
        <>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={MEDIA.IMAGE_LOGO} />
          </View>
          <View style={styles.title}>
            <Text numberOfLines={3} style={styles.textTitle}>
              {props.data?.name}
            </Text>
          </View>
        </>
      ) : (
        <ContentLoader
          // title={false}
          active
          // listSize={2}
          avatar={false}
          // loading={category?.length == 0}
          tWidth={DIMENSIONS.width / 5}
          tHeight={DIMENSIONS.width / 5}
          pRows={1}
          pHeight={[10]}
          pWidth={[DIMENSIONS.width / 5]}
          paragraphStyles={{
            marginHorizontal: 0,
            paddingHorizontal: 0,
          }}
          titleStyles={{}}
          containerStyles={{
            // backgroundColor: "blue",
            paddingLeft: 24,
            paddingTop: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  containerCustom: {
    width: DIMENSIONS.width / 5,
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    // borderWidth: 1,
    // backgroundColor: "red",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: DIMENSIONS.width / 5,
    height: DIMENSIONS.width / 5,
    borderRadius: 10,
    marginBottom: 6,
    // borderWidth: 1,
    // borderColor: "red",
    backgroundColor: colors.c_light_gray,
  },
  image: {
    width: DIMENSIONS.width / 5,
    height: DIMENSIONS.width / 5,
    // margin: 5,
    borderRadius: 10,
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
  },
  textTitle: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
});
