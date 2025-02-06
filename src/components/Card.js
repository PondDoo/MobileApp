import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Card = ({ title, content,status }) => {

  const borderColor = status === 'ซื้อแล้ว' ? 'green' : 'red';
  return (
    <View style={[styles.card,{borderColor:borderColor}]}>
      
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>ราคา: {content} บาท</Text>
      <Text style={styles.status}>สถานะ: {status}</Text> 
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 2,  // กำหนดกรอบที่มีความหนา
  },
  image: {
    width: 390, // ขนาดของภาพ
    height: 390, // ขนาดของภาพ
    marginBottom: 10, // ระยะห่างระหว่างภาพกับเนื้อหา
    alignSelf: "center", // จัดภาพให้อยู่ตรงกลาง
    // ไม่ต้องใช้ borderRadius ทำให้เป็นรูปเหลี่ยม
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left", // จัดให้ชื่ออยู่ตรงกลาง
  },
  content: {
    fontSize: 14,
    color: "#555",
    textAlign: "left", // จัดให้เนื้อหาอยู่ตรงกลาง
  },
});

export default Card;