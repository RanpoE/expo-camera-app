import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Camera } from 'expo-camera';
import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';


export default function App() {
  const [cameraPermission, setCameraPermission] = Camera.useCameraPermissions()
  const [type, setTypes] = useState(Camera.Constants.Type.back);
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraRef, setCameraRef] = useState(null);

  const handleCamera = () => {
    setCameraPermission()
    setCameraActive(true)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Camera app template</Text>
      {
        cameraActive ?
          <View style={styles.cameraContainer}>
            <Camera style={styles.camera} type={type} ref={ref => setCameraRef(ref)} />
            <Pressable onPress={() => setCameraActive(false)}>
              <Text>Cancel</Text>
            </Pressable>
            <Pressable>
              <Text>Capture</Text>
            </Pressable>
          </View>
          :
          <View style={styles.sectionContainer}>
            <Text>Upload a file</Text>
            <Pressable onPress={handleCamera}>
              <Text>Use camera</Text>
            </Pressable>
          </View>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    top: 10,
    color: 'red',
    fontSize: 16
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 240,
    height: 320,
    alignItems: 'center'
  },
  cameraContainer: {
    top: 20,
    width: 240,
    height: 350,
    borderRadius: 20,
    border: '1px solid red',
    padding: 20,
  },
  camera: {
  }
});
