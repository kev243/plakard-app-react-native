import CardProduct from "@/components/home/CardProduct";
import CardStats from "@/components/home/CardStats";
import FilterTabs from "@/components/home/FilterTabs";
import HomeHeader from "@/components/home/HomeHeader";
import { Container } from "@/components/shared/Container";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Container>
        <HomeHeader />
        <CardStats />
        <FilterTabs />
        <CardProduct />
      </Container>
      <Pressable
        accessibilityLabel="Ajouter un produit"
        accessibilityRole="button"
        onPress={() => router.push("../add-product")}
        style={styles.floatingButton}
      >
        <Ionicons name="add" size={30} color="#FEFEFE" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  floatingButton: {
    alignItems: "center",
    backgroundColor: "#00975D",
    borderRadius: 30,
    bottom: 24,
    elevation: 5,
    height: 58,
    justifyContent: "center",
    position: "absolute",
    right: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    width: 58,
  },
});
