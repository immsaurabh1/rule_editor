import React, { useState } from 'react'
import { Grid, TextField, InputAdornment, IconButton, Tooltip } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Chip } from "@material-ui/core";


export default function (props) {
    const [value, setValue] = useState("")
    return <Grid container >
        <Grid item xs={12} md={6}>
            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        disabled={props.disabled}
                        value={value}
                        fullWidth
                        label={props.label}
                        placeholder={props.label}
                        margin="normal"
                        type={props.type || "text"}
                        onChange={(ev) => setValue(ev.target.value.trimLeft())}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton disabled={props.disabled} onClick={() => {
                                        if (!value) return
                                        setValue("")
                                        props.addItem(value)
                                    }}><Tooltip title="Enter value and click this button to add">
                                            <AddCircleIcon color={props.disabled ? "disabled" : "secondary"} />
                                        </Tooltip>
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {props.data.map((item, index) => {
                        return <Chip disabled={props.disabled} key={item + index} label={item} onDelete={() => props.deleteItem(item)} color="primary" variant="outlined" />
                    })}
                </Grid>
            </Grid>
        </Grid>
    </Grid>
}