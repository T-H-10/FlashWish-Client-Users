import { useContext, useState } from 'react';
import { TextField, Card, Typography, CircularProgress } from '@mui/material';
import { Send, Celebration } from '@mui/icons-material';
import axios from 'axios';
import { API_URL, UserContext } from '../../types/UserTypes';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import UseStyleAddNewForm from '../style/UseStyleAddNewForm';
import { GreetingMessagePostModel } from '../../types/GreetingMessageType';
import CategorySelector from '../templates/CategorySelector';
import { useDispatch } from 'react-redux';
import { appDispatch } from '../../Store/Store';
import { addGreetingMessage } from '../../Store/messagesStore/GreetingsMessagesApi';
const BlessingGenerator = ({ onClose }: { onClose: Function }) => {
    const classes = UseStyleAddNewForm();
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<appDispatch>();
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const { user } = useContext(UserContext);
    const generateBlessing = async () => {
        if (!prompt.trim()) return;
        setLoading(true);
        setResult(null);
        try {
            const response = await axios.post(`${API_URL}/Content/generate`, { prompt });
            setResult(response.data);
            console.log(response);
            if (response.data.title && response.data.content && response.data.signature) {
                const greetingData: GreetingMessagePostModel = {
                    ...response.data,
                    userID: user.id,
                    categoryID: selectedCategory
                };
                dispatch(addGreetingMessage(greetingData));
            }
            else {
                console.log('empty!');

            }
        } catch (error: any) {
            console.log('error.message', error.message);

            //   setResult({ error: 'שגיאה בבקשת הברכה' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card sx={{ maxWidth: 600, margin: 'auto', mt: 5, p: 3, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
                כתוב בקשה לקבלת ברכה
            </Typography>
            <CategorySelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <TextField
                label="מה תרצה שייכלל בברכה?"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                fullWidth
                multiline
                rows={3}
                margin="normal"
            />

            <div>
                <button onClick={generateBlessing} className={`${classes.button} ${classes.submitButton}`} disabled={loading}><Send /></button>
                <button onClick={generateBlessing} className={`${classes.button} ${classes.submitButton}`} disabled={loading}><CachedRoundedIcon /></button>
                <button onClick={onClose()} className={`${classes.button} ${classes.closeButton}`}>סגור</button>
            </div>
            {/* <Button
        variant="contained"
        color="primary"
        onClick={generateBlessing}
        endIcon={<Send />}
        disabled={loading}
      >
        בקש ברכה
      </Button> */}
            {/* <Button
        variant="contained"
        color="primary"
        onClick={generateBlessing}
        endIcon={<CachedRoundedIcon/>}
        disabled={loading}
      >
        בקש ברכה
      </Button> */}
            {loading && <CircularProgress sx={{ mt: 2 }} />}

            {/* {result && !result.error && (
        <Card sx={{ mt: 4, p: 2, backgroundColor: '#f9f9f9' }}>
          <CardContent>
            <Celebration color="secondary" fontSize="large" />
            <Typography variant="h6">{result.כותרת}</Typography>
            <Typography sx={{ my: 2 }}>{result.תוכן}</Typography>
            <Typography variant="subtitle2" align="right">{result.חתימה}</Typography>
          </CardContent>
        </Card>
      )} */}

            {/* {result?.error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {result.error}
        </Typography>
      )} */}
        </Card>
    );
};

export default BlessingGenerator;
