import React, { memo } from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { formatNumber } from "../../../common/utils";
import { colors } from "../../../constants/colors";
import { QUANTITY } from "../../../constants/untils";
import { translate } from "../../../locale";
import { OrderImportProductType } from "../../../redux/type/Sales/order-import";

interface Props {
  product: OrderImportProductType;
  styleRow?: StyleProp<ViewStyle>;
  isShowPrice?: boolean;
}

export const ProductItemOrder = React.memo<Props>(
  ({ isShowPrice = true, ...props }) => {
    const product = props.product;
    const code = product.code || product.productCode || "";
    const renderLabel = () => {
      if (product.status === 2) {
        return (
          <View style={styles.viewLabel}>
            <Text style={styles.txtLabel}>{translate("product_del")}</Text>
          </View>
        );
      }

      if (product.status === 3) {
        return (
          <View style={styles.viewLabel}>
            <Text style={styles.txtLabel}>{translate("product_sold_out")}</Text>
          </View>
        );
      }

      return null;
    };

    return (
      <View
        style={[
          styles.row,
          !!product.status &&
            product.status !== 1 && {
              opacity: 0.4,
            },
          props.styleRow,
        ]}
      >
        <View style={styles.viewImage}>
          {renderLabel()}
          <Image
            source={{ uri: product.image?.[0] }}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
        <View style={styles.right}>
          <Text numberOfLines={3} style={styles.textName}>
            {product.productName}
          </Text>
          {isShowPrice ? (
            <>
              <Text style={styles.masp}>
                {translate("productNumber", {
                  code: code || "--",
                })}
              </Text>
              <View
                style={[
                  styles.between,
                  {
                    marginTop: 10,
                  },
                ]}
              >
                <Text style={styles.price}>
                  {formatNumber(product.price || 0, ",")}đ
                </Text>
                <Text style={styles.qty}>x{product.quantity || QUANTITY}</Text>
              </View>
            </>
          ) : (
            <>
              <View style={[styles.between]}>
                <Text style={styles.masp}>
                  {translate("productNumber", {
                    code: code || "--",
                  })}
                </Text>
                <Text
                  style={[
                    styles.qty,
                    {
                      marginTop: 5,
                    },
                  ]}
                >
                  x{product.quantity || QUANTITY}
                </Text>
              </View>
            </>
          )}
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  center: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  viewImage: {
    borderColor: colors.c_F3F3F3,
    borderWidth: 1,
    width: 75,
    height: 75,
    borderRadius: 4,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 4,
    overflow: "hidden",
    // marginVertical: 5,
  },
  viewLabel: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#C7C7CC",
    width: 45,
  },
  txtLabel: {
    fontSize: 10,
    lineHeight: 15,
    color: "white",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    // marginVertical: 15,
    borderBottomColor: colors.c_F3F3F3,
    borderBottomWidth: 1,
    paddingTop: 24,
    paddingBottom: 10,
  },
  textName: {
    color: colors.c_48484A,
    fontSize: 16,
  },
  masp: {
    color: colors.c_48484A,
    fontSize: 12,
    marginTop: 5,
  },
  price: {
    color: colors.c_48484A,
    fontSize: 16,
    fontWeight: "500",
  },
  qty: {
    color: colors.primary,
    fontWeight: "500",
    fontSize: 12,
  },
  right: {
    paddingLeft: 18,
    flex: 1,
  },
  viewStatus: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },

  buttonRight: {
    backgroundColor: colors.c_FC832D,
    paddingHorizontal: 15,
    paddingVertical: 9,
  },
  textRight: {
    color: colors.c_ffffff,
    fontWeight: "500",
    fontSize: 14,
  },
  //NEW
  between: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
