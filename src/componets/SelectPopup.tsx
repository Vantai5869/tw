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
import { translate } from "../locale/index";
import ButtonCT from "../componets/ButtonCT";

interface Props {
  isVisible: boolean;
  title: string;
  data: any[];
  checkeds: any[];
  onClose: () => void;
  onChange: (e: any) => void;
  multi?: boolean;
}

const SelectPopUp = (props: Props) => {
  const { multi = true } = props;
  const [isModal, setIsModal] = useState(false);
  const [checkeds, setCheckeds] = useState<any[]>([]);

  useEffect(() => {
    setIsModal(props.isVisible);
  }, [props.isVisible]);

  useEffect(() => {
    setCheckeds(props.checkeds);
  }, [props.checkeds]);

  const checkSelection = (item: any) => {
    setCheckeds((preState) => {
      if (preState.includes(item)) {
        return preState.filter((e) => e !== item);
      }
      if (multi) {
        return [...preState, item];
      } else {
        return [item];
      }
    });
  };
  return (
    <Modal transparent visible={isModal} animationType="slide">
      <View style={styles.modalMain}>
        <View style={styles.modalView}>
          <View style={styles.modalTitleView}>
            <View style={styles.header}>
              <Text style={styles.modalTitle}>{props.title}</Text>
            </View>
            <TouchableOpacity
              onPress={() => props.onClose()}
              style={styles.headerButton}
            >
              <Image
                source={icons.ICON_CLOSE}
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
                    <View style={styles.checkbox}>
                      <CheckBox
                        typeRadio={false}
                        checked={checkeds.includes(item)}
                        onPress={() => checkSelection(item)}
                        node={
                          <Text style={[styles.label, { marginTop: 0 }]}>
                            {item}
                          </Text>
                        }
                      />
                    </View>
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
          <TouchableOpacity
            onPress={() => {
              props.onChange(checkeds);
              props.onClose();
            }}
            // style={styles.chooseButton}
          >
            <ButtonCT
              textButton={translate("ok")}
              style={styles.chooseButton}
              styleText={styles.chooseText}
              onPress={() => {
                props.onChange(checkeds);
                props.onClose();
              }}
            />
            {/* <Text style={styles.chooseText}>{translate("ok")}</Text> */}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SelectPopUp;

const styles = StyleSheet.create({
  modalMain: {
    backgroundColor: colors.c_000_005,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  modalTitleView: {
    marginHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    flexDirection: "row",
    borderBottomColor: colors.c_000_01,
    alignItems: "center",
  },
  modalView: {
    backgroundColor: colors.c_ffffff,
    height: "auto",
    maxHeight: "50%",
    // borderRadius: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 19.36,
    color: colors.c_1F1F1F,
  },
  chooseButton: {
    backgroundColor: colors.primary,
    // padding: 8,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
  },
  chooseText: {
    color: colors.c_ffffff,
    textAlign: "center",
  },
  icon: {
    width: 18,
    height: 18,
  },
  listView: {
    paddingHorizontal: 24,
    paddingTop: 17,
    maxHeight: "70%",
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "400",
    color: colors.c_48484A,
  },
  header: {
    flex: 1,
    paddingTop: 10,
    // paddingVertical: 16,
    // paddingHorizontal: 24,
  },
  headerButton: {
    paddingTop: 10,
  },
  listLabel: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginBottom: 10,
  },
  checkbox: {
    marginTop: 10,
    marginRight: 10,
  },
  empty: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
