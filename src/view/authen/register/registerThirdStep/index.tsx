import React, { useEffect, useState } from 'react'
import { Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import ButtonBoder from "../../../../componets/ButtonBoder"
import InputDropdown from "../../../../componets/InputDropdown"
import MultiSelect from '../../../../componets/MultiSelect'
import Upload from "../../../../componets/Upload"
import { colors } from "../../../../constants/colors"
import { DotBlue } from "../../../../constants/icons"
import { translate } from "../../../../locale"
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch, useSelector } from 'react-redux'
import { getBusinissIds, RegisterHandle, resetRegisterReject, selectRegister } from '../../../../redux/slice/Authen/register'
import Button from '../../../../componets/ButtonCT'
import { DIMENSIONS } from '../../../../common/utils'
import LinearGradient from "react-native-linear-gradient";
import Arlets from '../../../../componets/Alerts'
import { ScreenNames } from '../../../../navigation/screen'

function RegisterThirdStep({ ...props }) {
  interface DistributerAddressType {
    value?: string;
    id?: string;
  }
  interface DataThirdStepError {
    imageFront?: string;
    imageBack?: string;
    businessGroup?: string;
    introduce?: string; 
  }

  const initialDataThirdStep = {
    imageFront: "",
    imageBack: "",
    introduce: "",
    businessGroup: "",
    imageFontList: {},
    imageBackList: {}
  }
  const business = [
    {value: "Test", label: "Test"},
    {value: "Test nhe", label: "Test nhe"},
    {value: "Test nua nhe", label: "Test nua nhe"}
  ]

  const [dataThirdStep, setdataThirdStep] = useState(initialDataThirdStep);
  const [dataThirdStepError, setdataThirdStepError] = useState<DataThirdStepError>({});
  const [isBusiness, setIsBusiness] = useState<boolean>(false);
  const [businessGroup, setBusinessGroup] = useState<DistributerAddressType>({});
  const {reqestRegister, businessId, listBusiness, registerReject} = useSelector(selectRegister);
  const dispatch = useDispatch();
  const [alertsRegister, setAlertRegister] = useState(false);


  const handleIntroduce = (value: string) => {
    setdataThirdStepError({});
    setdataThirdStep({ ...dataThirdStep, introduce: value });
  }

  const onTypeBusiness = (val: number[]) => {
    const pickedType = listBusiness?.find((item) => {
      if (item.value === val?.[0]) {
        return item;
      }
    });
    setBusinessGroup({
      ...businessGroup,
      value: pickedType?.value,
      id: pickedType?.id,
    });
    setdataThirdStep({
      ...dataThirdStep,
      businessGroup: pickedType?.value
    });
  };
  //upload

  const handleChoosePhoto = (value: string) => {
    setdataThirdStepError({});
    if (value === "imageFront") {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then((image) => {
        setdataThirdStep({
          ...dataThirdStep,
          imageFront: image.path,
          imageFontList: {
            uri: Platform.select({
              ios: `file://${image.path}`,
              android: image.path,
            }),
            type: image.mime,
            name: `my_profile_${image.modificationDate}.jpg`,
          }
        });
      });
    } else if(value === "imageBack") {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then((image) => {
        setdataThirdStep({
          ...dataThirdStep,
          imageBack: image.path,
          imageBackList: {
            uri: Platform.select({
              ios: `file://${image.path}`,
              android: image.path,
            }),
            type: image.mime,
            name: `my_profile_${image.modificationDate}.jpg`,
          }
        });
      });
    }
  };
  const handlePreViewPhoto = () => {

  };
  const handleDeletePhoto = (value: string) => {
    setdataThirdStepError({});
    if (value === "imageFront") {
      setdataThirdStep({
        ...dataThirdStep,
        imageFront: "",
        // licenseImageList: {},
      });
    } else if(value === "imageBack") {
      setdataThirdStep({
        ...dataThirdStep,
        imageBack: "",
        // licenseImageList: {},
      });
    }
  }

  useEffect(() => {
    dispatch(getBusinissIds(""));
    return dispatch(resetRegisterReject(""));
  },[])

  const submitRegister = () => {
    if(dataThirdStep.businessGroup === ""){
      setdataThirdStepError({...dataThirdStepError, businessGroup: translate("you_have_not_chosen_a_business")})
    } else if(dataThirdStepError.imageBack === ""){
      setdataThirdStepError({...dataThirdStepError, imageBack: translate("you_have_not_chosen_image")})
    } else if(dataThirdStepError.imageFront === ""){
      setdataThirdStepError({...dataThirdStepError, imageFront: translate("you_have_not_chosen_image")})
    } else if(dataThirdStepError.introduce){
      setdataThirdStepError({...dataThirdStepError, introduce: translate("you_have_not_write_introduce")})
    } else if(dataThirdStep.businessGroup !== "" && dataThirdStep.imageBack !== "" && dataThirdStep.imageFront !== ""){
      const formData = new FormData();
      formData.append("Name", reqestRegister?.Name);
      formData.append("Phone", reqestRegister?.Phone);
      formData.append("Address", reqestRegister?.Address);
      formData.append("TaxCode", reqestRegister?.TaxCode);
      formData.append("Logo", reqestRegister?.logoImageList);
      formData.append("Email", reqestRegister?.Email);
      formData.append("LegalRepresentativeName", reqestRegister?.LegalRepresentativeName);
      formData.append("LegalRepresentativeAddres", reqestRegister?.LegalRepresentativeAddres);
      formData.append("DOB", reqestRegister?.DOB);
      formData.append("CardNumber", reqestRegister?.CardNumber);
      formData.append("FrontLicense", dataThirdStep?.imageFontList);
      formData.append("BackLicense", dataThirdStep?.imageBackList);
      formData.append("Introduction", dataThirdStep?.introduce);
      formData.append("Lattitude", reqestRegister?.Lattitude);
      formData.append("Longtitude", reqestRegister?.Longtitude);
      formData.append("PlaceId", reqestRegister?.PlaceId);
      formData.append("ProvinceId", reqestRegister?.ProvinceId);
      formData.append("DistrictId", reqestRegister?.DistrictId);
      formData.append("WardId", reqestRegister?.WardId);
      formData.append("Password", reqestRegister?.Password);
      formData.append("DeviceToken", "hdhgshf");
      formData.append("BusinessId", businessGroup?.id);
      dispatch(RegisterHandle(formData))
    }
  }
  useEffect(() => {
    setAlertRegister(true);
  },[registerReject])
  const selectRegisters = () => {
    if(registerReject?.message){
      setAlertRegister(false)
    } else {
      setAlertRegister(false);
      props.navigation.navigate(ScreenNames.RegisterSuccess)
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.registerThirdStepDes}>
          <DotBlue />
          <Text style={styles.registerThirdStepTitle}>{translate("legal_representative_infos")}</Text>
        </View>
        <InputDropdown
          label={""}
          show={true}
          onChange={() => setIsBusiness(true)}
          value={businessGroup.value}
          placeholder={translate("business_group")}
          // style={styles.inputDropdown}
          errorText={dataThirdStepError.businessGroup}
          textStyle={{ color: colors.c_636366 }}
        />
        <View style={styles.textTitle}>
          <Text style={styles.title}>{translate("business_license")}</Text>
          <Text style={styles.textRequire}>*</Text>
        </View>
        <View style={styles.listImage}>
          <Upload
            label={""}
            value="imageFront"
            onChange={handleChoosePhoto}
            onPreview={handlePreViewPhoto}
            onDelete={handleDeletePhoto}
            data={dataThirdStep.imageFront}
            errorText={dataThirdStepError.imageFront}
            imageText={translate("add_front_image")}
            sized={"normal"}
            noTitle={true}
          />
          <Upload
            label={""}
            value="imageBack"
            onChange={handleChoosePhoto}
            onPreview={handlePreViewPhoto}
            onDelete={handleDeletePhoto}
            data={dataThirdStep.imageBack}
            errorText={dataThirdStepError.imageBack}
            imageText={translate("add_back_image")}
            sized={"normal"}
            noTitle={true}
          />
        </View>
        <View style={styles.textAreaW}>
          <Text style={styles.title}>{translate("intro_company_business_lines")}</Text>
          <View style={styles.textAreaContainer} >
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder={translate("enter_des")}
              placeholderTextColor={colors.c_667085}
              numberOfLines={5}
              multiline={true}
              // value={dataThirdStep.introduce}
              onChangeText={(e:any) => handleIntroduce(e)}
            />
          </View>
        </View>
        <LinearGradient
            colors={colors.gradientNext}
            style={styles.backgroundLogin}
          >
      <Button
          textButton={translate("register_now")}
          styleText={styles.textLogin}
          onPress={submitRegister}
          style={styles.btnLoginContainer}
        />
        </LinearGradient>
      <Text style={styles.textDk}>{translate("By registering, you have read and agree to the")}
        <Text onPress={() => {}} style={styles.textBlue} >
          {translate("Terms and conditions")}
        </Text>
        {translate("and")}
        <Text style={styles.textBlue} >
        {translate("TINTIN's Privacy Policy")}
        </Text>
      </Text>
      <TouchableOpacity onPress={() => props.returnStep(2)}>
        <Text style={styles.textReturn}>{translate("return")}</Text>
      </TouchableOpacity>
      </ScrollView>
      <MultiSelect
          isVisible={isBusiness}
          title={translate("select_type_business")}
          value={"value"}
          label="label"
          data={listBusiness}
          checkeds={[businessGroup?.value]}
          onClose={() => setIsBusiness(false)}
          onChange={onTypeBusiness}
          multi={false}
        />
        <Arlets
          modalVisible={alertsRegister}
          statusNoti={"true"}
          confirm={() => selectRegisters}
          content={registerReject?.message ||  ""}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  registerThirdStepDes: {
    flexDirection: "row",
  },
  registerThirdStepTitle: {
    marginLeft: 10,
    fontFamily: 'Inter',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 22,
    color: colors.c_1c1c1c,
  },
  borderRegister: {
    marginBottom: 25,
    borderColor: colors.primary,
    paddingVertical: 12,
    backgroundColor: colors.primary,
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
    marginBottom: 23,
    zIndex: 1,
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
  listImage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  textAreaW: {
    marginTop: 15,
    marginBottom: 30
  },
  textAreaContainer: {
    marginTop: 15,
    borderColor: colors.c_d0D5dd,
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: 8
  },
  textArea: {
    height: 128,
    textAlignVertical: "top"
  },
  textReturn: {
    paddingBottom: 20,
    fontSize: 16,
    fontWeight: "600",
    color: colors.c_48484A,
    textDecorationColor: colors.c_48484A,
    textDecorationLine: 'underline',
    textAlign: 'center',
    alignContent: 'center'
  },
  textDk: {
    fontSize: 10,
    fontFamily: "400",
    color: colors.c_000000,
    paddingVertical: 20,
  },
  textBlue:{
    fontSize: 10,
    fontFamily: "400",
    color: colors.c_2982E2,
  },
  textLogin: {
    color: colors.c_ffffff,
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
  },
  btnLoginContainer: {
    width: DIMENSIONS.width - 24 * 2,
    paddingVertical: 15
  },
  backgroundLogin: {
    borderRadius: 10,
  },
})

export default RegisterThirdStep