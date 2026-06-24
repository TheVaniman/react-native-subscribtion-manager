import {View, Text} from 'react-native'
import React from 'react'
import {Link} from "expo-router"

const Onboarding = () => {
    return (
        <View>
            <Text>Onboarding</Text>
            <Link href="/../onboarding"> Go to onboarding</Link>
        </View>
    )
}
export default Onboarding
