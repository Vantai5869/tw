import { useNavigation } from "@react-navigation/native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  Image,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { DIMENSIONS } from "../../common/utils";
import BankCard from "../../componets/BankCard";
import CardBigImageTitle from "../../componets/CardBigImageTitle";
import CardImageTitle from "../../componets/CardImageTitle";
import CardProduct from "../../componets/CardProduct";
import BankCardPanel from "../../componets/LoadingAnimation/BankCardPanel";
import BigPanel from "../../componets/LoadingAnimation/BigPanel";
import SmallPanel from "../../componets/LoadingAnimation/SmallPanel";
import SupplierPanel from "../../componets/LoadingAnimation/SupplierPanel";
import { MiniCart } from "../../componets/MiniCart";
import { colors } from "../../constants/colors";
import {
  IconMorning,
  IconPopularTall,
  IconShoppingBlue,
  IconStoree,
  IconTagLoyalty,
  IconTrackDelivery,
  IconZoom,
} from "../../constants/icons";
import { MEDIA } from "../../constants/media";
import { translate } from "../../locale";
import { ScreenNames } from "../../navigation/screen";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getCategory,
  getGreeting,
  getNewProduct,
  getSellingProduct,
  getSupplier,
  selectHome,
  getUserInfor,
  getWallet,
} from "../../redux/slice/Home/home";
import {
  selectSupplier,
  SupplierSearch,
} from "../../redux/slice/Partnership/supplier";
import { keyWordFromHome } from "../../redux/slice/Sales/product";
import HeaderSearchBar from "../importProduct/purchase/search-bar";

export default function HomePage({ ...props }) {
  const dispatch = useAppDispatch();
  const {
    listNewProduct,
    listSellingProduct,
    listSupplier,
    greeting,
    listCategory,
    listUserInfor,
    dataWallet,
  } = useSelector(selectHome);
  const { suppliers } = useAppSelector(selectSupplier);
  const [category, setCategory] = useState([]);
  const [newProduct, setNewProduct] = useState([]);
  const [sellingProduct, setSellProduct] = useState([]);
  const [isGreeting, setIsGreeting] = useState("");
  const [supplier, setSupplier] = useState([]);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [blankData, setBlankData] = useState(["", "", "", "", "", ""]);
  useEffect(() => {
    dispatch(getGreeting(""));
    dispatch(getCategory(""));
    dispatch(getNewProduct(""));
    dispatch(getSellingProduct(""));
    dispatch(SupplierSearch({}));
    dispatch(getUserInfor(""));
    // get data for home screen
  }, []);

  useEffect(() => {
    setNewProduct(listNewProduct.items);
    setSupplier(suppliers);
    setCategory(listCategory);
    setSellProduct(listSellingProduct.items);
    setIsGreeting(greeting);
  }, [listNewProduct, listSellingProduct, greeting, suppliers, listCategory]);

  const onSubmitSearch = () => {
    setTimeout(() => {
      navigation.navigate(ScreenNames.SearchHome as any);
    }, 600);
  };
  const onPressToViewMore = (item: any) => {
    // call api theo keyword
    dispatch(keyWordFromHome(item));
    navigation.navigate(ScreenNames.SearchHome as any);
  };
  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setCategory([]);
    setSellProduct([]);
    setNewProduct([]);
    setSupplier([]);
    dispatch(getGreeting(""));
    dispatch(getCategory(""));
    dispatch(getNewProduct(""));
    dispatch(getSellingProduct(""));
    dispatch(getSupplier(""));
    dispatch(getUserInfor(""));
    if (
      category?.length > 0 ||
      sellingProduct?.length > 0 ||
      newProduct?.length > 0 ||
      supplier?.length > 0
    ) {
      setRefreshing(false);
    }
  }, [category, sellingProduct, newProduct, supplier]);

  const gotoScreen = (
    screen: string,
    title?: string,
    id?: string,
    name?: string
  ) => {
    props.navigation.navigate(screen, { title: title, id: id, name: name });
  };

  useLayoutEffect(() => {
    dispatch(getWallet({ UserId: listUserInfor?.name }));
  }, [listUserInfor]);

  return (
    <SafeAreaView style={styles.containerSAR}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.containerHome}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.container}>
          <View style={styles.headers}>
            <Image source={MEDIA.IMAGE_LOGO} style={styles.iconLogo} />

            <View style={[styles.rows, styles.day]}>
              <IconMorning width={18} height={18} style={styles.iconStore} />
            </View>
            <View style={styles.marqueeContainer}>
              <Text style={styles.textDay}>
                {isGreeting ? isGreeting : "Chúc bạn ngày mới vui vẻ!"}
              </Text>
            </View>
          </View>
          <View style={styles.viewSearchSort}>
            <TouchableOpacity
              onPress={() => onSubmitSearch()}
              style={styles.inputSearch}
            >
              <IconZoom width={18} height={18} stroke={colors.c_7B7B80} />
              <Text style={styles.txtSearch} numberOfLines={1}>
                {translate("enter_keyword_search")}
              </Text>
            </TouchableOpacity>
            <MiniCart />
          </View>
        </View>
        <View style={styles.containerBankCard}>
          <BankCard {...props} />
        </View>
        <View style={styles.viewImageCards}>
          <View style={styles.viewNH}>
            <IconTrackDelivery />
            <Text style={styles.textNH}>Ngành hàng</Text>
          </View>
          <View style={styles.viewImageCard}>
            {category?.length > 0 ? (
              <ScrollView
                horizontal
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[
                  styles.scrollViewOutLine,
                  {
                    width:
                      category?.length % 2 != 0
                        ? ((DIMENSIONS.width / 5 + 30) *
                            (category.length - 1)) /
                            2 +
                          18 +
                          (DIMENSIONS.width / 5 + 30)
                        : ((DIMENSIONS.width / 5 + 30) * category?.length) / 2 +
                          18,
                  },
                ]}
                nestedScrollEnabled
              >
                {category?.map((item: any, index: number) => (
                  <TouchableOpacity
                    onPress={() =>
                      gotoScreen(
                        ScreenNames.AllProduct,
                        item?.name,
                        "home",
                        item?.id
                      )
                    }
                    key={item.id}
                  >
                    <CardImageTitle data={item} key={item?.id} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <ScrollView
                horizontal
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[
                  styles.scrollViewOutLine,
                  {
                    width:
                      ((DIMENSIONS.width / 5 + 30) * blankData?.length) / 2 +
                      18,
                  },
                ]}
                nestedScrollEnabled
              >
                {blankData?.map((item: any, index: number) => (
                  <View
                    key={index}
                    style={{ marginHorizontal: 15, marginVertical: 10 }}
                  >
                    <SmallPanel />
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
        <View style={styles.containerProducts}>
          <View style={styles.boxHeaderSearchTW1}>
            <View style={styles.store1}>
              <IconTagLoyalty />
              <View style={styles.titleBestSale}>
                <Text numberOfLines={2} style={styles.txtStore1}>
                  Sản phẩm bán chạy
                </Text>
                <Text style={styles.txtStore1}>của TinWin</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.stores}
              onPress={() => onPressToViewMore("isSellingProducts")}
            >
              <Text style={styles.txtMoreTail}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          {sellingProduct?.length > 0 ? (
            <ScrollView
              contentContainerStyle={styles.containerSellingProduct}
              horizontal={true}
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={false}
            >
              {sellingProduct?.map((item: any, index) => (
                <CardProduct data={item} marginBottom={false} key={index} />
              ))}
            </ScrollView>
          ) : (
            <ScrollView
              contentContainerStyle={styles.containerSellingProduct}
              horizontal={true}
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={false}
            >
              {blankData?.map((item: any, index: number) => (
                <View key={index} style={{ marginRight: 10, marginBottom: 10 }}>
                  <BigPanel />
                </View>
              ))}
            </ScrollView>
          )}
        </View>
        <View style={styles.containerNewProduct}>
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

          {newProduct?.length > 0 ? (
            <View style={styles.itemProduct}>
              <FlatList
                contentContainerStyle={styles.containerStyle}
                showsHorizontalScrollIndicator={false}
                // horizontal
                numColumns={2}
                data={newProduct}
                renderItem={({ item, index }: any) => (
                  <CardProduct data={item} marginBottom={true} key={index} />
                )}
              />
            </View>
          ) : (
            <View style={styles.containerStore}>
              {blankData?.map((item, index) => (
                <View key={index} style={{ marginRight: 10, marginBottom: 10 }}>
                  <BigPanel key={index} />
                </View>
              ))}
            </View>
          )}
        </View>
        <View style={styles.viewImageCard}>
          <View style={styles.boxHeaderSearch}>
            <View style={styles.store}>
              <IconStoree />
              <Text style={styles.txtStore}>Nhà cung cấp mới</Text>
            </View>
            <TouchableOpacity
              style={styles.stores}
              onPress={() => onPressToViewMore("isNewSupplier")}
            >
              <Text style={styles.txtMoreTail}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
        </View>
        {supplier?.length > 0 ? (
          <View>
            <ScrollView
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[
                styles.contentContainerStyle,
                {
                  width:
                    supplier?.length % 2 !== 0
                      ? (((DIMENSIONS.width - 56) / 2 + 6) *
                          (supplier?.length + 1)) /
                          2 +
                        42
                      : (((DIMENSIONS.width - 56) / 2 + 6) * supplier?.length) /
                          2 +
                        42,
                },
              ]}
            >
              {supplier?.map((item: any, index: number) => (
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate(ScreenNames.SupplierScreen, {
                      id: item?.id,
                    });
                  }}
                >
                  <CardBigImageTitle data={item} key={item?.id} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ) : (
          <View style={styles.contentContainerStyle}>
            {blankData?.map((item, index) => (
              <View
                key={index}
                style={{ marginHorizontal: 3, marginBottom: 17 }}
              >
                <SupplierPanel />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  containerSAR: {
    padding: Platform.OS === "android" ? 30 : 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    backgroundColor: colors.c_ffffff,
  },
  containerHome: {
    backgroundColor: colors.c_ffffff,
  },
  containerSellingProduct: {
    paddingHorizontal: 24,
  },
  scrollViewOutLine: {
    paddingBottom: 20,
    paddingLeft: 9,
    paddingRight: 9,
    // backgroundColor: "blue",

    flexWrap: "wrap",
  },
  container: {
    paddingHorizontal: 24,
  },
  viewSearchSort: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
    marginTop: 15,
  },
  boxSort: {
    marginLeft: 10,
    width: 43,
    height: 43,
    backgroundColor: colors.secondary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  icon: {
    width: 16,
    height: 16,
  },
  iconRigth: {
    width: 10,
    height: 10,
    tintColor: colors.c_999999,
  },
  containerBoxImage: {
    paddingLeft: 24,
    paddingBottom: 20,
  },
  viewImageCard: {
    // paddingLeft: 9,
    // paddingHorizontal: 9,
    // paddingTop: 12,
    // paddingHorizontal: 24,
  },
  viewImageCards: {
    // paddingLeft: 10,
    paddingTop: 15,
  },
  containerBankCard: {
    paddingHorizontal: 24,
    marginBottom: 15,
  },
  containerStandoutBooth: {
    paddingLeft: 24,
  },
  boxHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
    paddingRight: 24,
  },
  boxHeaderSearch: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    alignItems: "center",
    paddingHorizontal: 24,
    // borderColor: "red",
    // borderWidth: 1,
  },
  boxHeaderSearchTW: {
    // borderColor: "red",
    // borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
    // paddingRight: 24,
    paddingHorizontal: 24,
  },
  boxHeaderSearchTW1: {
    // borderColor: "red",
    // borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    marginBottom: 28,
    // paddingRight: 24,
    paddingHorizontal: 24,
  },
  stores: {
    // paddingVertical: 3,
    // paddingHorizontal: 12,
    backgroundColor: colors.c_blue,
    borderRadius: 4,
    height: 20,
    width: 86,
    justifyContent: "center",
    alignContent: "center",
  },
  store: {
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
  },
  store1: {
    flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
  },
  iconStore: {
    marginRight: 9,
  },
  txtStore: {
    color: colors.c_1F1F1F,
    padding: 8.83,
    fontSize: 16,
    fontWeight: "bold",
    // textAlign: "center",
  },
  txtStore1: {
    color: colors.c_1F1F1F,
    fontSize: 16,
    fontWeight: "bold",
    // textAlign: "center",
  },
  txtMore: {
    color: colors.c_667403,
    fontSize: 12,
    fontWeight: "500",
  },
  txtMoreTail: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
  containerStore: {
    marginBottom: 45,
    width: DIMENSIONS.width,
    flexWrap: "wrap",
    flexDirection: "row",
    paddingLeft: 20,
  },

  containerNewProduct: {
    // paddingHorizontal: 18.5,
    paddingVertical: 20,
  },
  containerProducts: {
    // paddingLeft: 12,
    paddingVertical: 7,
  },
  itemProduct: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingHorizontal: 25,
  },
  day: {
    marginVertical: 14,
  },
  textDay: {
    fontWeight: "600",
    fontSize: 16,
    color: colors.primary,
  },
  rows: {
    flexDirection: "row",
  },
  headers: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconLogo: {
    width: 47,
    height: 36,
    marginRight: 20,
  },
  textNH: {
    paddingLeft: 8.83,
    color: colors.c_48484A,
    fontSize: 16,
    fontWeight: "bold",
  },
  viewNH: {
    paddingHorizontal: 24,
    flexDirection: "row",
    // paddingLeft: 14,
    alignItems: "center",
    paddingVertical: 6,
  },
  marqueeContainer: {},
  contentContainerStyle: {
    alignSelf: "flex-start",
    paddingHorizontal: 21,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  containerStyle: {
    alignSelf: "flex-start",
  },
  titleBestSale: {
    paddingLeft: 10,
  },
  headerSearchBar: {
    marginBottom: 10,
    marginTop: 20,
    flexDirection: "row",
    height: 43,
    flex: 1,
    justifyContent: "space-between",
  },
  iconCart: {
    width: 43,
    height: 43,
    marginLeft: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  inputSearchs: {
    flex: 1,
  },
  txtSearch: {
    fontSize: 14,
    lineHeight: 18,
    color: colors.c_7B7B80,
    marginLeft: 7,
    flex: 1,
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
  iconSort: {
    marginLeft: 7,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10.5,
    paddingVertical: 11.5,
  },
  loaderPara: {
    marginTop: 0,
    marginRight: 0,
  },
  loaderContainer: {
    width: DIMENSIONS.width / 5,
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 10,
    paddingLeft: 0,
  },
  sellingProductLoader: {
    width: (DIMENSIONS.width - 60) / 2,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.c_000_01,
    backgroundColor: colors.c_ffffff,
    borderRadius: 10,
    // paddingHorizontal: 13,
    paddingLeft: 0,
    marginBottom: 10,
  },
  sellingProductImageLoader: {
    width: (DIMENSIONS.width - 60) / 2 - 2,
    height: ((DIMENSIONS.width - 60) / 2) * 0.75,
    marginBottom: 10,
  },
  supplierLoader: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 3,
    width: (DIMENSIONS.width - 56) / 2,
    marginBottom: 17,
    paddingLeft: 0,
  },
  supplierimageLoader: {
    backgroundColor: colors.c_light_gray,
    width: (DIMENSIONS.width - 56) / 2,
    height: (DIMENSIONS.width - 56) / 2 - 26,
    borderRadius: 10,
  },
});
