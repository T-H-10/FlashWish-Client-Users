import React from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { appDispatch } from '../../Store/Store';
// import { deleteTemplate } from '../../Store/templatesStore/TemplatesApi';

type DeleteButtonProps= {
    itemId: number;
    uploaderId: number; // מזהה המשתמש שהעלה את התמונה
    currentUserId: number; // מזהה המשתמש המחובר
    deleteFunc: Function;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ itemId, uploaderId, currentUserId, deleteFunc }) => {
    const dispatch = useDispatch<appDispatch>();
    console.log(itemId); //can be removed from the props!!
    
    const handleDeleteTemplate = () => {
        Swal.fire({
            title: 'אתה בטוח?',
            text: "לא תוכל לשחזר לאחר המחיקה!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'כן, מחק את זה!',
            cancelButtonText: 'לא, השאר את זה'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteFunc()); 
                Swal.fire(
                    'נמחק!',
                    'נמחק בהצלחה.',
                    'success'
                );
            }
        });
    };

    if (uploaderId !== currentUserId) {
        return null; 
    }

    return (
        <IconButton onClick={handleDeleteTemplate} color="default" sx={{ 
            position: 'absolute',
            top: 10, 
            right: 10,
            color:'#25173b',
            '&:hover': {
                color: '#eeb451', 
            }
            }}>
            <DeleteIcon />
        </IconButton>
    );
};

export default DeleteButton;
