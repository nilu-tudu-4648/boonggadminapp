import { ToastAndroid } from "react-native";

export function convertBytesToMB(bytes) {
    const mb = bytes / (1024 * 1024);
    if (mb > 2) {
      ToastAndroid.show('File size exceeds 2 MB limit', ToastAndroid.SHORT);
    }
    return Number(mb.toFixed(3));
  }