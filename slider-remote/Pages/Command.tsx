import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Direction from "../Components/Direction";
import { Send } from "../Utils/Request";

export default class Command extends Component {
    sendMessage(message: string) {
        Send(`http://192.168.88.37:3491/test`, message);
    }

    render() {
        return (
            <View style={styles.container}>
                <Direction
                    orientation="Up"
                    styles={styles.verticalButton}
                    onPress={() => this.sendMessage("Up")}
                />
                <View style={styles.horizontalContainer}>
                    <Direction
                        orientation="Left"
                        styles={styles.horizontalButton}
                        onPress={() => this.sendMessage("Left")}
                    />
                    <Direction
                        orientation="Right"
                        styles={styles.horizontalButton}
                        onPress={() => this.sendMessage("Right")}
                    />
                </View>
                <Direction
                    orientation="Down"
                    styles={styles.verticalButton}
                    onPress={() => this.sendMessage("Down")}
                />
            </View>
        );
    }
}

const buutonStyle = {
    textAlign: "center",
    backgroundColor: "#505090",
    margin: 1,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
    },
    horizontalContainer: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",
    },
    verticalButton: {
        ...buutonStyle,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    horizontalButton: {
        ...buutonStyle,
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
});
