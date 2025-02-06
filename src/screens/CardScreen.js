import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, Modal, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomButton from "../components/custombutton";
import TotalSummary from "../components/TotalSummary";
import Card from "../components/Card";

const STORAGE_KEY = '@cards_data';

const CardScreen = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [cards, setCards] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [cardModalVisible, setCardModalVisible] = useState(false);

    const handleItemPress = (item) => {
        setSelectedCard(item);
        setCardModalVisible(true);
    };

    // ฟังก์ชันสำหรับโหลดการ์ดจาก AsyncStorage
    const loadCards = async () => {
        try {
            const storedCards = await AsyncStorage.getItem(STORAGE_KEY);
            if (storedCards !== null) {
                setCards(JSON.parse(storedCards)); // แปลงข้อมูลจาก JSON และเก็บลงใน state
            }
        } catch (error) {
            console.error("Error loading cards:", error);
        }
    };

    useEffect(() => {
        loadCards();
    }, []);

    const addCard = async () => {
        if (!title.trim() || !content.trim()) {
            alert("กรุณากรอกหัวข้อ, เนื้อหา และ สถานะ");
            return;
        }

        const newCard = { id: Date.now().toString(), title, content: parseFloat(content), status: 'ยังไม่ได้ซื้อ' };
        const updatedCards = [newCard, ...cards]; // เพิ่มการ์ดใหม่ไปที่หน้าสุดของอาเรย์
        setCards(updatedCards); // อัปเดต state ด้วยข้อมูลการ์ดใหม่
        setTitle(""); // ล้างข้อมูลในช่องกรอกหัวข้อ
        setContent(""); // ล้างข้อมูลในช่องกรอกเนื้อหา

        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCards));
            setModalVisible(false); // ปิด Modal หลังจากบันทึกข้อมูลสำเร็จ
        } catch (error) {
            console.error("Error saving card:", error);
        }
    };

    const removeData = async () => {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY); // ลบข้อมูลทั้งหมดที่เก็บใน STORAGE_KEY
            setCards([]); // เคลียร์ข้อมูลใน state cards
            console.log('Data removed successfully');
        } catch (error) {
            console.error('Error removing data: ', error);
        }
    };

    const removeCard = async (id) => {
        try {
            const updatedCards = cards.filter(card => card.id !== id);
            setCards(updatedCards);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCards));
            console.log('Card removed successfully');
        } catch (error) {
            console.error('Error removing card:', error);
        }
    };

    const toggleCardStatus = async () => {
        if (selectedCard) {
            const newStatus = selectedCard.status === 'ยังไม่ได้ซื้อ' ? 'ซื้อแล้ว' : 'ยังไม่ได้ซื้อ';
    
            // อัปเดตสถานะในอาเรย์ของ cards
            const updatedCards = cards.map(card =>
                card.id === selectedCard.id ? { ...card, status: newStatus } : card
            );
    
            setCards(updatedCards);
    
            // อัปเดต selectedCard ให้ตรงกับสถานะที่อัปเดต
            setSelectedCard(prevCard => ({
                ...prevCard,
                status: newStatus
            }));
    
            try {
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCards));
            } catch (error) {
                console.error("Error updating card status:", error);
            }
        }
    };
    
    

    return (
        <View style={styles.container}>
            <Text style={styles.header}>ทดสอบ</Text>
            <TotalSummary cards={cards} />
            <Icon
                name="plus-circle"
                size={30}
                color="pink"
                onPress={() => setModalVisible(true)}
                style={styles.iconButton}
            />

            <Icon
                name="plus-circle"
                size={30}
                color="red"
                onPress={removeData}
                style={styles.iconDeleteButton}
            />

            {/* Modal สำหรับกรอกข้อมูลการ์ด */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>กรอกข้อมูลการ์ดใหม่</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="ใส่หัวข้อ"
                            value={title}
                            onChangeText={setTitle}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="ใส่เนื้อหา"
                            value={content}
                            onChangeText={setContent}
                            multiline={true}
                            numberOfLines={5}
                        />
                        <CustomButton
                            title="เพิ่ม"
                            onPress={addCard}
                            backgroundColor="green"
                        />
                        <CustomButton
                            title="ปิด"
                            onPress={() => setModalVisible(false)}
                            backgroundColor="green"
                        />
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={cardModalVisible}
                onRequestClose={() => setCardModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {selectedCard ? (
                            <>
                                <Text style={styles.modalText}>รายละเอียดสินค้า</Text>
                                <Text style={styles.modalText}>ชื่อ: {selectedCard.title}</Text>
                                <Text style={styles.modalText}>ราคา: {selectedCard.content}</Text>
                                
                            </>
                        ) : (
                            <Text style={styles.modalText}>ไม่มีข้อมูล</Text>
                        )}
                        <CustomButton
                            title="ปิด"
                            onPress={() => setCardModalVisible(false)}
                            backgroundColor="green"
                        />
                        <CustomButton
                            title="ลบรายการ"
                            onPress={() => {
                                removeCard(selectedCard.id);
                                setCardModalVisible(false);
                            }}
                            backgroundColor="red"
                        />
                        <CustomButton
                            title={selectedCard?.status === 'ซื้อแล้ว' ? 'ซื้อแล้ว' : 'ยังไม่ได้ซื้อ'}
                            onPress={toggleCardStatus}
                            backgroundColor={selectedCard?.status === 'ยังไม่ได้ซื้อ' ? 'red' : 'green'}
                        />
                    </View>
                </View>
            </Modal>

            {/* แสดงการ์ดที่บันทึกใน AsyncStorage */}
            <FlatList
  data={cards}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)}>
      <Card title={item.title} 
      content={item.content} 
      status={item.status}
      />
    </TouchableOpacity>
  )}
/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
        marginBottom: 10,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    card: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    iconButton: {
        margin: 5,
        width: 200,
        justifyContent: 'center',
    },
    iconDeleteButton: {
        margin: 5,
        width: 100,
        justifyContent: 'center',
    },
    flatList: {
        borderWidth: 2,          // กำหนดความหนาของกรอบ
        borderColor: '#FF6347',  // กำหนดสีของกรอบ
        borderRadius: 10,        // กำหนดความโค้งของมุมกรอบ
        padding: 10,             // เพิ่ม padding ให้ด้านใน
      },
      cardContainer: {
        backgroundColor: 'white',
        padding: 20,
        marginVertical: 10,
        borderRadius: 5,
      },
});

export default CardScreen;
