import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, Modal, Dimensions } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import Button from '../components/Button';
import Icon from '../components/Icon';

const { width } = Dimensions.get('window');

interface InsuranceClaim {
  id: string;
  date: string;
  type: 'collision' | 'theft' | 'vandalism' | 'weather' | 'other';
  severity: 'minor' | 'moderate' | 'major' | 'total';
  description: string;
  amount: string;
  photos: string[];
  repairShop?: string;
  status: 'settled' | 'pending' | 'rejected';
}

interface FactoryOptions {
  exterior: string[];
  interior: string[];
  safety: string[];
  comfort: string[];
  technology: string[];
}

interface VehicleHistory {
  wasTaxi: boolean;
  wasStolen: boolean;
  steeringWheelSide: 'left' | 'right';
  previousOwners: number;
  serviceHistory: {
    lastService: string;
    serviceCount: number;
    dealerServices: number;
  };
}

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
  insuranceClaims: InsuranceClaim[];
  factoryOptions: FactoryOptions;
  vehicleHistory: VehicleHistory;
}

export default function VINResults() {
  const { vin } = useLocalSearchParams<{ vin: string }>();
  const [loading, setLoading] = useState(true);
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [expandedClaim, setExpandedClaim] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchVehicleData = async () => {
      console.log('Fetching enhanced data for VIN:', vin);
      
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
          insuranceClaims: [
            {
              id: '1',
              date: '15.03.2022',
              type: 'collision',
              severity: 'minor',
              description: 'Zgârietură pe bara din spate în parcare',
              amount: '850 €',
              photos: [
                'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
                'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400'
              ],
              repairShop: 'BMW Service Center București',
              status: 'settled'
            },
            {
              id: '2',
              date: '08.11.2021',
              type: 'vandalism',
              severity: 'moderate',
              description: 'Geam lateral spart și zgârieturi pe caroserie',
              amount: '1.250 €',
              photos: [
                'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400'
              ],
              repairShop: 'Auto Glass Pro',
              status: 'settled'
            }
          ],
          factoryOptions: {
            exterior: [
              'Faruri LED adaptive',
              'Jante aliaj 18"',
              'Vopsea metalică Storm Bay',
              'Praguri laterale M Sport',
              'Evacuare sport dublă'
            ],
            interior: [
              'Tapițerie piele Dakota negru',
              'Scaune sport cu reglaj electric',
              'Volan M Sport cu încălzire',
              'Plafon panoramic',
              'Iluminare ambientală'
            ],
            safety: [
              'Sistem de frânare automată',
              'Avertizare părăsire bandă',
              'Asistent parcare cu cameră',
              'Airbag-uri laterale spate',
              'Control stabilitate DSC'
            ],
            comfort: [
              'Climatizare automată cu 3 zone',
              'Scaune cu încălzire față/spate',
              'Sistem keyless entry',
              'Senzori ploaie și lumină',
              'Oglinzi retractabile electric'
            ],
            technology: [
              'Sistem infotainment iDrive 7.0',
              'Navigație GPS cu actualizări live',
              'Apple CarPlay / Android Auto',
              'Sistem audio Harman Kardon',
              'Head-up display'
            ]
          },
          vehicleHistory: {
            wasTaxi: false,
            wasStolen: false,
            steeringWheelSide: 'left',
            previousOwners: 2,
            serviceHistory: {
              lastService: '12.01.2024',
              serviceCount: 8,
              dealerServices: 6
            }
          }
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

  const getClaimTypeIcon = (type: string) => {
    switch (type) {
      case 'collision': return 'car-outline';
      case 'theft': return 'lock-closed-outline';
      case 'vandalism': return 'hammer-outline';
      case 'weather': return 'rainy-outline';
      default: return 'alert-circle-outline';
    }
  };

  const getClaimTypeText = (type: string) => {
    switch (type) {
      case 'collision': return 'Coliziune';
      case 'theft': return 'Furt';
      case 'vandalism': return 'Vandalism';
      case 'weather': return 'Fenomene meteo';
      default: return 'Altele';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'minor': return colors.success;
      case 'moderate': return colors.warning;
      case 'major': return colors.error;
      case 'total': return '#8B0000';
      default: return colors.textMuted;
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

        {/* Vehicle History Status */}
        <Animatable.View animation="fadeInUp" duration={800} delay={100}>
          <View style={commonStyles.card}>
            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <Text style={[commonStyles.text, { fontSize: 20, fontWeight: '600' }]}>
                Istoric vehicul
              </Text>
              <Icon name="document-text-outline" size={24} style={{ color: colors.accent }} />
            </View>
            
            <View style={{ gap: 12 }}>
              <View style={commonStyles.row}>
                <Text style={commonStyles.textSecondary}>Utilizare taxi</Text>
                <View style={[
                  commonStyles.badge,
                  vehicleData.vehicleHistory.wasTaxi ? commonStyles.badgeError : commonStyles.badgeSuccess
                ]}>
                  <Text style={[commonStyles.text, { fontWeight: '600', fontSize: 12 }]}>
                    {vehicleData.vehicleHistory.wasTaxi ? 'DA' : 'NU'}
                  </Text>
                </View>
              </View>
              <View style={commonStyles.divider} />
              
              <View style={commonStyles.row}>
                <Text style={commonStyles.textSecondary}>Vehicul furat</Text>
                <View style={[
                  commonStyles.badge,
                  vehicleData.vehicleHistory.wasStolen ? commonStyles.badgeError : commonStyles.badgeSuccess
                ]}>
                  <Text style={[commonStyles.text, { fontWeight: '600', fontSize: 12 }]}>
                    {vehicleData.vehicleHistory.wasStolen ? 'DA' : 'NU'}
                  </Text>
                </View>
              </View>
              <View style={commonStyles.divider} />
              
              <View style={commonStyles.row}>
                <Text style={commonStyles.textSecondary}>Poziție volan</Text>
                <Text style={commonStyles.text}>
                  {vehicleData.vehicleHistory.steeringWheelSide === 'left' ? 'Stânga' : 'Dreapta'}
                </Text>
              </View>
              <View style={commonStyles.divider} />
              
              <View style={commonStyles.row}>
                <Text style={commonStyles.textSecondary}>Proprietari anteriori</Text>
                <Text style={commonStyles.text}>{vehicleData.vehicleHistory.previousOwners}</Text>
              </View>
            </View>
          </View>
        </Animatable.View>

        {/* Factory Options */}
        <Animatable.View animation="fadeInUp" duration={800} delay={200}>
          <View style={commonStyles.card}>
            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <Text style={[commonStyles.text, { fontSize: 20, fontWeight: '600' }]}>
                Dotări din fabrică
              </Text>
              <Icon name="construct-outline" size={24} style={{ color: colors.secondary }} />
            </View>
            
            {Object.entries(vehicleData.factoryOptions).map(([category, options]) => (
              <View key={category} style={{ marginBottom: 16 }}>
                <Text style={[commonStyles.text, { fontSize: 16, fontWeight: '600', marginBottom: 8, textTransform: 'capitalize' }]}>
                  {category === 'exterior' ? 'Exterior' :
                   category === 'interior' ? 'Interior' :
                   category === 'safety' ? 'Siguranță' :
                   category === 'comfort' ? 'Confort' : 'Tehnologie'}
                </Text>
                <View style={{ gap: 6 }}>
                  {options.map((option, index) => (
                    <View key={index} style={[commonStyles.row, { alignItems: 'flex-start' }]}>
                      <Icon name="checkmark-circle" size={16} style={{ color: colors.success, marginTop: 2 }} />
                      <Text style={[commonStyles.textSecondary, { flex: 1, marginLeft: 8 }]}>
                        {option}
                      </Text>
                    </View>
                  ))}
                </View>
                {category !== 'technology' && <View style={[commonStyles.divider, { marginTop: 12 }]} />}
              </View>
            ))}
          </View>
        </Animatable.View>

        {/* Insurance Claims */}
        <Animatable.View animation="fadeInUp" duration={800} delay={300}>
          <View style={commonStyles.card}>
            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <Text style={[commonStyles.text, { fontSize: 20, fontWeight: '600' }]}>
                Daune asigurare ({vehicleData.insuranceClaims.length})
              </Text>
              <Icon name="shield-outline" size={24} style={{ color: colors.warning }} />
            </View>
            
            {vehicleData.insuranceClaims.map((claim, index) => (
              <View key={claim.id} style={{ marginBottom: index < vehicleData.insuranceClaims.length - 1 ? 16 : 0 }}>
                <TouchableOpacity
                  onPress={() => setExpandedClaim(expandedClaim === claim.id ? null : claim.id)}
                  style={{
                    backgroundColor: colors.backgroundAlt,
                    borderRadius: 12,
                    padding: 16,
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}
                >
                  <View style={[commonStyles.row, { marginBottom: 8 }]}>
                    <View style={{ flex: 1 }}>
                      <View style={[commonStyles.row, { marginBottom: 4 }]}>
                        <Icon 
                          name={getClaimTypeIcon(claim.type)} 
                          size={16} 
                          style={{ color: getSeverityColor(claim.severity), marginRight: 8 }} 
                        />
                        <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                          {getClaimTypeText(claim.type)}
                        </Text>
                      </View>
                      <Text style={[commonStyles.textSecondary, { fontSize: 14 }]}>
                        {claim.date} • {claim.amount}
                      </Text>
                    </View>
                    <View style={[
                      commonStyles.badge,
                      { backgroundColor: getSeverityColor(claim.severity) + '20', borderColor: getSeverityColor(claim.severity) }
                    ]}>
                      <Text style={[commonStyles.text, { color: getSeverityColor(claim.severity), fontSize: 12, fontWeight: '600' }]}>
                        {claim.severity.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  
                  {expandedClaim === claim.id && (
                    <Animatable.View animation="fadeIn" duration={300}>
                      <View style={[commonStyles.divider, { marginVertical: 12 }]} />
                      <Text style={[commonStyles.textSecondary, { marginBottom: 12 }]}>
                        {claim.description}
                      </Text>
                      
                      {claim.repairShop && (
                        <View style={[commonStyles.row, { marginBottom: 12 }]}>
                          <Icon name="build-outline" size={16} style={{ color: colors.primary, marginRight: 8 }} />
                          <Text style={[commonStyles.textSecondary, { fontSize: 14 }]}>
                            {claim.repairShop}
                          </Text>
                        </View>
                      )}
                      
                      {claim.photos.length > 0 && (
                        <View>
                          <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 8 }]}>
                            Fotografii daune ({claim.photos.length})
                          </Text>
                          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
                            <View style={{ flexDirection: 'row', gap: 8 }}>
                              {claim.photos.map((photo, photoIndex) => (
                                <TouchableOpacity
                                  key={photoIndex}
                                  onPress={() => setSelectedImage(photo)}
                                  style={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: 8,
                                    overflow: 'hidden',
                                    borderWidth: 1,
                                    borderColor: colors.border,
                                  }}
                                >
                                  <Image
                                    source={{ uri: photo }}
                                    style={{ width: '100%', height: '100%' }}
                                    resizeMode="cover"
                                  />
                                </TouchableOpacity>
                              ))}
                            </View>
                          </ScrollView>
                        </View>
                      )}
                    </Animatable.View>
                  )}
                </TouchableOpacity>
                {index < vehicleData.insuranceClaims.length - 1 && <View style={{ height: 8 }} />}
              </View>
            ))}
          </View>
        </Animatable.View>

        {/* Technical Details */}
        <Animatable.View animation="fadeInUp" duration={800} delay={400}>
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
        <Animatable.View animation="fadeInUp" duration={800} delay={500}>
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
        <Animatable.View animation="fadeInUp" duration={800} delay={700}>
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

      {/* Image Modal */}
      <Modal
        visible={selectedImage !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedImage(null)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 60,
              right: 20,
              backgroundColor: colors.glass,
              borderRadius: 20,
              padding: 10,
              zIndex: 1,
            }}
            onPress={() => setSelectedImage(null)}
          >
            <Icon name="close-outline" size={24} />
          </TouchableOpacity>
          
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={{
                width: width - 40,
                height: width - 40,
                borderRadius: 12,
              }}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </LinearGradient>
  );
}