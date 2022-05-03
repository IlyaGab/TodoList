import React, {ChangeEvent, useState} from 'react';


type EditableSpanPropsType = {
    title:string
    setNewTitle:(newTitle:string)=>void
}

const EditableSpan = (props:EditableSpanPropsType) => {

    const [editMode, setEditMode]= useState<boolean>(false)
    let [newTitle, setNewTitle] = useState<string>(props.title)
    const onEditMode = () => {
        setEditMode(true)
    }

    const offEditMode = () => {
        setEditMode(false)
        props.setNewTitle(newTitle)
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    return (
        editMode
        ? <input value={newTitle} onBlur={offEditMode} autoFocus onChange={onChangeInputHandler}/>
        : <span onDoubleClick={onEditMode} >{props.title}</span>
    );
};

export default EditableSpan;