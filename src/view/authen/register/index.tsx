import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Platform,
  FlatList,
  Alert,
  Dimensions,
} from "react-native";
import InputDropdown from "../../../componets/InputDropdown";
import Upload from "../../../componets/Upload";
import { colors } from "../../../constants/colors";
import { ScreenNames } from "../../../navigation/screen";
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IconAngleRight, StateCurrent, StateDone, StateInitial } from "../../../constants/icons";
import {
  RegisterHandle,
  selectRegister,
  resetRegisterReject,
  resetRegisterData,
} from "../../../redux/slice/Authen/register";
import MultiSelect from "../../../componets/MultiSelect";
import i18n from "../../../locale";
import axios from "axios";
import Input from "../../../componets/Input";
import InputPassword from "../../../componets/InputPassword";
import ButtonBoder from "../../../componets/ButtonBoder";
import { translate } from "../../../locale/index";
import { useAppSelector } from "../../../redux/hooks";
import {
  PASSWORD_REGEX,
  LINK_WEBSITE,
  MAIL_REGEX,
  VNP_REGEX,
} from "../../../constants/untils";
import Arlets from "../../../componets/Alerts";
import {
  selectProfile,
  addressDetail,
  resetAddressDetail,
} from "../../../redux/slice/Profile/profile";
import { DIMENSIONS } from "../../../common/utils";
import StepIndicator from 'react-native-step-indicator';
import RegisterFirstStep from "./registerFirstStep";
import RegisterSecondStep from "./registerSecondStep";
import RegisterThirdStep from "./registerThirdStep";
import RegisterSuccess from "./registerSuccess";
import LinearGradient from "react-native-linear-gradient";

const API_KEY = "AIzaSyACgDuS86Uo8i16uwrUnSXW1xnhlHx28p8";

interface BusinessType {
  value: number | undefined;
  label: string | undefined;
}

const initBusiness: BusinessType = {
  value: undefined,
  label: undefined,
};
interface RegisterError {
  phone?: string;
  password?: string;
  address?: string;
  businessType?: number | string;
  link?: string;
  licenseImage?: string | null;
  licenseImageList?: object;
  brandImage?: string | null;
  brandList?: object;
  frontImage?: string[];
  frontImage1?: string | null;
  frontImage2?: string | null;
  frontImage1List?: object;
  frontImage2List?: object;
  fontIdCart?: string | null;
  fontIdCartList?: object;
  behindIdCartList?: object;
  behindIdCart?: string | null;
  confirmPassword?: string;
  name?: string;
  // specificAddress?: string;
  provinceId?: string;
  districtId?: string;
  wardId?: string;
}
const initData = {
  name: "",
  phone: "",
  address: "",
  lattitude: 0,
  longtitude: 0,
  taxCode: "",
  link: "",
  password: "",
  confirmPassword: "",
  businessType: undefined,
  frontImage: [],
  brandImage: "",
  brandlist: {},
  licenseImage: "",
  licenseImageList: {},
  fontIdCart: "",
  behindIdCart: "",
  fontIdCartList: {},
  behindIdCartList: {},
  frontImage1List: {},
  frontImage2List: {},
  frontImage1: "",
  frontImage2: "",
  placeId: "",
};
const Register = ({ ...props }) => {
  const dispatch = useDispatch();
  const { registerReject, registerRes } = useAppSelector(
    (state: any) => state.registerReducer
  );
  const { addressState } = useSelector(selectProfile);
  const [checkBusinessType, setCheckBusinessType] = useState(initBusiness);
  const [isBusiness, setIsBusiness] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<RegisterError>({});
  const [location, setLocation] = useState<any>();
  const [dataRequest, setDataRequest] = useState(initData);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [statusRegister, setStatusRegister] = useState("");
  const [contentRegister, setContentRegister] = useState("");
  const [currentPosition, setCurrentPosition] = useState(1);
  const business = [
    {
      value: 1,
      label: "Offline",
    },
    {
      value: 2,
      label: "Online",
    },
  ];

  useEffect(() => {
    return () => {
      dispatch(resetAddressDetail(null));
      dispatch(resetRegisterData(null));
    };
  }, []);

  useEffect(() => {
    if (registerRes && registerRes.id) {
      setCheckBusinessType({ label: undefined, value: undefined });
      setDataRequest(initData);
      dispatch(addressDetail(null));
      setContentRegister(translate("You_have_submitted_the_registration_form"));
      setStatusRegister("true");
      setOpenModal(true);
      AsyncStorage.setItem("registerId", registerRes?.id);
    }
  }, [registerRes]);

  useEffect(() => {
    if (registerReject) {
      setOpenModal(true);
      setContentRegister(registerReject);
      setStatusRegister("false");
    }
  }, [registerReject]);

  const confirmRegister = () => {
    if (registerReject) {
      dispatch(resetRegisterReject(""));

      setOpenModal(false);
    } else {
      props.navigation.navigate(ScreenNames.LoadRegister);
      setOpenModal(false);
    }
  };

  const handleChoosePhoto = (value: string) => {
    setFormErrors({});
    if (value === "licenseImage") {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then((image) => {
        setDataRequest({
          ...dataRequest,
          licenseImage: image.path,
          licenseImageList: {
            uri: Platform.select({
              ios: `file://${image.path}`,
              android: image.path,
            }),
            type: image.mime,
            name: `my_profile_${image.modificationDate}.jpg`,
          },
        });
      });
    } else if (value === "brandImage") {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then((image) => {
        setDataRequest({
          ...dataRequest,
          brandImage: image.path,
          brandlist: {
            uri: Platform.select({
              ios: `file://${image.path}`,
              android: image.path,
            }),
            type: image.mime,
            name: `my_profile_${image.modificationDate}.jpg`,
          },
        });
      });
    } else if (value === "frontImage1") {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
      }).then((image) => {
        setDataRequest({
          ...dataRequest,
          frontImage1: image.path,
          frontImage1List: {
            uri: Platform.select({
              ios: `file://${image.path}`,
              android: image.path,
            }),
            type: image.mime,
            name: `my_profile_${image.modificationDate}.jpg`,
          },
        });
      });
    } else if (value === "frontImage2") {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then((image) => {
        setDataRequest({
          ...dataRequest,
          frontImage2: image.path,
          frontImage2List: {
            uri: Platform.select({
              ios: `file://${image.path}`,
              android: image.path,
            }),
            type: image.mime,
            name: `my_profile_${image.modificationDate}.jpg`,
          },
        });
      });
    } else if (value === "fontIdCart") {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then((image) => {
        setDataRequest({
          ...dataRequest,
          fontIdCart: image.path,
          fontIdCartList: {
            uri: Platform.select({
              ios: `file://${image.path}`,
              android: image.path,
            }),
            type: image.mime,
            name: `my_profile_${image.modificationDate}.jpg`,
          },
        });
      });
    } else if (value === "behindIdCart") {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then((image) => {
        setDataRequest({
          ...dataRequest,
          behindIdCart: image.path,
          behindIdCartList: {
            uri: Platform.select({
              ios: `file://${image.path}`,
              android: image.path,
            }),
            type: image.mime,
            name: `my_profile_${image.modificationDate}.jpg`,
          },
        });
      });
    }
  };

  const handlePreViewPhoto = (value: string) => { };

  const handleDeletePhoto = (value: string) => {
    setFormErrors({});
    if (value === "licenseImage") {
      setDataRequest({
        ...dataRequest,
        licenseImage: "",
        licenseImageList: {},
      });
    }
    if (value === "brandImage") {
      setDataRequest({
        ...dataRequest,
        brandImage: "",
        brandlist: {},
      });
    }

    if (value === "frontImage1") {
      setDataRequest({
        ...dataRequest,
        frontImage1: "",
        frontImage1List: {},
      });
    }
    if (value === "frontImage2") {
      setDataRequest({
        ...dataRequest,
        frontImage2: "",
        frontImage2List: {},
      });
    }
    if (value === "fontIdCart") {
      setDataRequest({
        ...dataRequest,
        fontIdCart: "",
        fontIdCartList: {},
      });
    }
    if (value === "behindIdCart") {
      setDataRequest({
        ...dataRequest,
        behindIdCart: "",
        behindIdCartList: {},
      });
    }
  };

  const changeSdt = (value: string) => {
    setFormErrors({});
    setDataRequest({ ...dataRequest, phone: value });
  };

  const changeDaily = (value: string) => {
    setDataRequest({ ...dataRequest, name: value });
  };

  const changePass = (value: string) => {
    setFormErrors({});
    setDataRequest({ ...dataRequest, password: value });
    if (value && !PASSWORD_REGEX.test(value)) {
      setFormErrors({
        ...formErrors,
        password: translate("invalid_format"),
      });
    }
  };

  const changeReTypePass = (value: string) => {
    setFormErrors({});
    setDataRequest({ ...dataRequest, confirmPassword: value });
    if (value && !PASSWORD_REGEX.test(value)) {
      setFormErrors({
        ...formErrors,
        confirmPassword: translate("invalid_format"),
      });
    }
  };

  const changeTaxCode = (value: string) => {
    setDataRequest({ ...dataRequest, taxCode: value });
  };

  const changeLink = (value: string) => {
    setFormErrors({});
    setDataRequest({ ...dataRequest, link: value });
  };

  const onTypeBusiness = (val: number[]) => {
    setFormErrors({});
    const pickedType = business?.find((item) => {
      if (item.value === val?.[0]) {
        return item;
      }
    });
    setCheckBusinessType({
      ...checkBusinessType,
      value: pickedType?.value,
      label: pickedType?.label,
    });
  };

  const validateForm = () => {
    let errors: RegisterError = {};
    if (!dataRequest?.phone) {
      errors.phone = translate("required");
    }

    if (dataRequest.phone.includes("@") || dataRequest.phone.includes(".")) {
      // email format check
      if (!MAIL_REGEX.test(dataRequest?.phone)) {
        errors.phone = translate("wrong_email_format");
      }
      if (dataRequest?.phone.length > 50) {
        errors.phone = translate("email_over_50_characters");
      }
    } else {
      if (!VNP_REGEX.test(dataRequest?.phone) && dataRequest?.phone) {
        errors.phone = translate("wrong_phone_format");
      }
      if (dataRequest?.phone.length > 50) {
        errors.phone = translate("email_over_50_characters");
      }
      // phone format check
    }
    if (!dataRequest?.password) {
      errors.password = translate("required");
    }
    if (!dataRequest?.confirmPassword) {
      errors.confirmPassword = translate("required");
    }
    if (dataRequest?.confirmPassword !== dataRequest?.password) {
      errors.confirmPassword = translate("not_match");
    }
    if (!addressState?.detailAddress) {
      errors.address = translate("required_address");
    }
    if (!addressState?.pickedProvince.id) {
      errors.provinceId = translate("required_province");
    }

    if (!addressState?.pickedDistrict.id) {
      errors.districtId = translate("required_district");
    }

    if (!addressState?.pickedWard.id) {
      errors.wardId = translate("required_ward");
    }
    if (checkBusinessType.value === undefined) {
      errors.businessType = translate("required");
    }
    if (checkBusinessType.value === 1) {
      if (!dataRequest?.licenseImage) {
        errors.licenseImage = translate("required");
      }
      if (!dataRequest?.brandImage) {
        errors.brandImage = translate("required");
      }
      if (!dataRequest?.frontImage1) {
        errors.frontImage1 = translate("required");
      }
      if (!dataRequest?.frontImage2) {
        errors.frontImage2 = translate("required");
      }
    }
    if (checkBusinessType.value === 2) {
      if (!dataRequest?.fontIdCart) {
        errors.fontIdCart = translate("required");
      }
      if (!dataRequest?.behindIdCart) {
        errors.behindIdCart = translate("required");
      }
      if (!dataRequest?.link) {
        errors.link = translate("required");
      }
    }
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      return true;
    }
    return false;
  };
  const onDetailAddress = () => {
    setFormErrors({});
    dispatch(addressDetail({ ...addressState, isRegister: true }));
    props.navigation.navigate(ScreenNames.AddressSelectRegister);
  };

  const onRegister = async () => {
    setCurrentPosition(currentPosition + 1);
    if (validateForm()) {
      const formData = new FormData();
      formData.append("name", dataRequest.name);
      if (dataRequest.phone.includes("@") || dataRequest.phone.includes(".")) {
        formData.append("email", dataRequest.phone);
      } else {
        formData.append("phone", dataRequest.phone);
      }
      formData.append("address", addressState?.detailAddress);
      formData.append("lattitude", location?.lat ? location?.lat : 21);
      formData.append("longtitude", location?.lng ? location?.lng : 100);
      formData.append("placeId", "asdfasdfaADFASwefwaf");
      formData.append("password", dataRequest.password);
      formData.append("businessType", checkBusinessType.value);
      formData.append("provinceId", addressState?.pickedProvince.id);
      formData.append("districtId", addressState?.pickedDistrict.id);
      formData.append("wardId", addressState?.pickedWard.id);
      if (checkBusinessType.value === 1) {
        formData.append("taxCode", dataRequest.taxCode);
        formData.append("licenseImage", dataRequest.licenseImageList);
        formData.append("frontImage", dataRequest.frontImage1List);
        formData.append("frontImage", dataRequest.frontImage2List);
        formData.append("brandImage", dataRequest.brandlist);
      } else {
        formData.append("fontIdCard", dataRequest.fontIdCartList);
        formData.append("behindIdCart", dataRequest.behindIdCartList);
        formData.append("link", dataRequest.link);
      }
      dispatch(RegisterHandle(formData));
    }
  };

  useEffect(() => {
    setCurrentPosition(1);
    return () => { setCurrentPosition(1) }
  }, [])


  const handleNextStep = (num: any) => {
    setCurrentPosition(num)
  };

  const handleReturnStep = (num: any) => {
    setCurrentPosition(num)
  }


  return (
    <View style={styles.container}>
      {/* <StepIndicator
        customStyles={customStyles}
        currentPosition={currentPosition}
        stepCount={3}
      /> */}

      {currentPosition === 1 ?
        <View style={styles.stepIndicator}>
          <View>
            <StateCurrent />
          </View>
          <Text style={styles.bar}>{""}</Text>
          <View>
            <StateInitial />
          </View>
          <Text style={styles.bar}>{""}</Text>
          <View>
            <StateInitial />
          </View>
        </View>
        : null}

      {currentPosition === 2 ?
        <View style={styles.stepIndicator}>
          <View>
            <StateDone />
          </View>
          <LinearGradient
            colors={colors.gradientNext} style={styles.gradient}>
            <Text style={styles.barActive}>{""}</Text>
          </LinearGradient>
          <View>
            <StateCurrent />
          </View>
          <Text style={styles.bar}>{""}</Text>
          <View>
            <StateInitial />
          </View>
        </View>
        : null}
      {currentPosition === 3 ?
        <View style={styles.stepIndicator}>
          <View>
            <StateDone />
          </View>
          <LinearGradient
            colors={colors.gradientNext} style={styles.gradient}>
            <Text style={styles.barActive}>{""}</Text>
          </LinearGradient>
          <View>
            <StateDone />
          </View>
          <LinearGradient
            colors={colors.gradientNext} style={styles.gradient}>
            <Text style={styles.barActive}>{""}</Text>
          </LinearGradient>
          <View>
            <StateCurrent />
          </View>
        </View>
        : null}
      {currentPosition === 4 ?
        <View style={styles.stepIndicator}>
          <View>
            <StateDone />
          </View>
          <LinearGradient
            colors={colors.gradientNext} style={styles.gradient}>
            <Text style={styles.barActive}>{""}</Text>
          </LinearGradient>
          <View>
            <StateDone />
          </View>
          <LinearGradient
            colors={colors.gradientNext} style={styles.gradient}>
            <Text style={styles.barActive}>{""}</Text>
          </LinearGradient>
          <View>
            <StateDone />
          </View>
        </View>
        : null}

      {currentPosition === 1 &&
        <RegisterFirstStep goToStep={handleNextStep} />
      }
      {
        currentPosition === 2 &&
        <RegisterSecondStep goToStep={handleNextStep} returnStep={handleReturnStep} />
      }
      {
        currentPosition === 3 &&
        <RegisterThirdStep goToStep={handleNextStep} returnStep={handleReturnStep} />
      }
      {
        currentPosition === 4 &&
        <RegisterSuccess />
      }
    </View >
  );
};

const styles = StyleSheet.create({
  stepIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  barActive: {
    width: 30,
    height: 2,
    borderRadius: 2,
    // backgroundColor: colors.gradientNext,
  },
  gradient: {
    marginRight: 10,
    marginLeft: 4,
  },
  bar: {
    width: 30,
    height: 2,
    backgroundColor: colors.c_EAECF0,
    borderRadius: 2,
    marginRight: 10,
    marginLeft: 4
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.c_ffffff,
    paddingHorizontal: 24,
  },
  boderPass: {
    borderColor: colors.c_000_012,
    borderWidth: 1,
    borderRadius: 10,
  },
  mgbt: {
    marginBottom: 25,
  },
  backgroundLogin: {
    backgroundColor: colors.c_667403,
  },
  textLogin: {
    color: colors.c_ffffff,
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
  },
  scrollView: {
    flex: 1,
    paddingTop: 22,
    marginBottom: 23,
    zIndex: 1,
  },
  searchResultsContainer: {
    width: "100%",
    height: 200,
    backgroundColor: colors.c_ffffff,
    position: "absolute",
    top: "54%",
    zIndex: 2,
    borderColor: colors.c_000000,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
  },
  resultItem: {
    width: "100%",
    justifyContent: "center",
    height: 40,
    borderBottomColor: colors.c_C7C7CC,
    borderBottomWidth: 1,
    paddingLeft: 15,
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
  input: {
    // marginBottom: 20,
  },
  inputPasswordd: {
    // paddingBottom: 10,
    // marginBottom: 30,
  },
  inputDropdown: {
    // marginBottom: 15,
  },
  containerFrontImage: {
    flexDirection: "row",
    alignItems: "flex-end",
    // justifyContent: "space-around",
  },
  labelFrontImage: {
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 20,
    color: colors.c_7B7B80,
  },
  textRequire: {
    color: colors.light_red,
  },
  viewFrontImage: {
    flexDirection: "row",
  },
  formItemAddress: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formItemAddressError: {
    // marginBottom: 36,
    marginBottom: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 8,
  },
  titleAddressDetail: {
    paddingBottom: 10,
    flexDirection: "row",
  },
  textAddressTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },
  textAddressDetail: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "500",
    color: colors.c_48484A,
  },
  textAddressDetailAddress: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "500",
    color: colors.c_48484A,
    width: "50%",
  },
  viewAdress: {
    flexDirection: "row",
  },
  // textRequire: {
  //   color: colors.c_FF3B30,
  // },
  inputAddress: { height: 50, justifyContent: "center" },
  iconInputAddress: {
    justifyContent: "center",
  },
  txtInputAddress: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "500",
    color: colors.c_48484A,
  },
  errorAddresss: {
    paddingBottom: 10,
  },
  txtError: {
    fontSize: 12,
    lineHeight: 14,
    color: "red",
  },
  viewSpecificAddress: {
    justifyContent: "center",
    height: 50,
    width: DIMENSIONS.width - 80,
  },
});

export default Register;
