import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../componets/Button";
import InputPassword from "../../../../componets/InputPassword";
import { colors } from "../../../../constants/colors";
import { PASSWORD_REGEX } from "../../../../constants/untils";
import i18n, { translate } from "../../../../locale";
import { NavigatorName, ScreenNames } from "../../../../navigation/screen";
import {
  ResetPassword, setDefaultRegisterState,
} from "../../../../redux/slice/Authen/register";
import { selectRegister } from "../../../../redux/slice/Authen/register";
import { ResetPasswordOTPReq } from "../../../../redux/type/Authen/register";
import Alerts from "../../../../componets/Alerts"

type FormInput = {
  password: string;
  confirmPassword: string;
};

export default function SetNewPassword({ ...props }) {
  const dispatch = useDispatch();
  const { tokenOTP, fpSuccess } = useSelector(selectRegister);
  const [fgSuccess, setFgSuccess] = useState(false)

  const [fields, setFields] = useState<FormInput>({
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState<FormInput>({
    password: "",
    confirmPassword: "",
  });

  const handleOnChangePassword = (password: string) => {
    setFormErrors({ ...formErrors, password: "" });
    setFields({ ...fields, password });
    if (password && !PASSWORD_REGEX.test(password)) {
      setFormErrors({
        ...formErrors,
        password: i18n.t("invalid_format"),
      });
    }
  };

  const handleOnChangeConfirmPassword = (confirmPassword: string) => {
    setFormErrors({ ...formErrors, confirmPassword: "" });
    setFields({ ...fields, confirmPassword });
    if (confirmPassword !== fields?.password) {
      setFormErrors({
        ...formErrors,
        confirmPassword: i18n.t("not_match_password"),
      });
    }
  };

  const handleOnClickComfirm = async () => {
    const req: ResetPasswordOTPReq = {
      emailOrPhoneNumber: props?.route?.params?.emailOrPhoneNumber,
      password: fields?.password,
      resetToken: tokenOTP || "",
    };
    if (!fields?.password && !fields.confirmPassword) {
      setFormErrors({
        ...formErrors,
        confirmPassword: i18n.t("required"),
        password: i18n.t("required"),
      });
      // Alert.alert(translate("please_enter_password"));
      return false;
    }

    if (!!fields.password && !PASSWORD_REGEX.test(fields.password)) {
      setFormErrors({
        ...formErrors,
        password: i18n.t("invalid_format"),
      });
      return false;
    }

    if (
      !!fields.confirmPassword &&
      fields.confirmPassword !== fields?.password
    ) {
      setFormErrors({
        ...formErrors,
        confirmPassword: i18n.t("not_match_password"),
      });
      return false;
    }
    if (!fields.password || !fields.confirmPassword) {
      setFormErrors({
        ...formErrors,
        password: !!fields?.password ? "" : translate("required"),
        confirmPassword: !!fields?.confirmPassword ? "" : translate("required"),
      });
      return false;
    }

    if (!!formErrors.password || !!formErrors.confirmPassword) {
      return false;
    }
    if (!!tokenOTP) {
      dispatch(ResetPassword(req));
    }
  };
  const redirectLogin = () => {
    props.navigation.navigate(ScreenNames.Login);
    setFgSuccess(false);
  }
  useEffect(() => {
    if (fpSuccess === true) {
      dispatch(setDefaultRegisterState(""));
      setFgSuccess(fpSuccess);
    }
  }, [fpSuccess]);

  return (
    <View style={styles.container}>
      <View style={styles.boxForm}>
        <InputPassword
          value={fields?.password}
          title={i18n.t("new_password")}
          placeholder={i18n.t("password")}
          onChangeText={handleOnChangePassword}
          styleView={styles.viewInput}
          errorText={formErrors?.password}
          required={true}
        />
        <InputPassword
          value={fields?.confirmPassword}
          title={i18n.t("confirm_new_password")}
          placeholder={i18n.t("confirm_password")}
          onChangeText={handleOnChangeConfirmPassword}
          styleView={styles.viewInputBottom}
          errorText={formErrors?.confirmPassword}
          required={true}
        />
      </View>
      <View style={styles.viewDesc}>
        <Text style={styles.txtDesc}>{i18n.t("hint_password")}</Text>
      </View>
      <View style={styles.viewNext}>
        <Button
          onPress={handleOnClickComfirm}
          textButton={i18n.t("agree")}
          styleText={styles.txtSubmit}
          styleBackground={styles.btnSubmit}
        />
      </View>
      <Alerts
        modalVisible={fgSuccess}
        confirm={() => redirectLogin()}
        content="Bạn đã thay đổi mật khẩu thành công"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.c_ffffff,
    height: "100%",
    paddingHorizontal: 24,
  },
  boxForm: {
    marginTop: 60,
  },
  viewInput: {
    marginBottom: 8,
  },
  viewInputBottom: {
    marginBottom: 12,
  },
  viewDesc: {
    paddingHorizontal: 14,
    paddingBottom: 24,
  },
  txtDesc: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    color: colors.c_8E8E93,
    textAlign: "center",
  },
  viewNext: {},
  btnSubmit: {
    backgroundColor: colors.primary,
  },
  txtSubmit: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
    color: colors.c_ffffff,
  },
});
