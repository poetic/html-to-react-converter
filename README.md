# html-to-react-covertor

html-to-react-covertor converts htmls to a working and modifiable react app
using several configuration files.

## Usage

You need to create config files for the `htr` cli to extract react components
and generate other files from html files.

### ./hrc/config.json

- source:
  - description: The source file or folder for the html files, relative to the project folder.
  - default: './'
- destination:
  - description: The destination folder for all the components

- Example:
  ```
  {
    "source": ".design/",
    "destination": "client/components"
  }
  ```

### ./hrc/routes.json

This file is used to create react Route file so that the generate files are
a complete react project.

### ./hrc/pages/[PageName].json

Theses files are used to extract and create react components from htmls.
We use jquery selector to target the components.

- file:
  - description: file path relative to the source configured in config.json
  - required
- components.[].selector:
  - description: the selector used to target the html
  - required
- components.[].name:
  - description: the name of the generated component
  - required
- components.[].skip:
  - description: if skip is true, we do not write to the destination folder
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

## TODO
- implement config.json
- implement pages[PageName].json
- implement routes.json
