import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../constants/colors";
import { IconStar, IconStarOutline } from "../constants/icons";

interface Props {
  ratingAvg: number;
  wrapStarStyle?: StyleProp<ViewStyle>;
  width?: number;
  height?: number;
  starStyle?: StyleProp<TextStyle>;
}

export const RatingStar = React.memo<Props>(({ ratingAvg, ...props }) => {
  const initWidth = 10.34;
  const width = (ratingAvg / 5) * 100 + "%";
  const widthWrap = props.width ? 5 * (props.width + 3) : "auto";
  return (
    <View style={[styles.wrapStar, props.wrapStarStyle,{ width: widthWrap }]}>
      <View style={[styles.flexItems, styles.wrapStarOutline]}>
        {Array.from({ length: 5 }, (v, k) => k + 1).map((el) => {
          return (
            <IconStarOutline
              key={"star-outline-" + el}
              stroke={colors.primary}
              width={props.width || initWidth}
              height={props.height || initWidth}
              style={[styles.star, props.starStyle]}
            />
          );
        })}
      </View>
      <View style={[styles.flexItems, styles.wrapStarFull, { width }]}>
        {Array.from({ length: 5 }, (v, k) => k + 1).map((el) => {
          return (
            <IconStar
              key={"star-full-" + el}
              stroke={colors.primary}
              fill={colors.primary}
              width={props.width || initWidth}
              height={props.height || initWidth}
              style={[styles.star, props.starStyle]}
            />
          );
        })}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  flexBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexItems: {
    flexDirection: "row",
    alignItems: "center",
  },
  wrapStar: { marginRight: 4, position: "relative" },
  wrapStarOutline: {},
  wrapStarFull: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
    flexWrap: "nowrap",
    overflow: "hidden",
  },
  star: {
    marginRight: 3,
  },
});
