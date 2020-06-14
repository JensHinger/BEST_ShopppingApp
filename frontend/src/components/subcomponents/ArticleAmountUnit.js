import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Typography, Divider, Grid} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';

 class ArticleAmountUnit extends Component {

  constructor(props){
    super(props);

    this.state = {

        article: "",
        amount: 0,
        unit: 0,
        
    }

    

  }

    handleAmountChange (value) {
        this.setState({amount:value})
        console.log(this.state.amount)
    };
   
    handleUnitChange (value) {
        this.setState({unit:value})
    };

    render() {

        const units = [
            {
                value: 0,
                label: 'St',
            },
            {
                value: 1,
                label: 'kg',
            },
            {
                value: 2,
                label: 'g',
            },
            {
                value: 3,
                label: 'L',
            },
            {
                value: 4,
                label: 'ml',
            },
            {
                value: 5,
                label: 'm',
            },
            {
                value: 6,
                label: 'cm',
            },
          ];

          const artikel = [
            { title: 'Rahmspinat', brand: 'Iglo' },
            { title: 'Fischstäbchen', brand: 'Iglo' },];

        return (
            <div>
                <Typography variant='h6' component='h1' align='center'>
                <br margin-top = '20px'/>
                Eintrag hinzufügen
                <Divider/>
                <Grid container>
                <Grid item sm >

                <Autocomplete
                id="combo-box-demo"
                options={artikel}
                getOptionLabel={(option) => option.title}
                style={{ width: 200 }}
                renderInput={(params) =><TextField {...params} label="Artikel"  />}
                />
                </Grid>

                <Grid item sm >
                <TextField
                label="Menge"
                helperText="Geben Sie eine Menge an"
                onChange = {(event) => this.handleAmountChange(event.target.value)}/>
                </Grid>


                
                <Grid item sm >
                <TextField
                id="standard-select-currency"
                select
                label="Select"
                
                onChange = {(event) => this.handleUnitChange(event.target.value)}
                helperText="Please select your Unit"
                >
                    {units.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                </Grid>
                </Grid>
                
                </Typography>
                
            </div>
        )
    }
}

export default ArticleAmountUnit
