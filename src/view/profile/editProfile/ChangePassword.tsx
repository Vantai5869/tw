import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
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
import InputPassword from "../../../componets/InputPassword";
import { translate } from "../../../locale";
import ButtonGradient from "../../../componets/ButtonCT";
import {
  ChangePassWord,
  resetSuccess,
  resetMessageError,
} from "../../../redux/slice/Authen/register";
import { PASSWORD_REGEX } from "../../../constants/untils";
import { useAppDispatch } from "../../../redux/hooks";
import { selectRegister } from "../../../redux/slice/Authen/register";
import Alerts from "../../../componets/Alerts";

interface Props {
  openModal?: boolean;
  closeModal: () => void;
}
interface formError {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const ChangePassword = (props: Props) => {
  const dispatch = useAppDispatch();
  const { changePassword, messageError } = useSelector(selectRegister);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [errors, setErrors] = useState<formError>({});
  const [errorAlert, setErrorAlert] = useState<boolean>(false);

  const onCloseModal = () => {
    props.closeModal();
  };

  useEffect(() => {
    if (messageError) {
      setErrorAlert(true);
    }
  }, [messageError]);
  useEffect(() => {
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      setErrorPassword(true);
    } else setErrorPassword(false);
  }, [newPassword, confirmPassword]);
  const onChangeText = (name: string, value: string) => {
    setErrors({});
    if (name === "old_password") {
      setPassword(value);
    }
    if (name === "new_password") {
      setNewPassword(value);
    }
    if (name === "confirm_new_password") {
      setConfirmPassword(value);
    }
  };
  const validateForm = () => {
    let formErrors: formError = {};
    if (!password) {
      formErrors.currentPassword = translate("required");
    }
    if (password && !PASSWORD_REGEX.test(password)) {
      formErrors.currentPassword = translate("password_wrong_format");
    }
    if (!newPassword) {
      formErrors.newPassword = translate("required");
    }
    if (!confirmPassword) {
      formErrors.confirmPassword = translate("required");
    }
    if (newPassword && !PASSWORD_REGEX.test(newPassword)) {
      formErrors.newPassword = translate("password_wrong_format");
    }
    if (confirmPassword && !PASSWORD_REGEX.test(confirmPassword)) {
      formErrors.confirmPassword = translate("password_wrong_format");
    }

    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      return true;
    }
    return false;
  };
  const onChangePassword = () => {
    if (validateForm() && !errorPassword) {
      const request = { currentPassword: password, newPassword: newPassword };
      dispatch(ChangePassWord(request));
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
              <Text style={styles.modalTitle}>
                {translate("change_password")}
              </Text>
            </View>
          </View>

          <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
            <InputPassword
              placeholder={translate("insert_password")}
              onChangeText={(text) => onChangeText("old_password", text)}
              title={translate("old_password")}
              required={true}
              errorText={errors.currentPassword}
            />
          </View>
          <View style={{ paddingHorizontal: 24 }}>
            <InputPassword
              placeholder={translate("insert_password")}
              onChangeText={(text) => onChangeText("new_password", text)}
              title={translate("new_password")}
              required={true}
              errorText={errors.newPassword}
            />
          </View>
          <View style={{ paddingHorizontal: 24 }}>
            <InputPassword
              placeholder={translate("insert_password")}
              onChangeText={(text) =>
                onChangeText("confirm_new_password", text)
              }
              title={translate("confirm_new_password")}
              required={true}
              errorText={errors.confirmPassword}
            />
          </View>
          {errorPassword ? (
            <View style={{ paddingHorizontal: 24, paddingBottom: 20 }}>
              <Text style={{ color: colors.light_red, textAlign: "center" }}>
                {translate("not_match_password")},
              </Text>
            </View>
          ) : null}
          <View
            style={{
              paddingHorizontal: 38,
              alignItems: "center",
              paddingBottom: 40,
            }}
          >
            <Text
              style={{
                color: colors.c_636366,
                fontSize: 14,
                lineHeight: 18,
                fontWeight: "500",
              }}
            >
              {translate("hint_password")}
            </Text>
          </View>
          <ButtonGradient
            textButton="Đồng ý"
            styleText={styles.textLogin}
            onPress={() => onChangePassword()}
            style={styles.btnLoginContainer}
            styleBorder={{ paddingHorizontal: 24 }}
          />
        </View>
        <Alerts
          modalVisible={changePassword || false}
          content={translate("change_password_success")}
          confirm={() => {
            dispatch(resetSuccess(false)), props.closeModal();
            setPassword("");
            setNewPassword("");
            setConfirmPassword("");
          }}
          statusNoti={"false"}
        />
        <Alerts
          modalVisible={errorAlert}
          content={messageError ? messageError : ""}
          confirm={() => {
            setErrorAlert(false);
            dispatch(resetMessageError(null));
          }}
          statusNoti={"false"}
        />
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
export default ChangePassword;
