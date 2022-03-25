import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (value: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState("")

    const activateEditMode = () => {
        setEditMode(true)
        setValue(props.title)
    }

    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(value)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return (
        editMode
            ? <input value={value} autoFocus onBlur={activateViewMode} onChange={onChangeHandler}/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}