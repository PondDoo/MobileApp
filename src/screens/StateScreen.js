import React,{useReducer} from "react";
import { View, Text, StyleSheet,Button } from "react-native";


const intialstate = {count:0}

const reducer = (state,action) => {
    switch (action.type){
        case "INCREMENT":
            return {count:state.count + 1};
        case "DECREMENT":
             if(state.count <=0){

             }else{return {count:state.count -1};}
        
            {count:state.count - 1};
        case "RESET":
            return {count:0};
        default:
    }
}


const StateScreen = () => {
    //const [Value, setValue] = useState(0);
    const [state, dispatch] = useReducer(reducer, intialstate);
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{state.count}</Text>
            <View style={styles.button}>
                <Button
                title="Increase"
                onPress={
                    () => { dispatch({type:"INCREMENT"})
                    //setValue(Value + 1 );
                    //console.log(Value);
                }}
                />
                <Button 
                title = "Decrease"
                color = "red" 
                onPress={
                () => { dispatch({type:"DECREMENT"})
                    //setValue(Value - 1)
                    //console.log(Value);
            
            }}
                />

                <Button title = "Reset" color  = "black" 
                onPress={() => {dispatch({type:"RESET"})
                   // setValue(0)
                   // console.log(Value);
                }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1 ,
        alignItems: "center"
    },
    text:{
        fontSize: 250,
    },
    button:{
        width:250,
    },
});

export default StateScreen;