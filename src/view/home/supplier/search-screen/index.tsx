import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../../../constants/colors";
import HeaderBar from "../header/HeaderBar";
import { MEDIA } from "../../../../constants/media";
import ListProduct from "../Content";
import { batch, useDispatch, useSelector } from "react-redux";
import {
  GetDetailSupplier,
  selectSupplier,
} from "../../../../redux/slice/Partnership/supplier";
import {
  IconContrastUp,
  IconContrastDown,
  IconContrast,
  IconAngleLeft,
  IconFilter,
  IconZoom,
} from "../../../../constants/icons";
import { ProductSearch, selectProduct } from "../../../../redux/slice/Sales/product";
import { getNewProduct, selectHome } from "../../../../redux/slice/Home/home";
import { useRoute } from "@react-navigation/native";
import ModalFilterProduct from "../header/ModalFilter";
import { translate } from "../../../../locale";
import InputSearch from "../../../../componets/InputSearch";
import { debounce } from "lodash";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchScreen = ({ ...props }) => {
  const dispatch = useDispatch();
  const [productType, setProductType] = useState("newProduct");
  const [priceType, setPriceType] = useState(true);
  const [newProduct, setNewProduct] = useState([]);
  const route = useRoute();
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [textSearch, setTextSearch] = useState("")

  const { products, keyWordFromHome, recentSearchText } = useSelector(selectProduct);
  const {
    listNewProduct,
    listCategoryNcc,
    loading
  } = useSelector(selectHome);
  const { supplier } = useSelector(selectSupplier);

  useEffect(() => {
    dispatch(
      ProductSearch({
        supplierId: supplier?.id,
        TextSearch: keyWordFromHome,
      })
    );
  }, [keyWordFromHome]);
  useEffect(() => {
    setNewProduct(listNewProduct.items);
  },[listNewProduct])
  useEffect(() => {
    dispatch(getNewProduct(""));
    // get data for home screen
    setTextSearch(route?.params?.textSearchs)
  }, []);
  useEffect(() => {}, [products]);
  const onPressTypeProduct = (item: string) => {
    setPriceType(false);
    setProductType(item);
    if (item === "price" && !priceType) {
      dispatch(
        ProductSearch({
          supplierId: supplier?.id,
          TextSearch: textSearch,
          SortField: 1,
          SortType: 0,
        })
      );
    }

    if (item === "price" && priceType) {
      dispatch(
        ProductSearch({
          supplierId: supplier?.id,
          TextSearch: textSearch,
          SortField: 1,
          SortType: 1,
        })
      );
    }
    if (item === "newProduct") {
      dispatch(
        ProductSearch({
          supplierId: supplier?.id,
          TextSearch: textSearch,
          SortField: 2,
        })
      );
    }
    if (item === "topSales") {
      dispatch(
        ProductSearch({
          supplierId: supplier?.id,
          TextSearch: textSearch,
          SortField: 0,
        })
      );
    }
  };
  const onPressPriceType = (item: boolean) => {
    setPriceType(item);
  };
  const onOpenFilter = () => {
    setIsFilter(true);
  };
  const handleOnChangeText = (value: string) => {
    setTextSearch(value);
    onDebounce(value);
  };
  const onDebounce = useCallback(
    debounce((txtKeyword: string) => {
      const val = txtKeyword?.trim();
      if (val) {
        const dataStorage: string[] = [val].concat(recentSearchText);
        AsyncStorage.setItem("recentSearch", dataStorage?.join(","));
      }
      if (productType === "price" && !priceType) {
        dispatch(
          ProductSearch({
            supplierId: supplier?.id,
            TextSearch: val,
            SortField: 1,
            SortType: 0,
          })
        );
      }
  
      if (productType === "price" && priceType) {
        dispatch(
          ProductSearch({
            supplierId: supplier?.id,
            TextSearch: val,
            SortField: 1,
            SortType: 1,
          })
        );
      }
      if (productType === "newProduct") {
        dispatch(
          ProductSearch({
            supplierId: supplier?.id,
            TextSearch: val,
            SortField: 2,
          })
        );
      }
      if (productType === "topSales") {
        dispatch(
          ProductSearch({
            supplierId: supplier?.id,
            TextSearch: val,
            SortField: 0,
          })
        );
      }
    }, 1000),
    []
  );
  return (
    <SafeAreaView style={styles.containerSAV}>
      <View style={styles.viewContainerHeaderBar}>
          <TouchableOpacity
            style={styles.goBack}
            onPress={() => props.navigation.goBack()}
          >
            <IconAngleLeft
              width={24}
              height={24}
              fill={props.lightStyle ? colors.c_ffffff : colors.c_000000}
            />
          </TouchableOpacity>
          <InputSearch
              value={textSearch}
              viewInput={styles.inputSearch}
              onChangeText={handleOnChangeText}
              onSubmitEditing={() => {}}
              isFocus={props.modalVisible}
              inputStyle={{ color: colors.c_7B7B80 }}
            />
          <TouchableOpacity
            style={props.lightStyle ? styles.boxSortWhite : styles.boxSort}
            onPress={onOpenFilter}
          >
            <IconFilter
              stroke={props.lightStyle ? colors.c_ffffff : colors.c_7B7B80}
            />
          </TouchableOpacity>
      </View>
      <View>
        <View style={styles.containerTabBar}>
          <TouchableOpacity
            style={styles.subHeaderBarShop}
            onPress={() => onPressTypeProduct("newProduct")}
          >
            <Text
              style={
                productType === "newProduct"
                  ? styles.txtHeaderBarSelect
                  : styles.txtHeaderBar
              }
            >
              Mới nhất
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subHeaderBarShopProduct}
            onPress={() => onPressTypeProduct("topSales")}
          >
            <Text
              style={
                productType === "topSales"
                  ? styles.txtHeaderBarSelect
                  : styles.txtHeaderBar
              }
            >
              Bán chạy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subHeaderBarShop}
            onPress={() => onPressTypeProduct("price")}
          >
            <TouchableOpacity
              style={styles.subHeaderBarShop}
              onPress={() => {
                onPressTypeProduct("price");
                onPressPriceType(!priceType);
              }}
            >
              <Text
                style={
                  productType === "price"
                    ? styles.txtHeaderBarSelect
                    : styles.txtHeaderBar
                }
              >
                Giá
              </Text>
              {productType === "price" && priceType === true && (
                <IconContrastUp />
              )}
              {productType === "price" && priceType === false && (
                <IconContrastDown />
              )}
              {productType !== "price" && <IconContrast />}
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        <View style={styles.contentView}>
          {productType === "newProduct" && (
            <View>
              {loading ? (
                <Text style={styles.loading}>Loading. . .</Text>
              ) : (
                <ListProduct data={products.items} noTitle={true} />
              )}
            </View>
          )}
          {productType === "topSales" && (
            <View>
              {loading ? (
                <Text style={styles.loading}>Loading. . .</Text>
              ) : (
                <ListProduct data={products.items} noTitle={true} />
              )}
            </View>
          )}
          {productType === "price" && (
            <View>
              {loading ? (
                <Text style={styles.loading}>Loading. . .</Text>
              ) : (
                <ListProduct data={products.items} noTitle={true} />
              )}
            </View>
          )}
        </View>
      </View>
      <ModalFilterProduct
        modalVisible={isFilter}
        setIsModal={() => setIsFilter(!isFilter)}
        {...props}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  containerSAV: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 30 : 0,
    backgroundColor: colors.c_ffffff,
  },
  viewContainerHeaderBar: {
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 43, 
    marginVertical: 12,
  },
  containerTabBar: {
    flexDirection: "row",
    paddingHorizontal: 24,
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  subHeaderBarShop: {
    paddingVertical: 0,
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  txtHeaderBarSelect: {
    lineHeight: 14,
    fontSize: 12,
    fontWeight: "500",
    color: colors.primary,
  },
  txtHeaderBar: {
    lineHeight: 14,
    fontSize: 12,
    fontWeight: "500",
    color: colors.c_636366,
  },
  subHeaderBarShopProduct: {
    paddingVertical: 0,
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: colors.c_D7D7D7,
    borderRightColor: colors.c_D7D7D7,
  },
  contentView: {
    paddingBottom: 100,
  },
  loading: {
    paddingHorizontal: 24,
  },
  inputSearchWhite: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.c_ffffff,
    borderRadius: 8,
    paddingVertical: 11,
    paddingHorizontal: 11,
    flexDirection: "row",
    alignItems: "center",
  },
  inputSearch: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.c_000_01,
    borderRadius: 8,
    paddingVertical: 11,
    paddingHorizontal: 11,
    flexDirection: "row",
    alignItems: "center",
  },
  txtSearch: {
    fontSize: 14,
    lineHeight: 18,
    color: colors.c_7B7B80,
    marginLeft: 7,
    flex: 1,
  },
  txtSearchWhite: {
    fontSize: 14,
    lineHeight: 18,
    color: colors.c_ffffff,
    marginLeft: 7,
    flex: 1,
  },
  boxSortWhite: {
    marginLeft: 10,
    width: 43,
    height: 43,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.c_ffffff,
  },
  boxSort: {
    marginLeft: 10,
    width: 43,
    height: 43,
    // backgroundColor: colors.c_000_01,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.c_000_01,
  },
  icon: {
    width: 16,
    height: 16,
  },
  goBack: {
    justifyContent: "center",
    // alignItems: "center",
    paddingRight: 10,
    // paddingHorizontal: 10,
  },
  centeredView: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // marginTop: 22,
  },
  modalView: {
    width: "100%",
    backgroundColor: "white",
    // margin: 20,
    // borderRadius: 20,
    height: "100%",
    // padding: 35,
    paddingRight: 10,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  viewModalSearch: {
    flexDirection: "row",
    justifyContent: "space-around",
    // borderWidth: 1,
    alignItems: "center",
    width: "100%",
  },
  txtModalExit: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    color: colors.c_light_blue,
  },
  viewInput: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginRight: 10,
    width: "80%",
  },
  input: {
    // marginVertical: 10,
  },
  viewShowTextSearch: {
    flexDirection: "row",
    // borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 24,
    // backgroundColor: colors.c_000_01,
  },
  textKeyModal: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22,
  },
  textNameModal: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22,
    color: colors.c_light_blue,
  },
});
export default SearchScreen;
