import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";

import {
  selectProfile,
  resetSuggestLocation,
  GetSuggestLocation,
  GetDirectLocationByText,
} from "../../../../redux/slice/Profile/profile";
import { colors } from "../../../../constants/colors";
import { icons } from "../../../../constants/icons";
import { translate } from "../../../../locale";
import { useDispatch, useSelector } from "react-redux";

import Input from "../../../../componets/Input";
import Button from "../../../../componets/Button";
import ButtonCT from "../../../../componets/ButtonCT";

interface Props {
  openModal?: boolean;
  closeModal: () => void;
  selectAddress: (item: object) => void;
  value?: string | null;
  selectByInput: (item: string) => void;
  onDeleteData: () => void;
}

const SearchLocation = (props: Props) => {
  const dispatch = useDispatch();
  const {
    suggestLocation,
    suggestLocationByKeyWord,
    directLocationByKeyWord,
    loading,
  } = useSelector(selectProfile);
  const [textInput, setTextInput] = useState("");
  const [onSearch, setOnSearch] = useState(false);

  useEffect(() => {
    setOnSearch(false);
  }, []);
  useEffect(() => {
    if (props.value) {
      setTextInput(props.value);
    }
  }, [props.value]);
  useEffect(() => {
    if (directLocationByKeyWord.length === 0) {
      setOnSearch(true);
    }
  }, [directLocationByKeyWord]);
  const onCloseModal = () => {
    props.closeModal();
    props.selectByInput(textInput);
    setOnSearch(false);
  };

  const onSelectAddress = (item: object) => {
    // dispatch(GetDirectLocationByText({ search: item }));
    props.selectAddress(item);
  };

  const onDebounce = useCallback(
    debounce((value) => {
      dispatch(GetDirectLocationByText({ search: value }));
    }, 500),
    []
  );
  const onChangeText = (value: string) => {
    setTextInput(value);
    if (value) {
      onDebounce(value);
    } else {
      dispatch(resetSuggestLocation(null));
      props.onDeleteData();
    }
  };
  const deleteData = () => {
    setTextInput("");
    props.onDeleteData();
    dispatch(resetSuggestLocation(null));
  };
  return (
    <Modal
      transparent
      visible={props.openModal}
      animationType="slide"
      onRequestClose={() => {
        onCloseModal();
      }}
    >
      <View
        // onPress={() => Keyboard.dismiss()}
        style={{
          backgroundColor: colors.c_ffffff,
          flex: 1,
          flexDirection: "column",
          //   justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            backgroundColor: colors.c_ffffff,
            // paddingHorizontal: 24,
            // paddingVertical: 24,
          }}
        >
          <View style={styles.modalTitleView}>
            <View style={styles.header}>
              <Input
                styleView={{ marginBottom: 0 }}
                value={textInput}
                placeholder={"Nhập địa chỉ"}
                onChangeText={(value) => onChangeText(value)}
                deleteAll={() => {
                  deleteData();
                }}
                showDelete={true}
                autoFocus={true}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                onCloseModal();
              }}
              style={styles.headerClose}
            >
              <Text>OK</Text>
            </TouchableOpacity>
          </View>
          {directLocationByKeyWord?.length > 0 ? (
            <ScrollView>
              {directLocationByKeyWord.map((item) => (
                <TouchableOpacity
                  style={{
                    borderRadius: 10,
                    marginHorizontal: 24,
                    paddingVertical: 10,
                    marginVertical: 2,
                  }}
                  onPress={() => onSelectAddress(item)}
                >
                  <Text
                    style={{
                      color: colors.c_000000,
                      fontSize: 14,
                      fontWeight: "400",
                      lineHeight: 16,
                    }}
                  >
                    {item.address}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : onSearch && textInput && loading ? (
            // <View style={{ paddingHorizontal: 24 }}>
            //   <Text>Không có kết quả với {textInput}</Text>
            // </View>
            <View></View>
          ) : (
            <View></View>
          )}
        </View>
      </View>
      {/* <View style={{ paddingBottom: 20, marginHorizontal: 24 }}>
        <ButtonCT
          textButton={translate("Hoàn thành")}
          onPress={() => {}}
          styleBackground={[styles.btnBg]}
          styleText={styles.btnText}
        />
      </View> */}
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalTitleView: {
    paddingHorizontal: 24,
    paddingVertical: 10,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalView: {
    backgroundColor: colors.c_ffffff,
    // height: "auto",
    // maxHeight: "100%",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 16,
    color: colors.c_48484A,
  },
  header: {
    // backgroundColor: "red",
    flex: 1,
    // paddingVertical: 10,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 0,
  },
  headerClose: {
    // paddingVertical: 10,
  },
  iconTurnOff: {
    width: 20,
    height: 20,
  },
});
export default SearchLocation;
