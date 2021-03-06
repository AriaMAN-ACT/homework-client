import React from "react";
import {connect} from 'react-redux';
import { useParams } from 'react-router-dom';

import UserForm, {formFields} from "../components/UserForm";
import {getUsers, updateUser} from "../actions";
import history from "../history";

const EditUser = props => {
    const {id} = useParams();

    if (!props.auth.isSigned) {
        history.push('/');
        return (<div/>);
    }

    if (['teacher', 'student'].includes(props.auth.data.user.rote)) {
        history.push('/dashboard');
        return (<div/>);
    }

    if (props.users.length === 0) {
        props.getUsers();
    }

    let user;

    for(let i = 0; i < props.users.length; i++) {
        if (props.users[i]._id === id) {
            user = props.users[i];
            break;
        }
    }

    if (!user) {
        return (<div>User doesn't exists.</div>)
    }

    const onSubmit = formValues => {
        props.updateUser({
            username: formValues[formFields.username] || undefined,
            password: formValues[formFields.password] || undefined,
            rote: formValues[formFields.rote] || undefined,
            name: formValues[formFields.name] || undefined
        }, id);
    };

    const initialValues = {};
    initialValues[formFields.username] = user.username;
    initialValues[formFields.rote] = user.rote;
    initialValues[formFields.manager] = user.manager;
    initialValues[formFields.name] = user.name;

    return (
        <UserForm onSubmit={onSubmit} rote={props.auth.data.user.rote} initialValues={initialValues} err={props.err}/>
    );
};

const mapStateToProps = state => {
    return {
        users: state.users,
        auth: state.auth,
        err: state.err
    };
};

export default connect(mapStateToProps, {getUsers, updateUser})(EditUser);