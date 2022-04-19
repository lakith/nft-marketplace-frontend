import React, {useEffect, useState} from 'react';
import {Box, Button, Typography} from "@mui/material";
import {homePageStyles} from "./home-page-styles";
import Grid from '@mui/material/Grid';
import {NFT} from "../../constants/constants";
import CollectionCard from "../collection-card/collection-card";
import {useNavigate} from "react-router-dom";
import {ICollection, ICollectionResponse} from "../listed-collection/listed-collection";
import axios from "axios";
import {NFT_BASE_URL} from "../../constants/constants";

const style = {
    position: 'absolute',
    top: '10%',
    left: '45%',
};

export default function HomePage() {

    const [collectionList, setCollectionList] = useState<ICollection[]>([]);

    useEffect(() => {
        axios.get<ICollectionResponse>(`${NFT_BASE_URL}/collection/get`).then(response => {
            setCollectionList(response.data.data.collections)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const styles = homePageStyles();

    const navigate = useNavigate();

    const onRowClick = () => {
        navigate(`/${NFT}/listed-collection`);
    };

    const onCollectionClick = () => {
        navigate(`/${NFT}/new-collection`);
    };

    const handleModalOpenCollection = () => {
    };

    return (
        <>
            <Box sx={style}>
                <Box flexGrow={1} sx={{color: '#030303'}}>
                    <Typography variant="h4" className={styles.mainWrapper} fontWeight={"bold"}>
                        Submit Collection
                    </Typography>
                </Box>
                <Box flexGrow={1} className={styles.sectionWrapper} sx={{color: '#030303'}}>
                    <Typography variant="h6" textAlign={'center'}>
                        Do you have a based generative NFT collections with more than 100
                        to thousand of users!
                    </Typography>
                    <Typography variant="h6" textAlign={'center'}>
                        pices? Submit your collection below to be added to our Marketplace and shon
                    </Typography>
                    <Typography variant="h6" textAlign={'center'}>
                        to thousnds of users!
                    </Typography>
                </Box>
                <Box flexGrow={1}>
                    <Button variant="contained" onClick={() => onCollectionClick()} className={styles.buttonWrapper}>
                        Apply Here
                    </Button>
                </Box>
                <Box className={styles.cardWrapper}>
                    <Box>
                        <Typography variant="h4" flexGrow={1} className={styles.cardWrapperText} fontWeight={"bold"}>
                            Recently Listed Collections
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h6" onClick={() => onRowClick()} flexGrow={1}
                                    className={styles.cardWrapperTextViewAll}>
                            View all ...
                        </Typography>
                    </Box>
                    <Box className={styles.cardWrapperList}>
                        <Grid container spacing={{xs: 2, md: 2}} columns={{xs: 4, sm: 8, md: 12}}>
                            {collectionList.map((collection, index) => {
                                if (index < 4) {
                                    return (
                                        <Grid item xs={2} sm={4} md={3} key={index}>
                                            <CollectionCard
                                                image={collection.imageString}
                                                collectionName={collection.name}
                                                collectionDesc={collection.about}
                                                itemCount={"10K items"}
                                                FP={"FP 0.03"}
                                                onClick={handleModalOpenCollection}
                                                id={collection._id}
                                            />
                                        </Grid>
                                    );
                                }
                            })}
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
