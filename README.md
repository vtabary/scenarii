# Scenarii

![Test status](https://github.com/vtabary/scenarii/workflows/Test/badge.svg)
![LICENSE](https://img.shields.io/github/license/vtabary/scenarii)

This project aims to help the developer to do e2e testing manually on their applications.

## Features

- The user can upload a CSV from a local file or a remote file
- Let the user select the role of each CSV column
- The user can follow and check the scenarios one by one
- Reports are generated from the results
- All scenarios are listed and can be viewed at once
- Filter the list of scenarios
- The scenarios can be exported into a CSV File

## CSV details

The CSV file must, at least, have the following columns, serapated by a semicolon:

- A **unique identifier** to identify each scenario
- A **message** to describe the scenario

The file can also have the following columns:

- A **category** to group scenarios, and a **subcategory** to be finer grained
- A **dependency** to express the scenario which should be executed before this one
- A **comment** to add some optional details on the scenario like some examples, or data to use

The order of the columns is not important. All other columns are ignored.

## Installation

This application is based on [Angular](https://angular.io) and the repository is using [Nx](https://nx.dev/).

To serve the project locally:

```bash
yarn install
nx serve frontend
```

To build the project and serve it with some http server:

```bash
yarn install
nx build frontend
```

## TODO

- Let the user add some comments on a failed scenario
- Let the user to export the reports
- Add the tester comments to the scenario list
- Display the scenario dependencies
- Delete a scenario
- Edit a scenario
- Sort the list of scenarios
- Add more unit tests
- Add e2e tests
- Upload the scenarios to an online service (needs a server and an authentication)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) file.

## License

[MIT](./LICENSE)
