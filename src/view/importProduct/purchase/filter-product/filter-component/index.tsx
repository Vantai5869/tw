import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { getIds } from "../../../../../common/utils";
import Tag from "../../../../../componets/Tag";
import { TagType } from "../../../../../constants/type.interface";

interface IProps {
  title: string;
  contents: TagType[] | undefined;
  values?: TagType[];
  onValueChange?: (item: TagType) => void;
  onRemove?: (item: TagType) => void;
}

export default function FilterByGroup(props: IProps) {
  return (
    <View style={styles.container}>
      <View style={styles.viewTitle}>
        <Text style={styles.textTitle}>{props.title}</Text>
      </View>
      <View>
        {/* <Text>Content</Text> */}

        <FlatList
          data={props.contents}
          numColumns={2}
          renderItem={({ item }) => (
            <Tag
              label={item.name}
              isValue={getIds(props.values)?.includes(item?.id) || false}
              onSelect={() => props.onValueChange?.(item)}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      {/* <View style={styles.showmore}>
        <Text>Showmore</Text>
      </View> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingVertical: 15,
  },
  viewTitle: {
    marginBottom: 12,
  },
  textTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  showmore: {
    marginTop: 20,
    alignItems: "center",
  },
});
