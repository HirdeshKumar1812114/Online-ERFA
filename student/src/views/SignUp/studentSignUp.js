import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import People from "@material-ui/icons/People";
// core components
import Alert from "@mui/material/Alert";
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
import { TextField } from "@material-ui/core";
import Link from "@mui/material/Link";
import Auth from "../../Auth/auth";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import axios from "axios";
import image from "assets/img/bg7.jpg";
import { useCookies } from "react-cookie";
import { css } from "@emotion/react";
import RingLoader from "react-spinners/RingLoader";
import BadgeIcon from "@mui/icons-material/BadgeOutlined";
import People2 from "@mui/icons-material/AccountCircleOutlined";
import Degree from "@mui/icons-material/SchoolOutlined";
import Group from "@mui/icons-material/GroupWorkOutlined";
import Phone from "@mui/icons-material/PhoneAndroidOutlined";
import Email from "@mui/icons-material/EmailOutlined";
import Calendar from "@mui/icons-material/CalendarToday";
import Father from "@mui/icons-material/EscalatorWarningOutlined";
import MailingAddress from "@mui/icons-material/ContactMailOutlined";
import Location from "@mui/icons-material/LocationOnOutlined";
const override = css`
  margin: 0 auto;
`;

const api = axios.create({
  baseURL: "http://localhost:5000/",
  timeout: 1000,
});

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [token, setToken] = useCookies(["token"]);
  const [userID, setUserID] = useCookies(["userID"]);
  const [userType, setUserType] = useCookies(["userType"]);
  const [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#49A54D");
  const [focus, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  useEffect(() => {
    if (token.token != null) {
      api
        .get("erfa/dashboard", {
          headers: {
            "x-auth-token": token.token,
          },
        })
        .then((result) => {
          // console.log(result.data)
          Auth.login(() => {
            // return (<Redirect to={'/dashboard'} />)
            props.history.push("/dashboard");
          });
        });
    }
  }, []);

  const [regid, setRegid] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [program, setProgram] = useState("");
  const [section, setSection] = useState("");
  const [cellNumber, setCellNumber] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [mailingaddress, setMailingAddress] = useState("");
  const [fathername, setFathername] = useState("");
  const [valid, setValid] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPassMatch, setIsPassMatch] = useState(false);
  const [passMessage, setPassMessage] = useState("");

  const submitData = (e) => {
    e.preventDefault();
    if (regid !== "" && password !== "") {
      api
        .post("erfa/login", { email: regid, password }, setLoading(true))
        .then((result) => {
          setLoading(false);
          console.log(result.data);
          // console.log(result.data.token)
          setToken("token", result.data.token, {
            path: "/",
            maxAge: 1800,
            secure: true,
          });
          setUserID("userID", result.data.sendUserName, {
            path: "/",
            maxAge: 1800,
            secure: true,
          });
          setUserType("userType", result.data.sendUserType, {
            path: "/",
            maxAge: 1800,
            secure: true,
          });
          // window.alert('Welcome to Admin Portal')
          setValid("true");
          alert();
          Auth.login(() => {
            props.history.push("/");
          });
          // window.alert('Welcome to Admin Portal')
        })

        .catch((err) => {
          setLoading(false);
          // console.log(err)
          setValid("false");
          alert();
        });

      // if (username == 'admin' && password == 'admin') {
      //     setValid("true")
      //     Auth.login(()=>{
      //     props.history.push("/")
      //     })
      //     // window.alert('Welcome to Admin Portal')
      //     alert()

      // } else {
      //     setValid("false")
      //     // window.alert('Invalid Credentials')
      //     alert()

      // }
    } else {
      // window.alert('Please fill all the fields')
      setValid("incomplete");
      alert();
    }
    alert();
  };
  const alert = () => {
    if (valid != "") {
      if (valid == "true") {
        return (
          <>
            <Alert
              style={{ "margin-top": "-40px", "margin-bottom": "15px" }}
              onClose={() => {
                setValid("");
              }}
              severity="success"
            >
              OK - <strong>Login Successful. </strong>
            </Alert>
            <Redirect to="/" />
          </>
        );
      } else if (valid == "false") {
        return (
          <Alert
            style={{ "margin-top": "-40px", "margin-bottom": "15px" }}
            onClose={() => {
              setValid("");
            }}
            severity="error"
          >
            ERROR — <strong>Invalid Credentials!</strong>
          </Alert>
        );
      } else {
        return (
          <Alert
            style={{ "margin-top": "-40px", "margin-bottom": "15px" }}
            onClose={() => {
              setValid("");
            }}
            severity="warning"
          >
            ALERT — <strong>Please fill all fields!</strong>
          </Alert>
        );
      }
    } else {
      return <></>;
    }
  };

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  const checkPasswordValidataion = (e) => {
    setConfirmPassword(e.target.value);
    const chckPass = e.target.value;
    if (password === chckPass) {
      setPassMessage("");
      setIsPassMatch(true);
    } else {
      setPassMessage("Password does not match");
      e.preventDefault();
      e.stopPropagation();
      setIsPassMatch(false);
    }
  };

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
            <GridItem xs={12} sm={12} md={6}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="success" className={classes.cardHeader}>
                    <h4>ERFA Student Registration </h4>
                  </CardHeader>
                  <p className={classes.divider}>Enter the following details</p>
                  <p className={classes.divider} style={{ fontStyle: "bold" }}>
                    {passMessage}
                  </p>
                  <CardBody>
                    <CustomInput
                      labelText="Registration Number"
                      id="regid"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (event) => setRegid(event.target.value),
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <BadgeIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        <CustomInput
                          labelText="Password"
                          id="pass"
                          formControlProps={{}}
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
                      </span>
                      <span>
                        <CustomInput
                          labelText="Confirm Password"
                          id="confirmpass"
                          formControlProps={{}}
                          inputProps={{
                            onChange: (event) =>
                              checkPasswordValidataion(event),
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
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        <CustomInput
                          labelText="First Name"
                          id="firstname"
                          formControlProps={{}}
                          inputProps={{
                            onChange: (event) =>
                              setFirstName(event.target.value),
                            type: "text",
                            endAdornment: (
                              <InputAdornment position="end">
                                <People2
                                  className={classes.inputIconsColor}
                                ></People2>
                              </InputAdornment>
                            ),
                            autoComplete: "off",
                          }}
                        />
                      </span>
                      <span>
                        <CustomInput
                          labelText="Last Name"
                          id="lastname"
                          formControlProps={{}}
                          inputProps={{
                            onChange: (event) =>
                              setLastName(event.target.value),
                            type: "text",
                            endAdornment: (
                              <InputAdornment position="end">
                                <People2
                                  className={classes.inputIconsColor}
                                ></People2>
                              </InputAdornment>
                            ),
                            autoComplete: "off",
                          }}
                        />
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        <CustomInput
                          labelText="Program"
                          id="program"
                          formControlProps={{}}
                          inputProps={{
                            onChange: (event) => setProgram(event.target.value),
                            type: "text",
                            endAdornment: (
                              <InputAdornment position="end">
                                <Degree
                                  className={classes.inputIconsColor}
                                ></Degree>
                              </InputAdornment>
                            ),
                            autoComplete: "off",
                          }}
                        />
                      </span>
                      <span>
                        <CustomInput
                          labelText="Section"
                          id="section"
                          formControlProps={{}}
                          inputProps={{
                            onChange: (event) => setSection(event.target.value),
                            type: "text",
                            endAdornment: (
                              <InputAdornment position="end">
                                <Group
                                  className={classes.inputIconsColor}
                                ></Group>
                              </InputAdornment>
                            ),
                            autoComplete: "off",
                          }}
                        />
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        <CustomInput
                          labelText="Cell Number"
                          id="cellnumber"
                          formControlProps={{}}
                          inputProps={{
                            onChange: (event) =>
                              setCellNumber(event.target.value),
                            type: "text",
                            endAdornment: (
                              <InputAdornment position="end">
                                <Phone
                                  className={classes.inputIconsColor}
                                ></Phone>
                              </InputAdornment>
                            ),
                            autoComplete: "off",
                          }}
                        />
                      </span>
                      <span>
                        <CustomInput
                          labelText="Email"
                          id="email"
                          formControlProps={{}}
                          inputProps={{
                            onChange: (event) => setEmail(event.target.value),
                            type: "text",
                            endAdornment: (
                              <InputAdornment position="end">
                                <Email
                                  className={classes.inputIconsColor}
                                ></Email>
                              </InputAdornment>
                            ),
                            autoComplete: "off",
                          }}
                        />
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        <CustomInput
                          labelText="Date of Birth"
                          id="dob"
                          onFocus={onFocus}
                          onBlur={onBlur}
                          formControlProps={{}}
                          inputProps={{
                            style: { width: "190px" },
                            onClick: (event) => setHasValue(true),
                            onChange: (event) => setDob(event.target.value),
                            type: hasValue || focus ? "date" : "text",
                            endAdornment: (
                              <InputAdornment position="end">
                                {hasValue || focus ? null : (
                                  <Calendar></Calendar>
                                )}
                              </InputAdornment>
                            ),
                            autoComplete: "off",
                          }}
                        />
                      </span>
                      <span>
                        <CustomInput
                          labelText="Fathername"
                          id="fathername"
                          formControlProps={{}}
                          inputProps={{
                            onChange: (event) =>
                              setFatherName(event.target.value),
                            type: "text",
                            endAdornment: (
                              <InputAdornment position="end">
                                <Father
                                  className={classes.inputIconsColor}
                                ></Father>
                              </InputAdornment>
                            ),
                            autoComplete: "off",
                          }}
                        />
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        <CustomInput
                          labelText="Mailing Address"
                          id="mailingaddress"
                          formControlProps={{}}
                          inputProps={{
                            onChange: (event) =>
                              setMailingAddress(event.target.value),
                            type: "text",
                            endAdornment: (
                              <InputAdornment position="end">
                                <MailingAddress
                                  className={classes.inputIconsColor}
                                ></MailingAddress>
                              </InputAdornment>
                            ),
                            autoComplete: "off",
                          }}
                        />
                      </span>
                      <span>
                        <CustomInput
                          labelText="Permanent Address"
                          id="permanentaddress"
                          formControlProps={{}}
                          inputProps={{
                            onChange: (event) =>
                              setPermanentAddress(event.target.value),
                            type: "text",
                            endAdornment: (
                              <InputAdornment position="end">
                                <Location
                                  className={classes.inputIconsColor}
                                ></Location>
                              </InputAdornment>
                            ),
                            autoComplete: "off",
                          }}
                        />
                      </span>
                    </div>
                  </CardBody>
                  <br />
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      simple
                      color="primary"
                      size="lg"
                      onClick={submitData}
                    >
                      {loading == true ? (
                        <RingLoader color={color} css={override} size={25} />
                      ) : (
                        <>Register</>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
      {/* <prev>{JSON.stringify(dob, null, 2)}</prev> */}
      <prev>{JSON.stringify(confirmPassword, null, 2)}</prev>
      <prev>{JSON.stringify(password, null, 2)}</prev>
      {/*<prev>{JSON.stringify(valid, null, 2)}</prev> */}
    </div>
  );
}
