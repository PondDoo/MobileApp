import React from "react";
import { View, Text, StyleSheet,Image,Button,Alert,TouchableOpacity } from "react-native";

// function HomeScreen(a, b) {}
const ComponentScreen = (a, b) => {
  const name = <Text style={styles.TextStyle}>2003</Text>;
  const ShowAlert = (title, msg) => {
    Alert.alert(title,msg,[
      {text:"OK",onPress: () => console.log("Click OK")},
      {text:"Cancel",onPress: () => console.log("Click Cancel")}
    ]);
  };
  
  return (
    <View style={styles.ViewStyle}>
      {/*มาสิวะ*/}
      <TouchableOpacity onPress={() => ShowAlert("Pic said","มาาาาาาาา")}>
      <Image
      style={styles.ImageStyle}
      source={require("../img/Pond.jpg")}
      />
      </TouchableOpacity>
      <Text style={styles.TextStyle}>This is Component Screen</Text>
      <Text style={styles.TextStyle}> By Pond</Text>
      {name}

      <View style={styles.ButtonStyle}>
      <Button 
            title="say Hi !!" 
            color = "red" 
            onPress={() =>ShowAlert('Butt said',"What the Hell")}/>
    </View>
     </View>
  );
};

const styles = StyleSheet.create({
  ViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  TextStyle: {
    fontSize: 24,
  },
  ImageStyle:{
    width:100,
    height:100,
    borderRadius:100,
  },
  ButtonStyle:{
    width: 100,
  },
});

export default ComponentScreen;
//6971