import React, { useState, useEffect } from 'react';
import {
    Container, Grid
} from '@mui/material'
import LeftSide from './login/leftSideLogin';
import RightSide from './login/rightSideLogin';
import { useNavigate } from 'react-router';
import { useIsAuthenticated } from 'react-auth-kit';

const Login = () => {

    const navigate = useNavigate();
    const isAuthenticated = useIsAuthenticated();

    useEffect(() => {
        if (isAuthenticated()) {
              navigate('/')
        }
    }, )

    return (
        <Container maxWidth={false} disableGutters>
            <Grid container spacing={0}>
                <Grid item xs={6}>
                    <LeftSide/>
                </Grid>
                <Grid item xs={6} >
                    <RightSide/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Login;