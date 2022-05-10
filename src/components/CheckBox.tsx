import React, {ChangeEvent} from 'react';
import {Checkbox} from '@material-ui/core';

type PropsType = {
    checked:boolean
    onChange: (isDone:boolean, )=>void
}


const CheckBox = (props:PropsType) => {
    const onChangeCheckboxHandler = (e:ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.currentTarget.checked)
    }
    return (
        <Checkbox onChange={onChangeCheckboxHandler} checked={props.checked} />
    );
};

export default CheckBox;