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
import Link from "@mui/material/Link";
import Auth from "../../Auth/auth";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import axios from "axios";
import image from "assets/img/bg7.jpg";
import { useCookies } from "react-cookie";
import { css } from "@emotion/react";
import RingLoader from "react-spinners/RingLoader";
import BadgeIcon from "@mui/icons-material/Badge";

const override = css`
  margin: 0 auto;
`;

const api = axios.create({
  baseURL: "http://localhost:5000/student",
  timeout: 1000,
});

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [token, setToken] = useCookies(["token"]);
  const [userID, setUserID] = useCookies(["userID"]);
  const [userRegID, setUserRegID] = useCookies(["userRegID"]);
  const [userStudentName, setUserStudentName] = useCookies(["userStudentName"]);
  const [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#49A54D");

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
  const [valid, setValid] = useState("");

  const submitData = (e) => {
    e.preventDefault();
    if (regid !== "" && password !== "") {
      api
        .post("/login", { regid, password }, setLoading(true))
        .then((result) => {
          setLoading(false);
          console.log(result.data);
          // console.log(result.data.token)
          setToken("token", result.data.token, {
            path: "/",
            maxAge: 1800,
            secure: true,
          });
          setUserID("userID", result.data.sendUserId, {
            path: "/",
            maxAge: 1800,
            secure: true,
          });
          setUserRegID("userRegID", result.data.sendRegId, {
            path: "/",
            maxAge: 1800,
            secure: true,
          });

          setUserStudentName("userStudentName", result.data.sendStudentName, {
            path: "/",
            maxAge: 1800,
            secure: true,
          });
          // window.alert('Welcome to Admin Portal')
          setValid("true");
          alert();
          // Auth.login(() => {
          //   props.history.push("/");
          // });
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
                    <h3>ERFA Student Portal</h3>
                  </CardHeader>
                  <p className={classes.divider}>Enter your Credentials</p>
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
                    <Button
                      simple
                      color="primary"
                      size="lg"
                      onClick={submitData}
                    >
                      {loading == true ? (
                        <RingLoader color={color} css={override} size={25} />
                      ) : (
                        <>Login</>
                      )}
                    </Button>
                  </CardFooter>

                  <CardFooter className={classes.cardFooter}>
                    <Link underline="none" href="/signup">
                      Don't Have an Account ? Click Here to register.
                    </Link>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
      {/* <prev>{JSON.stringify(regid, null, 2)}</prev>
      <prev>{JSON.stringify(password, null, 2)}</prev>
      <prev>{JSON.stringify(valid, null, 2)}</prev> */}
    </div>
  );
}
