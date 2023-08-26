import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Camera } from 'expo-camera';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default function App() {
  const [cameraPermission, setCameraPermission] = Camera.useCameraPermissions()
  const [type, setTypes] = useState(Camera.Constants.Type.back);
  const [cameraActive, setcameraActive] = useState(false)
  const [cameraRef, setCameraRef] = useState(null);

  if (cameraPermission === null) {
    setCameraPermission()
  }

  return (
    <View style={styles.container}>
      <Text>Camera app template</Text>
      {
        cameraActive &&
        <View style={styles.cameraContainer}>
          <Camera style={styles.camera} type={type} ref={ref => setCameraRef(ref)} />
          <TouchableOpacity style={{ width: 100 }} onPress={() => alert()}>
            <Text>Capture Image</Text>
          </TouchableOpacity>
        </View>
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraContainer: {
    width: 240,
    height: 320,
    borderRadius: 20,
    border: '1px solid red',
    padding: 20,
  },
  camera: {
  }
});
