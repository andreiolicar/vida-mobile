import {
    useFonts as useExpoFonts,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';

export function useFonts() {
    const [fontsLoaded, fontError] = useExpoFonts({
        Nunito_400Regular,
        Nunito_500Medium,
        Nunito_600SemiBold,
        Nunito_700Bold,
        Nunito_800ExtraBold,
    });

    return {
        fontsLoaded,
        fontError,
    };
}