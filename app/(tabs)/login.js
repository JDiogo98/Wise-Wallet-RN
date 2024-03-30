import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import axios from "axios"; 
import { router } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage"


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://x8ki-letl-twmt.n7.xano.io/api:wWxOcazW/auth/login",
        { email, password }
      );
      await AsyncStorage.setItem("authToken", response.data.authToken);
      setTimeout(() => {
        router.push('/')
      }, 1000);
    } catch (error) {
      console.log("Erro no login:", error);
    }
  };



  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default Login;
