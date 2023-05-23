import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { validateEmail } from "../../../common/utils";
import Button from "../../../componets/Button";
import ContainerWithKeyboard from "../../../componets/ContainerWithKeyboard";
import Input from "../../../componets/Input";
import { colors } from "../../../constants/colors";
import { PurposeOTP } from '../../../constants/type.interface';
import i18n from "../../../locale";
import { ScreenNames } from "../../../navigation/screen";
import {
  RequestOTP,
  selectRegister,
} from "../../../redux/slice/Authen/register";

const ForgotPassword = ({ ...props }) => {
  const purpose = PurposeOTP.reset;
  const dispatch = useDispatch();
  const { requestSuccess } = useSelector(selectRegister);

  const [value, setValue] = useState<string>("");
  const [errorText, serErrortext] = useState<string>("");

  const handelOnChangeText = (value: string) => {
    setValue(value);
    serErrortext("");
  };
  const handleSubmitNext = async () => {
    if (!value) {
      serErrortext(i18n.t("required"));
      return false;
    }

    const res: any = await dispatch(
      RequestOTP({ emailOrPhoneNumber: value, purpose })
    );
    if (res?.meta?.requestStatus === "fulfilled") {
      props.navigation.navigate(ScreenNames.ForgotPasswordOTP, {
        type: !!value && validateEmail(value) ? "email" : "phone",
        value,
        purpose,
      });
    }
  };

  return (
    <ContainerWithKeyboard style={styles.container}>
      <View style={styles.containerRegister}>
        <View style={styles.boxForm}>
          <Input
            onChangeText={handelOnChangeText}
            placeholder={i18n.t("email_phone")}
            styleView={styles.viewInputBottom}
            errorText={errorText}
            title={i18n.t("email_phones")}
          />
          <Button
            textButton={i18n.t("next")}
            styleBackground={styles.btnNext}
            styleText={styles.txtNext}
            onPress={handleSubmitNext}
          />
        </View>
      </View>
    </ContainerWithKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
  },
  containerRegister: {
    marginTop: 83,
    paddingHorizontal: 26,
    backgroundColor: "#ffffff",
  },
  boxForm: {
    marginBottom: 31,
  },
  viewInputBottom: {
    marginBottom: 10,
  },
  btnNext: {
    backgroundColor: colors.primary,
  },
  txtNext: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
    color: colors.c_ffffff,
  },
});

export default ForgotPassword;
