"use babel";

export default {
  config: {
    executablePath: {
      type: "string",
      default: "puppet-lint"
    }
  },

  activate: () => {
    // Because all of the grammars this linter supports are
    //  built into the editor we do not need to throw errors when
    //  any one of the grammmars isn't installed. If a user has the grammar
    //  disabled that is a choice they have made.

    // Show the user an error if they do not have an appropriate linter base
    //  package installed from Atom Package Manager. This will not be an issues
    //  after a base linter package is integrated into Atom, in the comming
    //  months.
    // TODO: Remove when Linter Base is integrated into Atom.
    if (!atom.packages.getLoadedPackages("linter")) {
      atom.notifications.addError(
        "Linter package not found.",
        {
          detail: "Please install the `linter` package in your Settings view."
        }
      );
    }
  },

  provideLinter: () => {
    const helpers = require("atom-linter");
    const path    = require("path");
    
    //puppet_atom_test.pp - ERROR: cosa not in autoload module layout on line 1
    //puppet_atom_test.pp - WARNING: class not documented on line 1
    const regex = /\s+-\s(.*):\s+(.*)\son\sline\s(\d+)/;
    return {
      grammarScopes: ["source.puppet"],
      scope: "file",
      lintOnFly: false,
      lint: (activeEditor) => {
        const command = atom.config.get("linter-puppet-lint-for-linter-3.executablePath");
        const file    = activeEditor.getPath();
        const cwd     = path.dirname(file);
        const args    = ["--with-filename", file];

        return helpers.exec(command, args, {stream: "stdout", cwd: cwd}).then(output => {
          const toReturn = [];
          output.split(/\r?\n/).forEach(function (line) {
            const matches = regex.exec(line);
            if (matches === null) {
              return;
            }
            toReturn.push({
              range: helpers.rangeFromLineNumber(activeEditor, Number.parseInt(matches[3])),
              type: matches[1],
              text: matches[2],
              filePath: file
            });
          });
          return toReturn;
        });
      }
    };
  }
};
