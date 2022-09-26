import { useEffect } from "react";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';


export default function SetEditorPlugin({ setEditor }) {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (!setEditor) return;
        setEditor(editor);
    }, [editor]);

    return null;
};