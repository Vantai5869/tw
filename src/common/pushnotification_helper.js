import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    GetFCMToken();
  }
}

export async function GetFCMToken(){
  console.log("---------------------------fcmtoken-------------")
  let fcmtoken = await AsyncStorage.getItem("fcmtoken");
  if(!fcmtoken) {
    try {
       fcmtoken =await messaging().getToken();
      if(fcmtoken){
        AsyncStorage.setItem("fcmtoken", fcmtoken);
      }
    } catch (error ) {
      console.log(error, "error in fcmtoken");
    }
  }
  
  console.log(fcmtoken)
  console.log("---------------------------fcmtoken-------------")
}


export const NotificationListener =()=>{
  // Assume a message-notification contains a "type" property in the data payload of the screen to open

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    navigation.navigate(remoteMessage.data.type);
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
    });

  messaging().onMessage(async remoteMessage=>{
    console.log("notification on froground state ...",remoteMessage)
  })


}