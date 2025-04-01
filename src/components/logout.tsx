// logout.js
import Swal from 'sweetalert2';

export const logoutUser = (userDispatch: Function, navigate: Function, setIsLogin: Function ) => {
    Swal.fire({
        title: 'האם אתה בטוח?',
        text: "לאחר שתצא, תצטרך להתחבר שוב.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'כן, התנתק!',
        cancelButtonText: 'לא, נשאר',
    }).then((result) => {
        if (result.isConfirmed) {
            userDispatch({
                type: 'LOGOUT_USER'
            });
            setIsLogin(false);
            navigate('/');
            // console.log('User logged out');
        } 
    });
};
