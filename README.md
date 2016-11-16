# html-to-react-converter

html-to-react-converter converts htmls to a working and modifiable react app
using several configuration files.

## Usage

You need to create config files for the `htr` cli to extract react components
and generate other files from html files.

### hrc/options.json

- source:
  - description: The source file or folder for the html files, relative to the project folder.
  - default: './'
- destination:
  - description: The destination folder for all the components
  - default: 'client/'
- plugins
- plugins.[]:
  - description: Custom plugins as node modules you want to use

- Example:
  ```
  {
    "source": ".design/html",
    "destination": "client/",
    "plugins": []
  }
  ```

### hrc/routes.json

This file is used to create react Route file so that the generate files are
a complete react project.

### hrc/pages/[PageName].json

Theses files are used to extract and create react components from htmls.
We use jquery selector to target the components.

- file:
  - description: file path relative to the source configured in options.json
  - default: path/to/source/[PageName].html
- components
- components.[].selector:
  - description: the selector used to target the html
  - required
- components.[].name:
  - description: the name of the generated component
  - required
- components.[].skip:
  - description: if skip is true, we do not write to the destination folder
- components.[].props
- components.[].props.[].key:
  - description: the key of the prop we apply to the tag
  - required
- components.[].props.[].value:
  - description: the value of the prop we apply to the tag
  - required
  - note: this a STRING, we will paste this string as literal code

- Example:
  ```
  {
    "file": "users.html",
    "components": [
      {
        "selector": "#nav-bar",
        "name": "NavBar",
        "skip": true,
        "props": [
          {
            "selector": ".picture",
            "key": "src",
            "value": "\"`images/${this.props.user.picture}`\""
          }
        ]
      }
    ]
  }
  ```

### CLI
After you run `htr`, we will create the following contents:
- path/to/destination/components/

  This will contain all generated components. For each component, we will
  generate a container component that you can manipulate.

- path/to/destination/index.jsx

  This will contain all the routes

- htr/staging/

  This will contain all staging files that when not skipped will be
  copied to the destination components

## [TODO](README.TODO.md)
