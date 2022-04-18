import React, {useState} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import FileUpload from "react-material-file-upload";
import {createCollection} from "../../services/colection-service";
import {useSelector} from "react-redux";
import {RootStore} from "../../store";

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
    about: '',
};

export default function NewCollection() {

    const [formValues, setFormValues] = useState(initialFormValues);
    const [files, setFiles] = useState<File[]>([]);
    const loginData = useSelector((state: RootStore) => state.login);

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
                    createCollection(formValues.name, formValues.about, base64String, loginData.user.user.id, loginData.user.token)
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
                            Create a new collection
                        </Typography>
                    </Box>
                    <Box sx={{marginTop: '35px'}} display={"flex"}>
                        <Typography variant="subtitle2" fontWeight={"bold"}
                                    sx={{marginRight: '16px'}}>
                            Collection Image
                        </Typography>
                        <FileUpload value={files} onChange={setFiles}/>
                    </Box>
                    <Box sx={{marginTop: '20px'}} display={"flex"}>
                        <Typography variant="subtitle2" fontWeight={"bold"}
                                    sx={{marginRight: '20px', marginTop: '10px'}}>
                            Collection Name
                        </Typography>
                        <TextField label="collection Name" variant="outlined" size="small" sx={{width: '50%'}}
                                   name="name" onChange={handleInputChange}/>
                    </Box>
                    <Box sx={{marginTop: '20px'}} display={"flex"}>
                        <Typography variant="subtitle2" fontWeight={"bold"}
                                    sx={{marginRight: '18px', marginTop: '10px'}}>
                            About Collection
                        </Typography>
                        <TextField label="About" variant="outlined" size="small" sx={{width: '50%'}} multiline
                                   name="about" onChange={handleInputChange}/>
                    </Box>
                    <Box display={'flex'} sx={{justifyContent: 'end', marginTop: '30px'}}>
                        <Button variant="contained" onClick={onSubmit}>Create</Button>
                    </Box>
                </Box>

            </Box>
        </>
    );
}
