import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { DIMENSIONS } from "../../../../common/utils";
import { colors } from "../../../../constants/colors";
import Popover, { Rect } from "react-native-popover-view";
import Popup from "../components/popup";
import { useAppSelector } from "../../../../redux/hooks";
import { selectReport } from "../../../../redux/slice/Report/report";
const Chart = () => {
  const { GrowReport } = useAppSelector(selectReport);
  const [checked, setChecked] = useState<number>();
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [layoutHeight, setLayoutHeight] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  const [contentWidth, setContentWidth] = useState<number>(0);
  const [data, setData] = useState<Array<number>>([]);
  const [quantity, setQuantity] = useState<number>();
  const [isBigNum, setIsBigNum] = useState(false);
  const convertNum = (e: number) => {
    if (e / 1000000 >= 1000) {
      setIsBigNum(true);
    }
    //   // setSuffix("t");
    //   // setLastSuffix(true);
    //   return { num: e / 1000000000, prefix: "t" };
    // } else {
    // if (!lastSuffix) {
    // setSuffix("tr");
    // }
    return { num: e / 1000000, prefix: "tr" };
    // }
  };
  useEffect(() => {
    setIsBigNum(false);
    // setLastSuffix(false);
    const dataset: number[] = [];
    GrowReport.map((item, index) => {
      dataset.push(convertNum(item.totalRevenue).num);
      return dataset;
    });
    setData(dataset);
  }, [GrowReport]);
  return (
    <>
      {data.length > 0 ? (
        <View
          onLayout={(e) => {
            setLayoutHeight(e.nativeEvent.layout.y);
          }}
        >
          <ScrollView
            style={{ paddingLeft: isBigNum ? 16 : 0 }}
            // style={{ backgroundColor: "red" }}
            // ref={scrollviewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            // onScroll={(e) => {
            //   setContentWidth(e.nativeEvent.contentOffset.x);
            // }}
            onMomentumScrollEnd={(e) => {
              setContentWidth(e.nativeEvent.contentOffset.x);
            }}
          >
            <LineChart
              // spacing={0.8}
              // spacingInner={0.8}
              onDataPointClick={(e) => {
                setQuantity(GrowReport[e.index].totalQuantity);
                setX(e.x);
                setY(e.y);
                setChecked(e.index);
                setShow(!show);
              }}
              // getDotColor={(value, index) => (index === checked ? "red" : "blue")}
              getDotProps={(value, index) =>
                index === checked
                  ? {
                      r: "7",
                      strokeWidth: "1",
                      stroke: colors.c_007AFF,
                      // fill: colors.c_ffffff,
                    }
                  : {
                      r: "7",
                      strokeWidth: "1",
                      stroke: colors.c_007AFF,
                      fill: colors.c_ffffff,
                    }
              }
              withVerticalLines={false}
              fromZero={true}
              data={{
                labels: [
                  "T1",
                  "T2",
                  "T3",
                  "T4",
                  "T5",
                  "T6",
                  "T7",
                  "T8",
                  "T9",
                  "T10",
                  "T11",
                  "T12",
                ],
                datasets: [
                  {
                    data: data,
                  },
                ],
              }}
              width={DIMENSIONS.width * 2} // from react-natives
              height={262}
              yAxisSuffix={"tr"}
              yAxisInterval={0.1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "white",
                backgroundGradientFrom: "white",
                backgroundGradientTo: "white",
                decimalPlaces: 1, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(129, 129, 129,  ${opacity})`,
                style: {
                  marginVertical: 8,
                  borderRadius: 0,
                },
                propsForLabels: {},
              }}
              // bezier
              style={{
                marginVertical: 8,

                borderRadius: 0,
              }}
            />
            <Popover
              popoverStyle={{ borderRadius: 10 }}
              backgroundStyle={{ backgroundColor: `rgba(109, 109, 109, 0.15)` }}
              from={new Rect(x - contentWidth, y + layoutHeight + 50, 20, 40)}
              isVisible={show}
              onRequestClose={() => setShow(false)}
              animationConfig={{ delay: 0 }}
            >
              <Popup index={checked!!} value={quantity} year={2022} />
            </Popover>
          </ScrollView>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};
export default Chart;
