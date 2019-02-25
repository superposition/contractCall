



Building
--------
This project is based on [Electron](http://electron.atom.io/) with 
[Electron Builder](https://www.electron.build/), [React](https://facebook.github.io/react/)
and [Material Components for Web](https://github.com/material-components/material-components-web-react/). It uses [Create React App](https://github.com/facebookincubator/create-react-app)
to bootstrap the react components and a modified version of the workflow
explained in [Kitze's blog](https://medium.com/@kitze/%EF%B8%8F-from-react-to-an-electron-app-ready-for-production-a0468ecb1da3)
to integrate CRA with Electron.

- Ensure you have [NodeJS](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) in your development environment

- Clone the repository into a suitable location on the drive
  ```
  git clone 
  ```
- Install all the development components and libraries through
  ```
  
  
  yarn 
  ```
  
- To devlop locally, run the following yarn script
  ```
  yarn electron-dev
  ```

- To build the packed application, use the following script which calls `electron-builder`
  and packs executables for Linux, Mac & Windows. For more command line options, see
  the documentation for `electron-builder`
  ```
  yarn electron-pack -mwl
  ```
  

