# HETIC-P2019-18

## Installation

### Install NodeJs
Go to [NodeJS.org](http://NodeJS.org) for installation.

### Install Sass
Go to [sass-lang.com/install](http://sass-lang.com/install) for installation in command line.

### Install Bourbon

In your terminal :

```
gem install 'bourbon'
```

If you have an error saying "You don't have write permissions", use :

```
sudo gem install 'bourbon'
```

### Install Gulp
We begin by installing Gulp in global mode with `-g`.

```
npm install -g gulp
```

To check if everything is installed and Gulp is active:

```
gulp -v
```

### Download the dependencies NPM

```
npm install
```

## Gulp Task

### Run project

```
gulp
```

## Documentation

### Git commit messages naming convention

type(scope): subject

Allowed <type> values:
  feat (new feature for the user, not a new feature for build script)
  add (new elements (fonts, images ...))
  fix (bug fix for the user, not a fix to a build script)
  change (change/update to an existing feature)
  docs (changes to the documentation)

### CSS naming convention

BEM with a modified syntax for Windows compatibility

Block-element--modifier
