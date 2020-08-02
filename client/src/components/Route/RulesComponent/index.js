import React from 'react'
import { Grid, Button, Divider, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"
import RuleListing from "../../Layout/RuleListing"

export default function () {
    return <Grid container spacing={3}>
        <Grid item xs={12}>
            <Grid container justify="space-between" align-items="center">

                <Typography variant="h4" style={{ fontSize: "21px" }}>Rules Listing</Typography>
                <Link
                    to="/rules/add"
                    style={{ textDecoration: "none" }}
                ><Button variant="contained" color="primary">Create Rule</Button></Link>
            </Grid>
            <Divider style={{ margin: "16px 0" }} />

        </Grid>
        <Grid item xs={12}>
            <RuleListing />
        </Grid>
    </Grid>
}