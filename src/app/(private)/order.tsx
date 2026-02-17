import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, FlatList} from "react-native";
import {Feather} from '@expo/vector-icons'
import { api } from "@/services/api";
import { router } from "expo-router";
import { ModalPicker } from "@/components/ModalPicker";
import { ListItem } from "@/components/ListItem";

export interface CategoryProps {
    id: string,
    name: string
}

interface ProductProps {
    id: string,
    name: string
}

interface OrderItemProps {
    id: string,
    name: string,
    productId: string,
    amount: number | string
}

export default function Order(){
    
    const { table, order_id } = useLocalSearchParams<{
        order_id: string ,
        table: string 
    }>()

    const[category, setCategory] = useState<CategoryProps[] | []>()
    const[categorySelected, setCategorySelected] = useState<CategoryProps>()
    const[amount, setAmount] = useState("1");
    const[modalCategoryVisible, setModalCategoryVisible] = useState(false);
    const[products, setProducts] = useState<ProductProps[] | []>()
    const[productSelected, setProductSelected] = useState<CategoryProps>()
    const[modalProductVisible, setModalProductVisible] = useState(false);
    const[orderItems, setOrderItems] = useState<OrderItemProps[]>([]);

    useEffect(()=>{

        async function loadCategories(){

            try {
                const response = await api.get("/category")

                setCategory(response.data)
                setCategorySelected(response.data[0])
            } catch (error) {
                console.log(error)
                return;
            }
        }

        loadCategories();
    }, []);

    useEffect(()=>{
        
        async function loadProducts(){

            try{
                const response = await api.get(`/category/product?category_id=${categorySelected?.id}`)

                setProducts(response.data)
                setProductSelected(response.data[0])

            } catch (error) {
                console.log(error)
                return;
            }
        }

        loadProducts();

    }, [categorySelected])

    async function handleCloseOrder(order_id: string){

        try{
            const response = await api.delete(`/order?order_id=${order_id}`);

            console.log(response.data)

            router.replace("/dashboard")
        } catch (error) {
            console.log(error)
            return;
        }
    }


    async function handleAddOrderItem(){

        try{
            const response = await api.post("/order/add", {
                amount: Number(amount),
                orderId: order_id,
                productId: productSelected?.id
            })

            const data = {
                id: response.data.id,
                productId: productSelected?.id as string,
                name: productSelected?.name as string,
                amount: amount
            }

            setOrderItems(oldArray => [...oldArray, data])

            console.log(response.data)

        } catch (error) {
            console.log(error)
            return;
        }
    }

    async function handleDeleteOrderItem(item_id: string){

        try{
            const response = await api.delete(`/order/remove?item_id=${item_id}`)

            console.log(response.data)

            const newArray = orderItems.filter((item) =>{
                return (item.id !== response.data.id)
            })

            setOrderItems(newArray)
        } catch (error) {
            console.log(error)
            return;
        }
    }

    function handleFNext(){
        router.push({ 
            pathname: "/finishOrder",
            params: {
                order_id: order_id,
                table: table
            }
        })
    }


    async function handleChangeCategory(item: CategoryProps){
        setCategorySelected(item)
    }

    async function handleChangeProduct(item: ProductProps){
        setProductSelected(item)
        console.log(productSelected?.id)
    }

    return(
        <>
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.title}>Mesa {table}</Text>

                {orderItems?.length === 0 &&(
            <TouchableOpacity
                onPress={()=>{handleCloseOrder(order_id)}}
                >
                    <Feather name="trash-2" size={28} color="#c50200"/>
                </TouchableOpacity>                  
                )}
            </View>

            {category?.length !== 0 &&(
                <TouchableOpacity 
                style={styles.input}
                onPress={() =>setModalCategoryVisible(true)}
                >
                    <Text style={{ color: "#FFF" }}>
                        {categorySelected?.name}
                    </Text>
                </TouchableOpacity>
            )}

            {products?.length !== 0 &&(
                <TouchableOpacity 
                style={styles.input}
                onPress={() =>setModalProductVisible(true)}
                >
                    <Text style={{ color: "#FFF" }}>
                        {productSelected?.name}
                    </Text>
                </TouchableOpacity>
            )}

                <View style={styles.qtdContainer}>
                    <Text style={styles.qtdText}>Quantidade</Text>
                    <TextInput
                    style={[styles.input, { width: "50%", textAlign: "center" }]}
                    placeholderTextColor="#F0F0F0"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                    />
                </View>

                <View style={styles.actions}>
                    <TouchableOpacity 
                    onPress={handleAddOrderItem}
                    style={styles.buttonAdd}>
                        <Text>+</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    onPress={handleFNext}
                    style={[styles.button, { opacity: orderItems?.length === 0 ? 0.3 : 1 }]}
                    disabled={orderItems?.length === 0}
                    >
                        <Text style={styles.buttonText}>Avançar</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, marginTop: 24 }}
                data={orderItems}
                keyExtractor={(item) => item.id}
                renderItem={ ({ item }) => <ListItem data={item} deleteItem={handleDeleteOrderItem}/>}           
                />

                <Modal
                transparent={true}
                visible={modalCategoryVisible}
                animationType="fade"
                >
                    <ModalPicker
                    handleCloseModal={ () => setModalCategoryVisible(false) }
                    options={category}
                    selectedItem={ (item) => {handleChangeCategory(item)} }
                    />

                </Modal>

                <Modal
                transparent={true}
                visible={modalProductVisible}
                animationType="fade"
                >
                    <ModalPicker
                    handleCloseModal={ () => setModalProductVisible(false) }
                    options={products}
                    selectedItem={ (item) => {handleChangeProduct(item)} }
                    />

                </Modal>
        </View>
        </>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1c0f0a",
        paddingVertical: "5%",
        paddingEnd: "4%",
        paddingStart: "4%"
    },
    header:{
        flexDirection: "row",
        marginBottom: 12,
        alignItems: "center",
        marginTop: 24
    },
    title:{
        fontSize: 30,
        fontWeight: "bold",
        color: "#FFF",
        marginRight: 14
    },
    input:{
        backgroundColor: "#2a1510",
        borderRadius: 4,
        width: "100%",
        height: 60,
        marginBottom: 12,
        justifyContent: "center",
        paddingHorizontal: 8,
        color: "#FFF",
        fontSize: 30,
        borderStyle: "solid",
        borderColor: "#FFF"
    },
    qtdContainer:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    qtdText:{
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFF"
    },
    actions:{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between"
    },
    buttonAdd: {
        width: "20%",
        backgroundColor: "#c0262d",
        borderRadius: 4,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#101026",
        fontSize: 18,
        fontWeight: "bold"
    },
    button:{
        backgroundColor: "#f56427",
        borderRadius: 4,
        height: 40,
        width: "75%",
        alignItems: "center",
        justifyContent: "center"
    }
})