import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CheckBox } from "../../../../componets/CheckBoxCT";
import { colors } from "../../../../constants/colors";
import { IconClose } from "../../../../constants/icons";
import { CheckboxShip } from "../components/checkbox";
import ButtonCT from "../../../../componets/ButtonCT";
import { useAppDispatch, useAppSelector } from "./../../../../redux/hooks";
import {
  AcceptOrder,
  selectOrderByRetailer,
} from "./../../../../redux/slice/Order/retailer-order";
interface Props {
  modalVisible: boolean;
  setModal: (value: boolean) => void;
  id: string;
}
const OPTION = [
  {
    id: 1,
    data: "Tinwin giao hàng",
  },
  {
    id: 2,
    data: "Đại lý tự giao",
  },
];
const ShippingType: React.FC<Props> = ({ modalVisible, setModal, id }) => {
  const [isModal, setIsModal] = useState(false);
  const [value, setValue] = useState("Tinwin giao hàng");
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(selectOrderByRetailer);
  const getNum = (data: string) => {
    for (let i = 0; i < 2; i++) {
      if (OPTION[i].data === data) {
        return OPTION[i].id;
      }
    }
  };

  useEffect(() => {
    setIsModal(modalVisible);
  }, [modalVisible]);
  return (
    <Modal
      animationType="slide"
      transparent
      visible={isModal}
      onRequestClose={() => {
        setModal(!isModal);
      }}
    >
      <View style={styles.container}>
        <View style={styles.modal_container}>
          <View style={styles.header}>
            <Text style={styles.title}>Chọn hình thức vận chuyển</Text>
            <TouchableOpacity onPress={() => setModal(false)}>
              <IconClose width={15} height={15} />
            </TouchableOpacity>
          </View>
          <View style={styles.checkbox}>
            {OPTION.map((item, index) => {
              return (
                <View style={styles.option} key={item.id}>
                  <CheckboxShip
                    setValue={setValue}
                    data={item.data}
                    value={value}
                  />
                </View>
              );
            })}
            {/* <View style={styles.option}>
              <CheckboxShip
                setValue={setValue}
                data={"Tinwin giao hàng"}
                value={value}
              />
            </View>
            <View style={styles.option}>
              <CheckboxShip
                setValue={setValue}
                data={"Đại lý tự giao"}
                value={value}
              />
            </View> */}
          </View>
          <View style={styles.btn_wrap}>
            <ButtonCT
              loading={loading}
              textButton={"Đồng ý"}
              styleBackground={styles.background_btn}
              styleText={styles.txtAccept}
              onPress={() =>
                dispatch(
                  AcceptOrder({
                    id: id,
                    shippingType: { shippingType: getNum(value) },
                  })
                )
              }
              style={{ paddingVertical: 14 }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
export const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.c_999999,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    // padding: 53,
  },
  modal_container: {
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 33,
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    color: colors.c_1f1f1f,
  },
  checkbox: {
    width: "100%",
    marginBottom: 13,
  },
  option: {
    marginBottom: 20,
  },
  btn_wrap: {
    marginBottom: 30,
  },
  background_btn: {
    backgroundColor: colors.c_667403,
    // marginBottom: 30,
  },
  txtAccept: {
    color: colors.c_ffffff,
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
  },
});
export default ShippingType;
