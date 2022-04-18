import React, {useEffect, useState} from 'react';
import {Box, Button, Select, TextField, Typography} from "@mui/material";
import {collectionPageStyles} from "./collection-page-styles";
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import ArtCard from "../art-card/art-card";
import {NFT, NFT_BASE_URL} from "../../constants/constants";
import theme from "../../theme";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import { SelectChangeEvent } from '@mui/material/Select';

interface IArt{
    _id: string,
    name: string,
    bid: number,
    activeStatus: true,
    imageString: string,
    artCollection: string,
}

interface IArtList {
    arts: IArt[]
}

interface IArtResponse {
    message: string,
    data: IArtList
}


export default function CollectionPage() {

    const navigate = useNavigate();
    let { collectionId } = useParams();
    const [artList, setArtList] = useState<IArt[]>([]);
    const [serchString, setSearchString] = useState<string | null>(null);

    useEffect(() => {
        axios.get<IArtResponse>(`${NFT_BASE_URL}/art/get/collection/${collectionId}`).then(response => {
            setArtList(response.data.data.arts)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const handleInputChange = (event: SelectChangeEvent) => {
        console.log("collectionId", collectionId)
        axios.post<IArtResponse>(`${NFT_BASE_URL}/art/filter`, {
            id: collectionId,
            state: 3,
            from: "",
            to: ""
        }).then((response) => {
            setArtList(response.data.data.arts)
        }).catch((error) => console.log(error))
    };

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target
        setSearchString(value)
    }

    const searchString = () => {
        axios.post<IArtResponse>(`${NFT_BASE_URL}/art/filter`, {
            id: collectionId,
            searchString: serchString,
            state: 1,
            from: "",
            to: ""
        }).then((response) => {
            setArtList(response.data.data.arts)
        }).catch((error) => console.log(error))
    }

    const onArtCollectionClick = () => {
        navigate(`/${NFT}/new-art/${collectionId}`);
    };

    const styles = collectionPageStyles();

    return (
        <>
            <Box>
                <Box className={styles.sectionWrapper}>
                    <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                        <Grid item xs={6}>
                            <Box flexGrow={1}>
                                <Box
                                    sx={{
                                        maxWidth: '100%',
                                        [theme.breakpoints.up('xl')]: {
                                            width: 1200,
                                        },
                                        [theme.breakpoints.down('xl')]: {
                                            width: 850,
                                        },
                                    }}
                                >
                                    <TextField fullWidth label="search" onChange={handleChange} id="search"/>
                                    <Button variant="contained" onClick={searchString}>Search</Button>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Select
                                className={styles.dropDownProperty}
                                name="stain"
                                onChange={handleInputChange}
                                displayEmpty
                                inputProps={{'aria-label': 'Without label'}}
                                defaultValue={"1"}
                            >
                                <MenuItem value={1}>
                                    <Typography>Price: Low to high</Typography>
                                </MenuItem>
                                <MenuItem value={2}>
                                    <Typography>Price: High to low</Typography>
                                </MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    <Box>
                        <Button variant="contained" onClick={() => onArtCollectionClick()}
                                className={styles.buttonWrapper}>
                           Add New Art
                        </Button>
                    </Box>
                </Box>
                <Box>
                    <Box className={styles.cardWrapperList}>
                        <Grid container spacing={{xs: 2, md: 2}} columns={{xs: 4, sm: 8, md: 15}}>
                            {artList.map((art, index) => (
                                <Grid item xs={2} sm={4} md={3} key={index}>
                                    <ArtCard
                                        id={collectionId ? collectionId : ''}
                                        image={art.imageString}
                                        artName={art.name}
                                        maxBid={art.bid}
                                        bid={art.bid}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
