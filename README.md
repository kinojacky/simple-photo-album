# Simple Photo Album

A responsive, feature-rich photo album web application built with HTML, CSS, and JavaScript.

## Features

- Responsive grid layout for photo thumbnails
- Lightbox for full-size image viewing
- Keyboard navigation in lightbox (arrow keys, ESC, 'D' for download)
- Pagination for large photo collections
- Support for various image aspect ratios
- Download functionality for individual photos
- Multi-language support (5 languages)

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5.1.3

## Languages Supported

This photo album supports 5 languages:

1. English (en)
2. Traditional Chinese (zh-tw)
3. Simplified Chinese (zh-cn)
4. Japanese (ja)
5. Iban (iba)

Special note: The inclusion of the Iban language, native to North Borneo (Sarawak, Malaysia), demonstrates our commitment to preserving and promoting lesser-known languages. Iban is an Austronesian language spoken by the Iban people and is an important part of the cultural heritage of Borneo.

## Getting Started

### Prerequisites

- A modern web browser
- A local web server (e.g., Python's `http.server` or Node.js' `http-server`)

### Installation

1. Clone the repository:

```
git clone https://github.com/kinojacky/simple-photo-album.git
```

2. Navigate to the project directory:

```
cd simple-photo-album
```

3. Start a local web server. For example, with Python:

```
python -m http.server 8000
```

4. Open your web browser and visit `http://localhost:8000`

## Usage

- Click on any thumbnail to open the lightbox view
- Use arrow keys to navigate between photos in the lightbox
- Press 'D' to download the current photo
- Press 'ESC' to close the lightbox
- Use the pagination controls at the bottom of the page to navigate through the photo collection
- Use the language dropdown to switch between supported languages

## Customization

To add your own photos, modify the `photoData.json` file in the project root directory. Each photo object should include:

- `thumbnail`: URL of the thumbnail image
- `original`: URL of the full-size image
- `filename` (optional): Name of the file (used for download and display in the lightbox)

Example of a photo object in `photoData.json`:

```json
{
  "thumbnail": "path/to/thumbnail.jpg",
  "original": "path/to/original.jpg",
  "filename": "Beautiful Sunset.jpg"
}
```

If you don't want to include a filename for a photo, you can either omit the filename field or leave it as an empty string:

```json
{
  "thumbnail": "path/to/thumbnail.jpg",
  "original": "path/to/original.jpg",
  "filename": ""
}
```

or

```json
{
  "thumbnail": "path/to/thumbnail.jpg",
  "original": "path/to/original.jpg"
}
```

## Configuration

The photo album includes a configurable download option. To enable or disable downloads:

1. Open the `script.js` file.
2. Locate the `enableDownload` variable at the top of the file.
3. Set it to `true` to enable downloads, or `false` to disable them:

```javascript
const enableDownload = true; // or false
```

When downloads are disabled:

- The download button will be hidden in the lightbox
- The 'D' key shortcut will not trigger a download
- The usage instructions on the top will not mention the download functionality

If you need to toggle this setting dynamically, you can use the `toggleDownloadFunctionality(enable)` function in your JavaScript code. For example:

- To enable downloads: `toggleDownloadFunctionality(true)`
- To disable downloads: `toggleDownloadFunctionality(false)`

You can run these commands in the browser's console to toggle the download functionality on the fly.

## License

This project is open source and available under the [MIT License](LICENSE).

### Photo Credits

All sample photos used in this project were sourced from [Unsplash](https://unsplash.com), a platform providing high-quality, freely-usable images. We extend our gratitude to the Unsplash community and the individual photographers who have made their work available for use.

Please note that while the code of this project is under the MIT License, the photos are subject to the [Unsplash License](https://unsplash.com/license). This license allows for free use of the photos for commercial and non-commercial purposes, but does not allow for selling unaltered copies of the photos or using them to compete with Unsplash.

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check [issues page](https://github.com/kinojacky/simple-photo-album/issues) if you want to contribute.

## Author

Jacky Kiu - [Kinojacky](https://github.com/kinojacky)