import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { DeleteOutline } from '@mui/icons-material';
import { appDispatch } from '../../Store/Store';
import '../cssPages/templates/DeleteButton.css';

interface CosmicDeleteButtonProps {
  uploaderId: number;
  currentUserId: number;
  deleteFunc: Function;
}

const DeleteButton: React.FC<CosmicDeleteButtonProps> = ({ 
  uploaderId, 
  currentUserId, 
  deleteFunc 
}) => {
  const dispatch = useDispatch<appDispatch>();
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    Swal.fire({
      title: 'האם אתה בטוח?',
      text: "לא תוכל לשחזר לאחר המחיקה!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'כן, מחק את זה!',
      cancelButtonText: 'לא, השאר את זה',
      background: '#25173b',
      color: '#ffffff',
      iconColor: '#ff6b6b',
      confirmButtonColor: '#fbbe65',
      cancelButtonColor: '#352252',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteFunc());
        Swal.fire({
          title: 'נמחק!',
          text: 'נמחק בהצלחה',
          icon: 'success',
          background: '#25173b',
          color: '#ffffff',
          iconColor: '#4caf50',
          confirmButtonColor: '#fbbe65',
        });
      }
    });
  };
  if (uploaderId !== currentUserId) {
    return null;
  }

  return (
    <button className="cosmic-delete-button" onClick={handleDelete}>
      <DeleteOutline className="delete-icon" />
      <div className="button-glow"></div>
    </button>
  );
};

export default DeleteButton;

// import React from 'react';
// import { IconButton } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Swal from 'sweetalert2';
// import { useDispatch } from 'react-redux';
// import { appDispatch } from '../../Store/Store';
// // import { deleteTemplate } from '../../Store/templatesStore/TemplatesApi';

// type DeleteButtonProps= {
//     // itemId: number;
//     uploaderId: number; // מזהה המשתמש שהעלה את התמונה
//     currentUserId: number; // מזהה המשתמש המחובר
//     deleteFunc: Function;
// }

// const DeleteButton: React.FC<DeleteButtonProps> = ({ uploaderId, currentUserId, deleteFunc }) => {
//     const dispatch = useDispatch<appDispatch>();
    
//     const handleDeleteTemplate = () => {
//         Swal.fire({
//             title: 'אתה בטוח?',
//             text: "לא תוכל לשחזר לאחר המחיקה!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonText: 'כן, מחק את זה!',
//             cancelButtonText: 'לא, השאר את זה'
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 dispatch(deleteFunc()); 
//                 Swal.fire(
//                     'נמחק!',
//                     'נמחק בהצלחה.',
//                     'success'
//                 );
//             }
//         });
//     };

//     if (uploaderId !== currentUserId) {
//         return null; 
//     }

//     return (
//         <IconButton onClick={handleDeleteTemplate} color="default" sx={{ 
//             position: 'absolute',
//             top: 10, 
//             right: 10,
//             color:'#25173b',
//             '&:hover': {
//                 color: '#eeb451', 
//             }
//             }}>
//             <DeleteIcon />
//         </IconButton>
//     );
// };

// export default DeleteButton;
