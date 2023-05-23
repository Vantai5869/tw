import React, { useState, useEffect } from "react";
import { StyleSheet, Switch, Text, View, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../componets/Button";
import { CheckBox } from "../../../../componets/CheckBox";
import ContainerWithKeyboard from "../../../../componets/ContainerWithKeyboard";
import Input from "../../../../componets/Input";
import { colors } from "../../../../constants/colors";
import { ScreenNames } from "../../../../navigation/screen";
import { IconAngleRight } from "../../../../constants/icons";
import {
  AddressErrors,
  TAddressObject,
} from "../../../../constants/type.interface";
import i18n, { translate } from "../../../../locale";
import {
  CreateAddress,
  selectProfile,
  addressDetail,
  resetAddressDetail,
} from "../../../../redux/slice/Profile/profile";
import TagIconLabel from "../../../../componets/Tag";
import { TouchableOpacity } from "react-native-gesture-handler";
import ButtonCT from "../../../../componets/ButtonCT";
import {
  ONLY_NUMBERR,
  NO_SPECIAL_CHARACTER,
  VNP_REGEX,
} from "../../../../constants/untils";
import { DIMENSIONS } from "../../../../common/utils";

const CreateNewAddress = ({ ...props }) => {
  const dispatch = useDispatch();
  const { addressState, typeRadio } = useSelector(selectProfile);

  const initialValues: TAddressObject = {
    name: "",
    phoneNumber: "",
    specificAddress: "",
    provinceId: undefined,
    districtId: undefined,
    wardId: undefined,
    shippingAddressType: 1,
    longtitude: 0,
    latitude: 0,
    placeId: "",
  };

  const [checkeds, setCheckeds] = useState(1);
  const [fields, setFields] = useState<TAddressObject>(initialValues);
  const [formErrors, setFormErrors] = useState<AddressErrors>({});
  const [isEnabled, setIsEnabled] = useState<boolean>(true);

  useEffect(() => {
    return () => {
      dispatch(resetAddressDetail(null));
    };
  }, []);

  useEffect(() => {}, [formErrors]);

  const onChangeText = (name: string, value: string) => {
    setFormErrors({});
    setFields({ ...fields, [name]: value });
  };

  const onDetailAddress = () => {
    setFormErrors({});
    props.navigation.navigate(ScreenNames.AddressSelect);
  };

  const onChangeType = (item: number) => {
    setCheckeds(() => {
      return item;
    });
  };

  const onSubmit = async () => {
    const sendData = {
      ...fields,
      name: fields.name.trim(),
      phoneNumber: fields.phoneNumber.trim(),
    };

    sendData.provinceId = addressState?.pickedProvince?.id;
    sendData.districtId = addressState?.pickedDistrict?.id;
    sendData.wardId = addressState?.pickedWard?.id;
    sendData.specificAddress = addressState?.detailAddress?.name;
    if (validateForm()) {
      await dispatch(
        CreateAddress({
          ...sendData,
          specificAddress: sendData.specificAddress.trim(),
          isDefault: isEnabled,
          shippingAddressType: checkeds,
        })
      );

      props.navigation.navigate(ScreenNames.DeliveryAddress);

      dispatch(
        addressDetail({
          province: {
            id: null,
            name: null,
            code: null,
            parentId: null,
            level: null,
            type: null,
          },
          district: {
            id: null,
            name: null,
            code: null,
            parentId: null,
            level: null,
            type: null,
          },
          ward: {
            id: null,
            name: null,
            code: null,
            parentId: null,
            level: null,
            type: null,
          },
          address: null,
        })
      );
    }
  };

  const validateForm = () => {
    let errors: AddressErrors = {};
    if (!fields?.name) {
      errors.name = translate("required");
    }
    if (!fields?.phoneNumber) {
      errors.phone = translate("required");
    }

    if (fields?.name.length > 50) {
      errors.name = translate("over_50_characters");
    }
    if (!NO_SPECIAL_CHARACTER.test(fields?.name)) {
      errors.name = translate("no_special_character_name");
    }
    if (!VNP_REGEX.test(fields?.phoneNumber) && fields.phoneNumber) {
      errors.phone = translate("wrong_phone_format");
    }
    if (!ONLY_NUMBERR.test(fields?.phoneNumber)) {
      errors.phone = translate("wrong_number_format");
    }
    if (!addressState?.detailAddress?.name) {
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
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      return true;
    }
    return false;
  };

  return (
    <View style={styles.container}>
      <ContainerWithKeyboard>
        <View style={styles.wrapper}>
          <View style={styles.boxTitle}>
            <Text style={styles.txtTitle}>{translate("contact")}</Text>
          </View>
          <View style={styles.boxFormContact}>
            <Input
              placeholder={translate("enter_receiver_name")}
              styleView={styles.input}
              onChangeText={(text) => onChangeText("name", text)}
              errorText={formErrors?.name}
              title={translate("receiver_name")}
              required={true}
              value={fields.name}
            />
            <Input
              placeholder={translate("enter_receiver_phone")}
              styleView={styles.input}
              onChangeText={(text) => onChangeText("phoneNumber", text)}
              errorText={formErrors?.phone}
              title={translate("receiver_phone")}
              required={true}
              keyboardType={"number-pad"}
              value={fields.phoneNumber}
            />
          </View>
          <View style={styles.boxTitle}>
            <Text style={styles.txtTitle}>{translate("address")}</Text>
          </View>
          <View style={styles.boxForm}>
            <View style={styles.addressDetail}>
              <View style={styles.titleAddressDetail}>
                <Text style={styles.textAddressTitle}>Địa chỉ cụ thể</Text>
                <Text style={styles.textRequire}>*</Text>
              </View>

              <TouchableOpacity
                style={
                  formErrors.address
                    ? styles.formItemAddressError
                    : styles.formItemAddress
                }
                onPress={() => onDetailAddress()}
              >
                {addressState?.detailAddress?.name ? (
                  //   addressState?.detailAddress ||
                  // addressState?.pickedProvince?.id ||
                  // addressState?.pickedDistrict?.id ||
                  // addressState?.pickedWard?.id ? (
                  <View style={styles.viewSpecificAddress}>
                    <Text style={styles.viewAdress}>
                      {addressState?.detailAddress?.name ? (
                        <Text
                          style={styles.textAddressDetail}
                          numberOfLines={1}
                        >
                          {addressState?.detailAddress?.name},{" "}
                        </Text>
                      ) : null}
                      {addressState?.pickedWard?.name ? (
                        <Text
                          style={styles.textAddressDetail}
                          numberOfLines={1}
                        >
                          {addressState?.pickedWard?.name},{" "}
                        </Text>
                      ) : null}
                      {addressState?.pickedDistrict?.name ? (
                        <Text
                          style={styles.textAddressDetail}
                          numberOfLines={1}
                        >
                          {addressState?.pickedDistrict?.name},{" "}
                        </Text>
                      ) : null}
                      {addressState?.pickedProvince?.name ? (
                        <Text
                          style={styles.textAddressDetail}
                          numberOfLines={1}
                        >
                          {addressState?.pickedProvince?.name}
                        </Text>
                      ) : null}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.inputAddress}>
                    <Text style={styles.txtInputAddress}>Nhập địa chỉ</Text>
                  </View>
                )}

                <View style={styles.iconInputAddress}>
                  <IconAngleRight
                    width={16}
                    height={16}
                    fill={colors.c_636366}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={
                  formErrors.address ||
                  formErrors.districtId ||
                  formErrors.provinceId ||
                  formErrors.wardId
                    ? styles.errorAddresss
                    : null
                }
              >
                {/* {formErrors.provinceId ? (
                  <Text style={styles.txtError}>
                    {translate("required_province")}
                  </Text>
                ) : null}
                {formErrors.districtId ? (
                  <Text style={styles.txtError}>
                    {translate("required_district")}
                  </Text>
                ) : null}
                {formErrors.wardId ? (
                  <Text style={styles.txtError}>
                    {translate("required_ward")}
                  </Text>
                ) : null} */}
                {formErrors.address ? (
                  <Text style={styles.txtError}>
                    {translate("required_address")}
                  </Text>
                ) : null}
              </View>
            </View>

            <CheckBox
              checked={isEnabled}
              onPress={() => setIsEnabled(!isEnabled)}
              typeRadio={false}
              node={
                <Text style={styles.txtDefault}>
                  {translate("set_default")}
                </Text>
              }
            />
          </View>
          <View style={styles.boxTitle}>
            <Text style={styles.txtTitle}>{translate("type_address")}</Text>
          </View>

          <View style={styles.typeAddress}>
            <TagIconLabel
              isSelect={checkeds === 1}
              onSelect={() => {
                onChangeType(1);
              }}
              label={"personal_address_sort"}
              type="home"
            />
            <TagIconLabel
              isSelect={checkeds === 2}
              onSelect={() => {
                onChangeType(2);
              }}
              label={translate("retailer_shop")}
              type="office"
            />
          </View>
        </View>
      </ContainerWithKeyboard>
      <View style={styles.wrapBtn}>
        <ButtonCT
          textButton={i18n.t("done")}
          onPress={onSubmit}
          styleBackground={[styles.btnBg]}
          styleText={styles.btnText}
          style={{ paddingVertical: 14 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.c_ffffff,
    flex: 1,
  },
  wrapper: {
    // paddingVertical: 15,
  },
  boxTitle: {
    marginBottom: 20,
    backgroundColor: colors.c_F3F3F3,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  txtTitle: {
    lineHeight: 14,
    fontSize: 12,
    fontWeight: "600",
    color: colors.c_3A3A3C,
  },
  boxForm: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  boxFormContact: {
    paddingHorizontal: 24,
    // paddingBottom: 32,
  },
  formItem: {
    marginBottom: 25,
  },
  wrapBtn: { paddingHorizontal: 24, paddingVertical: 20 },
  btnBg: {
    backgroundColor: colors.primary,
  },
  btnText: {
    lineHeight: 22,
    fontSize: 16,
    fontWeight: "500",
    color: colors.c_ffffff,
  },
  bottom: {
    marginTop: 10,
  },
  input: {
    marginBottom: 0,
  },
  txtSwitch: {
    lineHeight: 22,
    fontSize: 16,
    fontWeight: "500",
    color: colors.c_3A3A3C,
  },
  txtDefault: {
    lineHeight: 22,
    fontSize: 16,
    fontWeight: "400",
    color: colors.c_3A3A3C,
  },
  hasError: {
    borderWidth: 1,
    borderColor: "red",
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
  checkbox: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxRight: { paddingLeft: 0 },
  typeAddress: {
    marginHorizontal: 24,
    flexDirection: "row",
  },
  addressDetail: {},

  formItemAddress: {
    marginBottom: 26,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formItemAddressError: {
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 8,
  },
  titleAddressDetail: {
    // paddingBottom: 10,
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
  viewAdress: {
    flex: 1,
    height: 50,
    justifyContent: "center",
  },
  textRequire: {
    color: colors.c_FF3B30,
  },
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
    paddingBottom: 26,
  },
  viewSpecificAddress: {
    justifyContent: "center",
    height: 50,
    width: DIMENSIONS.width * 0.7,
  },
});

export default CreateNewAddress;
