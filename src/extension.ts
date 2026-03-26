import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "graphnote" is now active!');

  let disposable = vscode.commands.registerCommand('graphnote.helloWorld', () => {
    vscode.window.showInformationMessage('Hello World from GraphNote!');
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
