import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ImageHeaderScrollView,
  TriggeringView,
} from "react-native-image-header-scroll-view";
import { DIMENSIONS } from "../../../common/utils";
import InputSearch from "../../../componets/InputSearch";
import { colors } from "../../../constants/colors";
import {
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  icons,
} from "../../../constants/icons";
import { translate } from "../../../locale";
import FilterProduct from "../../importProduct/purchase/filter-product";
import CardProductWare from "./CardProductWare";
import FilterWarehouse, { formatNumber } from "./filterModal";
import Tag from "../../../componets/Tag2";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  ProductFilter,
  selectProductWarehouse,
} from "../../../redux/slice/warehouses/products-warehouse";
import { TagType } from "../../../redux/type/warehouses/distributor-stock-inventory";
import { useIsFocused } from "@react-navigation/native";
export const MAX_PRICE = 5000000;
export const OVER_MAX_PRICE = 1000000000;
const AllProduct = ({ ...props }) => {
  const textSearch = props.route.params.textSearch;
  const idCategory = [props.route.params.id];
  const [tab, setTab] = useState<number>(4);
  const [type, setType] = useState<number>(0);
  const [valueSearch, setValueSearch] = useState("");
  const [finalTextSearch, setFinalTextSearch] = useState(textSearch);
  const [isFilter, setIsFilter] = useState(false);
  const isFocus = useIsFocused();
  const [listHeight, setListHeight] = useState(0);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  // const { filterProduct } = useAppSelector(selectProductWarehouse);

  const dispatch = useAppDispatch();
  const onHandleTab = (id: number) => {
    if (tab != id) {
      setTab(id);
      setType(0);
    } else {
      if (type == 0) {
        setType(1);
      } else setType(0);
    }
  };
  useEffect(() => {
    if (isFocus == true) {
      // dispatch(GetSummaryOrders({}));
      setLoadmore(false);
    }
  }, [isFocus]);
  const isCloseToBottom = (e: any) => {
    if (
      e.nativeEvent.contentOffset.y.toFixed(0) ===
      (listHeight - scrollViewHeight).toFixed(0)
    ) {
      // const next = skip + 10;
      setLoadmore(true);
    }
  };
  const [loadmore, setLoadmore] = useState(false);
  // const getValue = (data: TagType[], value: TagType) => {
  //   let newData = data;
  //   newData = newData?.filter((el: TagType) => el?.id !== value?.id);
  //   return newData;
  // };
  // const onChangeValueCategory = (value: TagType) => {
  //   const data = getValue(filterProduct?.ListCategoryId || [], value);
  //   dispatch(ProductFilter({ ...filterProduct, ListCategoryId: data }));
  //   getProducts({ ...filterProduct, ListCategoryId: data });
  // };

  // const onChangeValueSupplier = (value: TagType) => {
  //   const data = getValue(filters?.ListSupplierId || [], value);
  //   dispatch(ProductFilter({ ...filters, ListSupplierId: data }));
  //   getProducts({ ...filters, ListSupplierId: data });
  // };
  // const onChangePrice = () => {
  //   const params = omit(filters, ["ToPrice", "FromPrice"]);
  //   dispatch(ProductFilter(params));
  //   getProducts(params);
  // };
  const returnTab = (isFixed?: boolean) => {
    const ORDER_TABS = [
      {
        id: 4,
        label: translate("quantity"),
        image: "true",
        type: tab == 4 ? (type == 0 ? "up" : "down") : "up",
      },
      {
        id: 1,
        label: translate("price"),
        image: "true",
        type: tab == 1 ? (type == 0 ? "up" : "down") : "up",
      },
      {
        id: 2,
        label: tab == 2 ? (type == 0 ? "Tên A" : "Tên Z") : "Tên A",
        label2: tab == 2 ? (type == 0 ? "Z" : "A") : "Z",
        icon: "true",
      },
    ];

    return (
      <View
        style={[
          styles.wrapTab,
          isFixed && { paddingTop: 0, backgroundColor: "white" },
        ]}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollTab}
        >
          {ORDER_TABS?.map((t) => (
            <View style={tab === t.id && styles.txtActiveTabs}>
              <TouchableOpacity
                key={t.id}
                style={[styles.itemTab, tab === t.id && styles.activeTab]}
                onPress={() => onHandleTab(t.id)}
              >
                <Text
                  style={[styles.txtTab, tab === t.id && styles.txtActiveTab]}
                >
                  {t.label}
                  {t.image === "true" ? (
                    t.type === "up" ? (
                      <View
                        style={
                          {
                            // backgroundColor: "red",
                            // position: "absolute",
                            // top: 10,
                          }
                        }
                      >
                        <IconArrowUp
                          width={10}
                          height={10}
                          fill={colors.c_636366}
                        />
                      </View>
                    ) : (
                      // <Text>abcd</Text>
                      <View
                        style={
                          {
                            // backgroundColor: "red"
                          }
                        }
                      >
                        <IconArrowDown
                          width={10}
                          height={10}
                          fill={colors.c_636366}
                        />
                      </View>
                      // <Text>abc</Text>
                    )
                  ) : null}
                  {t.icon === "true" ? (
                    <View>
                      <IconArrowRight
                        width={10}
                        height={10}
                        fill={colors.c_636366}
                      />
                    </View>
                  ) : (
                    <></>
                  )}
                  {t.label2}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };
  useEffect(() => {
    setFinalTextSearch(textSearch);
    handleSearch(textSearch);
  }, [textSearch]);
  const handleSearch = (value: string) => {
    setValueSearch(value);
  };

  return (
    <View style={styles.conatiner}>
      <ImageHeaderScrollView
        style={{ backgroundColor: "white" }}
        maxHeight={120}
        minHeight={46}
        scrollViewBackgroundColor={"white"}
        renderForeground={() => (
          <View style={{ backgroundColor: "white" }}>
            <View style={styles.viewSearch}>
              <InputSearch
                viewInput={styles.viewInput}
                onChangeText={(e) => {
                  handleSearch(e);
                }}
                value={valueSearch}
                onEndEditing={() => setFinalTextSearch(valueSearch)}
              />
              <TouchableOpacity
                style={styles.buttonSort}
                onPress={() => setIsFilter(true)}
              >
                <Image
                  source={icons.ICON_SORT}
                  style={styles.imageSort}
                ></Image>
              </TouchableOpacity>
            </View>
            <View style={styles.viewKq}>
              {/* {filterProduct?.ListCategoryId?.filter(
                (el: any) => el.id !== "-1"
              )?.map((item: any) => (
                <Tag
                  label={item?.name}
                  isValue={true}
                  onSelect={() => onChangeValueCategory(item)}
                  numberOfLines={1}
                  styleText={styles.styleTag}
                />
              ))}
              {filterProduct?.ListSupplierId?.filter(
                (el: any) => el.id !== "-1"
              )?.map((item: any) => (
                <Tag
                  label={item?.name}
                  isValue={true}
                  onSelect={() => onChangeValueSupplier(item)}
                  numberOfLines={1}
                  styleText={styles.styleTag}
                />
              ))}

              {!!filterProduct?.ToPrice && !filterProduct?.FromPrice ? (
                <Tag
                  label={`<${formatNumber(filterProduct?.ToPrice || 0)}`}
                  isValue={true}
                  onSelect={() => onChangePrice()}
                />
              ) : null}

              {!!filterProduct?.FromPrice && !filterProduct?.ToPrice ? (
                <Tag
                  label={`>${formatNumber(filterProduct?.FromPrice || 0)}`}
                  isValue={true}
                  onSelect={() => onChangePrice()}
                />
              ) : null}

              {!!filterProduct?.FromPrice && !!filterProduct?.ToPrice ? (
                <>
                  {filterProduct?.FromPrice === MAX_PRICE &&
                  filterProduct?.ToPrice === OVER_MAX_PRICE ? (
                    <Tag
                      label={`>${formatNumber(filterProduct?.FromPrice || 0)}`}
                      isValue={true}
                      onSelect={() => onChangePrice()}
                    />
                  ) : (
                    <Tag
                      label={`${formatNumber(
                        filterProduct?.FromPrice || 0
                      )} - ${formatNumber(filterProduct?.ToPrice || 0)}`}
                      isValue={true}
                      onSelect={() => onChangePrice()}
                    />
                  )}
                </>
              ) : null} */}
              {/* <View style={styles.itemKq}>
                <Text style={styles.textKq}>{"<"} 3.000.000 </Text>
                <Image
                  style={styles.iconClose}
                  source={icons.ICON_CLOSE}
                ></Image>
              </View>
              <View style={styles.itemKq}>
                <Text style={styles.textKq}>Chăm sóc cá nhân</Text>
                <Image
                  style={styles.iconClose}
                  source={icons.ICON_CLOSE}
                ></Image>
              </View>
              <View style={styles.itemKq}>
                <Text style={styles.textKq}>Nước tăng lực</Text>
                <Image
                  style={styles.iconClose}
                  source={icons.ICON_CLOSE}
                ></Image>
              </View>
              <View style={styles.itemKq}>
                <Text style={styles.textKq}>Nước tăng lực nhé</Text>
                <Image
                  style={styles.iconClose}
                  source={icons.ICON_CLOSE}
                ></Image>
              </View> */}
            </View>
            {returnTab(true)}
          </View>
        )}
        renderFixedForeground={() => returnTab(true)}
        maxOverlayOpacity={2}
        minOverlayOpacity={1}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          isCloseToBottom(e);
        }}
        onContentSizeChange={(contentWidth, contentHeight) => {
          if (!loadmore) {
            setListHeight(contentHeight);
          }
        }}
        onLayout={(e) => {
          const { height } = e.nativeEvent.layout;
          if (!loadmore) {
            setScrollViewHeight(height);
          }
        }}
      >
        <TriggeringView onHide={() => console.log("text hidden")}>
          <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
            <CardProductWare
              sortField={tab}
              sortType={type}
              idCategory={idCategory}
              textSearch={finalTextSearch}
              loadmore={loadmore}
              setLoadmore={(e) => setLoadmore(e)}
            />
          </View>
        </TriggeringView>
      </ImageHeaderScrollView>
      <FilterWarehouse
        sortField={tab}
        sortType={type}
        modalVisible={isFilter}
        setIsModal={() => setIsFilter(!isFilter)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: colors.c_ffffff,
    paddingTop: 20,
  },
  viewSearch: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 24,
  },
  viewInput: {
    width: DIMENSIONS.width - 97,
  },
  buttonSort: {
    marginLeft: 6,
    padding: 14,
    borderRadius: 8,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderStyle: "solid",
    borderWidth: 1,
  },
  imageSort: {
    width: 16,
    height: 16,
  },
  viewKq: {
    flexDirection: "row",
    paddingVertical: 16,
    flexWrap: "wrap",
    paddingHorizontal: 24,
  },
  itemKq: {
    paddingVertical: 8.5,
    paddingLeft: 6,
    paddingRight: 10,
    borderRadius: 8,
    backgroundColor: "rgba(102, 116, 3, 0.1)",
    marginRight: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  textKq: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.c_667403,
  },
  iconClose: {
    width: 11,
    height: 11,
    marginLeft: 4,
  },
  wrapTab: {
    paddingHorizontal: 24,
    paddingVertical: 22,
    marginBottom: 10,
  },
  scrollTab: {},
  itemTab: {
    paddingBottom: 18,
    paddingHorizontal: 4,
    width: (DIMENSIONS.width - 48) / 3,
    borderBottomWidth: 2,
    borderBottomColor: colors.c_AEAEB2,
    borderStyle: "solid",
  },
  activeTab: {
    paddingBottom: 18,
    borderBottomWidth: 2,
    borderBottomColor: colors.c_667403,
    borderStyle: "solid",
    width: (DIMENSIONS.width - 48) / 3,
  },
  txtActiveTabs: {
    textAlign: "center",
  },
  txtTab: {
    position: "relative",
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "500",
    color: "#636366",
    textAlign: "center",

    // backgroundColor: "blue",
  },
  txtActiveTab: { color: colors.primary },
  mgt15: {
    marginTop: 15,
    paddingHorizontal: 24,
  },
  viewCards: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    marginTop: 30,
    marginBottom: 30,
    paddingBottom: 6,
  },
  itemCards: {
    paddingTop: 6,
  },
});

export default AllProduct;
