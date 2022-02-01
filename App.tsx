import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Text, View, Dimensions, Button, TouchableOpacity } from 'react-native';
import LoginScreen from './components/LoginPage/LoginScreen';
import Hub from "./components/Hub/Hub";
import { BackgroundColor } from './components/Grundsachen/Colors';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseNavigationContainer } from "@react-navigation/native"

interface Colors {
  BackgroundColor: string,
  SecoundBackground: string,
  PlaceHolderColor: string,
  ContrastColor: string,
  DarkerContrast: string,
  SchriftAufKontrast: string,
  SecoundContrast: string,
  DarkerSecoundContrast: string,
  SchriftAufSecoundContrast: string,
  Schriftfarbe: string,
  AlertColor: string,
}


const App: FC = (): JSX.Element => {
  const [isLogin, setLogin] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [loading, setloading] = useState<boolean>(false);

  useEffect(() => {
    AsyncStorage.getItem("token").then(value => {
      if (!value) {
        setloading(false);
        return;
      }
      setToken(value ? value : "");
      setLogin(value ? true : false)

      setloading(false);
    })
  }, [])

  return (
    <SafeAreaView style={{ marginTop: StatusBar.currentHeight, backgroundColor: BackgroundColor, overflow: "hidden" }}>
      {loading && <View style={styles.mainView}>
        <Text style={{ fontSize: 30, color: "white", width: "100%", textAlign: "center" }}>Loading</Text>
      </View>}
      {!loading && <View style={styles.mainView}>
        {!isLogin && <LoginScreen isLogin={isLogin} setLogin={setLogin} token={token} setToken={setToken}></LoginScreen>}
        {isLogin && <Hub removeLogin={() => { AsyncStorage.setItem("token", ""); setLogin(false); setToken(""); }} token={token}></Hub>}
      </View>}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainView: {
    height: "100%",
    width: "100%",

    display: 'flex',
    justifyContent: "center",
    backgroundColor: BackgroundColor,
  }
});

export default App;


