# jQuery Modal

A lightweight and simple jQuery modal plugin.

## Features

- Easy to use
- Customizable width and height
- Data attribute configuration
- Modern ES6+ code
- Lightweight

## Requirements

- jQuery 3.0.0 or higher

## Usage

### HTML Structure

```html
<!-- Modal containers -->
<div class="modal-outer">
    <div data-modal-target="modal1" class="modal">Modal content here</div>
</div>

<!-- Trigger button -->
<button data-modal-trigger="modal1" data-modal-width="300" data-modal-height="300">
    Show Modal
</button>
```

### Include Files

```html
<link rel="stylesheet" href="jquery-modal.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="jquery-modal.js"></script>
```

### JavaScript API

```javascript
// Basic usage
$('button').modal(200, 100);

// Using data attributes
// Set data-modal-width and data-modal-height on the trigger button
```

## Configuration

### Data Attributes

- `data-modal-trigger`: Links the button to a specific modal (required on button)
- `data-modal-target`: Identifies the modal element (required on modal)
- `data-modal-width`: Sets the modal width in pixels
- `data-modal-height`: Sets the modal height in pixels

## Browser Support

Supports all modern browsers that support ES6 and flexbox:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
