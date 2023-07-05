import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import routes from './routes'
import { createStackNavigator } from '@react-navigation/stack';
import OtpComponentScreen from '@/screens/CreateBookingPages/OtpComponentScreen';
import SignUpComponentScreen from '@/screens/CreateBookingPages/SignUpComponent';
import MobileInputScreen from '@/screens/CreateBookingPages/MobileInputScreen';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import tw from "@/lib/tailwind";
import AppText from '@/components/AppText';
import CreateBookingPayScreen from '@/screens/CreateBookingPages/CreateBookingPayScreen';
import CheckInScreen from '@/screens/CreateBookingPages/CheckInScreen';
import CreateBookingScreen from '@/screens/CreateBookingPages/CreateBookingScreen';
import StepIndicator from 'react-native-step-indicator';
import { useAppSelector } from '@/hooks/useAppSelector';
import VehiclePhotosScreen from '@/screens/CreateBookingPages/VehiclePhotosScreen';
import VerifyDocuments1 from '@/screens/CreateBookingPages/VerifyDocuments1';
import OpenCameraScreen from '@/screens/CreateBookingPages/OpenCameraScreen';
import RiderDetailsScreen from '@/screens/CreateBookingPages/RiderDetailsScreen';
import DifferentRiderScreen from '@/screens/CreateBookingPages/DifferentRiderScreen';
import VerifyDocuments2 from '@/screens/CreateBookingPages/VerifyDocuments2';
const Stack = createStackNavigator();
const getStepIndicatorIconConfig = ({
    position,
    stepStatus,
}: {
    position: number;
    stepStatus: string;
}) => {
    const iconConfig = {
        name: 'feed',
        color: stepStatus === 'finished' ? '#ffffff' : '#7B6FFF',
        size: 15,
    };
    switch (position) {
        case 0: {
            iconConfig.name = 'directions-bike';
            break;
        }
        case 1: {
            iconConfig.name = 'payment';
            break;
        }
        case 2: {
            iconConfig.name = 'location-on';
            break;
        }
        default: {
            break;
        }
    }
    return iconConfig;
};
const CreateBookingNavigator = () => {
    const { stepCountValue } = useAppSelector((state) => state.entities.createBooking);
    const labels = ["Select Bike", "Payment", "Check Out"];
    const customStyles = {
        stepIndicatorSize: 25,
        currentStepIndicatorSize: 30,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 2,
        stepStrokeCurrentColor: '#7B6FFF',
        stepStrokeWidth: 2,
        stepStrokeFinishedColor: '#7B6FFF',
        stepStrokeUnFinishedColor: '#aaaaaa',
        separatorFinishedColor: '#7B6FFF',
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: '#7B6FFF',
        stepIndicatorUnFinishedColor: '#ffffff',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 10,
        currentStepIndicatorLabelFontSize: 12,
        stepIndicatorLabelCurrentColor: '#7B6FFF',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: '#aaaaaa',
        labelColor: '#999999',
        labelSize: 9,
        currentStepLabelColor: '#7B6FFF'
    }
    const renderStepIndicator = (params: any) => (
        <MaterialIcons {...getStepIndicatorIconConfig(params)} />
    );
    return (
        <Stack.Navigator
            screenOptions={({ navigation, route }) => ({
                gestureDirection: 'horizontal',
                cardStyleInterpolator: ({ current, layouts }: any) => {
                    return {
                        cardStyle: {
                            transform: [
                                {
                                    translateX: current.progress.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [layouts.screen.width, 0],
                                    }),
                                },
                            ],
                        },
                    };
                },
                header: ({ navigation }) => (
                    <View style={[tw`w-full`, { backgroundColor: 'white', overflow: 'hidden' }]}>
                        <View style={{ flexDirection: 'row', padding: 15, alignItems: 'center', justifyContent: 'space-between', height: 90, top: 8 }}>
                            <Ionicons name="arrow-back" size={30} color="black" onPress={() => navigation.goBack()} />
                            <AppText style={[tw`font-semibold text-lg`]}>Boongg</AppText>
                            <View style={{ width: 25, height: 25 }} />
                        </View>
                        {
                            route.name !== routes.CAMERA_SCREEN.route && route.name !== routes.CUSTOMERS_DETAILS_SCREEN.route &&
                            <>
                                {
                                    stepCountValue !== -1 &&
                                    <View style={tw`bg-white my-1`}>
                                        <StepIndicator
                                            customStyles={customStyles}
                                            currentPosition={stepCountValue}
                                            labels={labels}
                                            renderStepIndicator={renderStepIndicator}
                                            stepCount={3}
                                        />
                                    </View>
                                }
                            </>
                        }
                    </View>
                ),
            })}
        >
            <Stack.Screen
                name={routes.MOBILENO_INPUT_SCREEN.route}
                component={MobileInputScreen} />
            <Stack.Screen
                name={routes.DIFFERENT_RIDER_SCREEN.route}
                component={DifferentRiderScreen} />
            <Stack.Screen
                name={routes.VERIFY_DOCUMENTS_SCREEN1.route}
                component={VerifyDocuments1} />
            <Stack.Screen
                name={routes.CUSTOMERS_DETAILS_SCREEN.route}
                component={RiderDetailsScreen} />
            <Stack.Screen
                name={routes.VERIFY_DOCUMENTS_SCREEN2.route}
                component={VerifyDocuments2} />

            <Stack.Screen
                name={routes.CHECKIN_SCREEN.route}
                component={CheckInScreen}
            />
            <Stack.Screen
                name={routes.CAMERA_SCREEN.route}
                component={OpenCameraScreen} />
            <Stack.Screen
                name={routes.VEHICLE_PHOTOS_SCREEN.route}
                options={{
                    headerShown: false,
                }}
                component={VehiclePhotosScreen} />
            <Stack.Screen
                name={routes.SIGNUP_COMPONENT_SCREEN.route}
                component={SignUpComponentScreen}
            />
            <Stack.Screen
                name={routes.OTP_COMPONENT_SCREEN.route}
                component={OtpComponentScreen}
            />
            <Stack.Screen
                name={routes.CREATEBOOKINGPAYSCREEN.route}
                component={CreateBookingPayScreen}
            />
            <Stack.Screen
                name={routes.CREATE_BOOKING.route}
                component={CreateBookingScreen} />

        </Stack.Navigator>
    )
}

export default CreateBookingNavigator

const styles = StyleSheet.create({})