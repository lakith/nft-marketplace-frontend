import {createStyles, makeStyles} from '@mui/styles';

export const modalStyles = makeStyles((theme) => createStyles({
    icons: {
        height: '50px',
        '&:hover': {
            cursor: 'pointer !important',
        },
    },
    sectionWrapper: {
        justifyContent: 'center',
        display: 'flex'
    },
    section: {
        width: '45%',
        height: '250px',
    },
    image: {
        height: '350px',
        width: '95%',
        borderRadius: '20px',
    },
    blueText: {
        color: '#237efc'
    },
    tagIcon: {
        fill: '#237efc',
        height: '22px'
    },
    aboutBox: {
        borderRadius: '10px',
        borderColor: '#237efc',
        border: 'solid 2px',
        padding: '10px',
        height: '160px',
        overflow: 'scroll',
    },
    buyNowBtn: {
        width: '80%',
        backgroundColor: '#237efc',
        color: 'white',
        marginLeft: '30px',
        marginRight: '5px',
        '&:hover': {
            backgroundColor: '#237efc',
        },
    },
    offerBtn: {
        width: '80%',
        borderColor: '#237efc',
        border: 'solid 2px',
        marginRight: '30px',
        marginLeft: '5px',
    },
    arrows:{
        height: '40px',
        width: '30px',
        '&:hover': {
            cursor: 'pointer !important',
        },
    }
}));
