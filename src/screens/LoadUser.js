import React,{useState,useEffect} from "react";
import {View,Text,StyleSheet, ActivityIndicator} from 'react-native'
import { FlatList } from "react-native-gesture-handler";

const LoadUser = () =>{

    const [users,setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Loading data...");

        const fetchData = async () =>{
            try {
                //Load or Fetch data 0
                const response = await fetch(
                "https://jsonplaceholder.typicode.com/users"
                );
                const data = await response.json();
                setUsers(data);
                //console.log(data);
            } catch (error){
                   //show Error
                console.log('Error:',error);
            } finally {
                setLoading(false);
            }
        };

        fetchData()
    },[]);

    return(
        <View style={style.container}>
            {loading ? (
                <ActivityIndicator size = "large" color ="0000fff"/>
            ): (
                <FlatList
                data = {users}
                keyExtractor={(item) => item.id}
                renderItem ={({item})=>(
                    <Text style = {style.text}>
                        {item.name} [{item.email}]
                    </Text>
            )}
        />
    )}
    </View>
    );
};
const style = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
    },
    text:{
        fontSize:18,
    },
});
    
export default LoadUser;