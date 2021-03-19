# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- I18n ES.
## [0.10.3] - 2020-07-30
### Fixed
- Error calling `insertCoupon` function when component is outside `checkout-cart` context.

## [0.10.2] - 2020-07-30
### Changed
- Project linted and re-formatted.

## [0.10.1] - 2019-12-05
### Changed
- Texts.

## [0.10.0] - 2019-11-13
### Removed
- `errorKey` prop in order to avoid inconsistency, since it was kept on both `order-coupon` and `checkout-coupon`.

## [0.9.0] - 2019-11-11
### Added
- Spinner to the input in order to give the user a feedback of loading.

## [0.8.0] - 2019-11-08
### Removed
- `order-coupon` dependency.

## [0.7.0] - 2019-11-06
### Changed
- Input + Button to InputButton.

## [0.6.0] - 2019-11-06

## [0.5.2] - 2019-10-25
### Fixed
- Show coupon error message.

## [0.5.1] - 2019-10-15
### Added
- Styleguide components ids.

### Changed
- Use `FormattedMesage` instead of `intl`.

## [0.5.0] - 2019-10-14

## [0.4.7] - 2019-10-11
### Changed
- Component bevahior on blur when it has no content

## [0.4.6] - 2019-10-01
### Changed
- Button's label style

## [0.4.5] - 2019-09-11
### Changed
- Change messages ids to be the same as the ones from Checkout API

## [0.4.4] - 2019-09-11
### Fixed
- Incorrect message id on defineMessages

## [0.4.3] - 2019-09-06
### Changed
- Intl entries

## [0.4.2] - 2019-09-05
### Added
- Unit tests

## [0.4.1] - 2019-08-29
### Added
- UI manipulation related functions

## [0.4.0] - 2019-08-26
### Removed
- All the component's logic

### Added
- Consuming Order-coupon provider
- Internationalization

## [0.3.0] - 2019-08-16

## [0.2.0] - 2019-08-16
### Added
- Component ui details
- Button with icon in order to close the input

## [0.1.0] - 2019-08-13
### Added
- Coupon Component
- Interface to be used by other apps
- Tag that shows the current coupon
