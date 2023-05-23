import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { colors } from "../../../../constants/colors";
import { icons } from "../../../../constants/icons";
import { translate } from "../../../../locale";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProfile,
  resetSuggestLocation,
} from "../../../../redux/slice/Profile/profile";

interface Props {
  openModal?: boolean;
  closeModal: () => void;
  selectAddress: (item: object) => void;
}

const CurrentPosition = (props: Props) => {
  const dispatch = useDispatch();
  const { suggestLocation } = useSelector(selectProfile);

  const onCloseModal = () => {
    props.closeModal();
  };

  const onSelectAddress = (item: object) => {
    props.selectAddress(item);
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
          backgroundColor: colors.c_000_012,
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            backgroundColor: colors.c_ffffff,
            paddingHorizontal: 24,
            // paddingVertical: 24,
            paddingBottom: 24,
          }}
        >
          <View style={styles.modalTitleView}>
            <View style={styles.header}>
              <Text style={styles.modalTitle}>
                {translate("suggestion_address")}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                onCloseModal();
              }}
              style={styles.headerClose}
            >
              <Image
                source={icons.ICON_CLOSE}
                style={styles.iconTurnOff}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          {suggestLocation &&
            suggestLocation.map((item) => (
              <TouchableOpacity
                style={{
                  borderColor: colors.c_000_012,
                  borderRadius: 10,
                  padding: 5,
                  borderBottomWidth: 1,
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
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalTitleView: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.c_000_012,
    flexDirection: "row",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: colors.c_ffffff,
    height: "auto",
    maxHeight: "50%",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 16,
    color: colors.c_48484A,
  },
  header: {
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
});
export default CurrentPosition;
