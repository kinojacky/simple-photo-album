# Simple Photo Album

A responsive, feature-rich photo album web application built with HTML, CSS, and JavaScript.

## Features

- Responsive grid layout for photo thumbnails
- Lightbox for full-size image viewing
- Keyboard navigation in lightbox (arrow keys, ESC, 'D' for download)
- Pagination for large photo collections
- Support for various image aspect ratios
- Download functionality for individual photos

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5.1.3

## Getting Started

### Prerequisites

- A modern web browser
- A local web server (e.g., Python's `http.server` or Node.js' `http-server`)

### Installation

1. Clone the repository:

```
git clone https://github.com/yourusername/simple-photo-album.git
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

## Customization

To add your own photos, modify the `photoData.json` file in the project root directory. Each photo object should include:

- `thumbnail`: URL of the thumbnail image
- `original`: URL of the full-size image
- `filename`: Name of the file (used for download)

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check [issues page](https://github.com/yourusername/simple-photo-album/issues) if you want to contribute.

## Author

Jacky Brown - [Kinojacky](https://github.com/kinojacky)