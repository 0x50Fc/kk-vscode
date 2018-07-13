// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const os = require('os');
const path = require('path');
const fs = require('fs');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    var terminal;

    let command = vscode.commands.registerCommand('extension.kk-cli', function () {

        var platform = os.platform();
        var dir = vscode.workspace.rootPath;

        if (vscode.window.activeTextEditor && vscode.window.activeTextEditor.document) {
            var p = vscode.window.activeTextEditor.document.uri.fsPath;
            var vs = p.split(path.sep);
            while (vs.length > 1) {
                vs.pop();
                vs.push("app.json");
                if (fs.existsSync(vs.join(path.sep))) {
                    break;
                } else {
                    vs.pop();
                    vs.pop();
                }
            }
            if (vs.length > 1) {
                vs.pop();
                dir = vs.join(path.sep);
            }
        }

        if (platform == "darwin") {
            var v = vscode.window.createTerminal("kk-cli:" + path.basename(dir));
            v.sendText("export PATH=" + path.join(context.extensionPath, "bin", "drawin") + ":$PATH", true);
            v.sendText("cd " + dir, true);
            v.sendText("kk-cli", true);
            v.show(true);
        } else if (platform == "win32") {
            var v = vscode.window.createTerminal("kk-cli:" + path.basename(dir));
            v.sendText("set PATH=" + path.join(context.extensionPath, "bin", "win32") + ";%PATH%", true);
            v.sendText("cd " + dir, true);
            v.sendText("kk-cli", true);
            v.show(true);
        }

    });

    context.subscriptions.push(command);

}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;