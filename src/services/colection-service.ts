import axios from "axios";
import {NFT_BASE_URL} from "../constants/constants";
import {ICollectionResponse} from "../components/listed-collection/listed-collection";

export const createCollection = async (name: string, about: string, imageString: string, creator: string, token: string) => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    };

    axios
        .post(`${NFT_BASE_URL}/collection/create`, {
            name: name,
            about: about,
            activeStatus: true,
            imageString: imageString,
            creator: creator,
        }, config)
        .then(() => {
            alert("upload Complete");
        })
        .catch(() => {
            alert("Something went wrong");
        });

}

export const getCollections = async () => {

    axios.get<ICollectionResponse>(`${NFT_BASE_URL}/collection/get`).then(response => {
        return response.data.data.collections

    }).catch(error => {
        alert("Something went wrong");
    })

    // try {
    //     const response = await axios.get<ICollectionResponse>(
    //         `${NFT_BASE_URL}/collection/get`,
    //     );
    //
    //     if (response.data) {
    //         return response.data.data.collections;
    //     }
    // } catch (e) {
    //     alert("Something went wrong");
    // }
};