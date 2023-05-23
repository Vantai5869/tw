import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import InputSearch from "../../../../componets/InputSearch";
import { colors } from "../../../../constants/colors";
import { IconAngleRight, icons, IconStore } from "../../../../constants/icons";
import { selectDistributorCart } from "../../../../redux/slice/Cart/distributor-cart";
import { ProductCart } from "../../../payment/components/product-item";

const Filter = ({ ...props }) => {
  const { carts } = useSelector(selectDistributorCart);

  const [isFilter, setIsFilter] = useState<boolean>(false);
  const handleOnChangeText = (value: string) => {};
  const onOpenFilter = () => {
    setIsFilter(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.viewSearchSort}>
          <InputSearch
            viewInput={styles.inputSearch}
            onChangeText={handleOnChangeText}
          />
          <TouchableOpacity style={styles.boxSortFilter} onPress={onOpenFilter}>
            <Image source={icons.ICON_SORT} style={styles.iconFilter} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.boxSortCart} onPress={onOpenFilter}>
            <Image source={icons.ICON_CART} style={styles.iconCart} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchResult}>
          <View style={styles.itemSearchResult}>
            <Text style={styles.textSearch}>Kinh đô</Text>
            <Image source={icons.ICON_CLOSE} style={styles.iconClose} />
          </View>
          <View style={styles.itemSearchResult}>
            <Text style={styles.textSearch}>Hà Nội xxx xx x xxx</Text>
            <Image source={icons.ICON_CLOSE} style={styles.iconClose} />
          </View>
        </View>
        <View></View>
        {carts.map((el, index) => {
          return (
            <View style={styles.item} key={el.supplierId}>
              <View style={styles.itemHead}>
                <View style={styles.leftHead}>
                  <IconStore
                    width={20.62}
                    height={16.5}
                    fill={colors.c_636366}
                  />
                  <View>
                    <Text style={styles.storeName}>{el.supplierName}</Text>
                  </View>
                </View>
                <View>
                  <IconAngleRight
                    width={16}
                    height={16}
                    fill={colors.c_636366}
                  />
                </View>
              </View>

              {el.items.map((e, i) => {
                return (
                  <View key={e.productId}>
                    <ProductCart e={e} i={i} />
                  </View>
                );
              })}

              {index < carts.length - 1 && (
                <Text style={styles.lineBigSpace}></Text>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.c_ffffff,
  },
  viewSearchSort: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 6,
    paddingHorizontal: 25,
    marginTop: 13,
  },
  inputSearch: {
    flex: 1,
  },
  boxSortFilter: {
    marginLeft: 10,
    width: 43,
    height: 43,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.c_0000001a,
  },
  iconFilter: {
    width: 16,
    height: 16,
    tintColor: colors.c_7B7B80,
  },
  boxSortCart: {
    marginLeft: 8,
    width: 43,
    height: 43,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.c_0000001a,
    color: colors.c_ffffff,
  },
  iconCart: {
    width: 20,
    height: 20,
  },

  searchResult: {
    paddingHorizontal: 26,
    flexDirection: "row",
  },
  itemSearchResult: {
    backgroundColor: colors.c_6674031a,
    height: 32,
    borderRadius: 8,
    flexDirection: "row",
    maxWidth: "80%",
    alignSelf: "flex-start",
    alignItems: "center",
    paddingVertical: 8,
    paddingLeft: 14,
    paddingRight: 14,
    marginRight: 4,
  },
  textSearch: {
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
    color: colors.c_667403,
  },
  iconClose: {
    width: 11,
    height: 11,
    resizeMode: "contain",
    marginLeft: 7,
    tintColor: colors.c_667403,
  },
  item: {
    paddingHorizontal: 25,
  },
  itemHead: {
    marginTop: 22,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftHead: {
    flexDirection: "row",
  },
  storeName: {
    marginLeft: 10.69,
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 20,
  },
  icon: {
    width: 20,
    height: 20,
  },
  lineSpace: {
    borderBottomWidth: 1,
    borderColor: colors.c_F3F4F6,
    marginVertical: 24,
  },
  lineBigSpace: {
    height: 6,
    backgroundColor: colors.c_0000000d,
    marginVertical: 24,
  },
  productInfo: {
    marginTop: 15,
    flexDirection: "row",
  },
  boxImage: {
    marginTop: 7,
    width: 75,
    height: 75,
    marginBottom: 10,
    // padding:7
  },
  boxContent: {
    marginLeft: 18,
    flex: 1,
  },
  productImg: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
  quantity: {
    flexDirection: "row",
  },
  number: {
    marginHorizontal: 6,
  },
  productName: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 22,
    color: colors.c_1F1F1F,
  },
  productId: {
    marginTop: 3,
    textTransform: "uppercase",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16,
    color: colors.c_48484A,
  },
  productPrice: {
    marginTop: 10,
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 22,
    color: colors.c_1F1F1F,
  },
  productAction: {
    marginTop: 23,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cartbox: {
    width: 76,
    height: 32,
    backgroundColor: colors.c_A6BA1A,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});

export default Filter;
