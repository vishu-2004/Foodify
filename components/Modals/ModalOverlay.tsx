import { Modal, View } from "react-native";
import React from "react";
import { cn } from "../../lib/cn";

type LoginModalProps = {
    modalVisible: boolean;
    handleModalVisible: () => void;
    children: React.ReactNode;
    overlay?: boolean;
} & React.ComponentProps<typeof Modal>;

const ModalOverlay: React.FC<LoginModalProps> = ({
    modalVisible,
    handleModalVisible,
    children,
    overlay = true,
    ...otherProps
}) => {
    return (
        <Modal
            visible={modalVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={() => {
                handleModalVisible();
            }}
            style={{ flex: 1, backgroundColor: "red" }}
            {...otherProps}
        >
            <View className={cn(`flex-1  justify-center items-center ${overlay && "bg-black/50"}`)}>
                {children}
            </View>
        </Modal>
    );
};

export default ModalOverlay;
