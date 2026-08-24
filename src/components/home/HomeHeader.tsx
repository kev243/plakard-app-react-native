import { StyleSheet, View } from "react-native";
import { AppText } from "../shared/AppText";

export default function HomeHeader() {
  return (
    <View>
      <View>
        <AppText style={styles.title}>Allo 🖐️</AppText>
        <AppText weight="bold" style={styles.description}>
          Voici l’état de ton plakard
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
  },
  description: {
    marginTop: 4,
    fontSize: 20,
  },
});
