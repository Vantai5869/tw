import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  selectProfile,
  GetProvince,
  GetDistrict,
  GetWard,
  resetSuggestLocation,
  GetAddressByCoords,
  GetDirectLocationByText,
} from "../../../../redux/slice/Profile/profile";
import ListLabel from "../../../../componets/ListLabel";
import { colors } from "../../../../constants/colors";
import { IconPosition } from "../../../../constants/icons";
import i18n, { translate } from "../../../../locale";
import Input from "../../../../componets/Input";
import Button from "../../../../componets/Button";
import { useDispatch, useSelector } from "react-redux";
import { addressDetail } from "../../../../redux/slice/Profile/profile";
import { ScreenNames } from "../../../../navigation/screen";
import ButtonCT from "../../../../componets/ButtonCT";
import axios from "axios";
import SearchLocation from "./searchLocation";
import CurrentPosition from "./currentLocation";
import Geolocation from "@react-native-community/geolocation";
import ButtonBoder from "../../../../componets/ButtonBoderCT";
import Arlets from "../../../../componets/Alerts";
import { stringify } from "qs";

const AddressSelectRegister = ({ ...props }) => {
  const dispatch = useDispatch();

  const {
    addressState,
    provinces,
    districts,
    wards,
    suggestLocation,
    directLocationByKeyWord,
  } = useSelector(selectProfile);
  const initProvince = {
    id: null,
    name: null,
    code: null,
    parentId: null,
    level: null,
    type: null,
  };
  const initDistrict = {
    id: null,
    name: null,
    code: null,
    parentId: null,
    level: null,
    type: null,
  };
  const initWard = {
    id: null,
    name: null,
    code: null,
    parentId: null,
    level: null,
    type: null,
  };
  const initAdress = {
    name: null,
    latitude: null,
    longitude: null,
  };
  const [province, setProvince] = useState(initProvince);
  const [listProvince, setListProvince] = useState(null);
  const [district, setDistrict] = useState(initDistrict);
  const [listDistrict, setListDistrict] = useState(null);
  const [ward, setWard] = useState(initWard);
  const [listWard, setListWard] = useState(null);
  const [provinceSelected, setProvinceSelected] = useState(false);
  const [districtSelected, setDistrictSelected] = useState(false);
  const [wardSelected, setWardSelected] = useState(false);
  const [isEdit, setIsEdit] = useState(addressState?.isEdit);
  const [address, setAddress] = useState(initAdress);
  const [openModalSuggestion, setModalSuggestion] = useState(false);
  const [openModalSearch, setModalSearch] = useState(false);
  const [longitude, setLongitude] = useState<any>(null);
  const [latitude, setLatitude] = useState<any>(null);
  const [notFullData, setNotFullData] = useState<any>(false);

  useEffect(() => {
    dispatch(GetProvince(""));
  }, []);
  const getLocation = () => {
    Geolocation.getCurrentPosition((info) => {
      setLatitude(info.coords.latitude), setLongitude(info.coords.longitude);
    });
  };
  useEffect(() => {
    if (suggestLocation.length > 0) {
      setProvince({
        id: suggestLocation[0].provinceId,
        name: suggestLocation[0].province,
      });
      setDistrict({
        id: suggestLocation[0].districtId,
        name: suggestLocation[0].district,
        parentId: suggestLocation[0].provinceId,
      });
      setWard({
        id: suggestLocation[0].wardId,
        name: suggestLocation[0].ward,
        parentId: suggestLocation[0].districtId,
      });
      setAddress({
        name: suggestLocation[0].address,
        latitude: suggestLocation[0].point.latitude,
        longitude: suggestLocation[0].point.longtitude,
      });
      dispatch(resetSuggestLocation(null));
      setLongitude(null);
      setLatitude(null);
    } else {
      setModalSuggestion(false);
    }
  }, [suggestLocation]);
  useEffect(() => {
    setAddress({
      ...address,
      longitude: directLocationByKeyWord[0]?.point.longtitude,
      latitude: directLocationByKeyWord[0]?.point.lattitude,
    });
  }, [directLocationByKeyWord]);

  useEffect(() => {
    dispatch(resetSuggestLocation(null));
  }, []);

  useEffect(() => {
    if (longitude && latitude) {
      dispatch(
        GetAddressByCoords({ longtitude: longitude, lattitude: latitude })
      );
    }
  }, [longitude, latitude]);
  useEffect(() => {
    if (provinces) {
      let data = provinces?.reduce((r: any, e: any) => {
        let group = e?.name[0];
        if (!r[group]) r[group] = { group, data: [e] };
        else r[group].data.push(e);
        return r;
      }, {});

      let result = Object.values(data);
      setListProvince(result as any);
    }
  }, [provinces]);

  useEffect(() => {
    if (districts) {
      let data = districts?.reduce((r: any, e: any) => {
        let group = e.name[0];
        if (!r[group]) r[group] = { group, data: [e] };
        else r[group].data.push(e);
        return r;
      }, {});
      let result = Object.values(data);
      setListDistrict(result as any);
    }
  }, [districts]);

  useEffect(() => {
    if (wards) {
      let data = wards?.reduce((r: any, e: any) => {
        let group = e.name[0];
        if (!r[group]) r[group] = { group, data: [e] };
        else r[group].data.push(e);
        return r;
      }, {});

      let result = Object.values(data);
      setListWard(result as any);
    }
  }, [wards]);
  const selectedAddress = (item: any) => {
    setProvince({ id: item.provinceId, name: item.province });
    setDistrict({
      id: item.districtId,
      name: item.district,
      parentId: item.provinceId,
    });
    setWard({ id: item.wardId, name: item.ward, parentId: item.districtId });
    setAddress({
      name: item.address,
      latitude: item.point.latitude,
      longitude: item.point.longtitude,
    });
    setModalSuggestion(false);
    setModalSearch(false);
    dispatch(resetSuggestLocation(null));
    setLongitude(null);
    setLatitude(null);
  };
  const selectByInput = (item: any) => {
    setModalSearch(false);
    setAddress({ name: item, latitude: null, longitude: null });
    // chua co thong tin
  };
  useEffect(() => {
    setProvince(addressState?.pickedProvince);
    setDistrict(addressState?.pickedDistrict);
    setWard(addressState?.pickedWard);
    setAddress(addressState?.detailAddress);
    // setIsEdit(addressState?.isEdit);
  }, [addressState]);

  useEffect(() => {
    if (!province?.id) {
      setProvinceSelected(false);
      setDistrictSelected(false);
      setWardSelected(false);
    }
    if (province?.id && !district?.id) {
      dispatch(GetDistrict(province?.id));
      setProvinceSelected(false);
      setDistrictSelected(true);
      setWardSelected(false);
    }
    if (province?.id && district?.id) {
      dispatch(GetDistrict(province?.id));
      setProvinceSelected(false);
      setDistrictSelected(false);
      setWardSelected(false);
    }
    if (province?.id && district?.id && !ward?.id) {
      dispatch(GetWard(district?.id));
      setProvinceSelected(false);
      setDistrictSelected(false);
      setWardSelected(true);
    }
    if (province?.id && district?.id && ward?.id) {
      dispatch(GetWard(district?.id));
      setProvinceSelected(false);
      setDistrictSelected(false);
      setWardSelected(false);
    }
    if (
      province?.id &&
      district?.id &&
      ward?.id &&
      address?.name &&
      !address?.latitude
    ) {
      dispatch(
        GetDirectLocationByText({
          search: `${address?.name} ${ward.name} ${district.name} ${province.name}`,
        })
      );
      setProvinceSelected(false);
      setDistrictSelected(false);
      setWardSelected(false);
      // setshowDetailAddress(true);
    }
  }, [province, district, ward, address]);
  const pickDataProvince = (item: any) => {
    setProvince(item);
    setDistrict(initDistrict);
    setWard(initWard);
    setProvinceSelected(false);
    setDistrictSelected(true);
    dispatch(GetDistrict(item.id));
  };
  const pickDataDistrict = (item: any) => {
    setDistrict(item);
    setWard(initWard);
    setWardSelected(true);
    setDistrictSelected(false);
    dispatch(GetWard(item.id));
  };
  const pickDataWard = (item: any) => {
    setWard(item);
    setWardSelected(false);
  };
  const touchProvince = () => {
    if (provinceSelected) {
      setProvinceSelected(false);
    } else {
      setProvinceSelected(true);
    }
    setDistrictSelected(false);
    setWardSelected(false);
  };
  const touchDistrict = () => {
    if (province.id) {
      if (districtSelected) {
        setDistrictSelected(false);
      } else {
        setDistrictSelected(true);
      }
      setProvinceSelected(false);
      setWardSelected(false);
    }
  };
  const touchWard = () => {
    if (district.id) {
      if (wardSelected) {
        setWardSelected(false);
      } else {
        setWardSelected(true);
      }
      setProvinceSelected(false);
      setDistrictSelected(false);
    }
  };

  const searchLocation = async (value: any) => {
    setModalSearch(true);
  };

  const onSubmit = () => {
    if (isEdit) {
      props.navigation.navigate(ScreenNames.EditAddress);
      dispatch(
        addressDetail({
          pickedProvince: province,
          pickedDistrict: district,
          pickedWard: ward,
          detailAddress: address,
          isEdit: true,
        })
      );
    } else {
      props.navigation.navigate(ScreenNames.CreateNewAddress);
      dispatch(
        addressDetail({
          pickedProvince: province,
          pickedDistrict: district,
          pickedWard: ward,
          detailAddress: address,
        })
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 8 }}>
          <TouchableOpacity
            style={styles.touchPosition}
            onPress={() => getLocation()}
          >
            <IconPosition
              width={18}
              height={22}
              stroke={colors.primary}
              fill={colors.primary}
            />
            <Text style={styles.textPosition}>
              {translate("current_position")}
            </Text>
          </TouchableOpacity>
          <View>
            {/* {showDetailAddress ? ( */}
            <View style={styles.formItem}>
              <Text style={styles.textTitle}>Địa chỉ cụ thể</Text>
              <TouchableOpacity
                style={{
                  height: 50,
                  borderWidth: 1,
                  borderRadius: 10,
                  justifyContent: "center",
                  paddingHorizontal: 10,
                  borderColor: colors.c_000_012,
                  marginTop: 10,
                }}
                onPress={searchLocation}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "400", lineHeight: 16 }}
                >
                  {address?.name
                    ? address?.name
                    : "Nhập tên đường, tòa nhà, số nhà"}
                </Text>
              </TouchableOpacity>
            </View>
            {/* ) : null} */}
            {province?.id ? (
              <TouchableOpacity
                style={styles.viewContentSelect}
                onPress={touchProvince}
              >
                <Text
                  style={
                    provinceSelected ? styles.textTitlePick : styles.textTitle
                  }
                >
                  {translate("province")}
                </Text>
                <Text
                  style={
                    provinceSelected
                      ? styles.textContentPick
                      : styles.textContent
                  }
                >
                  {province?.name}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.viewContentSelect}
                onPress={touchProvince}
              >
                <Text
                  style={
                    provinceSelected ? styles.textTitlePick : styles.textTitle
                  }
                >
                  {translate("province")}
                </Text>
              </TouchableOpacity>
            )}
            {district?.id ? (
              <TouchableOpacity
                style={styles.viewContentSelect}
                onPress={touchDistrict}
              >
                <Text
                  style={
                    districtSelected ? styles.textTitlePick : styles.textTitle
                  }
                >
                  {translate("district")}
                </Text>
                <Text
                  style={
                    districtSelected
                      ? styles.textContentPick
                      : styles.textContent
                  }
                >
                  {district?.name}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.viewContentSelect}
                onPress={touchDistrict}
              >
                <Text
                  style={
                    districtSelected ? styles.textTitlePick : styles.textTitle
                  }
                >
                  {translate("district")}
                </Text>
              </TouchableOpacity>
            )}
            {ward?.id ? (
              <TouchableOpacity
                style={styles.viewContentSelect}
                onPress={touchWard}
              >
                <Text
                  style={wardSelected ? styles.textTitlePick : styles.textTitle}
                >
                  {translate("ward")}
                </Text>
                <Text
                  style={
                    wardSelected ? styles.textContentPick : styles.textContent
                  }
                >
                  {ward?.name}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.viewContentSelect}
                onPress={touchWard}
              >
                <Text
                  style={wardSelected ? styles.textTitlePick : styles.textTitle}
                >
                  {translate("ward")}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {provinceSelected ? (
            <View style={styles.containerPick}>
              <View style={styles.boxTitle}>
                <Text style={styles.txtTitle}>{translate("province")}</Text>
              </View>
              <FlatList
                style={{ flex: 1 }}
                data={listProvince}
                renderItem={({ item }) => (
                  <ListLabel
                    data={item}
                    onChange={pickDataProvince}
                    pickedData={province}
                  />
                )}
              />
            </View>
          ) : districtSelected ? (
            <View style={styles.containerPick}>
              <View style={styles.boxTitle}>
                <Text style={styles.txtTitle}>{translate("district")}</Text>
              </View>
              <FlatList
                style={{ flex: 1 }}
                data={listDistrict}
                renderItem={({ item }) => (
                  <View>
                    <ListLabel
                      data={item}
                      onChange={pickDataDistrict}
                      pickedData={district}
                    />
                  </View>
                )}
              />
            </View>
          ) : wardSelected ? (
            <View style={styles.containerPick}>
              <View style={styles.boxTitle}>
                <Text style={styles.txtTitle}>{translate("ward")}</Text>
              </View>
              <FlatList
                style={{ flex: 1 }}
                data={listWard}
                renderItem={({ item }) => (
                  <View>
                    <ListLabel
                      data={item}
                      onChange={pickDataWard}
                      pickedData={ward}
                    />
                  </View>
                )}
              />
            </View>
          ) : null}
        </View>

        <View style={styles.wrapBtn}>
          {province?.id &&
          district?.id &&
          ward?.id &&
          address?.name &&
          address?.latitude ? (
            <ButtonCT
              textButton={i18n.t("accept_address")}
              onPress={onSubmit}
              styleBackground={[styles.btnBg]}
              styleText={styles.btnText}
              style={{ paddingVertical: 14 }}
            />
          ) : (
            <ButtonBoder
              onPress={() => setNotFullData(true)}
              textButton={translate("continue")}
              style={{ borderColor: colors.primary }}
              styleText={{ color: colors.primary }}
            />
          )}
        </View>
        <Arlets
          modalVisible={notFullData}
          content={translate("please_select_all_address")}
          confirm={() => setNotFullData(false)}
        />
        <CurrentPosition
          openModal={openModalSuggestion}
          closeModal={() => {
            setModalSuggestion(false), setLatitude(null), setLongitude(null);
          }}
          selectAddress={(item) => selectedAddress(item)}
        />
        <SearchLocation
          openModal={openModalSearch}
          closeModal={() => setModalSearch(false)}
          selectAddress={(item) => selectedAddress(item)}
          value={address?.name}
          selectByInput={(item) => selectByInput(item)}
          onDeleteData={() => setAddress({ name: null })}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.c_ffffff,
  },
  boxTitle: {
    backgroundColor: colors.c_F3F3F3,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  touchPosition: {
    marginVertical: 24,
    marginHorizontal: 24,
    flexDirection: "row",
    borderWidth: 1,
    height: 51,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor: colors.primary,
  },
  textPosition: {
    paddingLeft: 6,
    color: colors.primary,
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 22,
  },
  txtTitle: {
    lineHeight: 14,
    fontSize: 12,
    fontWeight: "600",
    color: colors.c_3A3A3C,
  },
  textContent: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: colors.c_48484A,
  },
  textContentPick: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: colors.primary,
  },
  textTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    color: colors.c_7B7B80,
    // paddingBottom: 10,
  },
  textTitlePick: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    color: colors.primary,
    // paddingBottom: 10,
  },
  viewContentSelect: {
    marginVertical: 9,
    paddingHorizontal: 24,
  },
  viewContentNoSelect: {
    // marginVertical: 9,
    paddingHorizontal: 24,
  },
  formItem: {
    marginVertical: 10,
    paddingHorizontal: 24,
  },
  wrapBtn: {
    paddingHorizontal: 24,
    flex: 1,
  },
  btnBg: {
    backgroundColor: colors.primary,
  },
  btnText: {
    lineHeight: 22,
    fontSize: 16,
    fontWeight: "500",
    color: colors.c_ffffff,
  },
  resultItem: {
    width: "100%",
    justifyContent: "center",
    height: 40,
    borderBottomColor: colors.c_C7C7CC,
    borderBottomWidth: 1,
    paddingLeft: 15,
  },
  searchResultsContainer: {
    width: "100%",
    height: 200,
    backgroundColor: colors.c_ffffff,
    position: "absolute",
    top: "54%",
    zIndex: 2,
    borderColor: colors.c_000000,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
  },
  containerPick: {
    flex: 1,
  },
});
export default AddressSelectRegister;
