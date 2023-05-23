import { StyleSheet, Text, View } from "react-native";
import i18n, { translate } from "../../../../locale";
import { colors } from "../../../../constants/colors";
import {
  IconCancelOrder,
  IconDeliveryFastOrder,
  IconDeliverySuccess,
  IconDeliveryTimeOrder,
  IconLogoTinWin,
  IconRetailerShip,
  IconRetailerShip2,
  IconWatch,
} from "../../../../constants/icons";
import React, { useEffect } from "react";
interface Props {
  status?: string;
  props?: any;
  item?: any;
}
const Banner: React.FC<Props> = ({ status, item }) => {
  useEffect(() => {
    chooseStatus();
  }, [status]);

  const shippingType = (type: number) => {
    switch (type) {
      case 1:
        return {
          content: "Tinwin giao hàng",
          icon: (
            <IconLogoTinWin width={30} height={23} fill={colors.c_7B7B80} />
          ),
        };

      case 2:
        if (status == "3") {
          return {
            content: "Đại lý tự giao hàng",
            icon: (
              <IconRetailerShip width={15} height={12} fill={colors.c_7B7B80} />
            ),
          };
        } else {
          return {
            content: "Đại lý vận chuyển",
            icon: (
              <IconRetailerShip2
                width={24}
                height={24}
                // fill={colors.c_7B7B80}
              />
            ),
          };
        }
    }
  };
  const chooseCancelType = (cancelType: number) => {
    switch (cancelType) {
      case 1:
        return "Đã hủy bởi hệ thống";
      case 2:
        return "Đã hủy bởi khách hàng";
      case 4:
        return "Đã hủy bởi nhà cung cấp";
      case 3:
        return "Đã hủy bởi đại lý";
    }
  };
  const chooseStatus = () => {
    if (status == "2") {
      return {
        status: "Chờ xác nhận",
        content: `Tự hủy sau ${item.rejectTime} phút`,
        color: colors.c_F6F8ED,
        icon: <IconWatch width={24} height={24} fill={colors.c_a3a3a3} />,
      };
    }
    if (status == "3") {
      return {
        status: "Đang chuẩn bị",
        content: `${shippingType(item.shippingType)?.content}`,
        content_icon: shippingType(item.shippingType)?.icon,
        color: colors.c_eaf4ff,
        icon: (
          <IconDeliveryTimeOrder
            width={24}
            height={24}
            // fill={colors.c_a3a3a3}
            // stroke={"black"}
          />
        ),
      };
    }
    if (status == "4") {
      return {
        status: "Đang giao",
        content: `${shippingType(item.shippingType)?.content}`,
        content_icon: shippingType(item.shippingType)?.icon,
        color: colors.c_FFF4E5,
        icon: <IconDeliveryFastOrder width={24} height={24} />,
      };
    }
    if (status == "5") {
      return {
        status: "Đã giao thành công",
        content: "",
        color: colors.c_e9f8ff,
        icon: <IconDeliverySuccess width={24} height={24} />,
      };
    } else
      return {
        status: chooseCancelType(item.cancelType),
        content: item.cancelReason != null ? `Lý do: ${item.cancelReason}` : "",
        color: colors.c_fff2f1,
        icon: <IconCancelOrder width={24} height={24} />,
      };
  };
  return (
    <View
      style={[
        styles.viewXn,
        {
          backgroundColor: chooseStatus().color,
        },
      ]}
    >
      {chooseStatus().icon}
      <View
        style={[
          styles.viewLeftXn,
          {
            flexDirection:
              status == "0"
                ? item.cancelReason != null
                  ? "column"
                  : "row"
                : "row",
          },
        ]}
      >
        <Text style={styles.textXn}>{i18n.t(chooseStatus().status)}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={[
              styles.textNumberXn,
              { color: status == "2" ? colors.c_ff3b30 : colors.c_7B7B80 },
            ]}
          >
            {chooseStatus().content}
          </Text>
          {chooseStatus().content_icon}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  viewXn: {
    height: "100%",
    flexDirection: "row",
    // justifyContent: "space-between",
    paddingHorizontal: 19,
    paddingVertical: 15,

    alignItems: "center",
    // backgroundColor: colors.c_F6F8ED,
    borderRadius: 8,
    marginBottom: 8,
  },
  viewLeftXn: {
    flexDirection: "row",
    width: "90%",
    // backgroundColor: "blue",
    justifyContent: "space-between",

    // alignItems: "center",
  },
  textXn: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.c_1f1f1f,
    // backgroundColor: "red",
    textAlignVertical: "center",
    marginLeft: 11,
  },
  textNumberXn: {
    marginLeft: 11,
    marginRight: 3,
    fontSize: 12,
    fontWeight: "500",
    // color: colors.c_ff3b30,
    // backgroundColor: "blue",
    textAlignVertical: "center",
  },
});
export default Banner;
