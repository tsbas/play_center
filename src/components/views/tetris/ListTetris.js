import React, {Component} from "react";
import {
    StyleSheet,
    View
} from "react-native";
import {Container, Content, Header, Body, Left, Right, Button, Text, List, ListItem} from 'native-base';
import styles from "../../../../assets/styles/main";


export default class ListTetris extends Component{
    constructor(props) {
        super(props);
        this.state = {
            scores: []
        };
    }

    componentDidMount(){
        this.getTetris()
    }

    getTetris(){
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
                'Authorization': 'Basic '+ base64.encode(username + ":" + password),
                //'Credentials': 'unsername:password'
            },
            body: 'action=requete&subaction=classement_tetris'

        })
            .then(response => response.json())
            .then((responseJson) => {
                let scores = [];
                console.log(responseJson)
                responseJson.map((item) => {
                    scores.push({
                        'userName': item.userName,
                        'score': item.score
                    })
                });
                this.setState({
                    scores: scores
                })
            })
    }

    render(){
        return (
            <Content>
                <Header>
                    <Body>
                        <Text style={[styles.title_size]}>Classement Tetris</Text>
                    </Body>
                </Header>

                <Content>
                    <List
                        dataArray={this.state.scores}
                        renderRow={(rowData) => (
                            <ListItem>
                                <Body style={{backgroundColor: "#6abe51", height: 50, justifyContent: 'center',
                                    flex: 1}}>
                                <Text style={[styles.text_size,  {
                                    textAlign: 'center',
                                }]}>Utilisateur: {rowData.userName} -- Score: {rowData.score}</Text>
                                </Body>
                            </ListItem>
                        )}>

                    </List>
                </Content>
            </Content>
        )
    }
}

const s = StyleSheet.create({

});