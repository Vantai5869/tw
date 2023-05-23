import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  NativeEventEmitter,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import VnpayMerchant, {
  VnpayMerchantModule,
} from "../../../../react-native-vnpay-merchant";
import { DIMENSIONS } from "../../../common/utils";
import Alerts from "../../../componets/Alerts";
import Button from "../../../componets/ButtonCT";
import { CheckBox } from "../../../componets/CheckBox";
import Input from "../../../componets/Input";
import { colors } from "../../../constants/colors";
import { IconCreditCard, IconTemple } from "../../../constants/icons";
import { translate } from "../../../locale";
import { ScreenNames } from "../../../navigation/screen";
import httpService from "../../../redux/service/httpService";
import { getWallet, selectHome } from "../../../redux/slice/Home/home";
import {
  GetTransactionHistory,
  resetWallet,
} from "../../../redux/slice/wallet";
import MoneyOption from "../components/money_option";

const eventEmitter = new NativeEventEmitter(VnpayMerchantModule);

export default function Recharge(props: any) {
  const { loading, listUserInfor: user, dataWallet } = useSelector(selectHome);
  const dispatch = useDispatch();
  const [paymentUrl, setPaymentUrl] = useState<string | undefined>(undefined);
  // const [paymentTransactionCode, setPaymentTransactionCode] = useState<string | undefined>(undefined);
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [err, setErr] = useState("");
  const [isTopUpSuccess, setIsTopupSuccess] = useState(false);
  const paymentTransactionCode = useRef<string | undefined>(undefined);
  const VALUE = [
    { id: 1, value: "100000" },
    { id: 2, value: "200000" },
    { id: 3, value: "300000" },
    { id: 4, value: "500000" },
    { id: 5, value: "1000000" },
    { id: 6, value: "2000000" },
  ];
  const methods = [
    {
      id: 1,
      BankCode: "VNBANK",
      label: translate("Domestic_bank"),
      icon: <IconTemple width={20} height={20} stroke={colors.primary} />,
    },
    {
      id: 2,
      BankCode: "INTCARD",
      label: translate("Credit/Debit Card"),
      icon: <IconCreditCard width={20} height={20} stroke={colors.primary} />,
    },
  ];
  const [checked, setChecked] = useState<any>({});
  const [paymentType, setPaymentType] = useState<number>(1);
  const [paymentUrlLoading, setPaymentUrlLoading] = useState<boolean>(false);
  const onChangeText = (text: string) => {
    setChecked({ id: 0, value: text.replace(/[^0-9]/g, "") });
  };

  const handleTopup = async () => {
    if (!dataWallet?.walletId) {
      setErr(translate("wallet_not_found"));
      setIsShowAlert(true);
      return;
    }
    setPaymentUrlLoading(true);
    const topupData = {
      walletId: dataWallet.walletId,
      amount: checked.value,
      source: 0,
      extraProperties: {
        BankCode: methods.find((i) => i.id === paymentType)?.BankCode,
      },
    };
    try {
      const res: {
        paymentUrl: string | undefined;
        paymentTransactionCode: string | undefined;
      } = await httpService.POST({
        uri: "/webbff/wallet/api/app/wallet/start-wallet-top-up",
        request: topupData,
      });
      if (res?.paymentUrl) {
        setPaymentUrl(res.paymentUrl);
        paymentTransactionCode.current = res.paymentTransactionCode;
        setPaymentUrlLoading(false);
      }
    } catch (error: any) {
      setPaymentUrlLoading(false);
      setErr(error.message as string | "err");
      setIsShowAlert(true);
      return;
    }
  };

  useEffect(() => {
    eventEmitter.addListener("PaymentBack", (e) => {
      if (e) {
        switch (e.resultCode) {
          case 97: {
            reloadWallet();
            dispatch(resetWallet(""));
            setIsTopupSuccess(true);
            break;
          }
          case -1: {
            break;
          }
          case 98: {
            setErr(translate("create_topup_error"));
            setIsShowAlert(true);
            // ERR
          }
        }
        // khi tắt sdk
        eventEmitter.removeAllListeners("PaymentBack");
      }
    });
    if (paymentUrl)
      VnpayMerchant.show({
        iconBackName: "ic_back",
        paymentUrl: paymentUrl,
        scheme: "swing",
        tmn_code: "COMAWEB1",
        title: "payment",
      });
  }, [paymentUrl]);

  const clickContinue = () => {
    if (!checked.value) {
      setErr(translate("enter_price_please"));
      setIsShowAlert(true);
      return;
    } else if (+checked.value < 5000) {
      setErr(translate("min_price_for_topup"));
      setIsShowAlert(true);
      return;
    } else if (+checked.value > 1000000000) {
      setErr(translate("max_price_for_topup"));
      setIsShowAlert(true);
      return;
    }
    handleTopup();
  };

  useEffect(() => {
    setChecked({});
  }, []);

  const reloadWallet = () => {
    return dispatch(
      getWallet({
        UserId: user?.id,
      })
    );
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.moneyWrapper}>
            <Text style={[styles.numText, { marginBottom: 9 }]}>
              {" "}
              {translate("Topup_amount")}
            </Text>
            <View style={styles.optionWrapper}>
              {VALUE.map((item) => (
                <View style={styles.optionBtn}>
                  <MoneyOption
                    data={item}
                    setChecked={setChecked}
                    color={
                      checked.id == item.id
                        ? colors.gradient
                        : colors.notgradient
                    }
                    textColor={
                      checked.id == item.id ? colors.c_0052D4 : colors.c_48484A
                    }
                  />
                </View>
              ))}
            </View>
          </View>
          <View style={styles.numberWrapper}>
            <Text style={styles.numText}>
              {translate("Amount_of_money")} ({translate("Balance")}{" "}
              {formatNumber(dataWallet?.balance)})
            </Text>
            <View style={{ marginBottom: 19, marginTop: 2 }}>
              <Input
                autoFirst={true}
                keyboardType="number-pad"
                placeholder={
                  checked.value ? checked.value : translate("Enter_the_amount")
                }
                placeholderTextColor={colors.c_00000010}
                onChangeText={(text) => onChangeText(text)}
                value={formatNumber(checked.value)}
                styleInput={[
                  styles.textInput,
                  {
                    color: colors.c_FC832D,
                  },
                ]}
              ></Input>
            </View>
          </View>
          <Text style={styles.otherMethod}>
            {translate("Choose_a_topup_method")}
          </Text>
          <View style={styles.methodWrapper}>
            <View>
              {methods?.map((el, index) => (
                <TouchableOpacity
                  key={el.id}
                  style={[
                    styles.boxMethod,
                    { borderBottomWidth: index == 2 ? 0 : 1 },
                  ]}
                  onPress={() => {
                    setPaymentType(el?.id);
                    Keyboard.dismiss();
                  }}
                  activeOpacity={0.9}
                >
                  <View style={styles.flexAlignItems}>
                    <CheckBox
                      typeRadio={true}
                      checked={paymentType === el.id}
                      onPress={() => setPaymentType(el?.id)}
                      style={{ marginRight: 20 }}
                    ></CheckBox>
                    {el?.icon ? el?.icon : null}
                    <View style={{ marginLeft: 13 }}>
                      <Text style={styles.txtMtLabel}>{el.label}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <Alerts
            modalVisible={isShowAlert}
            content={err}
            confirm={() => setIsShowAlert(false)}
          />
        </View>
        <View style={styles.btnWrapper}>
          <Button
            textButton={translate("Continue")}
            onPress={clickContinue}
            style={styles.btnBg}
            styleText={styles.btnText}
            loading={paymentUrlLoading}
          />
        </View>
        <Alerts
          modalVisible={isTopUpSuccess || false}
          content={translate("success_topup")}
          confirm={() => {
            setIsTopupSuccess(false);
            props.navigation.navigate(ScreenNames.TopupSuccess, {
              paymentTransactionCode: paymentTransactionCode.current,
              amount: checked.value,
            });
          }}
        />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
export const formatNumber = (number: string | number, sperator?: string) => {
  return number
    ?.toString()
    .replace(/\./g, "")
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${sperator || "."}`);
};
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:colors.c_ffffff,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  content: {
    height: "100%",
  },
  moneyWrapper: {
    paddingHorizontal: 24,
    backgroundColor: colors.c_ffffff,
    paddingBottom: 17,
  },

  optionWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -3.5,
    backgroundColor: colors.c_ffffff,
    // backgroundColor: "red",
    justifyContent: "space-between",
  },
  optionBtn: {
    width: (DIMENSIONS.width - 48) / 3.2,
    marginHorizontal: 3.5,
    marginVertical: 4,
    borderWidth: 0,
    // borderRadius: 8,
  },
  numberWrapper: {
    marginTop: 5,
    backgroundColor: colors.c_ffffff,
    paddingHorizontal: 24,
  },
  numText: {
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 14,
    marginTop: 17,
    color: colors.c_636366,
  },
  valueText: {
    fontWeight: "600",
    fontSize: 32,
    lineHeight: 40,
    marginBottom: 19,
    marginTop: 2,
  },
  textInput: {
    color: colors.c_FC832D,
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "600",
    height: 60,
    textAlignVertical: "center",
    paddingVertical: 0,
    borderWidth: 0,
    paddingHorizontal: 0,
  },
  btnWrapper: {
    bottom: 0,
    paddingBottom: 40,
    backgroundColor: colors.c_ffffff,
    position: "absolute",
    width: "100%",
    paddingLeft: 23,
    paddingRight: 25,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  btnBg: {
    paddingVertical: 16,
  },
  btnText: {
    lineHeight: 22,
    fontSize: 16,
    fontWeight: "600",
    color: colors.c_ffffff,
  },
  otherMethod: {
    paddingHorizontal: 24,
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    paddingVertical: 8,
    color: colors.c_3A3A3C,
  },
  methodWrapper: {
    backgroundColor: colors.c_ffffff,
    paddingHorizontal: 24,
    height: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  boxMethod: {
    paddingVertical: 19,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: colors.c_f9f9f9,
  },
  flexAlignItems: { flexDirection: "row", alignItems: "center" },
  txtMtLabel: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "500",
    color: colors.c_3A3A3C,
  },

  modalMain: {
    backgroundColor: colors.c_000_012,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  modalView: {
    backgroundColor: colors.c_ffffff,
    height: "auto",
    // maxHeight: "50%",
    borderRadius: 10,
  },
  modalTitleView: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: colors.c_efefef,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 16,
    color: colors.c_48484A,
  },
  headerModal: {
    flex: 1,
    paddingVertical: 10,
  },
  headerClose: {
    paddingVertical: 10,
  },
  iconTurnOff: {
    width: 20,
    height: 20,
  },
  selectOptionView: {
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  txtPopover: {
    lineHeight: 29,
    fontSize: 14,
    fontWeight: "500",
    color: colors.c_48484A,
  },
  viewMethods: {
    paddingHorizontal: 26,
    paddingVertical: 10,
  },
  noBorder: { borderBottomColor: "transparent" },
});
