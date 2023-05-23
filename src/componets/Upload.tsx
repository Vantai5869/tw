import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { colors } from "../constants/colors";
import { IconAddNoCircle, IconImageUpload, icons } from "../constants/icons";
import { DIMENSIONS } from "../common/utils";
import { MEDIA } from "../constants/media";

interface Props {
  label: string;
  style?: object;
  value: string;
  onChange: (value: string) => void;
  data?: string | null;
  noTitle?: boolean;
  sized?: "small" | "normal" | "large";
  onPreview: (value: string) => void;
  onDelete: (value: string) => void;
  required?: boolean;
  errorText?: string | null;
  imageText?: string;
}

const Upload = React.memo((props: Props) => {
  useEffect(() => {}, []);
  return (
    <View
      style={
        props.sized === "small"
          ? styles.viewSmall
          : props.sized === "normal"
          ? styles.viewNormal
          : styles.view
      }
    >
      <View>
        {props.noTitle ? null : (
          <View style={styles.viewLabel}>
            <Text style={styles.label}>{props.label}</Text>
            {props.required ? <Text style={styles.textRequire}>*</Text> : null}
          </View>
        )}
      </View>
      <View style={props.errorText ? styles.contentError : styles.content}>
        {props.data ? (
          <View>
            {props.sized === "small" ? (
              <TouchableOpacity
                style={styles.TouchableImage}
                onPress={() => props.onChange(props.value)}
              >
                <Image source={{ uri: props.data }} style={styles.image} />
                {/* <TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchableAdd}
                    onPress={() => props.onChange(props.value)}
                  >
                    <IconAddNoCircle
                      width={16}
                      height={16}
                      stroke={colors.c_000000}
                      fill={colors.c_000000}
                    />
                  </TouchableOpacity>
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={styles.touchableClose}
                  onPress={() => props.onDelete(props.value)}
                >
                  <Image source={icons.ICON_CLOSE} style={styles.iconOnImage} />
                </TouchableOpacity>
              </TouchableOpacity>
            ) : props.sized === "normal" ? (
              <TouchableOpacity
                style={styles.TouchableImageFull}
                onPress={() => props.onChange(props.value)}
              >
                <Image
                  source={{ uri: props.data }}
                  style={styles.imageNormal}
                />
                {/* <TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchableAdd}
                    onPress={() => props.onChange(props.value)}
                  >
                    <IconAddNoCircle
                      width={16}
                      height={16}
                      stroke={colors.c_000000}
                      fill={colors.c_000000}
                    />
                  </TouchableOpacity>
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={styles.touchableClose}
                  onPress={() => props.onDelete(props.value)}
                >
                  <Image source={icons.ICON_CLOSE} style={styles.iconOnImage} />
                </TouchableOpacity>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.TouchableImageFull}
                onPress={() => props.onChange(props.value)}
              >
                <Image source={{ uri: props.data }} style={styles.imageFull} />
                <TouchableOpacity>
                  {/* <TouchableOpacity
                    style={styles.touchableAdd}
                    onPress={() => props.onChange(props.value)}
                  >
                    <IconAddNoCircle
                      width={16}
                      height={16}
                      stroke={colors.c_000000}
                      fill={colors.c_000000}
                    />
                  </TouchableOpacity> */}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.touchableClose}
                  onPress={() => props.onDelete(props.value)}
                >
                  <Image source={icons.ICON_CLOSE} style={styles.iconOnImage} />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={styles.viewNoImage}>
            <TouchableOpacity
              style={styles.borderTouchNoImage}
              onPress={() => props.onChange(props.value)}
            >
              {props.sized === "small" ? (
                <Image source={icons.ICON_ADD_IMAGE} />
              ) : (
                <View style={styles.viewImageFull}>
                  <IconImageUpload />
                  {props.imageText ? (
                    <Text style={styles.mt6}>{props.imageText}</Text>
                  ) : (
                    <Text style={styles.mt6}>Thêm hình ảnh</Text>
                  )}
                </View>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  view: {
    borderRadius: 10,
    marginVertical: 15,
  },
  viewSmall: {
    borderRadius: 10,
    width: (DIMENSIONS.width - 48) / 3,
    marginVertical: 10,
    marginRight: 16,
  },
  viewNormal: {
    borderRadius: 10,
    width: (DIMENSIONS.width - 64) / 2,
    marginVertical: 10,
    marginRight: 16,
  },

  viewLeft: {
    justifyContent: "center",
  },
  content: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.c_000_012,
    borderRadius: 10,
    height: 148,
  },
  contentError: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.light_red,
    borderRadius: 10,
    height: 148,
  },
  buttonEye: {
    justifyContent: "center",
    width: 25,
    height: 25,
  },
  viewLabel: {
    // position: "absolute",
    // top: -25,
    // zIndex: 2,
    paddingHorizontal: 4,
    alignContent: "center",
    height: 23,
    backgroundColor: colors.c_ffffff,
    flexDirection: "row",
  },
  label: {
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 20,
    color: colors.c_7B7B80,
  },

  icon: {
    width: 22,
    height: 22,
  },
  mt6: {
    marginTop: 6,
    fontWeight: "500",
    fontSize: 12,
  },
  image: {
    width: (DIMENSIONS.width - 48) / 3,
    height: 148,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  imageFull: {
    width: DIMENSIONS.width - 48,
    height: 148,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  imageNormal: {
    width: (DIMENSIONS.width - 64) / 2,
    height: 148,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  touchableClose: {
    zIndex: 9999,
    right: 36.34,
    width: 22,
    height: 22,
    top: 8.34,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.c_000_012,
    backgroundColor: colors.c_ffffff,
    justifyContent: "center",
    alignItems: "center",
  },
  touchableAdd: {
    zIndex: 9999,
    right: 103.66,
    width: 22,
    height: 22,
    top: 8.34,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.c_000_012,
    backgroundColor: colors.c_ffffff,
    justifyContent: "center",
    alignItems: "center",
  },
  iconOnImage: {
    width: 16,
    height: 16,
  },
  textRequire: {
    color: colors.light_red,
  },

  TouchableImage: {
    flexDirection: "row",
    position: "absolute",
  },
  TouchableImageFull: {
    flexDirection: "row",
    // position: "absolute",
    paddingLeft: 20,
    justifyContent: "center",
  },
  viewNoImage: {
    alignItems: "center",
    justifyContent: "center",
    height: 148,
  },
  borderTouchNoImage: {
    borderWidth: 1,
    borderColor: colors.c_000_012,
    borderRadius: 6.57,
    // flex: 1,
    width: "90%",

    height: "90%",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  viewImageFull: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Upload;
