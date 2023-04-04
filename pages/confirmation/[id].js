import { Button, Typography } from "@mui/material";
import CardLayout from "../../components/CardLayout";

import { useRouter } from 'next/router'
import Link from 'next/link'


export default function Confirmation(props) {

    const router = useRouter()

    const { id } = router.query

    return (
        <CardLayout maxWidth='60%'>
            <Typography variant='h4' align='left' sx={{ marginTop: 2, marginBottom: 2, fontWeight: 600 }}>
                Your order with id {id} has been confirmed!
            </Typography>
            <Typography variant='h6' align='left' sx={{ marginTop: 2, marginBottom: 2 }}>
                It will be delivered to your address within 3 days. The order may be delayed due to the current situation. Thank you for shopping with us!
            </Typography>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Link href='/' passHref>
                    <Button variant="outlined" sx={{ marginTop: 2, marginBottom: 2, fontWeight: 800 }}>Place another order</Button>
                </Link>
            </div>
        </CardLayout>
    )
}