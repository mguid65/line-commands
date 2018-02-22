'use babel';
'use text-editor';

import LineCommandsView from './line-commands-view';
import { CompositeDisposable } from 'atom';

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

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'line-commands:toggle': () => this.toggle()
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

  toggle() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let lineNum = editor.getCursorBufferPosition().row
      //console.log(lineNum)

      let command = editor.lineTextForBufferRow(lineNum)
      //console.log(command)

      let parseCommand = command.split(' ')
      editor.deleteLine()

      let buffer = editor.getBuffer()
      //console.log(parseCommand[1])
      if (parseCommand[0] == "replaceall") {
        if (parseCommand.length == 1) {
          return
        }
        buffer.scan(new RegExp(parseCommand[1], 'g'), function(obj) { obj.replace(parseCommand[2])} )
      }
      else if (parseCommand[0] == "replaceone") {
        if (parseCommand.length === 1) {
          return
        }
        buffer.scan(new RegExp(parseCommand[1]), function(obj) { obj.replace(parseCommand[2])} )
      } else { return }
    }
  }
};
