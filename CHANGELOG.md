# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.6.0] - 2022-01-15

### Changed

- Change how the scenario and the reports are stored in the local storage. You may have to reset your local storage to be able to use the new version.

### Added

- Users can now export the scenario and reports as a CSV file
- Display report status in scenario list
- User can filter scenarios by status in scenario list

### Fixed

- The user can now cancel the CSV upload during the configuration configuration
- The user can now skip a scenario during the run

## [0.5.0] - 2022-01-13

### Added

- The user can now select the role of each column in its uploaded CSV file

## [0.4.1] - 2022-01-05

### Fixed

- Fix deployment on Github

## [0.4.0] - 2022-01-05

### Added

- Add a list of scenarios

## [0.3.0] - 2022-01-05

### Added

- Add a chart to display status by category

### Fixed

- Change the chart colors
- Load reports at bootstrap

## [0.2.0] - 2021-12-28

### Fixed

- Fix the remote file upload
- Support remote URL history
- Add some error messages on file upload

## [0.1.0] - 2021-12-22

### Added

- Upload a CSV and keep it in memory
- Parse a CSV file to create the steps
- Allow the user to walk through the steps and validate them
- Get a report on the test status
