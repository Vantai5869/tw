import moment from "moment";
import React, { useState, useEffect, createRef } from "react";
import RenderHtml from "react-native-render-html";
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { DIMENSIONS, formatNumber, numFormatter } from "../common/utils";
import { colors } from "../constants/colors";
import {
  IconAngleRight,
  IconArrowRight,
  IconCWarning,
  IconPen,
  IconShoppingBag,
  IconShoppingCarts,
  IconStar,
} from "../constants/icons";
import { MEDIA } from "../constants/media";
import i18n, { translate } from "../locale";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import httpService from "../redux/service/httpService";
import {
  ProductDetail,
  selectProduct,
  GetQuantityProduct,
  GetQuantity,
  UpdateQuanity,
  resetUpdateStatus,
} from "../redux/slice/Sales/product";
import { selectHome } from "../redux/slice/Home/home";
import { RootState } from "../redux/store";
import ButtonBoder from "./ButtonBoderCT";
import ResilientAutoheightWebView from "./ResilientAutoheightWebView";
import { RatingStar } from "./RatingStar";
import { navigate } from "../navigation/navigate";
import { ScreenNames } from "../navigation/screen";
import ButtonCT from "../componets/ButtonCT";
import Arlets from "./Alerts";
import { getReadyProduct, onBuyNow } from "../view/cart/components/utils";
import { QUANTITY } from "../constants/untils";
import {
  AddDistributorCart,
  handleProductId,
  resetCartState,
  selectDistributorCart,
} from "../redux/slice/Cart/distributor-cart";
import Alerts from "./Alerts";
import Video from "react-native-video";
import MediaControls, { PLAYER_STATES } from "react-native-media-controls";
import { WebView } from "react-native-webview";
// import { GetQuantity } from "../redux/slice/warehouses/products-warehouse";

const { width } = Dimensions.get("window");
const height = 350;

const ProductDetails = (props: any) => {
  const dispatch = useAppDispatch();
  //   const { product } = useSelector((state: RootState) => state.productReducer);
  const {
    product,
    quantities,
    getQuantityStatus,
    loadQuantity,
    lastModificationTime,
    updateStatus,
  } = useSelector(selectProduct);
  const { listUserInfor } = useSelector(selectHome);
  const [active, setActive] = useState<boolean>(false);
  const [outOfStock, setOutOfStock] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const videoRef = createRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [linkVideo, setLinkVideo] = useState("");
  const [paused, setPaused] = useState(false);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [actives, setActives] = useState<number>(0);
  const [editting, setEditting] = useState<boolean>(false);
  const [textValue, setTextValue] = useState("0");

  useEffect(() => {
    dispatch(ProductDetail(props.route.params.id));
  }, []);
  const setQuantity = (quantity: number) => {
    setTextValue(quantity.toString());
  };
  useEffect(() => {
    if (getQuantityStatus) {
      return setQuantity(getQuantityStatus);
    } else {
      setQuantity(0);
    }
  }, [getQuantityStatus, loadQuantity]);
  useEffect(() => {
    if (updateStatus === true) {
      setEditting(false);
      dispatch(resetUpdateStatus());
    }
  }, [updateStatus]);
  const handleUpdate = (id: string, quantity?: string, type?: string) => {
    dispatch(
      UpdateQuanity({
        id: id,
        quantity: quantity,
        lastModificationTime: lastModificationTime,
      })
    );
  };
  const onAddToCart = () => {
    if (!getReadyProduct(product)) {
      setOutOfStock(true);
      return false;
    }
    setActive(true);
    dispatch(handleProductId(product.id));
    dispatch(
      AddDistributorCart({
        productId: product.id,
        quantity: QUANTITY,
      })
    );
  };
  const buyNow = () => {
    if (!getReadyProduct(product)) {
      setOutOfStock(true);
      return false;
    }
    onBuyNow(product);
  };
  const onConfirmAlert = () => {
    setActive(false);
    dispatch(resetCartState(""));
  };
  const handleChangeText = (e: string, quantity: number) => {
    if (Number(e) > quantity) {
      setTextValue(quantity.toString());
    } else setTextValue(e);
  };
  const dataImage = product?.image?.map((item: any, key: any) => {
    const obj = {
      type: "",
      link: "",
    };
    obj.type = "image";
    obj.link = item;
    return obj;
  });
  const dataVideo = product?.attachment?.map((item: any, key: any) => {
    const obj = {
      type: "",
      link: "",
    };
    obj.type = "video";
    obj.link = item;
    return obj;
  });
  const dataMedia = dataImage && dataVideo ? dataImage.concat(dataVideo) : [];
  const onSeek = (seek: any) => {
    // Handler for change in seekbar
    videoRef?.current?.seek(seek);
  };
  const onPaused = (playerState: any) => {
    // Handler for Video Pause
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    // Handler for Replay
    videoRef?.current?.seek(0);
    if (Platform.OS === "android") {
      setPlayerState(PLAYER_STATES.PAUSED);
      setPaused(true);
    } else {
      setPlayerState(PLAYER_STATES.PLAYING);
      setPaused(false);
    }
  };
  const onProgress = (data: any) => {
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data: any) => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = (data: any) => {
    setIsLoading(true);
  };

  const onEnd = () => {
    setPlayerState(PLAYER_STATES.ENDED);
    setCurrentTime(0);
  };
  const onSeeking = (currentTime: any) => {
    setCurrentTime(currentTime);
    setPlayerState(PLAYER_STATES.PLAYING);
  };
  const onScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== actives && slide < dataMedia?.length) {
      setActives(slide);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.c_ffffff }}>
      <ScrollView
        style={styles.container}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.viewImgae}>
          <ScrollView
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            horizontal
            onScroll={onScroll}
            scrollEventThrottle={dataMedia ? dataMedia?.length - 1 : 0}
            style={[styles.wrapSlide]}
          >
            {dataMedia &&
              dataMedia?.map((item: any, index: any) =>
                item?.type === "video" ? (
                  <View style={styles.image}>
                    <Video
                      onEnd={onEnd}
                      onLoad={onLoad}
                      onLoadStart={onLoadStart}
                      onProgress={onProgress}
                      paused={paused}
                      ref={videoRef}
                      resizeMode="contain"
                      source={{ uri: item.link }}
                      style={styles.videoIOS}
                    />
                    <MediaControls
                      duration={duration}
                      isLoading={isLoading}
                      mainColor="#333"
                      onPaused={onPaused}
                      onReplay={onReplay}
                      onSeek={onSeek}
                      onSeeking={onSeeking}
                      playerState={playerState}
                      progress={currentTime}
                      showOnStart
                    />
                  </View>
                ) : (
                  <Image
                    key={index}
                    source={{ uri: item.link }}
                    style={[styles.image]}
                    resizeMode="cover"
                  />
                )
              )}
          </ScrollView>
          {dataMedia && dataMedia?.length > 0 ? (
            <View style={styles.viewDot}>
              <Text style={styles.txtDot}>
                {actives + 1 + "/" + dataMedia?.length}
              </Text>
            </View>
          ) : null}
        </View>
        <Text style={styles.textProduct1}>{product?.name}</Text>
        <View
          style={{
            height: 6,
            backgroundColor: colors.c_f9f9f9,
            marginVertical: 20,
          }}
        ></View>
        <View style={styles.viewEvaluate}>
          <IconStar width={20} height={20} stroke={colors.c_667403} />
          <Text style={styles.textEval}> {translate("customer_reviews")}</Text>
        </View>
        <View style={[styles.viewStar]}>
          <View style={styles.boxStar}>
            <RatingStar
              ratingAvg={product?.customerRating?.ratingAvg || 0}
              starStyle={styles.iconBox}
            />
            <Text style={styles.txtSold}>
              {product?.customerRating?.ratingAvg.toFixed(2) || 0}/5 (
              {numFormatter(product?.customerRating?.totalRate || 0)}{" "}
              {translate("review")})
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigate(
                ScreenNames.ProductRatingScreen as never,
                {
                  image: product?.image?.[0],
                  productId: product?.id,
                  type: "product_review",
                } as never
              )
            }
            style={styles.viewAll}
          >
            <Text style={styles.textAll}>{translate("view_all")}</Text>
            <IconAngleRight width={15} height={15} fill={colors.c_007AFF} />
          </TouchableOpacity>
        </View>
        {product?.stockInventory ? (
          <View
            style={{
              height: 6,
              backgroundColor: colors.c_f9f9f9,
              marginVertical: 20,
            }}
          ></View>
        ) : (
          <></>
        )}

        {product?.stockInventory ? (
          <View>
            <View style={styles.titleDetalis}>
              <IconCWarning width={20} height={20} />
              <Text style={styles.textDetails}>{translate("warehouse")}</Text>
            </View>
            <View>
              <View style={styles.containerQuantity}>
                <Text style={styles.textQuantity}>Số lượng đã nhập</Text>
                <Text style={styles.textQuantity}>
                  {product?.totalQuantity}
                </Text>
              </View>
              <View style={styles.containerQuantity}>
                <Text style={styles.textQuantity}>Số lượng đã bán online</Text>
                <Text style={styles.textQuantity}>{product?.soldQuantity}</Text>
              </View>
              <View style={styles.containerQuantity}>
                <Text style={styles.textQuantity}>Số lượng tồn kho</Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  {loadQuantity ? (
                    <ActivityIndicator
                      size="large"
                      color={colors.primary}
                      style={[
                        styles.pen,
                        {
                          width: 14,
                          height: 14,
                          backgroundColor: "transparent",
                        },
                      ]}
                    />
                  ) : !editting ? (
                    <>
                      <Text style={styles.textQuantity}>
                        {product?.stockInventory?.quantity}
                      </Text>
                      <TouchableOpacity
                        style={{
                          width: 22,
                          height: 22,
                          backgroundColor: colors.c_secondary,
                          justifyContent: "center",
                          borderRadius: 2,
                          alignItems: "center",
                          marginLeft: 10,
                        }}
                        onPress={() => {
                          dispatch(GetQuantity(product.stockInventory.id));
                          setEditting(true);
                        }}
                      >
                        <IconPen stroke={colors.primary} />
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <TextInput
                        scrollEnabled
                        style={styles.editQuantity}
                        value={textValue}
                        keyboardType="numeric"
                        onChangeText={(e) =>
                          handleChangeText(e, product.stockInventory.quantity)
                        }
                      ></TextInput>
                      <TouchableOpacity
                        style={styles.pen}
                        onPress={() =>
                          handleUpdate(product.stockInventory.id, textValue)
                        }
                      >
                        <Text style={styles.saveBtn}>{translate("save")}</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            </View>
          </View>
        ) : null}
        <View
          style={{
            height: 6,
            backgroundColor: colors.c_f9f9f9,
            marginVertical: 20,
          }}
        ></View>
        <View style={styles.viewDetails}>
          <View style={styles.titleDetalis}>
            <IconCWarning width={20} height={20} />
            <Text style={styles.textDetails}>
              {translate("product_details")}
            </Text>
          </View>
          <View style={styles.textProductsDark}>
            <Text style={styles.textLeft}>{translate("brand")}</Text>
            <View style={styles.viewRight}>
              <View style={styles.imageRight}>
                <Image
                  source={MEDIA.IMAGE_HUAWAI}
                  style={{ width: 22, height: 22 }}
                ></Image>
              </View>
              <Text style={styles.textRight}>{product?.brandName}</Text>
            </View>
          </View>
          <View style={styles.textProducts}>
            <Text style={styles.textLeft}>{translate("producer")}</Text>
            <View style={styles.viewRight}>
              <View style={styles.imageRight}>
                <Image
                  source={MEDIA.IMAGE_HUAWAI}
                  style={{ width: 22, height: 22 }}
                ></Image>
              </View>
              <Text style={styles.textRight}>{product?.brandName}</Text>
            </View>
          </View>
          <View style={styles.textProductsDark}>
            <Text style={styles.textLeft}>{translate("industry")}</Text>
            <View style={styles.viewRight}>
              <Text style={styles.textRight}>{translate("home_electric")}</Text>
            </View>
          </View>
          <View style={styles.textProducts}>
            <Text style={styles.textLeft}>{translate("product_code")}</Text>
            <View style={styles.viewRight}>
              <Text style={styles.textRight}>{product?.code}</Text>
            </View>
          </View>
          <View style={styles.textProductsDark}>
            <Text style={styles.textLeft}>{translate("expiry")}</Text>
            <View style={styles.viewRight}>
              <Text style={styles.textRight}>
                {product?.expireDate
                  ? moment(new Date(product?.expireDate)).format("DD/MM/YY")
                  : ""}
              </Text>
            </View>
          </View>
          <View style={styles.textProducts}>
            <Text style={styles.textLeft}>{translate("packing_size")}</Text>
            <View style={styles.viewRight}>
              <Text style={styles.textRight}>{product?.packingSize}</Text>
            </View>
          </View>
          <View style={styles.textProductsDark}>
            <Text style={styles.textLeft}>{translate("weight")}</Text>
            <View style={styles.viewRight}>
              <Text style={styles.textRight}>{product?.weight}</Text>
            </View>
          </View>
          <View style={styles.textProducts}>
            <Text style={styles.textLeft}>{translate("unit")}</Text>
            <View style={styles.viewRight}>
              <Text style={styles.textRight}>{product?.unit}</Text>
            </View>
          </View>
          <View style={styles.textProductsDark}>
            <Text style={styles.textLeft}>{translate("unit_price")} </Text>
            <View style={styles.viewRight}>
              <Text style={styles.textRight}>
                {formatNumber(product?.price)}đ/{product?.unit}{" "}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            height: 6,
            backgroundColor: colors.c_f9f9f9,
            // marginVertical: 20,
            marginBottom: 20,
          }}
        ></View>
        <View style={styles.titleMT}>
          <IconCWarning width={20} height={20} />
          <Text style={styles.textDetails}>
            {translate("product_description")}
          </Text>
        </View>
        <View style={styles.description}>
          <View style={{ flex: 1 }}>
            {/* <ResilientAutoheightWebView
              source={{
                html: "<p>abc</p>",
              }}
            /> */}
            <RenderHtml
              // contentWidth={width}
              source={{
                html: product?.description,
              }}
            />
            {/* <Text>{product?.description}</Text> */}
          </View>
        </View>
        <View
          style={{
            height: 6,
            backgroundColor: colors.c_f9f9f9,
            // marginVertical: 20,
            marginBottom: 20,
          }}
        ></View>
        <View style={styles.viewEvaluate}>
          <IconStar width={20} height={20} stroke={colors.c_667403} />
          <Text style={styles.textEval}>
            {translate("reviews_of_other_dealers")}
          </Text>
        </View>
        <View style={[styles.viewStar, { marginBottom: 50 }]}>
          <View style={styles.boxStar}>
            <RatingStar
              ratingAvg={product?.retailerRating?.ratingAvg || 0}
              starStyle={styles.iconBox}
            />
            <Text style={styles.txtSold}>
              {product?.retailerRating?.ratingAvg || 0}/5 (
              {numFormatter(product?.retailerRating?.totalRate || 0)}{" "}
              {translate("review")})
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigate(
                ScreenNames.ProductRatingScreen as never,
                {
                  image: product?.image?.[0],
                  productId: product?.id,
                  type: "rating_of_supplier",
                } as never
              )
            }
            style={styles.viewAll}
          >
            <Text style={styles.textAll}>{translate("view_all")}</Text>
            <IconAngleRight width={15} height={15} fill={colors.c_007AFF} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.buttonBT}>
        <ButtonCT
          textButton={translate("add_cart")}
          styleBackground={styles.btnAdd}
          styleText={styles.txtAdd}
          onPress={onAddToCart}
          icon={
            <IconShoppingCarts width={20} height={20} fill={colors.c_ffffff} />
          }
          styleBorder={{
            width: "45%",
            marginHorizontal: "2.5%",
          }}
          style={{
            paddingVertical: 14,
          }}
        />

        <ButtonBoder
          textButton={translate("buy_now")}
          style={styles.btnBuy}
          styleText={styles.txtBuy}
          onPress={buyNow}
        />
      </View>
      <Arlets
        modalVisible={outOfStock}
        content={translate("out_of_stock_message")}
        confirm={() => setOutOfStock(false)}
      />
      <Arlets
        modalVisible={active}
        content={translate("add_to_cart_success")}
        confirm={onConfirmAlert}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.c_ffffff,
  },
  viewImgae: {
    // paddingHorizontal: 24,
    // height: 152,
  },
  imageProduct: {
    width: 152,
    height: 152,
    marginRight: 8,
  },
  textProduct: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.c_000000,
    marginTop: 28,
    marginBottom: 46,
    paddingHorizontal: 35.5,
  },
  textProduct1: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.c_000000,
    marginTop: 28,
    paddingHorizontal: 35.5,
  },
  viewEvaluate: {
    paddingLeft: 35.5,
    flexDirection: "row",
    marginBottom: 20,
  },
  textEval: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.c_667403,
    marginLeft: 9,
  },
  viewStar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 35.5,
    paddingRight: 14.5,
    // marginBottom: 54.5,
  },
  boxStar: {
    // paddingLeft: 13,
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    marginRight: 3.88,
  },
  txtSold: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.c_868686,
    marginLeft: 8,
    textTransform: "lowercase",
  },
  viewAll: {
    flexDirection: "row",
  },
  textAll: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.c_007AFF,
    marginRight: 8,
  },
  viewDetails: {
    marginBottom: 10,
  },
  titleDetalis: {
    flexDirection: "row",
    marginBottom: 36,
    paddingHorizontal: 24,
  },
  textDetails: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.c_667403,
    marginLeft: 9,
  },
  textProducts: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 24,
  },
  textProductsDark: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    backgroundColor: colors.c_000_002,

    paddingHorizontal: 24,
  },
  textLeft: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.c_636366,
  },
  viewRight: {
    flexDirection: "row",
  },
  imageRight: {
    width: 22,
    height: 22,
    borderRadius: 22,
    marginRight: 8,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
  },
  textRight: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.c_636366,
  },
  textMt: {
    marginBottom: 46,
    paddingLeft: 35.5,
    paddingRight: 11.5,
  },
  titleMT: {
    flexDirection: "row",
    marginBottom: 20,
    paddingHorizontal: 24,
  },
  textDescribe: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.c_48484A,
    lineHeight: 22,
  },
  buttonBT: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  btnAdd: {
    backgroundColor: colors.c_667403,
    paddingVertical: 14,
  },
  txtAdd: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.c_ffffff,
    marginLeft: 12,
  },
  btnBuy: {
    borderColor: colors.c_667403,
    borderWidth: 1,
    width: DIMENSIONS.width / 2 - 12,
  },
  txtBuy: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.c_667403,
  },
  description: {
    paddingBottom: 20,
    paddingHorizontal: 24,
  },
  videoIOS: {
    width: "100%",
    height: "100%",
  },
  image: { width, height },
  viewDot: {
    position: "absolute",
    bottom: 20,
    right: 24,
    zIndex: 1000,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 8,
    width: 43,
    height: 32,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  txtDot: { fontSize: 14, lineHeight: 18, color: colors.c_ffffff },
  wrapSlide: {
    position: "relative",
    width,
    height,
    backgroundColor: colors.c_F3F3F3,
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
  textQuantity: { fontSize: 16, lineHeight: 22, fontWeight: "400" },
  containerQuantity: {
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    alignItems: "center",
  },
  editQuantity: {
    borderColor: colors.c_0000001a,
    borderWidth: 1,
    // paddingHorizontal: 18,
    borderRadius: 8,
    paddingVertical: 0,
    textAlign: "center",
    color: colors.c_48484A,
    width: "40%",
  },
  pen: {
    padding: 6,
    backgroundColor: "rgba(102, 116, 3, 0.1)",
    borderRadius: 2,
    marginLeft: 6,
  },
  saveBtn: {
    color: "#667403",
    fontSize: 12,
  },
});

export default ProductDetails;
