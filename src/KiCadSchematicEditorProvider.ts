import * as vscode from 'vscode';
import { exec } from 'child_process';
import { promises as fs } from 'fs';

export class KiCadSchematicEditorProvider implements vscode.CustomReadonlyEditorProvider {
    private static readonly viewType = 'kicadForVSCode.preview';

    constructor(private context: vscode.ExtensionContext) {}

    async openCustomDocument(uri: vscode.Uri): Promise<vscode.CustomDocument> {
        return { uri, dispose: () => {} };
    }

    async resolveCustomEditor(
        document: vscode.CustomDocument,
        webviewPanel: vscode.WebviewPanel,
        _token: vscode.CancellationToken
    ): Promise<void> {
        webviewPanel.webview.options = {
            enableScripts: true,
            localResourceRoots: [this.context.extensionUri]
        };

        webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);

        const updateWebview = async () => {
            webviewPanel.webview.postMessage({
                type: 'update',
                content: await this.getSchematicSvg(document.uri)
            });
        };

        const changeDocumentSubscription = vscode.workspace.onDidSaveTextDocument(e => {
            if (e.uri.toString() === document.uri.toString()) {
                updateWebview();
            }
        });

        webviewPanel.onDidDispose(() => changeDocumentSubscription.dispose());

        updateWebview();
    }

    private async getSchematicSvg(uri: vscode.Uri): Promise<string> {
        const filePath = uri.fsPath;
        const outputPath = `${filePath}.svg`;

        return new Promise((resolve, reject) => {
            exec(`kicad-cli sch export svg "${filePath}" -o "${outputPath}"`, async (error, stdout, stderr) => {
                if (error) {
                    reject(`Error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    reject(`stderr: ${stderr}`);
                    return;
                }

                try {
                    const svgContent = await fs.readFile(outputPath, 'utf8');
                    await fs.unlink(outputPath);
                    resolve(svgContent);
                } catch (err) {
                    reject(`Error reading SVG file: ${err}`);
                }
            });
        });
    }

    private getHtmlForWebview(webview: vscode.Webview): string {
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'media', 'main.js'));
        const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'media', 'style.css'));

        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>KiCad Schematic Preview</title>
                <link href="${styleUri}" rel="stylesheet" />
            </head>
            <body>
                <div id="svg-container"></div>
                <script src="${scriptUri}"></script>
            </body>
            </html>
        `;
    }
}