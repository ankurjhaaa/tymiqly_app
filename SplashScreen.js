import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Image,
    Text,
    Animated,
    StatusBar,
    StyleSheet,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function SplashScreen({ onFinish }) {
    const scale = useRef(new Animated.Value(0.7)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const [dot, setDot] = useState(0);

    useEffect(() => {
        const i = setInterval(() => {
            setDot((p) => (p + 1) % 3);
        }, 350);
        return () => clearInterval(i);
    }, []);

    useEffect(() => {
        Animated.parallel([
            Animated.spring(scale, {
                toValue: 1,
                friction: 5,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 700,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setTimeout(onFinish, 1600);
        });
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* TOP RIGHT CIRCLE */}
            <View style={styles.topCircle} />

            {/* BOTTOM LEFT CIRCLE */}
            <View style={styles.bottomCircle} />

            {/* LOGO */}
            <Animated.View
                style={[
                    styles.logoWrapper,
                    { transform: [{ scale }], opacity },
                ]}
            >
                <Image
                    source={require("./assets/splash-icon.png")}
                    style={styles.logo}
                />
            </Animated.View>

            {/* TITLE */}
            <Text style={styles.title}>Expert Repairs at Your Doorstep</Text>

            <View style={styles.features}>
                <View style={styles.featureItem}>
                    <Ionicons name="flash-outline" size={16} color="#475569" />
                    <Text style={styles.featureText}>Quick Check-In</Text>
                </View>

                <Text style={styles.dotSep}>•</Text>

                <View style={styles.featureItem}>
                    <Ionicons name="shield-checkmark-outline" size={16} color="#475569" />
                    <Text style={styles.featureText}>Secure Records</Text>
                </View>

                <Text style={styles.dotSep}>•</Text>

                <View style={styles.featureItem}>
                    <MaterialIcons name="analytics" size={16} color="#475569" />
                    <Text style={styles.featureText}>Smart Analytics</Text>
                </View>
            </View>


            {/* LOADER DOTS */}
            <View style={styles.loader}>
                {[0, 1, 2].map((i) => (
                    <View
                        key={i}
                        style={[
                            styles.loaderDot,
                            dot === i && styles.activeDot,
                        ]}
                    />
                ))}
            </View>

            {/* FOOTER */}
            <Text style={styles.footer}>Powered by Just Repair</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },

    topCircle: {
        position: "absolute",
        top: -120,
        right: -120,
        width: 260,
        height: 260,
        borderRadius: 130,
        backgroundColor: "#fdecec",
    },

    bottomCircle: {
        position: "absolute",
        bottom: -140,
        left: -140,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: "#fdecec",
    },

    logoWrapper: {
        width: 170,
        height: 170,
        borderRadius: 85,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 8,
    },

    logo: {
        width: 130,
        height: 130,
        resizeMode: "contain",
        borderRadius: 40,
    },

    title: {
        marginTop: 22,
        fontSize: 18,
        fontWeight: "700",
        color: "#0f172a",
        textAlign: "center",
    },

    features: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },

    feature: {
        fontSize: 13,
        color: "#475569",
    },

    dotSep: {
        marginHorizontal: 6,
        color: "#cbd5e1",
    },

    loader: {
        flexDirection: "row",
        marginTop: 30,
    },

    loaderDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#fbcaca",
        marginHorizontal: 5,
    },

    activeDot: {
        backgroundColor: "#f97316",
    },

    footer: {
        position: "absolute",
        bottom: 28,
        fontSize: 12,
        color: "#94a3b8",
    },
    featureItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },

    featureText: {
        fontSize: 13,
        color: "#475569",
    },

    dotSep: {
        marginHorizontal: 6,
        color: "#cbd5e1",
        fontSize: 14,
    },

});
