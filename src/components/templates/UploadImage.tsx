// import { useState } from 'react';
// import { API_URL } from '../../Types/UserTypes';
// import { Button } from '@mui/material';

// const UploadImage = (
//     { onImageUpload }: { onImageUpload: Function }
// ) => {
//     const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const files = event.target.files;
//         console.log(files);

//         if (files && files[0]) {
//             const file = files[0];
//             console.log(file);

//             const reader = new FileReader();

//             reader.onloadend = () => {
//                 console.log(reader.result);

//                 onImageUpload(reader.result); // קריאה לפונקציה כדי לעדכן את התמונה
//             };
//             reader.readAsDataURL(file); // קריאת הקובץ
//         }
//     };

//     return (
//         <>
//             <div>
//                 <input type="file" onChange={handleImageChange} />
//             </div>
//         </>
//     );
// };

// export default UploadImage;
