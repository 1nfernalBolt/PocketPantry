import Alert from 'react-bootstrap/Alert';
import React from 'react';

const errormessage = ({ variant = "danger", children }) => {
    return (
        <Alert variant = {variant} style = {{fontSize:40}} >
            <strong> {children}</strong>
        </Alert>
    );
};

export default errormessage;