import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { resetFormatNumber } from "../common/utils";
import { colors } from "../constants/colors";
import {
  IconCarts,
  IconFilter,
  IconShoppingCartBase,
  IconAngleLeft,
  IconZoom,
} from "../constants/icons";
import { translate } from "../locale";
import { ScreenNames } from "../navigation/screen";
import { selectDistributorCart } from "../redux/slice/Cart/distributor-cart";
import { GetCategory } from "../redux/slice/Sales/category";
import { getTotalQuantity } from "../view/cart/components/utils";
import FilterProduct from "../view/importProduct/purchase";
import { ModalSearchText } from "../view/importProduct/purchase/search-text";
import { selectProduct } from "../redux/slice/Sales/product";
interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  showFilter: boolean;
  route?: any;
  goBack?: boolean;
  lightStyle?: boolean;
}
export default function HeaderSearchBar({ ...props }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { filters } = useSelector(selectProduct);
  const { carts } = useSelector(selectDistributorCart);
  const number = getTotalQuantity(carts || []);

  const [text, setText] = useState<string>(props.keyword || "");
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [isFilter, setIsFilter] = useState<boolean>(false);

  useEffect(() => {
    dispatch(GetCategory({}));
  }, []);

  useEffect(() => {
    setText(filters.TextSearch || "");
  }, [filters.TextSearch]);

  const onSearch = () => {
    setIsSearch(true);
  };

  const onOpenFilter = () => {
    setIsFilter(true);
  };

  const onOpenCart = () => {
    navigation.navigate(ScreenNames.Cart as any);
  };

  return (
    <View style={[styles.container, props.containerStyle]}>
      <View style={styles.viewSearchSort}>
        {props.goBack ? (
          <TouchableOpacity
            style={styles.goBack}
            onPress={() => props.navigation.goBack()}
          >
            <IconAngleLeft width={24} height={24} fill={colors.c_ffffff} />
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
        <TouchableOpacity
          onPress={onSearch}
          style={
            props.lightStyle ? styles.inputSearchWhite : styles.inputSearch
          }
        >
          <IconZoom
            width={18}
            height={18}
            stroke={props.lightStyle ? colors.c_ffffff : colors.c_7B7B80}
          />
          <Text
            style={props.lightStyle ? styles.txtSearchWhite : styles.txtSearch}
            numberOfLines={1}
          >
            {text || translate("enter_keyword_search")}
          </Text>
        </TouchableOpacity>
        {props.showFilter ? (
          <TouchableOpacity
            style={props.lightStyle ? styles.boxSortWhite : styles.boxSort}
            onPress={onOpenFilter}
          >
            <IconFilter
              stroke={props.lightStyle ? colors.c_ffffff : colors.c_7B7B80}
            />
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
        <TouchableOpacity
          style={props.lightStyle ? styles.boxSortWhite : styles.boxSort}
          onPress={onOpenCart}
        >
          {props.lightStyle ? (
            <IconCarts
              width={18.33}
              height={14.17}
              stroke={props.lightStyle ? colors.c_ffffff : colors.c_7B7B80}
            />
          ) : (
            <>
              <IconShoppingCartBase width={24} height={24} />
              <View style={[styles.viewNumber]}>
                <Text style={styles.txtNumber}>
                  {resetFormatNumber(number) > 99 ? "99+" : number}
                </Text>
              </View>
            </>
          )}
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={props.lightStyle ? styles.boxSortWhite : styles.boxSort}
          onPress={onOpenCart}
        >
          <IconCart
            width={18.33}
            height={14.17}
            stroke={props.lightStyle ? colors.c_ffffff : colors.c_7B7B80}
          /> */}
      </View>
      <FilterProduct
        modalVisible={isFilter}
        setIsModal={() => setIsFilter(!isFilter)}
        {...props}
      />
      <ModalSearchText
        value={text || ""}
        modalVisible={isSearch}
        setIsModal={() => {
          setIsSearch(!isSearch);
          setText("");
          // dispatch(ProductFilter({ ...filters, TextSearch: "" }));
        }}
        {...props}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  viewSearchSort: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    backgroundColor: "white",
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
    position: "relative",
  },
  icon: {
    width: 16,
    height: 16,
  },
  viewNumber: {
    position: "absolute",
    top: 7,
    right: 4,
    backgroundColor: "#FCC22D",
    width: 13,
    height: 13,
    borderRadius: 13,
  },
  txtNumber: {
    fontSize: 6,
    fontWeight: "500",
    lineHeight: 12,
    color: colors.c_ffffff,
    textAlign: "center",
  },
  goBack: {
    justifyContent: "center",
    // alignItems: "center",
    paddingRight: 10,
    // paddingHorizontal: 10,
  },
});
