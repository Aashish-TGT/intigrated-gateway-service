# Receipt Template Customization UI Service

## Overview
The Receipt Template Customization UI Service is a front-end web tool designed for POS companies to visually create, preview, and save customized receipt templates. Users can personalize their templates with branding, layout, and content preferences.

## Tech Stack
- **Frontend**: React / Next.js
- **Backend**: Node.js + MongoDB (linked with Template Management Service)
- **Optional**: TailwindCSS for UI, PDFKit/HTML2PDF for preview

## Key Features
- Upload POS logo (PNG, SVG)
- Choose primary/secondary colors
- Select fonts and text alignment
- Add legal notes, footer, offers
- Live preview with sample data
- Save, edit, duplicate templates
- Assign template to POS brand or outlet

## API Endpoints
- `POST /template-builder/upload-logo`: Upload a logo for the receipt template.
- `POST /template-builder/save`: Save the customized receipt template.
- `GET /template-builder/:templateId`: Fetch a specific receipt template by ID.
- `POST /template-builder/assign/:brandId`: Assign a saved template to a specific POS brand or outlet.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/your-repo/receipt-template-customization-ui.git
   ```
2. Navigate to the project directory:
   ```
   cd receipt-template-customization-ui
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application
To start the development server, run:
```
npm run dev
```
The application will be available at `http://localhost:3000`.

### Building for Production
To build the application for production, run:
```
npm run build
```
Then, start the production server with:
```
npm start
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.