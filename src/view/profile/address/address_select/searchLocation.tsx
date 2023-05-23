import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Platform,
} from "react-native";

import {
  selectProfile,
  resetSuggestLocation,
  GetDirectLocationByText,
} from "../../../../redux/slice/Profile/profile";
import { colors } from "../../../../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../../componets/Input";

interface Props {
  openModal?: boolean;
  closeModal: () => void;
  selectAddress: (item: object) => void;
  value?: string | null;
  selectByInput: (item: string) => void;
  onDeleteData: () => void | undefined;
}

const SearchLocation = (props: Props) => {
  const dispatch = useDispatch();
  const { directLocationByKeyWord, loading } = useSelector(selectProfile);
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
    props.selectAddress(item);
  };
  const deleteData = () => {
    setTextInput("");
    dispatch(resetSuggestLocation(null));
    props.onDeleteData();
  };

  const onDebounce = useCallback(
    debounce((value) => {
      dispatch(GetDirectLocationByText({ search: value }));
    }, 500),
    []
  );
  const onChangeText = (value: string) => {
    setTextInput(value);
    // call api
    if (value) {
      onDebounce(value);
    } else {
      props.onDeleteData();
      dispatch(resetSuggestLocation(null));
    }
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
        style={{
          backgroundColor: colors.c_ffffff,
          flex: 1,
          flexDirection: "column",
        }}
      >
        <View
          style={{
            backgroundColor: colors.c_ffffff,
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
              {directLocationByKeyWord.map((item: any) => (
                <TouchableOpacity
                  style={{
                    borderColor: colors.c_000_012,
                    borderRadius: 10,
                    marginHorizontal: 24,
                    // borderBottomWidth: 1,
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
            <View></View>
          ) : (
            <View></View>
          )}
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalTitleView: {
    paddingHorizontal: 24,
    // paddingVertical: 20,
    paddingTop: Platform.OS === "android" ? 10 : 30,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalView: {
    backgroundColor: colors.c_ffffff,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 16,
    color: colors.c_48484A,
  },
  header: {
    flex: 1,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 0,
  },
  headerClose: {},
  iconTurnOff: {
    width: 20,
    height: 20,
  },
});
export default SearchLocation;
