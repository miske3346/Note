import react from "react";

const Alert = (props) => {
    <div className="alert-container">
        <ul>
        {/* {props?.validationMessages?.map((message,index) => <li key={index}>{message}</li>)} */}
            {/* {pro.map((message, index) => <li key={index}>{message}</li>)} */}
            {props.validationMessages.map((message,index) => (
                <li key={index}>{message}</li>
            ))
        }
        </ul>
    </div>
};

export default Alert;