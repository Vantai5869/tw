import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { useNavigation } from "@react-navigation/native";
import { omit } from "lodash";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  DIMENSIONS,
  resetFormatNumber,
  validateNumber,
} from "../../../../common/utils";
import Alerts from "../../../../componets/Alerts";
import ButtonBoder from "../../../../componets/ButtonBoderCT";
import Button from "../../../../componets/ButtonCT";
import InputDropdown from "../../../../componets/InputDropdown";
import { colors } from "../../../../constants/colors";
import { IconTimes } from "../../../../constants/icons";
import { TagType } from "../../../../constants/type.interface";
import { isIOS } from "../../../../constants/untils";
import { translate } from "../../../../locale";
import { ScreenNames } from "../../../../navigation/screen";
import { useAppSelector } from "../../../../redux/hooks";
import {
  selectSupplier,
  SupplierSearch,
} from "../../../../redux/slice/Partnership/supplier";
import {
  GetCategory,
  selectCategory,
} from "../../../../redux/slice/Sales/category";
import {
  onProductErrors,
  resetProductState,
  selectProduct,
} from "../../../../redux/slice/Sales/product";
import {
  GetCategoryWareHouse,
  GetListProductWareHouse,
  ProductFilter,
  searchCatgory,
  selectProductWarehouse,
} from "../../../../redux/slice/warehouses/products-warehouse";
import { SupplierType } from "../../../../redux/type/Partnership/supplier";
import { CategoryType } from "../../../../redux/type/Sales/category";
import { FilterType } from "../../../../redux/type/warehouses/distributor-stock-inventory";

import Input from "../../../importProduct/purchase/filter-product/components/Input";
import FilterByStall from "../../../importProduct/purchase/filter-product/filter-by-stall";
// import Input from "../components/Input";
// import FilterByStall from "./filter-by-stall";

export const formatNumber = (number: number | string, sperator?: string) => {
  return number
    ? number
        ?.toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${sperator || "."}`)
    : "0";
};
export const MAX_PRICE = 5000000;
export const OVER_MAX_PRICE = 1000000000;

interface Props {
  sortField?: number;
  sortType?: number;
  modalVisible: boolean;
  setIsModal: () => void;
  filter?: number;
}

export default function FilterWarehouse(props: Props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { filters, errors } = useSelector(selectProduct);
  const { filterProduct } = useAppSelector(selectProductWarehouse);
  const { filterCategory } = useSelector(selectProductWarehouse);
  const { suppliers } = useSelector(selectSupplier);

  const [isIndustry, setIsIndustry] = useState<boolean>(false);
  const [isStall, setIsStall] = useState<boolean>(false);
  const [data, setData] = useState<{
    ListCategoryId: TagType[];
    ListSupplierId: TagType[];
    FromPrice: string;
    ToPrice: string;
  }>({
    ListCategoryId: [],
    ListSupplierId: [],
    FromPrice: "",
    ToPrice: "",
  });

  const [prices, setPrices] = useState<{
    FromPrice: number;
    ToPrice: number;
  }>({
    FromPrice: 0,
    ToPrice: 0,
  });

  const [errorText, setErrortext] = useState<string>("");
  // const [isCity, setIsCity] = useState<boolean>(false);
  // const [isDistrict, setDistrict] = useState<boolean>(false);

  useEffect(() => {
    dispatch(GetCategoryWareHouse({ take: 20 }));
    dispatch(SupplierSearch({}));
  }, []);

  useEffect(() => {
    if (props.modalVisible === true) {
      setData({
        ListCategoryId: filterProduct.ListCategoryId || [],
        ListSupplierId: filterProduct.ListSupplierId || [],
        FromPrice: formatNumber(filterProduct.FromPrice || "") || "",
        ToPrice: formatNumber(filterProduct.ToPrice || "") || "",
      });

      let newFromPrice = 0;
      if (!!filterProduct.FromPrice && filterProduct.FromPrice !== MAX_PRICE) {
        newFromPrice = filterProduct.FromPrice;
      }
      setPrices({
        FromPrice: newFromPrice,
        ToPrice:
          filters.ToPrice && filters.ToPrice >= MAX_PRICE
            ? MAX_PRICE
            : filters.ToPrice || 0,
      });
    }
  }, [props.modalVisible]);

  const onReset = () => {
    const params = {
      ...filterProduct,
      ListCategoryId: [],
      ListSupplierId: [],
      FromPrice: "",
      ToPrice: "",
    };
    setData(params);
    setPrices({
      FromPrice: 0,
      ToPrice: 0,
    });
    // dispatch(ProductFilter(omit(params, ["ToPrice"])));
  };

  const onSubmit = () => {
    if (!!errorText) {
      dispatch(onProductErrors(errorText));
      return false;
    }
    const newFromPrice = !!resetFormatNumber(data?.FromPrice)
      ? resetFormatNumber(data?.FromPrice)
      : prices.FromPrice;

    const newToPrice = !!resetFormatNumber(data?.ToPrice)
      ? resetFormatNumber(data?.ToPrice)
      : prices.ToPrice;

    let params: FilterType = {
      ...filterProduct,
      ...data,
      FromPrice: Number(newFromPrice),
      ToPrice: Number(newToPrice),
    };

    if (Number(newToPrice) <= 0) {
      params = omit(params, ["ToPrice"]);
    }
    if (newFromPrice > newToPrice && newToPrice > 0) {
      dispatch(onProductErrors(translate("min_less_max")));
      return false;
    }

    dispatch(ProductFilter(params));
    props.setIsModal();
    if (props.filter != 1) {
      navigation.navigate(ScreenNames.AllProduct, {
        title: "filter_product",
        filter: 0,
        textSearch: "",
      });
    }
  };

  const onOpenStall = () => {
    setIsStall(!isStall);
  };
  const onOpenIndustry = () => {
    setIsIndustry(!isIndustry);
  };

  const onChangeFilter = (name: string, value: TagType[]) => {
    setData({ ...data, [name]: value });
    // dispatch(ProductFilter({ ...filters, [name]: value }));
  };

  const onChangePrice = (values: number[]) => {
    setData({ ...data, FromPrice: "", ToPrice: "" });
    if (values?.[1] === MAX_PRICE) {
      setPrices({
        FromPrice: values?.[1],
        ToPrice: OVER_MAX_PRICE,
      });
    } else {
      setPrices({
        FromPrice: values?.[0],
        ToPrice: values?.[1],
      });
    }
  };

  const onChangeFromPriceInput = (FromPrice: string) => {
    setErrortext("");
    if (validateNumber(resetFormatNumber(FromPrice).toString()) === false) {
      setErrortext("Giá trị tối thiểu phải là giá trị dương");
      return false;
    }

    const newFormat = resetFormatNumber(FromPrice);
    const newToPrice = resetFormatNumber(data.ToPrice);

    if (!!newToPrice && newToPrice > 0 && newFormat > newToPrice) {
      return false;
    }

    setData({ ...data, FromPrice });
    setPrices({ FromPrice: newFormat, ToPrice: newToPrice });
  };

  const onChangeToPriceInput = (ToPrice: string) => {
    setErrortext("");
    if (validateNumber(resetFormatNumber(ToPrice).toString()) === false) {
      setErrortext("Giá trị tối đa phải là giá trị dương");
      return false;
    }

    setData({ ...data, ToPrice });
    setPrices({
      FromPrice: resetFormatNumber(data.FromPrice),
      ToPrice: resetFormatNumber(ToPrice),
    });
  };

  const onSearchCategory = (searchKey: string) =>
    dispatch(searchCatgory(searchKey));

  const onSearchSuppiler = (nameCompany: string) => {
    dispatch(SupplierSearch({ nameCompany: nameCompany, taxCode: "" }));
  };
  const insets = useSafeAreaInsets();
  return (
    <Modal
      animationType="slide"
      transparent
      visible={props.modalVisible}
      onRequestClose={() => props.setIsModal()}
    >
      <KeyboardAvoidingView style={styles.flex}>
        <TouchableWithoutFeedback
          style={styles.flex}
          onPress={() => Keyboard.dismiss()}
          accessible={false}
        >
          <View style={styles.container}>
            {/* <ScrollView> */}
            <View style={styles.contenModal}>
              <View
                style={[styles.header, isIOS && { paddingTop: insets.top }]}
              >
                <View>
                  <Text style={styles.headerText}>
                    {translate("search_filters")}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => props.setIsModal()}
                  style={styles.buttonClose}
                >
                  <IconTimes width={20} height={20} fill={colors.c_000000} />
                </TouchableOpacity>
              </View>
              <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled={true}
                keyboardShouldPersistTaps="always"
              >
                <InputDropdown
                  label={translate("by_industry")}
                  show={true}
                  placeholder={translate("please_select")}
                  value={data?.ListCategoryId?.map((el: any) => el?.name)?.join(
                    ", "
                  )}
                  onChange={onOpenIndustry}
                  style={styles.inputDropdown}
                  styleLabel={{ color: colors.c_48484A }}
                />
                {isIndustry ? (
                  <FilterByStall
                    dataChecked={data?.ListCategoryId || []}
                    data={filterCategory?.map((el: CategoryType) => {
                      return {
                        id: el?.id || "",
                        name: el?.name || "",
                      };
                    })}
                    name="ListCategoryId"
                    onPassData={onChangeFilter}
                    onSearch={onSearchCategory}
                  />
                ) : (
                  // <Text></Text>
                  <></>
                )}
                <InputDropdown
                  label={translate("by_stall")}
                  show={true}
                  placeholder={translate("please_select")}
                  value={data?.ListSupplierId?.map((el: any) => el?.name)?.join(
                    ", "
                  )}
                  onChange={onOpenStall}
                  style={styles.inputDropdown}
                  styleLabel={{ color: colors.c_48484A }}
                />

                {isStall ? (
                  <FilterByStall
                    dataChecked={data?.ListSupplierId || []}
                    data={suppliers?.map((el: SupplierType) => {
                      return {
                        id: el?.id || "",
                        name: el?.nameCompany || "",
                      };
                    })}
                    name="ListSupplierId"
                    onPassData={onChangeFilter}
                    onSearch={onSearchSuppiler}
                  />
                ) : (
                  <></>
                )}

                <View style={styles.slide}>
                  <Text style={styles.title}>{translate("price_limit")}</Text>
                  <View style={styles.slideLabel}>
                    <View style={styles.slideLabelView}>
                      <Input
                        onChangeText={onChangeFromPriceInput}
                        placeholder={translate("min_price")}
                        styleInput={styles.rangeInput}
                        value={
                          !!Number(resetFormatNumber(data?.FromPrice))
                            ? formatNumber(
                                resetFormatNumber(data?.FromPrice || ""),
                                "."
                              )
                            : undefined
                        }
                        keyboardType="number-pad"
                        maxLength={13}
                      />
                    </View>
                    <View style={{ paddingHorizontal: 6 }}>
                      <Text style={styles.slideLabelText}>_</Text>
                    </View>
                    <View style={styles.slideLabelView}>
                      <Input
                        onChangeText={onChangeToPriceInput}
                        placeholder={translate("max_price")}
                        styleInput={styles.rangeInput}
                        value={
                          !!Number(resetFormatNumber(data?.ToPrice))
                            ? formatNumber(
                                resetFormatNumber(data?.ToPrice || ""),
                                "."
                              )
                            : undefined
                        }
                        keyboardType="number-pad"
                        maxLength={13}
                      />
                    </View>
                  </View>

                  <MultiSlider
                    min={0}
                    max={MAX_PRICE}
                    values={[
                      prices.FromPrice <= MAX_PRICE ? prices.FromPrice : 0,
                      prices.ToPrice <= MAX_PRICE ? prices.ToPrice : MAX_PRICE,
                    ]}
                    step={10}
                    onValuesChange={onChangePrice}
                    sliderLength={(DIMENSIONS.width * 310) / 375 - 50}
                    trackStyle={{
                      backgroundColor: colors.c_AEAEB2,
                      height: 1.8,
                    }}
                    markerStyle={{
                      backgroundColor: colors.primary,
                      width: 16,
                      height: 16,
                      shadowColor: "rgba(0, 0, 0, 0.5)",
                    }}
                    selectedStyle={{ backgroundColor: colors.primary }}
                    isMarkersSeparated={true}
                    customMarkerLeft={(e) => (
                      <View style={styles.marker}>
                        {prices.FromPrice > 0 &&
                        prices.FromPrice < MAX_PRICE ? (
                          <View
                            style={[
                              [
                                styles.txtMarker,
                                { left: -5 },
                                prices.FromPrice > 4000000 && {
                                  right: 0,
                                  left: "auto",
                                },
                                prices.ToPrice - prices.FromPrice < 1800000 && {
                                  top: 20,
                                },
                              ],
                            ]}
                          >
                            <Text style={styles.textCenter}>
                              {formatNumber(e?.currentValue)}
                            </Text>
                          </View>
                        ) : null}
                      </View>
                    )}
                    customMarkerRight={(e) => (
                      <View style={styles.marker}>
                        {prices.ToPrice > 0 && prices.ToPrice < MAX_PRICE ? (
                          <View
                            style={[
                              [
                                styles.txtMarker,
                                prices.ToPrice < 1000000 && {
                                  left: -5,
                                },
                                prices.ToPrice > 4000000 && {
                                  right: 0,
                                  left: "auto",
                                },
                              ],
                            ]}
                          >
                            <Text style={styles.textCenter}>
                              {formatNumber(e?.currentValue)}
                            </Text>
                          </View>
                        ) : null}
                      </View>
                    )}
                  />
                  <View style={styles.value}>
                    <Text style={styles.textCenter}>{0}</Text>
                    <Text style={styles.textCenter}>
                      {">" + formatNumber(MAX_PRICE)}
                    </Text>
                  </View>
                </View>
              </ScrollView>
              <View
                style={[styles.action, { paddingBottom: insets.bottom + 10 }]}
              >
                <View style={styles.viewButtonLeft}>
                  <ButtonBoder
                    styleText={styles.textLeft}
                    boderColor={colors.primary}
                    textButton={translate("reset")}
                    onPress={onReset}
                  />
                </View>
                <View style={styles.viewButtonLeft}>
                  <Button
                    styleText={styles.textRight}
                    textButton={translate("apply")}
                    style={styles.buttonRight}
                    onPress={onSubmit}
                  />
                </View>
              </View>
            </View>
            {/* </ScrollView> */}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <Alerts
        modalVisible={!!errors}
        content={errors || ""}
        confirm={() => {
          dispatch(resetProductState(""));
        }}
        statusNoti={"false"}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    backgroundColor: "rgba(0,0,0,0.4)",
    // backgroundColor: "#ffffff",
    alignItems: "flex-end",
    flex: 1,
    width: "100%",
  },
  buttonClose: {
    marginLeft: 5,
    padding: 10,
  },
  contenModal: {
    backgroundColor: colors.c_ffffff,
    width: (DIMENSIONS.width * 310) / 375,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 23,
    paddingHorizontal: 13,
    backgroundColor: "rgba(196, 196, 196, 0.12)",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.c_1F1F1F,
  },
  content: {
    paddingHorizontal: 14,
    paddingVertical: 23,
  },
  inputDropdown: {
    // marginBottom: 15,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
    borderTopWidth: 1,
  },
  viewButtonLeft: {
    flex: 1,
    paddingRight: 4,
  },
  viewButtonRight: {
    flex: 1,
    paddingLeft: 4,
  },
  textLeft: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: 14,
  },
  buttonRight: {
    backgroundColor: colors.primary,
    paddingHorizontal: 22,
  },
  textRight: {
    color: colors.c_ffffff,
    fontWeight: "600",
    fontSize: 14,
  },
  slide: {
    justifyContent: "center",
    alignContent: "center",
    marginBottom: 45,
    width: "100%",
    paddingHorizontal: 10,
  },
  slideLabel: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  slideLabelView: {
    flex: 1,
  },
  slideLabelText: {
    fontSize: 12,
    color: colors.c_8E8E93,
  },
  title: {
    fontSize: 14,
    color: colors.c_48484A,
    fontWeight: "500",
    marginBottom: 15,
  },
  textCenter: {
    fontSize: 10,
    color: colors.c_48484A,
    fontWeight: "500",
    marginBottom: 15,
  },
  value: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  viewpaddingTop: {
    paddingBottom: 10,
  },
  rangeInput: {
    backgroundColor: colors.c_ffffff,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.12)",
    borderRadius: 8,
    height: 32,
    fontSize: 12,
    color: colors.c_8E8E93,
    paddingVertical: 0,
    textAlign: "center",
  },
  marker: {
    backgroundColor: colors.primary,
    width: 16,
    height: 16,
    borderRadius: 20,
  },
  txtMarker: {
    position: "absolute",
    top: -20,
    left: -27,
    width: 55,
    justifyContent: "center",
    alignItems: "center",
  },
});
