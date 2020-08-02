import React, { useState, useEffect } from 'react'
import { Grid, Divider, Typography, TextField, Button, InputAdornment, Tooltip } from "@material-ui/core"
import { KeyboardBackspace } from "@material-ui/icons";
import { Link } from "react-router-dom"
import styled from "styled-components"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Help from '@material-ui/icons/Help'
import InputChipComponent from "../../Layout/InputChipComponent"
import axios from 'axios';
import { validateEmail } from "../../Utils.js";
import { useHistory } from "react-router-dom";
import Note from "../Note"
import Alert from "../Alert"
const SLKeyboardBackspace = styled(KeyboardBackspace)`
  display: inline;
  font-size: 30px;
  cursor: pointer;
  margin-right: 8px;
  margin-bottom: -5px;
`;
const ButtonContainer = styled.div`
margin-top:12px;
display:flex;
justify-content:flex-end;
`
export default function (props) {
    const history = useHistory();
    const [info, setInfo] = useState({ open: false, message: "", type: "error" });
    const [ruleName, setRuleName] = useState("")
    const [disabled, setDisabled] = useState(false)
    const [ruleId, setRuleId] = useState("");
    const [articleType, setArticleType] = useState("furniture")
    const [amountRule, setAmountRule] = useState("false")
    const [amountRuleValue, setAmountRuleValue] = useState("");
    const [tenureRule, setTenureRule] = useState("false")
    const [tenureRuleValue, setTenureRuleValue] = useState("");
    const [ageRule, setAgeRule] = useState("false")
    const [ageRuleValue, setAgeRuleValue] = useState("");
    const [productData, setProductData] = useState([])
    const [zipCodeData, setZipCodeData] = useState([])
    const [updatedBy, setUpdatedBy] = useState("")
    const [email, setEmailError] = useState({
        helperText: "",
        error: false
    })
    const API_URL = "http://localhost:3333/api/v1/";

    useEffect(() => {
        if (history.location.pathname === "/rules/edit") {
            if (!history.location.ruleId) {
                history.push("/");
            }
            else {
                if (history.location.isDisabled) {
                    setDisabled(true)
                }
                setRuleId(history.location.ruleId)
            }
        }
    }, [])
    const fetchRuleData = async () => {
        const url = `${API_URL}rule/${ruleId}`;
        const response = await axios.get(url);
        if (response && response.data && response.data.success) {
            setInfo({ open: true, message: "Rule has been fetched successfully.", type: "success" });
            const fetchedData = response.data.data;
            setAgeRule(fetchedData.ageRule)
            setAgeRuleValue(fetchedData.ageRuleValue)
            setAmountRule(fetchedData.amountRule)
            setAmountRuleValue(fetchedData.amountRuleValue)
            setProductData(fetchedData.productData)
            setRuleName(fetchedData.ruleName)
            setTenureRule(fetchedData.tenureRule)
            setTenureRuleValue(fetchedData.tenureRuleValue)
            setUpdatedBy(fetchedData.updatedBy)
            setZipCodeData(fetchedData.zipCodeData)
            setArticleType(fetchedData.articleType)
        }
        else {
            setInfo({ open: true, message: "Some error occurred during rule creation.", type: "error" });
        }
    }
    useEffect(() => {
        if (ruleId) {
            fetchRuleData()
        }
    }, [ruleId])
    const addProduct = prd => {
        let currentData = [...productData];
        currentData.push(prd);
        setProductData(currentData);
    }
    const deleteProduct = prd => {
        let currentData = [...productData];
        const index = currentData.indexOf(prd);
        if (index > -1) {
            currentData.splice(index, 1)
        }
        setProductData(currentData);
    }
    const addZipCode = prd => {
        let currentData = [...zipCodeData];
        currentData.push(prd);
        setZipCodeData(currentData);
    }
    const deleteZipCode = prd => {
        let currentData = [...zipCodeData];
        const index = currentData.indexOf(prd);
        if (index > -1) {
            currentData.splice(index, 1)
        }
        setZipCodeData(currentData);
    }
    const checkEmail = mail => {
        if (!validateEmail(mail)) {
            console.log("invalid")
            setEmailError({
                helperText: "Please enter a valid Email Id.",
                error: true
            })
        }
        else {
            setEmailError({
                helperText: "",
                error: false
            })
        }
    }
    const validateData = () => {
        if (!ruleName) {
            return [false, "Rule name is required."]
        }
        if (!articleType && !amountRuleValue && !tenureRuleValue && !ageRuleValue && !productData.length && !zipCodeData.length) {
            return [false, "At least one of the field under Amount, ArticleType, Tenure, Customer's age, Product or Zipcode is required."]
        }
        if (!updatedBy) {
            return [false, "Updated by is a mandatory field."]
        }
        if (!validateEmail(updatedBy)) {
            return [false, "Invalid mail id provided."]
        }
        return [true]
    }
    const createRule = async () => {
        const validated = validateData();
        if (validated[0]) {
            let data = {
                ruleId, ruleName, amountRule, articleType, amountRuleValue, tenureRule, tenureRuleValue, ageRule, ageRuleValue, productData, zipCodeData, updatedBy
            }
            const url = `${API_URL}rule/create`;
            const response = await axios.post(url, data);
            if (response && response.data && response.data.success) {
                setInfo({ open: true, message: "Rule has been added successfully. you will be navigated to listing screen", type: "success" });
                setTimeout(() => {
                    history.push("/")
                }, 1000)
            }
            else {
                setInfo({ open: true, message: "Some error occurred during rule creation", type: "error" });
            }
        }
        else {
            setInfo({ open: true, message: validated[1], type: "error" });
        }
    }
    const closeAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setInfo({ open: false, message: "", type: "error" });
    };
    return <React.Fragment>
        <Alert {...info} handleClose={closeAlert} />
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Grid container alignItems="center">
                    <Link to="/"
                        style={{ textDecoration: "none", color: "inherit" }}><SLKeyboardBackspace
                        /></Link>
                    <Typography variant="h4" style={{ fontSize: "21px" }}>{ruleId ? 'Update Rule' : 'Add Rule'}</Typography>
                </Grid>
                <Divider style={{ margin: "16px 0" }} />

            </Grid>
        </Grid>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <TextField disabled={disabled} value={ruleName} onChange={(ev) => setRuleName(ev.target.value)} required fullWidth label="Enter Rule Name"
                            placeholder="Enter Rule Name" />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Note info="Please select the filters below to add rules. By default equal to values will fall under Less than selection. At least one field is mandatory for creating a rule, please set the ruleas as per business requirements" />
            </Grid>
            <Grid item xs={12}>
                <div>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Article Type</FormLabel>
                        <RadioGroup row aria-label="articleType" name="articleType" value={articleType} onChange={(event) =>
                            setArticleType(event.target.value)}>
                            <FormControlLabel disabled={disabled} value={"furniture"} control={<Radio />} label="Furniture" />
                            <FormControlLabel disabled={disabled} value={"electronics"} control={<Radio />} label="Electronics" />
                        </RadioGroup>
                    </FormControl>
                </div>
            </Grid>
            <Grid item xs={12} md={3}>
                <div>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Rental Amount</FormLabel>
                        <RadioGroup row aria-label="gender" name="rentalAmount" value={amountRule} onChange={(event) =>
                            setAmountRule(event.target.value)}>
                            <FormControlLabel disabled={disabled} value={"false"} control={<Radio />} label="Less Than" />
                            <FormControlLabel disabled={disabled} value={"true"} control={<Radio />} label="Greater Than" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div>
                    <TextField disabled={disabled} type="number" value={amountRuleValue} onChange={(ev) => setAmountRuleValue(ev.target.value)}
                        placeholder="Enter Rental Amount" fullWidth
                        InputProps={{
                            startAdornment: <div style={{ paddingRight: "5px" }}>&#8377;</div>,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Tooltip title="Enter Rental amount in INR.">
                                        <Help />
                                    </Tooltip>
                                </InputAdornment>
                            )
                        }} />
                </div>
            </Grid>
            <Grid item xs={12} md={3}>
                <div>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Rental Tenure</FormLabel>
                        <RadioGroup row aria-label="gender" name="tenureDuration" value={tenureRule} onChange={(event) =>
                            setTenureRule(event.target.value)}>
                            <FormControlLabel disabled={disabled} value={"false"} control={<Radio />} label="Less Than" />
                            <FormControlLabel disabled={disabled} value={"true"} control={<Radio />} label="Greater Than" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div>
                    <TextField disabled={disabled} type="number" value={tenureRuleValue} onChange={(ev) => setTenureRuleValue(ev.target.value)}
                        placeholder="Enter Tenure Duration" fullWidth InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Tooltip title="Enter rental duration in months.">
                                        <Help />
                                    </Tooltip>
                                </InputAdornment>
                            )
                        }} />
                </div>
            </Grid>
            <Grid item xs={12} md={3}>
                <div>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Customer's Age</FormLabel>
                        <RadioGroup row aria-label="age" name="age" value={ageRule} onChange={(event) =>
                            setAgeRule(event.target.value)}>
                            <FormControlLabel disabled={disabled} value={"false"} control={<Radio />} label="Less Than" />
                            <FormControlLabel disabled={disabled} value={"true"} control={<Radio />} label="Greater Than" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div>
                    <TextField disabled={disabled} type="number" value={ageRuleValue} onChange={(ev) => setAgeRuleValue(ev.target.value)}
                        placeholder="Enter Customer Age" fullWidth InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Tooltip title="Enter Customer's age in years.">
                                        <Help />
                                    </Tooltip>
                                </InputAdornment>
                            )
                        }} />
                </div>
            </Grid>
            <Grid item xs={12}>
                <InputChipComponent disabled={disabled} label={"Add Product"} data={productData} addItem={addProduct} deleteItem={deleteProduct} />
            </Grid>
            <Grid item xs={12}>
                <InputChipComponent disabled={disabled} type={"number"} label={"Add Zip Code"} data={zipCodeData} addItem={addZipCode} deleteItem={deleteZipCode} />
            </Grid>
            <Grid item xs={12} md={3}>
                <TextField disabled={disabled} type={"email"} error={email.error} onBlur={() => checkEmail(updatedBy)}
                    helperText={email.helperText} value={updatedBy} onChange={(ev) => setUpdatedBy(ev.target.value)} required fullWidth label="Updated By"
                    placeholder="Updated By" />
            </Grid>
            <Grid item xs={12}>
                <Divider />
                <ButtonContainer>
                    <Button disabled={disabled} onClick={createRule} variant="contained" color="primary">{ruleId ? 'Update Rule' : 'Add Rule'}</Button>
                </ButtonContainer>
            </Grid>
        </Grid>
    </React.Fragment>
}