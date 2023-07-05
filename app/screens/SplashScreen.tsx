import { Image, StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('screen')
const SplashScreen = () => {
     return (
        <View style={{ flex: 1, alignItems: "center", backgroundColor: 'black', padding: 4, justifyContent: 'space-between', paddingVertical: 20 }}>
            <Image resizeMode='contain' style={{ width: width * .85 }} source={require('../assets/bike1.gif')} />
            <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold', top: - width * .2 }}>Boongg Partner App</Text>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: '400' }}>Please Wait, We are setting up </Text>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: '400' }}>Your app </Text>
            </View>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({})