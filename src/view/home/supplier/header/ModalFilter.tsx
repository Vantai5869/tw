import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { useNavigation } from "@react-navigation/native";
import { omit } from "lodash";
import React, { useState, useEffect } from "react";
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
  formatNumber,
  resetFormatNumber,
  validateNumber,
} from "../../../../common/utils";
import Button from "../../../../componets/ButtonCT";
import ButtonBoder from "../../../../componets/ButtonBoderCT";
import InputDropdown from "../../../../componets/InputDropdown";
import { colors } from "../../../../constants/colors";
import { IconTimes } from "../../../../constants/icons";
import { TagType } from "../../../../constants/type.interface";
import { isAndroid, isIOS } from "../../../../constants/untils";
import { translate } from "../../../../locale";
import { ScreenNames } from "../../../../navigation/screen";
import {
  selectSupplier,
  SupplierSearch,
} from "../../../../redux/slice/Partnership/supplier";
import {
  GetCategory,
  selectCategory,
} from "../../../../redux/slice/Sales/category";
import {
  ProductFilter,
  ProductLoading,
  selectProduct,
} from "../../../../redux/slice/Sales/product";
import { CategoryType } from "../../../../redux/type/Sales/category";
import { FilterType } from "../../../../redux/type/Sales/product";
import FilterByCategory from "./filter-category/index";
import Input from "./input/input";

interface Props {
  modalVisible: boolean;
  setIsModal: () => void;
}

export const MAX_PRICE = 2500000;
export const OVER_MAX_PRICE = 500000000;

export default function ModalFilterProduct(props: Props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { filters } = useSelector(selectProduct);
  const { categories } = useSelector(selectCategory);
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
  // const [isDistrict, setDistrict] = useState<boolean>(false);

  useEffect(() => {
    dispatch(GetCategory({}));
    // dispatch(SupplierSearch({}));
  }, []);

  useEffect(() => {
    if (props.modalVisible === true) {
      setData({
        ListCategoryId: filters.ListCategoryId || [],
        ListSupplierId: filters.ListSupplierId || [],
        FromPrice: formatNumber(filters.FromPrice || "") || "",
        ToPrice: formatNumber(filters.ToPrice || "") || "",
      });

      let newFromPrice = 0;
      if (!!filters.FromPrice && filters.FromPrice !== MAX_PRICE) {
        newFromPrice = filters.FromPrice;
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

  useEffect(() => {
    // chinh sua theo list data get by supplier

    setData({
      ListCategoryId: filters.ListCategoryId || [],
      ListSupplierId: filters.ListSupplierId || [],
      FromPrice: formatNumber(filters.FromPrice || "") || "",
      ToPrice: formatNumber(filters.ToPrice || "") || "",
    });
  }, [filters]);

  const onReset = () => {
    const params = {
      ...filters,
      ListCategoryId: [],
      ListSupplierId: [],
      FromPrice: "",
      ToPrice: "",
    };
    setData(params);
    dispatch(ProductFilter(omit(params, ["ToPrice"])));
  };
  const onSubmit = () => {
    if (!!errorText) {
      // dispatch(onProductErrors(errorText));
      return false;
    }
    const newFromPrice = !!resetFormatNumber(data?.FromPrice)
      ? resetFormatNumber(data?.FromPrice)
      : prices.FromPrice;

    const newToPrice = !!resetFormatNumber(data?.ToPrice)
      ? resetFormatNumber(data?.ToPrice)
      : prices.ToPrice;

    let params: FilterType = {
      ...filters,
      ...data,
      FromPrice: Number(newFromPrice),
      ToPrice: Number(newToPrice),
    };

    if (Number(newToPrice) <= 0) {
      params = omit(params, ["ToPrice"]);
    }
    if (newFromPrice > newToPrice && newToPrice > 0) {
      // dispatch(onProductErrors(translate("min_less_max")));
      return false;
    }

    dispatch(ProductFilter(params));
    setTimeout(() => {
      navigation.navigate(ScreenNames.SearchCategory as never);
      props.setIsModal();
    }, 600);
  };
  const onOpenStall = () => {
    setIsStall(!isStall);
  };
  const onOpenIndustry = () => {
    setIsIndustry(!isIndustry);
  };

  const onChangeFilter = (name: string, value: TagType[]) => {
    setData({ ...data, [name]: value });
    dispatch(ProductFilter({ ...filters, [name]: value }));
  };

  const onChangePrice = (values: number[]) => {
    setData({ ...data, FromPrice: "", ToPrice: "" });
    if (values?.[1] === MAX_PRICE) {
      setData({
        ...data,
        FromPrice: `${values?.[1]}`,
        ToPrice: `${OVER_MAX_PRICE}`,
      });
    } else {
      setData({
        ...data,
        FromPrice: `${values?.[0]}`,
        ToPrice: `${values?.[1]}`,
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

    if (newFormat > 5000000) {
      return false;
    }

    setData({ ...data, FromPrice });
  };

  const onChangeToPriceInput = (ToPrice: string) => {
    setErrortext("");
    if (validateNumber(resetFormatNumber(ToPrice).toString()) === false) {
      setErrortext("Giá trị tối đa phải là giá trị dương");
      return false;
    }

    if (Number(resetFormatNumber(ToPrice)) > 5000000) {
      return false;
    }
    setData({ ...data, ToPrice });
  };

  const onSearchCategory = (searchKey: string) =>
    dispatch(GetCategory({ searchKey }));

  const onSearchSuppiler = (nameCompany: string) =>
    dispatch(SupplierSearch({ nameCompany }));

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
            <View style={[styles.contenModal]}>
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
                  <IconTimes
                    width={24}
                    height={24}
                    fill={colors.c_000000}
                    stroke={colors.c_000000}
                  />
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
                  value={data?.ListCategoryId?.map((el) => el?.name)?.join(", ")}
                  onChange={onOpenIndustry}
                  style={styles.inputDropdown}
                />
                {isIndustry ? (
                  <FilterByCategory
                    dataChecked={filters?.ListCategoryId || []}
                    data={categories?.map((el: CategoryType) => {
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
                  <Text></Text>
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
                            ? formatNumber(resetFormatNumber(data?.FromPrice || ""))
                            : undefined
                        }
                        keyboardType="number-pad"
                        maxLength={9}
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
                            ? formatNumber(resetFormatNumber(data?.ToPrice || ""))
                            : undefined
                        }
                        keyboardType="number-pad"
                        maxLength={9}
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
                  />

                  <View style={styles.value}>
                    <Text style={styles.textCenter}>{0}</Text>
                    <View style={styles.center}>
                      <Text style={styles.textCenter}>2.500.000</Text>
                    </View>
                    <Text style={styles.textCenter}>{">5.000.000"}</Text>
                  </View>
                </View>
              </ScrollView>
              <View style={[styles.action, { paddingBottom: insets.bottom + 10 }]}>
                <View style={styles.viewButtonLeft}>
                  <ButtonBoder
                    styleText={styles.textLeft}
                    boderColor={colors.c_667403}
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
                    gradientColor={["#667403", "#A2B705"]}
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "flex-end",
    flex: 1,
    width: "100%",
  },
  flex: {
    flex: 1,
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
    paddingVertical: 14,
    overflow: "hidden",
  },
  inputDropdown: {
    marginBottom: 15,
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
  textLeft: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: 14,
  },
  viewButtonLeft: {
    flex: 1,
    paddingRight: 4,
  },
  buttonLeft: {},
  viewButtonRight: {
    flex: 1,
    paddingLeft: 4,
  },
  buttonRight: {
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
    alignItems: "flex-end",
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
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.12)",
    borderRadius: 8,
    height: 32,
    fontSize: 12,
    color: colors.c_8E8E93,
    paddingVertical: 0,
    textAlign: "center",
  },
});
