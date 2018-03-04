import React, {Component} from "react";
import {
    StyleSheet,
    View
} from "react-native";
import {Container, Content, Header, Body, Left, Right, Button, Text, List, ListItem} from 'native-base';


export default class List2048 extends Component{
    constructor(props) {
        super(props);
        this.state = {
            scores: []
        };
    }

    componentDidMount(){
        this.getScore2048()
    }

    getScore2048(){
        let base64 = require('base-64');
        let username = "PlayCenter";
        let password = "azerty";
        let url = 'http://ygg.life/dev/PlayCenter/requete.php';
        //headers.append('Content-Type', 'application/json');

        fetch('http://ygg.life/dev/PlayCenter/requete.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic'+ base64.encode(username + ":" + password),
                //'Credentials': 'unsername:password'
            },
            body: 'action=requete&subaction=classement_demineur'

        })
            .then(response => response.json())
            .then((responseJson) => {
                console.log(responseJson)
            })
    }

    render(){
        return (
            <Content>
                <Header>
                    <Body>
                    <Text>Classement Demineur</Text>
                    </Body>
                </Header>

                <Content>
                    <List
                        dataArray={this.state.scores}
                        renderRow={(rowData) => (
                            <ListItem>
                                <Body style={{backgroundColor: "#6abe51", height: 50}}>
                                <Text style={[styles.text_size,  {
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    flex: 1
                                }]}>{rowData} Cours {rowData}</Text>
                                </Body>
                            </ListItem>
                        )}>

                    </List>
                </Content>
            </Content>
        )
    }
}

const styles = StyleSheet.create({

});