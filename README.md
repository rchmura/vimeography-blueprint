# Vimeography Blueprint

A collection of common Vue components + modules to use within Vimeography 2 themes.

## Layout Template
Vimeography uses several different conventions to keep themes consistent and easier to debug:

* All themes use Vue single-file components for templating.
* Any images unique to a theme should be placed inside `assets/images`
* Any javascript plugins unique to a theme should be placed inside `assets/scripts`
* All themes must use Vimeo's responsive parameter to provide support for responsive videos.
* We recommend themes use [http://idangero.us/swiper/](Swiper 4) for any slideshow presentations.
* We recommend themes use [https://github.com/euvl/vue-js-modal](vue-js-modal) for any galleries using a modal window.
* Themes must be encapsulated in a class containing the theme name, which defines a unique namespace for the gallery.

## Available Video Data

All of the possible values to use can be found at [this playground example](https://developer.vimeo.com/api/playground/videos/44555634)

These are some of the more common parameters:

| Parameter     | Description   |
| ------------- | ------------- |
| `name`        | Name of the video |
| `link`        | Video ID  |
| `description` | The description of the video |

## Example DOM Structure

- #vimeography-gallery-{{gallery_id}}.vimeography-[your-theme-name]
  - .vimeography-main
    - .vimeography-player
    - .vimeography-info

  - .vimeography-thumbnails
    - .vimeography-thumbnail-container
      - .vimeography-thumbnail

  - .vimeography-template
