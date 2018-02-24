# line-commands

In document command like modification from anywhere in document.

## Current commands:

     replaceone regex replacement

   replace the first instance of a regex search with a given string

     replaceall regex replacement

   replace all instances of a regex search with a given string

     goto lineNumber

   move the cursor to linenumber and move screen position

     delete line

     delete startline endline

   delete a line or range of lines(buggy)

Type command and parameters in any blank line in document.
The run shortcut is ctrl-alt-k. You must have your cursor in the line.
This line will be deleted and the command will be parsed and processed.

## Demo

![Demo Only Work on GitHub](https://github.com/mguid65/line-commands/blob/master/demo.gif)
