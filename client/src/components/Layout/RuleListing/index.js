import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from "@material-ui/core/IconButton"
import { useHistory } from "react-router-dom";
import Alert from "../Alert"
import Hidden from '@material-ui/core/Hidden';
import styled from "styled-components"

const CustomIconButton = styled(IconButton)`
    @media (max-width: 600px) {
        &.custom-root{
        padding:8px
    }
    }

`
export default function (props) {
    const history = useHistory();
    const API_URL = "http://localhost:3333/api/v1/";
    const [ruleList, setRuleList] = useState([])
    const [info, setInfo] = useState({ open: false, message: "", type: "error" });
    useEffect(() => {
        loadListingData()
    }, [])

    const loadListingData = async () => {
        try {
            const url = `${API_URL}ruleList`;
            const listingResponse = await axios.get(url);
            if (listingResponse.data && listingResponse.data.success) {
                setRuleList(listingResponse.data.data)
            }
        } catch (err) {
            setInfo({ open: true, message: err, type: "error" });
        }
    }
    const editRule = (id, mode) => {
        let historyObj = {
            pathname: "/rules/edit",
            ruleId: `${id}`
        }
        if (mode === "view") {
            historyObj.isDisabled = true
        }
        history.push(historyObj)

    }
    const deleteRule = async (id) => {
        try {
            const url = `${API_URL}deleteRule/${id}`;
            const deleteResponse = await axios.delete(url);
            if (deleteResponse.data && deleteResponse.data.success) {
                setInfo({ open: true, message: "Rule has been deleted successfully.", type: "success" });
                loadListingData();
            }
        } catch (err) {
            setInfo({ open: true, message: "some error occured during rule deletion", type: "error" });
        }
    }
    const closeAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setInfo({ open: false, message: "", type: "error" });
    };

    return <div>
        <Alert {...info} handleClose={closeAlert} />
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Rule Name</TableCell>
                        <Hidden smDown>
                            <TableCell >Article Type</TableCell>
                        </Hidden>
                        <Hidden xsDown>
                            <TableCell >Created By</TableCell>
                        </Hidden>

                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ruleList.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                                {row.ruleName}
                            </TableCell>
                            <Hidden smDown>
                                <TableCell >{row.articleType}</TableCell>
                            </Hidden>
                            <Hidden xsDown>
                                <TableCell >{row.updatedBy}</TableCell>
                            </Hidden>
                            <TableCell align="center">
                                <Tooltip title="Click to view this rule set.">
                                    <CustomIconButton classes={{ root: 'custom-root' }} onClick={() => editRule(row._id, "view")}>
                                        <VisibilityIcon color="secondary" />
                                    </CustomIconButton>
                                </Tooltip>
                                <Tooltip title="Click to make modifications in existing rule set.">
                                    <CustomIconButton classes={{ root: 'custom-root' }} onClick={() => editRule(row._id)}>
                                        <EditIcon color="secondary" />
                                    </CustomIconButton>
                                </Tooltip>
                                <Tooltip title="Click to delete this rule set.">
                                    <CustomIconButton fontSize="small" classes={{ root: 'custom-root' }} onClick={() => deleteRule(row._id)}>
                                        <DeleteIcon color="secondary" />
                                    </CustomIconButton >
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
}