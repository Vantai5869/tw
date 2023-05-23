import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  Modal,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../../../constants/colors";
import {
  IconAngleLeft,
  IconFilter,
  IconShoppingCart,
  IconZoom,
} from "../../../../constants/icons";
import { translate } from "../../../../locale";
import { ScreenNames } from "../../../../navigation/screen";
import ModalSearchByText from "./ModalSearchByText";
import ModalFilterProduct from "./ModalFilter";
import IconCart from "../../../../componets/IconCart";
import { ModalSearchText } from "../../../importProduct/purchase/search-text";

export default function HeaderBar({ ...props }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [text, setText] = useState<string>("");
  const [textM, setTextM] = useState<string>("");
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onOnpenSearch = () => {
    setIsSearch(true);
    setModalVisible(!modalVisible);
    props.navigation.navigate(ScreenNames.SearchScreen)
  };
  useEffect(() => {
    setIsSearch(false);
  }, []);
  const onSearch = () => {
    setModalVisible(!modalVisible);
    setTextM("");
  };

  const onOpenFilter = () => {
    setIsFilter(true);
  };

  const onOpenCart = () => {
    navigation.navigate(ScreenNames.Cart as any);
  };
  const onChangeText = (item: string) => {
    setTextM(item);
  };
  const onCloseModal = () => {
    setModalVisible(false);
  };
  return (
    <ScrollView style={[styles.container, props.containerStyle]} keyboardShouldPersistTaps="always">
      <View style={styles.viewSearchSort}>
        {props.goBack ? (
          <TouchableOpacity
            style={styles.goBack}
            onPress={() => props.navigation.goBack()}
          >
            <IconAngleLeft
              width={24}
              height={24}
              fill={props.lightStyle ? colors.c_ffffff : colors.c_000000}
            />
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
        <TouchableOpacity
          onPress={onOnpenSearch}
          style={
            props.lightStyle ? styles.inputSearchWhite : styles.inputSearch
          }
        >
          <IconZoom
            width={18}
            height={18}
            stroke={props.lightStyle ? colors.c_ffffff : colors.c_7B7B80}
          />
          <Text
            style={props.lightStyle ? styles.txtSearchWhite : styles.txtSearch}
            numberOfLines={1}
          >
            {text || translate("enter_keyword_search")}
          </Text>
        </TouchableOpacity>
        {props.showFilter ? (
          <TouchableOpacity
            style={props.lightStyle ? styles.boxSortWhite : styles.boxSort}
            onPress={onOpenFilter}
          >
            <IconFilter
              stroke={props.lightStyle ? colors.c_ffffff : colors.c_7B7B80}
            />
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
        {props.showCart ? (
          <TouchableOpacity
            style={props.lightStyle ? styles.boxSortWhite : styles.boxSort}
            onPress={onOpenCart}
          >
            <IconCart isLight={true} />
          </TouchableOpacity>
        ) : null}
      </View>
      <ModalFilterProduct
        modalVisible={isFilter}
        setIsModal={() => setIsFilter(!isFilter)}
        {...props}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  viewSearchSort: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputSearchWhite: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.c_ffffff,
    borderRadius: 8,
    paddingVertical: 11,
    paddingHorizontal: 11,
    flexDirection: "row",
    alignItems: "center",
  },
  inputSearch: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.c_000_01,
    borderRadius: 8,
    paddingVertical: 11,
    paddingHorizontal: 11,
    flexDirection: "row",
    alignItems: "center",
  },
  txtSearch: {
    fontSize: 14,
    lineHeight: 18,
    color: colors.c_7B7B80,
    marginLeft: 7,
    flex: 1,
  },
  txtSearchWhite: {
    fontSize: 14,
    lineHeight: 18,
    color: colors.c_ffffff,
    marginLeft: 7,
    flex: 1,
  },
  boxSortWhite: {
    marginLeft: 10,
    width: 43,
    height: 43,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.c_ffffff,
  },
  boxSort: {
    marginLeft: 10,
    width: 43,
    height: 43,
    // backgroundColor: colors.c_000_01,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.c_000_01,
  },
  icon: {
    width: 16,
    height: 16,
  },
  goBack: {
    justifyContent: "center",
    // alignItems: "center",
    paddingRight: 10,
    // paddingHorizontal: 10,
  },
  centeredView: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // marginTop: 22,
  },
  modalView: {
    width: "100%",
    backgroundColor: "white",
    // margin: 20,
    // borderRadius: 20,
    height: "100%",
    // padding: 35,
    paddingRight: 10,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  viewModalSearch: {
    flexDirection: "row",
    justifyContent: "space-around",
    // borderWidth: 1,
    alignItems: "center",
    width: "100%",
  },
  txtModalExit: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    color: colors.c_light_blue,
  },
  viewInput: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginRight: 10,
    width: "80%",
  },
  input: {
    // marginVertical: 10,
  },
  viewShowTextSearch: {
    flexDirection: "row",
    // borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 24,
    // backgroundColor: colors.c_000_01,
  },
  textKeyModal: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22,
  },
  textNameModal: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22,
    color: colors.c_light_blue,
  },
});
