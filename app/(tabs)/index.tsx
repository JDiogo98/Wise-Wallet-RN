import {
  Button,
  LogBox,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "@/components/Themed";
import Spend from "@/components/home/spend";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import EmojiSelector, { Categories } from "react-native-emoji-selector";

import CircularProgress from "@/components/home/circle";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import MonthSelector from "@/components/home/monthSelector";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

interface Spend {
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
}

const getTotalAmount = (spendsWithIcons: Spend[]): number => {
  let total = 0;
  spendsWithIcons.forEach((spend) => {
    total += parseFloat(spend.amount);
  });
  return total;
};

async function getMonthSpends(selectedMonth: string) {
  try {
    const input_date = selectedMonth;

    // Obtém o authToken utilizando async/await
    const authToken = await AsyncStorage.getItem("authToken");
    console.log(authToken, "aqui o token");

    // Faz a requisição HTTP utilizando o authToken obtido
    const response = await axios.get(
      "https://x8ki-letl-twmt.n7.xano.io/api:wWxOcazW/movements",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        params: {
          input_date,
          input_userId: 5,
        },
      }
    );
    // Retorna os dados obtidos pela requisição
    return response.data;
  } catch (error) {
    console.error("Erro ao obter os gastos do mês:", error);
    throw error;
  }
}

export default function Home() {
  const [spends, setSpends] = useState<Spend[]>([]);
  const [dateModalVisible, setDateModalVisible] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState(dayjs());

  var formatDate = selectedMonth.format("MM/YYYY");

  function addOneMonth() {
    setSelectedMonth(selectedMonth.add(1, "month"));
  }

  function subOneMonth() {
    setSelectedMonth(selectedMonth.subtract(1, "month"));
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMonthSpends(selectedMonth.format("YYYY/MM"));
        setSpends(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [selectedMonth]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconsContainer}>
        <Pressable
          style={styles.openDateModal}
          onPress={() => setDateModalVisible(true)}
        >
          <Ionicons name="calendar" size={35} color="#E80278" />
        </Pressable>
        <View>
          <Text style={styles.formatDate}>{formatDate}</Text>
        </View>
        <Pressable
          style={styles.openDateModal}
          onPress={() => console.log("Chart pressed")}
        >
          <FontAwesome5 name="chart-bar" size={38} color="#E80278" />
        </Pressable>
      </View>
      <Modal
        visible={dateModalVisible}
        animationType={"fade"}
        transparent={true}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={{ alignItems: "center", margin: 10 }}>
              <Text style={{ fontSize: 23, marginTop: 5 }}>
                Month Selection 📆
              </Text>

              <MonthSelector
                month={selectedMonth.format("YYYY/MM")}
                addOneMonth={addOneMonth}
                subOneMonth={subOneMonth}
              ></MonthSelector>
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setDateModalVisible(!dateModalVisible)}
              style={{
                width: "95%",
                borderRadius: 0,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "blue",
                borderColor: "#ddd",
                borderBottomWidth: 0,
                bottom: 0,
                marginBottom: 10,
                marginTop: 10,
              }}
            >
              <Text style={{ color: "white", margin: 15 }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.circleContainer}>
        <CircularProgress
          progress={(getTotalAmount(spends) / 1060) * 100}
          total={getTotalAmount(spends)}
        ></CircularProgress>
      </View>
      <View style={styles.spendsContainer}>
        <ScrollView>
          {spends &&
            spends.map((s) => {
              return <Spend key={s.id} spend={s}></Spend>;
            })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    borderBlockColor: "red",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  spendsContainer: {
    flex: 3,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  circleContainer: {
    margin: 20,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    alignItems: "center",
    backgroundColor: "white",
    marginVertical: 60,
    width: "90%",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 7,
    elevation: 10,
  },
  openDateModal: {
    flexDirection: "column",
    // width: "100%",
    // alignItems: "flex-start",
    paddingHorizontal: 20,
    opacity: 0.8
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
    // paddingHorizontal: 20,
    // marginBottom: 20,
  },
  formatDate: {
    color: "#E80278",
    fontSize: 18,
    fontWeight: "500"
  }
});
