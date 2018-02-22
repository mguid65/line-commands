'use babel';
'use text-editor';

import LineCommandsView from './line-commands-view';
import { CompositeDisposable } from 'atom';
import CustomParseCommands from './customparsecommands';

export default {

  lineCommandsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.lineCommandsView = new LineCommandsView(state.lineCommandsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.lineCommandsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that runs this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'line-commands:run': () => this.run()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.lineCommandsView.destroy();
  },

  serialize() {
    return {
      lineCommandsViewState: this.lineCommandsView.serialize()
    };
  },

  run() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let lineNum = editor.getCursorBufferPosition().row
      //console.log(lineNum)

      let line = editor.lineTextForBufferRow(lineNum)
      //console.log(command)

      editor.deleteLine()

      let parseCommands = new CustomParseCommands(line)
      let command = parseCommands.getCommand()
      let argList = parseCommands.getArgList()
      //console.log(argList)

      let buffer = editor.getBuffer()
      //console.log(parseCommand[1])
      if (command == "replaceall") {
        if (argList.length == 0) {
          return
        }
        buffer.scan(new RegExp(argList[0], 'g'), function(obj) { obj.replace(argList[1])} )
      }
      else if (command == "replaceone") {
        if (argList.length == 0) {
          return
        }
        buffer.scan(new RegExp(argList[0]), function(obj) { obj.replace(argList[1])} )
      } else { return }
    }
  }
};
