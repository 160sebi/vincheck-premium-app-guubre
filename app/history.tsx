import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import Button from '../components/Button';
import Icon from '../components/Icon';

interface SearchHistory {
  id: string;
  vin: string;
  vehicle: string;
  date: string;
  type: 'complete' | 'basic' | 'premium';
  status: 'completed' | 'failed';
}

export default function SearchHistory() {
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);

  useEffect(() => {
    // Mock search history data
    setSearchHistory([
      {
        id: '1',
        vin: 'WBAVA31070NL12345',
        vehicle: 'BMW X5 2020',
        date: '2024-01-15',
        type: 'complete',
        status: 'completed',
      },
      {
        id: '2',
        vin: 'WVWZZZ1JZ3W123456',
        vehicle: 'VW Golf 7 2017',
        date: '2024-01-14',
        type: 'basic',
        status: 'completed',
      },
      {
        id: '3',
        vin: 'WAUZZZ8E7DA123456',
        vehicle: 'Audi A4 2018',
        date: '2024-01-13',
        type: 'premium',
        status: 'failed',
      },
    ]);
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'complete': return colors.primary;
      case 'basic': return colors.secondary;
      case 'premium': return colors.accent;
      default: return colors.textMuted;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'complete': return 'Verificare completă';
      case 'basic': return 'Date tehnice';
      case 'premium': return 'Raport premium';
      default: return 'Necunoscut';
    }
  };

  const handleSearchPress = (search: SearchHistory) => {
    if (search.status === 'completed') {
      router.push({
        pathname: '/results',
        params: { vin: search.vin }
      });
    } else {
      Alert.alert(
        'Verificare eșuată',
        'Această verificare nu s-a finalizat cu succes. Vrei să încerci din nou?',
        [
          { text: 'Anulează', style: 'cancel' },
          {
            text: 'Încearcă din nou',
            onPress: () => router.push({
              pathname: '/results',
              params: { vin: search.vin }
            })
          }
        ]
      );
    }
  };

  const handleDeleteSearch = (id: string) => {
    Alert.alert(
      'Șterge din istoric',
      'Ești sigur că vrei să ștergi această căutare din istoric?',
      [
        { text: 'Anulează', style: 'cancel' },
        {
          text: 'Șterge',
          style: 'destructive',
          onPress: () => {
            setSearchHistory(prev => prev.filter(item => item.id !== id));
          }
        }
      ]
    );
  };

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
            Istoric căutări
          </Text>
          
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Șterge tot istoricul',
                'Ești sigur că vrei să ștergi toate căutările din istoric?',
                [
                  { text: 'Anulează', style: 'cancel' },
                  {
                    text: 'Șterge tot',
                    style: 'destructive',
                    onPress: () => setSearchHistory([])
                  }
                ]
              );
            }}
            style={{
              backgroundColor: colors.glass,
              borderRadius: 12,
              padding: 12,
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.2)',
            }}
          >
            <Icon name="trash-outline" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {searchHistory.length === 0 ? (
          <Animatable.View animation="fadeIn" style={[commonStyles.centerContent, { flex: 1, minHeight: 400 }]}>
            <Icon name="time-outline" size={64} style={{ marginBottom: 20, color: colors.textMuted }} />
            <Text style={[commonStyles.title, { marginBottom: 16 }]}>
              Istoric gol
            </Text>
            <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginBottom: 32 }]}>
              Nu ai efectuat încă nicio căutare. Începe prin a verifica primul VIN.
            </Text>
            <Button
              text="Verifică VIN"
              onPress={() => router.push('/')}
              style={buttonStyles.primary}
            />
          </Animatable.View>
        ) : (
          <View>
            <Animatable.View animation="fadeInDown" duration={800}>
              <Text style={[commonStyles.text, { fontSize: 20, fontWeight: '600', marginBottom: 20 }]}>
                {searchHistory.length} căutări în istoric
              </Text>
            </Animatable.View>

            {searchHistory.map((search, index) => (
              <Animatable.View
                key={search.id}
                animation="fadeInUp"
                duration={800}
                delay={index * 100}
              >
                <TouchableOpacity
                  style={[commonStyles.card, { marginBottom: 12 }]}
                  onPress={() => handleSearchPress(search)}
                >
                  <View style={commonStyles.row}>
                    <View style={{ flex: 1 }}>
                      <View style={[commonStyles.row, { marginBottom: 8 }]}>
                        <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                          {search.vehicle}
                        </Text>
                        <View style={[
                          commonStyles.badge,
                          { backgroundColor: getTypeColor(search.type) }
                        ]}>
                          <Text style={[commonStyles.textMuted, { fontSize: 10, fontWeight: '600' }]}>
                            {getTypeText(search.type)}
                          </Text>
                        </View>
                      </View>
                      
                      <Text style={[commonStyles.textSecondary, { marginBottom: 4 }]}>
                        VIN: {search.vin}
                      </Text>
                      
                      <View style={commonStyles.row}>
                        <Text style={commonStyles.textMuted}>
                          {new Date(search.date).toLocaleDateString('ro-RO')}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Icon
                            name={search.status === 'completed' ? 'checkmark-circle-outline' : 'alert-circle-outline'}
                            size={16}
                            style={{
                              color: search.status === 'completed' ? colors.success : colors.error,
                              marginRight: 4
                            }}
                          />
                          <Text style={[
                            commonStyles.textMuted,
                            { color: search.status === 'completed' ? colors.success : colors.error }
                          ]}>
                            {search.status === 'completed' ? 'Completă' : 'Eșuată'}
                          </Text>
                        </View>
                      </View>
                    </View>
                    
                    <TouchableOpacity
                      onPress={() => handleDeleteSearch(search.id)}
                      style={{
                        backgroundColor: colors.backgroundAlt,
                        borderRadius: 8,
                        padding: 8,
                        marginLeft: 12,
                      }}
                    >
                      <Icon name="trash-outline" size={20} style={{ color: colors.error }} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </Animatable.View>
            ))}
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}