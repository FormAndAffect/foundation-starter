# F&M notes
----

This is a starter boilerplate used for static html sites or expression engine templates. It's based on the Foundation Zerb Template - tweaked to optionally run php and React/Webpack.

## Dependencies

Must have Node.js, Bower, and Git installed

## Installation

navigate to the direcory you choose to work in on your computer

```
cd <your working directory>
```
install npm modules
```
npm install
```
install bower moudules
```
bower install
```


## Running the Project

### static html files

To run for html prototyping with Panini, navigate to project root directory then:

```
npm start
```

(finished files copy to `dist` folder).

To preview:

```
http://localhost:8000
```

### build static html for production

To create compressed, production-ready assets:

```
npm run build
```


## HTML templating folder structure

```
src/
|
|-- assets/ # images, js, scss, media
|   |-- img/
|   |-- js/
|   |     |-- app.js # base application js
|   |     |-- vendor.js # non packaged plugin js
|   |    
|   |-- media/ # anything to include in prod. build that's not js,img,scss
|   |-- scss/
|
|-- layouts/ # base template(s) for proj. (html tag, head tag, etc.)
|   |-- default.html
|   ...
|
|-- pages/ # page content of layout goes in this section
|   |-- index.html 
|   |-- sample-page.html
|   ...
|
|-- partials/ # like php include for pages or layout
|   |-- header.html 
|   |-- navigation.html
|   |-- footer.html
|   ...
|
|-- styleguide/ # used to as snippites to help build sites or possibly for client to preview things
|   |-- index.md # markdown file used to build the styleguide
|   |-- template.html # display the styleguide data from md file (optionally with styleguide specific css)
|   ...
|   
```

### php files (for Expression Engine)

To use php files for ee, put template files in the src/php folder then:

```
npm run runphp
```

(files will be copied to dist/templates).

Optionally start a local php server in the browser for testing (only applies to the src folder):

```
npm run servephp
```

Then preview at:

```
localhost:8010
```
### build php files for production

To create compressed, production-ready assets:

```
buildphp
```


## SASS/CSS with Flexbox

breakpoints are set at:

small: 0,

medium: 640px,

large: 1024px,

this can be adjusted in _settings.scss
(xlarge: 1200px, and xxlarge: 1440px can be used but must be custom)

## Modular css naming conventions:
http://thesassway.com/advanced/modular-css-naming-conventions

use objects similar to SMACSS convention - like headers, footers, buttons, and content areas, etc.

###Parent-child relationships:

```sass
// Posts
.post {
  ...
}
.post-title {
  ...
}
```

or pluralizing

```sass
.tabs {
  ...
}

.tab {
  ...
}
```

###Subclassing

```sass
.button {
  ...
}

.dropdown-button {
  ...
}
```

###State Modifiers

(would typically be used in conjunction with &
since they only apply to the object at hand)

```sass
.tab {
  ...

    &.is-selected {
    ...
  }
}
```
```sass
.textbox {
  ...

    &:focus { ... }

    &.large { ... }
    &.small { ... }
}
```

###global modifiers

```sass

.clearfix { @include clearfix; }
.is-hidden    { display: none !important; }
.is-invisible { visibility: none !important; }
```

###Folder Structure:
from:
https://zurb.com/university/lessons/avoid-a-cluttered-mess-sensible-sass-file-structure

the app.scss is the main file for importing all others.
Components, contains, and partials are structured:
-in alphabetical order
-prefixed with an underscore (tells the sass pre-processor not to compile to it's own css file)

```
scss/
|
|-- components/ 
|   |-- _footer.scss
|   |-- _hero.scss
|   |-- _nav-main.scss
|   |-- _nav-side.scss
|   |-- _thumbnails.scss
|   ...
|
|-- mixins/
|   |-- _colorpicker.scss
|   |-- _jquery.ui.core.scss
|   ...
|
`-- app.scss   # primary Sass file
```

then import them into the bottom of the app.scss file:

```sass
//... foundatoin includes uptop

//mixins (import before components)
@import "mixins/colorpicker.scss";
@import "mixins/jquery.ui.core.scss";

//components
@import "components/footer";
@import "components/hero";
@import "components/nav-main";
@import "components/nav-side";
@import "components/thumbnails";
```

## Javascript notes


### Application javascript
include main applicaiton scripts underneath `$(document).foundation();` in
src/assets/js/app.js


### Vendor plugins:

first try installing them as non dev dependancies through npm or bower
then including them in config.yml > javascript


If not available that way, you can include them in 
src/assets/js/vendor.js

## React

React is disabled by default. To enable it, use the flag `-- --react`.
For example

```
npm run <command> -- --react
```

Put all react source files in: src/react-app. When run, this will output one combined file in: dist/assets/react.js.

To preview if react is enabled you can view the sample page: `http://localhost:8000/react-sample-page.html`.


# ZURB Template notes
----

[![devDependency Status](https://david-dm.org/zurb/foundation-zurb-template/dev-status.svg)](https://david-dm.org/zurb/foundation-zurb-template#info=devDependencies)

**Please open all issues with this template on the main [Foundation for Sites](https://github.com/zurb/foundation-sites/issues) repo.**

This is the official ZURB Template for use with [Foundation for Sites](http://foundation.zurb.com/sites). We use this template at ZURB to deliver static code to our clients. It has a Gulp-powered build system with these features:

- Handlebars HTML templates with Panini
- Sass compilation and prefixing
- JavaScript concatenation
- Built-in BrowserSync server
- For production builds:
  - CSS compression
  - JavaScript compression
  - Image compression

## Installation

To use this template, your computer needs:

- [NodeJS](https://nodejs.org/en/) (0.12 or greater)
- [Git](https://git-scm.com/)

This template can be installed with the Foundation CLI, or downloaded and set up manually.

### Using the CLI

Install the Foundation CLI with this command:

```bash
npm install foundation-cli --global
```

Use this command to set up a blank Foundation for Sites project with this template:

```bash
foundation new --framework sites --template zurb
```

The CLI will prompt you to give your project a name. The template will be downloaded into a folder with this name.

### Manual Setup

To manually set up the template, first download it with Git:

```bash
git clone https://github.com/zurb/foundation-zurb-template projectname
```

Then open the folder in your command line, and install the needed dependencies:

```bash
cd projectname
npm install
bower install
```