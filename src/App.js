import { $generateHtmlFromNodes } from '@lexical/html';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import React, { useRef, useState } from 'react';
import { Button } from './Button.js';
import Editor from "./Editor";
import "./styles.css";
import "./playground-index.css"
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import FileUploadDownload from "./plugins/FileUploadDownload";
import { CLEAR_HISTORY_COMMAND } from "lexical";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";


const theme = {}


// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
  throw error;
}


export const ExportButton = () => {
  const [editor] = useLexicalComposerContext();

  const handleClick = (event) => {
    const htmlString = $generateHtmlFromNodes(editor, null);
    console.log(htmlString);
    // editor.update(() => {
    //   const editorState = editor.getEditorState();
    //   const jsonString = JSON.stringify(editorState);
    //   console.log('jsonString', jsonString);

    //   const htmlString = $generateHtmlFromNodes(editor, null);
    //   console.log('htmlString', htmlString);
    // });
  };

  return (
    <button onClick={handleClick}>
      Export to HTML
    </button>
  );

}

export default function App() {
  const [html, setHTML] = useState("");
  const [templateVariables, setTemplateVariables] = useState("");
  const [editor, setEditor] = useState(null);
  const [fileContents, setFileContents] = useState();
  const [json, setJSON] = useState("");


  const onLoad = (fileContents) => {
    // debugger;
    const editorState = editor.parseEditorState(
      fileContents
    );
    editor.setEditorState(editorState);
    editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined);
  }
  const updateData = () => {
    console.log("inside update json: ");
    console.log(json);
    return json;
  }

  const handleImportJSONClick = () => {
    console.log(json);
    const node = $createHeadingNode(serializedNode.tag);
    node.setFormat(serializedNode.format);
    node.setIndent(serializedNode.indent);
    node.setDirection(serializedNode.direction);
    return node;
  }


  return (
    <div className="App">
      <h1>Email Template Editor</h1>
      <textarea value={templateVariables} onChange={(event) => setTemplateVariables(event.target.value)} />
      <Editor setHTML={setHTML} setJSON={setJSON} setEditor={setEditor} />
      <FileUploadDownload onLoad={onLoad} json={json} html={html} templateVariables={templateVariables} />
    </div>
  );
}
