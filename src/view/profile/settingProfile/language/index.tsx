import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { persistedStorage } from "../../../../common/storage";
import { CheckBox } from "../../../../componets/CheckBox";
import { colors } from "../../../../constants/colors";
import { translate } from "../../../../locale";
import { useAppDispatch } from "../../../../redux/hooks";
import {
  changeLanguage,
  selectProfile,
} from "../../../../redux/slice/Profile/profile";

const LanguagesSettingScreen = ({ ...props }) => {
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();
  const { loading } = useSelector(selectProfile);
  const [lang, setLang] = useState<string>("vi");
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const language = async () => {
    const value = await persistedStorage?.getItem("language");
    if (value) {
      setLang(value);
    }
  };
  useLayoutEffect(() => {
    language();
  }, []);

  const menus = [
    {
      label: translate("en"),
      name: "en",
    },
    {
      label: translate("vi"),
      name: "vi",
    },
  ];

  const onAction = (name: string, value: boolean) => {
    setLang(name);
    dispatch(changeLanguage({ language: name }));
    navigation.setOptions({
      headerTitle: name === "vi" ? "Ngôn ngữ" : "Language",
    });
  };

  return (
    <View style={styles.container}>
      {menus?.map((item) => {
        return (
          <View key={item?.label} style={styles.wrapItem}>
            <CheckBox
              typeRadio={true}
              checked={lang === item?.name}
              onPress={(value: boolean) => onAction(item?.name, value)}
              label={item?.label}
              styleLabel={styles.txtLabel}
              required={true}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.c_ffffff,
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  wrapItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.c_000_01,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  txtLabel: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.c_3A3A3C,
    flex: 1,
  },
});

export default LanguagesSettingScreen;
