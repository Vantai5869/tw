import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { resetFormatNumber } from "../../../common/utils";
import Button from "../../../componets/Button";
import CardPerchase from "../../../componets/CardPerchase";
import InputSearch from "../../../componets/InputSearch";
import { MiniCart } from "../../../componets/MiniCart";
import { colors } from "../../../constants/colors";
import {
  icons,
  ShoppingCartBaseSVG,
  ShoppingCartCacnelSVG,
} from "../../../constants/icons";
import { translate } from "../../../locale";
import { ScreenNames } from "../../../navigation/screen";
import { useAppDispatch } from "../../../redux/hooks";
import {
  GetDistributorCart,
  selectDistributorCart,
} from "../../../redux/slice/Cart/distributor-cart";
import { getCategory, selectHome } from "../../../redux/slice/Home/home";
import { getTotalPrice, getTotalQuantity } from "../../cart/components/utils";
import FilterProduct from "./filter-product";
import HeaderSearchBar from "./search-bar";

const Purchase = ({ ...props }) => {
  const dispatch = useAppDispatch();
  const { carts } = useSelector(selectDistributorCart);
  const { listCategory } = useSelector(selectHome);

  const [isFilter, setIsFilter] = useState<boolean>(false);

  let listViewRef = useRef<ScrollView>(null);

  const handleOnChangeText = (value: string) => {};
  const onOpenFilter = () => {
    setIsFilter(true);
  };

  useEffect(() => {
    dispatch(GetDistributorCart());
    dispatch(getCategory({}));
  }, []);

  const handleOpenCart = () => {
    props.navigation.navigate(ScreenNames.Cart);
  };
  const upButtonHandler = () => {
    //OnCLick of Up button we scrolled the list to top
    //@ts-ignore
    (listViewRef as any)?.current?.scrollTo({ x: 0, animated: true });
    setActive(false);
  };

  const downButtonHandler = () => {
    //OnCLick of down button we scrolled the list to bottom
    (listViewRef as any)?.current?.scrollToEnd({ animated: true });
    setActive(true);
  };

  const [active, setActive] = useState<boolean>(false);

  const onScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isCloseToBottom(nativeEvent)) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: any) => {
    return layoutMeasurement.width + contentOffset.x >= contentSize.width;
  };

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <HeaderSearchBar
          {...props}
          showFilter={true}
          containerStyle={{ paddingVertical: 0 }}
        />

        {/* product scroll */}
        <View style={styles.product_scroll}>
          {listCategory?.length > 0 ? (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              ref={listViewRef}
              scrollEventThrottle={1}
              onScroll={onScroll}
            >
              <FlatList
                contentContainerStyle={{
                  alignSelf: "flex-start",
                  paddingHorizontal: 20,
                }}
                numColumns={Math.ceil(listCategory?.length / 2)}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={listCategory || []}
                renderItem={({ item, index }) => {
                  return (
                    <CardPerchase
                      source={item.avatar}
                      productName={item.name}
                    />
                  );
                }}
              />
            </ScrollView>
          ) : null}
          <View style={styles.scrollAction}>
            <TouchableOpacity
              onPress={upButtonHandler}
              style={[
                styles.btnPre,
                active && {
                  backgroundColor: "transparent",
                },
              ]}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={downButtonHandler}
              style={[
                styles.btnNext,
                active && {
                  backgroundColor: colors.primary,
                },
              ]}
            ></TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.cartArea}>
            <View>
              <View style={styles.cartImage}>
                {carts?.length ? (
                  <>
                    <ShoppingCartBaseSVG width={32} height={30} />
                    <View style={[styles.viewNumber, props.styleNumber]}>
                      <Text style={styles.txtNumber}>
                        {resetFormatNumber(getTotalQuantity(carts) || "") > 99
                          ? "99+"
                          : getTotalQuantity(carts)}
                      </Text>
                    </View>
                  </>
                ) : (
                  <ShoppingCartCacnelSVG width={32} height={30} />
                )}
              </View>
            </View>
            <Text style={styles.contentCart}>
              {carts?.length
                ? translate("you_have_product_in_cart", {
                    number: getTotalQuantity(carts),
                  })
                : translate("no_product_in_cart")}
            </Text>
          </View>

          <View style={styles.paymentInfo}>
            <View style={styles.number}>
              <Text style={styles.textNumber}>
                {translate("total_quantity")}
              </Text>
              <Text style={styles.textNumber}>
                {/* {resetFormatNumber(getTotalQuantity(carts) || "0") > 0
                  ? translate("number_product", {
                      number: getTotalQuantity(carts),
                    })
                  : 0} */}
                {getTotalQuantity(carts)}
              </Text>
            </View>
            <View style={styles.cost}>
              <Text style={styles.textCost}>{translate("total_price")}</Text>
              <Text style={styles.textCost}>{getTotalPrice(carts)}đ</Text>
            </View>
          </View>


        </View>

        <FilterProduct
          modalVisible={isFilter}
          setIsModal={() => setIsFilter(!isFilter)}
          {...props}
        />
      </ScrollView>
      <View style={styles.buttons}>
            <Button
              textButton={translate("view_cart")}
              onPress={handleOpenCart}
              styleText={styles.btnTextView}
              styleBackground={styles.btnView}
            />
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: colors.c_ffffff,
  },
  viewSearchSort: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 6,
    paddingHorizontal: 25,
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
    backgroundColor: colors.c_ffffff,
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
    tintColor: colors.c_ffffff,
  },
  product_scroll: {
    marginTop: 14,
  },
  scrollAction: {
    marginTop: 13,
    flexDirection: "row",
    width: 38,
    backgroundColor: colors.c_blue,
    borderRadius: 40,
    height: 4,
    alignSelf: "center",
  },
  btnPre: {
    backgroundColor: colors.primary,
    width: 19,
    borderRadius: 40,
  },
  btnNext: {
    width: 19,
    borderRadius: 40,
  },
  content: {
    marginTop: 27,
    paddingHorizontal: 25,
  },
  cartArea: {
    // alignSelf:'center',
    flexDirection: "column",
    alignItems: "center",
    height: 147,
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.c_ffffff,
  },
  cartImage: {
    backgroundColor: colors.c_blue,
    borderRadius: 100,
    marginTop: 31,
    width: 52,
    height: 52,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  contentCart: {
    marginTop: 12,
    fontSize: 12,
    color: colors.c_7B7B80,
    fontWeight: "600",
  },
  paymentInfo: {
    width: "100%",
    marginTop: 21,
  },
  number: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.c_F3F4F6,
    paddingTop: 10,
    paddingBottom: 5,
  },
  cost: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.c_F3F4F6,
    paddingTop: 10,
    paddingBottom: 5,
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
  btnImport: {
    backgroundColor: colors.c_A6BA1A,
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 10,
  },
  btnView: {
    backgroundColor: colors.c_ffffff,
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    flex: 1,
  },
  btnTextImport: {
    fontSize: 13,
    lineHeight: 22,
    fontWeight: "500",
    color: colors.c_ffffff,
  },
  btnTextView: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "500",
    color: colors.primary,
  },
  buttons: {
    paddingHorizontal: 24,
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  viewNumber: {
    position: "absolute",
    top: 12,
    right: 10,
    backgroundColor: "#FCC22D",
    width: 13,
    height: 13,
    borderRadius: 13,
  },
  styleNumber: { top: 5, right: 5 },
  icon: {
    width: 24,
    height: 24,
  },
  txtNumber: {
    fontSize: 6,
    fontWeight: "500",
    lineHeight: 12,
    color: colors.c_ffffff,
    textAlign: "center",
  },
});

export default Purchase;
