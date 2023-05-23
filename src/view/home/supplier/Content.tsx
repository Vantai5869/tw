import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { colors } from "../../../constants/colors";
import CardProductOnSearch from "../../../componets/CardProductOnSearch";
import { IconTrackDelivery } from "../../../constants/icons";
import { translate } from "../../../locale";

const ListProduct = ({ ...props }) => {
  return (
    <View style={styles.containerProductTopSearch}>
      {props.noTitle ? null : (
        <View style={styles.boxHeaderSearch}>
          <View style={styles.store}>
            <IconTrackDelivery />
            <Text style={styles.txtStore}>Sản phẩm mới</Text>
          </View>
          <TouchableOpacity style={styles.storeView}>
            <Text style={styles.txtMore}>{translate("view_all")}</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.itemProduct}>
        <View style={styles.containerStore}>
          <FlatList
            contentContainerStyle={styles.scrollViewOutLineStall}
            showsHorizontalScrollIndicator={false}
            data={props.data}
            numColumns={2}
            renderItem={({ item, index }: any) => (
              <CardProductOnSearch
                id={item.id}
                source={item.image}
                sold={item.soldQuantity}
                sale={item.sale}
                nameProduct={item.name}
                price={item.price}
                key={index}
                data={item}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default ListProduct;

const styles = StyleSheet.create({
  itemProduct: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  boxHeaderSearch: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
    paddingHorizontal: 24,
  },
  store: {
    flexDirection: "row",
    alignItems: "center",
  },
  txtStore: {
    paddingLeft: 8.83,
    color: colors.c_1F1F1F,
    fontSize: 16,
    fontWeight: "bold",
  },
  txtMore: {
    justifyContent: "center",
    alignItems: "center",
    // marginRight: 9,
    color: colors.primary,
    fontSize: 13,
    fontWeight: "400",
  },
  storeView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: colors.c_light_primary,
    width: 86,
    height: 20,
  },
  containerProductTopSearch: {
    // paddingHorizontal: 24,
  },
  scrollViewOutLineStall: {
    // marginHorizontal: 24,
    paddingHorizontal: 19.5,
  },
  containerStore: {
    marginBottom: 45,
  },
});
