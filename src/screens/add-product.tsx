import { AddProductContent } from "@/components/add-product/AddProductContent";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function AddProduct() {
  return (
    <SafeAreaProvider>
      <AddProductContent />
    </SafeAreaProvider>
  );
}
