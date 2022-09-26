import React, {useContext, useRef} from "react";
import {
    ModalBackdrop,
    ModalBody,
    ModalContainer,
    Text,
    CloseButton,
    DeleteButton,
    ButtonContainer
} from "./styles";
import Axios from "axios";
import UserContext from '../../context/UserContext';
import {useSpring, animated} from 'react-spring';

export const DeleteModal = ({closeModal, openModal}) => {

    const {userId, userData, setUserData, setShowMessage, setMessage} = useContext(UserContext)


    const deleteUser = (id)=> {
        Axios.delete(`http://localhost:5000/users/delete/${id}`)
        .then((response)=>{
            if(response.data.deleted === true){
                closeModal(false)
                setShowMessage(true)
                setMessage("Succcessfully deleted")
            }
            setUserData(userData.filter((val)=>{
                return val.id !== id
            }))
        })
    }


    return (
        <>
            <ModalBackdrop onClick={()=> closeModal(false)} />
            {/* <animated.div style={animation}> */}
                <ModalContainer>
                {/* <CloseButton onClick={()=> closeModal(false)}>X</CloseButton> */}
                    <ModalBody>
                        <Text>Are you sure to delete?</Text>
                        <ButtonContainer>
                            <DeleteButton onClick={()=> deleteUser(userId)}>Yes</DeleteButton>
                            <CloseButton onClick={()=> closeModal(false)}>No</CloseButton>
                        </ButtonContainer>
                    </ModalBody>
                </ModalContainer>
            {/* </animated.div> */}
        </>
    );
};