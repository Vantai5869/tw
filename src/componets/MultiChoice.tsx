import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from "react-native";
import { icons } from "../constants/icons";
import { CheckBox } from "./CheckBox";
import { colors } from "../constants/colors";
import i18n from "../locale";

interface Props {
  isVisible: boolean;
  title: string;
  value: string;
  label: string;
  data: any[];
  checked: any;
  onClose: () => {};
  onChange: (e: any) => void;
}

const MultiChoice = (props: Props) => {
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    setIsModal(props.isVisible);
  }, [props]);
  const checkSelection = (item: any) => {
    props.onChange(item);
    props.onClose();
  };
  return (
    <Modal transparent visible={isModal} animationType="slide">
      <View style={styles.modalMain}>
        <View style={styles.modalView}>
          <View style={styles.modalTitleView}>
            <View style={styles.header}>
              <Text style={styles.modalTitle}>{props.title}</Text>
            </View>
            <TouchableOpacity onPress={() => props.onClose()}>
              <Image
                source={icons.ICON_EYE_OFF}
                style={styles.icon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          {props.data.length > 0 ? (
            <View style={styles.listView}>
              <FlatList
                data={props.data}
                renderItem={({ item, index }) => (
                  <View style={styles.listLabel} key={index}>
                    <CheckBox
                      typeRadio={false}
                      checked={props.checked === item[props.value]}
                      onPress={() => checkSelection(item[props.value])}
                    />
                    <Text style={styles.label}>{item[props.label]}</Text>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ) : (
            <View style={styles.empty}>
              <Text>{i18n.t("No data")}</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default MultiChoice;

const styles = StyleSheet.create({
  modalMain: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  modalTitleView: {
    padding: 10,
    borderBottomWidth: 1,
    flexDirection: "row",
    borderBottomColor: colors.c_efefef,
    alignItems: "center",
  },
  modalView: {
    backgroundColor: colors.c_ffffff,
    height: "auto",
    maxHeight: "50%",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 15,
    color: colors.c_000000,
  },
  chooseButton: {
    backgroundColor: colors.c_333333,
    padding: 8,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 100,
    borderRadius: 5,
  },
  chooseText: {
    color: "#fff",
    textAlign: "center",
  },
  icon: {
    width: 14,
    height: 14,
  },
  listView: {
    paddingHorizontal: 20,
    maxHeight: "70%",
  },
  label: {
    marginTop: 10,
  },
  header: {
    flex: 1,
    paddingTop: 10,
  },
  listLabel: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  empty: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
