import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import Button from '../components/Button';
import Icon from '../components/Icon';

export default function VINCheckHome() {
  const [vinInput, setVinInput] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_800ExtraBold,
  });

  useEffect(() => {
    // Load recent searches from storage (mock data for now)
    setRecentSearches(['BMW X5 2020', 'VW Golf 7 2017', 'Audi A4 2018']);
  }, []);

  const handleVINSubmit = () => {
    if (vinInput.length < 17) {
      Alert.alert('VIN Invalid', 'VIN-ul trebuie să aibă 17 caractere');
      return;
    }
    console.log('Checking VIN:', vinInput);
    router.push({
      pathname: '/results',
      params: { vin: vinInput }
    });
  };

  const handleScanVIN = () => {
    console.log('Opening camera scanner');
    router.push('/scanner');
  };

  const handleRecentSearch = (search: string) => {
    console.log('Opening recent search:', search);
    router.push({
      pathname: '/results',
      params: { vin: search }
    });
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient
      colors={[colors.background, '#0D0D0D', colors.background]}
      style={commonStyles.container}
    >
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animatable.View animation="fadeInDown" duration={1000} style={{ marginTop: 40 }}>
          <View style={{ alignItems: 'center', marginBottom: 40 }}>
            <Text style={[commonStyles.title, { fontFamily: 'Inter_800ExtraBold' }]}>
              VIN<Text style={{ color: colors.primary }}>Check</Text>
            </Text>
            <Text style={[commonStyles.subtitle, { fontFamily: 'Inter_400Regular' }]}>
              Verifică mașina rapid și profesional
            </Text>
          </View>
        </Animatable.View>

        {/* VIN Input Section */}
        <Animatable.View animation="fadeInUp" duration={1000} delay={200}>
          <View style={commonStyles.glassCard}>
            <Text style={[commonStyles.text, { fontFamily: 'Inter_600SemiBold', marginBottom: 16 }]}>
              Introdu VIN-ul vehiculului
            </Text>
            
            <TextInput
              style={[
                commonStyles.input,
                isInputFocused && commonStyles.inputFocused,
                { fontFamily: 'Inter_400Regular' }
              ]}
              placeholder="Exemplu: WBAVA31070NL12345"
              placeholderTextColor={colors.textMuted}
              value={vinInput}
              onChangeText={setVinInput}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              maxLength={17}
              autoCapitalize="characters"
              autoCorrect={false}
            />
            
            <Text style={[commonStyles.textMuted, { marginBottom: 20, fontFamily: 'Inter_400Regular' }]}>
              VIN-ul are exact 17 caractere alfanumerice
            </Text>

            <View style={{ gap: 12 }}>
              <Button
                text="🔍 Verifică VIN-ul"
                onPress={handleVINSubmit}
                style={buttonStyles.primary}
                textStyle={{ fontFamily: 'Inter_600SemiBold', fontSize: 16 }}
              />
              
              <Button
                text="📷 Scanează cu camera"
                onPress={handleScanVIN}
                style={buttonStyles.glass}
                textStyle={{ fontFamily: 'Inter_600SemiBold', fontSize: 16, color: colors.text }}
              />
            </View>
          </View>
        </Animatable.View>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <Animatable.View animation="fadeInUp" duration={1000} delay={400}>
            <View style={[commonStyles.card, { marginTop: 20 }]}>
              <View style={[commonStyles.row, { marginBottom: 16 }]}>
                <Text style={[commonStyles.text, { fontFamily: 'Inter_600SemiBold' }]}>
                  Căutări recente
                </Text>
                <Icon name="time-outline" size={20} />
              </View>
              
              {recentSearches.map((search, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    backgroundColor: colors.backgroundAlt,
                    borderRadius: 12,
                    marginBottom: 8,
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}
                  onPress={() => handleRecentSearch(search)}
                >
                  <View style={commonStyles.row}>
                    <Text style={[commonStyles.text, { fontFamily: 'Inter_400Regular' }]}>
                      {search}
                    </Text>
                    <Icon name="chevron-forward-outline" size={16} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </Animatable.View>
        )}

        {/* Features Preview */}
        <Animatable.View animation="fadeInUp" duration={1000} delay={600}>
          <View style={[commonStyles.card, { marginTop: 20, marginBottom: 40 }]}>
            <Text style={[commonStyles.text, { fontFamily: 'Inter_600SemiBold', marginBottom: 16 }]}>
              Ce vei afla despre mașină:
            </Text>
            
            <View style={{ gap: 12 }}>
              <View style={commonStyles.row}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <Icon name="car-outline" size={20} style={{ marginRight: 12 }} />
                  <Text style={[commonStyles.textSecondary, { fontFamily: 'Inter_400Regular' }]}>
                    Date tehnice complete
                  </Text>
                </View>
              </View>
              
              <View style={commonStyles.row}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <Icon name="analytics-outline" size={20} style={{ marginRight: 12 }} />
                  <Text style={[commonStyles.textSecondary, { fontFamily: 'Inter_400Regular' }]}>
                    Estimare valoare piață
                  </Text>
                </View>
              </View>
              
              <View style={commonStyles.row}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <Icon name="shield-checkmark-outline" size={20} style={{ marginRight: 12 }} />
                  <Text style={[commonStyles.textSecondary, { fontFamily: 'Inter_400Regular' }]}>
                    Istoric daune și kilometraj
                  </Text>
                </View>
              </View>
              
              <View style={commonStyles.row}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <Icon name="location-outline" size={20} style={{ marginRight: 12 }} />
                  <Text style={[commonStyles.textSecondary, { fontFamily: 'Inter_400Regular' }]}>
                    Țări de înmatriculare
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Animatable.View>
      </ScrollView>
    </LinearGradient>
  );
}