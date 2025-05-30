import { DeleteOutline } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { appDispatch } from "../../Store/Store";
import '../cssPages/templates/DeleteButton.css';

interface DeleteButtonProps {
  uploaderId: number;
  currentUserId: number;
  deleteFunc: Function;
  showConfirmation: Function
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  uploaderId,
  currentUserId,
  deleteFunc,
  showConfirmation
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch<appDispatch>();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();

    showConfirmation({
      title: 'האם אתה בטוח?',
      message: 'לא תוכל לשחזר לאחר המחיקה!',
      type: 'warning',
      confirmText: 'כן, מחק את זה!',
      cancelText: 'לא, השאר את זה',
      isConfirmation: true,
      onConfirm: () => {
        dispatch(deleteFunc());
        showConfirmation({
          title: 'נמחק!',
          message: 'נמחק בהצלחה!',
          type: 'success',
          onConfirm: () => {} // כלום - סתם לסגירה
        });
      }
    });
  };

  if (uploaderId !== currentUserId) {
    return null;
  }

  return (
    <button className="cosmic-delete-button"
      onClick={handleDelete}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label='מחק פריט'
    >
      <DeleteOutline className="delete-icon" />
      <div className={`delete-tooltip ${isHovered ? 'visible' : ''}`}>
        מחק
      </div>
      <div className="button-glow"></div>
    </button>
  );
};

export default DeleteButton;


// import React, { useRef, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { DeleteOutline } from '@mui/icons-material';
// import { appDispatch } from '../../Store/Store';
// import '../cssPages/templates/DeleteButton.css';
// import MyAlert from '../style/MyAlert';

// interface DeleteButtonProps {
//   uploaderId: number;
//   currentUserId: number;
//   deleteFunc: Function;
// }

// const DeleteButton: React.FC<DeleteButtonProps> = ({
//   uploaderId,
//   currentUserId,
//   deleteFunc
// }) => {
//   const [isHovered, setIsHovered] = useState(false);
 
//   const dispatch = useDispatch<appDispatch>();
//   const [alertData, setAlertData] = useState<{
//     isOpen: boolean;
//     title: string;
//     message: string;
//     type: 'warning' | 'success';
//     confirmText?: string;
//     cancelText?: string;
//     isConfirmation?: boolean;
//   }>({
//     isOpen: false,
//     title: '',
//     message: '',
//     type: 'warning',
//   });
//   const onConfirmRef = useRef(() => { });

//   const handleDelete = (e: React.MouseEvent) => {
//     e.stopPropagation();

//     onConfirmRef.current = () => {
//       dispatch(deleteFunc());
//       setAlertData({
//         isOpen: true,
//         title: "נמחק!",
//         message: "נמחק בהצלחה!",
//         type: 'success'
//       })
//     };

//     setAlertData({
//       isOpen: true,
//       title: 'האם אתה בטוח?',
//       message: 'לא תוכל לשחזר לאחר המחיקה!',
//       type: 'warning',
//       confirmText: 'כן, מחק את זה!',
//       cancelText: 'לא, השאר את זה',
//       isConfirmation: true
//     });
//   };
//   if (uploaderId !== currentUserId) {
//     return null;
//   }

//   return (
//     <>
//       <button className="cosmic-delete-button"
//         onClick={handleDelete}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         aria-label='מחק פריט'
//       >
//         <DeleteOutline className="delete-icon" />
//         <div className={`delete-tooltip ${isHovered ? 'visible' : ''}`}>
//           מחק
//         </div>
//         <div className="button-glow"></div>
//       </button>
//       <MyAlert
//         isOpen={alertData.isOpen}
//         title={alertData.title}
//         message={alertData.message}
//         type={alertData.type}
//         confirmText={alertData.confirmText}
//         cancelText={alertData.cancelText}
//         onConfirm={() => {
//           setAlertData(prev => ({ ...prev, isOpen: false }));
//           if (alertData.isConfirmation) {
//             onConfirmRef.current();
//           }
//         }}
//         onCancel={() => {
//           setAlertData(prev => ({ ...prev, isOpen: false }));
//         }}
//       />
//     </>
//   );
// };

// export default DeleteButton;