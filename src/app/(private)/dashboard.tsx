import Button from "@/components/base/button";
import { AuthContext } from "@/contexts/AuthContext";
import { api } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CircularLoader } from "@/components/molecules/Loaders/circular";

export default function Dashboard(){

    const screenWidth = Dimensions.get("window").width;

    const { signOut } = useContext(AuthContext)
//     const [fontLoaded] = useFonts({
//     SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
//   });

    const[table, setTable] = useState("");
    const[loading, setLoading] = useState(false);

    async function createOrder(){

        if(!table){
            return;
        }

        setLoading(true)

        try{
            const response = await api.post("/order", {
                table: Number(table),
                name: "Pedido teste"
            })

            setTable("");
            setLoading(false)

            router.replace({ 
                pathname: "/order",
                params: {
                    order_id: response.data.id,
                    table: table
                }
             })
        } catch (error) {
            alert("erro")
            console.log(error)
        } finally {
            setLoading(false)
        }
        
    }

    return(
        <>
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Novo pedido</Text>

            <TextInput
            placeholder="Número da mesa:"
            placeholderTextColor="#F0F0F0"
            style={styles.input}
            keyboardType="numeric"
            value={table}
            onChangeText={setTable}
            />

        <Button
        width={screenWidth * 0.9} 
        height={48}
        style={{ marginTop: 20 }}
        backgroundColor="#f56427"
        loadingTextBackgroundColor="#f56427"
        isLoading={loading}
        disabled={loading}
        onPress={createOrder}
        loadingTextColor="#000"
        showLoadingIndicator
        renderLoadingIndicator={() => (
            <ActivityIndicator size="small" color="#000" />
        )}
      >
        <View style={styles.btn}>
          <Text style={[styles.btnText]}
          >
            Abrir pedido
          </Text>
            <Ionicons name="arrow-forward" size={18} color="black" />
        </View>
      </Button>

        </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
        backgroundColor: "#1c0f0a"
    },

    button: {
        width: "90%",
        height: 40,
        backgroundColor: "#f56427",
        borderRadius: 4,
        marginVertical: 12,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#FFF",
        marginBottom: 24
    },
    buttonText: {
        fontSize: 18,
        color: "#101026",
        fontWeight: "bold"
    },
    input: {
        width:"90%",
        height: 60,
        backgroundColor: "#2a1510",
        borderRadius: 4,
        paddingHorizontal: 8,
        textAlign: "center",
        fontSize: 22,
        color: "#FFF",
        borderStyle: "solid",
        borderColor: "#f56427",
        borderWidth: 1
    },
    btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,  
    paddingVertical: 16,
    paddingHorizontal: 32,
    
  },
  btnText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
  },
})

function useFonts(arg0: { SfProRounded: any; }): [any] {
    throw new Error("Function not implemented.");
}
