import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
// import ButtonGradient from "../../../componets/Button";
import ButtonBoder from "../../../componets/ButtonBoder";
import ContainerWithKeyboard from "../../../componets/ContainerWithKeyboard";
import InputPassword from "../../../componets/InputPassword";
import { colors } from "../../../constants/colors";
import { MEDIA } from "../../../constants/media";
import { navigate } from "../../../navigation/navigate";
import { NavigatorName, ScreenNames } from "../../../navigation/screen";
import { useAppSelector } from "../../../redux/hooks";
import {
  LoginDL,
  resetLoading,
  selectLogin,
} from "../../../redux/slice/Authen/login";
import ButtonGradient from "../../../componets/ButtonCT";
import Input from "../../../componets/Input";
import { DIMENSIONS } from "../../../common/utils";
import { translate } from "../../../locale/index";
import { CLIENT_AUTH } from "../../../constants/untils";
import { persistedStorage } from "../../../common/storage";
import Arlets from "../../../componets/Alerts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { selectRegister } from "../../../redux/slice/Authen/register";
import { useSelector } from "react-redux";
import LinearGradient from "react-native-linear-gradient";

interface LoginError {
  userNameOrEmailAddress?: string;
  password?: string;
}

const Login = ({ ...props }) => {
  const dispatch = useDispatch();

  const [userNameOrEmailAddress, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const [error, setError] = useState(false);
  const [formErrors, setFormErrors] = useState<LoginError>({});
  const dataLogin = useAppSelector((state: any) => state.loginReducer);
  const [notiLogin, setNotiLogin] = useState(false);
  const changeUserName = (value: string) => {
    setUserName(value);
    setFormErrors({});
    setError(false);
  };

  const changePass = (value: string) => {
    setPassWord(value);
    setFormErrors({});
    setError(false);
  };
  const validateForm = () => {
    let errors: LoginError = {};
    if (!userNameOrEmailAddress) {
      errors.userNameOrEmailAddress = translate("required");
    }
    if (!password) {
      errors.password = translate("required");
    }

    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      return true;
    }
    return false;
  };

  const LoginAdmin = async () => {
    if (!validateForm()) {
      setError(true);
    } else {
      setError(false);
      const request = {
        ...CLIENT_AUTH,
        grant_type: "password",
        username: userNameOrEmailAddress,
        password: password,
      };

      dispatch(LoginDL(request));
    }
  };

  useEffect(() => {
    if (dataLogin?.loading === true) {
      props.navigation.navigate(NavigatorName.Home);
    } else if (dataLogin?.loading === false) {
      checkAccount(userNameOrEmailAddress);
      // setNotiLogin(true);
    }
    return () => {
      dispatch(resetLoading(null));
    };
  }, [dataLogin?.loading]);

  const checkAccount = async (data: string) => {
    const userName = await AsyncStorage.getItem("userName");

    if (userName === data) {
      props.navigation.navigate(ScreenNames.RegisterStatus);
    } else {
      setNotiLogin(true);
    }
  };

  useEffect(() => {
    const checkAppLaunch = async () => {
      const firstLaunchs = await AsyncStorage.getItem("firstLaunch");
      if (firstLaunchs === "first") {
      } else {
        AsyncStorage.setItem("firstLaunch", "first");
      }
    };
    checkAppLaunch();
  }, []);

  return (
    // <View style={styles.containerView}>
    <View style={styles.container}>
      <View style={styles.viewHeader}>
        <Image source={MEDIA.IMAGE_LOGO} style={styles.ImageLogo} />
        <View style={styles.viewTitle}>
          <Text style={styles.title}>Chào mừng bạn</Text>
          <Text style={styles.title}>
            đến với
            <Text style={styles.tinTin}> TinWin.</Text>
          </Text>
          {/* <Text style={styles.title}>Đăng ký ngay!</Text> */}
        </View>
      </View>
      <View style={styles.viewInput}>
        <Input
          value={userNameOrEmailAddress}
          placeholder="Email / Số điện thoại"
          onChangeText={(e: any) => changeUserName(e)}
          // errorText={formErrors?.userNameOrEmailAddress}
          title="Email / Số điện thoại"
        />
        <InputPassword
          value={password}
          placeholder="Mật khẩu"
          onChangeText={(e: any) => changePass(e)}
          // errorText={formErrors?.password}
          title="Mật khẩu"
        />
        <View style={error ? styles.errors : null}>
          {error ? (
            <Text style={styles.textError}>
              {translate("Sai tài khoản hoặc mật khẩu ")}
            </Text>
          ) : (
            <View></View>
          )}
        </View>
      </View>
      <Text
        style={styles.textForgot}
        onPress={() => {
          props.navigation.navigate(ScreenNames.ForgotPassWord);
        }}
      >
        Quên mật khẩu?
      </Text>
      <View style={styles.buttonBottom}>
        <ButtonGradient
          textButton="Đăng nhập"
          styleText={styles.textLogin}
          onPress={LoginAdmin}
          style={styles.btnLoginContainer}
          styleBorder={{ paddingVertical: 0 }}
        />

        <View style={styles.viewline}>
          <View style={styles.lineleft}></View>
          <View>
            <Text style={styles.textOr}>Hoặc</Text>
          </View>
          <View style={styles.lineleft}></View>
        </View>
        <ButtonBoder
          textButton="Đăng ký trở thành Đại lý"
          // boderColor={styles.borderRegister}
          style={styles.borderRegister}
          styleText={styles.textRegister}
          onPress={() => props.navigation.navigate(ScreenNames.Register)}
        />
      </View>
      <Arlets
        modalVisible={notiLogin}
        content={translate("not_account")}
        confirm={() => setNotiLogin(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 24,
    paddingVertical: 40,
    backgroundColor: colors.c_ffffff,
  },
  containerImage: {
    paddingVertical: 20,
  },
  viewHeader: {
    // paddingTop: 40,
  },
  ImageLogo: {
    width: DIMENSIONS.width / 4,
    height: DIMENSIONS.width / 5,
    resizeMode: "contain",
    marginTop: 40,
    marginBottom: 30,
  },
  viewTitle: {
    // height: 130,
    // paddingBottom: 24,
    marginTop: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 28.3465,
    color: colors.c_2d2d2d,
  },
  tinTin: {
    fontWeight: "bold",
    fontSize: 30.19,
    color: colors.primary,
    marginLeft: 5,
  },
  inputEmail: {
    paddingVertical: 14,
    paddingLeft: 21,
    backgroundColor: colors.c_ffffff,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.c_000_01,
    // height: 50,
  },
  inputEmail2: {
    paddingVertical: 14,
    backgroundColor: colors.c_ffffff,
    borderRadius: 10,
    marginBottom: 10,
  },
  inputPass: {
    backgroundColor: colors.c_ffffff,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.c_000_01,
  },
  textForgot: {
    fontSize: 12,
    lineHeight: 22,
    color: colors.primary,
    fontWeight: "500",
    alignSelf: "flex-end",
    marginTop: -15,
  },
  textError: {
    fontSize: 12,
    lineHeight: 22,
    color: colors.c_ec4037,
    alignSelf: "center",
    // marginBottom: 21,
  },
  backgroundLogin: {
    borderRadius: 10,
    paddingVertical: 14,
  },
  textLogin: {
    color: colors.c_ffffff,
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
  },
  textOr: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 17,
    color: colors.c_a2a2a2,
    marginVertical: 20,
    marginHorizontal: 21,
  },
  borderRegister: {
    borderColor: colors.primary,
  },
  textRegister: {
    color: colors.primary,
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
  },

  viewline: {
    flexDirection: "row",
    alignItems: "center",
  },
  lineleft: {
    flex: 1,
    height: 1,
    backgroundColor: colors.c_f2f2f2,
  },
  btnLoginContainer: {
    width: DIMENSIONS.width - 24 * 2,
    paddingVertical: 14,
  },
  buttonBottom: {
    paddingBottom: 20,
    marginTop: 30,
  },
  errors: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  viewInput: {
    marginTop: 40,
  },
});

export default Login;
