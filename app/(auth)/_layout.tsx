import { Stack, Redirect } from "expo-router";
import {useAuth} from "@clerk/expo";

import '@/global.css'
export default function RootLayout() {
    const {isSignedIn, isLoaded} = useAuth();
    if(!isLoaded) return null;
    if(isSignedIn) return <Redirect href={"/"}/>;
    return <Stack screenOptions={{headerShown:false}}/>;
}