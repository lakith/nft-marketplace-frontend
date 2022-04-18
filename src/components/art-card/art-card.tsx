import React, {useState} from 'react';
import {Box, Card, CardContent, CardMedia, Typography} from "@mui/material";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import BuyNowModal from "../buy-now-modal/buy-now-modal";
import {NFT_BASE_URL} from "../../constants/constants";
import axios from "axios";

interface Props {
    id: string
    image: string
    artName: string
    maxBid: number
    bid: number
}

interface ICollection{
    _id: string,
    name: string,
    about: string,
    activeStatus: true,
    imageString: string,
}

interface IUser{
    name: string,
}

interface ICollectionResult{
    result: ICollection,
    userResult: IUser
}

interface ICollectionResponse {
    message: string,
    data: ICollectionResult
}

export default function ArtCard(props: Props) {

    const {image, artName, maxBid, bid, id} = props

    const [modalOpen, setArtCollectionOpen] = React.useState(false);
    const handleArtCardOpen = () => {
        setArtCollectionOpen(true)
        getArtCollectionData()
    };
    const handleArtCardClose = () => setArtCollectionOpen(false);

    const [collection, setCollection] = useState<ICollectionResult | null>(null);

    const getArtCollectionData = () => {
        console.log('trtrtr');
        axios.get<ICollectionResponse>(`${NFT_BASE_URL}/collection/get/${id}`).then(response => {
            setCollection(response.data.data)
            console.log("response now", response.data.data)

        }).catch(error => {
            console.log("response now dd")
            console.log(error)
        })
    };

    return (
        <>
            <div>
                <Card onClick={handleArtCardOpen} sx={{maxWidth: 250, borderRadius: '10px', maxHeight: '350px'}}>
                    <CardMedia
                        component="img"
                        height="250"
                        image={`data:image/png;base64, ${image}`}
                    />
                    <CardContent>
                        <Box sx={{marginBottom: '10px'}} display={'flex'}>
                            <Typography variant="subtitle2" component="div" fontWeight={"bold"}>
                                {artName}
                            </Typography>
                        </Box>
                        <Box sx={{marginTop: '20px', justifyContent: "space-between"}} flexGrow={1} display="flex">
                            <Box display={"flex"}>
                                <CircleOutlinedIcon sx={{height: '15px', marginTop: '3px'}}/>
                                <Typography variant="body2" fontWeight={"bold"}>
                                    {maxBid}
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{color: '#237efc'}}>
                                {`bid ${bid}`}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
                <BuyNowModal
                    openStatus={modalOpen}
                    artName={artName}
                    image={image}
                    owner={(collection && collection.userResult) ? collection.userResult.name : ''}
                    price={maxBid}
                    convertedPrice={maxBid}
                    about={(collection && collection.result) ? collection.result.about : ''}
                    onClose={handleArtCardClose}
                />
            </div>
        </>
    );
}
