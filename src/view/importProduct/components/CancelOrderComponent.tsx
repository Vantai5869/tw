import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import Alerts from "../../../componets/Alerts";
import ButtonCT from "../../../componets/ButtonCT";
import { CheckBox } from "../../../componets/CheckBox";
import { colors } from "../../../constants/colors";
import { IconTimes, IconWarningSign } from "../../../constants/icons";
import { translate } from "../../../locale";
import {
  CancelOrderImport,
  GetDetailOrder,
  GetOrderImport,
  resetOrderImportState,
  selectOrderImport,
} from "../../../redux/slice/Sales/order-import";

type Props = {
  id: string;
  visible: boolean;
  setIsModal: () => void;
  type: "LIST" | "DETAIL";
  reason?: string;
  isView?: boolean;
};

export const CancelOrderComponent = ({
  id,
  visible,
  setIsModal,
  type,
  reason,
  isView,
  ...props
}: Props) => {
  const dispatch = useDispatch();
  const {
    loadingCancel,
    reasons,
    orderFilter,
    cancelOrderSuccess,
    errors,
    orderImportId,
  } = useSelector(selectOrderImport);

  const [active, setActive] = useState<boolean>(false);
  const [reasonType, setReasonType] = useState<string>("");
  const [reasonId, setReasonId] = useState<string>("");
  const [reasonName, setReasonName] = useState<string>("");
  const [errorText, setErrorText] = useState<string>("");
  const [reasonText, setReasonText] = useState("");
  const last = reasons?.length?.toString();

  const onSubmitCancel = async () => {
    setActive(false);
    if (!reasonType) {
      setErrorText(translate("please_select_reason"));
      return false;
    }
    if (!!errorText) {
      return false;
    }
    setActive(true);
    dispatch(
      CancelOrderImport({
        id,
        reason: reasonName,
        reasonId,
      })
    );
    return true;
  };

  const onClose = () => {
    setActive(false);
    setIsModal();
    setErrorText("");
    setErrorText("");
    setReasonType("");
    setReasonId("");
    setReasonName("");
  };

  const onConfirmAlert = () => {
    setActive(false);
    dispatch(resetOrderImportState(""));
  };

  const onConfirmSuccess = () => {
    dispatch(resetOrderImportState(""));
    if (type === "LIST") {
      dispatch(GetOrderImport(orderFilter || { skip: 0, take: 50 }));
    } else {
      dispatch(GetDetailOrder(id));
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      onTouchCancel={() => {
        onClose();
      }}
      transparent
      animationType="slide"
    >
      <View style={styles.containerModal}>
        <View style={styles.innerModal}>
          <View style={styles.between}>
            <Text style={styles.titleReason}>
              {isView
                ? translate("view_reason")
                : translate("title_reason_cancel")}
            </Text>
            <TouchableOpacity
              onPress={() => {
                onClose();
              }}
            >
              <IconTimes width={20} height={20} fill={"#000000"} />
            </TouchableOpacity>
          </View>
          {isView ? null : (
            <View style={styles.noteReason}>
              <IconWarningSign width={24} height={24} stroke={colors.primary} />
              <Text style={styles.txtnNoteReason}>
                {translate("note_reason_cancel")}
              </Text>
            </View>
          )}

          <View>
            {isView ? (
              <Text style={(styles.txtReason, { marginTop: 30 })}>
                {translate("cancel_order_success", { text: reason })}
              </Text>
            ) : (
              reasons?.map((el) => {
                return (
                  <View style={{ paddingVertical: 8 }}>
                    <CheckBox
                      typeRadio={true}
                      checked={reasonType === el?.position ? true : false}
                      onPress={() => {
                        setErrorText("");
                        setReasonType(el?.position || "");
                        setReasonId(el.id);
                        if (el?.position !== last) {
                          setReasonName("");
                          setReasonText(el.reasonName);
                        }
                      }}
                      node={
                        <Text style={styles.txtReason}>{el.reasonName}</Text>
                      }
                      styleNode={{ paddingLeft: 9 }}
                    />
                    {reasonType === last && el?.position === last ? (
                      <TextInput
                        placeholder={translate("enter_reason")}
                        style={styles.input}
                        multiline={true}
                        value={reasonName}
                        onChangeText={(text) => setReasonName(text)}
                        textAlignVertical="top"
                      />
                    ) : null}
                  </View>
                );
              })
            )}
          </View>
          {!!errorText ? (
            <View style={styles.viewError}>
              <Text style={styles.txtError}>{errorText}</Text>
            </View>
          ) : null}
          {isView ? null : (
            <ButtonCT
              styleText={styles.txtBtnCancel}
              textButton={translate("agree")}
              style={styles.btnCancel}
              onPress={() => onSubmitCancel()}
              loading={loadingCancel}
            />
          )}
        </View>
      </View>

      {orderImportId && orderImportId === id && active ? (
        <>
          <Alerts
            modalVisible={!!errors}
            content={errors || ""}
            confirm={() => onConfirmAlert()}
            statusNoti={"false"}
          />
          <Alerts
            modalVisible={cancelOrderSuccess || false}
            content={translate("cancel_order_success", {
              text: reasonName !== "" ? reasonName : reasonText,
            })}
            confirm={() => onConfirmSuccess()}
            statusNoti={"false"}
          />
        </>
      ) : null}
    </Modal>
  );
};

const styles = StyleSheet.create({
  between: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerModal: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "rgba(18, 18, 18, 0.7)",
  },
  innerModal: {
    backgroundColor: "white",
    paddingHorizontal: 24,
    paddingVertical: 26,
    width: "100%",
    flex: 1,
    minHeight: 300,
  },
  titleReason: {
    fontWeight: "700",
    fontSize: 16,
    color: colors.c_1F1F1F,
  },
  noteReason: {
    paddingHorizontal: 13,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.c_secondary,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 20,
  },
  txtnNoteReason: {
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 18,
    color: colors.primary,
    marginLeft: 14,
    flex: 1,
  },
  viewReason: { paddingVertical: 8 },
  txtReason: {
    fontWeight: "500",
    fontSize: 14,
    color: colors.c_3A3A3C,
    marginTop: 3,
  },
  btnCancel: { marginTop: 40, paddingVertical: 14 },
  txtBtnCancel: {
    color: "white",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
  },
  viewError: {
    marginTop: 8,
    marginBottom: 12,
  },
  txtError: {
    fontSize: 12,
    lineHeight: 14,
    color: "red",
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.12)",
    borderRadius: 8,
    marginTop: 10,
    minHeight: 182,
    paddingTop: 14,
    paddingBottom: 14,
    paddingHorizontal: 20,
  },
});
