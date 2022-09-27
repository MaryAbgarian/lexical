import React from 'react'

export default function SimpleInput({ onChange }) {
    const [text, setText] = useState("");
    return (
        <input value={text} onChange={({ target }) => setText(target.value)} />
    )
}
