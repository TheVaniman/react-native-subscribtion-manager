import "@/global.css"
import { Text, View, Image} from "react-native";
import {Link} from "expo-router"
import {SafeAreaView as RNSafeAreaView} from "react-native-safe-area-context";
import {styled} from "nativewind";
import images from '@/constants/images'
import {HOME_USER, HOME_BALANCE, UPCOMING_SUBSCRIPTIONS, HOME_SUBSCRIPTIONS} from "@/constants/data";
import {icons} from "@/constants/icons";
import {formatCurrency} from "@/lib/utils";
import dayjs from "dayjs";
import ListHeading from "@/components/ListHeading";
import {FlatList} from "react-native";
import SubscriptionCard from "@/components/SubscriptionCard";
import {useState} from "react";
import UpcomingSubscriptionsCard from "@/components/UpcomingSubscriptionsCard";
const SafeAreaView = styled(RNSafeAreaView);

export default function App() {

    const [expandedSubscription, setExpandedSubscription] = useState<string | null>(null);

    return (
        <SafeAreaView className={"flex-1 bg-background p-5"}>
                <FlatList
                    ListHeaderComponent={() => (
                        <>
                            <View className={"home-header"}>
                                <View className = "home-user">
                                    <Image source ={images.avatar} className={"home-avatar"}/>
                                    <Text className={"home-user-name"}> {HOME_USER.name}</Text>
                                </View>

                                <Image source={icons.add} className={"home-add-icon"}/>

                            </View>
                            <View className={"home-balance-card"}>
                                <Text className={"home-balance-label"}>
                                    Balance
                                </Text>
                                <View className={"home-balance-row"}>
                                    <Text className={"home-balance-amount"}>
                                        {formatCurrency(HOME_BALANCE.amount)}
                                    </Text>

                                    <Text className={"home-balance-date"}>
                                        {dayjs(HOME_BALANCE.nextRenewalDate).format("MM/DD")}
                                    </Text>
                                </View>

                            </View>

                            <View className={"mb-5"}>
                                <ListHeading title={"Upcoming"}/>
                                <FlatList
                                    data={UPCOMING_SUBSCRIPTIONS}
                                    renderItem={({ item }) => {
                                        const value = Number(item.price);
                                        if(isNaN(value)) return null;
                                        return <UpcomingSubscriptionsCard {...item} />}}
                                    keyExtractor={(item) => item.id}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    ListEmptyComponent={<Text className="home-empty-state">No upcoming renewals yet.</Text>}
                                />


                                <UpcomingSubscriptionsCard data={UPCOMING_SUBSCRIPTIONS[0]}/>

                            </View>

                            <ListHeading title={"All Subscriptions"}/>

                        </>
                    )}
                    data={HOME_SUBSCRIPTIONS}
                    keyExtractor={(item) => item.id}
                    renderItem={
                        ({item}) => (
                            <SubscriptionCard
                                {... item}
                                expanded={expandedSubscription === item.id}
                                onPress={() => setExpandedSubscription(expandedSubscription === item.id ? null : item.id)}

                            />
                        )

                }
                    extraData={expandedSubscription}
                    ItemSeparatorComponent={() => <View className="h-4"/>}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<Text className="home-empty-state">No subscriptions yet.</Text>}
                    contentContainerStyle={{paddingBottom: 60}}

                />


        </SafeAreaView>
    );

}
