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
import {
  MAIL_REGEX,
  PASSWORD_REGEX,
  VNP_REGEX,
} from "../../../constants/untils";
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
  email?: string;
}

const ChangeEmail = ({ ...props }) => {
  const [errors, setErrors] = useState<formError>({});
  const [email, setEmail] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const onCloseModal = () => {
    props.closeModal();
  };
  useEffect(() => {
    setEmail(props?.data?.email);
  }, [props?.data?.email]);

  const validateForm = () => {
    let formErrors: formError = {};
    if (!MAIL_REGEX.test(email)) {
      formErrors.email = translate("wrong_email_format");
    }
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      return true;
    }
    return false;
  };
  const onChangeEmail = (e: string) => {
    setErrors({});
    setEmail(e);
  };
  const onSubmit = async () => {
    if (validateForm()) {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("phone", props?.data?.phone);
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
              <Text style={styles.modalTitle}>{translate("change_email")}</Text>
            </View>
          </View>
          <View style={{ flex: 8, paddingHorizontal: 24 }}>
            <Input
              onChangeText={(e) => onChangeEmail(e)}
              placeholder={translate("enter_email")}
              // styleView={styles.input}
              //   title={translate("phone")}
              value={email}
              required={true}
              errorText={errors?.email}
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
export default ChangeEmail;
