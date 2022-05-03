import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import c from '../Todolist.module.css';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {

    let [newTitle, setNewTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
        setError('')
    }

    const onClickAddItem = () => {
        if (newTitle.trim() !== '') {
            props.addItem(newTitle.trim())
            setNewTitle('')
        } else {
            setError('Title is required');
        }

    }

    const onKeyPressInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.charCode === 13) {
            onClickAddItem()
        }
    }
    return (
        <div>
            <input value={newTitle}
                   onChange={onChangeInputHandler}
                   onKeyPress={onKeyPressInputHandler}
                   className={error ? c.error : ''}/>
            <button onClick={onClickAddItem}>+</button>
            {error &&
                <div className={c.errorMessage}>{error}</div>}
        </div>

    );
};

