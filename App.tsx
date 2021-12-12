import React, { FC, useState } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Text } from 'react-native';
import LoginScreen from './components/LoginPage/LoginScreen';
import UserDataPage from "./components/UserDataPage/UserDataPage";

interface Props {

}

const App:FC<Props> = (Props):JSX.Element => {
  const [isLogin, setLogin] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");


  return (
    <SafeAreaView style={styles.mainView}>
      {!isLogin && <LoginScreen isLogin={isLogin} setLogin={setLogin} token={token} setToken={setToken}></LoginScreen>}
      {isLogin && (
        <UserDataPage token={token} goBack={() => {}}></UserDataPage>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainView: {
    marginTop: StatusBar.currentHeight, 
    height: "100%", 
    display: 'flex', 
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    overflow: "hidden"
  },
  text: {
    color: "black", 
    fontSize: 50, 
    justifyContent: "center", 
    textAlign: "center"
  },
});

export default App;

