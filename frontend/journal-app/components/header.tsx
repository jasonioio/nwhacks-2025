import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const Header = () => {
    
    const date = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    let affix;
    switch (date.getDay() % 10)
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
            <Text style = {styles.header}>{monthNames[date.getMonth()]} {date.getDate() + affix}, {date.getFullYear()}</Text>
            <Text style = {styles.subheader}>What's the vibe today?</Text>
            <View style = {styles.hr}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: '6%',
        paddingTop: '5%',
    },
    header: {
        fontSize: 45,
        fontFamily: 'Abril Fatface'
    },
    subheader: {
        fontSize: 20,
        color: '#666666'
    },
    hr: {
        width: '100%',
        borderColor: '#666666',
        borderWidth: 0.5,
        borderStyle: 'solid',
        marginHorizontal: 'auto',
        marginTop: 15
    }
})

export default Header;