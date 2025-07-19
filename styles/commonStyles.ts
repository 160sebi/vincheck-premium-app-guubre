import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  // Premium dark theme with neon accents
  primary: '#0066FF',        // Electric blue
  secondary: '#00FF88',      // Neon green
  accent: '#FF0080',         // Neon pink
  background: '#0A0A0A',     // Deep black
  backgroundAlt: '#1A1A1A',  // Dark grey
  card: '#1E1E1E',          // Card background
  text: '#FFFFFF',          // Pure white
  textSecondary: '#B0B0B0',  // Light grey
  textMuted: '#666666',      // Muted grey
  success: '#00FF88',        // Success green
  warning: '#FFB800',        // Warning orange
  error: '#FF4444',          // Error red
  border: '#333333',         // Border color
  glass: 'rgba(255, 255, 255, 0.1)', // Glass effect
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 32px rgba(0, 102, 255, 0.3)',
    elevation: 8,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glass: {
    backgroundColor: colors.glass,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 32,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    lineHeight: 24,
  },
  textSecondary: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 20,
  },
  textMuted: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.textMuted,
    lineHeight: 18,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    elevation: 4,
  },
  glassCard: {
    backgroundColor: colors.glass,
    borderRadius: 20,
    padding: 20,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    elevation: 8,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    color: colors.text,
    borderWidth: 2,
    borderColor: colors.border,
    marginVertical: 8,
  },
  inputFocused: {
    borderColor: colors.primary,
    boxShadow: '0 0 20px rgba(0, 102, 255, 0.3)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  badgeSuccess: {
    backgroundColor: colors.success,
  },
  badgeWarning: {
    backgroundColor: colors.warning,
  },
  badgeError: {
    backgroundColor: colors.error,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },
});