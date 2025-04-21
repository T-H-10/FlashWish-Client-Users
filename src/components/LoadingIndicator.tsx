import { CircularProgress } from "@mui/material";

const LoadingIndicator = ({content}:{content:string}) => (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
        <CircularProgress />
        <h2 style={{ marginLeft: '10px' }}>{content}</h2>
    </div>
);

export default LoadingIndicator;