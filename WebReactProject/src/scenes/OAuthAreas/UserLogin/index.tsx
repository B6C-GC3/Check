import * as React from 'react';
import { useEffect, useState } from 'react';
import ChangePassword from './components/changePasswordComponent';
import ConfirmTokenComponent from './components/confirmTokenComponent';
import ForgotPassword from './components/forgotPasswordComponent';
import Signin from './components/signinComponent';
import Signup from './components/signupComponent';

//const key = 'login';

export interface ILoginProps {
    location: any;
}

export default function Login(props: ILoginProps) {

    const [scren, setscren] = useState<HTMLElement>();

    const _renderScenesLogin = () => {
        switch (props.location.pathname) {
            case '/user/change-password':
                return <ChangePassword location={props.location} />;
            case '/user/forgot-password':
                return <ForgotPassword location={props.location} />;
            case '/user/signup':
                return <Signup location={props.location} />;
            case '/user/login':
                return <Signin location={props.location} />;
            case '/user/token':
                return <ConfirmTokenComponent location={props.location} />;
            case '/user/logout':
                return <ConfirmTokenComponent location={props.location} />;
            default:
                return <Signin location={props.location} />;
        }
    }

    return (
        <>
            {(() => _renderScenesLogin())()}
        </>
    )
};