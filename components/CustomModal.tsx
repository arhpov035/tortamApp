// components/CustomModal.tsx

import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type CustomModalProps = {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

const CustomModal: React.FC<CustomModalProps> = ({ visible, onClose, children }) => {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer} >
                <View style={styles.modalContent}>
                    {/* Иконка закрытия в правом верхнем углу */}
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Ionicons name="close" size={28} color="red" />
                    </TouchableOpacity>
                    {children}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '93%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        position: 'relative', // Позволяет позиционировать иконку внутри контейнера
    },
    closeButton: {
        position: 'absolute',
        top: 10, // Отступ от верхней части модального окна
        right: 10, // Отступ от правой части модального окна
    },
});

export default CustomModal;
