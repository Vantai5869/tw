import { omit } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { batch, useDispatch, useSelector } from "react-redux";
import { formatNumber, getIds } from "../../../common/utils";
import Button from "../../../componets/Button";
import SafeViewLayout from "../../../componets/SafeViewLayout";
import Tag from "../../../componets/Tag";
import { colors } from "../../../constants/colors";
import {
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
  IconClose,
  IconCloseBlue,
  icons,
  IconSort,
  IconSwapVertical,
} from "../../../constants/icons";
import { MEDIA } from "../../../constants/media";
import { TagType } from "../../../constants/type.interface";
import { translate } from "../../../locale";
import { ScreenNames } from "../../../navigation/screen";
import { selectDistributorCart } from "../../../redux/slice/Cart/distributor-cart";
import {
  ProductFilter,
  ProductSearch,
  RecentSearchText,
  selectProduct,
} from "../../../redux/slice/Sales/product";
import {
  FilterType,
  ProductSearchReq,
  SortType,
} from "../../../redux/type/Sales/product";
import HeaderSearchBar from "../../importProduct/purchase/search-bar";
import { ProductCart } from "../../payment/components/product-item";
import { IconShoppingBlue } from "../../../constants/icons";
import CardProductOnSearch from "../../../componets/CardProductOnSearch";
import CardProduct from "../../../componets/CardProduct";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SmallPanel from "../../../componets/LoadingAnimation/SmallPanel";
import BigPanel from "../../../componets/LoadingAnimation/BigPanel";
import CardBigImageTitle from "../../../componets/CardBigImageTitle";

function SearchCategory({ ...props }) {
  const dispatch = useDispatch();
  const { products, loading, filters, keyWordFromHome, recentSearchText } =
    useSelector(selectProduct);
  const { carts } = useSelector(selectDistributorCart);
  const keyword = props?.route?.params?.keyword || "";

  const [tab, setTab] = useState<SortType>(0);
  const [sortType, setSortType] = useState<SortType>(0);
  const [TextSearch, setTextSearch] = useState<string>(
    keyword || filters.TextSearch || ""
  );
  const [skips, setSkips] = useState(0);
  const [dataproduct, setDataProduct] = useState(products);
  const [isLoad, setIsLoad] = useState(false);

  // const onScrolls = () => {
  //   if (dataproduct?.items?.length > 20) {
  //     setSkips(skips + 1);
  //   }
  // };

  const getProducts = (filter: FilterType) => {
    const params: ProductSearchReq = {
      ...filter,
      ListCategoryId: getIds(
        filter?.ListCategoryId?.filter((el) => el?.id !== "-1")
      ),
      ListSupplierId: getIds(
        filter?.ListSupplierId?.filter((el) => el?.id !== "-1")
      ),
      skip: skips,
      take: 20,
    };
    batch(() => {
      dispatch(ProductFilter(filter));
      dispatch(ProductSearch(params));
    });
  };
  useEffect(() => {
    getProducts({
      ...filters,
      SortType: sortType,
      TextSearch: filters.TextSearch,
      skip: skips,
      take: 20,
    });
  }, [skips]);
  useEffect(() => {
    if (keyWordFromHome === "isSellingProducts") {
      const params: ProductSearchReq = {
        selling: 0,
      };
      dispatch(ProductSearch(params));
    } else if (keyWordFromHome === "isProductNew") {
      const params: ProductSearchReq = {
        CreationTime: 3,
      };
      dispatch(ProductSearch(params));
    } else if (keyWordFromHome === "isNewSupplier") {
      const params: ProductSearchReq = {
        SortType: 0,
      };
      dispatch(ProductSearch(params));
    } else
      getProducts({
        ...filters,
        SortType: sortType,
        TextSearch: filters.TextSearch,
        skip: skips,
        take: 20,
      });
  }, [sortType, filters.TextSearch, skips]);

  const onGoBack = () => {
    props.navigation.goBack();
  };

  const onTab = (value: 0 | 1 | 2) => {
    setSortType(0);
    setTab(value);
    getProducts({ ...filters, SortField: value });
  };

  const onSort = (tab: SortType) => {
    setTab(tab);
    setSortType(() => {
      if (sortType === 2) {
        const params: FilterType = { ...filters, SortType: 0 };
        dispatch(ProductFilter(params));
        return 0;
      } else if (sortType === 0) {
        const params: FilterType = { ...filters, SortType: 1 };
        dispatch(ProductFilter(params));
        return 1;
      } else {
        const params: FilterType = { ...filters, SortType: 0 };
        dispatch(ProductFilter(params));
        return 0;
      }
    });
  };

  const getValue = (data: TagType[], value: TagType) => {
    let newData = data;
    newData = newData?.filter((el: TagType) => el?.id !== value?.id);
    return newData;
  };

  const onChangeValueCategory = (value: TagType) => {
    const data = getValue(filters?.ListCategoryId || [], value);
    dispatch(ProductFilter({ ...filters, ListCategoryId: data }));
    getProducts({ ...filters, ListCategoryId: data });
  };

  const onChangeValueSupplier = (value: TagType) => {
    const data = getValue(filters?.ListSupplierId || [], value);
    dispatch(ProductFilter({ ...filters, ListSupplierId: data }));
    getProducts({ ...filters, ListSupplierId: data });
  };
  const onChangePrice = () => {
    const params = omit(filters, ["ToPrice"]);
    dispatch(ProductFilter(params));
    getProducts(params);
  };
  const onChangeValueKeyword = (value?: string) => {
    const data = { ...filters, TextSearch: "" };
    setTextSearch("");
    dispatch(ProductFilter({ ...data }));
    getProducts({ ...data });
  };
  const onTouchKeyword = async (txtKeyword: string, isDirect?: boolean) => {
    if (!isDirect) {
      const dataStorage: string[] = [txtKeyword].concat(recentSearchText);
      AsyncStorage.setItem("recentSearch", dataStorage?.join(","));
    }
    dispatch(ProductSearch({ ...filters, TextSearch: txtKeyword }));
  };
  const renderSortPrice = useMemo(() => {
    if (tab === 1) {
      if (sortType === 0) {
        return <IconArrowUp width={12} height={12} stroke={colors.primary} />;
      }
      if (sortType === 1) {
        return <IconArrowDown width={12} height={12} stroke={colors.primary} />;
      }
    }

    return <IconSwapVertical width={14} height={14} />;
  }, [sortType, tab]);
  const renderSortName = useMemo(() => {
    return (
      <View style={[styles.boxSortName]}>
        <Text
          style={[
            styles.txtTab,
            [0, 1].includes(sortType) && tab === 2 && styles.txtActive,
          ]}
        >
          {tab === 2 && sortType === 1 ? "Z" : "A"}
        </Text>
        <IconArrowRight
          width={10}
          height={16}
          stroke={
            tab === 2 && [0, 1].includes(sortType)
              ? colors.primary
              : colors.c_636366
          }
        />
        <Text
          style={[
            styles.txtTab,
            [0, 1].includes(sortType) && tab === 2 && styles.txtActive,
          ]}
        >
          {tab === 2 && sortType === 1 ? "A" : "Z"}
        </Text>
      </View>
    );
  }, [sortType, tab]);
  useEffect(() => {
    dispatch(RecentSearchText(""));
  }, [props.modalVisible]);

  return (
    <SafeViewLayout style={styles.containerScrollView}>
      <View style={styles.topView} />
      <View style={styles.container}>
        <View style={styles.viewSearchSort}>
          <TouchableOpacity style={styles.boxSortGoBack} onPress={onGoBack}>
            <Image source={icons.ICON_LEFT} style={styles.iconGoBack} />
          </TouchableOpacity>
          <View style={{ flex: 1, paddingRight: 12 }}>
            <HeaderSearchBar
              containerStyle={{ paddingHorizontal: 0, paddingVertical: 0 }}
              keyword={TextSearch}
              {...props}
              showFilter={true}
            />
          </View>
          {/* <TouchableOpacity style={styles.boxSortCart} onPress={onOpenFilter}>
            <IconShoppingBlue width={24} height={24} />
          </TouchableOpacity> */}
        </View>
        {recentSearchText?.length > 0 ? (
          <View style={styles.wrapBox}>
            {recentSearchText?.map((text: string, index: number) => (
              <TouchableOpacity
                key={text}
                onPress={() => onTouchKeyword(text, true)}
                style={[
                  styles.viewKeyword,
                  index === 0 && { borderTopColor: "transparent" },
                ]}
              >
                <Text style={styles.txtKeyword}>{text}</Text>
                {/* <IconCloseBlue width={11} height={11} fill={colors.c_667403} /> */}
              </TouchableOpacity>
            ))}
          </View>
        ) : null}
        <View style={styles.flexBoxTag}>
          {filters?.TextSearch ? (
            <Tag
              label={filters?.TextSearch}
              isValue={true}
              onSelect={() => onChangeValueKeyword(filters?.TextSearch || "")}
              numberOfLines={1}
              // styleText={styles.styleTag}
            />
          ) : null}
          {filters?.ListCategoryId?.filter((el: any) => el.id !== "-1")?.map(
            (item: any) => (
              <Tag
                label={item?.name}
                isValue={true}
                onSelect={() => onChangeValueCategory(item)}
              />
            )
          )}
          {filters?.ListSupplierId?.filter((el: any) => el.id !== "-1")?.map(
            (item: any) => (
              <Tag
                label={item?.name}
                isValue={true}
                onSelect={() => onChangeValueSupplier(item)}
              />
            )
          )}
          {!!filters?.ToPrice ? (
            <Tag
              label={`< ${formatNumber(filters?.ToPrice || 0)}`}
              isValue={true}
              onSelect={() => onChangePrice()}
            />
          ) : null}
        </View>
      </View>
      <View style={styles.resultHeader}>
        <TouchableOpacity
          style={[
            styles.viewHeaderLeft,
            tab === 0 && styles.viewHeaderLeftPicked,
          ]}
          onPress={() => onTab(0)}
        >
          <Text style={tab === 0 ? styles.txtTabSelect : styles.txtTab}>
            {translate("bestseller")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onTab(1), onSort(1);
          }}
          style={[
            styles.viewHeaderLeft,
            tab === 1 && styles.viewHeaderLeftPicked,
          ]}
        >
          <View>
            <Text style={tab === 1 ? styles.txtTabSelect : styles.txtTab}>
              {translate("filter_price")}
            </Text>
          </View>
          {renderSortPrice}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onTab(2), onSort(2);
          }}
          style={[
            styles.viewHeaderLeft,
            tab === 2 && styles.viewHeaderLeftPicked,
          ]}
        >
          <View>
            <Text style={tab === 2 ? styles.txtTabSelect : styles.txtTab}>
              {translate("filter_name")}
            </Text>
          </View>
          {renderSortName}
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.wrapList}>
        {loading ? (
          <View style={styles.itemProduct}>
            <FlatList
              contentContainerStyle={styles.containerStyle}
              showsHorizontalScrollIndicator={false}
              numColumns={2}
              data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
              renderItem={({ item, index }: any) => (
                <View style={styles.bigPanel} key={index}>
                  <BigPanel key={index} />
                </View>
              )}
            />
          </View>
        ) : products.items.length > 0 ? (
          <View style={styles.itemProduct}>
            <FlatList
              contentContainerStyle={styles.containerStyle}
              showsHorizontalScrollIndicator={false}
              // horizontal
              numColumns={2}
              data={products.items}
              renderItem={({ item, index }: any) => {
                return keyWordFromHome === "isNewSupplier" ? (
                  <CardBigImageTitle data={item} key={item.id} />
                ) : (
                  <CardProduct data={item} marginBottom={true} key={index} />
                );
              }}
            />
          </View>
        ) : (
          <View style={styles.empty}>
            <Text>{translate("no_products")}</Text>
          </View>
        )}
      </ScrollView>
    </SafeViewLayout>
  );
}
const styles = StyleSheet.create({
  containerScrollView: {
    padding: Platform.OS === "android" ? 15 : 0,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: colors.c_ffffff,
    flex: 1,
  },
  topView: {
    padding: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  containerTag: {
    paddingLeft: 30,
    flexDirection: "row",
    margin: 6,
  },
  flexBoxTag: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 23,
    // height: 100,
  },
  container: {
    paddingHorizontalLeft: 0,
    paddingHorizontalRight: 0,
    paddingTop: 18,
    paddingBottom: 6,
  },
  viewSearchSort: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 6,
    paddingLeft: 12,
    paddingRight: 24,
  },
  boxSortGoBack: {
    width: 40,
    height: 43,
    backgroundColor: colors.c_ffffff,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  boxSortCart: {
    width: 43,
    height: 43,
    backgroundColor: colors.c_ffffff,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.c_000_01,
  },
  boxSortPrice: {
    marginLeft: 10,
    width: 20,
    height: 20,
    backgroundColor: colors.c_ffffff,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  boxSortName: {
    marginLeft: 10,
    width: 20,
    height: 20,
    backgroundColor: colors.c_ffffff,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  iconGoBack: {
    width: 8.2,
    height: 14.6,
  },
  iconFilter: {
    width: 16,
    height: 16,
  },
  iconCart: {
    width: 16,
    height: 16,
  },
  iconPrice: {
    width: 14,
    height: 14,
  },
  iconName: {
    width: 16,
    height: 16,
  },
  iconClose: {
    width: 10,
    height: 10,
    // color: "rgba(252, 131, 45, 1)",
  },
  tags: {
    flexDirection: "row",
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    height: 32,
    borderRadius: 6,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "rgba(252, 131, 45, 0.1)",
    marginLeft: 6,
    marginRight: 6,
  },
  wrapList: {
    paddingVertical: 15,
    paddingLeft: 18.5,
    paddingRight: 18.5,
    flex: 1,
  },
  resultHeader: {
    flexDirection: "row",
    paddingLeft: 23,
    paddingRight: 23,
  },
  viewHeaderLeft: {
    borderBottomWidth: 2,
    paddingBottom: 10,
    width: "33%",
    borderColor: colors.c_AEAEB2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerLeft: {},

  viewHeaderLeftPicked: {
    borderColor: colors.primary,
  },
  headerCenter: {},
  viewHeaderCenter: {
    opacity: 0.5,
    flexDirection: "row",
    justifyContent: "center",
    width: "33%",
    borderBottomWidth: 1,
    borderColor: colors.c_000000,
  },
  viewHeaderCenterPicked: {
    opacity: 0.5,
    flexDirection: "row",
    justifyContent: "center",
    // alignItems: "center",
    width: "33%",
    borderBottomWidth: 1,
    borderColor: colors.c_FC832D,
  },
  headerRight: {
    // flexDirection: "row",
    // opacity: 0.5,
  },
  viewHeaderRight: {
    flexDirection: "row",
    justifyContent: "center",
    opacity: 0.5,
    width: "34%",
    borderBottomWidth: 1,
    borderColor: colors.c_000000,
  },
  viewHeaderRightPicked: {
    flexDirection: "row",
    justifyContent: "center",
    opacity: 0.5,
    width: "34%",
    borderBottomWidth: 1,
    borderColor: colors.c_FC832D,
  },
  singleLine: {
    // borderBottomWidth: 1,
    // borderBottomColor: colors.c_000_01,
  },
  contentt: {},
  textColor: {
    color: colors.c_000000,
    // borderColor: colors.c_000_01,
    // opacity: 0.5,
    textAlign: "center",
  },
  empty: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },

  paymentInfo: {
    width: "100%",
  },
  number: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: colors.c_F3F4F6,
    paddingBottom: 6,
    marginBottom: 8,
  },
  cost: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderColor: colors.c_F3F4F6,
  },
  textNumber: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 22,
  },
  textCost: {
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 22,
  },
  buttons: {
    paddingTop: 20,
  },
  btnImport: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 10,
  },
  btnTextImport: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "500",
    color: colors.primary,
  },
  styleTag: {
    maxWidth: 140,
  },
  itemProduct: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  containerStyle: {
    alignSelf: "flex-start",
  },
  wrapBox: {
    paddingVertical: 15,
    paddingHorizontal: 24,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  viewHeadingBox: {
    marginBottom: 10,
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
  txtKeyword: {
    fontSize: 14,
    lineHeight: 18,
    color: colors.c_667403,
    marginRight: 6,
  },
  txtHeadingBox: {
    fontWeight: "700",
  },
  viewKeyword: {
    paddingVertical: 8.5,
    paddingHorizontal: 12,
    backgroundColor: "rgba(102, 116, 3, 0.1)",
    borderRadius: 8,
    marginBottom: 5,
    marginRight: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  txtTab: {
    color: colors.c_636366,
    fontSize: 12,
    fontWeight: "500",
  },
  txtTabSelect: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "500",
  },
  txtActive: {
    color: colors.primary,
  },
  bigPanel: {
    marginRight: 10,
    marginBottom: 10,
  },
});
export default SearchCategory;
