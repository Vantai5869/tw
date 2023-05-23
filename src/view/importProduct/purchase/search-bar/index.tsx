import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
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
import InputSearch from "../../../../componets/InputSearch";
import { MiniCart } from "../../../../componets/MiniCart";
import { colors } from "../../../../constants/colors";
import { icons, IconZoom } from "../../../../constants/icons";
import { translate } from "../../../../locale";
import { ScreenNames } from "../../../../navigation/screen";
import { GetCategory } from "../../../../redux/slice/Sales/category";
import {
  ProductFilter,
  ProductSearch,
  selectProduct,
} from "../../../../redux/slice/Sales/product";
import FilterProduct from "../filter-product";
import { ModalSearchText } from "../search-text";
interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  keyword?: string;
  lightStyle?: boolean;
  showFilter?: boolean;
  showCart?: boolean;
}
export default function HeaderSearchBar(props: Props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { filters, recentSearchText } = useSelector(selectProduct);
  const [text, setText] = useState<string>(props.keyword || "");
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [isFilter, setIsFilter] = useState<boolean>(false);

  useEffect(() => {
    dispatch(GetCategory({}));
  }, []);

  useEffect(() => {
    setText(filters.TextSearch || "");
  }, [filters?.TextSearch]);

  const onOpenFilter = () => {
    setIsFilter(true);
  };

  const onSearch = () => {
    setIsSearch(true);
  };

  return (
    <View style={[styles.container, props.containerStyle]}>
      <View style={styles.viewSearchSort}>
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
          <TouchableOpacity style={styles.boxSort} onPress={onOpenFilter}>
            <Image source={icons.ICON_SORT} style={styles.icon} />
          </TouchableOpacity>
        ) : null}
        <MiniCart />
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
    marginBottom: 10,
  },

  boxSort: {
    marginLeft: 10,
    width: 40,
    height: 43,
    backgroundColor: colors.c_ffffff,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.c_000_01,
  },
  icon: {
    width: 16,
    height: 16,
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
});
