'use babel';

import LineCommands from '../lib/line-commands';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('LineCommands', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('line-commands');
  });

  describe('when the line-commands:toggle event is triggered', () => {
    it('runs the desired command', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.line-commands')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'line-commands:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.line-commands')).toExist();

        let lineCommandsElement = workspaceElement.querySelector('.line-commands');
        expect(lineCommandsElement).toExist();

        let lineCommandsPanel = atom.workspace.panelForItem(lineCommandsElement);
        expect(lineCommandsPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'line-commands:toggle');
        expect(lineCommandsPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.line-commands')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'line-commands:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let lineCommandsElement = workspaceElement.querySelector('.line-commands');
        expect(lineCommandsElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'line-commands:toggle');
        expect(lineCommandsElement).not.toBeVisible();
      });
    });
  });
});
