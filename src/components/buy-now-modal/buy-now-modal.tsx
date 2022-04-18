import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {IMAGE_PATH} from "../../constants/constants";
import {modalStyles} from './buy-now-modal-styles';
import {Button, Typography} from "@mui/material";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import IosShareIcon from '@mui/icons-material/IosShare';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0px 0px 30px #0000001A',
    borderRadius: '10px',
    p: 5,
    background: 'white',
    width: '50%',
};

interface Props {
    artName: string;
    image: string
    owner: string
    price: number
    convertedPrice: number
    about: string
    openStatus: boolean
    onClose: () => void
}

export default function BuyNowModal(props: Props) {

    const {image, owner, price, about, openStatus, onClose, artName, convertedPrice} = props

    const styles = modalStyles();
    const [open, setOpen] = React.useState(openStatus);

    React.useEffect(() => {
        if (openStatus === true) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [openStatus]);

    const handleClose = () => {
        onClose()
        setOpen(false)
    }

    return (
        <div>
            <Modal
                open={open}
                BackdropProps={{
                    style: {
                        backdropFilter: 'blur(10px)',
                        background: 'rgba(255, 255, 255, 0.2)',
                        WebkitBackdropFilter: 'blur(10px)',
                    },
                }}
                disableAutoFocus={true}
            >
                <Box sx={style}>
                    <Box>
                        <Box display={'flex'} sx={{justifyContent: 'end'}}>
                            <img
                                src={`${IMAGE_PATH}${'/close.png'}`}
                                alt={'close Icon'}
                                className={styles.icons}
                                onClick={handleClose}
                            />
                        </Box>
                        <Box className={styles.sectionWrapper}>
                            <Box className={styles.section}>
                                <img src={`data:image/png;base64, ${image}`} className={styles.image}/>
                            </Box>
                            <Box className={styles.section}>
                                <Box>
                                    <Typography variant="subtitle2" fontWeight={"bold"}>
                                        {artName}
                                    </Typography>
                                    <Typography className={styles.blueText} sx={{fontSize: '13px'}}>
                                        {`Owned By: ${owner}`}
                                    </Typography>
                                </Box>
                                <Box sx={{marginTop: '20px'}} flexGrow={1}>
                                    <Box sx={{marginTop: '20px'}} flexGrow={1}>
                                        <Typography variant="subtitle2" fontWeight={"bold"} className={styles.blueText}>
                                            Current Price
                                        </Typography>
                                        <Box display={'flex'} sx={{marginTop: '10px'}}>
                                            <LocalOfferIcon className={styles.tagIcon}/>
                                            <Typography fontWeight={"bold"}
                                                        sx={{marginLeft: '8px', marginRight: '8px'}}>
                                                {price}
                                            </Typography>
                                            <Typography fontWeight={"bold"} sx={{color: '#c2c2c2'}}>
                                                {convertedPrice}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{marginTop: '20px', justifyContent: "space-between"}} display={"flex"}>
                                    <Box display={"flex"}>
                                        <Typography sx={{color: '#c2c2c2', marginRight: '10px'}}>
                                            Attributes
                                        </Typography>
                                        <Typography className={styles.blueText}>
                                            About
                                        </Typography>
                                    </Box>
                                    <IosShareIcon className={styles.tagIcon}/>
                                </Box>
                                <Box sx={{marginTop: '5px'}} className={styles.aboutBox}>
                                    <Typography>
                                        {about}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box flexGrow={1} sx={{marginTop: '150px'}} display={"flex"}>
                            <Box display={"flex"} flexGrow={1}>
                                <img
                                    src={`${IMAGE_PATH}${'/left-arrow.png'}`}
                                    className={styles.arrows}
                                />
                                <Button className={styles.buyNowBtn}>Buy Now</Button>
                            </Box>
                            <Box display={"flex"} flexGrow={1}>
                                <Button className={styles.offerBtn}>Make Offer</Button>
                                <img
                                    src={`${IMAGE_PATH}${'/right-arrow.jpg'}`}
                                    className={styles.arrows}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
