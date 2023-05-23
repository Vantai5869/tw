import React, { useEffect, useLayoutEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
} from "react-native-confirmation-code-field";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../componets/Button";
import { colors } from "../../../../constants/colors";
import { icons } from "../../../../constants/icons";
import { translate } from "../../../../locale";
import { ScreenNames } from "../../../../navigation/screen";
import {
  ClearErrors,
  RequestOTP,
  selectRegister,
  setDefaultRegisterState,
  ValidateOTP,
} from "../../../../redux/slice/Authen/register";
import BackgroundTimer from "react-native-background-timer";
import Alerts from '../../../../componets/Alerts';

export default function ForgotPasswordOTP({ ...props }) {
  const number = 180;
  const purpose = props?.route?.params?.purpose;

  const dispatch = useDispatch();

  const [value, setValue] = useState("");
  const [isCheckBorder, setIsCheckBorder] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(number);
  const [errorText, setErrortext] = useState<string>("");
  const [openAlerts,setOpenAlerts] = useState(false);
  const { validateSuccess } = useSelector(selectRegister);

  const ref = useBlurOnFulfill({ value, cellCount: 6 });

  useEffect(() => {
    if (value.length === 6) {
      setIsCheckBorder(true);
    } else {
      setIsCheckBorder(false);
    }
  }, [value]);

  useEffect(() => {
    BackgroundTimer.start();
    let myInterval = BackgroundTimer.setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        setSeconds(0);
        BackgroundTimer.clearInterval(myInterval);
        BackgroundTimer.stop();
      }
    }, 1000);
    return () => {
      BackgroundTimer.clearInterval(myInterval);
      BackgroundTimer.stop();
    };
  });

  const onResend = () => {
    setSeconds(number);
    dispatch(ClearErrors());
    setValue("");
    dispatch(
      RequestOTP({
        emailOrPhoneNumber: props?.route?.params?.value || "",
        purpose,
      })
    );
  };

  const handleOnClickComfirm = async () => {
    if (!!errorText) {
      return false;
    }
    if (!value) {
      setErrortext(translate("please_enter_otp"));
      return false;
    }
    if (seconds === 0) {
      setErrortext(translate("exprie_time_otp"));
      return false;
    }
    dispatch(
      ValidateOTP({
        emailOrPhoneNumber: props?.route?.params?.value || "",
        otp: value,
        purpose,
      })
    );
  };

  useEffect(() => {
    if (validateSuccess === true) {
      dispatch(setDefaultRegisterState(""));
      onResetForm();
      props.navigation.navigate(ScreenNames.SetNewPassword, {
        emailOrPhoneNumber: props?.route?.params?.value,
        purpose,
      });
    } else if (validateSuccess === false) {
      setOpenAlerts(true);
    }
  }, [validateSuccess]);

  const onResetForm = () => {
    setSeconds(number);
    setValue("");
    setErrortext("");
    setIsCheckBorder(false);
  };

  const phoneHint =
    props?.route?.params?.type === "phone"
      ? props?.route?.params?.value?.slice(0, 2) +
      props?.route?.params?.value?.slice(2).replace(/.(?=...)/g, "*")
      : "";
  const emailHint = props?.route?.params?.value?.replace(
    /(\w{3})[\w.-]+@([\w.]+\w)/,
    "$1***@$2"
  );
  useEffect(() => {
    return () => {
      dispatch(setDefaultRegisterState(""));
      setOpenAlerts(false);
    }
  },[])
  return (
    <View style={styles.container}>
      <View style={styles.boxImage}>
        <Image source={icons.LOCK} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.viewDesc}>
        {props?.route?.params?.type === "phone" ? (
          <Text style={styles.txtDesc}>
            {translate("forgot_sent_otp_phone")}
            <Text style={styles.txtDesc}> {phoneHint} </Text>
          </Text>
        ) : (
          <Text style={styles.txtDesc}>
            {translate("forgot_sent_otp_email")}
            <Text style={styles.txtDesc}> {emailHint} </Text>
          </Text>
        )}
      </View>
      <View style={styles.viewOtp}>
        <CodeField
          ref={ref}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={6}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View
              style={[styles.borderBottom, isCheckBorder && styles.focusCell, !!errorText && styles.hasError,]}
            >
              <Text key={index} style={styles.cell}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
          caretHidden={false}
        />
        {errorText ? (
          <View style={styles.viewError}>
            <Text style={styles.txtError}>{errorText}</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.viewNext}>
          <Button
            onPress={handleOnClickComfirm}
            textButton={translate("next")}
            styleText={styles.txtNext}
            styleBackground={styles.btnNext}
          />
        </View>

      {seconds < 1 ? (
        <View style={[styles.viewTxtComfirm, , { marginTop: 10 }]}>
          <Text style={styles.txtComfirm}>
            {translate("you_havent_receive_verification_code")}{" "}
          </Text>
          <View style={styles.viewResend}>
            <TouchableOpacity onPress={onResend}>
              <Text style={styles.txtRefresh}>{translate("resend")}</Text>
            </TouchableOpacity>
            <Text style={styles.txtComfirm}> {translate("now")}</Text>
          </View>
        </View>
      ) : (
        <View style={[styles.viewTxtComfirm]}>
          <Text style={styles.txtComfirm}>
            {translate("please_wait")}
            <Text style={styles.txtNumberRed}> {seconds || 0}s </Text>
            {translate("receive_otp")}
          </Text>
        </View>
      )}
       <Alerts
        modalVisible={openAlerts}
        confirm={() => setOpenAlerts(false)}
        content={translate("invalid_otp")}
        statusNoti="false"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.c_ffffff,
    height: "100%",
    paddingTop: 80,
  },
  boxImage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  image: {
    width: 112.62,
    height: 79.14,
  },
  viewOtp: {
    marginBottom: 36,
  },
  codeFieldRoot: {
    marginTop: 20,
    paddingHorizontal: 57,
  },
  borderBottom: {
    borderBottomWidth: 2,
    borderBottomColor: colors.c_E2E2E2,
  },
  cell: {
    width: 40,
    height: 50,
    lineHeight: 38,
    fontSize: 24,
    textAlign: "center",
  },
  focusCell: {
    borderBottomColor: "#B9B9B9",
  },
  viewDesc: {
    paddingHorizontal: 26,
    marginBottom: 60,
  },
  txtDesc: {
    textAlign: "center",
    fontSize: 14,
    lineHeight: 18,
    // fontWeight: "500",
    color: colors.c_3A3A3C,
  },
  viewTxtComfirm: {
    paddingHorizontal: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  txtComfirm: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "500",
    color: colors.c_7B7B80,
  },
  viewResend: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  txtRefresh: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "500",
    color: "red",
  },
  viewNext: {
    marginBottom: 28,
    paddingHorizontal: 24,
  },
  btnNext: {
    backgroundColor: colors.c_667403,
  },
  txtNext: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
    color: colors.c_ffffff,
  },
  txtNumberRed: {
    color: "red",
  },
  hasError: {
    borderBottomColor: "red",
  },
  viewError: {
    paddingTop: 20,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "center",
  },
  txtError: {
    fontSize: 14,
    lineHeight: 16,
    color: "red",
  },
});
