import UseStylesHome from "./style/UseStyleHome";

const Home = () => {
    const classes = UseStylesHome();

    return (
        <div className={classes.homeContainer} style={{ marginTop: '60px' }}>
            <div className={classes.homeContent}>
                <h1>ברוכים הבאים לאפליקציית הברכות שלנו!</h1>
                <p >
                    כאן תוכלו לבחור תבנית לרקע העמוד ותוכן לברכה וליצור ברכה מעוצבת מוכנה להדפסה.
                    האפליקציה שלנו מאפשרת לכם ליצור ברכות ייחודיות ומרהיבות בקלות ובמהירות.
                </p>
                <h2>דוגמאות לעיצובים אפשריים:</h2>
                <div className={classes.designExamples}>
                    <div className={classes.designExample}>
                        <img src="example1.png" alt="עיצוב 1" className={classes.designExampleImg} />
                        <p>עיצוב קלאסי</p>
                    </div>
                    <div className={classes.designExample}>
                        <img src="example2.png" alt="עיצוב 2" className={classes.designExampleImg} />
                        <p>עיצוב מודרני</p>
                    </div>
                    <div className={classes.designExample}>
                        <img src="example3.png" alt="עיצוב 3" className={classes.designExampleImg} />
                        <p>עיצוב צבעוני</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;