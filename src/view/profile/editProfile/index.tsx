import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Modal,
  ScrollView,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import Upload from "../../../componets/Upload";
import { colors } from "../../../constants/colors";

import { translate } from "../../../locale";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  selectProfile,
  GetDistributorInfo,
  ChangeInfo,
} from "../../../redux/slice/Profile/profile";
import ImagePicker from "react-native-image-crop-picker";
import { formatDate } from "../../../common/utils";
import ChangePassword from "./ChangePassword";
import ChangePhone from "./ChangePhone";
import ChangeEmail from "./ChangeEmail";
import { MEDIA } from "../../../constants/media";
import {
  IconAngleRight,
  IconCircle10,
  IconDateOfBirth,
  IconFileDocument,
  IconIdentityCard,
  IconLock,
  IconPencil,
  IconPhoneCall,
  IconPosition,
} from "../../../constants/icons";

const EditProfile = ({ ...props }) => {
  const dispatch = useAppDispatch();
  const { addressState, distributorInfo } = useSelector(selectProfile);
  const [logo, setLogo] = useState<any>(null);
  const [modalChangePass, setModalChangePass] = useState(false);
  const [modalChangePhone, setModalChangePhone] = useState(false);
  const [modalChangeEmail, SEtModalChangeEmail] = useState(false);

  useEffect(() => {
    dispatch(GetDistributorInfo(""));
  }, []);

  useEffect(() => {}, [distributorInfo]);
  useEffect(() => {
    setLogo(distributorInfo?.logo);
  }, [distributorInfo?.logo]);
  useEffect(() => {});
  const handleChoosePhoto = (value: string) => {
    if (value === "logo") {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
      })
        .then(async (image: any) => {
          const formData = new FormData();
          formData.append("logo", {
            uri: Platform.select({
              ios: `file://${image?.path}`,
              android: image?.path,
            }),
            type: image?.mime,
            name:
              image?.filename ||
              image?.path.split("/").pop() ||
              `logo_${image.modificationDate}`,
          });
          formData.append("phone", distributorInfo?.phone);
          formData.append("email", distributorInfo?.email);
          dispatch(ChangeInfo(formData));
          setLogo(image.path);
        })
        .catch(() => {
          setLogo(null);
        });
    }
  };
  const handlePreViewPhoto = (value: string) => {};

  return (
    <ScrollView
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        style={styles.avatar}
        onPress={() => handleChoosePhoto("logo")}
      >
        {logo ? (
          <Image
            source={{
              uri: logo || MEDIA.ICON_TICK,
            }}
            style={{ width: 225, height: 225, borderRadius: 225 }}
          />
        ) : (
          <View style={styles.viewTD}>
            <IconPencil width={22} height={22} stroke={colors.c_2982E2} />
            <Text style={styles.textTd}>{translate("tap_to_change")}</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.boxTitle}>
        <Text style={styles.txtTitle}>{translate("Hồ sơ công ty")}</Text>
      </View>

      <View style={styles.viewContentBorder}>
        <View style={styles.viewLeft}>
          <IconCircle10
            width={20}
            height={20}
            stroke={colors.primary}
            style={styles.icon}
          />
          <Text style={styles.textLeft}>Tên doanh nghiệp</Text>
        </View>
        <Text style={styles.textRight}>
          {distributorInfo?.name ? distributorInfo?.name : "Đang cập nhật"}
        </Text>
      </View>
      <View style={styles.viewContentBorder}>
        <View style={styles.viewLeft}>
          <IconFileDocument
            width={20}
            height={20}
            stroke={colors.primary}
            style={styles.icon}
          />
          <Text style={styles.textLeft}>Mã số thuế</Text>
        </View>
        <Text style={styles.textRight}>
          {distributorInfo?.taxCode
            ? distributorInfo?.taxCode
            : "Đang cập nhật"}
        </Text>
      </View>
      <View
        style={styles.contentDCBorder}
        // onPress={() => onDetailAddress()}
      >
        <View style={styles.viewContentDC}>
          <View style={styles.viewLeft}>
            <IconPosition
              width={20}
              height={20}
              stroke={colors.primary}
              style={styles.icon}
            />
            <Text style={styles.textLeft}>{translate("address")}</Text>
          </View>
          {/* <IconAngleRight width={15} height={15} stroke={colors.c_3A3A3C} /> */}
        </View>
        <Text style={styles.textRight}>
          {distributorInfo?.address !== null
            ? distributorInfo?.address
            : "Đang cập nhật"}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.viewContentBorder}
        onPress={() => setModalChangePhone(true)}
      >
        <View style={styles.viewLeft}>
          <IconPhoneCall
            width={20}
            height={20}
            stroke={colors.primary}
            style={styles.icon}
          />
          <Text style={styles.textLeft}>Điện thoại</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[styles.textRight, { paddingRight: 10 }]}>
            {distributorInfo?.phone ? distributorInfo?.phone : "Đang cập nhật"}
          </Text>
          <IconAngleRight width={15} height={15} stroke={colors.c_3A3A3C} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.viewContent}
        onPress={() => SEtModalChangeEmail(true)}
      >
        <View style={styles.viewLeft}>
          <IconPosition
            width={20}
            height={20}
            stroke={colors.primary}
            style={styles.icon}
          />
          <Text style={styles.textLeft}>Email</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[styles.textRights, { paddingRight: 10 }]}>
            {distributorInfo?.email ? distributorInfo?.email : "Thiết lập ngay"}
          </Text>
          <IconAngleRight width={15} height={15} stroke={colors.c_3A3A3C} />
        </View>
      </TouchableOpacity>

      <View style={styles.boxTitle}>
        <Text style={styles.txtTitle}>
          {translate("legal_representative_info")}
        </Text>
      </View>
      <View style={styles.contentDCBorder}>
        <View style={styles.viewContentDC}>
          <View style={styles.viewLeft}>
            <IconCircle10
              width={20}
              height={20}
              stroke={colors.primary}
              style={styles.icon}
            />
            <Text style={styles.textLeft}>
              {translate("legal_representative_name")}
            </Text>
          </View>
          {/* <IconAngleRight width={15} height={15} stroke={colors.c_3A3A3C} /> */}
        </View>
        <Text style={styles.textRight}>
          {distributorInfo?.legalRepresentativeName
            ? distributorInfo.legalRepresentativeName
            : "Đang cập nhật"}
        </Text>
      </View>
      <View style={styles.viewContentBorder}>
        <View style={styles.viewLeft}>
          <IconDateOfBirth
            width={20}
            height={20}
            stroke={colors.primary}
            style={styles.icon}
          />
          <Text style={styles.textLeft}>{translate("date_of_birth")}</Text>
        </View>
        <Text style={styles.textRight}>{formatDate(distributorInfo?.dob)}</Text>
      </View>
      <View style={styles.viewContentBorder}>
        <View style={styles.viewLeft}>
          <IconIdentityCard
            width={20}
            height={20}
            stroke={colors.primary}
            style={styles.icon}
          />
          <Text style={styles.textLeft}>CMT/CCCD</Text>
        </View>
        <Text style={styles.textRight}>
          {distributorInfo?.cardNumber
            ? distributorInfo.cardNumber
            : "Đang cập nhật"}
        </Text>
      </View>
      <View
        style={styles.contentDC}
        // onPress={() => onDetailAddress()}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: 11,
            paddingTop: 15,
          }}
        >
          <View style={styles.viewLeft}>
            <IconPosition
              width={20}
              height={20}
              stroke={colors.primary}
              style={styles.icon}
            />
            <Text style={styles.textLeft}>{translate("address")}</Text>
          </View>
          {/* <IconAngleRight width={15} height={15} stroke={colors.c_3A3A3C} /> */}
        </View>
        <Text style={styles.textRight}>
          {distributorInfo?.legalRepresentativeAddres
            ? distributorInfo.legalRepresentativeAddres
            : "Đang cập nhật"}
        </Text>
      </View>
      <View style={styles.boxTitle}>
        <Text style={styles.txtTitle}>
          {translate("Thông tin thương hiệu, sản phẩm kinh doanh")}
        </Text>
      </View>

      <View
        style={{
          borderBottomWidth: 1,
          marginHorizontal: 24,
          borderColor: colors.c_000_01,
          paddingBottom: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingBottom: 10,
            justifyContent: "space-between",
          }}
        >
          <View style={styles.viewLeft}>
            <IconPosition
              width={20}
              height={20}
              stroke={colors.primary}
              style={styles.icon}
            />
            <Text style={styles.textLeft}>
              {translate("Nhóm ngành nghề kinh doanh")}
            </Text>
          </View>
          {/* <IconAngleRight
            width={15}
            height={15}
            stroke={colors.c_3A3A3C}
            fill={colors.c_3A3A3C}
          /> */}
        </View>
        <Text style={styles.textRight}>Thiết bị điện tử gia dụng</Text>
      </View>

      <View style={styles.viewContentGP}>
        <View style={styles.viewLeft}>
          <IconFileDocument
            width={20}
            height={20}
            stroke={colors.primary}
            style={styles.icon}
          />
          <Text style={styles.textLeft}>
            {translate("Giấy phép kinh doanh")}
          </Text>
        </View>
        {/* <IconAngleRight width={15} height={15} stroke={colors.c_3A3A3C} /> */}
      </View>
      <View>
        <View style={styles.containerFrontImage}>
          <Upload
            label={translate("identify_card")}
            value="frontLicense"
            onChange={() => {}}
            onPreview={handlePreViewPhoto}
            onDelete={() => {}}
            data={distributorInfo?.frontLicense}
            sized="normal"
            imageText={translate("add_frontImage")}
            required={true}
            noTitle={true}
          />
          <Upload
            label={translate("identify_card")}
            value="backLicense"
            onChange={() => {}}
            onPreview={handlePreViewPhoto}
            onDelete={() => {}}
            data={distributorInfo?.backLicense}
            sized="normal"
            required={true}
            imageText={translate("add_behindImage")}
            noTitle={true}
          />
        </View>
        <View
          style={{
            padding: 10,
            backgroundColor: colors.c_F3F3F3,
            marginTop: 20,
            marginBottom: 10,
          }}
        ></View>
        <TouchableOpacity
          style={[styles.viewContentGP, { paddingBottom: 50 }]}
          onPress={() => setModalChangePass(true)}
        >
          <View style={styles.viewLeft}>
            <IconLock
              width={20}
              height={20}
              stroke={colors.primary}
              style={styles.icon}
            />
            <Text style={styles.textLeft}>
              {translate("Thay đổi mật khẩu")}
            </Text>
          </View>
          <IconAngleRight width={15} height={15} stroke={colors.c_3A3A3C} />
        </TouchableOpacity>
      </View>
      <ChangePassword
        openModal={modalChangePass}
        closeModal={() => setModalChangePass(false)}
      />
      <ChangePhone
        openModal={modalChangePhone}
        closeModal={() => setModalChangePhone(false)}
        data={distributorInfo}
      />
      <ChangeEmail
        openModal={modalChangeEmail}
        closeModal={() => SEtModalChangeEmail(false)}
        data={distributorInfo}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.c_ffffff,
  },
  avatar: {
    width: 225,
    height: 225,
    borderRadius: 225,
    borderWidth: 1,
    borderColor: colors.c_000_012,
    overflow: "hidden",
    backgroundColor: colors.c_blue,
    alignSelf: "center",
  },
  imgAvatar: {
    width: "100%",
    height: "100%",
  },
  viewTD: {
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 89,
  },
  textTd: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.primary,
    paddingTop: 10,
  },
  viewContent: {
    paddingTop: 15,
    paddingBottom: 11,
    marginHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    // borderBottomColor: colors.c_000_01,
    // borderBottomWidth: 1,
    textAlign: "center",
  },
  viewContentBorder: {
    paddingTop: 15,
    paddingBottom: 11,
    marginHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: colors.c_000_01,
    borderBottomWidth: 1,
    textAlign: "center",
  },
  viewLeft: {
    flexDirection: "row",
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  textLeft: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.c_3A3A3C,
  },
  textRight: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.c_3A3A3C,
  },
  contentDC: {
    // borderBottomColor: colors.c_000_01,
    // borderBottomWidth: 1,
    marginHorizontal: 24,
    // paddingTop: 15,
    paddingBottom: 11,
  },
  contentDCBorder: {
    borderBottomColor: colors.c_000_01,
    borderBottomWidth: 1,
    marginHorizontal: 24,
    paddingTop: 15,
    paddingBottom: 11,
  },
  viewContentDC: {
    // paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 11,
  },
  textRights: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.c_007AFF,
  },
  viewContentGP: {
    paddingTop: 15,
    paddingBottom: 11,
    marginHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
  },
  containerFrontImage: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginHorizontal: 24,
  },
  containerFrontImages: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  mgbt: {
    marginBottom: 20,
  },
  labelFrontImage: {
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 20,
    color: colors.c_7B7B80,
  },
  textRequire: {
    color: colors.light_red,
  },
  viewFrontImage: {
    flexDirection: "row",
  },
  boxTitle: {
    // marginBottom: 20,
    backgroundColor: colors.c_F3F3F3,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginVertical: 24,
  },
  txtTitle: {
    lineHeight: 14,
    fontSize: 12,
    fontWeight: "600",
    color: colors.c_3A3A3C,
  },
});

export default EditProfile;
