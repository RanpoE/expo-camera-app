import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Camera } from 'expo-camera';
import { StyleSheet, Text, View, Pressable, Image, Button } from 'react-native';
import { useFonts } from 'expo-font';
import { CameraIcon, ConfigIcon, FolderIcon, ManIcon, NoIcon, YesIcon } from './assets/images';
import Modal from "react-native-modal";


export default function App() {
  const [cameraPermission, setCameraPermission] = Camera.useCameraPermissions()
  const [type, setTypes] = useState(Camera.Constants.Type.back);
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraRef, setCameraRef] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [fontsLoaded] = useFonts({
    'sao-font': require('./assets/fonts/sao-font.ttf')
  })

  const handleCamera = () => {
    setCameraPermission()
    setCameraActive(true)
    setModalVisible(false)
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  if (!fontsLoaded) {
    return <Text>Loading...</Text>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mobile App</Text>
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
            <Pressable onPress={toggleModal}>
              <Image source={FolderIcon} style={styles.image} />
            </Pressable>
            <Pressable onPress={handleCamera}>
              <Image source={CameraIcon} style={styles.image} />
            </Pressable>
          </View>
      }

      <Modal isVisible={isModalVisible} width={200}>
        <View style={styles.modal}>
          <Text style={styles.modalHeader}>Allow file read</Text>
          <View style={styles.sectionContainer}>
            <Pressable onPress={toggleModal}>
              <Image source={NoIcon} style={styles.image} />
            </Pressable>
            <Pressable onPress={handleCamera}>
              <Image source={YesIcon} style={styles.image} />
            </Pressable>
          </View>
        </View>
      </Modal>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  header: {
    fontSize: 24,
    fontFamily: 'sao-font',
  },
  modalHeader: {
    fontSize: 24,
    fontFamily: 'sao-font',
    color: 'yellow'
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 200,
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 240,
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
  },
  image: {
    height: 70,
    width: 70,
  }
});
