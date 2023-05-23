import React from "react";
import { View } from "react-native";

import { Text } from "react-native-svg";
// import { Text } from "react-native";
import { PieChart } from "react-native-svg-charts";

interface Props {
  amount: objects[];
}
interface objects {
  num: number;
  color: string;
}
const PieChartcancel: React.FC<Props> = ({ amount }) => {
  // const data = [
  //   {
  //     key: 1,
  //     value: amount[0].num,
  //     svg: { fill: amount[0].color },
  //   },
  //   {
  //     key: 2,
  //     value: amount[1].num,
  //     svg: { fill: amount[1].color },
  //   },
  //   {
  //     key: 3,
  //     value: amount[2].num,
  //     svg: { fill: amount[2].color },
  //   },
  //   {
  //     key: 4,
  //     value: amount[3].num,
  //     svg: { fill: amount[3].color },
  //   },
  // ];
  const data = amount.map((item, index) => {
    const obj = {
      key: index,
      value: 0,
      svg: { fill: "" },
    };
    obj.key = index;
    obj.value = item.num;
    obj.svg = { fill: item.color };
    return obj;
  });
  const calculatePercent = (amount: number) => {
    var i = 0;
    var total = 0;
    for (i = 0; i < data.length; i++) {
      total = total + data[i]?.value;
    }
    if ((amount / total) * 100 < 10) {
      return "";
    } else return ((amount / total) * 100).toFixed(0);
  };
  const Labels = ({ slices }) => {
    return slices.map((slice, index) => {
      const { labelCentroid, pieCentroid, data } = slice;
      return (
        <Text
          key={index}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill={"white"}
          textAnchor={"middle"}
          alignmentBaseline={"middle"}
          fontSize={12}
          stroke={"black"}
          strokeWidth={0}
        >
          {calculatePercent(data.value) !== ""
            ? calculatePercent(data.value) + "%"
            : ""}
        </Text>
      );
    });
  };

  return (
    <View style={{}}>
      <PieChart
        //   style={{ height: 200 }}
        //   valueAccessor={({ item }) => item.amount}
        //   data={data}
        //   spacing={0}
        //   outerRadius={"100%"}
        //   innerRadius={"0%"}
        //   labelRadius={0}
        style={{
          height: 156,
          width: 156,
          // backgroundColor: "blue",
          paddingLeft: 0,
          borderWidth: 0,
        }}
        valueAccessor={({ item }) => item.value}
        data={data}
        //   spacing={1000}
        padAngle={0}
        outerRadius={"100%"}
        innerRadius={"0%"}
      >
        <Labels />
      </PieChart>
    </View>
  );
};
export default PieChartcancel;
