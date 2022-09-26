import { $generateHtmlFromNodes } from '@lexical/html';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import React, { useRef, useState } from 'react';
import { Button } from './Button.js';
import Editor from "./Editor";
import "./styles.css";
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import FileUploadDownload from "./plugins/FileUploadDownload";
import { CLEAR_HISTORY_COMMAND } from "lexical";

const dummyJSON = { "root": { "children": [{ "children": [{ "detail": 0, "format": 0, "mode": "normal", "style": "", "text": "This is a test.", "type": "text", "version": 1 }], "direction": "ltr", "format": "", "indent": 0, "type": "paragraph", "version": 1 }, { "children": [], "direction": "ltr", "format": "", "indent": 0, "type": "paragraph", "version": 1 }, { "children": [{ "detail": 0, "format": 1, "mode": "normal", "style": "", "text": "Hello", "type": "text", "version": 1 }], "direction": "ltr", "format": "", "indent": 0, "type": "paragraph", "version": 1 }], "direction": "ltr", "format": "", "indent": 0, "type": "root", "version": 1 } }

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
  // place # 1
  // const initialEditorState = await loadContent();

  const [html, setHTML] = useState("");
  const [json, setJSON] = useState("");
  const [templateVariable, setTemplateVariables] = useState("");
  const [editor, setEditor] = useState(null);
  const [fileContents, setFileContents] = useState();

  const handleExportToHTMLClick = () => {
    console.log(html);
    // return <FileUploadDownload data={html} />
  }
  const handleExportToJSONClick = () => {
    console.log(json);
  }

  const onLoad = (fileContents) => {
    // debugger;
    console.log("HELLO")
    const editorState = editor.parseEditorState(
      fileContents
    );
    editor.setEditorState(editorState);
    editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined);
    alert(json);
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
      <Editor setTemplateVariables={setTemplateVariables} />
      <Editor setHTML={setHTML} setJSON={setJSON} setEditor={setEditor} />
      <FileUploadDownload onLoad={onLoad} />
      <div>
        <div style={{ display: 'inline', marginRight: '2%' }}>
          <button onClick={handleExportToHTMLClick}>
            Export to HTML
          </button>
        </div>
        <div style={{ display: 'inline', marginRight: '2%' }}>
          <button onClick={handleExportToJSONClick}>
            Export to JSON
          </button>
        </div>

      </div>
    </div>
  );
}
