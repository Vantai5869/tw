import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import { DIMENSIONS } from "../common/utils";
import { colors } from "../constants/colors";

interface TCardImage {
  data: any[];
}
export default function CardImageNew(props: TCardImage) {
  return (
    <FlatList
      data={props.data}
      horizontal={true}
      renderItem={({ item, index }) => (
        <View>
          <View style={[styles.row, styles.item]}>
            <View style={styles.left}>
              <Text style={styles.txtDesc}>{item.name}</Text>
            </View>
            <View style={styles.right}>
              <Image
                source={item.source}
                resizeMode="cover"
                style={styles.image}
              />
            </View>
          </View>
          <View style={[styles.row, styles.item]}>
            <View style={styles.left}>
              <Text style={styles.txtDesc}>{item.name}</Text>
            </View>
            <View style={styles.right}>
              <Image
                source={item.source}
                resizeMode="cover"
                style={styles.image}
              />
            </View>
          </View>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: (DIMENSIONS.width - 106) / 2,
    borderRadius: 10,
  },
  txtDesc: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.c_1F1F1F,
    textAlign: "center",
  },
  row: {
    flexDirection: "column-reverse",
  },
  item: {
    width: (DIMENSIONS.width - 56) / 2,
    borderRadius: 10,
    marginHorizontal: 5,
    marginBottom: 22,
  },
  left: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    paddingTop: 6,
  },
  right: {
    flex: 4,
    width: "100%",
    justifyContent: "flex-end",
    alignContent: "flex-end",
  },
});
