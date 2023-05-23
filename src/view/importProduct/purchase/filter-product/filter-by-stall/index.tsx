import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getIds } from "../../../../../common/utils";
import { CheckBox } from "../../../../../componets/CheckBoxCT";
import InputSearch from "../../../../../componets/InputSearch";
import { colors } from "../../../../../constants/colors";
import { TagType } from "../../../../../constants/type.interface";
import { translate } from "../../../../../locale";

interface IProps {
  name: string;
  data: TagType[];
  dataChecked: TagType[];
  onPassData: (name: string, data: TagType[]) => void;
  onSearch: (keyword: string) => void;
}
const FilterByStall = (props: IProps) => {
  const [keyword, setKeyword] = useState<string>();
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [idCheckeds, setIdCheckeds] = useState<string[]>(
    getIds(props.dataChecked)
  );
  const [checkeds, setCheckeds] = useState<TagType[]>(props.dataChecked);

  useEffect(() => {
    if (props.dataChecked?.[0]?.id === "-1") {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
    setIdCheckeds(getIds(props.dataChecked));
    setCheckeds(props.dataChecked);
  }, [props.dataChecked]);

  const isOnPress = () => {
    setCheckAll((prev) => !prev);
    if (!checkAll) {
      props.onPassData(props.name, [{ id: "-1", name: translate("all") }]);
    } else {
      setIdCheckeds([]);
      setCheckeds([]);
      props.onPassData(props.name, []);
    }
  };

  const isOnPressItem = (item: TagType) => {
    let newData = checkeds;
    const findIndex = newData?.findIndex((el: TagType) => el?.id === item?.id);
    if (findIndex > -1) {
      newData = newData?.filter((el: TagType) => ![item?.id].includes(el?.id));
    } else {
      newData = [...newData, item];
    }
    setIdCheckeds(getIds(newData));
    setCheckeds(newData);
    props.onPassData(props.name, newData);
  };

  const search = (e: string) => {
    setTimeout(() => props.onSearch(e), 100);
  };

  const handleSearch = (value: string) => {
    setKeyword(value);
    props.onSearch(value);
  };

  const onClearSearch = () => {
    if (keyword) {
      props.onSearch("");
      setKeyword("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewSearch}>
        <InputSearch
          value={keyword}
          viewInput={styles.inputSearch}
          onChangeText={handleSearch}
        />
        <TouchableOpacity onPress={onClearSearch} style={styles.viewClear}>
          <Text style={[styles.txtClear]}>{translate("delete")}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView nestedScrollEnabled={true} style={styles.containerList}>
        <View style={styles.containerAll}>
          {!!keyword ? null : (
            <CheckBox
              checked={checkAll}
              label={translate("all")}
              onPress={isOnPress}
              typeRadio={false}
              style={styles.checkLine}
            />
          )}
          <View style={[styles.containerItem, checkAll && { opacity: 0.5 }]}>
            {props.data.map((item, index) => (
              <CheckBox
                checked={
                  (checkAll ? true : idCheckeds.includes(item.id)) || false
                }
                label={item.name}
                onPress={() => isOnPressItem(item)}
                typeRadio={false}
                key={index}
                style={[styles.checkLine]}
                disable={checkAll}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    borderColor: "rgba(0, 0, 0, 0.12)",
    borderWidth: 1,
    borderRadius: 8,
    padding: 9,
  },
  containerList: {
    height: 200,
  },
  containerAll: {
    padding: 10,
  },
  containerItem: {
    // borderWidth: 1,
    // borderColor: colors.c_000000,
  },
  checkLine: { paddingVertical: 8 },
  viewSearch: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputSearch: {
    flex: 1,
    backgroundColor: colors.c_F3F3F3,
    borderWidth: 0,
  },
  viewClear: {
    paddingLeft: 12,
    height: 43,
    alignItems: "center",
    justifyContent: "center",
  },
  txtClear: { fontSize: 12, lineHeight: 18, color: colors.primary },
});
export default FilterByStall;
