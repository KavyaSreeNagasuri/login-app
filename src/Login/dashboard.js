import React from 'react';
import { useSelector } from 'react-redux';
import { tableHeaderData, fieldAttributes } from '../constants';
import { Redirect } from 'react-router-dom';
import './login-form.scss';

export default function Dashboard() {
    const data = useSelector(state => state.employeeData);
    const { loginStatus } = useSelector(state => state.loginData);
    let redirect;
    if (!loginStatus) {
        redirect = <Redirect to={`/login`} />;
    }

    return (
        <div>
            {redirect}
            <h1 className="dashboard-header">List of Employees</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">{"ID"}</th>
                        {fieldAttributes.map(attrib => {
                            return <th key={`${attrib}_header`} scope="col">{tableHeaderData[attrib]}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map(record => {
                        return <tr key={`record_${record.id}`}>
                            <th scope="row">{record.id}</th>
                            {fieldAttributes.map(attrib => {
                                return <td key={`${attrib}_${record.id}`}>{record[attrib]}</td>
                            })}
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
}
