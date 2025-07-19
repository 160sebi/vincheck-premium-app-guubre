import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import Button from '../components/Button';
import Icon from '../components/Icon';

interface VehicleData {
  make: string;
  model: string;
  year: number;
  engine: string;
  fuel: string;
  transmission: string;
  bodyType: string;
  euroNorm: string;
  power: string;
  consumption: string;
  emissions: string;
  estimatedValue: string;
  damageHistory: 'clean' | 'minor' | 'major';
  mileage: string;
  countries: string[];
}

export default function VINResults() {
  const { vin } = useLocalSearchParams<{ vin: string }>();
  const [loading, setLoading] = useState(true);
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchVehicleData = async () => {
      console.log('Fetching data for VIN:', vin);
      
      // Mock data - in real app, this would be an API call
      setTimeout(() => {
        setVehicleData({
          make: 'BMW',
          model: '520d xDrive',
          year: 2019,
          engine: '2.0L Diesel',
          fuel: 'Diesel',
          transmission: 'Automată 8 trepte',
          bodyType: 'Sedan',
          euroNorm: 'Euro 6d-TEMP',
          power: '190 CP / 140 kW',
          consumption: '5.2L/100km',
          emissions: '136 g/km CO2',
          estimatedValue: '28.500 - 32.000 €',
          damageHistory: 'minor',
          mileage: '87.450 km',
          countries: ['Germania', 'România'],
        });
        setLoading(false);
      }, 2000);
    };

    fetchVehicleData();
  }, [vin]);

  const getDamageColor = (damage: string) => {
    switch (damage) {
      case 'clean': return colors.success;
      case 'minor': return colors.warning;
      case 'major': return colors.error;
      default: return colors.textMuted;
    }
  };

  const getDamageText = (damage: string) => {
    switch (damage) {
      case 'clean': return 'Fără daune raportate';
      case 'minor': return 'Daune minore detectate';
      case 'major': return 'Daune majore detectate';
      default: return 'Necunoscut';
    }
  };

  if (loading) {
    return (
      <LinearGradient
        colors={[colors.background, '#0D0D0D', colors.background]}
        style={[commonStyles.container, commonStyles.centerContent]}
      >
        <Animatable.View animation="pulse" iterationCount="infinite" style={{ alignItems: 'center' }}>
          <Icon name="car-outline" size={64} style={{ marginBottom: 20, color: colors.primary }} />
          <Text style={[commonStyles.title, { marginBottom: 16 }]}>
            Analizez vehiculul...
          </Text>
          <Text style={[commonStyles.textSecondary, { textAlign: 'center' }]}>
            Fetching car DNA pentru VIN: {vin}
          </Text>
        </Animatable.View>
      </LinearGradient>
    );
  }

  if (!vehicleData) {
    return (
      <LinearGradient
        colors={[colors.background, '#0D0D0D', colors.background]}
        style={[commonStyles.container, commonStyles.centerContent]}
      >
        <Animatable.View animation="fadeIn" style={{ alignItems: 'center' }}>
          <Icon name="alert-circle-outline" size={64} style={{ marginBottom: 20, color: colors.error }} />
          <Text style={[commonStyles.title, { marginBottom: 16 }]}>
            VIN nu a fost găsit
          </Text>
          <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginBottom: 32 }]}>
            Nu am putut găsi informații pentru VIN-ul specificat.
          </Text>
          <Button
            text="Încearcă din nou"
            onPress={() => router.back()}
            style={buttonStyles.primary}
          />
        </Animatable.View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={[colors.background, '#0D0D0D', colors.background]}
      style={commonStyles.container}
    >
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
            Rezultat verificare
          </Text>
          
          <TouchableOpacity
            style={{
              backgroundColor: colors.glass,
              borderRadius: 12,
              padding: 12,
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.2)',
            }}
          >
            <Icon name="share-outline" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Vehicle Header */}
        <Animatable.View animation="fadeInDown" duration={800}>
          <View style={[commonStyles.glassCard, { alignItems: 'center' }]}>
            <Text style={[commonStyles.title, { fontSize: 28, marginBottom: 8 }]}>
              {vehicleData.make} {vehicleData.model}
            </Text>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
              {vehicleData.year} • {vehicleData.fuel} • {vehicleData.euroNorm}
            </Text>
            <Text style={[commonStyles.textMuted, { marginTop: 8 }]}>
              VIN: {vin}
            </Text>
          </View>
        </Animatable.View>

        {/* Technical Details */}
        <Animatable.View animation="fadeInUp" duration={800} delay={200}>
          <View style={commonStyles.card}>
            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <Text style={[commonStyles.text, { fontSize: 20, fontWeight: '600' }]}>
                Detalii tehnice
              </Text>
              <Icon name="settings-outline" size={24} style={{ color: colors.primary }} />
            </View>
            
            <View style={{ gap: 12 }}>
              <View style={commonStyles.row}>
                <Text style={commonStyles.textSecondary}>Motorizare</Text>
                <Text style={commonStyles.text}>{vehicleData.engine}</Text>
              </View>
              <View style={commonStyles.divider} />
              
              <View style={commonStyles.row}>
                <Text style={commonStyles.textSecondary}>Putere</Text>
                <Text style={commonStyles.text}>{vehicleData.power}</Text>
              </View>
              <View style={commonStyles.divider} />
              
              <View style={commonStyles.row}>
                <Text style={commonStyles.textSecondary}>Transmisie</Text>
                <Text style={commonStyles.text}>{vehicleData.transmission}</Text>
              </View>
              <View style={commonStyles.divider} />
              
              <View style={commonStyles.row}>
                <Text style={commonStyles.textSecondary}>Caroserie</Text>
                <Text style={commonStyles.text}>{vehicleData.bodyType}</Text>
              </View>
              <View style={commonStyles.divider} />
              
              <View style={commonStyles.row}>
                <Text style={commonStyles.textSecondary}>Consum mediu</Text>
                <Text style={commonStyles.text}>{vehicleData.consumption}</Text>
              </View>
              <View style={commonStyles.divider} />
              
              <View style={commonStyles.row}>
                <Text style={commonStyles.textSecondary}>Emisii CO2</Text>
                <Text style={commonStyles.text}>{vehicleData.emissions}</Text>
              </View>
            </View>
          </View>
        </Animatable.View>

        {/* Market Value */}
        <Animatable.View animation="fadeInUp" duration={800} delay={400}>
          <View style={commonStyles.card}>
            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <Text style={[commonStyles.text, { fontSize: 20, fontWeight: '600' }]}>
                Estimare valoare piață
              </Text>
              <Icon name="analytics-outline" size={24} style={{ color: colors.secondary }} />
            </View>
            
            <View style={{
              backgroundColor: colors.backgroundAlt,
              borderRadius: 16,
              padding: 20,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: colors.border,
            }}>
              <Text style={[commonStyles.text, { fontSize: 24, fontWeight: '700', color: colors.secondary }]}>
                {vehicleData.estimatedValue}
              </Text>
              <Text style={[commonStyles.textSecondary, { marginTop: 4 }]}>
                Preț estimativ pe piața românească
              </Text>
            </View>
          </View>
        </Animatable.View>

        {/* Damage History */}
        <Animatable.View animation="fadeInUp" duration={800} delay={600}>
          <View style={commonStyles.card}>
            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <Text style={[commonStyles.text, { fontSize: 20, fontWeight: '600' }]}>
                Istoric daune
              </Text>
              <Icon name="shield-checkmark-outline" size={24} style={{ color: getDamageColor(vehicleData.damageHistory) }} />
            </View>
            
            <View style={[
              commonStyles.badge,
              vehicleData.damageHistory === 'clean' && commonStyles.badgeSuccess,
              vehicleData.damageHistory === 'minor' && commonStyles.badgeWarning,
              vehicleData.damageHistory === 'major' && commonStyles.badgeError,
              { marginBottom: 12 }
            ]}>
              <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                {getDamageText(vehicleData.damageHistory)}
              </Text>
            </View>
            
            <View style={commonStyles.row}>
              <Text style={commonStyles.textSecondary}>Kilometraj raportat</Text>
              <Text style={commonStyles.text}>{vehicleData.mileage}</Text>
            </View>
          </View>
        </Animatable.View>

        {/* Registration Countries */}
        <Animatable.View animation="fadeInUp" duration={800} delay={800}>
          <View style={[commonStyles.card, { marginBottom: 40 }]}>
            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <Text style={[commonStyles.text, { fontSize: 20, fontWeight: '600' }]}>
                Țări de înmatriculare
              </Text>
              <Icon name="location-outline" size={24} style={{ color: colors.accent }} />
            </View>
            
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {vehicleData.countries.map((country, index) => (
                <View
                  key={index}
                  style={[
                    commonStyles.badge,
                    { backgroundColor: colors.backgroundAlt, borderWidth: 1, borderColor: colors.border }
                  ]}
                >
                  <Text style={commonStyles.text}>{country}</Text>
                </View>
              ))}
            </View>
          </View>
        </Animatable.View>
      </ScrollView>
    </LinearGradient>
  );
}