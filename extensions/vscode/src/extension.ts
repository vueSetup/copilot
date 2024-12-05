import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "copilot" is now active!');

	context.subscriptions.push(
		vscode.commands.registerCommand('copilot.command.helloWorld', () => {
			vscode.window.showInformationMessage('Hello World from copilot!');
		}),
	);
}

export function deactivate() { }
