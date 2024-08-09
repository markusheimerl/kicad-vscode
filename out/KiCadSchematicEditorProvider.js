"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KiCadSchematicEditorProvider = void 0;
const vscode = __importStar(require("vscode"));
const child_process_1 = require("child_process");
const fs_1 = require("fs");
class KiCadSchematicEditorProvider {
    context;
    static viewType = 'kicadForVSCode.preview';
    constructor(context) {
        this.context = context;
    }
    async openCustomDocument(uri) {
        return { uri, dispose: () => { } };
    }
    async resolveCustomEditor(document, webviewPanel, _token) {
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
    async getSchematicSvg(uri) {
        const filePath = uri.fsPath;
        const outputPath = `${filePath}.svg`;
        return new Promise((resolve, reject) => {
            (0, child_process_1.exec)(`kicad-cli sch export svg "${filePath}" -o "${outputPath}"`, async (error, stdout, stderr) => {
                if (error) {
                    reject(`Error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    reject(`stderr: ${stderr}`);
                    return;
                }
                try {
                    const svgContent = await fs_1.promises.readFile(outputPath, 'utf8');
                    await fs_1.promises.unlink(outputPath);
                    resolve(svgContent);
                }
                catch (err) {
                    reject(`Error reading SVG file: ${err}`);
                }
            });
        });
    }
    getHtmlForWebview(webview) {
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
exports.KiCadSchematicEditorProvider = KiCadSchematicEditorProvider;
//# sourceMappingURL=KiCadSchematicEditorProvider.js.map