import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import ButtonBoder from "../../../../componets/ButtonBoder"
import Input from "../../../../componets/Input"
import Upload from "../../../../componets/Upload"
import { colors } from "../../../../constants/colors"
import { DotBlue, IconAngleLeft, IconAngleRight } from "../../../../constants/icons"
import { translate } from "../../../../locale"
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch, useSelector } from 'react-redux'
import { CheckEmailPhones, selectRegister, setDefaultRegisterState, setReqRegister } from '../../../../redux/slice/Authen/register'
import { addressDetail, resetAddressDetail, selectProfile } from '../../../../redux/slice/Profile/profile'
import { ScreenNames } from '../../../../navigation/screen'
import { DIMENSIONS } from '../../../../common/utils'
import { useNavigation } from '@react-navigation/native'


const RegisterFirstStep = ({ ...props }) => {

  interface DataFirstStepError {
    companyName?: string;
    taxCode?: string;
    logoImage?: string;
    distributorAddress?: string;
    emailOrPhone?: string;
  }

  const initialDataFirstStep = {
    companyName: "",
    taxCode: "",
    logoImage: "",
    emailOrPhone: "",
    distributorAddress: "",
    logoImageList: {},
  }

  const [dataFirstStep, setDataFirstStep] = useState(initialDataFirstStep);
  const [dataFirstStepError, setDataFirstStepError] = useState<DataFirstStepError>({})
  const dispatch = useDispatch();
  const {checkEmailPhone, reqestRegister} = useSelector(selectRegister)
  const { addressState } = useSelector(selectProfile);
  const navigation = useNavigation();

  //input
  const changeCompanyName = (value: string) => {
    setDataFirstStepError({});
    setDataFirstStep({ ...dataFirstStep, companyName: value });
  }
  const changeTaxCode = (value: string) => {
    setDataFirstStepError({});
    setDataFirstStep({ ...dataFirstStep, taxCode: value });
  }
  const changeEmail = (value: string) => {
    setDataFirstStepError({});
    setDataFirstStep({ ...dataFirstStep, emailOrPhone: value });
  }

  const onDetailAddress = () => {
    setDataFirstStepError({});
    dispatch(addressDetail({ ...addressState, isRegister: true }));
    navigation.navigate(ScreenNames.AddressSelectRegister);
  };
  //upload

  const handleChoosePhoto = (value: string) => {
    setDataFirstStepError({});
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      setDataFirstStep({
        ...dataFirstStep,
        logoImage: image.path,
        logoImageList: {
          uri: Platform.select({
            ios: `file://${image.path}`,
            android: image.path,
          }),
          type: image.mime,
          name: `my_profile_${image.modificationDate}.jpg`,
        },
      });
    });
  };
  const handlePreViewPhoto = (value: string) => { };

  const handleDeletePhoto = (value: string) => {
    setDataFirstStepError({});
    if (value === "licenseImage") {
      setDataFirstStep({
        ...dataFirstStep,
        logoImage: "",
        logoImageList: {},
      });
    }
  };

  useEffect(() => {
    if(checkEmailPhone === false){
      setDataFirstStepError({...dataFirstStepError, emailOrPhone: translate("You_have_not_entered_your_phone_email_not_active")})
    } else if(checkEmailPhone === true) {
      setDataFirstStepError({...dataFirstStepError, emailOrPhone: ""})
      props.goToStep(2)
    }
  },[checkEmailPhone])

  useEffect(() => {
    if(reqestRegister !== null){
      setDataFirstStep({ ...dataFirstStep,
        emailOrPhone: reqestRegister?.Email || reqestRegister?.Phone,
        taxCode: reqestRegister?.TaxCode,
        logoImage: reqestRegister?.Logo,
        distributorAddress: reqestRegister?.Address,
        companyName: reqestRegister?.Name,
        logoImageList: reqestRegister?.logoImageList,
      })
    }
    return () =>  dispatch(setDefaultRegisterState({}))
  },[])

  const handleSubmit = () => {
    if (dataFirstStep.companyName === "") {
      setDataFirstStepError({
        ...dataFirstStepError,
        companyName : translate("You_have_not_entered_your_company_name")
      })
    } else if (dataFirstStep.taxCode === ""){
      setDataFirstStepError({
        ...dataFirstStepError,
        taxCode: translate("You_have_not_entered_your_tax_code")
      })
    } else if(dataFirstStep.emailOrPhone === "") {
      setDataFirstStepError({
        ...dataFirstStepError,
        emailOrPhone : translate("You_have_not_entered_your_phone_email")
      })
    } else if(dataFirstStep.emailOrPhone !== "" &&
    dataFirstStep.companyName !== "" &&
    dataFirstStep.taxCode !== "" 
    ){
      if (dataFirstStep.emailOrPhone.includes("@") || dataFirstStep.emailOrPhone.includes(".")){
        const request = {
          email: dataFirstStep.emailOrPhone,
          phone: ""
        }
        dispatch(CheckEmailPhones(request))
        dispatch(setReqRegister({
          Email: dataFirstStep.emailOrPhone,
          Name: dataFirstStep.companyName,
          TaxCode: dataFirstStep.taxCode,
          Logo: dataFirstStep.logoImage,
          logoImageList: dataFirstStep.logoImageList,
          Address: addressState?.detailAddress?.name || reqestRegister?.Address,
          Lattitude: addressState?.detailAddress?.latitude || reqestRegister?.Lattitude,
          Longtitude: addressState?.detailAddress?.longitude || reqestRegister?.Longtitude,
          WardId: addressState?.pickedWard?.id || reqestRegister?.WardId,
          DistrictId: addressState?.pickedDistrict?.id || reqestRegister?.DistrictId,
          ProvinceId: addressState?.pickedProvince?.id || reqestRegister?.ProvinceId,
        }))
      } else {
        const request = {
          phone: dataFirstStep.emailOrPhone,
          email: ""
        }
        dispatch(CheckEmailPhones(request))
        dispatch(setReqRegister({
          Phone: dataFirstStep.emailOrPhone,
          Name: dataFirstStep.companyName,
          TaxCode: dataFirstStep.taxCode,
          Logo: dataFirstStep.logoImage,
          logoImageList: dataFirstStep.logoImageList,
          Address: addressState?.detailAddress?.name || reqestRegister?.Address,
          Lattitude: addressState?.detailAddress?.latitude || reqestRegister?.Lattitude,
          Longtitude: addressState?.detailAddress?.longitude || reqestRegister?.Longtitude,
          WardId: addressState?.pickedWard?.id || reqestRegister?.WardId,
          DistrictId: addressState?.pickedDistrict?.id || reqestRegister?.DistrictId,
          ProvinceId: addressState?.pickedProvince?.id || reqestRegister?.ProvinceId,
        }))
      }
    }
    dispatch(resetAddressDetail({}))
  }
  return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.registerFirstStepDes}>
          <DotBlue />
          <Text style={styles.registerFirstStepTitle}>{translate("company_profile")}</Text>
        </View>
        <Input
          value={dataFirstStep.companyName}
          placeholder={translate("enter_company_name")}
          // styleView={styles.input}
          onChangeText={changeCompanyName}
          errorText={dataFirstStepError?.companyName}
          title={translate("company_name")}
          required={true}
        />
        <Input
          onChangeText={changeTaxCode}
          placeholder={translate("enter_tax_code")}
          // styleView={styles.input}
          title={translate("tax_code")}
          value={dataFirstStep.taxCode}
          required={true}
          errorText={dataFirstStepError?.taxCode}
        />
        <Upload
          label={"Logo"}
          value="logoImage"
          onChange={handleChoosePhoto}
          onPreview={handlePreViewPhoto}
          onDelete={handleDeletePhoto}
          data={dataFirstStep.logoImage}
          required={true}
          errorText={dataFirstStepError.logoImage}
        />
        <View style={styles.textTitle}>
          <Text style={styles.title}>{translate("Distributor address")}</Text>
          <Text style={styles.textRequire}>*</Text>
        </View>
        <TouchableOpacity
          style={styles.distributor}
          onPress={() => onDetailAddress()}
        >
          {addressState?.detailAddress ? (
            <View style={styles.viewSpecificAddress}>
              <Text numberOfLines={2} style={styles.viewAdress}>
                {addressState.detailAddress ? (
                  <Text style={styles.textAddressDetail}>
                    {addressState.detailAddress.name}
                  </Text>
                ) : null}
              </Text>
            </View>
          ) : reqestRegister?.Address ? (
            <View style={styles.viewSpecificAddress}>
              <Text numberOfLines={2} style={styles.viewAdress}>
                {reqestRegister?.Address ? (
                  <Text style={styles.textAddressDetail}>
                    {reqestRegister?.Address}
                  </Text>
                ) : null}
              </Text>
            </View>
          ) : (
            <View style={styles.inputAddress}>
              <Text style={styles.txtInputAddress}>
                {translate("insert_address")}
              </Text>
              <IconAngleRight width={16} height={16} fill={colors.c_48484A} />
            </View>
          )}
        </TouchableOpacity>
        <Input
          onChangeText={changeEmail}
          placeholder={translate("enter_email_or_phone")}
          // styleView={styles.input}
          title={translate("email_or_phone")}
          value={dataFirstStep.emailOrPhone}
          required={true}
          errorText={dataFirstStepError?.emailOrPhone}
        />
        <ButtonBoder
          textButton={translate("next")}
          // boderColor={styles.borderRegister}
          style={styles.borderRegister}
          styleText={styles.textRegister}
          onPress={() => handleSubmit()}
        />
      </ScrollView>
  )

}
const styles = StyleSheet.create({
  registerFirstStepDes: {
    flexDirection: "row",
  },
  registerFirstStepTitle: {
    marginLeft: 10,
    marginBottom: 16,
    fontFamily: 'Inter',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 22,
    color: colors.c_1c1c1c,
  },
  borderRegister: {
    borderColor: colors.primary,
    marginBottom: 45,
  },
  textRegister: {
    color: colors.primary,
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
  },
  scrollView: {
    flex: 1,
    paddingTop: 22,
    zIndex: 1,
  },
  distributor: {
    marginTop: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.c_7B7B80,
  },
  textTitle: {
    flexDirection: "row",
  },
  textRequire: {
    color: colors.light_red,
  },
  textAdd: {
    fontSize: 14, 
    fontWeight: "500",
    color: colors.c_8E8E93,
  },
  viewSpecificAddress: {
    justifyContent: "center",
    height: 50,
    width: DIMENSIONS.width - 80,
  },
  viewAdress: {
    flexDirection: "row",
  },
  textAddressDetail: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "500",
    color: colors.c_48484A,
  },
  inputAddress: { 
    paddingVertical: 12, 
    justifyContent: "space-between", 
    flexDirection: 'row' , 
    flex: 1, 
    alignItems: 'center'
  },
  txtInputAddress: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "500",
    color: colors.c_8E8E93,
  },
})

export default RegisterFirstStep;
