import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from 'react-redux'
import { DIMENSIONS } from '../../../../common/utils'
import ButtonBoder from "../../../../componets/ButtonBoder"
import Input from "../../../../componets/Input"
import { colors } from "../../../../constants/colors"
import { DotBlue, IconAngleRight } from "../../../../constants/icons"
import { translate } from "../../../../locale"
import { ScreenNames } from '../../../../navigation/screen'
import { selectRegister, setReqRegister } from '../../../../redux/slice/Authen/register'
import { addressDetail, selectProfile } from '../../../../redux/slice/Profile/profile'

const RegisterSecondStep = ({ ...props }) => {

  interface DataSecondStepError {
    NameNdd?: string,
    DOB?: string,
    NumberCMT?: string,
    AddressNdd?: string,
  }
  
  const initialDataSecondStep = {
    NameNdd: "",
    DOB: "",
    NumberCMT: "",
    AddressNdd: "",
  }


  const [dataFirstStep, setDataFirstStep] = useState(initialDataSecondStep);
  const [DataSecondStepError, setDataSecondStepError] = useState<DataSecondStepError>({})
  const dispatch = useDispatch();
  const {reqestRegister} = useSelector(selectRegister)
  const { addressState } = useSelector(selectProfile);
  const navigation = useNavigation();

  //input
  const changeNameNDD = (value: string) => {
    setDataSecondStepError({});
    setDataFirstStep({ ...dataFirstStep, NameNdd: value });
  }
  const changeDOB = (value: string) => {
    setDataSecondStepError({});
    setDataFirstStep({ ...dataFirstStep, DOB: value });
  }
  const changeNumberCmt = (value: string) => {
    setDataSecondStepError({});
    setDataFirstStep({ ...dataFirstStep, NumberCMT: value });
  }

  const submitDataStep2 = () => {
    if (dataFirstStep.NameNdd === "") {
      setDataSecondStepError({
        ...DataSecondStepError,
        NameNdd : translate("You_have_not_entered_your_name_NDD")
      })
    } else if (dataFirstStep.DOB === ""){
      setDataSecondStepError({
        ...DataSecondStepError,
        DOB: translate("You_have_not_entered_your_DOB")
      })
    } else if(dataFirstStep.NumberCMT === "") {
      setDataSecondStepError({
        ...DataSecondStepError,
        NumberCMT : translate("You_have_not_entered_your_number_CMT")
      })
    } else if(dataFirstStep.NameNdd !== "" &&
    dataFirstStep.DOB !== "" &&
    dataFirstStep.NumberCMT !== "" 
    ){
        dispatch(setReqRegister({
          LegalRepresentativeName: dataFirstStep.NameNdd,
          DOB: dataFirstStep.DOB,
          CardNumber: dataFirstStep.NumberCMT,
          LegalRepresentativeAddres: addressState?.detailAddress?.name || reqestRegister?.LegalRepresentativeAddres
        }))
        props.goToStep(3)
    }
  }
  useEffect(() => {
    if(reqestRegister !== null){
      setDataFirstStep({ ...dataFirstStep,
        NameNdd: reqestRegister?.LegalRepresentativeName,
        DOB: reqestRegister?.DOB,
        AddressNdd: reqestRegister?.LegalRepresentativeAddres,
        NumberCMT: reqestRegister?.CardNumber
      })
    }
  },[])

  const onDetailAddress = () => {
    dispatch(addressDetail({ ...addressState, isRegister: true }));
    navigation.navigate(ScreenNames.AddressSelectRegister);
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.registerSecondStepDes}>
          <DotBlue />
          <Text style={styles.registerSecondStepTitle}>{translate("legal_representative_info")}</Text>
        </View>
        <Input
          value={dataFirstStep.NameNdd}
          placeholder={translate("enter_representative_s_name")}
          onChangeText={changeNameNDD}
          errorText={DataSecondStepError?.NameNdd}
          title={translate("representative_s_name")}
          required={true}
        />
        <Input
          onChangeText={changeDOB}
          placeholder={translate("enter_date_of_birth")}
          title={translate("date_of_birth")}
          value={dataFirstStep.DOB}
          errorText={DataSecondStepError.DOB}
          required={true}
        />
        <Input
          onChangeText={changeNumberCmt}
          placeholder={translate("enter_cmt")}
          title={translate("cmt")}
          value={dataFirstStep.NumberCMT}
          errorText={DataSecondStepError.NumberCMT}
          required={true}
        />
        <View style={styles.textTitle}>
          <Text style={styles.title}>{translate("Representative's address")}</Text>
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
          ) : reqestRegister?.LegalRepresentativeAddres ? (
            <View style={styles.viewSpecificAddress}>
              <Text numberOfLines={2} style={styles.viewAdress}>
                {reqestRegister?.LegalRepresentativeAddres ? (
                  <Text style={styles.textAddressDetail}>
                    {reqestRegister?.LegalRepresentativeAddres}
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

      </ScrollView>
      <ButtonBoder
        textButton={translate("next")}
        style={styles.borderRegister}
        styleText={styles.textRegister}
        onPress={() => submitDataStep2()}
      />
      <TouchableOpacity onPress={() => props.returnStep(1)}>
        <Text style={styles.textReturn}>{translate("return")}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  registerSecondStepDes: {
    flexDirection: "row",
  },
  registerSecondStepTitle: {
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
    marginBottom: 25,
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

export default RegisterSecondStep