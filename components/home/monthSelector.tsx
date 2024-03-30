import * as React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface MonthSelectorProps {
  month: string;
  addOneMonth: () => void;
  subOneMonth: () => void;
}

const MonthSelector = (props: MonthSelectorProps) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => props.subOneMonth()}>
        <FontAwesome name="arrow-left" size={24} color="#E80278" />
      </Pressable>
        <Text style={styles.monthText}>{props.month}</Text>
      <Pressable onPress={() => props.addOneMonth()}>
        <FontAwesome name="arrow-right" size={24} color="#E80278" />
      </Pressable>
    </View>
  );
};

export default MonthSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 20,
    gap: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  monthText: {
    color: "#E80278",
    fontSize: 20,
    fontWeight: "500"
  }
});
