import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";

import { Text } from "react-native";
import { colors } from "../../../../constants/colors";
import { icons } from "../../../../constants/icons";

interface Props {
  data: string[];
  setValue: (value: string) => void;
}
interface Props2 {
  item: string;
  index: number;
}
const Select: React.FC<Props> = ({ data, setValue }) => {
  const [show, setShow] = useState(false);
  const [selectedValue, setSelectedValue] = useState(data[0]);
  // const removeSelected = index => {
  //   const arr = listImage.filter(images => images != listImage[index]);
  //   setListImage(arr);
  // };

  const renderOption = (item: string, index: number) => {
    if (item != selectedValue) {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => {
            setSelectedValue(item), setShow(!show), setValue(item);
          }}
        >
          <View
            style={[
              styles.panel,
              {
                marginBottom: 0,
                borderRadius: 0,
                borderBottomLeftRadius: index == data.length - 1 ? 7 : 0,
                borderBottomRightRadius: index == data.length - 1 ? 7 : 0,
              },
            ]}
          >
            <Text style={styles.text}>{item}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShow(!show)}>
        <View
          style={[
            styles.panel,
            {
              borderBottomRightRadius: show ? 0 : 7,
              borderBottomLeftRadius: show ? 0 : 7,
            },
          ]}
        >
          <Text style={styles.text}>{selectedValue}</Text>

          <Image
            source={icons.ICON_ARROW_DOWN}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
      {show ? (
        <ScrollView style={{ flex: 1 }}>
          {data.map((item, index) => {
            return renderOption(item, index);
          })}
        </ScrollView>
      ) : (
        <></>
      )}
    </View>
  );
};
export default Select;
export const styles = StyleSheet.create({
  container: {},
  icon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  panel: {
    borderWidth: 1,
    borderColor: colors.c_D7D7D7,
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    paddingHorizontal: 16,
    height: 55,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  text: {
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 18,
    color: colors.c_48484A,
  },
});
