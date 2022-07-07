import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"

export const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <Typography>Velkommen til turplanleggeren!</Typography>
            <Button onClick={() => navigate('/opprett')}>Opprett tur</Button>
        </>
    )
}