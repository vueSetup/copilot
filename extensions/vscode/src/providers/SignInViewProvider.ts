import * as vscode from 'vscode';

export default class SignInViewProvider implements vscode.WebviewViewProvider {

    public static register(context: vscode.ExtensionContext): vscode.Disposable {
        return vscode.window.registerWebviewViewProvider(
            SignInViewProvider.viewType,
            new SignInViewProvider(context)
        );
    }

    private static readonly viewType = 'copilot.signin';

    constructor(
        private readonly context: vscode.ExtensionContext
    ) { }

    resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        token: vscode.CancellationToken
    ): Thenable<void> | void {
        webviewView.webview.options = {
            enableScripts: true,
        };
        webviewView.webview.html = `login:123`;
    }
}