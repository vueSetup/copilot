import * as vscode from 'vscode';
import SignInViewProvider from "./SignInViewProvider";
import RoutesViewProvider from './RoutesViewProvider';
import VueEditorProvider from './VueEditorProvider';

export const registerAllProviders = (
    context: vscode.ExtensionContext
) => {
    // Side Bar
    context.subscriptions.push(
        SignInViewProvider.register(context));
    context.subscriptions.push(
        RoutesViewProvider.register(context));

    // Editor
    context.subscriptions.push(
        VueEditorProvider.register(context));
};