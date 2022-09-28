import { CLEAR_HISTORY_COMMAND } from "lexical";
import React, { useState } from 'react';
import FileUploadDownload from "./plugins/FileUploadDownload";
import Editor from "./Editor";
import "./playground-index.css";
import "./styles.css";


export default function App() {
  const [html, setHTML] = useState("");
  const [templateVariables, setTemplateVariables] = useState("");
  const [editor, setEditor] = useState(null);
  const [json, setJSON] = useState("");


  const onLoad = (fileContents) => {
    const editorState = editor.parseEditorState(
      fileContents
    );
    editor.setEditorState(editorState);
    editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined);
  }
  return (
    <div className="App" style={{ marginTop: "7%" }}>
      <h1 style={{ color: "#00008B", letterSpacing: "0.5px", fontWeight: "400" }} >email template editor</h1>
      <textarea placeholder={" $firstName=Jane, $lastName=Doe, etc. "} value={templateVariables} style={{ paddingTop: "5px", height: "20px", minWidth: "305px", maxWidth: "600px", border: "1px solid #ddd", marginTop: "2%", color: "#ddd", borderRadius: "5px", color: "#00008B" }} onChange={(event) => setTemplateVariables(event.target.value)} />
      <Editor setHTML={setHTML} setJSON={setJSON} setEditor={setEditor} style={{ color: "#00008B" }} />
      <FileUploadDownload onLoad={onLoad} json={json} html={html} templateVariables={templateVariables} />
    </div>
  );
}
