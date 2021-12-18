# Scenarii

This project aims to help the developer to do e2e testing manually on their applications.

## CSV details

The scenarios has to be described inside an CSV file matching this format:

```csv
id,category,subcategory,dependency,message,comment
```

- The `id` must a unique identifier for the scenario.
- The `category` specifies the functionnality matching the scenario.
- The `subcategory` specifies the subfunctionnality matching the scenario.
- The `dependency` indicates the previous scenario which must be executed before this one.
- The `message` describe the action the user must do to validate the scenario.
- The `comment` add some optional details on the scenario like some examples.

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

- Fix remote URL upload
- Support remote URL history
- Let the user add some comments on a failed scenario
- Add reports depending on categories
- Let the user exports the reports
- Display the scenario dependencies
- Manage the scenarios
- Add more unit tests
- Add e2e tests
- Upload the scenarios to an online service (needs a server and an authentication)

## Contributing

See [CONTRIGUTING.md](./CONTRIGUTING.md) file.

## License

[MIT](./LICENSE)
