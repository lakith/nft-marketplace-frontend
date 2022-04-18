import {createStyles, makeStyles} from '@mui/styles';

export const collectionPageStyles = makeStyles((theme) => createStyles({
    sectionWrapper: {
        marginTop: '50px',
        marginLeft: '20px',
    },
    dropDownProperty: {
        [theme.breakpoints.up('xl')]: {
            width: '875px !important',
        },
        [theme.breakpoints.down('xl')]: {
            width: '650px !important',
        },
    },
    buttonWrapper: {
        marginTop: '30px !important',
        width: '80%',
        height: '30px !important',
        [theme.breakpoints.up('xl')]: {
            marginLeft: '5% !important',
        },
        [theme.breakpoints.down('xl')]: {
            marginLeft: '5% !important',
        },
        borderRadius: '50px !important',
        fontFamily: "'Roboto', 'Helvetica', 'Arial', 'sans-serif' !important",
        fontWeight: 'bold !important',
        fontSize: '18px !important',
    },
    cardWrapperText: {
        marginLeft: '1% !important',
    },
    cardWrapperList: {
        marginTop: '2% !important',
        marginBottom: '2% !important',
        marginLeft: '20px',
    },
}));
