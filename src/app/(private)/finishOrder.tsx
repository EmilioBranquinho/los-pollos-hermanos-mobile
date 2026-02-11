import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { api } from "@/services/api";
import { router } from "expo-router";

export default function FinishOrder(){

    const { table, order_id } = useLocalSearchParams<{
            order_id: string ,
            table: string 
        }>()

        console.log(order_id)
        console.log(table)

    async function handleFinishOrder(){

        try{
            const response = await api.put("/order/send", {
                order_id: order_id
            })

            console.log(response.data)

            router.replace("/dashboard")
        } catch (error) {
            console.log(error)
            return;
        }
    }
        
    return(

        <>
        <View style={styles.container}>
            <Text style={styles.alert}>Deseja finalizar o pedido?</Text>
            <Text style={styles.title}>Mesa {table}</Text>

            <TouchableOpacity 
            onPress={handleFinishOrder}
            style={styles.button}>
                <Text style={styles.textButton}>Finalizar pedido</Text>
                <Feather size={20} color="#1d1d2e" />
            </TouchableOpacity>
        </View>
</>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#1d1d2e',
        paddingVertical: "5%",
        paddingHorizontal: "4%",
        alignItems: "center",
        justifyContent: "center"
    },
    alert: {
        fontSize: 20,
        color: "#FFF",
        fontWeight: "bold",
        marginBottom: 12
    },
    title:{
        fontSize: 30,
        fontWeight: "bold",
        color: "#FFF",
        marginBottom: 12
    },
    button:{
        backgroundColor: "#3fffa3",
        flexDirection: "row",
        width: "65%",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4
    },
    textButton:{
        fontSize: 18,
        marginRight: 8,
        fontWeight: "bold",
        color: "#1d1d2e"  
    }
})