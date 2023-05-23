import { compact } from "lodash";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import Alerts from "../../../componets/Alerts";
import Button from "../../../componets/Button";
import ButtonBoder from "../../../componets/ButtonBoder";
import { colors } from "../../../constants/colors";
import { IconStar } from "../../../constants/icons";
import { MEDIA } from "../../../constants/media";
import { translate } from "../../../locale";
import { useAppDispatch } from "../../../redux/hooks";
import {
  resetRatingState,
  selectRate,
  SendRate,
} from "../../../redux/slice/Rating/rating-order";
import {
  resetOrderImportState,
  selectOrderImport,
} from "../../../redux/slice/Sales/order-import";
import { ProductRatings, RatingReq } from "../../../redux/type/Rating/rating";
import { OrderImportProductType } from "../../../redux/type/Sales/order-import";

const DATA_RATE = [
  {
    id: 1,
    label: translate("label_rating_1"),
  },
  {
    id: 2,
    label: translate("label_rating_2"),
  },
  {
    id: 3,
    label: translate("label_rating_3"),
  },
  {
    id: 4,
    label: translate("label_rating_4"),
  },
];

type ProductItem = {
  ratePoint: number;
  rateOption: number[];
  errorRating?: string;
} & OrderImportProductType;

const ReviewOrder = ({ ...props }) => {
  const dispatch = useAppDispatch();
  const {
    loading,
    errors: orderImportErrors,
    ratingOrderImportSuccess,
  } = useSelector(selectRate);

  const [errors, setErrors] = useState<string[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);

  const orderId = props?.route?.params?.orderId;

  useEffect(() => {
    const newProducts = props?.route?.params?.productRatings?.map(
      (el: ProductItem) => {
        return {
          ...el,
          ratePoint: 0,
          rateOption: [],
        };
      }
    );
    setProducts(newProducts);
  }, [props?.route?.params?.productRatings]);

  const onSubmit = () => {
    const newErrors = [...errors];
    const productRatings: ProductRatings[] = products?.map((el, index) => {
      if (!el.ratePoint) {
        newErrors[index] = translate("please_choose_rate_point");
      }
      return {
        content:
          DATA_RATE?.filter((i) => el?.rateOption?.includes(i.id))
            ?.map((el) => el.label)
            ?.join(", ") || "",
        productId: el?.productId || "",
        ratePoint: el.ratePoint,
        rateOptions: el.rateOption,
      };
    });
    setErrors(newErrors);
    if (compact(newErrors)?.length > 0) {
      // dispatch(onErrors(translate("please_choose_rate")));
      return false;
    }
    const params: RatingReq = {
      orderId,
      productRatings,
    };
    dispatch(SendRate(params));
  };

  const onSetRatePoint = (productId: string, value: number) => {
    const findIndex = products?.findIndex((el) => el.productId === productId);
    const newProducts = [...products];
    const newErrors = [...errors];
    if (findIndex > -1) {
      newProducts[findIndex].ratePoint = value;
      newErrors[findIndex] = "";
    }
    setProducts(newProducts);
    setErrors(newErrors);
  };

  const onSetRateOption = (productId: string, value: number) => {
    const findIndex = products?.findIndex((el) => el.productId === productId);
    const newProducts = [...products];
    const newErrors = [...errors];
    if (findIndex > -1) {
      newErrors[findIndex] = "";
      const options: number[] = newProducts[findIndex].rateOption || [];
      const optionIndex = options?.findIndex((el) => el === value);
      if (optionIndex > -1) {
        newProducts[findIndex].rateOption = options.filter(
          (el) => el !== value
        );
      } else {
        newProducts[findIndex].rateOption = options.concat([value]);
      }
    }
    setProducts(newProducts);
    setErrors(newErrors);
  };

  const onConfirmErrorsAlert = () => {
    dispatch(resetOrderImportState(""));
    dispatch(resetRatingState(""));
  };

  const onConfirmSuccess = () => {
    dispatch(resetOrderImportState(""));
    dispatch(resetRatingState(""));
    props.navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.wrapProducts}>
          {products?.map((product: ProductItem, index: number) => (
            <View key={product.productId} style={styles.row}>
              <View style={styles.between}>
                <Image
                  source={{ uri: product.image?.[0] }}
                  resizeMode="cover"
                  style={styles.image}
                />
                <View style={styles.right}>
                  <Text numberOfLines={3} style={styles.textName}>
                    {product.productName}
                  </Text>
                </View>
              </View>
              <View style={styles.viewStar}>
                {Array.from({ length: 5 }, (v, k) => k + 1).map((el) => {
                  return (
                    <TouchableOpacity
                      key={el}
                      onPress={() => {
                        onSetRatePoint(product?.productId || "", el);
                      }}
                    >
                      <IconStar
                        width={42}
                        height={42}
                        stroke={!!errors[index] ? "red" : colors.primary}
                        fill={
                          product.ratePoint >= el
                            ? colors.primary
                            : colors.c_ffffff
                        }
                        style={styles.iconStar}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
              {!!errors[index] ? (
                <View style={styles.viewError}>
                  <Text style={styles.txtError}>{errors[index]}</Text>
                </View>
              ) : null}

              <View style={styles.wrapRateOption}>
                <Text style={styles.txtTitleOption}>
                  {translate("your_review")}
                </Text>
                <View style={[styles.between, styles.rateOption]}>
                  {DATA_RATE.map((el) => {
                    return (
                      <TouchableOpacity
                        key={el?.id}
                        onPress={() => {
                          onSetRateOption(product?.productId || "", el.id);
                        }}
                        style={styles.viewOption}
                      >
                        <View
                          style={[
                            styles.center,
                            styles.innerOption,
                            product?.rateOption?.includes(el?.id) &&
                              styles.viewActive,
                          ]}
                        >
                          <Text
                            style={[
                              styles.txtOption,
                              product?.rateOption?.includes(el?.id) &&
                                styles.txtActive,
                            ]}
                            numberOfLines={2}
                          >
                            {el.label}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <ButtonBoder
          boderColor={colors.primary}
          textButton={translate("done")}
          style={styles.viewButton}
          onPress={onSubmit}
          loading={loading}
        />
      </View>

      <Alerts
        modalVisible={!!orderImportErrors}
        content={orderImportErrors || ""}
        confirm={() => onConfirmErrorsAlert()}
        statusNoti={"false"}
      />

      <Alerts
        modalVisible={ratingOrderImportSuccess || false}
        content={translate("reviews_success")}
        confirm={() => onConfirmSuccess()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20,
  },
  center: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  between: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  viewTitle: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  txtTitle: {
    fontWeight: "500",
    fontSize: 14,
    color: colors.c_7B7B80,
  },
  wrapProducts: {
    paddingHorizontal: 24,
    // paddingVertical: 20,
  },
  row: {
    borderBottomColor: colors.c_F3F3F3,
    borderBottomWidth: 1,
    paddingTop: 24,
    paddingBottom: 10,
  },

  image: {
    width: 48,
    height: 48,
    borderRadius: 1,
    overflow: "hidden",
    marginVertical: 5,
    borderWidth: 1,
    borderColor: colors.c_F3F3F3,
  },
  right: {
    paddingLeft: 22,
    flex: 1,
  },
  textName: {
    color: colors.c_1F1F1F,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
  },
  bottom: { paddingVertical: 10, paddingHorizontal: 24 },
  viewButton: { borderColor: colors.primary },
  txtButton: { color: colors.primary },
  viewStar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 16,
    marginTop: 15,
    marginBottom: 25,
    borderTopColor: "#F9F9F9",
    borderTopWidth: 1,
  },
  iconStar: { marginRight: 2 },
  wrapRateOption: {
    marginVertical: 20,
  },
  rateOption: {
    flexWrap: "wrap",
    marginHorizontal: -4,
  },

  viewOption: {
    paddingHorizontal: 4,
    marginVertical: 4,
    // width: DIMENSIONS.width / 2 - 50,
    width: "50%",
  },
  innerOption: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: "100%",
    minHeight: 56,
    // backgroundColor: "red",
  },
  viewActive: { borderColor: colors.primary },
  txtOption: {
    fontSize: 14,
    color: colors.c_636366,
    textAlign: "center",
  },
  txtActive: { color: colors.primary },
  txtTitleOption: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
    color: colors.c_636366,
    marginBottom: 13,
  },
  viewError: {
    marginTop: 5,
    marginBottom: 20,
  },
  txtError: {
    fontSize: 14,
    lineHeight: 18,
    color: "red",
  },
});

export default ReviewOrder;
