import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const Create = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <>
            <Typography>{t('create.description')}</Typography>
            <Button onClick={() => navigate('/')}>{t('create.exit')}</Button>
        </>
    )
}