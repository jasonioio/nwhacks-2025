import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

const Welcome = () => {

    const date = new Date();

    const monthMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Nov', 'Sep', 'Oct', 'Nov', 'Dec'];
    let affix;
    switch (date.getDate() % 10)
    {
        case 1:
            affix = 'st';
            break;
        case 2:
            affix = 'nd';
            break;
        case 3:
            affix = 'rd';
            break;
        default:
            affix = 'th';
            break;
    }

    return (
        <View style = {styles.container}>
            <Text style = {styles.mainHeader}>{monthMap[date.getMonth()]} {date.getDate() + affix}, {date.getFullYear()}</Text>
            <Text style = {styles.secondHeader}>What's the vibe today?</Text>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: '6%',
        backgroundColor: 'white',
    },
    mainHeader: {
        fontSize: 40,
        fontWeight: 600,
        fontFamily: 'AbrilFatface'
    },
    secondHeader: {
        fontSize: 20,
    }

})

export default Welcome;