import React from "react";
import { View, Text, StyleSheet, useColorScheme } from "react-native";
import Colors from "@/constants/Colors";

interface SpendProps {
  spend: {
    id: number;
    created_at: number;
    name: string;
    amount: string;
    date: string;
    user_id: number;
    _categories: {
      icon: string;
      name: string;
    };
  };
}

const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength
    ? text.substring(0, maxLength - 3) + "..."
    : text;
};

const Spend: React.FC<SpendProps> = ({ spend }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      paddingTop: 10,
      paddingBottom: 10,
      width: "100%",
      paddingHorizontal: 20,
      marginVertical: 5,
      borderRadius: 5,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    amount: {
      fontSize: 13,
      color: "#ff005c",
      fontWeight: "800",
      textAlign: "right",
    },
    date: {
      fontSize: 14,
      color: theme.text,
    },
    icon: {
      fontSize: 20,
      backgroundColor: "#faeeff",
      padding: 10,
      marginRight: 12,
      borderRadius: 20,
      textAlign: "center",
    },
    name: {
      fontSize: 12,
      textAlign: "left",
      flexGrow: 1,
      color: theme.text,
    },
  });


  return (
    <View style={styles.container}>
      {spend._categories ? (
        <Text style={styles.icon}>{spend._categories.icon}</Text>
      ) : (
        <Text style={styles.icon}>💸</Text>
      )}
      <Text style={styles.name}>{truncateText(spend.name, 20)}</Text>
      <View>
        <Text style={styles.amount}>{`- ${spend.amount} €`}</Text>
        <Text style={styles.date}>{spend.date}</Text>
      </View>
    </View>
  );
};

export default Spend;
