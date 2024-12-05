import * as vscode from 'vscode';
import { useUserStore } from "../stores";
export const registerAllCommands = (
    context: vscode.ExtensionContext
) => {
    const { isLoggedIn } = useUserStore();

    context.subscriptions.push(
        vscode.commands.registerCommand('copilot.command.helloWorld', () => {
            vscode.window.showInformationMessage('Hello World from copilot!');
        })
    );
    context.subscriptions.push(
        vscode.commands.registerCommand('copilot.command.signin', () => {
            isLoggedIn.value = true;
            vscode.commands.executeCommand('workbench.view.extension.routes');
            vscode.window.showInformationMessage('Sign In!');
        })
    );
    context.subscriptions.push(
        vscode.commands.registerCommand('copilot.command.signout', () => {
            isLoggedIn.value = false;
            vscode.commands.executeCommand('workbench.view.extension.signin');
            vscode.window.showInformationMessage('Sign Out!');
        })
    );
};