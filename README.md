# TEDKOLLER.COM

Static web portfolio for cinematography, published at https://tedkoller.com.

## Local preview

Run from the repository root with Python 3:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. No package installation or build step is required.

## Files

- `index.html`: page structure and metadata.
- `js/portfolio-data.js`: portfolio entries and media URLs.
- `js/main.js`: gallery and page interactions.
- `css/styles.css`: page styling and font definitions.
- `css/footer.css`: footer styling, also used by lab.tedkoller.com.
- `favicon.svg`: adaptive favicon; `favicon.ico` provides a fallback.
- `CNAME`: custom domain configuration.

## Updating portfolio entries

Edit `js/portfolio-data.js` to add or update a project. Use a unique `id`, a descriptive `title`, a `thumbnail` URL, and an `images` array for additional media. Entries without a `category` default to `cinematography`. The gallery combines the thumbnail with the additional media and removes duplicate URLs.

After editing, preview the site and check the project thumbnail, title, category selection, and each image or video in its lightbox. Test narrow and wide browser windows before publishing. Remote media needs an internet connection during local preview.
