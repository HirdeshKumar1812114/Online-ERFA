import React, { useState, useEffect } from 'react'
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
import emailjs from '@emailjs/browser';
const override = css`
  margin: 0 auto;
`;

const api = axios.create({
    baseURL: 'http://140.238.227.14:5000',
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
    const [valid, setValid] = useState('')
    const [isEmailVerified, setIsEmailVerified] = useState(false)
    const [sendLink, setSendLink] = useState('')
    const [toSend, setToSend] = useState({
    
        

        sendemail: '',
        sendlink:''

    });
//     useEffect(()=>{
//  console.log('In useEffect')

//         if(isEmailVerified === true ){
//             sendEmail()

//         }
//     },[isEmailVerified])
    
    // const sendEmail=()=>{ 
       
    //     console.log(toSend)
        
    //          emailjs.send('service_tjb9xxs', 'template_j1clt0n',{sendemail:username,
    //          sendlink:sendLink}, 'user_I8LA7r2KdKb8BaZWSCd4g')
    //          .then((result) => {
    //                   console.log(result.text);
    //               }, (error) => {
    //                   console.log(error.text);
    //               });
    // }
    const submitData = (e) => {
         e.preventDefault();
        

        if (username !== '' ) {
            api.post('student/checkemail', { email: username}, setLoading(true))
            .then(result => {
                setLoading(false)
           
                if(result.data.msg === 'Student Email is OK'){

                    setIsEmailVerified(true)
                    console.log(result.data.stdId)
                    const temp=result.data.stdId;
                    
                        const link=`http://localhost:3000/#/reset-password/${temp}`
                    
                       
                        
                         console.log(link);
                         console.log("Check state:"+sendLink)
                 
                         console.log("Check state:"+username)
                         console.log(toSend)
                        console.log(isEmailVerified)
                        emailjs.send('service_tjb9xxs', 'template_j1clt0n',{sendemail:username,
                            sendlink:link}, 'user_I8LA7r2KdKb8BaZWSCd4g')
                            .then((result) => {
                                     console.log(result.text);
                                 }, (error) => {
                                     console.log(error.text);
                                 });
                
               
        
                        }
                //;
                
                setValid("true")
                alert()
             
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
                        <Alert style={{ "margin-top": "-40px", "margin-bottom": "15px" }} onClose={() => { setValid("") }} severity="success">OK - <strong>Email Sent!</strong></Alert>
                       
                    </>
                )
            }
            else if (valid == "false") {

                return (<Alert style={{ "margin-top": "-40px", "margin-bottom": "15px" }} onClose={() => { setValid("") }} severity="error">ERROR — <strong>Email not registered!</strong></Alert>)
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
                                        <h3>Forget Password</h3>
                                    </CardHeader>
                                    <p className={classes.divider}>Enter your registered email</p>
                                    <CardBody>
                                        <CustomInput
                                            labelText="Email"
                                            id="username"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                onChange: (event) => {setUsername(event.target.value);
                                                    
                                                },
                                                type: "text",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <People className={classes.inputIconsColor} />

                                                    </InputAdornment>
                                                ),
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
            <prev >{JSON.stringify(username, null, 2)}</prev>
            <prev >{JSON.stringify(isEmailVerified, null, 2)}</prev>
            <prev >{JSON.stringify(sendLink, null, 2)}</prev>
            <prev>{JSON.stringify(password, null, 2)}</prev>
            <prev>{JSON.stringify(valid, null, 2)}</prev> */}
        </div>
    );
}