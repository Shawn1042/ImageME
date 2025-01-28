# ImageMe - A Simple and Versatile Image-to-ASCII Art Converter


## A React application demonstrating how to transform images into ASCII art with color customization, file downloads, and upcoming resizing & quality enhancements!

ImageMe is a sample React project that takes an uploaded image, converts it into ASCII art, and provides options for customization such as color and future resizing capabilities. With a straightforward UI and minimal code overhead, ImageMe is ideal for learning how to use Canvas APIs in React for real-time image processing. Below, you'll find an overview of what this project offers and how it can be adapted or expanded.



### Features of ImageMe:
* 🟦 🖼 Easy Image Upload: Drag and drop or click to select images, which are quickly converted into ASCII art.

* 🎨 Color Picker: Allows you to apply custom text colors to the ASCII output.

* 📝 Download as Text or PNG: Save your ASCII art either as plain .txt or an image file.
* 🟨 Resizing Options (Coming Soon!): Choose among 100×100, 200×200, or 400×400 to scale your output.
* ⚙️ Better Quality Output (Coming Soon!): Enhanced density maps, improved contrast, and sharper ASCII edges are on the roadmap.
* 📡 Popup Notifications: Basic “Login” and “Signup” popups (placeholder for upcoming account features) plus error handling for invalid file uploads.


## Project Overview

This project demonstrates how to use React alongside the HTML5 Canvas API to convert images into ASCII art. It processes uploaded images pixel by pixel, maps each pixel’s luminance to a character, and allows for custom coloring and downloads. Future additions include resizing features (in progress) and improved picture quality for crisper ASCII results.

### Example Use Cases

#### Make a GET Request

The following example shows how to make a GET request using FetchHelper:

```javascript
// Inside your React component
function handleImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  // Basic validation
  if (!file.type.startsWith("image/")) {
    alert("Please upload a valid image file.");
    return;
  }

  // Convert the image into ASCII
  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      // Pass it to your generateAsciiArt function
      generateAsciiArt(img);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}


```

### Download as a .txt
```javascript
function downloadTxt(asciiArt) {
  if (!asciiArt) {
    alert("No ASCII art to download yet!");
    return;
  }
  const blob = new Blob([asciiArt], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "ascii-art.txt";
  link.click();
  URL.revokeObjectURL(url);
}

```

# Coming Soon

* Resizing Your ASCII Output
* better quality images
* better image capture


## Configuration

ImageMe can be tweaked to suit your needs. Below are some areas you might customize:

- **Density String: The default string is "@%#*+=-:. ". You can replace it with others to experiment with different shading.

- **Aspect Ratio: If you find characters too tall or wide, adjust the logic that increments y (y += 2, for example) or the font size in your <pre> or PNG rendering code.

- **Color: The React state for color is easily changed; you can integrate advanced color pickers, random color generation, etc.

### Custom Configuration Example

You can create your own instance of FetchHelper with customized cache settings like so:

```javascript
// Example: Custom ASCII density and smaller vertical skip
const customDensity = "█▓▒░ ";
for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x++) {
    // Map pixel luminance to customDensity
  }
}

```

## Browser Usage

```javascript
npm install
```

```javascript
npm run dev
```