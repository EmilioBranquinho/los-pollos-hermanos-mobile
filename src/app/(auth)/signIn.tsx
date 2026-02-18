import Button from "@/components/base/button";
import { useToast } from "@/components/molecules/toast";
import { AuthContext } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions } from "react-native";
import { Image } from "react-native";

export default function SignIn(){

    const toast = useToast();

    const screenWidth = Dimensions.get("window").width;

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    

    const { signIn, loadingAuth } = useContext(AuthContext)

    const onSubmit = async() =>{
        
        if(!email || !password){
            toast.show("Preencha todos os campos", { 
            type: "error",
            backgroundColor: "#e91111",
            duration: 3000,
            position: "top",
        });
            return;
        }

        await signIn({email, password})
    }


    return(
        <>
        <View style={styles.container}>
            <Image
            style={styles.logo}
            source={require('../../../assets/images/logo.png')}
            resizeMode="contain"
            />

            <View style={styles.inputContainer}>
                <TextInput
                placeholder="Digite o seu email"
                style={styles.input}
                placeholderTextColor="#F0F0F0"
                value={email}
                onChangeText={setEmail}
                />

                <TextInput
                placeholder="senha"
                style={styles.input}
                placeholderTextColor="#F0F0F0"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                />

        <Button
        width={screenWidth * 0.8} 
        height={48}
        style={{ marginTop: 20 }}
        backgroundColor="#f56427"
        isLoading={loadingAuth}
        disabled={loadingAuth}
        loadingTextBackgroundColor="#f56427"
        onPress={onSubmit}
        loadingTextColor="#000"
        showLoadingIndicator
        renderLoadingIndicator={() => (
            <ActivityIndicator color="#000" size="small"/>
        )}
      >
        <View style={styles.btn}>
          <Text style={[styles.btnText]}
          >
            Entrar
          </Text>
            <Ionicons name="arrow-forward" size={18} color="black" />
        </View>
      </Button>
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1c0f0a"
    },
    inputContainer:{
        width: "95%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 32,
        paddingHorizontal: 14
    },
    input:{
        width: "95%",
        height: 40,
        backgroundColor: "#2a1510",
        marginBottom: 12,
        borderRadius: 4,
        paddingHorizontal: 8,
        color: "#FFF"
    },
    button: {
        width: "95%",
        height: 40,
        backgroundColor: "#f56427",
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText:{
        fontSize: 18,
        fontWeight: "bold",
        color: "#101026"
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
  logo: {
    width: 300,
    height: 150,
    marginBottom: 1,
  }

})