import * as vscode from 'vscode';
import { KiCadSchematicEditorProvider } from './KiCadSchematicEditorProvider';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.window.registerCustomEditorProvider(
            'kicadForVSCode.preview',
            new KiCadSchematicEditorProvider(context),
            {
                webviewOptions: { retainContextWhenHidden: true },
                supportsMultipleEditorsPerDocument: false
            }
        )
    );
}

export function deactivate() {}