import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../constants/colors";
import { IconQTyMinus, IconQTyPlus } from "../constants/icons";
import { LIMIT_QUATITY } from "../constants/untils";
import { useKeyboard } from "../constants/useKeyboard";
import i18n, { translate } from "../locale";
import { selectDistributorCart } from "../redux/slice/Cart/distributor-cart";
import AlertConfirm from "./AlertConfirm";
import { GradientView } from "./GradientView";

interface TInput {
  value: number;
  onChangeText: (value: number) => void;
  onDelete: () => void;
  styleView?: any;
  disableChange?: boolean;
}

export default function InputQuantity(props: TInput) {
  const keyboardHeight = useKeyboard();
  const { changeQuantitySuccess } = useSelector(selectDistributorCart);

  const [value, setValue] = useState<string>(props.value?.toString());
  const [actionType, setActionType] = useState<string>(props.value?.toString());
  const [isDelete, setIsDelete] = useState<boolean>(false);

  useEffect(() => {
    if (props.value > 0) {
      setValue(props.value?.toString());
    }
  }, [props.value, changeQuantitySuccess]);

  const handleAlertDelete = (action?: string) => {
    setIsDelete(true);
    setActionType(action || "");
    return true;
  };

  const onDebounceChangeTextInput = useCallback(
    debounce((val: number) => {
      if (val > 0 && val <= LIMIT_QUATITY) {
        props.onChangeText(val);
      }
    }, 1000),
    []
  );

  const onDebounceDelete = useCallback(
    debounce((action: string) => {
      handleAlertDelete(action);
    }, 600),
    []
  );

  React.useEffect(() => {
    if (keyboardHeight === 0 && Number(value) === 0) {
      handleAlertDelete();
    }
  }, [keyboardHeight]);

  return (
    <>
      <View style={[styles.wrapView, props.styleView]}>
        <TouchableOpacity
          disabled={props.disableChange ? props.disableChange : false}
          onPress={() => {
            const val = Number(value) - 1;
            if (val > 0) {
              setValue(val.toString());
            } else {
              setValue("0");
              onDebounceDelete("CLICK");
            }
          }}
          onPressOut={() => onDebounceChangeTextInput(Number(value) - 1)}
        >
          {!props.disableChange ? (
            <IconQTyMinus width={24} height={24} />
          ) : (
            <Text>{translate("number_product_order") + ":"}</Text>
          )}
        </TouchableOpacity>
        <TextInput
          value={value}
          style={styles.input}
          onChangeText={(text) => {
            const val = !!text ? Number(text).toString() : "0";
            if (Number(val) <= LIMIT_QUATITY) {
              setValue(val);
              onDebounceChangeTextInput(Number(val));
            }
          }}
          keyboardType="number-pad"
          editable={!props.disableChange}
        />
        <TouchableOpacity
          disabled={props.disableChange ? props.disableChange : false}
          onPress={() => {
            const val = Number(value) + 1;
            if (Number(val) <= LIMIT_QUATITY) {
              setValue(val.toString());
            }
          }}
          onPressOut={() => onDebounceChangeTextInput(Number(value) + 1)}
        >
          {!props.disableChange ? <IconQTyPlus width={24} height={24} /> : null}
        </TouchableOpacity>
      </View>
      <AlertConfirm
        modalVisible={isDelete}
        content={translate("wanna_delete_cart_item")}
        confirm={() => props?.onDelete()}
        cancel={() => {
          setIsDelete(false);
          setActionType("");
          if (actionType !== "CLICK") {
            setValue(props.value?.toString());
          } else {
            setValue("1");
          }
        }}
        statusNoti="false"
      />
    </>
  );
}

const styles = StyleSheet.create({
  wrapView: {
    width: 70,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    minWidth: 24,
    height: 24,
    borderRadius: 0,
    paddingVertical: 0,
    paddingHorizontal: 5,
    fontSize: 18,
    // lineHeight: 24,
    textAlign: "center",
    color: colors.c_48484A,
  },
});
