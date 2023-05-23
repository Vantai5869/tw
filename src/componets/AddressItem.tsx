import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Alert,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { colors } from "../constants/colors";
import { IconAddressFlag, icons, IconSquarePin1 } from "../constants/icons";
import { TAddressObject } from "../constants/type.interface";
import { translate } from "../locale";
import { ScreenNames } from "../navigation/screen";
import ArletConfirm from "./AlertConfirm";
import {
  DeleteAddress,
  SetDefaultAddress,
  GetAddressById,
  GetProvince,
  GetAddressList,
} from "../redux/slice/Profile/profile";
import { CheckBox } from "./CheckBox";
import Arlets from "./Alerts";

export const AddressText = React.memo(
  ({ item, typeRadio }: { item: TAddressObject; typeRadio: boolean }) => (
    <View style={styles.boxText}>
      <View style={styles.flex2}>
        <View style={styles.viewNameContainer}>
          <Text numberOfLines={1} style={styles.txtName}>
            {item?.name}
          </Text>
        </View>
        {item?.isDefault && !typeRadio ? (
          <View style={styles.flexDefault}>
            <Text style={styles.txtDefault}>
              {translate("default_address")}
            </Text>
          </View>
        ) : null}
      </View>
      <Text style={styles.txtContent}>{item?.phoneNumber}</Text>
      <Text style={styles.txtContent} numberOfLines={2}>
        {item?.specificAddress}, {item?.wardName}, {item?.districtName},{" "}
        {item?.provinceName}
      </Text>
      {item?.shippingAddressType === 1 ? (
        <View style={[styles.flex, { marginTop: 12 }]}>
          <IconAddressFlag
            width={14}
            height={14}
            fill={colors.c_34C759}
            stroke={colors.c_34C759}
          />
          <View style={styles.typeAddress}>
            <Text style={styles.txtDefaultAddr}>
              {translate("personal_address")}
            </Text>
          </View>
        </View>
      ) : (
        <View style={[styles.flex, { marginVertical: 12 }]}>
          <IconAddressFlag
            width={12}
            height={13}
            fill={colors.c_34C759}
            stroke={colors.c_34C759}
          />
          <View style={styles.typeAddress}>
            <Text style={styles.txtDefaultAddr}>
              {translate("office_address")}
            </Text>
          </View>
        </View>
      )}
      {item?.isDefault && typeRadio ? (
        <View style={styles.flex}>
          <Text style={styles.txtDefault}>{translate("default_address")}</Text>
        </View>
      ) : null}
    </View>
  )
);

interface TItem {
  item: TAddressObject;
  typeRadio?: boolean;
  checked?: number | string | undefined;
  onSelect?: (data: TAddressObject | any) => void;
  props: any;
  isPopup?: boolean;
  isSelected?: any;
}

export const AddressItem = React.memo(
  ({ item, typeRadio, checked, onSelect, props }: TItem) => {
    const dispatch = useDispatch();

    const [isDelete, setDelete] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [idSelect, SetIdSelect] = useState("");
    const [deleteDefault, setCantDeleteDefault] = useState<boolean>(false);

    const onSetDefault = async (item: TAddressObject) => {
      await dispatch(SetDefaultAddress(item));
      await dispatch(GetAddressList({ take: 20, skip: 20 }));
      await dispatch(GetProvince(""));
    };
    const onSetEdit = async (item: any) => {
      await dispatch(GetAddressById(item.id));
      props.navigation.navigate(ScreenNames.EditAddress);
    };

    const onDelete = (id: string) => {
      if (item.isDefault === true) {
        setCantDeleteDefault(true);
      } else {
        setDelete(true);
      }
    };

    const onSubmitDelete = () => {
      setDelete(false);
      setModalVisible(false);
      dispatch(DeleteAddress(item.id));
      SetIdSelect("");
    };
    const onCancelDelete = () => {
      setDelete(false);
    };
    return (
      <View style={styles.view}>
        {typeRadio ? (
          <View style={styles.viewRadio}>
            <CheckBox
              typeRadio={true}
              checked={checked === item.id ? true : false}
              onPress={() => {
                onSelect?.(item);
              }}
              node={<AddressText item={item} typeRadio={typeRadio} />}
            />
          </View>
        ) : (
          <View style={styles.viewIconAddress}>
            <IconSquarePin1 stroke={colors.primary} />
          </View>
        )}

        {!typeRadio ? (
          <>
            <AddressText item={item} typeRadio={typeRadio || false} />
            <View style={styles.menuIcon}>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={styles.menuIconTouchable}
              >
                <Image
                  source={icons.ICON_MENU_DOTS}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Modal
                transparent
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => {
                  setModalVisible(false);
                }}
              >
                <View style={styles.modalMain}>
                  <View style={styles.modalView}>
                    <View style={styles.modalTitleView}>
                      <View style={styles.header}>
                        <Text style={styles.modalTitle}>
                          {translate("option")}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => setModalVisible(!modalVisible)}
                        style={styles.headerClose}
                      >
                        <Image
                          source={icons.ICON_CLOSE}
                          style={styles.iconTurnOff}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.selectOptionView}>
                      <TouchableOpacity
                        style={styles.selectBox}
                        onPress={() => onSetDefault(item)}
                      >
                        <Text style={styles.txtPopover}>
                          {translate("set_to_default")}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.selectBox}
                        onPress={() => onSetEdit(item)}
                      >
                        <Text style={styles.txtPopover}>
                          {translate("edit")}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.selectBox}
                        onPress={() => onDelete(item?.id?.toString() || "")}
                      >
                        <Text style={styles.txtPopover}>
                          {translate("delete")}
                        </Text>
                      </TouchableOpacity>
                      {isDelete ? (
                        <ArletConfirm
                          modalVisible={isDelete}
                          content={translate("wanna_delete_address")}
                          confirm={onSubmitDelete}
                          cancel={onCancelDelete}
                        />
                      ) : null}

                      {deleteDefault ? (
                        <Arlets
                          modalVisible={deleteDefault}
                          content={translate("cannot_delete_default_address")}
                          confirm={() => setCantDeleteDefault(false)}
                        />
                      ) : null}
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </>
        ) : null}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  flexDefault: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
  },
  flex2: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewRadio: { flex: 1 },
  boxText: {
    flex: 1,
    // paddingRight: 90,
    textAlign: "left",
    justifyContent: "flex-start",
  },
  viewNameBottom: {},
  txtName: {
    lineHeight: 22,
    fontSize: 16,
    fontWeight: "600",
    color: colors.c_48484A,
    textAlign: "center",
  },
  iconFlag: {
    width: 18,
    height: 18,
    marginLeft: 10,
    marginRight: 4,
  },
  txtDefault: {
    lineHeight: 14,
    fontWeight: "500",
    fontSize: 12,
    color: colors.c_007AFF,
  },
  txtDefaultAddr: {
    lineHeight: 14,
    fontSize: 12,
    fontWeight: "500",
    color: colors.c_34C759,
  },
  txtContent: {
    lineHeight: 14,
    fontSize: 12,
    fontWeight: "500",
    color: colors.c_48484A,
  },
  icon: {
    width: 5,
    height: 21,
    marginTop: 5,
  },
  menuIcon: {
    position: "relative",
    height: 31,
  },
  menuIconTouchable: {
    height: 31,
    width: 31,
    // borderWidth: 1,
    // borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  popover: {
    position: "absolute",
    top: "100%",
    right: 10,
    zIndex: 1000,
    width: 160,
    backgroundColor: colors.c_ffffff,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 5,
    display: "none",
  },
  display: {
    display: "flex",
  },
  txtPopover: {
    lineHeight: 29,
    fontSize: 12,
    fontWeight: "500",
    // color: colors.c_48484A,
    color: colors.primary,
  },
  viewIconAddress: {
    marginVertical: 6,
    // marginHorizontal: 8,
    marginRight: 15,
  },
  typeAddress: {
    marginLeft: 8,
  },
  modalMain: {
    backgroundColor: colors.c_000_012,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    // paddingHorizontal: 24,
  },
  modalTitleView: {
    paddingHorizontal: 24,
    paddingVertical: 10,
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
    fontSize: 18,
    color: colors.c_48484A,
    fontWeight: "500",
  },
  header: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: "center",
    // alignItems: "center",
  },
  headerClose: {
    paddingVertical: 10,
  },
  selectOptionView: {
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  iconTurnOff: {
    width: 20,
    height: 20,
  },
  viewNameContainer: { maxWidth: "60%" },
  selectBox: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.primary,
    marginVertical: 5,
    height: 40,
  },
});
