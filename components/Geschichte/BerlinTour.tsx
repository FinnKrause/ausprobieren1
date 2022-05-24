import React from "react";
import {StyleSheet, View, Text} from "react-native";
import { Schriftfarbe } from "../Grundsachen/Colors";

interface Props {

}

const BerlinTour:React.FC<Props> = (Props: Props):JSX.Element => {
    return (
        <View style={styles.BerlinTourWrapper}>
            <Text style={styles.TextStyle}>Berlin-Tour</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    TextStyle: {
        color: Schriftfarbe
    },
    BerlinTourWrapper: {
         height: 100
     }
})

export default BerlinTour;