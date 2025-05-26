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
import GeneratorHeader from './GeneratorHeader';
import GeneratorLoading from './GeneratorLoading';

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
  const [error, setError]= useState<string | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [, setSaveError] = useState<string | null>(null);

  const dispatch = useDispatch<appDispatch>();
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const { user } = useContext(UserContext);

  const generateBlessing = async () => {
    if (!prompt.trim() || !selectedCategory) return;
    
    setLoading(true);
    setResult(null);
    setError(null);
    
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
        setError('לא הצלחנו לייצר ברכה. נסה שנית עם הנחיות אחרות.');
      }
    } catch (error: any) {
      console.error('Error:', error.message);
      setError('אירעה שגיאה בעת יצירת הברכה. אנא נסה שנית.');
    } finally {
      setLoading(false);
    }
  };
  
  const saveBlessing = async () => {
    if (!result) return;
    setIsSaving(true);
    setSaveError(null);

    try{
      await dispatch(addGreetingMessage(result)).unwrap();
      onClose();
    } catch (error: any) {
      console.error('Error saving blessing:', error.message);
      setSaveError('אירעה שגיאה בעת שמירת הברכה. אנא נסה שנית.');
    } finally {
      setIsSaving(false);
    }};
    
    const handleClose=()=>{
      if(!isSaving) {
        onClose();
      }
    }

  return (
    <div className="cosmic-blessing-generator">
      <GeneratorHeader/>
      <div className="generator-form">
        <div className="form-group">
          <label className="form-label">קטגוריה</label>
          <CategoriesListContext.Consumer>
            {() => (
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
        
        {error && (
          <div className="cosmic-error-message">
            <p>{error}</p>
          </div>
        )}

        <ActionButtons 
          onGenerate={generateBlessing} 
          onClose={handleClose} 
          disabled={loading || !prompt.trim() || !selectedCategory} 
        />
      </div>
      
      {loading && <GeneratorLoading/>}

      {result && (
        <BlessingPreview 
          blessing={result} 
          onSave={saveBlessing} 
          isSaving={isSaving}
        />
      )}
    </div>
  );
};

export default BlessingGenerator;
