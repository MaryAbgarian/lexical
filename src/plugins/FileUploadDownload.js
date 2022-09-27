import React from 'react';

export default class FileUploadDownload extends React.Component {
    constructor(props) {
        super(props)

        const defaultFileType = "json";
        this.fileNames = {
            json: "save.json",
            html: "export.html"
        }
        this.state = {
            fileType: defaultFileType,
            fileDownloadUrl: null,
            status: "",
            data: props.json
        }
        this.download = this.download.bind(this);
        this.upload = this.upload.bind(this);
        this.openFile = this.openFile.bind(this);
    }


    download(event) {
        console.log(event)
        event.preventDefault();
        // Prepare the file
        var output;
        if (event.target.innerHTML === "Save") {
            output = JSON.stringify(this.props.json);
        }
        else if (event.target.innerHTML === "Export") {
            this.setState({ fileType: "html" });
            const templateVariables = this.props.templateVariables;
            const templateVariablesArray = templateVariables.split(",");
            const templateVariablesHash = {};
            output = this.props.html;
            debugger;
            templateVariablesArray.forEach(keyValString => {
                const keyValArray = keyValString.split("=");
                const key = keyValArray[0];
                const val = keyValArray[1];
                const regex = new RegExp(`\\${key}`, "g");
                output = output.replace(regex, val);
                debugger;
            });

            console.log(output);
        }

        // Download it
        const blob = new Blob([output]);
        const fileDownloadUrl = URL.createObjectURL(blob);
        this.setState({ fileDownloadUrl: fileDownloadUrl },
            () => {
                this.dofileDownload.click();
                URL.revokeObjectURL(fileDownloadUrl);  // free up storage--no longer needed.
                this.setState({ fileDownloadUrl: "" })
            })
    }

    /**
     * Function returns the content as a CSV string
     * See https://stackoverflow.com/a/20623188/64904
     * Parameter content:
     *   [
     *.     [header1, header2],
     *.     [data1, data2]
     *.     ...
     *.  ]
     * NB Does not support Date items
     */


    upload(event) {
        event.preventDefault();
        this.dofileUpload.click()
    }

    /**
     * Process the file within the React app. We're NOT uploading it to the server!
     */
    openFile(evt) {
        let status = []; // Status output
        const fileObj = evt.target.files[0];
        const reader = new FileReader();

        let fileloaded = e => {
            // e.target.result is the file's content as text
            const fileContents = e.target.result;
            // status.push(`File name: "${fileObj.name}". Length: ${fileContents.length} bytes.`);
            this.props.onLoad(fileContents);
            this.setState({ status: status.join("\n"), fileContents })
        }

        // Mainline of the method
        fileloaded = fileloaded.bind(this);
        reader.onload = fileloaded;
        reader.readAsText(fileObj);
    }

    render() {
        return (
            <div>
                <form>

                    <button onClick={this.download} style={{ display: 'inline', marginRight: '2%' }}>
                        Save
                    </button>

                    <a className="hidden"
                        download={this.fileNames[this.state.fileType]}
                        href={this.state.fileDownloadUrl}
                        ref={e => this.dofileDownload = e}
                    ></a>

                    <button onClick={this.upload} style={{ display: 'inline', marginRight: '2%' }}>
                        Load
                    </button>

                    <input type="file" className="hidden" style={{ display: 'none' }}
                        multiple={false}
                        accept=".json,.csv,.txt,.text,application/json,text/csv,text/plain"
                        onChange={evt => this.openFile(evt)}
                        ref={e => this.dofileUpload = e}
                    />

                    <button onClick={this.download} >
                        Export
                    </button>

                </form>
            </div>
        )
    }
}

