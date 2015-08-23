
linter-puppet-lint-for-linter-3
=========================

This package provides linter support to your puppet files trough atom-linter using puppet-lint

It's completly based on linter-ruby https://github.com/AtomLinter/linter-ruby they did the dirty job

## Installation
Linter package must be installed in order to use this plugin. If Linter is not installed, please follow the instructions [here](https://github.com/AtomLinter/Linter).

Also the pupet-lint gem must be installed. If your don't have puppet-lint installed, please follow the instructions [here](http://puppet-lint.com/).

But basically you should do `gem install puppet-lint`

### Plugin installation

* `$ apm install language-puppet` (if you don't have [language-puppet](https://github.com/atom/language-puppet) installed)
* `$ apm install linter-puppet-lint-for-linter-3`

## Settings

You can configure linter-puppet-lint-for-linter-3 going to the settings menu in atom or by editing ~/.atom/config.cson (choose Open Your Config in Atom menu):

```
'linter-puppet-lint-for-linter-3':
  'executablePath': /usr/bin/puppet-lint # puppet-lint path.
```
