import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { $generateHtmlFromNodes } from '@lexical/html';
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { TRANSFORMERS } from "@lexical/markdown";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { $getRoot } from 'lexical';
import { MentionNode } from './nodes/MentionNode.jsx';
// import ActionsPlugin from "./plugins/ActionsPlugin.js";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import MentionsPlugin from "./plugins/MentionsPlugin";
import SetEditorPlugin from "./plugins/SetEditorPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import ExampleTheme from "./themes/ExampleTheme";
// import { MentionsInput, Mention } from 'react-mentions'

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

const editorConfig = {
  // The editor theme
  theme: ExampleTheme,
  // Handling of errors during update
  onError(error) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
    MentionNode
  ]
};

function importJSON(serializedNode) {
  const node = $createHeadingNode(serializedNode.tag);
  node.setFormat(serializedNode.format);
  node.setIndent(serializedNode.indent);
  node.setDirection(serializedNode.direction);
  return node;
}

const desiredUpdate = {
  editorState: {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "Updating the editor",
              type: "text",
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  },
  lastSaved: 1656765599382,
  source: "Playground",
  version: "0.3.6",
};

export default function Editor({ setHTML = () => { }, setJSON = () => { }, setEditor = () => { }, setTemplateVariables = () => { } }) {

  const onChange = (editorState, editor) => {
    editor.update(() => {
      const rawHTML = $generateHtmlFromNodes(editor, null)
      const editorStateTextString = editorState.read(() => $getRoot().getTextContent());

      // const rawJSON = JSON.stringify(editorState);
      setHTML(rawHTML);
      setJSON(editorState);
      setTemplateVariables(editorStateTextString);
    });
  }

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          {/* <AutoLinkPlugin /> */}
          <SetEditorPlugin setEditor={setEditor} />
          <MentionsPlugin />
          {/* <ActionsPlugin /> */}
          <OnChangePlugin onChange={onChange} />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
    </LexicalComposer>
  );
}
