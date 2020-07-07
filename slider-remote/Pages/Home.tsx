import React, { Component } from "react";
import { StyleSheet, TextInput, Button, View, Alert } from "react-native";
import { Props } from "./../Navigation/Navigation";
import { Send } from "../Utils/Request";

export default class Home extends Component<Props> {
    state = {
        ipAdress: "192.168.88.37:3491",
    };

    inputIpAdress(adress: string) {
        this.setState({ ipAdress: adress });
    }

    sendCommand() {
        let requestAnswer = Send(`http://${this.state.ipAdress}/test`, "Test");
        Alert.alert(requestAnswer.response);
        requestAnswer.result &&
            this.props.navigation.navigate<"Command">("Command");
    }

    render() {
        var { ipAdress } = this.state;
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Adresse IP"
                    onChangeText={(text) => this.inputIpAdress(text)}
                />
                <Button title="Connecter" onPress={() => this.sendCommand()} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 5,
    },
    textInput: {
        borderBottomColor: "#505050",
        borderBottomWidth: 1,
        marginBottom: 5,
    },
});
