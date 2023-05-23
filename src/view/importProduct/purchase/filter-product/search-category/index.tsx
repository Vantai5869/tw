import { omit } from "lodash";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { batch, useDispatch, useSelector } from "react-redux";
import { MAX_PRICE, OVER_MAX_PRICE } from "..";
import { formatNumber, getIds } from "../../../../../common/utils";
import Button from "../../../../../componets/Button";
import { MiniCart } from "../../../../../componets/MiniCart";
import SafeViewLayout from "../../../../../componets/SafeViewLayout";
import Tag from "../../../../../componets/Tag2";
import { colors } from "../../../../../constants/colors";
import { icons, IconSort } from "../../../../../constants/icons";
import { MEDIA } from "../../../../../constants/media";
import { TagType } from "../../../../../constants/type.interface";
import { translate } from "../../../../../locale";
import { ScreenNames } from "../../../../../navigation/screen";
import { selectDistributorCart } from "../../../../../redux/slice/Cart/distributor-cart";
import {
  defaultFilter,
  ProductFilter,
  ProductSearch,
  resetSuggestion,
  selectProduct,
} from "../../../../../redux/slice/Sales/product";
import {
  FilterType,
  ProductSearchReq,
  SortType,
} from "../../../../../redux/type/Sales/product";
import {
  getTotalPrice,
  getTotalQuantity,
} from "../../../../cart/components/utils";
import { ProductCart } from "../../../../payment/components/product-item";
import HeaderSearchBar from "../../search-bar";

function SearchCategory({ ...props }) {
  const dispatch = useDispatch();
  const { products, loading, filters } = useSelector(selectProduct);
  const { carts } = useSelector(selectDistributorCart);

  const [dataproduct, setDataProduct] = useState<any>();
  const [skips, setSkips] = useState(0);

  useEffect(() => {
    setDataProduct(products);
  }, [products]);

  const onScrolls = () => {
    if (dataproduct?.items?.length > 20) {
      setSkips(skips + 1);
    }
  };

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
    });
    return () => {
      dispatch(ProductFilter(defaultFilter));
    };
  }, [
    filters.TextSearch,
    skips,
    filters.ListCategoryId,
    filters.ListSupplierId,
    filters.FromPrice,
    filters.ToPrice,
  ]);

  const getValue = (data: TagType[], value: TagType) => {
    let newData = data;
    newData = newData?.filter((el: TagType) => el?.id !== value?.id);
    return newData;
  };

  const onChangeValueKeyword = (value?: string) => {
    const data = { ...filters, TextSearch: "" };
    dispatch(ProductFilter({ ...data }));
    dispatch(resetSuggestion(""));
    getProducts({ ...data });
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
    const params = omit(filters, ["ToPrice", "FromPrice"]);
    dispatch(ProductFilter(params));
    getProducts(params);
  };

  const renderLoad = () => {
    return loading ? (
      <View style={styles.loader}>
        <ActivityIndicator />
      </View>
    ) : null;
  };

  return (
    <SafeViewLayout style={styles.containerScrollView}>
      <View style={styles.topView} />
      <View style={styles.container}>
        <HeaderSearchBar
          keyword=""
          containerStyle={{ paddingVertical: 0 }}
          showFilter={true}
        />
        <View style={styles.flexBoxTag}>
          {filters?.TextSearch ? (
            <Tag
              label={filters?.TextSearch}
              isValue={true}
              onSelect={() => onChangeValueKeyword(filters?.TextSearch || "")}
              numberOfLines={1}
              styleText={styles.styleTag}
            />
          ) : null}

          {filters?.ListCategoryId?.filter((el: any) => el.id !== "-1")?.map(
            (item: any) => (
              <Tag
                label={item?.name}
                isValue={true}
                onSelect={() => onChangeValueCategory(item)}
                numberOfLines={1}
                styleText={styles.styleTag}
              />
            )
          )}
          {filters?.ListSupplierId?.filter((el: any) => el.id !== "-1")?.map(
            (item: any) => (
              <Tag
                label={item?.name}
                isValue={true}
                onSelect={() => onChangeValueSupplier(item)}
                numberOfLines={1}
                styleText={styles.styleTag}
              />
            )
          )}

          {!!filters?.ToPrice && !filters?.FromPrice ? (
            <Tag
              label={`<${formatNumber(filters?.ToPrice || 0)}`}
              isValue={true}
              onSelect={() => onChangePrice()}
            />
          ) : null}

          {!!filters?.FromPrice && !filters?.ToPrice ? (
            <Tag
              label={`>${formatNumber(filters?.FromPrice || 0)}`}
              isValue={true}
              onSelect={() => onChangePrice()}
            />
          ) : null}

          {!!filters?.FromPrice && !!filters?.ToPrice ? (
            <>
              {filters?.FromPrice === MAX_PRICE &&
              filters?.ToPrice === OVER_MAX_PRICE ? (
                <Tag
                  label={`>${formatNumber(filters?.FromPrice || 0)}`}
                  isValue={true}
                  onSelect={() => onChangePrice()}
                />
              ) : (
                <Tag
                  label={`${formatNumber(
                    filters?.FromPrice || 0
                  )} - ${formatNumber(filters?.ToPrice || 0)}`}
                  isValue={true}
                  onSelect={() => onChangePrice()}
                />
              )}
            </>
          ) : null}
        </View>
      </View>
      {/* <View style={styles.resultHeader}>
        <TouchableOpacity
          style={[
            styles.viewHeaderLeft,
            tab === 0 && styles.viewHeaderLeftPicked,
          ]}
          onPress={() => onTab(0)}
        >
          <Text style={(styles.headerLeft, styles.textColor)}>
            {translate("bestseller")}
          </Text>
        </TouchableOpacity>
        <View
          style={[
            styles.viewHeaderLeft,
            tab === 1 && styles.viewHeaderLeftPicked,
          ]}
        >
          <TouchableOpacity onPress={() => onTab(1)}>
            <Text style={(styles.headerCenter, styles.textColor)}>
              {translate("filter_price")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boxSortPrice} onPress={onSort}>
            <IconSort width={14} height={14} />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.viewHeaderLeft,
            tab === 2 && styles.viewHeaderLeftPicked,
          ]}
        >
          <TouchableOpacity onPress={() => onTab(2)}>
            <Text style={(styles.headerRight, styles.textColor)}>
              {translate("filter_name")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boxSortName} onPress={onSort}>
            <Image
              source={icons.ICON_EXCHANGE_ALT_SOLID2}
              style={styles.iconName}
            />
          </TouchableOpacity>
        </View>
      </View> */}
      <View style={styles.wrapList}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={{ marginVertical: 25 }}
          />
        ) : (
          <FlatList
            numColumns={1}
            data={dataproduct?.items}
            initialNumToRender={20}
            onEndReachedThreshold={0.5}
            onEndReached={() => onScrolls()}
            ListFooterComponent={() => renderLoad()}
            renderItem={({ item, index }: any) => {
              // return (
              //   <CardProductOnSearch
              //     id={item.id}
              //     source={item.image}
              //     sold={item.sold || 0}
              //     sale={item.sale || 0}
              //     nameProduct={item.name}
              //     price={item.price}
              //   />
              // );
              return (
                <ProductCart
                  e={{
                    ...item,
                    productName: item.name,
                    unit: item?.unit || "chiếc",
                  }}
                  i={index}
                />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <View style={styles.empty}>
                <Text>{translate("no_products")}</Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <View
        style={{
          paddingHorizontal: 24,
        }}
      >
        <View style={styles.paymentInfo}>
          <View style={styles.number}>
            <Text style={styles.textNumber}>{translate("total_quantity")}</Text>
            <Text style={styles.textNumber}>{getTotalQuantity(carts)}</Text>
          </View>
          <View style={styles.cost}>
            <Text style={styles.textCost}>{translate("total_price")}</Text>
            <Text style={styles.textCost}>{getTotalPrice(carts as any)}đ</Text>
          </View>
        </View>

        <View style={styles.buttons}>
          <Button
            textButton={translate("view_cart")}
            onPress={() => props.navigation.navigate(ScreenNames.Cart)}
            styleText={styles.btnTextImport}
            styleBackground={styles.btnImport}
          />
        </View>
      </View>
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
    paddingTop: 5,
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
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 24,
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
  loader: {
    marginTop: 10,
    alignItems: "center",
  },
  styleTag: {
    maxWidth: 140,
  },
});
export default SearchCategory;
