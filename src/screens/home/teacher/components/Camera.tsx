import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import StyledButton from '../../../../components/ui/StyledButton';

interface Props {
  setScanned: (data: any) => void;
}

export default function App({ setScanned }: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScannedState] = useState(false);

  const handleScan = (value: string) => {
    console.log('Scanned');
    setScannedState(true);
    Alert.alert(
      "Escaneado Correctamente",
      "Se agrego a la Asistencia",
      [
        { text: "OK", onPress: () => setScannedState(false) }
      ]
    );
    setScanned(false);
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-center">Necesitamos permiso para acceder a tu cámara</Text>
        <StyledButton onPress={requestPermission}>Conceder permiso</StyledButton>
      </View>
    );
  }

  return (
    <CameraView 
      className="flex-1 w-full h-full"
      barcodeScannerSettings={{
        barcodeTypes: ['qr'],
      }}
      enableTorch
      mode='picture'
      onBarcodeScanned={({ type, data }) => !scanned && handleScan(data)}
    />
  );
}
