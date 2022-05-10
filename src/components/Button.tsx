import React from 'react';

type ButtonPropsType= {
    name:string
    onClick: ()=> void
    className?:string
}

const Button = (props:ButtonPropsType) => {
    const onClickHandler = () =>{
        props.onClick()
    }

    return (
        <button onClick={onClickHandler} className={props.className}>{props.name}</button>
    );
};

export default Button;