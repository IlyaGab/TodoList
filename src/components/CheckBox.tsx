import React, {ChangeEvent} from 'react';

type PropsType = {
    isDone:boolean
    callBack: (isDone:boolean, )=>void
}


const CheckBox = (props:PropsType) => {
    const onChangeCheckboxHandler = (e:ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.checked)
        props.callBack(e.currentTarget.checked)
    }
    return (
        <input type="checkbox" onChange={onChangeCheckboxHandler} checked={props.isDone} />
    );
};

export default CheckBox;