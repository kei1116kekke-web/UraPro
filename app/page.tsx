import { FormProvider } from "@/context/FormContext";
import AppContent from "@/components/AppContent";

export default function Home() {
  return (
    <FormProvider>
      <AppContent />
    </FormProvider>
  );
}
