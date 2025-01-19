import {Dimensions, StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    logo: {
        width: 400,
        height: 400
    },
    buttonContainer: {
        backgroundColor: '#E5E1DA',
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 10
    },
    buttonText: {
        fontWeight: 'bold'
    }  
})