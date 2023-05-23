import AsyncStorage from "@react-native-async-storage/async-storage";
import { debounce, take } from "lodash";
import React, { useCallback, useState, useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { batch, useDispatch, useSelector } from "react-redux";
import InputSearch from "../../../../componets/InputSearch";
import SafeViewLayout from "../../../../componets/SafeViewLayout";
import { colors } from "../../../../constants/colors";
import {
  IconDownArrow,
  IconTimes,
  IconUpArrow,
} from "../../../../constants/icons";
import { translate } from "../../../../locale";
import { navigate } from "../../../../navigation/navigate";
import { ScreenNames } from "../../../../navigation/screen";
import { getCategory, selectHome } from "../../../../redux/slice/Home/home";
import {
  ProductFilter,
  RecentSearchText,
  resetSuggestion,
  SearchNamesByKeyword,
  selectProduct,
} from "../../../../redux/slice/Sales/product";
import { CategoryType } from "../../../../redux/type/Sales/category";

interface Props {
  value?: string;
  modalVisible: boolean;
  setIsModal: () => void;
}

export const ModalSearchText = (props: Props) => {
  const dispatch = useDispatch();
  const { suggestion, recentSearchText, loading, filters } =
    useSelector(selectProduct);

  const { listCategory } = useSelector(selectHome);
  const categories = listCategory || [];

  const [takeNumber, setTake] = useState<number>(5);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>(props.value || "");

  useEffect(() => {
    setKeyword(props.value || "");
    if (!props.value) {
      dispatch(resetSuggestion(""));
    }
  }, [props.value]);

  useEffect(() => {
    dispatch(RecentSearchText(""));
  }, [props.modalVisible]);

  useEffect(() => {
    dispatch(getCategory(""));
  }, []);

  const onDebounce = useCallback(
    debounce((txtKeyword: string) => {
      setIsSearch(true);
      const val = txtKeyword?.trim();
      if (val) {
        const dataStorage: string[] = [val].concat(recentSearchText);
        AsyncStorage.setItem("recentSearch", dataStorage?.join(","));
      }
      dispatch(SearchNamesByKeyword({ keyword: val }));
    }, 1000),
    []
  );

  const handleOnChangeText = (value: string) => {
    setIsSearch(false);
    setKeyword(value);
    onDebounce(value);
  };

  const onSubmitSearch = () => {
    const val = keyword?.trim();
    props.setIsModal();
    dispatch(ProductFilter({ ...filters, TextSearch: val }));
    navigate(
      ScreenNames.SearchCategory as never,
      {
        keyword: val,
      } as never
    );
  };

  const onTouchKeyword = async (txtKeyword: string, isDirect?: boolean) => {
    if (!isDirect) {
      const dataStorage: string[] = [txtKeyword].concat(recentSearchText);
      AsyncStorage.setItem("recentSearch", dataStorage?.join(","));
    }
    props.setIsModal();
    dispatch(ProductFilter({ ...filters, TextSearch: txtKeyword }));
    navigate(
      ScreenNames.SearchCategory as never,
      {
        keyword: txtKeyword,
      } as never
    );
  };

  const onCategory = (item: CategoryType) => {
    props.setIsModal();
    navigate(
      ScreenNames.SearchCategory as never,
      { id: item?.id, title: item?.name } as never
    );
  };

  const onClose = () => {
    if (keyword !== filters.TextSearch) {
      setKeyword(filters.TextSearch || "");
    }
    props.setIsModal();
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={props.modalVisible}
      onRequestClose={() => onClose()}
    >
      <TouchableWithoutFeedback
        style={styles.flex}
        onPress={() => Keyboard.dismiss()}
        accessible={false}
      >
        <SafeViewLayout>
          <View style={styles.header}>
            <InputSearch
              value={keyword}
              viewInput={styles.inputSearch}
              onChangeText={handleOnChangeText}
              onSubmitEditing={onSubmitSearch}
              isFocus={props.modalVisible}
              inputStyle={{ color: colors.c_7B7B80 }}
            />
            <TouchableOpacity
              onPress={() => onClose()}
              style={styles.buttonClose}
            >
              <IconTimes width={26} height={26} fill={colors.primary} />
            </TouchableOpacity>
          </View>
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="always"
          >
            {loading ? (
              <ActivityIndicator
                size="large"
                color={colors.primary}
                style={{ marginVertical: 25 }}
              />
            ) : suggestion && suggestion?.length > 0 && !!keyword ? (
              <View style={styles.wrapBox}>
                {take(suggestion, takeNumber)?.map(
                  (text: string, index: number) => (
                    <TouchableOpacity
                      key={text}
                      onPress={() => onTouchKeyword(text)}
                      style={[
                        styles.viewKeyword,
                        index === 0 && { borderTopColor: "transparent" },
                      ]}
                    >
                      <Text style={styles.txtKeyword}>{text}</Text>
                    </TouchableOpacity>
                  )
                )}
                {takeNumber < suggestion?.length ? (
                  <TouchableOpacity
                    onPress={() => setTake((prev) => prev + 5)}
                    style={[styles.viewKeyword, styles.viewMore]}
                  >
                    <Text style={[styles.txtKeyword, styles.txtViewMore]}>
                      {translate("show_more")}
                    </Text>
                    <IconDownArrow
                      width={11}
                      height={11}
                      fill={colors.primary}
                      stroke={colors.primary}
                      style={{ marginTop: 3 }}
                    />
                  </TouchableOpacity>
                ) : null}

                {takeNumber === suggestion?.length ? (
                  <TouchableOpacity
                    onPress={() => setTake(5)}
                    style={[styles.viewKeyword, styles.viewMore]}
                  >
                    <Text style={[styles.txtKeyword, styles.txtViewMore]}>
                      {translate("display_less")}
                    </Text>
                    <IconUpArrow
                      width={11}
                      height={11}
                      fill={colors.primary}
                      stroke={colors.primary}
                      style={{ marginTop: 3 }}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            ) : !!keyword && isSearch ? (
              <View style={styles.wrapBox}>
                <View
                  style={[
                    styles.viewKeyword,
                    { borderTopColor: "transparent" },
                  ]}
                >
                  <Text style={styles.txtKeyword}>
                    {translate("no_search")}
                  </Text>
                </View>
              </View>
            ) : null}
            {recentSearchText?.length > 0 ? (
              <View style={styles.wrapBox}>
                <View style={styles.viewHeadingBox}>
                  <Text style={[styles.txtKeyword, styles.txtHeadingBox]}>
                    {translate("recent_search")}
                  </Text>
                </View>
                {recentSearchText?.map((text: string, index: number) => (
                  <TouchableOpacity
                    key={text}
                    onPress={() => onTouchKeyword(text, true)}
                    style={[
                      styles.viewKeyword,
                      index === 0 && { borderTopColor: "transparent" },
                    ]}
                  >
                    <Text style={styles.txtKeyword}>{text}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : null}
            <View style={[styles.wrapBox, { borderColor: "transparent" }]}>
              <View style={[styles.viewHeadingBox, { marginBottom: 20 }]}>
                <Text style={[styles.txtKeyword, styles.txtHeadingBox]}>
                  {translate("category_title")}
                </Text>
              </View>
              <FlatList
                scrollEnabled={false}
                contentContainerStyle={{
                  alignSelf: "flex-start",
                }}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={categories}
                renderItem={({ item }: { item: CategoryType }) => (
                  <View style={styles.wrapCategoryItem}>
                    <TouchableOpacity
                      onPress={() => onCategory(item)}
                      style={styles.touchCategoryItem}
                    >
                      <Image
                        style={styles.categoryImage}
                        source={{
                          uri: item?.avatar,
                        }}
                        resizeMode="cover"
                      />
                      <View style={styles.viewCategoryTitle}>
                        <Text numberOfLines={3} style={styles.txtCategoryTitle}>
                          {item?.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          </ScrollView>
        </SafeViewLayout>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  buttonClose: {
    marginLeft: 5,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingLeft: 24,
    paddingRight: 14,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "700",
  },
  inputSearch: {
    flex: 1,
  },
  content: {},
  wrapBox: {
    borderBottomWidth: 6,
    borderBottomColor: colors.c_F3F3F3,
    paddingVertical: 15,
    // backgroundColor: "red",
  },
  viewKeyword: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.12)",
  },
  txtKeyword: {
    fontSize: 14,
    lineHeight: 18,
    color: colors.c_2D2D2D,
  },
  viewHeadingBox: {
    marginBottom: 10,
    paddingHorizontal: 24,
  },
  txtHeadingBox: {
    fontWeight: "700",
  },
  wrapCategoryItem: {
    width: Dimensions.get("window").width / 3,
    marginBottom: 20,
    paddingHorizontal: 24,
  },
  center: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  end: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  touchCategoryItem: {
    width: 76,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  categoryImage: {
    width: "100%",
    height: 76,
    marginBottom: 6,
    backgroundColor: colors.c_F3F3F3,
    borderRadius: 10,
  },
  viewCategoryTitle: {},
  txtCategoryTitle: {
    fontSize: 12,
    lineHeight: 16,
    color: "#2E2E2E",
    textAlign: "center",
  },
  viewMore: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 6,
  },
  txtViewMore: {
    color: colors.primary,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
    marginRight: 5,
  },
});
