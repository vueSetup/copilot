import * as vscode from 'vscode';
import { Command } from './commandManager';

export class ShowPreviewCommand implements Command {
    public readonly id = 'copilot.editor.showPreview';

    public constructor(
    ) { }

    public execute() {
    }
}
