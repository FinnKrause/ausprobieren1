import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Text, View, Dimensions } from 'react-native';
import LoginScreen from './components/LoginPage/LoginScreen';
import Hub from "./components/Hub/Hub";
import { BackgroundColor } from './components/Grundsachen/Colors';
import AsyncStorage from "@react-native-async-storage/async-storage";


interface Props {

}

const App: FC<Props> = (Props): JSX.Element => {
  const [isLogin, setLogin] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [loading, setloading] = useState<boolean>(true);

  AsyncStorage.getItem("token").then(value => {
    //console.log("Got this token at Startup: " + value)
    setToken((value) ? value : "");

    //console.log("This is the Current token in state: " + token)
    setLogin(token ? true : false)

    // console.log("Is Logged in at Startup: " + isLogin)

    setTimeout(() => {
      setloading(false);
    }, 1000)
  })

  return (
    <SafeAreaView style={{ marginTop: StatusBar.currentHeight, backgroundColor: BackgroundColor, overflow: "hidden" }}>
      {loading && <View style={styles.mainView}>
        <Text style={{ fontSize: 30, color: "white", width: "100%", textAlign: "center" }}>Loading</Text>
      </View>}
      {!loading && <View style={styles.mainView}>
        {!isLogin && <LoginScreen isLogin={isLogin} setLogin={setLogin} token={token} setToken={setToken}></LoginScreen>}
        {isLogin && <Hub></Hub>}
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

