import * as vscode from "vscode";
import { readWorkspaces, type TreeNode } from "../utils/explorer";

class Route extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly children?: Route[]
    ) {
        super(label, collapsibleState);
    }
}

export default class RouteTreeDataProvider implements vscode.TreeDataProvider<Route> {

    public static register(context: vscode.ExtensionContext): vscode.Disposable {
        return vscode.window.registerTreeDataProvider(
            RouteTreeDataProvider.viewType,
            new RouteTreeDataProvider(context)
        );
    }

    private static readonly viewType = 'copilot.routes';

    private _onDidChangeTreeData: vscode.EventEmitter<void | Route | Route[] | null | undefined> = new vscode.EventEmitter<void | Route | Route[] | null | undefined>();
    readonly onDidChangeTreeData: vscode.Event<void | Route | Route[] | null | undefined> = this._onDidChangeTreeData.event;

    constructor(
        private readonly context: vscode.ExtensionContext
    ) { }

    getTreeItem(
        element: Route
    ): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getParent?(
        element: Route
    ): vscode.ProviderResult<Route> {
        return null;
    }

    getChildren(
        element?: Route | undefined
    ): vscode.ProviderResult<Route[]> {
        if (!element) {
            const workspaceTree = readWorkspaces();
            return workspaceTree.map(node => this.convertToRoute(node));
        }
        return element.children || [];
    }

    private convertToRoute(node: TreeNode): Route {
        if (node.type === 'folder') {
            return new Route(
                node.name,
                vscode.TreeItemCollapsibleState.Collapsed,
                node.children?.map(child => this.convertToRoute(child))
            );
        } else {
            return new Route(
                node.name,
                vscode.TreeItemCollapsibleState.None
            );
        }
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    resolveTreeItem?(
        item: vscode.TreeItem,
        element: Route,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.TreeItem> {
        return item;
    }
}