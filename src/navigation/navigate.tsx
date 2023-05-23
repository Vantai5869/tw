import * as React from "react";
import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from "@react-navigation/native";

let activeScreen: string;

export const isReadyRef = React.createRef();

export const navigationRef = createNavigationContainerRef();

export function navigate(name: never, params: never) {
  if (navigationRef.isReady()) {
    navigationRef.navigate<never>(name, params);
  }
}

// export const navigationRef = React.createRef();

// export function navigate(name: string, params?: any) {
//   navigationRef.current?.navigate(name, params);
// }
export function push(name: string, params: object) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(name, params));
  }
}

export function goBack() {
  navigationRef.current?.goBack();
}

export function reset(name: string, params?: any) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name, params }],
    })
  );
}

export function setActiveScreen(_activeScreen: string) {
  activeScreen = _activeScreen;
}

export function getActiveScreen() {
  return activeScreen;
}
