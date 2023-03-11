# Mastodon Tools (Beta)

This is an early version of my Mastodon Tools browser extension, available for testing on Firefox and Chrome.

Here's how you can install an extension in development mode:

- [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installing)
- [Chrome](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked)

## Features

### Mastodon instance switcher

Clicking the extension icon lets you open a currently viewed post on another instance. On the extension settings you can specify one or more instances you use and want to switch between.

![Screenshot of the main menu with a list of Mastodon instances allowing you to switch between them.](browser-extension/assets/screenshot-popup.png)


Each instance domain (omit the http or https protocol) goes on a separate line.

![Screenshot of the settings page with a text field for adding your Mastodon instances.](browser-extension/assets/screenshot-settings.png)


### Tag browser

When viewing a tag page on Mastodon, a link will be added to the plugin pop-up window that lets you browse the current tag across a larger portion of the fediverse using the [Fediverse Explorer](https://fediverse-explorer.stefanbohacek.dev/), another tool I've developed.

![Screenshot of the settings page with a text field for adding your Mastodon instances.](browser-extension/assets/tag-browser.png)

### Profile hovercards (Experimental)

This feature is on [Mastodon's roadmap](https://joinmastodon.org/roadmap), under "Exploring" as "On-hover information cards for users", but you don't have to wait! On by default, but can be easily disabled in the extension's settings.

![A screenshot of two posts with the hovercard visible as an overlay.](browser-extension/assets/hovercard.png)

Note that this feature is under active development and you will need to enable it in the settings.

## Known issues

- Hovercards doen't work for accounts with handles `account@example.com` if Mastodon itself is running at `subdomain.example.com`.
- Hovercards don't work for accounts on some non-Mastodon servers.
- Hovercards for accounts mentioned in profile bio are not positioned correctly.
## TODO

- ~~When data is not available, show profile picture from the post and a note explaining the lack of data.~~