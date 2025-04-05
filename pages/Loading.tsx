import { View, Text } from 'react-native';

export function Loading () {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'black' }}>Loading...</Text>
    </View>
  );
}