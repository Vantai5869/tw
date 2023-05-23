import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { DIMENSIONS } from "../../../common/utils";
import InputSearch from "../../../componets/InputSearch";
import { colors } from "../../../constants/colors";
import { icons } from "../../../constants/icons";
import CardProductWare from "../allProduct/CardProductWare";
import FilterWarehouse from "../allProduct/filterModal";

const Products = ({ ...props }) => {
  const filterType = props.route.params.filter;
  const [finalTextSearch, setFinalTextSearch] = useState("");
  const [loadmore, setLoadmore] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const handleSearch = (value: string) => {
    setValueSearch(value);
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
          <Image source={icons.ICON_SORT} style={styles.imageSort}></Image>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.c_ffffff,
          marginTop: 16,
          borderTopWidth: 1,
          borderColor: "rgba(0, 0, 0, 0.1)",
          marginHorizontal: -24,
          marginBottom: 16,
        }}
      >
        <CardProductWare
          filterType={filterType}
          textSearch={finalTextSearch}
          //   sortField={1}
          //   sortType={1}
          // idCategory={idCategory}
          loadmore={loadmore}
          setLoadmore={(e) => setLoadmore(e)}
        />
      </View>
      <FilterWarehouse
        filter={filterType}
        modalVisible={isFilter}
        setIsModal={() => setIsFilter(!isFilter)}
      />
    </ScrollView>
  );
};
export default Products;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.c_ffffff,
    paddingTop: 20,
    paddingHorizontal: 24,
  },
  viewSearch: {
    flexDirection: "row",
    width: "100%",
    // paddingHorizontal: 24,
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
  viewInput: {
    width: DIMENSIONS.width - 97,
  },
});
