import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { RatingStar } from "../../../componets/RatingStar";
import { colors } from "../../../constants/colors";
import { IconStar } from "../../../constants/icons";
import { DATEFORMAT } from "../../../constants/untils";
import { translate } from "../../../locale";
import {
  GetListRating,
  selectProductRating,
} from "../../../redux/slice/Sales/product-rating";

const ProductRatingSupplier = ({ ...props }) => {
  const dispatch = useDispatch();
  const { reviews } = useSelector(selectProductRating);

  const [type, setType] = useState<number | string>("ALL");
  const [skip, setSkip] = useState<number>(1);

  useEffect(() => {
    dispatch(
      GetListRating({
        productId: props.route.params.productId,
        skip: skip - 1,
        take: 20,
      })
    );
  }, [skip]);

  const onHanleFilter = (ratePoint: number | string) => {
    setType(ratePoint);
  };
  const onRefresh = () => {
    setSkip(0);
  };
  const onEndReached = () => {
    if (reviews?.totalCount && reviews?.totalCount > 0) {
      const totalPages = Math.ceil(reviews?.totalCount / 20);
      if (skip < totalPages) {
        setSkip(skip + 1);
      }
    }
  };

  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.container}>
        <View style={styles.filters}>
          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => onHanleFilter("HAS_CMT")}
              style={[
                styles.tag,
                { flex: 1 },
                type === "HAS_CMT" && styles.active,
              ]}
            >
              <Text
                style={[
                  styles.count,
                  { marginTop: 0 },
                  type === "HAS_CMT" && styles.titleActive,
                ]}
              >
                {translate("has_comment")}
              </Text>
              <Text
                style={[styles.count, type === "HAS_CMT" && styles.titleActive]}
              >
                ({reviews?.totalCount || 0})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => onHanleFilter("ALL")}
              style={[styles.tag, { flex: 1 }, type === "ALL" && styles.active]}
            >
              <Text
                style={[
                  styles.count,
                  { marginTop: 0 },
                  type === "ALL" && styles.titleActive,
                ]}
              >
                {translate("all")}
              </Text>
              <Text
                style={[styles.count, type === "ALL" && styles.titleActive]}
              >
                ({reviews?.totalCount || 0})
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            {Array.from({ length: 5 }, (v, k) => k + 1).map((el, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => onHanleFilter(index + 1)}
                  style={[
                    styles.tag,
                    index === 4 && { flex: 1 },
                    type === index + 1 && styles.active,
                  ]}
                  key={"star-outline-" + el}
                >
                  <View style={styles.wrapStar}>
                    {Array.from({ length: index + 1 }, (v, k) => k + 1)?.map(
                      (e) => (
                        <IconStar
                          width={10.34}
                          height={10.34}
                          fill={colors.primary}
                          stroke={colors.primary}
                          style={[styles.star]}
                        />
                      )
                    )}
                  </View>
                  <Text
                    style={[
                      styles.count,
                      type === index + 1 && styles.titleActive,
                    ]}
                  >
                    ({reviews?.totalCount || 0})
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
          style={{
            paddingHorizontal: 24,
            flex: 1,
          }}
          data={reviews?.items || []}
          renderItem={({ item }) => (
            <View
              style={[
                {
                  flexDirection: "row",
                  marginBottom: 16,
                },
              ]}
            >
              <Image source={{ uri: item?.userAvt }} style={styles.image} />
              <View style={styles.wrapQuote}>
                <Text style={styles.title}>
                  {moment(item?.creationTime).format(DATEFORMAT.full)}
                </Text>
                <RatingStar ratingAvg={0} />
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  <View style={styles.viewQuote}>
                    <Text style={styles.quote}>
                      {translate("label_rating_" + (item?.rateOption || 1))}
                    </Text>
                  </View>
                </View>
                <Text style={styles.date}>{moment().format()}</Text>
              </View>
            </View>
          )}
          onEndReachedThreshold={0.5}
          onEndReached={onEndReached}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.c_ffffff },
  container: { paddingBottom: 20, flex: 1 },
  filters: {
    borderBottomWidth: 6,
    borderBottomColor: colors.c_f9f9f9,
    marginBottom: 22,
    paddingBottom: 10,
    paddingHorizontal: 18,
  },
  row: { flexDirection: "row-reverse" },
  wrapStar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tag: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.c_D7D7D7,
    paddingHorizontal: 8,
    paddingVertical: 6,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    borderColor: colors.c_2982E2,
  },
  count: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "500",
    color: colors.c_48484A,
    marginTop: 3,
  },
  titleActive: {
    color: colors.c_2982E2,
  },
  star: { marginHorizontal: 2 },
  image: {
    width: 28,
    height: 28,
    borderRadius: 60,
    backgroundColor: colors.c_F2F2F2,
  },
  wrapQuote: { flex: 1, paddingHorizontal: 15 },
  title: {
    fontSize: 14,
    lineHeight: 18,
    color: colors.c_3A3A3C,
    fontWeight: "500",
    marginBottom: 8,
  },
  viewQuote: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2982E2",
    marginRight: 8,
    marginVertical: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  quote: { fontSize: 12, lineHeight: 14, fontWeight: "500", color: "#2982E2" },
  date: { fontSize: 10, lineHeight: 12, color: colors.c_7B7B80 },
});

export default ProductRatingSupplier;
