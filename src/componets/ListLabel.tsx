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
import { colors } from "../constants/colors";
import i18n from "../locale";
import TagGroupLabel from "./TagLabel";

interface Props {
  isVisible?: boolean;
  value?: string;
  data: any;
  onChange: (e: any) => void;
  pickedData?: any;
}

const ListLabel = (props: Props) => {
  const onSelect = (item: string) => {
    props.onChange(item);
  };
  return (
    <View style={styles.modalView}>
      <View style={styles.listView}>
        <FlatList
          data={props.data.data}
          renderItem={({ item, index }) => (
            <View style={styles.listLabel} key={index}>
              <View style={styles.checkbox}>
                <TagGroupLabel
                  label={item.name}
                  group={index === 0 ? props.data.group : null}
                  onSelect={() => onSelect(item)}
                  id={item.id}
                  isSelect={item.id === props.pickedData?.id}
                />
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default ListLabel;

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: colors.c_ffffff,
    height: "auto",
    borderRadius: 10,
  },
  listView: {},
  label: {
    marginTop: 10,
  },

  listLabel: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  checkbox: {},
  empty: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
