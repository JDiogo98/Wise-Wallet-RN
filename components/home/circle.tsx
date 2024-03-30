import { View, StyleSheet, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const CircularProgress = ({ progress, total }: any) => {
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={180}
        width={15}
        rotation={180}
        delay={1000}
        duration={1500}
        fill={progress}
        tintColor="#ff0080"
        backgroundColor="#f7e5ff"
        lineCap="round"
      >
        {(fill) => <Text>{`${total.toFixed(2)}€ 💰` }</Text>}
      </AnimatedCircularProgress>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1,
    maxWidth: 200,
  },
  circle: {
    width: "80%",
    height: "80%",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3, // Largura da borda
  },
});

export default CircularProgress;
