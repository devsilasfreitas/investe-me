import { View, Text } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';

export function Loading () {
  return (
    <ScreenContainer>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>
          Carregando...
        </Text>
      </View>
    </ScreenContainer>
  );
}