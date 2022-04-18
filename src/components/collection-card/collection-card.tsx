import React from 'react';
import {Box, Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {collectionCardPageStyles} from "./collection-card-styles";
import {useNavigate, useParams} from "react-router-dom";
import {NFT} from "../../constants/constants";
import {useSelector} from "react-redux";
import {RootStore} from "../../store";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

interface Props {
    image: string
    collectionName: string
    collectionDesc: string
    itemCount: string
    FP: string,
    creator?: string
    id: string
    onClick: any
    onCollectionDelete?: any
}

export default function CollectionCard(props: Props) {

    const {image, collectionName, collectionDesc, itemCount, FP, creator , id ,onClick, onCollectionDelete} = props

    const styles = collectionCardPageStyles();
    const navigate = useNavigate();
    const loginDatanew = useSelector((state: RootStore) => state.login);

    const onNavigationClick = () => {
        onClick()
        navigate(`/${NFT}/collection-page/${id}`);
    };

    const deleteCollection = (id : string) => {
        if(loginDatanew && loginDatanew.user && loginDatanew.user.user && loginDatanew.user.token) {
            const config : AxiosRequestConfig = {
                headers: {
                    Authorization: loginDatanew.user.token
                }
            }
            axios.delete(`http://localhost:3500/api/collection/delete/${id}`, config).then((response: AxiosResponse) => {
                onCollectionDelete(id)
            }).catch(error => {
                console.log(error)
            })
        }
    }

    const displayButton = ()  => {
        if(loginDatanew && loginDatanew.user && loginDatanew.user.user && loginDatanew.user.token) {
            if(loginDatanew.user.user.id === creator || loginDatanew.user.user.role === "ADMIN") {
                return true
            } else {
                return false
            }
        }
    }

    return (
        <>
            <Card sx={{maxWidth: 350, borderRadius: '20px'}}>
                <CardMedia
                    component="img"
                    height="250"
                    image={`data:image/png;base64, ${image}`}
                    onClick={onNavigationClick}
                />
                <Box sx={{height: '10px', backgroundColor: '#533fb5', width: '350px'}}/>
                <CardContent sx={{backgroundColor: "#e4e3e6"}}>
                    <Box sx={{marginBottom: '10px'}} display={'flex'}>
                        <Typography variant="subtitle2" component="div" fontWeight={"bold"} sx={{marginRight: '5px'}}>
                            {collectionName}
                        </Typography>
                        <CheckCircleIcon color="primary" sx={{height: '15px', marginTop: '3px'}}/>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        {collectionDesc}
                    </Typography>
                    <Box sx={{marginTop: '10px', justifyContent: "center"}} flexGrow={1} display="flex">
                        <Typography variant="body2" color="text.secondary">
                            {itemCount}
                        </Typography>
                        <Typography variant="body2" color="text.secondary"
                                    sx={{marginLeft: '10px', marginRight: '10px'}}>
                            |
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {FP}
                        </Typography>
                    </Box>
                    { displayButton() ? (
                        <Button className={styles.buttonWrapper} onClick={() => deleteCollection(id)} variant="contained">
                            Delete Collection
                        </Button>
                    ) : null}

                </CardContent>
            </Card>
        </>
    );
}
