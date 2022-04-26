import React from 'react';

type ButtonPropsType= {
    name:string
    callBack: ()=> void
    className?:string
}

const Button = (props:ButtonPropsType) => {
    const onClickHandler = () =>{
        props.callBack()
    }

    return (
        <button onClick={onClickHandler} className={props.className}>{props.name}</button>
    );
};

export default Button;