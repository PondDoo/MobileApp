import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import { SwipeListView } from "react-native-swipe-list-view";

const ListScreen = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [name, setName] = useState("");
    const [history, setHistory] = useState([
        { id: '1', name: 'Pond', status: 'Phone', time: 'Yesterday' },
        { id: '2', name: 'Pond1', status: 'Phone', time: 'Yesterday' },
        { id: '3', name: 'Pond2', status: 'Phone', time: 'Yesterday' },
        { id: '4', name: 'Pond3', status: 'Phone', time: 'Yesterday' },
        { id: '5', name: 'Pond4', status: 'Phone', time: 'Yesterday' },
        { id: '6', name: 'Pond5', status: 'Phone', time: 'Yesterday' },
        { id: '7', name: 'Pond6', status: 'Phone', time: 'Yesterday' },
    ]);

    // Delete the item from the history list
    const deleteItem = (id) => {
        const newList = history.filter(item => item.id !== id);
        setHistory(newList);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recent</Text>

            <SwipeListView
                data={history}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => {
                        setName(item.name);
                        setIsVisible(true);
                    }}>
                        <View style={styles.recordView}>
                            <Image style={styles.imageStyle} source={require("../img/Pond.jpg")} />
                            <Text style={styles.textStyle}>{item.name}</Text>
                            <Text style={styles.subText}>{item.status}</Text>
                            <Text style={styles.timeText}>{item.time}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                renderHiddenItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => deleteItem(item.id)}  // Deleting the item by id
                    >
                        <Text style={styles.actionText}>Delete</Text>
                    </TouchableOpacity>
                )}
                rightOpenValue={-80}  
                onSwipeValueChange={(swipeData) => {
                    const {key , value} = swipeData;
                    value <= -300 ? deleteItem(key) :null;
                }}
            />

            <Modal
                transparent={true}
                animationType="fade"
                visible={isVisible}
                onRequestClose={() => setIsVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Calling...</Text>
                        <Image style={styles.modalImage} source={require("../img/Pond.jpg")} />
                        <Text style={styles.modalMessage}>{name}</Text>
                        <TouchableOpacity onPress={() => setIsVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>End Call</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        padding: 10,
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#fff',
        marginVertical: 15,
    },
    recordView: {
        flexDirection: 'row',
        padding: 20,
        borderColor: 'white',
        borderWidth: 1,
        borderStyle: 'dotted',
        marginBottom: 10,
        alignItems: 'center',
        backgroundColor: 'black', // Background color for the text bar (black)
    },
    imageStyle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    textStyle: {
        fontSize: 30,
        color: '#fff',
    },
    subText: {
        fontSize: 20,
        color: 'gray',
    },
    timeText: {
        color: '#fff',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        marginBottom: 20,
    },
    modalImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    modalMessage: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 25,
    },
    closeButtonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    actionButton: {
        backgroundColor: "#ff5252", // Red background color
        justifyContent: "center",
        alignItems: "center",
        height: "50%",
        width: 80, // Set the width of the swipe action
        borderRadius: 5,
        position: 'absolute',
        right: 0, // Ensure the action button is on the right
    },
    actionText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'center', // Align the text in the center
    },
});

export default ListScreen;
