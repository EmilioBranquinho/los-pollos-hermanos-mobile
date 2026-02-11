import { AuthContext } from "@/contexts/AuthContext";
import { api } from "@/services/api";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard(){

    const { signOut } = useContext(AuthContext)

    const[table, setTable] = useState("");

    async function createOrder(){

        if(!table){
            return;
        }

        try{
            const response = await api.post("/order", {
                table: Number(table),
                name: "Pedido teste"
            })

            setTable("");

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

            <TouchableOpacity 
            style={styles.button}
            onPress={createOrder}
            >
                <Text style={styles.buttonText}>Abrir mesa</Text>
            </TouchableOpacity>

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
        backgroundColor: "#1d1d2e"
    },

    button: {
        width: "90%",
        height: 40,
        backgroundColor: "#3fffe3",
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
        backgroundColor: "#101026",
        borderRadius: 4,
        paddingHorizontal: 8,
        textAlign: "center",
        fontSize: 22,
        color: "#FFF"
    }
})