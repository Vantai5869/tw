import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CardProductManager from "../../componets/CardProductManager";
import BigPanel from "../../componets/LoadingAnimation/BigPanel";
import { colors } from "../../constants/colors";
import {
  IconBox,
  IconBoxBlack,
  IconDeliveryTime,
  IconPencil1,
  icons,
  IconShoppingBag,
  IconTagLoyalty,
  IconTagSale,
  IconTagSaleBlack,
} from "../../constants/icons";
import { MEDIA } from "../../constants/media";
import i18n from "../../locale";
import { ScreenNames } from "../../navigation/screen";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectHome } from "../../redux/slice/Home/home";
import { keyWordFromHome } from "../../redux/slice/Sales/product";
import {
  getMyTopProductOutOfStockWarning,
  getMyTopProductSelling,
  getOverview,
  selectWareHome,
} from "../../redux/slice/warehouses/home";
import {
  GetListProductWareHouse,
  resetList,
  selectProductWarehouse,
} from "../../redux/slice/warehouses/products-warehouse";

import OverviewCard from "./components/OverviewCard";

const Warehouse = ({ ...props }) => {
  const dispatch = useAppDispatch();
  const {
    overview,
    myTopProductSelling,
    myTopProductOutOfStockWarning,
    loading: loadingOverview,
  } = useAppSelector(selectWareHome);

  const { products, loading: loadingAllProduct } = useAppSelector(
    selectProductWarehouse
  );

  const [searchValue, setSearchValue] = useState("");
  const isFocus = useIsFocused();
  const insets = useSafeAreaInsets();
  const { listSellingProduct, loading: sellingProductTinwin } =
    useAppSelector(selectHome);

  const gotoScreen = (
    screen: string,
    title?: string,
    filter?: number,
    textSearch?: string
  ) => {
    props.navigation.navigate(screen, {
      title: title,
      filter: filter,
      textSearch: searchValue,
    });
  };
  const handleSearch = () => {
    if (searchValue != "") {
      gotoScreen(ScreenNames.AllProduct, "all_product", 0, searchValue);
      setSearchValue("");
    }
  };

  const onPressToViewMore = (item: any) => {
    // call api theo keyword
    dispatch(keyWordFromHome(item));
    props.navigation.navigate(ScreenNames.SearchHome as any);
  };

  useEffect(() => {
    if (isFocus) {
      dispatch(getOverview(""));
      dispatch(GetListProductWareHouse({}));
      //log
    } else dispatch(resetList());
  }, [isFocus]);

  useEffect(() => {
    dispatch(getMyTopProductOutOfStockWarning(""));
    dispatch(getMyTopProductSelling(""));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={MEDIA.IMAGE_BG_IMPORTPD}
        style={[styles.bgImage, { paddingTop: insets.top + 15 }]}
      >
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.profileBox}
            onPress={() => {
              gotoScreen(ScreenNames.Profile);
            }}
          >
            <Image
              style={styles.iconUser}
              source={MEDIA.IMAGE_HUAWAI}
              resizeMode="contain"
            />
            <View style={styles.editBox}>
              <IconPencil1 fill="white" />
            </View>
          </TouchableOpacity>
          <View style={styles.contentDL}>
            <Text style={styles.userName}>Nguyễn Hoàng Anh</Text>
            <TouchableOpacity style={styles.buttonDL}>
              <Text style={styles.textBT}>Đại Lý</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.paddingHorizontal}>
        <View style={styles.overviewCard}>
          <OverviewCard
            onPress={() => gotoScreen(ScreenNames.AllProduct, "all_product")}
            bg={colors.c_EAF4FF}
            number={overview?.productCount}
            title={i18n.t("product")}
            icon={<IconShoppingBag />}
          />
          <OverviewCard
            onPress={() => gotoScreen(ScreenNames.ProductByIndustry)}
            bg={colors.c_FFF4E5}
            number={overview?.categoryCount}
            title={i18n.t("industry")}
            icon={<IconBox />}
          />
          <OverviewCard
            onPress={() =>
              gotoScreen(
                ScreenNames.ProductWFilter,
                "product_out_of_stock_soon",
                1
              )
            }
            bg={colors.c_FFF2F1}
            number={overview?.minStockProductWarningCount}
            title={i18n.t("out_of_stock_soon")}
            icon={<IconTagSale />}
          />
          <OverviewCard
            onPress={() =>
              gotoScreen(ScreenNames.ProductWFilter, "product_entering", 2)
            }
            bg={colors.c_F6F8ED}
            number={overview?.orderShippingCount}
            title={i18n.t("entering")}
            icon={<IconDeliveryTime />}
          />
        </View>
        <View style={styles.searchBox}>
          <View style={styles.viewInput}>
            <Image
              style={styles.icon}
              source={icons.ICON_SEARCH}
              resizeMode="contain"
            />
            <TextInput
              style={styles.textInput}
              placeholder="Nhập từ khoá tìm kiếm"
              placeholderTextColor={colors.c_48484A}
              value={searchValue}
              onChangeText={(e) => setSearchValue(e)}
              onEndEditing={() => {
                handleSearch();
              }}
            />
          </View>
        </View>
      </View>

      <View style={styles.contentWapper}>
        <View style={[styles.boxHeader, styles.paddingHorizontal]}>
          <View style={styles.left}>
            <IconTagLoyalty />
            <Text style={styles.leftText}>Sản phẩm bán chạy của đại lý</Text>
          </View>
          <TouchableOpacity
            onPress={() => onPressToViewMore("isSellingProducts")}
          >
            <Text style={styles.rightText}>Xem thêm</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lists}>
          <ScrollView
            contentContainerStyle={styles.paddingHorizontal}
            horizontal={true}
            showsVerticalScrollIndicator={true}
            showsHorizontalScrollIndicator={false}
          >
            {loadingOverview
              ? [1, 2, 3].map((item: any, index) => (
                  <View style={styles.bigPanel} key={index}>
                    <BigPanel key={index} />
                  </View>
                ))
              : myTopProductSelling?.items?.map((item: any, index) => (
                  <CardProductManager
                    data={{
                      name: item.name,
                      price: item.price,
                      sold: item.soldQuantity,
                      source: item.image !== null ? item.image[0] : null,
                      id: item.id,
                      description: item.description,
                      packingSize: item.packingSize,
                      quantity: item.totalQuantity,
                    }}
                    marginBottom={false}
                    key={index}
                  />
                ))}
          </ScrollView>
        </View>
        <View style={[styles.boxHeader, styles.paddingHorizontal]}>
          <View style={styles.left}>
            <IconTagLoyalty />
            <Text style={styles.leftText}>Sản phẩm bán chạy của TinWin</Text>
          </View>
          <TouchableOpacity
            onPress={() => onPressToViewMore("isSellingProducts")}
          >
            <Text style={styles.rightText}>Xem thêm</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lists}>
          <ScrollView
            contentContainerStyle={styles.paddingHorizontal}
            horizontal={true}
            showsVerticalScrollIndicator={true}
            showsHorizontalScrollIndicator={false}
          >
            {sellingProductTinwin
              ? [1, 2, 3]?.map((item: any, index) => (
                  <View style={styles.bigPanel} key={index}>
                    <BigPanel key={index} />
                  </View>
                ))
              : listSellingProduct?.items?.map((item: any, index: number) => (
                  <CardProductManager
                    data={{
                      name: item.name,
                      price: item.price,
                      sold: item.soldQuantity,
                      source: item.image !== null ? item.image[0] : null,
                      id: item.id,
                      description: item.description,
                      packingSize: item.packingSize,
                      quantity: item.totalQuantity,
                    }}
                    marginBottom={false}
                    key={index}
                  />
                ))}
          </ScrollView>
        </View>

        <View style={[styles.boxHeader, styles.paddingHorizontal]}>
          <View style={styles.left}>
            <IconTagSaleBlack />
            <Text style={styles.leftText}>Sản phẩm sắp hết hàng</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              gotoScreen(
                ScreenNames.ProductWFilter,
                "product_out_of_stock_soon",
                1
              )
            }
          >
            <Text style={styles.rightText}>Xem thêm</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lists}>
          <ScrollView
            contentContainerStyle={styles.paddingHorizontal}
            horizontal={true}
            showsVerticalScrollIndicator={true}
            showsHorizontalScrollIndicator={false}
          >
            {loadingOverview
              ? [1, 2, 3]?.map((item: any, index) => (
                  <View style={styles.bigPanel} key={index}>
                    <BigPanel key={index} />
                  </View>
                ))
              : myTopProductOutOfStockWarning?.items?.map(
                  (item: any, index) => (
                    <CardProductManager
                      data={{
                        name: item.name,
                        price: item.price,
                        sold: item.soldQuantity,
                        source: item.image !== null ? item.image[0] : null,
                        id: item.id,
                        description: item.description,
                        packingSize: item.packingSize,
                        quantity: item.totalQuantity,
                      }}
                      marginBottom={false}
                      key={index}
                    />
                  )
                )}
          </ScrollView>
        </View>

        <View style={[styles.boxHeader, styles.paddingHorizontal]}>
          <View style={styles.left}>
            <IconBoxBlack />
            <Text style={styles.leftText}>Tất cả các mặt hàng</Text>
          </View>
          <TouchableOpacity
            onPress={() => gotoScreen(ScreenNames.AllProduct, "all_product")}
          >
            <Text style={styles.rightText}>Xem thêm</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lists}>
          <ScrollView
            contentContainerStyle={styles.paddingHorizontal}
            horizontal={true}
            showsVerticalScrollIndicator={true}
            showsHorizontalScrollIndicator={false}
          >
            {loadingAllProduct
              ? [1, 2, 3]?.map((item: any, index) => (
                  <View style={styles.bigPanel} key={index}>
                    <BigPanel key={index} />
                  </View>
                ))
              : products?.items?.map((item: any, index) => (
                  <CardProductManager
                    data={{
                      name: item.name,
                      price: item.price,
                      sold: item.soldQuantity,
                      source: item.image !== null ? item.image[0] : null,
                      id: item.id,
                      description: item.description,
                      packingSize: item.packingSize,
                      quantity: item.totalQuantity,
                    }}
                    marginBottom={false}
                    key={index}
                  />
                ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  bgImage: {
    width: "100%",
    height: 163,
    marginBottom: 19,
  },
  content: {
    // paddingTop: 73,
    paddingHorizontal: 24,
    flexDirection: "row",
  },
  iconUser: {
    width: 64,
    height: 64,
    borderRadius: 64,
    overflow: "hidden",
  },
  contentDL: {
    paddingLeft: 17,
    paddingTop: 5,
  },
  userName: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "600",
    color: colors.c_ffffff,
    textTransform: "uppercase",
  },
  buttonDL: {
    borderRadius: 50,
    width: 57,
    marginTop: 6,
    paddingVertical: 3.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.c_667403,
  },
  textBT: {
    fontSize: 12,
    color: colors.c_ffffff,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 12,
  },
  paddingHorizontal: {
    paddingHorizontal: 25,
  },
  bigPanel: {
    marginRight: 10,
    marginBottom: 10,
  },
  overviewCard: {
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  inputSearch: {
    flex: 1,
    height: 43,
  },
  searchBox: {
    marginTop: 23,
  },
  boxHeader: {
    marginTop: 32,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    flex: 1,
  },
  leftText: {
    marginLeft: 10,
    fontSize: 16,
    lineHeight: 20,
    maxWidth: "70%",
    fontWeight: "700",
    color: colors.c_48484A,
  },
  rightText: {
    color: colors.c_667403,
    backgroundColor: "rgba(102, 116, 3, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 4,
  },
  containerStyle: {
    alignSelf: "flex-start",
  },
  lists: {
    marginTop: 19,
  },
  profileBox: {},
  editBox: {
    position: "absolute",
    bottom: 0,
    right: -2,
    width: 17,
    height: 17,
    backgroundColor: colors.c_667403,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 17,
  },
  contentWapper: {
    paddingBottom: 50,
  },

  viewInput: {
    flex: 1,
    height: 43,
    width: "100%",
    paddingHorizontal: 11,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.c_ffffff,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
    paddingVertical: Platform.OS === "ios" ? 0 : 0,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 14.3,
  },
  textInput: {
    fontWeight: "400",
    fontSize: 14,
    height: 43,
    color: colors.c_48484A,
  },
});

export default Warehouse;
