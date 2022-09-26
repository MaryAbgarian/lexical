

class ExportButton extends React.Component {
    handleClick()
    {
         console.log("hello");
         const [editor] = useLexicalComposerContext();
     
         editor.update(() => {
           // In the browser you can use the native DOMParser API to parse the HTML string.
           const parser = new DOMParser();
           const dom = parser.parseFromString(htmlString, textHtmlMimeType);
         
           // Once you have the DOM instance it's easy to generate LexicalNodes.
           const nodes = $generateNodesFromDOM(editor, dom);
           
           // Select the root
           $getRoot().select();
         
           // Insert them at a selection.
           $insertNodes(nodes);
         });
          const htmlString = $generateHtmlFromNodes(editor, selection | null);
          console.log(htmlString);
    }
     render() {
       // This syntax ensures `this` is bound within handleClick
       return (
         <button onClick={() => this.handleClick()}>
         Export to HTML        
         </button>
       );
     }
   }
 