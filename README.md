# F&M notes
----

## Running Project


to run for html prototyping with Panini, navigate to project root directory then:
(finished files copy to `dist` folder)
```
npm start
```

preview:

```
http://localhost:8000
```

To create compressed, production-ready assets:

```
npm build
```

### to use php files for ee, put template files in the php folder then to have it build to the 'dist' folder

```
npm run runphp
```

### to start a local php server in the browser for testing (only applies to the src folder)

```
npm run servephp
```

then preview at:

```
localhost:8010
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
```
// Posts
.post {
	...
}
.post-title {
	...
}
```
or pluralizing
```
.tabs {
	...
}

.tab {
	...
}
```
###Subclassing
.button {
	...
}

.dropdown-button {
	...
}

###State Modifiers
(would typically be used in conjunction with &
since they only apply to the object at hand)
.tab {
	...

  &.is-selected {
  ...
  }
}

###.textbox {
	...

  &:focus { ... }

  &.large { ... }
  &.small { ... }
}

###global modifiers
.clearfix { @include clearfix; }
.is-hidden    { display:    none !important; }
.is-invisible { visibility: none !important; }


##Folder Structure:
from:
https://zurb.com/university/lessons/avoid-a-cluttered-mess-sensible-sass-file-structure

the app.scss is the main file for importing all others.
components contains partials and are structured:
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

then import them into the _settings.scss file:

//mixins (import before components)
@import
  "colorpicker.scss",
  "jquery.ui.core.scss"

//components
@import
  "footer",
  "hero",
  "nav-main",
  "nav-side",
  "thumbnails";


## Javascript

----

## Application javascript
include main applicaiton scripts underneath $(document).foundation(); in
src/assets/js/app.js


## Vendor plugins:

first try installing them as non dev dependancies through npm or bower
then including them in config.yml > javascript


If not available that way, you can include them in 
src/assets/js/vendor.js


# HTML templating

```
src/
|
|-- layouts/ 
|   |-- default.html # base template for proj.
|   |-- internal.html
|   ...
|
|-- pages/
|   |-- index.html # page content goes in this section
|   |-- sample-page.html
|   ...
|
|-- partials/
|   |-- header.html # page content goes in this section
|   |-- navigation.html
|   |-- footer.html
|   ...
|
|-- styleguide/
|   |-- index.md # used to build the styleguide
|   |-- template.html
|   ...
|   
```

# ZURB Template notes

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
