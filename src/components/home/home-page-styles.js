import {createStyles, makeStyles} from '@mui/styles';

export const homePageStyles = makeStyles((theme) => createStyles({
    mainWrapper: {
        [theme.breakpoints.up('xl')]: {
            marginLeft: '-2% !important',
        },
        [theme.breakpoints.down('xl')]: {
            marginLeft: '-4.5% !important',
        },
    },
    sectionWrapper: {
        marginTop: '20px',
        [theme.breakpoints.up('xl')]: {
            marginLeft: '-75%',
        },
        [theme.breakpoints.down('xl')]: {
            marginLeft: '-65%',
        },
    },
    section: {
        width: '45%',
        height: '250px',
    },
    buttonWrapper: {
        marginTop: '30px !important',
        width: '80%',
        height: '60px !important',
        [theme.breakpoints.up('xl')]: {
            marginLeft: '-30% !important',
        },
        [theme.breakpoints.down('xl')]: {
            marginLeft: '-25% !important',
        },
        borderRadius: '50px !important',
        fontFamily: "'Roboto', 'Helvetica', 'Arial', 'sans-serif' !important",
        fontWeight: 'bold !important',
        fontSize: '18px !important',
    },
    cardWrapper: {
        marginTop: '10% !important',
        [theme.breakpoints.up('xl')]: {
            marginLeft: '-75%',
        },
        [theme.breakpoints.down('xl')]: {
            marginLeft: '-82%',
        },
    },
    cardWrapperText: {
        marginLeft: '1% !important',
    },
    cardWrapperList: {
        marginTop: '2% !important',
        marginBottom: '2% !important',
        marginLeft: '20px',
    },
    cardWrapperTextViewAll: {
        cursor: 'pointer !important',
        color: '#533fb5 !important',
        marginLeft: '500px !important',
        marginTop: '-1.75% !important',
    },
}));
