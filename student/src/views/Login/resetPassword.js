import React, { useState, useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import People from "@material-ui/icons/People";
// core components
import Alert from '@mui/material/Alert';
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Auth from "../../Auth/auth"
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import axios from 'axios';
import image from "assets/img/bg7.jpg";
import { useCookies } from 'react-cookie';
import { css } from "@emotion/react";
import RingLoader from "react-spinners/RingLoader";
import emailjs from '@emailjs/browser';
const override = css`
  margin: 0 auto;
`;

const api = axios.create({
    baseURL: 'https://server.syedmustafaimam.com/',
});

const useStyles = makeStyles(styles);

export default function forgetPassword(props) {
    const [token, setToken] = useCookies(['onlineerfa_admin_token']);
    const [userID, setUserID] = useCookies(['onlineerfa_admin_userID']);
    const [userType, setUserType] = useCookies(['onlineerfa_admin_userType']);
    const [userEmail, setUserEmail] = useCookies(['onlineerfa_admin_userEmail']);

    const [loading, setLoading] = useState(false)
    let [color, setColor] = useState("#49A54D");

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPassMatch, setIsPassMatch] = useState(false);
    const [passMessage, setPassMessage] = useState("");
    const [valid, setValid] = useState('')
    const {id} = useParams();
    const checkPasswordValidataion = (e) => {
  
        setConfirmPassword(e.target.value);
        const chckPass = e.target.value;
        if (password === chckPass) {
          setPassMessage("Password Matched!");
          setIsPassMatch(true);
         
        } else {
          setPassMessage("Password does not match!");
          e.preventDefault();
          e.stopPropagation();
          setIsPassMatch(false);
        }
      };
    
    const submitData = (e) => {
        e.preventDefault();
   
        if (password !== '' ) {
            api.post(`student/reset-password/${id}`, {  password }, setLoading(true)).then(result => {
                setLoading(false)
                //  console.log(result.data)
                // console.log(result.data.token)
                // window.alert('Welcome to Admin Portal')
                setValid("true")
                alert()
                props.history.push("/login")
                // window.alert('Welcome to Admin Portal')
            }).catch(err => {
                setLoading(false)
                // console.log(err)
                setValid("false")
                alert()
            })
           
        } else {
            // window.alert('Please fill all the fields')
            setValid("incomplete")
            alert()
        }
        alert()
    }
    const alert = () => {
        if (valid != "") {
            if (valid == "true") {
                return (
                    <>
                        <Alert style={{ "margin-top": "-40px", "margin-bottom": "15px" }} onClose={() => { setValid("") }} severity="success">OK - <strong>Password Changed!</strong></Alert>
                        <Redirect to='/login' />
                    </>
                )
            }
            else if (valid == "false") {

                return (<Alert style={{ "margin-top": "-40px", "margin-bottom": "15px" }} onClose={() => { setValid("") }} severity="error">ERROR — <strong>Password Not Changed!</strong></Alert>)
            }
            else {
                return (<Alert style={{ "margin-top": "-40px", "margin-bottom": "15px" }} onClose={() => { setValid("") }} severity="warning">ALERT — <strong>Please fill all fields!</strong></Alert>)
            }
        }
        else {
            return (
                <>
                </>)
        }
    }

    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;

    return (
        <div>
            <Header
                absolute
                color="transparent"
                brand="ONLINE ERFA"
                rightLinks={<HeaderLinks />}
                {...rest}
            />
            <div
                className={classes.pageHeader}
                style={{
                    backgroundImage: "url(" + image + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                }}
            >
                <div className={classes.container}>
                    {alert()}

                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={4}>
                            <Card className={classes[cardAnimaton]}>
                                <form className={classes.form}>
                                    <CardHeader color="success" className={classes.cardHeader}>
                                        <h3>Reset Password</h3>
                                    </CardHeader>
                                    <p className={classes.divider}>Enter your new password </p>
                                    <p
                    className={classes.divider}
                   
                    style={{
                   
                     
                      fontSize: "12px",
                   
                    }}
                  >
                    {passMessage}
                  </p>
                                    <CardBody>
                                    <CustomInput
                          labelText="Password"
                          id="password"
                          name="password"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            onChange: (event) =>
                              setPassword(event.target.value),
                            type: "password",
                            endAdornment: (
                              <InputAdornment position="end">
                                <Icon className={classes.inputIconsColor}>
                                  lock_outline
                                </Icon>
                              </InputAdornment>
                            ),
                            autoComplete: "off",
                          }}
                        />

<CustomInput
                          labelText="Confirm Password"
                          id="confirmpass"
                          name="confirmpass"
                          formControlProps={{  fullWidth: true,}}
                          inputProps={{
                            onChange: (event) =>{
                              checkPasswordValidataion(event);
                            },
                            type: "password",
                            endAdornment: (
                              <InputAdornment position="end">
                                <Icon className={classes.inputIconsColor}>
                                  lock_outline
                                </Icon>
                              </InputAdornment>
                            ),
                            autoComplete: "off",
                          }}
                        />
                                    </CardBody>
                                    <br />
                                    <CardFooter className={classes.cardFooter}>
                                        <Button simple color="primary" size="lg" onClick={submitData}>
                                            {loading == true ? <RingLoader color={color} css={override} size={25} /> : <>Reset password</>}
                                        </Button >
                                    </CardFooter>
                                </form>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
                <Footer whiteFont />
            </div>
            {/*
            <prev >{JSON.stringify(id, null, 2)}</prev>
            <prev>{JSON.stringify(password, null, 2)}</prev>
            <prev>{JSON.stringify(valid, null, 2)}</prev> */}
        </div>
    );
}