# TODO

- NEXT:
  - extract logger into naive-logger
  - a pure plugin system
  - a bootstrap plugin to provide skeletion for other plugins

- stage 1: convert files into react components
  - import all the config files, parse as config ( not part of plugin )
  - for each hrc/pages/[PageName].json, we generate components in destination
    - preprocess file and add data-component-name in it, (N * M)
      N is number of components, M is number of nodes
      we can implement one pass solution to boost performance to (M)
      pick components using these tags using one traverse (M)
    - we can save temp files and use dif to boost performance
    - we can let user mark component as local boost performance
  - provide hooks in different levels so that we have a plugin systems
    - each node
    - each file and component, they may be the same or file contains component
  - plugins:
    - className
    - style
    - props (later)

- stage 2: add container components and resolve dependencies

- stage 3: change urls for react router
