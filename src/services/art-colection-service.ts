import axios from "axios";
import {NFT_BASE_URL} from "../constants/constants";

export const createArtCollection = async (name: string, bid: string, imageString: string, artCollection: string, token: string) => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    };

    axios
        .post(`${NFT_BASE_URL}/art/create`, {
            name: name,
            bid: bid,
            activeStatus: true,
            imageString: imageString,
            artCollection: artCollection,
        }, config)
        .then(() => {
            alert("upload Complete");
        })
        .catch(() => {
            alert("Something went wrong");
        });

}
