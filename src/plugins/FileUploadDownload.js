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
        this.changeFileType = this.changeFileType.bind(this);
        this.download = this.download.bind(this);
        this.upload = this.upload.bind(this);
        this.openFile = this.openFile.bind(this);
    }

    changeFileType(event) {
        const value = event.target.value;
        this.setState({ fileType: value.fileType });
    }

    download(event) {
        event.preventDefault();
        // Prepare the file
        let output;
        if (this.state.fileType === "json") {
            output = JSON.stringify({ states: this.state.data },
                null, 4);
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

                    <button onClick={this.download}>
                        Download
                    </button>

                    <a className="hidden"
                        download={this.fileNames[this.state.fileType]}
                        href={this.state.fileDownloadUrl}
                        ref={e => this.dofileDownload = e}
                    ></a>

                    <p><button onClick={this.upload}>
                        Load
                    </button></p>

                    <input type="file" className="hidden" style={{ display: 'none' }}
                        multiple={false}
                        accept=".json,.csv,.txt,.text,application/json,text/csv,text/plain"
                        onChange={evt => this.openFile(evt)}
                        ref={e => this.dofileUpload = e}
                    />
                </form>
                <pre className="status">{this.state.status}</pre>
            </div>
        )
    }
}

