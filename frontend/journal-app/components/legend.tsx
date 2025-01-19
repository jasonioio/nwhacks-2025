import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const Legend = () => {

    const sentimentToColor = {
        'Joyful': '#E8E47D',
        'Sad': '#B2CDE5',
        'Productive': '#F0D6A7',
        'Tired': '#DFB2E5',
        'Okay': '#A7F0B3',
        'Angry': '#E5B2B2'
    }

    return (
        <View style = {styles.container}>
            {Object.entries(sentimentToColor).map(entry => {
                return (
                    <View style = {styles.legendContainer}>
                        <View style = {{...styles.colorSwatch, backgroundColor: entry[1]}}></View>
                        <Text style = {styles.legendText}>{entry[0]}</Text>
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '5%',
    },
    legendContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    colorSwatch: {
        width: 20,
        aspectRatio: 1/1,
    },
    legendText: {
        fontWeight: 'bold',
    }
})


export default Legend;