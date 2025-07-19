import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import Button from '../components/Button';
import Icon from '../components/Icon';

export default function VINScanner() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    if (scanned) return;
    
    setScanned(true);
    console.log('Scanned VIN:', data);
    
    // Validate VIN format (17 characters, alphanumeric)
    if (data.length === 17 && /^[A-HJ-NPR-Z0-9]{17}$/i.test(data)) {
      Alert.alert(
        'VIN Detectat',
        `VIN: ${data}`,
        [
          {
            text: 'Scanează din nou',
            onPress: () => setScanned(false),
            style: 'cancel',
          },
          {
            text: 'Verifică',
            onPress: () => {
              router.push({
                pathname: '/results',
                params: { vin: data }
              });
            },
          },
        ]
      );
    } else {
      Alert.alert(
        'VIN Invalid',
        'Codul scanat nu pare să fie un VIN valid. Încearcă din nou.',
        [
          {
            text: 'OK',
            onPress: () => setScanned(false),
          },
        ]
      );
    }
  };

  if (hasPermission === null) {
    return (
      <View style={[commonStyles.container, commonStyles.centerContent]}>
        <Text style={commonStyles.text}>Se solicită permisiunea pentru cameră...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <LinearGradient
        colors={[colors.background, '#0D0D0D', colors.background]}
        style={[commonStyles.container, commonStyles.centerContent]}
      >
        <Animatable.View animation="fadeIn" style={{ alignItems: 'center' }}>
          <Icon name="camera-outline" size={64} style={{ marginBottom: 20, color: colors.textMuted }} />
          <Text style={[commonStyles.title, { marginBottom: 16 }]}>
            Acces cameră necesar
          </Text>
          <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginBottom: 32 }]}>
            Pentru a scana VIN-ul, aplicația are nevoie de acces la cameră.
          </Text>
          <Button
            text="Înapoi"
            onPress={() => router.back()}
            style={buttonStyles.secondary}
          />
        </Animatable.View>
      </LinearGradient>
    );
  }

  return (
    <View style={commonStyles.container}>
      <CameraView
        style={{ flex: 1 }}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr', 'pdf417', 'datamatrix', 'code128', 'code39'],
        }}
      >
        {/* Overlay */}
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
          {/* Header */}
          <View style={{
            paddingTop: 60,
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}>
            <View style={commonStyles.row}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={{
                  backgroundColor: colors.glass,
                  borderRadius: 12,
                  padding: 12,
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
              >
                <Icon name="arrow-back-outline" size={24} />
              </TouchableOpacity>
              
              <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '600' }]}>
                Scanează VIN
              </Text>
              
              <TouchableOpacity
                onPress={() => setIsScanning(!isScanning)}
                style={{
                  backgroundColor: colors.glass,
                  borderRadius: 12,
                  padding: 12,
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
              >
                <Icon name={isScanning ? "pause-outline" : "play-outline"} size={24} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Scanning Area */}
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Animatable.View
              animation="pulse"
              iterationCount="infinite"
              duration={2000}
              style={{
                width: 280,
                height: 160,
                borderWidth: 3,
                borderColor: colors.primary,
                borderRadius: 20,
                backgroundColor: 'rgba(0, 102, 255, 0.1)',
              }}
            >
              <View style={{
                position: 'absolute',
                top: -1,
                left: -1,
                right: -1,
                bottom: -1,
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: 20,
              }} />
              
              {/* Corner indicators */}
              <View style={{
                position: 'absolute',
                top: 10,
                left: 10,
                width: 20,
                height: 20,
                borderTopWidth: 3,
                borderLeftWidth: 3,
                borderColor: colors.secondary,
              }} />
              <View style={{
                position: 'absolute',
                top: 10,
                right: 10,
                width: 20,
                height: 20,
                borderTopWidth: 3,
                borderRightWidth: 3,
                borderColor: colors.secondary,
              }} />
              <View style={{
                position: 'absolute',
                bottom: 10,
                left: 10,
                width: 20,
                height: 20,
                borderBottomWidth: 3,
                borderLeftWidth: 3,
                borderColor: colors.secondary,
              }} />
              <View style={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                width: 20,
                height: 20,
                borderBottomWidth: 3,
                borderRightWidth: 3,
                borderColor: colors.secondary,
              }} />
            </Animatable.View>
          </View>

          {/* Instructions */}
          <View style={{
            paddingHorizontal: 20,
            paddingBottom: 60,
            alignItems: 'center',
          }}>
            <View style={[commonStyles.glassCard, { alignItems: 'center' }]}>
              <Text style={[commonStyles.text, { textAlign: 'center', marginBottom: 8 }]}>
                Poziționează VIN-ul în cadru
              </Text>
              <Text style={[commonStyles.textSecondary, { textAlign: 'center' }]}>
                VIN-ul se află de obicei pe bordul de bord sau pe ușa șoferului
              </Text>
            </View>
          </View>
        </View>
      </CameraView>
    </View>
  );
}