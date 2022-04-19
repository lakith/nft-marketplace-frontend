import React, {useState, useEffect} from 'react';
import {Box} from "@mui/material";
import Grid from '@mui/material/Grid';
import {listedCollectionPageStyles} from "./listed-collection-styles";
import CollectionCard from "../collection-card/collection-card";
import axios from "axios";
import {NFT_BASE_URL} from "../../constants/constants";

export interface ICollection{
    _id: string,
    name: string,
    about: string,
    activeStatus: true,
    imageString: string,
    creator: string,
}

interface ICollectionList {
    collections: ICollection[]
}

export interface ICollectionResponse {
    message: string,
    data: ICollectionList
}

export default function ListedCollection() {

    const [collectionList, setCollectionList] = useState<ICollection[]>([]);

    useEffect(() => {
        axios.get<ICollectionResponse>(`${NFT_BASE_URL}/collection/get`).then(response => {
            setCollectionList(response.data.data.collections)
            console.log("response", response.data.data.collections)
            collectionList.forEach(colection => console.log("collection", colection))

        }).catch(error => {
            console.log(error)
        })
    }, [])

    const onCollectionDelete = (id: string) => {
        const updatedCollection = collectionList.filter(collection => collection._id !== id )
        setCollectionList(updatedCollection)
    }

    const handleModalOpenCollection = () => {};

    const styles = listedCollectionPageStyles();



    return (
        <>
            <Box>
                <Box className={styles.cardWrapper}>
                    <Box className={styles.cardWrapperList}>
                        <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 15 }}>
                            {collectionList.map((collection, index) => (
                                <Grid item xs={2} sm={4} md={3} key={index}>
                                    <CollectionCard
                                        id={collection._id}
                                        image={collection.imageString}
                                        collectionName={collection.name}
                                        collectionDesc={collection.about}
                                        itemCount={"10K items"}
                                        FP={"FP 0.03"}
                                        creator={collection.creator}
                                        onClick={handleModalOpenCollection}
                                        onCollectionDelete={onCollectionDelete}
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
