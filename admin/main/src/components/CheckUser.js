import React, { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';

import {
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalFooter,
    CModalBody,
} from "@coreui/react";

import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:5000/",
});

const CheckUser = ({ props, title, action, description, endPoint, toDelete, setModel, isDeleted,chkUser }) => {
    const [valid, setValid] = useState('')
    var props = { title, action, description, endPoint, toDelete }
    const [userEmail, setUserEmail] = useCookies(['onlineerfa_admin_userEmail']);
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState(userEmail.onlineerfa_admin_userEmail)
    const checkPassword = () => {
        if (password != '') {
            api.post('erfa/login', { email, password }).then(result => {
                setValid("true")
                alert()
                if (action == 'delete') {
                    deleteposts()
                }
                if(action=='update'){
                    chkUser(true);
                    setModel(false)

                }
            }).catch(err => {
                // console.log(err)
                setValid("false")
                alert()
            })
        } else {
            setValid("fillForm")
            alert()
        }

    }
    const alert = () => {
        if (valid != "") {
            if (valid == "true") {
                return (
                    <>
                        <strong style={{ 'color': 'green' }}>   OK - User Verified. </strong>
                    </>
                )
            }
            else if (valid == "false") {
                return (
                    <strong style={{ 'color': 'red' }}> ERROR — Invalid Credentials!</strong>
                )
            }
            else {
                return (
                    <strong style={{ 'color': 'orange' }}>ALERT — Please fill all fields!</strong>)
            }
        }
        else {
            return (
                <>
                </>)
        }
    }
    const deleteposts = () => {
        // console.log('posts to delte: ',poststoDelete)
        api
            .delete(`${props.endPoint}${props.toDelete}`)
            .then((res) => {
                // console.log(res)
                // window.alert("posts deleted.")
                isDeleted(true)
                setDelete(false);
                setModel(false)
                isDeleted(true)

            })
            .catch((err) => {
                // console.log(err)
                // window.alert("Error Occured")
                setModel(false);
            });
    };


    return (
        <>
            <CModalHeader>
                <CModalTitle>
                    <strong>{props.title}</strong>
                </CModalTitle>
            </CModalHeader>
            <CModalBody>
                <b>
                    {props.description}
                </b>
                <br />
                <br />
                <div class="mb-3 row">
                    <label for="staticEmail" class="col-sm-2 col-form-label">Username:</label>
                    <div class="col-sm-10">
                        <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={email} />
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" id="inputPassword" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                </div>
                {alert()}
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => setModel(false)}>
                    Close
                </CButton>
                <CButton
                    color="primary"
                    onClick={() => {
                        checkPassword()
                    }}
                >
                    Confirm
                </CButton>
            </CModalFooter>
        </>
    )
}

export default React.memo(CheckUser)
