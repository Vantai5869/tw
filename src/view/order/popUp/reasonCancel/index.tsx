import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CheckBox } from "../../../../componets/CheckBoxCT";
import { colors } from "../../../../constants/colors";
import { IconClose, IconWarning } from "../../../../constants/icons";
import { CheckboxShip } from "../components/checkbox";
import ButtonCT from "../../../../componets/ButtonCT";
import { useAppDispatch, useAppSelector } from "./../../../../redux/hooks";
import {
  AcceptOrder,
  CancelOrder,
  RejectOrder,
  selectOrderByRetailer,
} from "./../../../../redux/slice/Order/retailer-order";
import { DIMENSIONS } from "./../../../../common/utils";
import { GetReasonRes } from "../../../../redux/type/Orders/order";
interface Props {
  listReason?: GetReasonRes[];
  modalVisible: boolean;
  setModal: (value: boolean) => void;
  id: string;
  status: string;
}
const ReasonCancel: React.FC<Props> = ({
  modalVisible,
  setModal,
  id,
  status,
  listReason,
}) => {
  const [isModal, setIsModal] = useState(false);
  const [value, setValue] = useState("");
  const [reasonID, setReasonID] = useState("");
  const [reasonCode, setReasonCode] = useState("");
  const [isFocused, setIsFocus] = useState(false);
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(selectOrderByRetailer);
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setIsModal(modalVisible);
  }, [modalVisible]);
  const handleFocus = () => {
    setIsFocus(true);
  };
  const handleBlur = () => {
    setIsFocus(false);
  };
  const handleText = (e: string) => {
    setText(e);
  };
  const handleSetReason = (e: GetReasonRes) => {
    setValue(e.reasonName);
    setReasonID(e.id);
    setReasonCode(e.reasonCode);
  };

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
          <View>
            <View style={styles.header}>
              <Text style={styles.title}>Chọn lí do huỷ</Text>
              <TouchableOpacity onPress={() => setModal(false)}>
                <IconClose width={15} height={15} />
              </TouchableOpacity>
            </View>
            <View style={styles.warning}>
              <IconWarning width={21} height={21} />
              <Text style={styles.warn_content}>
                Vui lòng chọn lý do huỷ. Với lý do này, bạn sẽ huỷ tất cả sản
                phẩm trong đơn hàng và không thể thay đổi sau đó
              </Text>
            </View>
            <View style={styles.checkbox_wrapper}>
              {listReason?.map((item) => (
                <View style={styles.option}>
                  <TouchableOpacity
                    style={styles.choosen}
                    onPress={() => handleSetReason(item)}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        {
                          backgroundColor:
                            value == item.reasonName ? "#2982E2" : "white",
                        },
                      ]}
                    ></View>
                    <Text style={styles.data}>{item.reasonName}</Text>
                  </TouchableOpacity>
                </View>
              ))}
              {/* <View style={styles.option}>
              <CheckboxShip
                setValue={setValue}
                data={"Hết hàng"}
                value={value}
              />
            </View>
            <View style={styles.option}>
              <CheckboxShip
                setValue={setValue}
                data={"Tạm thời nghỉ bán"}
                value={value}
              />
            </View>
            <View style={styles.option}>
              <CheckboxShip
                setValue={setValue}
                data={"Lý do khác"}
                value={value}
              />
            </View> */}
            </View>
            <View>
              <TextInput
                style={styles.textInput}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChangeText={(e) => handleText(e)}
                value={text}
                placeholderTextColor={colors.c_A5A5A5}
                placeholder={"Nhập lý do cụ thể ở đây"}
                multiline={true}
                editable={reasonCode !== ""}
              ></TextInput>
            </View>
          </View>
          <View style={styles.btn_wrap}>
            <ButtonCT
              loading={loading}
              textButton={"Đồng ý"}
              style={{ paddingVertical: 14 }}
              styleBackground={styles.background_btn}
              styleText={styles.txtAccept}
              onPress={() => {
                status == "2"
                  ? dispatch(
                      RejectOrder({
                        id: id,
                        reason: {
                          reason: value != "Lý do khác" ? value : text,
                        },
                      })
                    )
                  : dispatch(
                      CancelOrder({
                        id: id,
                        reason: {
                          reason: reasonCode != "Other" ? "" : text,
                          reasonId: reasonID,
                        },
                      })
                    );
              }}
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
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flex: 1,
    // padding: 53,
  },
  modal_container: {
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
    color: colors.c_1f1f1f,
  },
  warning: {
    alignItems: "center",
    width: "100%",
    // height: 78,
    paddingHorizontal: 14.5,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.c_light_blue,
    backgroundColor: colors.c_blue,
    borderRadius: 8,
    marginBottom: 22,
    flexDirection: "row",
  },
  warn_content: {
    // backgroundColor: "red",
    marginLeft: 14,
    width: DIMENSIONS.width - 114.5,
    fontSize: 12,
    lineHeight: 18,
    color: colors.primary,
  },
  checkbox_wrapper: {
    width: "100%",
    // marginBottom: 13,
  },
  option: {
    marginBottom: 20,
  },
  btn_wrap: {
    marginBottom: 0,
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
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.c_000_012,
    height: 182,
    textAlignVertical: "top",
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22,
    marginBottom: 30,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 100,
    marginRight: 9,
  },
  choosen: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
  data: {
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 22,
    color: colors.c_3A3A3C,
  },
});
export default ReasonCancel;
