
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import axios from 'axios';
import { apiPaths } from '@/api/apiPaths';

export async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getDevicePushTokenAsync()).data; //for firebase
        // token = (await Notifications.getExpoPushTokenAsync()).data; // for expo
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}

export async function sendnotification() {
    const token = (await Notifications.getExpoPushTokenAsync()).data; // for expo
    try {
        const config = {
            method: 'post',
            url: 'https://exp.host/--/api/v2/push/send',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "to": token,
                "sound": "default",
                "title": "Welcome",
                "body": "Hello User welcome to Boongg!"
            }
        };
        const { data } = await axios(config)
        console.log(data)
        const configs = {
            method: 'post',
            url: `${apiPaths.prod.url}/api/notification`,
            headers: {
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVhYTRmODhhMGUxNGMzNjFlZTk1ZjQ5MyIsInVzZXJuYW1lIjoiS290aHJ1ZDAwMSIsIm1vYmlsZU51bWJlciI6IjkwMTE1ODkzMzMiLCJlbWFpbCI6ImtvdGhydWRAYm9vbmdnLmNvbSIsInJvbGUiOiJTVE9SRV9BRE1JTiIsIl9zdG9yZSI6IjVhNjc3ZjI3NjM5NTQxMzJkZmMwZDU3YiIsIl9fdiI6MCwiZnJhbmNoaXNlVHlwZSI6IlNJTFZFUl9GUkFOQ0hJU0UifSwiaWF0IjoxNjY2MTY2MzcwfQ.8AWt9GlEedquxI7smuLhFeuKfz8KWY42uqlHnedHc4I',
                'Content-Type': 'application/json'
            },
            data: {
                "to": token,
                "memberId": `${Math.random()}`,
                "title": "Welcome",
                "body": "Hello User welcome to Boongg!"
            }
        };
        const response = await axios(configs)
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }

}