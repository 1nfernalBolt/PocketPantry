import { makeStyles } from '@material-ui/core/styles'; 

export default makeStyles(() => ({
    
    logo:{
        height: '180px',
        length: '180px',
    },
    emailPic:{
        height: '80px',
        length: '80px',
        marginTop:'1%',
    },
    title: {
        fontFamily: 'Inria Sans',
        fontSize: '50px',
        marginTop: '10%',
        textAlign: 'left',
        marginLeft: '15%',
    },
    mainDiv: {
        margin: 'auto',
        marginTop: '5%',
        width: '30%',
        height: '500px',
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.9)',
        paddingTop: '1%',
        borderRadius:'25px',
        borderColor: 'black',
    },
    loginUsernameBox: {
        borderRadius: '8px',
        borderWidth: '0',
        display: 'inline-block',
        fontWeight: '500',
        marginTop: '5%',
        width: '70%',
        background: '#D4D4D4',
        fontSize: '30px',
        fontColor: '#FFFFFF',
        fontFamily: 'Inria Sans',
        padding: '1px 10px',

    },
    loginPasswordBox: {
        borderRadius: '8px',
        borderWidth: '0',
        display: 'inline-block',
        fontWeight: '500',
        marginTop: '5%',
        width: '70%',
        background: '#D4D4D4',
        fontSize: '30px',
        fontColor: '#FFFFFF',
        fontFamily: 'Inria Sans',
        padding: '1px 10px',
    },
    loginButton: {
        borderRadius: '8px',
        borderWidth: '0',
        cursor: 'pointer',
        display: 'inline-block',
        fontWeight: '500',
        listStyle: 'none',
        padding: '10px 12px',
        marginTop: '8%',
        width: '50%',
        background: '#A5DAAA',
        fontSize: '20px',
        fontColor: '#FFFFFF',
        fontFamily: 'Inria Sans',
    },
    forgotPass:{
        fontFamily: 'Inria Sans',
        fontSize: '20px',
        marginTop: '5%',
        textAlign: 'left',
        marginLeft: '15%',
        marginBottom: '-4%',
    },
    questionText:{
        fontFamily: 'Inria Sans',
        fontSize: '20px',
    },
    emailInstructions:{
        fontFamily: 'Inria Sans',
        fontSize: '30px',
        marginTop: '5%',
    },
    underline:{
        fontFamily: 'Inria Sans',
        fontSize: '20px',
        marginTop: '-5%',
    },
    
}));