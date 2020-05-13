import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import '../style/components/UsersList.css';

const UsersList = props => {
    const renderUsers = props.users.map(user => (
        <tr>
            <td>{user._id}</td>
            <td>{user.rote}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.manager}</td>
            <td>
                <Link to={`/edit/${user._id}`}>
                    <button>edit</button>
                </Link>
            </td>
        </tr>
    ));

    return (
        <div className="users-list-container">
            <div className="users-list-header">Users</div>
            <div className="users-list-table-header-container">
                <table cellPadding="0" cellSpacing="0" border="0">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Rote</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Manager</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                </table>
            </div>
            <div className="users-list-table-body-container">
                <table cellPadding="0" cellSpacing="0" border="0">
                    <tbody>
                    {renderUsers}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        users: state.users
    };
};

export default connect(mapStateToProps)(UsersList);