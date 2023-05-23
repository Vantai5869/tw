import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Platform,
} from "react-native";

import { colors } from "../../../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { IconArrowLeft } from "../../../constants/icons";
import { translate } from "../../../locale";
import ButtonGradient from "../../../componets/ButtonCT";
import { PASSWORD_REGEX, VNP_REGEX } from "../../../constants/untils";
import { useAppDispatch } from "../../../redux/hooks";
import { selectRegister } from "../../../redux/slice/Authen/register";
import Alerts from "../../../componets/Alerts";
import Input from "../../../componets/Input";
import {
  ChangeInfo,
  GetDistributorInfo,
} from "../../../redux/slice/Profile/profile";
import { ScreenNames } from "../../../navigation/screen";

interface Props {
  openModal?: boolean;
  closeModal: () => void;
  data?: any;
}
interface formError {
  phone?: string;
}

const ChangePhone = ({ ...props }) => {
  const [errors, setErrors] = useState<formError>({});
  const [phone, setPhone] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const onCloseModal = () => {
    props.closeModal();
  };
  useEffect(() => {
    setPhone(props?.data?.phone);
  }, [props?.data?.phone]);

  const validateForm = () => {
    let formErrors: formError = {};
    if (!VNP_REGEX.test(phone)) {
      formErrors.phone = translate("wrong_phone_format");
    }
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      return true;
    }
    return false;
  };
  const onChangePhone = (e: string) => {
    setErrors({});
    setPhone(e);
  };
  const onSubmit = async () => {
    if (validateForm()) {
      // await dispatch(ChangeInfo({ phone: phone, email: props?.data?.email }));
      const formData = new FormData();

      formData.append("phone", phone);
      formData.append("email", props?.data?.email);
      formData.append("logo", props?.data?.logo);
      await dispatch(ChangeInfo(formData));

      await dispatch(GetDistributorInfo(""));
      onCloseModal();
    }
  };

  return (
    <Modal
      transparent
      visible={props.openModal}
      animationType="slide"
      onRequestClose={() => {
        onCloseModal();
      }}
    >
      <View
        style={{
          backgroundColor: colors.c_ffffff,
          flex: 1,
        }}
      >
        <View
          style={{
            backgroundColor: colors.c_ffffff,
            flex: 1,
          }}
        >
          <View style={styles.modalTitleView}>
            <TouchableOpacity
              onPress={() => {
                onCloseModal();
              }}
              style={styles.headerClose}
            >
              <IconArrowLeft
                stroke={colors.c_000000}
                width={20}
                fill={colors.c_000000}
              />
            </TouchableOpacity>
            <View style={styles.header}>
              <Text style={styles.modalTitle}>{translate("change_phone")}</Text>
            </View>
          </View>
          <View style={{ flex: 8, paddingHorizontal: 24 }}>
            <Input
              onChangeText={(e) => onChangePhone(e)}
              placeholder={translate("enter_phone")}
              // styleView={styles.input}
              //   title={translate("phone")}
              value={phone}
              required={true}
              errorText={errors?.phone}
            />
          </View>
          <View style={{ flex: 1 }}>
            <ButtonGradient
              textButton="Đồng ý"
              styleText={styles.textLogin}
              onPress={() => onSubmit()}
              style={styles.btnLoginContainer}
              styleBorder={{ paddingHorizontal: 24 }}
            />
          </View>
        </View>
        {/* <Alerts
          modalVisible={changePassword || false}
          content={translate("change_password_success")}
          confirm={() => {
            dispatch(resetSuccess(false)), props.closeModal();
            setPassword("");
            setNewPassword("");
            setConfirmPassword("");
          }}
          statusNoti={"false"}
        /> */}
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalTitleView: {
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    paddingTop: Platform.OS === "android" ? 10 : 45,
    flex: 1,
  },
  modalTitle: {
    fontSize: 18,
    lineHeight: 22,
    color: colors.c_000000,
    textAlign: "center",
    fontWeight: "700",
  },
  header: {
    justifyContent: "center",
    width: "90%",
    // borderWidth: 1,
  },
  headerClose: {},
  iconTurnOff: {
    width: 20,
    height: 20,
  },
  textLogin: {
    color: colors.c_ffffff,
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
  },
  btnLoginContainer: {
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
});
export default ChangePhone;
