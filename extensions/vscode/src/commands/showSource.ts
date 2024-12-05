import * as vscode from 'vscode';
import { Command } from './commandManager';

export class ShowSourceCommand implements Command {
    public readonly id = 'copilot.editor.showSource';

    public constructor(
    ) { }

    public execute() {
    }
}
