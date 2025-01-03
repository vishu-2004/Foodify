import { Pressable, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import ModalOverlay from "./ModalOverlay";
import Typography from "../Typography/Typography";
import { ModalContext } from "../../Contexts/modalContext";

const Modal = () => {  
  const navigation = useNavigation();
  const modalCtx = React.useContext(ModalContext);

  return (
    <ModalOverlay
      modalVisible={modalCtx.isOpen}     
      handleModalVisible={modalCtx.closeModal}  
      className="z-40"
    >
      <View className="bg-white w-[300] h-[200]  rounded-xl overflow-hidden border border-black">
        <View className="h-12 justify-center items-center border-b border-black">
          <Typography bold variant="normal" class="text-black">{modalCtx.heading}</Typography>
        </View>
        <View className="flex-1 px-5 w-full py-5 items-center justify-center">
          <Typography class="text-center mt-[-10]">{modalCtx.message}</Typography>
          <View className="flex-1 w-full justify-center items-center">
            <Pressable className="h-[43] rounded-3xl mt-6 w-[100] border border-black items-center justify-center bg-primaryOrange " onPress={modalCtx.closeModal}>  
              <Typography class="text-white">{modalCtx.btnText}</Typography>
            </Pressable>
          </View>
        </View>
      </View>
    </ModalOverlay>
  );
};

export default Modal;