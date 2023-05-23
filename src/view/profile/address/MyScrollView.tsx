import React from "react";
import { ScrollView, Text } from "react-native";

const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}: any) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

const MyCoolScrollViewComponent = ({ enableSomeButton, children }: any) => (
  <ScrollView
    onScroll={({ nativeEvent }) => {
      if (isCloseToBottom(nativeEvent)) {
        enableSomeButton();
      }
    }}
    scrollEventThrottle={400}
  >
    {children}
  </ScrollView>
);

export default MyCoolScrollViewComponent;
