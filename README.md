# Mastodon Tools (Beta)

This is an early version of my Mastodon Tools browser extension, available for testing on Firefox and Chrome.

Here's how you can install an extension in development mode:

- [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installing)
- [Chrome](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked)

Currently the only feature available for testing is the Mastodon instance switcher.

## Available tools

### Mastodon instance switcher

Clicking the extension icon lets you open a currently viewed post on another instance. On the extension settings you can specify one or more instances you use and want to switch between.

![Screenshot of the main menu with a list of Mastodon instances allowing you to switch between them.](browser-extension/assets/screenshot-popup.png)


Each instance domain (omit the http or https protocol) goes on a separate line.

![Screenshot of the settings page with a text field for adding your Mastodon instances.](browser-extension/assets/screenshot-settings.png)