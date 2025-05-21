import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MyAlert from './style/MyAlert';

interface Props {
  setIsLogin: (val: boolean) => void;
  onClose: () => void;
}

const LogoutUser = ({ setIsLogin, onClose }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isConfirmOpen, setIsConfirmOpen] = useState(true); // מתחיל פתוח

  const handleConfirm = () => {
    dispatch({ type: 'LOGOUT_USER' });
    setIsLogin(false);
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/');
    onClose();
  };

  const handleCancel = () => {
    setIsConfirmOpen(false);
    onClose();
  };

  return (
    <>
      {isConfirmOpen && (
        <MyAlert
          isOpen={true}
          title="האם אתה בטוח?"
          message="לאחר שתצא, תצטרך להתחבר שוב"
          type="warning"
          confirmText="כן, התנתק"
          cancelText="לא, השאר"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default LogoutUser;