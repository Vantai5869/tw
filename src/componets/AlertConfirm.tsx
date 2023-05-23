import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DIMENSIONS } from "../common/utils";
import { colors } from "../constants/colors";
import { IconWarning } from "../constants/icons";
import { translate } from "../locale";

interface Props {
  modalVisible: boolean;
  content: string;
  statusNoti?: string;
  confirm: () => void;
  cancel: () => void;
}

const ArletConfirm = (props: Props) => {
  const [isModal, setIsModal] = useState(false);
  useEffect(() => {
    setIsModal(props.modalVisible);
    // setTimeout(() => setIsModal(props.modalVisible), 100);
  }, [props]);
  return (
    <Modal
      animationType="fade"
      transparent
      visible={isModal}
      onRequestClose={() => {
        setIsModal(false);
      }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.contentModal}>
          {props?.statusNoti === "false" ? (
            <IconWarning
              width={38}
              height={38}
              style={{
                marginBottom: 10,
              }}
            />
          ) : (
            <></>
          )}
          <Text style={styles.textNoti}>{translate("noti")}</Text>
          <Text style={styles.contentNoti}>{props.content}</Text>
          <View style={styles.viewButton}>
            <TouchableOpacity
              style={styles.buttonCloseModalConfirm}
              onPress={props.cancel}
            >
              <Text style={styles.textCloseModal}>{translate("close")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonCloseModalConfirm}
              onPress={props.confirm}
            >
              <Text style={styles.textCloseModal}>{translate("Ok")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  contentModal: {
    backgroundColor: colors.c_ffffff,
    borderRadius: 12,
    justifyContent: "center",
    paddingTop: 54,
    paddingHorizontal: 40,
    width: DIMENSIONS.width - 48,
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
  },
  textNoti: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.c_1c1c1c,
    paddingBottom: 8,
  },
  contentNoti: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.c_636366,
    paddingBottom: 32,
    textAlign: "center",
  },
  buttonCloseModal: {
    textAlign: "center",
    paddingVertical: 15,
  },
  textCloseModal: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.c_ffffff,
  },
  viewButton: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between",
    height: 43,
    width: "100%",
  },
  buttonCloseModalConfirm: {
    width: 100,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
});

export default ArletConfirm;
