import React from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { appDispatch } from '../../Store/Store';
import { deleteTemplate } from '../../Store/templatesStore/TemplatesApi';

type DeleteButtonProps= {
    itemId: number;
    uploaderId: number; // מזהה המשתמש שהעלה את התמונה
    currentUserId: number; // מזהה המשתמש המחובר
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ itemId, uploaderId, currentUserId }) => {
    const dispatch = useDispatch<appDispatch>();

    const handleDeleteTemplate = () => {
        Swal.fire({
            title: 'אתה בטוח?',
            text: "לא תוכל לשחזר את התמונה לאחר המחיקה!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'כן, מחק את זה!',
            cancelButtonText: 'לא, השאר את זה'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteTemplate(itemId)); // שליחת פעולה למחיקת התמונה
                Swal.fire(
                    'מחק!',
                    'התמונה נמחקה בהצלחה.',
                    'success'
                );
            }
        });
    };

    if (uploaderId !== currentUserId) {
        return null; // אם המשתמש המחובר אינו זה שהעלה את התמונה, לא להציג את הכפתור
    }

    return (
        <IconButton onClick={handleDeleteTemplate} color="error" sx={{ position: 'absolute', top: 10, right: 10 }}>
            <DeleteIcon />
        </IconButton>
    );
};

export default DeleteButton;
