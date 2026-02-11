import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";

export default function SignIn(){

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const { signIn, loadingAuth } = useContext(AuthContext)

    const onSubmit = async() =>{
        
        if(!email || !password){
            alert('Preencha todos os campos')
            return;
        }

        await signIn({email, password})
    }


    return(
        <>
        <View style={styles.container}>
            

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

                <TouchableOpacity 
                style={styles.button}
                onPress={onSubmit}
                >
                    {loadingAuth ?(
                        <ActivityIndicator size={"small"} color="#FFF"/>
                    ): (
                        <Text>Entrar</Text>
                    )}
                </TouchableOpacity>
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
        backgroundColor: "#1d1d2e"
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
        backgroundColor: "#101026",
        marginBottom: 12,
        borderRadius: 4,
        paddingHorizontal: 8,
        color: "#FFF"
    },
    button: {
        width: "95%",
        height: 40,
        backgroundColor: "#5fffa3",
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText:{
        fontSize: 18,
        fontWeight: "bold",
        color: "#101026"
    }

})