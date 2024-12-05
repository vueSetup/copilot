import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

// ...existing code...

export interface TreeNode {
    name: string;
    type: 'file' | 'folder';
    children?: TreeNode[];
}

function readDir(currentPath: string): TreeNode[] {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    return entries.map(entry => {
        const fullPath = path.join(currentPath, entry.name);
        if (entry.isDirectory()) {
            return {
                name: entry.name,
                type: 'folder',
                children: readDir(fullPath)
            };
        } else {
            return {
                name: entry.name,
                type: 'file'
            };
        }
    });
}

function readFolder(dir: string): TreeNode {
    const stats = fs.statSync(dir);
    if (!stats.isDirectory()) {
        throw new Error(`${dir} is not a directory`);
    }

    const result: TreeNode = {
        name: path.basename(dir),
        type: 'folder',
        children: []
    };

    result.children = readDir(dir);
    return result;
}

export function readWorkspaces(): TreeNode[] {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        return [];
    }

    return workspaceFolders.map(folder => readFolder(folder.uri.fsPath));
}

// ...existing code...
