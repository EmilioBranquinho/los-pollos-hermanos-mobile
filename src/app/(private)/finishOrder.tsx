import { Text, TouchableOpacity, View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { api } from "@/services/api";
import { router } from "expo-router";
import Button from "@/components/base/button";
import { useState } from "react";
import { useToast } from "@/components/molecules/toast";

export default function FinishOrder(){

    const toast = useToast();

    const screenWidth = Dimensions.get("window").width;
    const[loading, setLoading] = useState(false);

    const { table, order_id } = useLocalSearchParams<{
            order_id: string ,
            table: string 
        }>()

        console.log(order_id)
        console.log(table)
    
    const onBack =  () =>{
        router.replace("/dashboard")
    }

    async function handleFinishOrder(){

        setLoading(true);

        try{
            const response = await api.put("/order/send", {
                order_id: order_id
            })
            
            toast.show("Pedido finalizado com sucesso!", { 
            type: "success",
            backgroundColor: "#1ad41d",
            duration: 3000,
            position: "top",
        });

        setTimeout(onBack, 3000)
           
        } catch (error) {
            console.log(error)
            return;
        } finally {
            setLoading(false)
        }
    }
        
    return(

        <>
        <View style={styles.container}>
            <Text style={styles.alert}>Deseja finalizar o pedido?</Text>
            <Text style={styles.title}>Mesa {table}</Text>

            {/* <TouchableOpacity 
            onPress={handleFinishOrder}
            style={styles.button}>
                <Text style={styles.textButton}>Finalizar pedido</Text>
                <Feather size={20} color="#1d1d2e" />
            </TouchableOpacity> */}

        <Button
        width={screenWidth * 0.8} 
        height={48}
        style={{ marginTop: 20 }}
        backgroundColor="#f56427"
        isLoading={loading}
        disabled={loading}
        loadingTextBackgroundColor="#f56427"
        onPress={handleFinishOrder}
        loadingTextColor="#000"
        showLoadingIndicator
        renderLoadingIndicator={() => (
            <ActivityIndicator color="#000" size="small"/>
        )}
      >
        <View style={styles.btn}>
          <Text style={[styles.btnText]}
          >
            Finalizar pedido
          </Text>
            <Ionicons name="arrow-forward" size={18} color="black" />
        </View>
      </Button>
        </View>

</>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#1c0f0a',
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
        backgroundColor: "#f56427",
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