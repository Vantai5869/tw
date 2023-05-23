import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconTrackDelivery } from "../../../constants/icons";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import { colors } from "../../../constants/colors";
import { MEDIA } from "../../../constants/media";
import BankCard from "../../../componets/BankCard";
import HeaderShop from "./header/Header";
import ListProduct from "./Content";
import { IconBasketSimpleRemove } from "../../../constants/icons";
import {
  IconContrast,
  IconContrastDown,
  IconContrastUp,
  IconCWarning,
  IconPopularTall,
} from "../../../constants/icons";
import TagProduct from "./TagProduct";
import {
  //   GetDetail,
  selectSupplier,
  //   GetProductForCustomer,
  resetSupplier,
  GetDetailSupplier,
} from "../../../redux/slice/Partnership/supplier";
import BigPanel from "../../../componets/LoadingAnimation/BigPanel";
import BankCardPanel from "../../../componets/LoadingAnimation/BankCardPanel";
import RowPanel from "../../../componets/LoadingAnimation/RowPanel";
import { DIMENSIONS } from "../../../common/utils";
import {
  getCategoryNccs,
  getNewProduct,
  selectHome,
} from "../../../redux/slice/Home/home";
import CardProduct from "../../../componets/CardProduct";
import { useRoute } from "@react-navigation/native";
import {
  keyWordFromHome,
  ProductSearch,
  selectProduct,
} from "../../../redux/slice/Sales/product";
import { ScreenNames } from "../../../navigation/screen";
import { ProductSearchReq } from "../../../redux/type/Sales/product";

const SupplierScreen = ({ ...props }) => {
  const dispatch = useDispatch();
  const { supplier } = useSelector(selectSupplier);
  const { products, recentSearchText } = useSelector(selectProduct);
  const [headerType, setHeaderType] = useState("shop");
  const [productType, setProductType] = useState("newProduct");
  const [priceType, setPriceType] = useState(true);
  const [newProduct, setNewProduct] = useState([]);
  const { listNewProduct, listCategoryNcc, loading } = useSelector(selectHome);

  //   useEffect(() => {
  //     if (supplier !== undefined) {
  //       dispatch(
  //         GetProductForCustomer({ ListSupplierId: supplier?.id, SortField: 3 })
  //       );
  //     }
  //     // return () => {
  //     //   dispatch(resetSupplier(null));
  //     // };
  //   }, [supplier]);

  const onPressTypeHeader = (item: string) => {
    // call api by value shop,  product-> new, list category

    setHeaderType(item);
  };
  const onPressTypeProduct = (item: string) => {
    // call api by value : new topsale price
    if (item === "topSales") {
      const params: ProductSearchReq = {
        selling: 0,
        supplierId: route?.params?.id,
        SortField: 0,
      };
      dispatch(ProductSearch(params));
    }
    if (item === "newProduct") {
      const params: ProductSearchReq = {
        CreationTime: 3,
        supplierId: route?.params?.id,
        SortField: 2,
      };
      dispatch(ProductSearch(params));
    }
    if (item === "price") {
      if (priceType === true) {
        const params: ProductSearchReq = {
          supplierId: route?.params?.id,
          SortField: 1,
          SortType: 1,
        };
        dispatch(ProductSearch(params));
      } else if (priceType === false) {
        const params: ProductSearchReq = {
          supplierId: route?.params?.id,
          SortField: 1,
          SortType: 0,
        };
        dispatch(ProductSearch(params));
      }
    }
    setProductType(item);
  };
  const onPressPriceType = (item: boolean) => {
    setPriceType(item);
  };
  const route = useRoute();
  useEffect(() => {
    setNewProduct(listNewProduct.items);
  }, [listNewProduct]);
  useEffect(() => {
    dispatch(getNewProduct(""));
    dispatch(GetDetailSupplier(route?.params?.id));
    // get data for home screen
  }, []);
  const onPressToViewMore = (item: any) => {
    // call api theo keyword
    dispatch(keyWordFromHome(item));
    props.navigation.navigate(ScreenNames.SearchHome as any);
  };
  useEffect(() => {
    if (headerType === "allProduct" && supplier) {
      dispatch(
        getCategoryNccs({
          params: {
            level: 0,
            skip: 0,
            take: 20,
          },
          supllierId: `${supplier?.id}`,
        })
      );
    }
  }, [headerType]);
  const dataPdPrices = useMemo(() => {
    if (products) {
      return (
        <View style={styles.itemProduct}>
          <FlatList
            contentContainerStyle={styles.containerStyle}
            showsHorizontalScrollIndicator={false}
            numColumns={2}
            data={products.items}
            renderItem={({ item, index }: any) => (
              <CardProduct data={item} marginBottom={true} key={index} />
            )}
          />
        </View>
      );
    }
  }, [products]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <View>
          <HeaderShop data={supplier} {...props} showCart />
        </View>

        <View style={styles.headerBar}>
          <TouchableOpacity
            style={
              headerType === "shop"
                ? styles.headerBarShopSelect
                : styles.headerBarShop
            }
            onPress={() => onPressTypeHeader("shop")}
          >
            <Text
              style={
                headerType === "shop"
                  ? styles.txtHeaderBarSelect
                  : styles.txtHeaderBar
              }
            >
              Cửa hàng
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              headerType === "product"
                ? styles.headerBarShopSelect
                : styles.headerBarShop
            }
            onPress={() => onPressTypeHeader("product")}
          >
            <Text
              style={
                headerType === "product"
                  ? styles.txtHeaderBarSelect
                  : styles.txtHeaderBar
              }
            >
              Sản phẩm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              headerType === "allProduct"
                ? styles.headerBarShopSelect
                : styles.headerBarShop
            }
            onPress={() => onPressTypeHeader("allProduct")}
          >
            <Text
              style={
                headerType === "allProduct"
                  ? styles.txtHeaderBarSelect
                  : styles.txtHeaderBar
              }
            >
              Danh mục hàng
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerContent}>
          {headerType === "shop" && (
            <View>
              <View>
                <View style={styles.descriptionShop}>
                  <IconCWarning
                    width={20}
                    height={20}
                    stroke={colors.c_48484A}
                  />
                  <Text style={styles.txtDescriptionShop}>Mô tả gian hàng</Text>
                </View>
                <View style={styles.descriptionDetailView}>
                  <Text style={styles.textDescriptionDetail}>Công ty</Text>
                  <Text style={styles.textDescriptionDetailData}>
                    {supplier?.businessName
                      ? supplier?.businessName
                      : "Đang cập nhật"}
                  </Text>
                </View>
                <View style={styles.descriptionDetailView}>
                  <Text style={styles.textDescriptionDetail}>Địa chỉ</Text>
                  <Text style={styles.textDescriptionDetailData}>
                    {supplier?.address ? supplier?.address : "Đang cập nhật"}
                  </Text>
                </View>
                <View style={styles.descriptionDetailView}>
                  <Text style={styles.textDescriptionDetail}>Mã số thuế</Text>
                  <Text style={styles.textDescriptionDetailData}>
                    {supplier?.taxCode ? supplier?.taxCode : "Đang cập nhật"}
                  </Text>
                </View>
                <View style={styles.descriptionDetailView}>
                  <Text style={styles.textDescriptionDetail}>
                    Số điện thoại
                  </Text>
                  <Text style={styles.textDescriptionDetailData}>
                    {supplier?.phoneNumber
                      ? supplier?.phoneNumber
                      : "Đang cập nhật"}
                  </Text>
                </View>
                <View style={styles.descriptionDetailViewWhite}>
                  <Text style={styles.textDescriptionDetail}> Email</Text>
                  <Text style={styles.textDescriptionDetailData}>
                    {supplier?.email ? supplier.email : "Đang cập nhật"}
                  </Text>
                </View>
                <View style={styles.descriptionDetailView}>
                  <Text style={styles.textDescriptionDetail}>Link website</Text>
                  <Text
                    style={
                      supplier?.websiteUrl
                        ? styles.textDescriptionDetailDatas
                        : styles.textDescriptionDetailData
                    }
                  >
                    {supplier?.websiteUrl
                      ? supplier?.websiteUrl
                      : "Đang cập nhật"}
                  </Text>
                </View>
                <View style={styles.imageDescription}>
                  {loading ? (
                    <BankCardPanel />
                  ) : (
                    <Image
                      style={styles.images}
                      source={{ uri: supplier?.businessLicense }}
                    />
                  )}
                </View>
              </View>
              {loading ? (
                <View style={{ paddingHorizontal: 24 }}>
                  <View style={styles.boxHeaderSearch}>
                    <View style={styles.store}>
                      <IconPopularTall />
                      <Text style={styles.txtStore}>Sản phẩm mới</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.stores}
                      onPress={() => onPressToViewMore("isProductNew")}
                    >
                      <Text style={styles.txtMoreTail}>Xem tất cả</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ marginRight: 10 }}>
                      <BigPanel />
                    </View>
                    <View style={{ marginRight: 10 }}>
                      <BigPanel />
                    </View>
                  </View>
                </View>
              ) : newProduct?.length === 0 ? (
                <View
                  style={{ flexDirection: "column", paddingHorizontal: 24 }}
                >
                  <View style={styles.boxHeaderSearch}>
                    <View style={styles.store}>
                      <IconPopularTall />
                      <Text style={styles.txtStore}>Sản phẩm mới</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.stores}
                      onPress={() => onPressToViewMore("isProductNew")}
                    >
                      <Text style={styles.txtMoreTail}>Xem tất cả</Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      height: 200,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IconBasketSimpleRemove
                      width={40}
                      height={40}
                      stroke={colors.primary}
                    />
                    <Text style={styles.txtStore}>Không có sản phẩm nào</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.itemProduct}>
                  <View style={styles.boxHeaderSearch}>
                    <View style={styles.store}>
                      <IconPopularTall />
                      <Text style={styles.txtStore}>Sản phẩm mới</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.stores}
                      onPress={() => onPressToViewMore("isProductNew")}
                    >
                      <Text style={styles.txtMoreTail}>Xem tất cả</Text>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    contentContainerStyle={styles.containerStyle}
                    showsHorizontalScrollIndicator={false}
                    // horizontal
                    numColumns={2}
                    data={newProduct}
                    renderItem={({ item, index }: any) => (
                      <CardProduct
                        data={item}
                        marginBottom={true}
                        key={index}
                      />
                    )}
                  />
                </View>
              )}
            </View>
          )}
          {headerType === "product" && (
            <View>
              <View style={styles.subHeaderBar}>
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
              </View>
              {productType === "newProduct" && (
                <View>
                  {loading ? (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ marginRight: 10 }}>
                        <BigPanel />
                      </View>
                      <View style={{ marginRight: 10 }}>
                        <BigPanel />
                      </View>
                    </View>
                  ) : newProduct?.length === 0 ? (
                    <View
                      style={{
                        height: 200,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <IconBasketSimpleRemove
                        width={40}
                        height={40}
                        stroke={colors.primary}
                      />
                      <Text style={styles.txtStore}>Không có sản phẩm nào</Text>
                    </View>
                  ) : (
                    <View style={styles.itemProduct}>
                      <FlatList
                        contentContainerStyle={styles.containerStyle}
                        showsHorizontalScrollIndicator={false}
                        // horizontal
                        numColumns={2}
                        data={newProduct}
                        renderItem={({ item, index }: any) => (
                          <CardProduct
                            data={item}
                            marginBottom={true}
                            key={index}
                          />
                        )}
                      />
                    </View>
                  )}
                </View>
              )}
              {productType === "topSales" && (
                <View>
                  {loading ? (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ marginRight: 10 }}>
                        <BigPanel />
                      </View>
                      <View style={{ marginRight: 10 }}>
                        <BigPanel />
                      </View>
                    </View>
                  ) : products?.items?.length === 0 ? (
                    <View
                      style={{
                        height: 200,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <IconBasketSimpleRemove
                        width={40}
                        height={40}
                        stroke={colors.primary}
                      />
                      <Text style={styles.txtStore}>Không có sản phẩm nào</Text>
                    </View>
                  ) : (
                    <View style={styles.itemProduct}>
                      <FlatList
                        contentContainerStyle={styles.containerStyle}
                        showsHorizontalScrollIndicator={false}
                        // horizontal
                        numColumns={2}
                        data={products.items}
                        renderItem={({ item, index }: any) => (
                          <CardProduct
                            data={item}
                            marginBottom={true}
                            key={index}
                          />
                        )}
                      />
                    </View>
                  )}
                </View>
              )}
              {productType === "price" && (
                <View>
                  {loading ? (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ marginRight: 10 }}>
                        <BigPanel />
                      </View>
                      <View style={{ marginRight: 10 }}>
                        <BigPanel />
                      </View>
                    </View>
                  ) : products?.items?.length === 0 ? (
                    <View
                      style={{
                        height: 200,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <IconBasketSimpleRemove
                        width={40}
                        height={40}
                        stroke={colors.primary}
                      />
                      <Text style={styles.txtStore}>Không có sản phẩm nào</Text>
                    </View>
                  ) : (
                    dataPdPrices
                  )}
                </View>
              )}
            </View>
          )}
          {headerType === "allProduct" && (
            <View style={styles.allProduct}>
              {listCategoryNcc ? (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={listCategoryNcc?.items}
                  style={{ flex: 6 }}
                  contentContainerStyle={styles.allProductStyle}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      style={styles.tagProductView}
                      onPress={() =>
                        props.navigation.navigate(ScreenNames.SearchScreen, {
                          textSearchs: item?.name,
                        })
                      }
                    >
                      {/* <TagProduct
                        title={item?.name}
                        quantity={item?.totalProduct}
                        image={item?.image}
                      /> */}
                    </TouchableOpacity>
                  )}
                />
              ) : null}

              <View>
                <TagProduct
                  title="Tất cả sản phẩm"
                  quantity={listCategoryNcc?.totalCount}
                  hideImage={true}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.c_ffffff,
    // paddingHorizontal: 24,
    paddingTop: Platform.OS === "android" ? 30 : 0,
  },
  containerView: {
    backgroundColor: colors.c_4B4B4B,
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  detailInfo: {
    paddingBottom: 25,
    paddingTop: 14,
    flexDirection: "row",
    // paddingHorizontal: 24,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 55,
  },
  images: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  imageContainer: {
    // borderWidth: 1,
    backgroundColor: colors.c_ffffff,
    width: 55,
    height: 55,
    borderRadius: 55,
  },
  detailView: {
    marginLeft: 18,
  },
  textHeaderName: {
    lineHeight: 18,
    fontSize: 16,
    fontWeight: "600",
    color: colors.c_ffffff,
  },
  textHeaderTotal: {
    lineHeight: 18,
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
  },
  textHeaderStatus: {
    lineHeight: 18,
    fontSize: 12,
    fontWeight: "400",
    color: colors.c_D7D7D7,
  },
  detailRate: {
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
  },
  viewRate: {
    paddingLeft: 10,
  },
  rate: {
    color: colors.c_FEB336,
  },
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    // paddingVertical: 14,
    paddingHorizontal: 24,
  },
  subHeaderBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  headerBarShop: {
    borderBottomWidth: 2,
    borderBottomColor: colors.c_D7D7D7,
    paddingVertical: 14,
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  subHeaderBarShop: {
    paddingVertical: 0,
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
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
  headerBarShopSelect: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingVertical: 14,
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  txtHeaderBar: {
    lineHeight: 14,
    fontSize: 12,
    fontWeight: "500",
    color: colors.c_636366,
  },
  txtHeaderBarSelect: {
    lineHeight: 14,
    fontSize: 12,
    fontWeight: "500",
    color: colors.primary,
  },
  containerContent: {
    // paddingHorizontal: 24,
  },
  descriptionShop: {
    flexDirection: "row",
    height: 60,
    // justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  txtDescriptionShop: {
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 20,
    color: colors.c_48484A,
  },
  textDescriptionDetail: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 22,
    color: colors.c_636366,
  },
  textDescriptionDetailData: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 22,
    color: colors.c_636366,
    marginLeft: 20,
    flex: 1,
    justifyContent: "flex-end",
    textAlign: "right",
  },
  textDescriptionDetailDatas: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 22,
    color: colors.c_007AFF,
    marginLeft: 20,
    flex: 1,
    justifyContent: "flex-end",
    textAlign: "right",
    textDecorationColor: colors.c_007AFF,
    textDecorationLine: "underline",
  },
  descriptionDetailView: {
    paddingVertical: 12,
    backgroundColor: colors.c_00_002,
    marginHorizontal: 24,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  descriptionDetailViewWhite: {
    height: 54,
    backgroundColor: colors.c_ffffff,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  imageDescription: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    height: 221,
  },
  containerProduct: {
    paddingHorizontal: 24,
  },
  itemProduct: {
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingHorizontal: 24,
  },
  boxHeaderSearch: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
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
  allProduct: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  allProductStyle: {
    // paddingBottom: 10,
    paddingVertical: 5,
  },
  tagProductView: {
    paddingBottom: 14,
  },
  RowPanel: {
    marginBottom: 14,
  },
  containerStyle: {
    alignSelf: "flex-start",
  },
  stores: {
    // paddingVertical: 3,
    // paddingHorizontal: 12,
    backgroundColor: "rgba(102, 116, 3, 0.1)",
    borderRadius: 4,
    height: 20,
    width: 86,
    justifyContent: "center",
    alignContent: "center",
  },
  txtMoreTail: {
    color: colors.c_667403,
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default SupplierScreen;
