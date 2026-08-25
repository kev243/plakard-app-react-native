import { CalendarProductCard } from "@/components/calendar/CalendarProductCard";
import { ExpiryCalendar } from "@/components/calendar/ExpiryCalendar";
import { AppText } from "@/components/shared/AppText";
import { Container } from "@/components/shared/Container";
import { useProducts } from "@/context/ProductsContext";
import { getDateKey } from "@/utils/expiration";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function CalendarScreen() {
  const { products } = useProducts();
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [displayedMonth, setDisplayedMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );

  const selectedProducts = useMemo(() => {
    const selectedKey = getDateKey(selectedDate);
    return products.filter(
      (product) => product.expirationDate === selectedKey,
    );
  }, [products, selectedDate]);

  const changeMonth = (offset: number) => {
    const nextMonth = new Date(
      displayedMonth.getFullYear(),
      displayedMonth.getMonth() + offset,
      1,
    );
    setDisplayedMonth(nextMonth);
    setSelectedDate(nextMonth);
  };

  const selectedDateLabel = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(selectedDate);

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <AppText weight="extraBold" style={styles.title}>
            Calendrier
          </AppText>
          <AppText style={styles.subtitle}>
            Retrouve les dates d’expiration de tes produits
          </AppText>
        </View>

        <ExpiryCalendar
          month={displayedMonth}
          products={products}
          selectedDate={selectedDate}
          onChangeMonth={changeMonth}
          onSelectDate={setSelectedDate}
        />

        <View style={styles.productsSection}>
          <AppText weight="bold" style={styles.selectedDate}>
            {selectedDateLabel}
          </AppText>
          <AppText style={styles.productCount}>
            {selectedProducts.length > 0
              ? `${selectedProducts.length} produit${selectedProducts.length > 1 ? "s" : ""} à surveiller`
              : "Aucune expiration prévue"}
          </AppText>

          <View style={styles.productList}>
            {selectedProducts.map((product) => (
              <CalendarProductCard
                key={product.id}
                product={product}
                onPress={() =>
                  router.push({
                    pathname: "/product/[id]",
                    params: { id: product.id },
                  })
                }
              />
            ))}
          </View>

          {selectedProducts.length === 0 && (
            <View style={styles.emptyState}>
              <AppText style={styles.emptyIcon}>🌿</AppText>
              <AppText weight="bold" style={styles.emptyTitle}>
                Rien à signaler
              </AppText>
              <AppText style={styles.emptyText}>
                Sélectionne un jour marqué pour voir les produits concernés.
              </AppText>
            </View>
          )}
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 28 },
  header: { paddingBottom: 20, paddingTop: 8 },
  title: { color: "#11181E", fontSize: 25 },
  subtitle: { color: "#7F8385", fontSize: 14, marginTop: 4 },
  productsSection: { marginTop: 22 },
  selectedDate: { color: "#11181E", fontSize: 18, textTransform: "capitalize" },
  productCount: { color: "#8B8F91", fontSize: 12, marginTop: 3 },
  productList: { gap: 10, marginTop: 14 },
  emptyState: {
    alignItems: "center",
    paddingHorizontal: 34,
    paddingVertical: 34,
  },
  emptyIcon: { fontSize: 34 },
  emptyTitle: { color: "#11181E", fontSize: 16, marginTop: 10 },
  emptyText: {
    color: "#8B8F91",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 5,
    textAlign: "center",
  },
});
