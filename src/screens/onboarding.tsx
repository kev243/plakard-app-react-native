import {
  OnboardingVisual,
  OnboardingVisualName,
} from "@/components/onboarding/OnboardingVisuals";
import { AppText } from "@/components/shared/AppText";
import { useAppOnboarding } from "@/context/AppOnboardingContext";
import { useNotifications } from "@/context/NotificationsContext";
import { useTheme } from "@/context/ThemeContext";
import { Href, router } from "expo-router";
import { useRef, useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Slide = {
  description: string;
  title: string;
  visual: OnboardingVisualName;
};

const slides: Slide[] = [
  {
    title: "Ton placard, toujours sous contrôle.",
    description:
      "Suis facilement tes produits et garde une vue claire sur ce que tu as à la maison.",
    visual: "welcome",
  },
  {
    title: "Ajoute un produit en quelques secondes.",
    description:
      "Indique sa quantité, son emplacement et sa date d’expiration. Plakard s’occupe du reste.",
    visual: "add",
  },
  {
    title: "Repère ce qui expire bientôt.",
    description:
      "Des cartes claires et colorées t’aident à savoir immédiatement quels produits utiliser en priorité.",
    visual: "products",
  },
  {
    title: "Un rappel au bon moment.",
    description:
      "Choisis quand être prévenu pour consommer tes produits avant qu’ils ne soient oubliés.",
    visual: "notifications",
  },
];

export function OnboardingScreen() {
  const { colors } = useTheme();
  const { markOnboardingSeen } = useAppOnboarding();
  const { onboardingSeen: notificationOnboardingSeen } = useNotifications();
  const { height, width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlatList<Slide>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastSlide = currentIndex === slides.length - 1;
  const compact = height < 750;

  const finish = async () => {
    await markOnboardingSeen();
    if (notificationOnboardingSeen) {
      router.replace("/(tabs)/home" as Href);
      return;
    }
    router.replace("/notification-onboarding" as Href);
  };

  const next = () => {
    if (lastSlide) {
      void finish();
      return;
    }
    listRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
  };

  const updateCurrentIndex = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    setCurrentIndex(Math.round(event.nativeEvent.contentOffset.x / width));
  };

  return (
    <View
      style={[
        styles.screen,
        {
          backgroundColor: colors.background,
          paddingBottom: insets.bottom,
          paddingTop: insets.top,
        },
      ]}
    >
      <View style={styles.topBar}>
        <AppText
          weight="bold"
          style={[styles.counter, { color: colors.textMuted }]}
        >
          {currentIndex + 1} / {slides.length}
        </AppText>
        {!lastSlide && (
          <Pressable
            accessibilityRole="button"
            onPress={() => void finish()}
            hitSlop={12}
          >
            <AppText
              weight="bold"
              style={[styles.skip, { color: colors.textSecondary }]}
            >
              Passer
            </AppText>
          </Pressable>
        )}
      </View>

      <FlatList
        ref={listRef}
        data={slides}
        horizontal
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.visual}
        onMomentumScrollEnd={updateCurrentIndex}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <OnboardingVisual compact={compact} name={item.visual} />
            <View style={styles.copy}>
              <AppText
                weight="extraBold"
                style={[styles.title, compact && styles.compactTitle]}
              >
                {item.title}
              </AppText>
              <AppText
                style={[
                  styles.description,
                  compact && styles.compactDescription,
                  { color: colors.textSecondary },
                ]}
              >
                {item.description}
              </AppText>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View
          style={styles.dots}
          accessibilityLabel={`Étape ${currentIndex + 1} sur ${slides.length}`}
        >
          {slides.map((slide, index) => (
            <View
              key={slide.visual}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === currentIndex ? colors.selected : colors.border,
                },
                index === currentIndex && styles.activeDot,
              ]}
            />
          ))}
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={next}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: lastSlide ? colors.primary : colors.selected },
            pressed && styles.buttonPressed,
          ]}
        >
          <AppText
            weight="extraBold"
            style={[
              styles.buttonText,
              { color: lastSlide ? "#FEFEFE" : colors.selectedText },
            ]}
          >
            {lastSlide ? "Découvrir Plakard" : "Suivant"}
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  topBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 48,
    paddingHorizontal: 28,
  },
  counter: {
    fontSize: 15,
  },
  skip: {
    fontSize: 15,
  },
  slide: {
    paddingHorizontal: 24,
  },
  copy: {
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 34,
    letterSpacing: -0.7,
    lineHeight: 39,
  },
  compactTitle: {
    fontSize: 29,
    lineHeight: 34,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 13,
  },
  compactDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 9,
  },
  footer: {
    paddingBottom: 6,
    paddingHorizontal: 28,
  },
  dots: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    height: 30,
    justifyContent: "center",
    marginBottom: 10,
  },
  dot: {
    borderRadius: 5,
    height: 8,
    width: 8,
  },
  activeDot: {
    width: 38,
  },
  button: {
    alignItems: "center",
    borderRadius: 18,
    minHeight: 58,
    justifyContent: "center",
  },
  buttonPressed: {
    opacity: 0.86,
    transform: [{ scale: 0.99 }],
  },
  buttonText: {
    fontSize: 17,
  },
});
