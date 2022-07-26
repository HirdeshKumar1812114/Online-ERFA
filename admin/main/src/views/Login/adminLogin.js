import React, { useState, useRef, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
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
import forgetPassword from './forgetPassword';
const override = css`
  margin: 0 auto;
`;

const api = axios.create({
    baseURL: 'http://localhost:5000/',
});


const useStyles = makeStyles(styles);

export default function LoginPage(props) {
    const [token, setToken] = useCookies(['onlineerfa_admin_token']);
    const [userID, setUserID] = useCookies(['onlineerfa_admin_userID']);
    const [userType, setUserType] = useCookies(['onlineerfa_admin_userType']);
    const [userEmail, setUserEmail] = useCookies(['onlineerfa_admin_userEmail']);
    const [userId, setUserId] = useCookies(['onlineerfa_admin_userId']);

    const [loading, setLoading] = useState(false)
    const [showTimer, setShowTimer] = useState(false)

    let [color, setColor] = useState("#49A54D");


    useEffect(() => {
        if (token.onlineerfa_admin_token != null) {
            api.get('erfa/dashboard', {
                headers: {
                    'x-auth-token': token.onlineerfa_admin_token
                }
            }).then((result) => {
                // console.log(result.data)
                Auth.login(() => {
                    // return (<Redirect to={'/dashboard'} />)
                    props.history.push('/dashboard')
                })
            })


        }
    }, [])




    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [valid, setValid] = useState('')
    const [count, setCount] = useState(0)

    const submitData = (e) => {

        e.preventDefault();
        console.log({ count });
        if (username !== '' && password !== '') {

            if (count < 4) {
                api.post('erfa/login', { email: username, password }, setLoading(true)).then(result => {
                    setLoading(false)
                     console.log(result.data)
                    // console.log(result.data.token)
                    setToken('onlineerfa_admin_token', result.data.token, { path: '/', maxAge: 1800, secure: true })
                    setUserID('onlineerfa_admin_userID', result.data.sendUserName, { path: '/', maxAge: 1800, secure: true })
                    setUserType('onlineerfa_admin_userType', result.data.sendUserType, { path: '/', maxAge: 1800, secure: true })
                    setUserEmail('onlineerfa_admin_userEmail', result.data.sendUserEmail, { path: '/', maxAge: 1800, secure: true })
                    setUserId('onlineerfa_admin_userId', result.data.sendUserId, { path: '/', maxAge: 1800, secure: true })

                    
                    // window.alert('Welcome to Admin Portal')
                    setValid("true")
                    alert()
                    Auth.login(() => {
                        props.history.push("/")
                    })
                    // window.alert('Welcome to Admin Portal')

                }).catch(err => {
                    setCount(count + 1)
                    setLoading(false)
                    // console.log(err)
                    setValid("false")
                    alert()
                })
            } else {

                // window.alert('Multiple attempts')
                setValid("multi")
                alert()
                setShowTimer(true)
                onClickReset()
                setTimeout(() => {
                    setCount(0)
                    setShowTimer(false)
                    setValid("")
                    alert()
                }, 30000)

            }

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
                        <Alert style={{ "margin-top": "-40px", "margin-bottom": "15px" }} onClose={() => { setValid("") }} severity="success">OK - <strong>Login Successful. </strong></Alert>
                        <Redirect to='/' />
                    </>
                )
            }
            else if (valid == "false") {

                return (<Alert style={{ "margin-top": "-40px", "margin-bottom": "15px" }} onClose={() => { setValid("") }} severity="error">ERROR — <strong>Invalid Credentials!</strong></Alert>)
            }
            else if (valid == "multi") {

                return (<Alert style={{ "margin-top": "-40px", "margin-bottom": "15px" }} severity="error">ALERT — <strong>Multiple failed attempts please re-try after {timer} seconds!</strong></Alert>)
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

    const forgetPassword = () => {
        props.history.push('forget-password')
    }
    // Timmer 
    const Ref = useRef(null);

    // The state for our timer
    const [timer, setTimer] = useState('00');


    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 * 60 * 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }


    const startTimer = (e) => {
        let { total, hours, minutes, seconds }
            = getTimeRemaining(e);
        if (total >= 0) {

            setTimer(
                (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }


    const clearTimer = (e) => {
        setTimer('30');


        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();

        deadline.setSeconds(deadline.getSeconds() + 30);
        return deadline;
    }

    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);


    const onClickReset = () => {
        clearTimer(getDeadTime());
    }
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
                                        <h3>ERFA Admin Portal</h3>
                                    </CardHeader>
                                    <p className={classes.divider}>Enter your Credentials</p>
                                    <CardBody>
                                        <CustomInput
                                            labelText="Email"
                                            id="username"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                onChange: (event) => setUsername(event.target.value),
                                                type: "text",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <People className={classes.inputIconsColor} />

                                                    </InputAdornment>
                                                ),
                                            }}

                                        />
                                        <CustomInput
                                            labelText="Password"
                                            id="pass"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                onChange: (event) => setPassword(event.target.value),
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
                                        {showTimer == true ?
                                            <Button color="danger" variant="ghost" disabled onClick={submitData}>
                                                Locked
                                            </Button >
                                            :
                                            <Button simple color="primary" size="lg" onClick={submitData}>
                                                {loading == true ? <RingLoader color={color} css={override} size={25} /> : <>Login</>}
                                            </Button >
                                        }


                                        <Button simple onClick={() => { forgetPassword() }} color="primary">
                                            Forget Password
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
                <Footer whiteFont />
            </div>
            {/* <prev >{JSON.stringify(username, null, 2)}</prev>
            <prev>{JSON.stringify(valid, null, 2)}</prev>
            <prev>{JSON.stringify(count, null, 2)}</prev>
            
            */}
        </div>
    );
}