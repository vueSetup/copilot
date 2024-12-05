import * as vscode from 'vscode';
import { ref, watch } from "reactive-vscode";
// import * as parser from '@vue/compiler-sfc';
// import { Disposable, disposeAll } from '../utils';

interface Message<T> {
    type: 'receive' | 'post';
    text: T;
}

// TODO :: extends Disposable && implements vscode.WebviewPanelSerializer
export default class VueEditorProvider implements vscode.CustomTextEditorProvider {

    public static register(context: vscode.ExtensionContext): vscode.Disposable {
        return vscode.window.registerCustomEditorProvider(
            VueEditorProvider.viewType,
            new VueEditorProvider(context)
        );
    }

    private static readonly viewType = 'copilot.editor';

    private text = ref<string>();

    constructor(
        private readonly context: vscode.ExtensionContext
    ) {
    }

    resolveCustomTextEditor(
        document: vscode.TextDocument,
        webviewPanel: vscode.WebviewPanel,
        token: vscode.CancellationToken
    ): Thenable<void> | void {
        this.text.value = document.getText();

        webviewPanel.webview.options = {
            enableScripts: true,
        };
        webviewPanel.webview.html = `${document.getText()}`;

        // Receive message from the webview.
        webviewPanel.webview.onDidReceiveMessage((message: Message<unknown>) => {
            switch (message.type) {
                case 'receive':
                    break;
            }
        });

        // Hook up event handlers so that we can synchronize the webview with the text document.
        //
        // The text document acts as our model, so we have to sync change in the document to our
        // editor and sync changes in the editor back to the document.
        // 
        // Remember that a single text document can also be shared between multiple custom editors
        // (this happens for example when you split a custom editor)
        const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(e => {
            if (e.document.uri.toString() === document.uri.toString()) {
                this.text.value = document.getText();
            }
        });

        // Make sure we get rid of the listener when our editor is closed.
        webviewPanel.onDidDispose(() => {
            changeDocumentSubscription.dispose();
        });

        watch(this.text, (code) => {
            webviewPanel.webview.postMessage({ code });
        }, { immediate: true });
    }
}