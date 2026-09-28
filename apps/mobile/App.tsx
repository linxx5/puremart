import { Text, View } from 'react-native';
import { colors } from '@puremart/tokens';

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.paper, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: colors.midnight, fontSize: 24, fontWeight: 'bold' }}>Puremart</Text>
      <Text style={{ color: colors.slate }}>Buy with Confidence. Sell with Trust.</Text>
    </View>
  );
}
