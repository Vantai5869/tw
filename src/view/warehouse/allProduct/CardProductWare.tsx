import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { batch, useDispatch, useSelector } from "react-redux";
import { DIMENSIONS, getIds } from "../../../common/utils";
import { colors } from "../../../constants/colors";
import { IconPen, IconShoppingCarts } from "../../../constants/icons";
import { MEDIA } from "../../../constants/media";
import i18n, { translate } from "../../../locale";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  getMoreMyTopProductOutOfStockWarning,
  getMyTopProductOutOfStockWarning,
  selectWareHome,
} from "../../../redux/slice/warehouses/home";
import {
  GetListProductWareHouse,
  GetMoreListProductWareHouse,
  GetQuantity,
  GetQuantityOutStock,
  resetError,
  resetList,
  resetProductFilter,
  resetUpdateStatus,
  selectProductWarehouse,
  UpdateQuanity,
  UpdateQuanityOutStock,
} from "../../../redux/slice/warehouses/products-warehouse";
import {
  FilterType,
  GetListReq,
} from "../../../redux/type/warehouses/distributor-stock-inventory";
import { IProduct } from "../../../redux/type/warehouses/home";
import { getReadyProduct, onBuyNow } from "../../cart/components/utils";
import { GradientView } from "../../../componets/GradientView";
import {
  AddDistributorCart,
  handleProductId,
  resetCartState,
  selectDistributorCart,
} from "../../../redux/slice/Cart/distributor-cart";
import { QUANTITY } from "../../../constants/untils";
import Alerts from "../../../componets/Alerts";
import { navigate } from "../../../navigation/navigate";
import { ScreenNames } from "../../../navigation/screen";
interface Props {
  sortType?: number;
  sortField?: number;
  idCategory?: string[];
  filterType?: number;
  textSearch?: string;
  loadmore: boolean;
  setLoadmore: (e: boolean) => void;
}
const CardProductWare: React.FC<Props> = ({
  sortType,
  sortField,
  idCategory,
  filterType,
  textSearch,
  setLoadmore,
  loadmore,
}) => {
  const dispatch = useAppDispatch();
  const {
    products,
    loading,
    updateStatus,
    getQuantityStatus,
    filterProduct,
    loadQuantity,
    myTopProductOutOfStockWarning,
    lastModificationTime,
    error,
  } = useAppSelector(selectProductWarehouse);

  const [checked, setChecked] = useState("");
  const [edit, setEdit] = useState("");
  const [textValue, setTextValue] = useState("0");
  const isfocus = useIsFocused();
  const currentTime = new Date().getTime();
  const DateTime = Date.now();
  const date = new Date(currentTime).toLocaleString("en-GB").replace(",", "");
  const [skip, setSkip] = useState(0);
  const [outOfStock, setOutOfStock] = useState(false);
  const [active, setActive] = useState<boolean>(false);
  const { addToCartSuccess, productId, errors } = useSelector(
    selectDistributorCart
  );
  const handleChangeText = (e: string, quantity: number) => {
    if (Number(e) > quantity) {
      setTextValue(quantity.toString());
    } else setTextValue(e);
  };

  useLayoutEffect(() => {
    if (loadmore) {
      const next = skip;
      setSkip(next + 4);
    }
  }, [loadmore]);
  useEffect(() => {
    if (isfocus) {
      setSkip(0);
    }
  }, [sortField, isfocus]);
  useEffect(() => {
    if (!loading) {
      setLoadmore(false);
    }
  }, [loading]);
  const getProducts = (
    filter: FilterType,
    textSearch: string,
    more: boolean,
    outStock: boolean
  ) => {
    // const arr = ['a','b'].push('c')
    const listCategoryId = getIds(
      filter?.ListCategoryId?.filter((el) => el?.id !== "-1")
    ).concat(idCategory);
    const params: GetListReq = {
      ...filter,
      ListCategoryId: listCategoryId,
      ListSupplierId: getIds(
        filter?.ListSupplierId?.filter((el) => el?.id !== "-1")
      ),
      skip: more ? skip : 0,
      take: 4,
      SortField: sortField,
      SortType: sortType,
      TextSearch: textSearch,
    };
    batch(() => {
      if (!outStock) {
        more
          ? dispatch(GetMoreListProductWareHouse(params))
          : dispatch(GetListProductWareHouse(params));
      } else if (outStock === true) {
        more
          ? dispatch(getMoreMyTopProductOutOfStockWarning(params))
          : dispatch(getMyTopProductOutOfStockWarning(params));
      }
      // setMore(false);
    });
  };
  useEffect(() => {
    setSkip(0);
    if (filterType !== 1 && filterType !== 2) {
      getProducts(filterProduct, textSearch, false, false);
    } else if (filterType === 1) {
      getProducts(filterProduct, textSearch, false, true);
    }
  }, [sortType, sortField, textSearch, filterProduct, isfocus]);
  useEffect(() => {
    if (isfocus && skip != 0) {
      if (filterType !== 1 && filterType !== 2) {
        getProducts(filterProduct, textSearch, true, false);
      } else if (filterType === 1) {
        getProducts(filterProduct, textSearch, true, true);
      }
    }
  }, [skip]);
  useEffect(() => {
    if (!isfocus) {
      dispatch(resetList());
      dispatch(resetProductFilter());
    }
  }, [isfocus]);
  const getQuantity = (id: string) => {
    setChecked(id);
    setEdit(id);
    dispatch(GetQuantity(id));
  };
  const getQuantityOutstock = (id: string) => {
    setChecked(id);
    setEdit(id);
    dispatch(GetQuantityOutStock(id));
  };
  const setQuantity = (quantity: number) => {
    setTextValue(quantity.toString());
  };
  useEffect(() => {
    if (getQuantityStatus) {
      setQuantity(getQuantityStatus);
    } else setQuantity(0);
  }, [getQuantityStatus]);
  const handleUpdate = (id: string, quantity?: string, type?: string) => {
    if (type !== "outstock") {
      dispatch(
        UpdateQuanity({
          id: id,
          quantity: quantity,
          lastModificationTime: lastModificationTime,
        })
      );
    } else {
      dispatch(
        UpdateQuanityOutStock({
          id: id,
          quantity: quantity,
          lastModificationTime: lastModificationTime,
        })
      );
    }
  };
  useEffect(() => {
    if (updateStatus === true) {
      setEdit("");
      dispatch(resetUpdateStatus());
    }
  }, [updateStatus]);

  const onAddToCart = (data: any) => {
    if (!getReadyProduct(data)) {
      setOutOfStock(true);
      return false;
    }
    setActive(true);
    dispatch(handleProductId(data.id));
    dispatch(
      AddDistributorCart({
        productId: data.id,
        quantity: QUANTITY,
      })
    );
  };

  const onConfirmAlert = (type?: string) => {
    if (type === "quantity") {
      dispatch(resetError());
    } else {
      setActive(false);
      dispatch(resetCartState(""));
    }
  };

  return (
    <View style={styles.container}>
      {filterType !== 1 ? (
        products ? (
          products?.items?.map((item: any, index: number) => (
            <View style={styles.containerCard} key={item.id}>
              <View style={styles.containerCardTop}>
                <Image
                  source={{ uri: item.image !== null ? item.image[0] : null }}
                  style={styles.imageProduct}
                ></Image>
                <View style={styles.contentProduct}>
                  <TouchableOpacity
                    onPress={() =>
                      navigate(
                        ScreenNames.ProductDetails as never,
                        {
                          id: item.id,
                        } as never
                      )
                    }
                  >
                    <Text style={styles.nameProduct}>{item.name}</Text>
                  </TouchableOpacity>
                  <Text style={styles.codeProduct}>
                    {translate("productNumber", { code: item.code })}
                  </Text>
                  <Text style={styles.priceProduct}>
                    {item.price} {translate("pricePeritem")}
                  </Text>
                  <View style={styles.viewSl}>
                    {loadQuantity ? (
                      item.stockInventory.id === checked ? (
                        <ActivityIndicator
                          size="large"
                          color={colors.primary}
                          style={[
                            styles.pen,
                            {
                              width: 14,
                              height: 14,
                              backgroundColor: "transparent",
                            },
                          ]}
                        />
                      ) : (
                        <>
                          <Text style={styles.numberProduct}>
                            {translate("number")}:{" "}
                            <Text
                              style={[
                                styles.textNumber,
                                {
                                  color:
                                    filterType === 1 ? "red" : colors.c_1f1f1f,
                                },
                              ]}
                            >
                              {item.stockInventory.quantity}
                            </Text>
                          </Text>
                          <TouchableOpacity
                            style={styles.pen}
                            onPress={() => {
                              getQuantity(
                                item.stockInventory.id
                                // item.stockInventory.quantity
                              );
                            }}
                          >
                            <IconPen width={14} height={14} />
                          </TouchableOpacity>
                        </>
                      )
                    ) : edit != item.stockInventory.id ? (
                      <>
                        <Text style={styles.numberProduct}>
                          {translate("number")}:{" "}
                          <Text
                            style={[
                              styles.textNumber,
                              {
                                color:
                                  filterType === 1 ? "red" : colors.c_1f1f1f,
                              },
                            ]}
                          >
                            {item.stockInventory.quantity}
                          </Text>
                        </Text>
                        <TouchableOpacity
                          style={styles.pen}
                          onPress={() =>
                            getQuantity(
                              item.stockInventory.id
                              // item.stockInventory.quantity
                            )
                          }
                        >
                          <IconPen width={14} height={14} />
                        </TouchableOpacity>
                      </>
                    ) : (
                      <>
                        <Text style={styles.numberProduct}>
                          {translate("number")}:{" "}
                        </Text>
                        <TextInput
                          style={styles.editQuantity}
                          value={textValue}
                          keyboardType="numeric"
                          onChangeText={(e) =>
                            handleChangeText(e, item.stockInventory.quantity)
                          }
                        ></TextInput>
                        <TouchableOpacity
                          style={styles.pen}
                          onPress={() =>
                            handleUpdate(item.stockInventory.id, textValue)
                          }
                        >
                          <Text>{translate("save")}</Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.viewButton}>
                <TouchableOpacity
                  style={styles.buttonMl}
                  onPress={() => onBuyNow(item)}
                  disabled={!getReadyProduct(item)}
                >
                  <Text>{i18n.t("buy_now")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onAddToCart(item)}
                  disabled={!getReadyProduct(item)}
                >
                  <GradientView
                    style={styles.boxSortCart}
                    color={
                      !getReadyProduct(item) ? colors.disible : colors.gradient
                    }
                  >
                    <IconShoppingCarts
                      width={21.53}
                      height={20}
                      fill={colors.c_ffffff}
                    />
                  </GradientView>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <></>
        )
      ) : myTopProductOutOfStockWarning ? (
        myTopProductOutOfStockWarning?.items?.map(
          (item: any, index: number) => (
            <View style={styles.containerCard} key={item.productId}>
              <View style={styles.containerCardTop}>
                <Image
                  source={{ uri: item.image !== null ? item.image[0] : null }}
                  style={styles.imageProduct}
                ></Image>
                <View style={styles.contentProduct}>
                  <TouchableOpacity
                    onPress={() =>
                      navigate(
                        ScreenNames.ProductDetails as never,
                        {
                          id: item.productId,
                        } as never
                      )
                    }
                  >
                    <Text style={styles.nameProduct}>{item.name}</Text>
                  </TouchableOpacity>
                  <Text style={styles.codeProduct}>
                    {translate("productNumber", { code: item.code })}
                  </Text>
                  <Text style={styles.priceProduct}>
                    {item.price} {translate("pricePeritem")}
                  </Text>
                  <View style={styles.viewSl}>
                    {loadQuantity ? (
                      item.stockInventory.id === checked ? (
                        <ActivityIndicator
                          size="large"
                          color={colors.primary}
                          style={[
                            styles.pen,
                            {
                              width: 14,
                              height: 14,
                              backgroundColor: "transparent",
                            },
                          ]}
                        />
                      ) : (
                        <>
                          <Text style={styles.numberProduct}>
                            {translate("number")}:{" "}
                            <Text
                              style={[
                                styles.textNumber,
                                {
                                  color:
                                    filterType === 1 ? "red" : colors.c_1f1f1f,
                                },
                              ]}
                            >
                              {item.stockInventory.quantity}
                            </Text>
                          </Text>
                          <TouchableOpacity
                            style={styles.pen}
                            onPress={() => {
                              getQuantityOutstock(
                                item.stockInventory.id
                                // item.stockInventory.quantity
                              );
                            }}
                          >
                            <IconPen width={14} height={14} />
                          </TouchableOpacity>
                        </>
                      )
                    ) : edit != item.stockInventory.id ? (
                      <>
                        <Text style={styles.numberProduct}>
                          {translate("number")}:{" "}
                          <Text
                            style={[
                              styles.textNumber,
                              {
                                color:
                                  filterType === 1 ? "red" : colors.c_1f1f1f,
                              },
                            ]}
                          >
                            {item.stockInventory.quantity}
                          </Text>
                        </Text>
                        <TouchableOpacity
                          style={styles.pen}
                          onPress={() =>
                            getQuantityOutstock(
                              item.stockInventory.id
                              // item.stockInventory.quantity
                            )
                          }
                        >
                          <IconPen width={14} height={14} />
                        </TouchableOpacity>
                      </>
                    ) : (
                      <>
                        <Text style={styles.numberProduct}>
                          {translate("number")}:{" "}
                        </Text>
                        <TextInput
                          style={styles.editQuantity}
                          value={textValue}
                          keyboardType="numeric"
                          onChangeText={(e) =>
                            handleChangeText(e, item.stockInventory.quantity)
                          }
                        ></TextInput>
                        <TouchableOpacity
                          style={styles.pen}
                          onPress={() =>
                            handleUpdate(
                              item.stockInventory.id,
                              textValue,
                              "outstock"
                            )
                          }
                        >
                          <Text>{translate("save")}</Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.viewButton}>
                <TouchableOpacity
                  style={styles.buttonMl}
                  onPress={() => onBuyNow(item)}
                  disabled={!getReadyProduct(item)}
                >
                  <Text>{i18n.t("buy_now")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onAddToCart(item)}
                  disabled={!getReadyProduct(item)}
                >
                  <GradientView
                    style={styles.boxSortCart}
                    color={
                      !getReadyProduct(item) ? colors.disible : colors.gradient
                    }
                  >
                    <IconShoppingCarts
                      width={21.53}
                      height={20}
                      fill={colors.c_ffffff}
                    />
                  </GradientView>
                </TouchableOpacity>
              </View>
            </View>
          )
        )
      ) : (
        <></>
      )}
      <Alerts
        modalVisible={outOfStock}
        content={translate("out_of_stock_message")}
        confirm={() => setOutOfStock(false)}
        statusNoti={"false"}
      />
      <Alerts
        modalVisible={!!addToCartSuccess}
        content={addToCartSuccess || ""}
        confirm={() => onConfirmAlert()}
        statusNoti={"false"}
      />
      <Alerts
        modalVisible={!!errors}
        content={errors || ""}
        confirm={() => onConfirmAlert()}
        statusNoti={"false"}
      />
      <Alerts
        modalVisible={!!error}
        content={error || ""}
        confirm={() => onConfirmAlert("quantity")}
        statusNoti={"false"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.c_ffffff,
    paddingHorizontal: 24,
  },
  containerCard: {
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    borderBottomWidth: 1,
    borderStyle: "solid",
    paddingRight: 10,
  },
  containerCardTop: {
    paddingTop: 16,
    flexDirection: "row",
  },
  imageProduct: {
    width: 76,
    height: 76,
    borderRadius: 4,
    marginRight: 8,
  },
  contentProduct: {
    // maxWidth: "100%",
    paddingRight: 16,
  },
  nameProduct: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 4,
    color: colors.c_1f1f1f,
  },
  codeProduct: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.c_7B7B80,
    marginBottom: 6,
  },
  viewSl: {
    flexDirection: "row",
    alignItems: "center",
    // alignContent: "center",
  },
  numberProduct: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.c_667403,
  },
  priceProduct: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.c_48484A,
    marginBottom: 8,
  },
  textNumber: {
    fontSize: 14,
    fontWeight: "400",
    // color: colors.c_1f1f1f,
  },
  pen: {
    padding: 6,
    backgroundColor: "rgba(102, 116, 3, 0.1)",
    borderRadius: 2,
    marginLeft: 6,
  },
  viewButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 16,
    marginTop: 10,
  },
  buttonMl: {
    paddingHorizontal: 22,
    paddingVertical: 7.5,
    backgroundColor: "rgba(102, 116, 3, 0.1)",
    borderRadius: 8,
    marginRight: 8,
  },
  buttonCart: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.c_667403,
    borderRadius: 8,
  },
  editQuantity: {
    borderColor: colors.c_0000001a,
    borderWidth: 1,
    // paddingHorizontal: 18,
    borderRadius: 8,
    paddingVertical: 0,
    textAlign: "center",
    color: colors.c_48484A,
    width: "37%",
  },
  boxSortCart: {
    marginLeft: 10,
    // marginHorizontal: 5,
    width: (DIMENSIONS.width / 5 / 76) * 46,
    height: 32,
    backgroundColor: colors.c_667403,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});

export default React.memo(CardProductWare);
