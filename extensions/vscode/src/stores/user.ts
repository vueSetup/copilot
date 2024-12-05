import * as vscode from 'vscode';
import { ref, watch } from "reactive-vscode";

export const useUserStore = () => {
    const isLoggedIn = ref(false);

    const signIn = () => {

    };

    watch(isLoggedIn, (value) => {
        vscode.commands.executeCommand('setContext', 'isLoggedIn', value);
    });

    return {
        isLoggedIn
    };
};