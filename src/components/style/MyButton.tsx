const MyButton=({onClick, content }:{onClick:Function, content:string})=>{
    return(
        <>
        <button
                    onClick={()=>onClick()}
                    style={{
                        margin: '5px',
                        padding: '10px',
                        backgroundColor: '#f0f0f0',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    {content}
                </button>
        </>
    )
};
export default MyButton;