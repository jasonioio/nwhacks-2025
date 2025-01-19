import React, {useState} from 'react'
import {styles} from './LoginForm.styles'
                
import {View, Image, Button, TouchableOpacity, Text} from 'react-native'


const LoginForm = ({setIsLoggedIn}) => {

    function onPress(){

    }

    return (
        <>
            <View style = {styles.container}>
                <Image
                    source={require("../assets/images/logo.png")}
                    style={styles.logo}
                />
                <TouchableOpacity style = {styles.buttonContainer} onPress={() => setIsLoggedIn(val => !val)}>
                    <Text style = {styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default LoginForm;