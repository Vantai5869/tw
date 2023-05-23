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
export default function CardImage(props: TCardImage) {
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
                resizeMode="contain"
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
                resizeMode="contain"
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
    height: "100%",
    // borderRadius:45,
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
    height: 126,
    width: 76,
    borderRadius: 10,
    marginHorizontal: 5,
    marginBottom: 22,
  },
  left: {
    flex: 2,
    textAlign: "center",
    alignItems: "center",
    paddingTop: 6,
  },
  right: {
    flex: 4,
    padding: 12,
    justifyContent: "flex-end",
    alignContent: "flex-end",
    backgroundColor: colors.c_F4F4F2,
  },
});
