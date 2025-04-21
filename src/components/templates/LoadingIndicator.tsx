import { CircularProgress } from "@mui/material";

const LoadingIndicator = () => (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
        <CircularProgress />
        <h2 style={{ marginLeft: '10px' }}>מעלה רקעים...</h2>
    </div>
);

export default LoadingIndicator;