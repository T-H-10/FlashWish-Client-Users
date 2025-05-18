import React, { useContext, useState } from 'react';
import axios from 'axios';
import { API_URL, UserContext } from '../../../types/UserTypes';
import { GreetingMessagePostModel } from '../../../types/GreetingMessageType';
import { useDispatch } from 'react-redux';
import { appDispatch } from '../../../Store/Store';
import BlessingPreview from './BlessingPreview';
import ActionButtons from './ActionButtons';
import PromptInput from './PromptInput';
import { CategoriesListContext } from '../../CategoriesList';
import CategorySelector from '../../CategorySelector';
import { addGreetingMessage } from '../../../Store/messagesStore/GreetingsMessagesApi';
import BlessingOptions from './BlessingOptions';
import '../../cssPages/messages/BlessingGenerator.css';

interface BlessingGeneratorProps {
  onClose: () => void;
}

const BlessingGenerator: React.FC<BlessingGeneratorProps> = ({ onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState('מרגש');
  const [rhymed, setRhymed] = useState(false);
  const [length, setLength] = useState('בינוני');
  const [gender, setGender] = useState('לא ידוע');
  const [requiredWords, setRequiredWords] = useState('');
  
  const [result, setResult] = useState<null | GreetingMessagePostModel>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<appDispatch>();
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const { user } = useContext(UserContext);

  const generateBlessing = async () => {
    if (!prompt.trim() || !selectedCategory) return;
    
    setLoading(true);
    setResult(null);
    
    try {
      const importantWords = requiredWords
        .split(',')
        .map(w => w.trim())
        .filter(Boolean);
  
      const response = await axios.post(`${API_URL}/Content/generate`, {
        prompt,
        style: tone,
        rhyming: rhymed,
        length,
        recipientGender: gender,
        importantWords
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (response.data.title && response.data.content && response.data.signature) {
        setResult({
          ...response.data,
          userID: user.id,
          categoryID: selectedCategory,
        });
      } else {
        setResult(null);
      }
    } catch (error: any) {
      console.error('Error:', error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const saveBlessing = () => {
    if (result) {
      dispatch(addGreetingMessage(result));
      onClose();
    }
  };

  return (
    <div className="cosmic-blessing-generator">
      <h2 className="generator-title">בקש ברכה אישית</h2>
      
      <div className="generator-form">
        <div className="form-group">
          <label className="form-label">קטגוריה</label>
          <CategoriesListContext.Consumer>
            {(
              // categories
            ) => (
              <CategorySelector 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} 
              />
            )}
          </CategoriesListContext.Consumer>
        </div>
        
        <BlessingOptions 
          tone={tone}
          setTone={setTone}
          rhymed={rhymed}
          setRhymed={setRhymed}
          length={length}
          setLength={setLength}
          gender={gender}
          setGender={setGender}
          requiredWords={requiredWords}
          setRequiredWords={setRequiredWords}
        />
        
        <PromptInput 
          prompt={prompt} 
          setPrompt={setPrompt} 
        />
        
        <ActionButtons 
          onGenerate={generateBlessing} 
          onClose={onClose} 
          disabled={loading || !prompt.trim() || !selectedCategory} 
        />
      </div>
      
      {loading && (
        <div className="cosmic-loading">
          <div className="cosmic-loader"></div>
          <span>יוצר ברכה מותאמת אישית...</span>
        </div>
      )}
      
      {result && (
        <BlessingPreview 
          blessing={result} 
          onSave={saveBlessing} 
        />
      )}
    </div>
  );
};

export default BlessingGenerator;

// import { useContext, useState } from 'react';
// import { Card, Typography, CircularProgress, FormControl, InputLabel, Select, MenuItem, TextField, Checkbox, FormControlLabel } from '@mui/material';
// import axios from 'axios';
// import { API_URL, UserContext } from '../../../types/UserTypes';
// import { GreetingMessagePostModel } from '../../../types/GreetingMessageType';
// import { useDispatch } from 'react-redux';
// import { appDispatch } from '../../../Store/Store';
// import { addGreetingMessage } from '../../../Store/messagesStore/GreetingsMessagesApi';
// import CategorySelector from '../../CategorySelector';
// import PromptInput from './PromptInput';
// import ActionButtons from './ActionButtons';
// import BlessingPreview from './BlessingPreview';

// const BlessingGenerator = ({ onClose }: { onClose: () => {} }) => {
//   const [prompt, setPrompt] = useState('');
//   const [tone, setTone] = useState('מרגש'); // סגנון
//   const [rhymed, setRhymed] = useState(false); // האם בחרוזים
//   const [length, setLength] = useState('בינוני'); // אורך
//   const [gender, setGender] = useState('לא ידוע'); // מין המקבל
//   const [requiredWords, setRequiredWords] = useState(''); // מילים חובה

//   const [result, setResult] = useState<null | GreetingMessagePostModel>(null);
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch<appDispatch>();
//   const [selectedCategory, setSelectedCategory] = useState<number>(0);
//   const { user } = useContext(UserContext);

//   const generateBlessing = async () => {
//     if (!prompt.trim()) return;
//     setLoading(true);
//     setResult(null);
//     try {
//       const importantWords = requiredWords
//         .split(',')
//         .map(w => w.trim())
//         .filter(Boolean);
  
//       const response = await axios.post(`${API_URL}/Content/generate`, {
//         prompt,
//         style: tone,
//         rhyming: rhymed,
//         length,
//         recipientGender: gender,
//         importantWords
//       },{
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
  
//       if (response.data.title && response.data.content && response.data.signature) {
//         setResult({
//           ...response.data,
//           userID: user.id,
//           categoryID: selectedCategory,
//         });
//       } else {
//         setResult(null);
//       }
//     } catch (error: any) {
//       console.error('Error:', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const saveBlessing = () => {
//     if (result) {
//       dispatch(addGreetingMessage(result));
//       onClose();
//     }
//   };

//   return (
//     <Card sx={{ maxWidth: 600, margin: 'auto', mt: 5, p: 3 }}>
//       <Typography variant="h5" gutterBottom textAlign="center">
//         בקש ברכה אישית
//       </Typography>

//       <CategorySelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
//       <FormControl fullWidth margin="normal">
//         <InputLabel>סגנון ברכה</InputLabel>
//         <Select value={tone} onChange={(e) => setTone(e.target.value)}>
//           <MenuItem value="מרגש">מרגש</MenuItem>
//           <MenuItem value="רשמי">רשמי</MenuItem>
//           <MenuItem value="קליל">קליל</MenuItem>
//           <MenuItem value="מצחיק">מצחיק</MenuItem>
//         </Select>
//       </FormControl>

//       <FormControlLabel
//         control={<Checkbox checked={rhymed} onChange={(e) => setRhymed(e.target.checked)} />}
//         label="בחרוזים"
//       />

//       <FormControl fullWidth margin="normal">
//         <InputLabel>אורך רצוי</InputLabel>
//         <Select value={length} onChange={(e) => setLength(e.target.value)}>
//           <MenuItem value="קצר">קצר</MenuItem>
//           <MenuItem value="בינוני">בינוני</MenuItem>
//           <MenuItem value="ארוך">ארוך</MenuItem>
//         </Select>
//       </FormControl>

//       <FormControl fullWidth margin="normal">
//         <InputLabel>מין מקבל הברכה</InputLabel>
//         <Select value={gender} onChange={(e) => setGender(e.target.value)}>
//           <MenuItem value="זכר">זכר</MenuItem>
//           <MenuItem value="נקבה">נקבה</MenuItem>
//           <MenuItem value="לא ידוע">לא ידוע</MenuItem>
//         </Select>
//       </FormControl>

//       <TextField
//         label="מילים שחובה להכניס (מופרדות בפסיקים)"
//         value={requiredWords}
//         onChange={(e) => setRequiredWords(e.target.value)}
//         fullWidth
//         margin="normal"
//       />

//       <PromptInput prompt={prompt} setPrompt={setPrompt} />
//       <ActionButtons onGenerate={generateBlessing} onClose={onClose} disabled={loading} />
//       {loading && <CircularProgress sx={{ mt: 2, display: 'block', mx: 'auto' }} />}
//       {result && <BlessingPreview blessing={result} onSave={saveBlessing} />}
//     </Card>
//   );
// };

// export default BlessingGenerator;
