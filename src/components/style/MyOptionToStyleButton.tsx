const MyOptionToStyleButton=({onClick,isActive, children }:{onClick: Function,isActive: boolean, children:React.ReactNode})=>{
    return(
        <>
        <button onClick={()=>onClick()} 
            style={{
                backgroundColor: isActive ? '#ddd' : '#f0f0f0',
                border: '1px solid #ccc',
                borderRadius: '5px',
                cursor: 'pointer',
                alignItems: 'center',
                padding: '5px',
                margin: '1px'
            }}
            >
            {children}
            </button>
        </>
    )
};
export default MyOptionToStyleButton;
