import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../componets/Button";
import Input from "../../../componets/Input";
import InputPassword from "../../../componets/InputPassword";
import { colors } from "../../../constants/colors";
import { PASSWORD_REGEX } from "../../../constants/untils";
import { translate } from "../../../locale";
import { ScreenNames } from "../../../navigation/screen";
import {
  ClearErrors,
  Register,
  selectRegister,
} from "../../../redux/slice/Authen/register";
import { RegisterReq } from "../../../redux/type/Authen/register";

type FormInput = {
  userName: string;
  password: string;
  confirmPassword: string;
};

export default function CreateNewPassword({ ...props }) {
  const dispatch = useDispatch();
  const { tokenOTP } = useSelector(selectRegister);

  const Base = {
    userName: "",
    password: "",
    confirmPassword: "",
  };

  const [fields, setFields] = useState<FormInput>(Base);
  const [errorFields, setErrorFields] = useState<FormInput>(Base);

  const handleOnChangText = (name: string, value: string) => {
    setErrorFields({ ...errorFields, [name]: "" });
    setFields({
      ...fields,
      [name]: value,
    });
  };

  const handleOnChangePassword = (password: string) => {
    setErrorFields({ ...errorFields, password: "" });
    setFields({ ...fields, password });
    if (password && !PASSWORD_REGEX.test(password)) {
      setErrorFields({
        ...errorFields,
        password: translate("invalid_format"),
      });
    }
  };

  const handleOnChangeConfirmPassword = (confirmPassword: string) => {
    setErrorFields({ ...errorFields, confirmPassword: "" });
    setFields({ ...fields, confirmPassword });
    if (confirmPassword !== fields?.password) {
      setErrorFields({
        ...errorFields,
        confirmPassword: translate("not_match_password"),
      });
    }
  };

  const handleOnClickComfirm = async () => {
    
    const req = {
      name: fields?.userName,
      email: props?.route?.params?.emailOrPhoneNumber || "",
      phone: props?.route?.params?.emailOrPhoneNumber || "",
      password: fields?.password,
      registerToken: tokenOTP || "",
    };
    if (
      !fields?.userName ||
      !!errorFields?.password ||
      !!errorFields.confirmPassword
    ) {
      setErrorFields({
        userName: translate("required"),
        password: translate("required"),
        confirmPassword: translate("required"),
      });
      return false;
    }
    const res: any = await dispatch(Register(req as any));
    if (res?.meta?.requestStatus === "fulfilled") {
      dispatch(ClearErrors());
      props.navigation.navigate(ScreenNames.Login);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxForm}>
        <Input
          placeholder={translate("enter_username")}
          onChangeText={(text) => handleOnChangText("userName", text)}
          styleView={styles.viewInput}
          errorText={errorFields?.userName}
          title={translate("enter_username")}
        />
        <InputPassword
          placeholder={translate("password") + "*"}
          onChangeText={handleOnChangePassword}
          styleView={styles.viewInput}
          errorText={errorFields?.password}
          title={translate("password")}
        />
        <InputPassword
          placeholder={translate("confirm_password") + "*"}
          onChangeText={handleOnChangeConfirmPassword}
          styleView={styles.viewInputBottom}
          errorText={errorFields?.confirmPassword}
          title={translate("confirm_password")}
        />
      </View>
      <View style={styles.viewDesc}>
        <Text style={styles.txtDesc}>{translate("hint_password")}</Text>
      </View>
      <View style={styles.viewNext}>
        <Button
          onPress={handleOnClickComfirm}
          textButton={translate("agree")}
          styleText={styles.txtSubmit}
          styleBackground={styles.btnSubmit}
        />
      </View>
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
    marginTop: 113,
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
    color: colors.c_373737,
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
