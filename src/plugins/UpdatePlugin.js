import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';


export default function UpdatePlugin(desiredUpdate) {
    const [editor] = useLexicalComposerContext();

    const onButtonClick = () => {
        const editorState = editor.parseEditorState(
            JSON.stringify(desiredUpdate.editorState)
        );
        editor.setEditorState(editorState);
        editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined);
    };

    return <button onClick={onButtonClick}>Update editor state</button>;
};
