import React from 'react';
import '../../cssPages/messages/BlessingOptions.css';

interface BlessingOptionsProps {
  tone: string;
  setTone: (tone: string) => void;
  rhymed: boolean;
  setRhymed: (rhymed: boolean) => void;
  length: string;
  setLength: (length: string) => void;
  gender: string;
  setGender: (gender: string) => void;
  requiredWords: string;
  setRequiredWords: (words: string) => void;
}

const BlessingOptions: React.FC<BlessingOptionsProps> = ({
  tone,
  setTone,
  rhymed,
  setRhymed,
  length,
  setLength,
  gender,
  setGender,
  requiredWords,
  setRequiredWords
}) => {
  return (
    <div className="cosmic-blessing-options">
      <div className="options-row">
        <div className="option-group">
          <label className="option-label">סגנון ברכה</label>
          <div className="cosmic-select-container">
            <select 
              value={tone} 
              onChange={(e) => setTone(e.target.value)}
              className="cosmic-select"
            >
              <option value="מרגש">מרגש</option>
              <option value="רשמי">רשמי</option>
              <option value="קליל">קליל</option>
              <option value="מצחיק">מצחיק</option>
            </select>
            <div className="select-arrow"></div>
          </div>
        </div>
        
        <div className="option-group">
          <label className="option-label">אורך רצוי</label>
          <div className="cosmic-select-container">
            <select 
              value={length} 
              onChange={(e) => setLength(e.target.value)}
              className="cosmic-select"
            >
              <option value="קצר">קצר</option>
              <option value="בינוני">בינוני</option>
              <option value="ארוך">ארוך</option>
            </select>
            <div className="select-arrow"></div>
          </div>
        </div>
      </div>
      
      <div className="options-row">
        <div className="option-group">
          <label className="option-label">מין מקבל הברכה</label>
          <div className="cosmic-select-container">
            <select 
              value={gender} 
              onChange={(e) => setGender(e.target.value)}
              className="cosmic-select"
            >
              <option value="זכר">זכר</option>
              <option value="נקבה">נקבה</option>
              <option value="לא ידוע">לא ידוע</option>
            </select>
            <div className="select-arrow"></div>
          </div>
        </div>
        
        <div className="option-group checkbox-group">
          <label className="checkbox-container">
            <input 
              type="checkbox" 
              checked={rhymed} 
              onChange={(e) => setRhymed(e.target.checked)} 
              className="cosmic-checkbox"
            />
            <span className="checkbox-label">בחרוזים</span>
            <span className="checkbox-custom"></span>
          </label>
        </div>
      </div>
      
      <div className="option-group full-width">
        <label className="option-label">מילים שחובה להכניס (מופרדות בפסיקים)</label>
        <input
          type="text"
          value={requiredWords}
          onChange={(e) => setRequiredWords(e.target.value)}
          className="cosmic-input"
          placeholder="לדוגמה: אהבה, שמחה, הצלחה"
        />
      </div>
    </div>
  );
};

export default BlessingOptions;