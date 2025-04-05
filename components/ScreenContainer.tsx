import { View, StyleSheet } from "react-native";

export function ScreenContainer({ children }: React.PropsWithChildren) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#323232',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10
  },
});