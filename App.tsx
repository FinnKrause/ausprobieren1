import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Text, View, Dimensions } from 'react-native';
import LoginScreen from './components/LoginPage/LoginScreen';
import Hub from "./components/Hub/Hub";
import { BackgroundColor } from './components/Grundsachen/Colors';
import AsyncStorage from "@react-native-async-storage/async-storage";


interface Props {

}

const App: FC<Props> = (Props): JSX.Element => {
  const [isLogin, setLogin] = useState<boolean>(true);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    AsyncStorage.setItem("token", "sheeesh");
    AsyncStorage.getItem("token").then(value => {
      setToken((value) ? value : "");
      setLogin(token ? true : false)
    })
  }, [])

  return (
    <SafeAreaView style={{ marginTop: StatusBar.currentHeight }}>
      <View style={styles.mainView}>
        {!isLogin && <LoginScreen isLogin={isLogin} setLogin={setLogin} token={token} setToken={setToken}></LoginScreen>}

        {isLogin && <Hub></Hub>}
      </View>
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

