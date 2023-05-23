import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Platform,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../componets/Button";
import InputLine from "../../../../componets/InputLine";
import ContainerWithKeyboard from "../../../../componets/ContainerWithKeyboard";
import { colors } from "../../../../constants/colors";
import { IconAngleRight } from "../../../../constants/icons";
import TagIconLabel from "../../../../componets/Tag";
import ButtonBoder from "../../../../componets/ButtonBoder";
import ButtonCT from "../../../../componets/ButtonCT";
import {
  TAddressObject,
  AddressErrors,
  TTempAddressObject,
} from "../../../../constants/type.interface";
import i18n, { translate } from "../../../../locale";
import Input from "../../../../componets/Input";
import ArletConfirm from "../../../../componets/AlertConfirm";
import { DIMENSIONS } from "../../../../common/utils";

import {
  UpdateAddress,
  selectProfile,
  DeleteAddress,
  addressDetail,
  resetAddressDetail,
  GetAddressList,
} from "../../../../redux/slice/Profile/profile";
import { CheckBox } from "../../../../componets/CheckBox";
import { ScreenNames } from "../../../../navigation/screen";
import {
  ONLY_NUMBERR,
  NO_SPECIAL_CHARACTER,
  VNP_REGEX,
} from "../../../../constants/untils";

const EditAddress = ({ ...props }) => {
  const dispatch = useDispatch();
  const { addressByID, addressState } = useSelector(selectProfile);

  const data: TAddressObject = {
    id: addressByID.id,
    name: addressByID.name,
    phoneNumber: addressByID.phoneNumber,
    province: addressByID.provinceName,
    provinceId: addressByID.provinceId,
    district: addressByID.districtName,
    districtId: addressByID.districtId,
    ward: addressByID.wardName,
    wardId: addressByID.wardId,
    specificAddress: addressByID.specificAddress,
  };
  const initTempData: TTempAddressObject = {
    province: addressByID.provinceName,
    provinceId: addressByID.provinceId,
    district: addressByID.districtName,
    districtId: addressByID.districtId,
    ward: addressByID.wardName,
    wardId: addressByID.wardId,
  };

  const [dataUpdate, setDataUpdate] = useState<TAddressObject>(data);
  const [tempData, setTempData] = useState<TTempAddressObject>(initTempData);
  const [formErrors, setFormErrors] = useState<AddressErrors>({});
  const [isDelete, setDelete] = useState<boolean>(false);
  const [isEnabled, setIsEnabled] = useState(addressByID.isDefault);
  const [checkeds, setCheckeds] = useState(addressByID.shippingAddressType);

  useEffect(() => {
    return () => {
      dispatch(resetAddressDetail(null));
    };
  }, []);
  useEffect(() => {
    if (
      addressState?.pickedProvince?.id &&
      addressState.pickedProvince?.id !== dataUpdate.provinceId
    ) {
      setDataUpdate((prev) => {
        return {
          ...prev,
          province: addressState?.pickedProvince?.name,
          provinceId: addressState?.pickedProvince?.id,
          district: addressState?.pickedDistrict?.name,
          districtId: addressState?.pickedDistrict?.id,
          ward: addressState?.pickedWard?.name,
          wardId: addressState?.pickedWard?.id,
          specificAddress: addressState?.detailAddress?.name,
        };
      });
    }
    if (
      addressState?.pickedDistrict?.id &&
      addressState.pickedDistrict?.id !== dataUpdate.districtId
    ) {
      setDataUpdate((prev) => {
        return {
          ...prev,
          district: addressState?.pickedDistrict?.name,
          districtId: addressState?.pickedDistrict?.id,
          ward: addressState?.pickedWard?.name,
          wardId: addressState?.pickedWard?.id,
          specificAddress: addressState?.detailAddress?.name,
        };
      });
    }
    if (
      addressState?.pickedWard?.id &&
      addressState?.pickedWard?.id !== dataUpdate.wardId
    ) {
      setDataUpdate((prev) => {
        return {
          ...prev,
          ward: addressState?.pickedWard?.name,
          wardId: addressState?.pickedWard?.id,
          specificAddress: addressState?.detailAddress?.name,
        };
      });
    }
    if (
      addressState?.detailAddress?.name &&
      addressState?.detailAddress?.name !== dataUpdate.specificAddress
    ) {
      setDataUpdate((prev) => {
        return {
          ...prev,
          specificAddress: addressState?.detailAddress?.name,
        };
      });
    }
  }, [addressState]);
  useEffect(() => {
    dispatch(
      addressDetail({
        pickedProvince: {
          id: dataUpdate.provinceId,
          name: dataUpdate.province,
          code: dataUpdate.provinceCode,
        },
        pickedDistrict: {
          id: dataUpdate.districtId,
          name: dataUpdate.district,
          code: dataUpdate.districtCode,
        },
        pickedWard: {
          id: dataUpdate.wardId,
          name: dataUpdate.ward,
          code: dataUpdate.wardCode,
        },
        detailAddress: { name: dataUpdate.specificAddress },
        isEdit: true,
      })
    );
  }, [dataUpdate]);

  const onChangeType = (item: number) => {
    setCheckeds(() => {
      return item;
    });
  };
  const onOpenAddress = () => {
    setFormErrors({});
    props.navigation.navigate(ScreenNames.AddressSelect);
  };
  const onChangeText = (name: string, value: string) => {
    setFormErrors({});
    setDataUpdate({ ...dataUpdate, [name]: value });
  };
  const onDelete = () => {
    setDelete(true);
  };
  const onSubmitDelete = async () => {
    setDelete(false);

    await dispatch(DeleteAddress(dataUpdate.id));
    props.navigation.navigate(ScreenNames.DeliveryAddress);
  };
  const onCancelDelete = () => {
    setDelete(false);
    // SetIdSelect("");
  };
  useEffect(() => {}, [addressState]);

  const onSave = async () => {
    const sendData = {
      ...dataUpdate,
      name: dataUpdate.name.trim(),
      phoneNumber: dataUpdate.phoneNumber.trim(),
      specificAddress: dataUpdate.specificAddress?.trim(),
    };

    delete sendData.district;
    delete sendData.ward;
    delete sendData.province;

    if (validateForm()) {
      await dispatch(
        UpdateAddress({
          ...sendData,
          isDefault: isEnabled,
          shippingAddressType: checkeds,
        })
      );
      await dispatch(GetAddressList({ take: 20, skip: 20 }));
      props.navigation.navigate(ScreenNames.DeliveryAddress);
    }
  };
  const validateForm = () => {
    let errors: AddressErrors = {};
    if (!dataUpdate?.name) {
      errors.name = translate("required");
    }
    if (dataUpdate?.name.length > 50) {
      errors.name = translate("over_50_characters");
    }
    if (!NO_SPECIAL_CHARACTER.test(dataUpdate?.name)) {
      errors.name = translate("no_special_character_name");
    }
    if (!dataUpdate?.phoneNumber) {
      errors.phone = translate("required");
    }
    if (!VNP_REGEX.test(dataUpdate?.phoneNumber) && dataUpdate?.phoneNumber) {
      errors.phone = translate("wrong_phone_format");
    }
    if (!ONLY_NUMBERR.test(dataUpdate?.phoneNumber)) {
      errors.phone = translate("wrong_number_format");
    }
    if (!addressState?.detailAddress?.name) {
      errors.address = translate("required_address");
    }

    if (!dataUpdate?.province) {
      errors.province = translate("required_province");
    }
    if (!dataUpdate?.district) {
      errors.district = translate("required_district");
    }
    if (!dataUpdate?.ward) {
      errors.ward = translate("required_ward");
    }
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      return true;
    }
    return false;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.wrapper}>
          <View style={styles.boxTitle}>
            <Text style={styles.txtTitle}> {translate("contact")} </Text>
          </View>
          <View style={styles.boxForm}>
            <Input
              placeholder={translate("enter_receiver_name")}
              styleView={styles.input}
              onChangeText={(text) => onChangeText("name", text)}
              errorText={formErrors?.name}
              title={translate("receiver_name")}
              required={true}
              value={dataUpdate.name}
            />
            <Input
              placeholder={translate("enter_receiver_phone")}
              styleView={styles.input}
              onChangeText={(text) => onChangeText("phoneNumber", text)}
              errorText={formErrors?.phone}
              title={translate("receiver_phone")}
              required={true}
              value={dataUpdate.phoneNumber}
              keyboardType="number-pad"
            />
          </View>

          <View style={styles.boxTitle}>
            <Text style={styles.txtTitle}> {translate("address")} </Text>
          </View>

          <View style={styles.boxFormAddress}>
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
                onPress={() => onOpenAddress()}
              >
                {addressState?.detailAddress?.name ? (
                  // addressState?.detailAddress  ||
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
          </View>

          <View style={styles.bottom}>
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
      </ScrollView>
      <View style={styles.wrapBtn}>
        <ButtonBoder
          textButton={translate("delete_address")}
          onPress={() => {
            onDelete();
          }}
          style={styles.btnDarkBg}
          styleText={styles.btnDarkText}
        />

        <ButtonCT
          textButton={translate("done")}
          onPress={() => onSave()}
          styleBackground={[styles.btnBg]}
          styleText={styles.btnText}
          style={{ paddingVertical: 14 }}
        />
      </View>
      {isDelete ? (
        <ArletConfirm
          modalVisible={isDelete}
          content={translate("wanna_delete_address")}
          confirm={onSubmitDelete}
          cancel={onCancelDelete}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.c_ffffff,
    flex: 1,
  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formItemAddress: {
    // paddingTop: 10,
    // marginBottom: 26,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formItemOpenAddress: {
    paddingBottom: 10,
  },
  formItemSpecificAddress: {
    // paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.c_E5E5EA,
  },
  wrapper: {},
  boxTitle: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: colors.c_000_002,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  txtTitle: {
    lineHeight: 14,
    fontSize: 12,
    fontWeight: "600",
    color: colors.c_3A3A3C,
  },
  txtContent: {
    lineHeight: 22,
    fontSize: 16,
    // fontWeight: "500",
    color: colors.c_3A3A3C,
  },
  boxForm: {
    paddingHorizontal: 24,
  },
  boxFormAddress: {
    paddingHorizontal: 24,
    // paddingBottom: 22,
  },
  formItem: {
    borderBottomWidth: 1,
    borderBottomColor: colors.c_E5E5EA,
  },
  noBorder: { borderBottomColor: "transparent" },
  wrapBtn: { paddingHorizontal: 24, paddingTop: 10, paddingVertical: 20 },
  btnBg: {
    backgroundColor: colors.primary,
  },
  btnText: {
    lineHeight: 22,
    fontSize: 16,
    fontWeight: "500",
    color: colors.c_ffffff,
  },

  btnDarkBg: {
    marginBottom: 10,
    backgroundColor: colors.c_ffffff,
    borderColor: colors.primary,
  },
  btnDarkText: {
    color: colors.primary,
    lineHeight: 22,
    fontSize: 16,
    fontWeight: "500",
  },

  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingVertical: 22,
    paddingTop: 22,
    paddingHorizontal: 24,
  },
  txtSwitch: {
    lineHeight: 22,
    fontSize: 16,
    color: colors.c_3A3A3C,
  },
  checkbox: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxRight: { paddingLeft: 0 },
  checkboxes: {
    paddingTop: 10,
    paddingHorizontal: 24,
  },
  detailAddress: {
    marginTop: 20,
    borderBottomColor: colors.c_000_01,
    borderBottomWidth: 1,
  },
  typeAddress: {
    marginHorizontal: 24,
    flexDirection: "row",
    paddingVertical: 20,
  },
  txtDefault: {
    lineHeight: 22,
    fontSize: 16,
    fontWeight: "400",
    color: colors.c_3A3A3C,
  },
  input: {
    marginBottom: 0,
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
  viewAdress: {
    flex: 1,
    // height: 50,
    justifyContent: "center",
  },
  textRequire: {
    color: colors.c_FF3B30,
  },
  addressDetail: {},

  formItemAddressError: {
    // paddingTop: 10,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 8,
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
    flexDirection: "row",
    justifyContent: "center",
    height: 50,
    width: DIMENSIONS.width * 0.7,
  },
  txtError: {
    fontSize: 12,
    lineHeight: 14,
    color: "red",
  },
});

export default EditAddress;
