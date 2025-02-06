import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TotalSummary = ({ cards }) => {
    // กรองการ์ดที่ยังไม่ได้ซื้อ (สถานะ "ยังไม่ได้ซื้อ")
    const notPurchasedCards = cards.filter(card => card.status === 'ยังไม่ได้ซื้อ');
    
    // คำนวณผลรวมของราคาสินค้าที่ยังไม่ได้ซื้อ
    const totalPrice = notPurchasedCards.reduce((total, card) => total + card.content, 0);
    
    return (
        <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>รวมราคา: ฿{totalPrice.toFixed(2)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    summaryContainer: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: 'lightgray',
        borderRadius: 5,
    },
    summaryText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default TotalSummary;
