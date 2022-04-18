import React, {useState} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import FileUpload from "react-material-file-upload";
import {createArtCollection} from "../../services/art-colection-service";
import {useSelector} from "react-redux";
import {RootStore} from "../../store";
import {useParams} from "react-router-dom";

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

const initialFormValues = {
    name: '',
    bid: '',
};

export default function NewArt() {

    const [formValues, setFormValues] = useState(initialFormValues);
    const [files, setFiles] = useState<File[]>([]);
    const loginData = useSelector((state: RootStore) => state.login);
    let { collectionId } = useParams();

    const onSubmit = () => {
        let base64String: string;

        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function () {
            const result = reader.result
            if (typeof result === "string") {
                base64String = result.replace("data:", "")
                    .replace(/^.+,/, "");

                if (loginData && loginData.user && loginData.user.user && loginData.user.token) {
                    if (collectionId) {
                        createArtCollection(formValues.name, formValues.bid, base64String, collectionId, loginData.user.token)
                    }
                }
            }
        }
        reader.onerror = function (error) {
            alert("Something went wrong");
        };


    }

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const {name, value} = e.target;

        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    return (
        <>
            <Box sx={style}>
                <Box>
                    <Box sx={{color: '#237efc'}}>
                        <Typography variant="h4" fontWeight={"bold"}>
                            Add a new art
                        </Typography>
                    </Box>
                    <Box sx={{marginTop: '35px'}} display={"flex"}>
                        <Typography variant="subtitle2" fontWeight={"bold"}
                                    sx={{marginRight: '16px'}}>
                            Image
                        </Typography>
                        <FileUpload value={files} onChange={setFiles}/>
                    </Box>
                    <Box sx={{marginTop: '20px'}} display={"flex"}>
                        <Typography variant="subtitle2" fontWeight={"bold"}
                                    sx={{marginRight: '20px', marginTop: '10px'}}>
                            Name
                        </Typography>
                        <TextField label="Name" variant="outlined" size="small" sx={{width: '50%'}} name="name"
                                   onChange={handleInputChange}/>
                    </Box>
                    <Box sx={{marginTop: '20px'}} display={"flex"}>
                        <Typography variant="subtitle2" fontWeight={"bold"}
                                    sx={{marginRight: '20px', marginTop: '10px'}}>
                            Price
                        </Typography>
                        <TextField label="Price" name="bid" variant="outlined" size="small" sx={{width: '50%'}}
                                   onChange={handleInputChange}/>
                    </Box>
                    <Box display={'flex'} sx={{justifyContent: 'end', marginTop: '30px'}}>
                        <Button variant="contained" onClick={onSubmit}>Add</Button>
                    </Box>
                </Box>

            </Box>
        </>
    );
}
