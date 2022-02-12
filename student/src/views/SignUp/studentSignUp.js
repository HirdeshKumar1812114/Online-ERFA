import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import validator from "validator";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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
});

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#49A54D");
  const [focus, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

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
  const [mailingAddress, setMailingAddress] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [valid, setValid] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPassMatch, setIsPassMatch] = useState(false);
  const [passMessage, setPassMessage] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [isEmailMatch, setIsEmailMatch] = useState(false);

  const submitData = (e) => {
    e.preventDefault();
    if (
      regid !== "" &&
      password !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      program !== "" &&
      section !== "" &&
      cellNumber !== "" &&
      email !== "" &&
      dob !== "" &&
      permanentAddress !== "" &&
      mailingAddress !== "" &&
      fatherName !== ""
    ) {
      api
        .post(
          "student/checksignup",
          {
            regid,
            password,
            firstname: firstName,
            lastname: lastName,
            program,
            section,
            cellnumber: cellNumber,
            email,
            dob,
            permanentaddress: permanentAddress,
            mailingaddress: mailingAddress,
            fathername: fatherName,
          },

          setLoading(true)
        )
        .then((result) => {
          // console.log({ result });

          if (
            result.data.message === "User Registration Id already used" ||
            result.data.message === "Student Details not match"
          ) {
            setValid("false");
            alert();
          } else {
            setLoading(false);
            // console.log("In catch block else ");
            // console.log(result);
            // console.log(result.data);
            setRegid("");
            setPassword("");
            setConfirmPassword("");
            setFirstName("");
            setLastName("");
            setProgram("");
            setSection("");
            setCellNumber("");
            setEmail("");
            setDob("");
            setPermanentAddress("");
            setMailingAddress("");
            setFatherName("");
            setValid("true");
            alert();
          }
        })

        .catch((err) => {
          // console.log("3");
          setLoading(false);
          // // console.log(err)
          setValid("false");
          alert();
        });
    } else {
      // console.log("4");
      setValid("incomplete");
      alert();
    }
  };
  const alert = () => {
    if (valid != "") {
      if (valid == "true") {
        return (
          <>
            <Alert
              style={{ "margin-top": "5px", "margin-bottom": "25px" }}
              onClose={() => {
                setValid("");
              }}
              severity="success"
            >
              OK - <strong>Registration Successful</strong>
            </Alert>
            <Redirect to="/" />
          </>
        );
      } else if (valid == "false") {
        return (
          <Alert
            style={{ "margin-top": "5px", "margin-bottom": "25px" }}
            onClose={() => {
              setValid("");
            }}
            severity="error"
          >
            ERROR —{" "}
            <strong>
              Registration record is already present or the registration id is
              not valid
            </strong>
          </Alert>
        );
      } else {
        return (
          <Alert
            style={{ "margin-top": "5px", "margin-bottom": "25px" }}
            onClose={() => {
              setValid("");
            }}
            severity="warning"
          >
            ALERT — <strong>Please fill all thefields!</strong>
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
      setPassMessage("Password does not match!");
      e.preventDefault();
      e.stopPropagation();
      setIsPassMatch(false);
    }
  };

  const checkEmailValidataion = (e) => {
    setEmail(e.target.value);

    if (validator.isEmail(email)) {
      setConfirmEmail("");
      setIsEmailMatch(true);
    } else {
      setConfirmEmail("Email Address is not valid!");
      e.preventDefault();
      e.stopPropagation();
      setIsEmailMatch(false);
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
                  <p
                    className={classes.divider}
                    style={{
                      color: "red",
                      position: "relative",
                      fontSize: "10px",
                      top: "218px",
                      left: "131px",
                    }}
                  >
                    {passMessage}
                  </p>
                  <p
                    className={classes.divider}
                    style={{
                      color: "red",
                      position: "relative",
                      fontSize: "10px",
                      top: "406px",
                      left: "136px",
                    }}
                  >
                    {confirmEmail}
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
                        type: "number",

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
                        {/* <CustomInput
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
                        /> */}
                        <FormControl
                          variant="standard"
                          sx={{ m: 1, minWidth: 120 }}
                        >
                          <InputLabel
                            id="demo-simple-select-standard-label"
                            style={{
                              top: "7px",
                              color: "#AAAAAA !important",
                              fontSize: "14px",
                              fontFamily:
                                "Roboto, Helvetica, Arial, sans-serif",
                              fontWeight: "400",
                              lineHeight: "1.42857",
                              letterSpacing: " unset",
                              left: "-8px",
                            }}
                          >
                            Program
                          </InputLabel>
                          <Select
                            style={{
                              position: "relative",
                              width: "190px",
                              right: "9px",
                              top: "4px",
                            }}
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={program}
                            onChange={(e) => {
                              setProgram(e.target.value);
                            }}
                            label="Age"
                          >
                            <MenuItem value="">
                              <em>Select Your Program</em>
                            </MenuItem>
                            <MenuItem value={"BABS"}>BABS</MenuItem>
                            <MenuItem value={"BBA"}>BBA</MenuItem>
                            <MenuItem value={"BEME"}>BEME</MenuItem>
                            <MenuItem value={"BABS"}>BABS</MenuItem>
                            <MenuItem value={"BS BIO Science"}>
                              BS BIO Science
                            </MenuItem>
                            <MenuItem value={"BS Biotechnology"}>
                              BS Biotechnology
                            </MenuItem>
                            <MenuItem value={"BS Entre"}>BS Entre </MenuItem>
                            <MenuItem value={"BSAF"}>BSAF</MenuItem>
                            <MenuItem value={"BSCS"}>BSCS</MenuItem>
                            <MenuItem value={"BSAI"}>BSAI</MenuItem>
                            <MenuItem value={"BSMS"}>BSMS</MenuItem>
                            <MenuItem value={"BSSS"}>BSSS</MenuItem>
                            <MenuItem value={"MA Education"}>
                              MA Education
                            </MenuItem>
                            <MenuItem value={"MBA Evening 36"}>
                              MBA Evening 36
                            </MenuItem>
                            <MenuItem value={"MBA Evening 72"}>
                              MBA Evening 72
                            </MenuItem>
                            <MenuItem value={"MoA"}>MoA</MenuItem>
                            <MenuItem value={"MSMD"}>MSMD</MenuItem>
                            <MenuItem value={"MPM"}>MPM</MenuItem>
                            <MenuItem value={"MSPM"}>MSPM</MenuItem>

                            <MenuItem value={"MS-BIO"}>MS-BIO</MenuItem>
                            <MenuItem value={"MS-BIOTECH"}>MS-BIOTECH</MenuItem>
                            <MenuItem value={"PhD BIO Sciences"}>
                              PhD BIO Sciences
                            </MenuItem>
                            <MenuItem value={"MS-Mechatronics"}>
                              MS-Mechatronics
                            </MenuItem>
                            <MenuItem value={"MSCS"}>MSCS</MenuItem>
                            <MenuItem value={"PhDCS"}>PhDCS </MenuItem>

                            <MenuItem value={"MSELM"}>MSELM</MenuItem>
                            <MenuItem value={"PhD ELM"}>PhD ELM</MenuItem>
                            <MenuItem value={"MSMS"}>MSMS</MenuItem>
                            <MenuItem value={"PhDMS"}>PhDMS</MenuItem>
                            <MenuItem value={"MSPH"}>MSPH</MenuItem>
                            <MenuItem value={"MSSS"}>MSSS</MenuItem>
                            <MenuItem value={"PhDSS"}>PhDSS</MenuItem>
                          </Select>
                        </FormControl>
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
                            type: "number",
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
                            onChange: (event) => checkEmailValidataion(event),
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
                        {/* <CustomInput
                          type="date"
                          placeholder=""
                          labelText="Date of Birth"
                          defaultValue=""
                          id="dob"
                          onFocus={onFocus}
                          onBlur={onBlur}
                          formControlProps={{}}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            defaultValue: "",
                            style: { width: "190px" },

                            onClick: (event) => setHasValue(true),

                            onChange: (event) => {
                              if (event.target.value) setHasValue(true);
                              else setHasValue(false);

                              setDob(event.target.value);
                            },
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
                        /> */}
                        <TextField
                          style={{
                            position: "relative",
                            width: "190px",
                            top: "10px",
                            color: "#AAAAAA !important",
                            fontSize: "14px",
                            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                          }}
                          onFocus={onFocus}
                          onBlur={onBlur}
                          onChange={(e) => {
                            if (e.target.value) {
                              setHasValue(true);
                              setDob(e.target.value);
                            } else setHasValue(false);
                          }}
                          label="DOB"
                          type={hasValue || focus ? "date" : "text"}
                        />
                      </span>
                      <span>
                        <CustomInput
                          labelText="Father Name"
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
      {/* <prev>{JSON.stringify(program, null, 2)}</prev>
      <prev>{JSON.stringify(regid, null, 2)}</prev>
      <prev>{JSON.stringify(password, null, 2)}</prev>
      <prev>{JSON.stringify(confirmPassword, null, 2)}</prev>
      <prev>{JSON.stringify(firstName, null, 2)}</prev>
      <prev>{JSON.stringify(lastName, null, 2)}</prev>
      <prev>{JSON.stringify(section, null, 2)}</prev>
      <prev>{JSON.stringify(cellNumber, null, 2)}</prev>
      <prev>{JSON.stringify(email, null, 2)}</prev>
      <prev>{JSON.stringify(dob, null, 2)}</prev>
      <prev>{JSON.stringify(permanentAddress, null, 2)}</prev>
      <prev>{JSON.stringify(mailingAddress, null, 2)}</prev>
      <prev>{JSON.stringify(fatherName, null, 2)}</prev> */}
    </div>
  );
}
