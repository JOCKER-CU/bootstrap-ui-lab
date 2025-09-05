# Image Gallery Feature

## Overview
This feature adds the ability to double-click on folders in the folder browser to view images in a dedicated gallery component.

## Features

### Folder Browser Integration
- Double-click any folder card to navigate to the image gallery
- Visual feedback with hover tooltip showing "Double-click to view images"
- Smooth transition animations

### Image Gallery Component
- **Grid and List Views**: Toggle between grid and list view modes
- **Search Functionality**: Search through images by name or description
- **Lightbox Modal**: Click any image to open in full-screen lightbox
- **Navigation**: Navigate between images in lightbox mode
- **Responsive Design**: Works on desktop and mobile devices
- **Mock Data**: Includes 8 sample HR-related images

### Mock Images Included (43 total images across 14 folders)

**Payroll Folder (3 images):**
- Salary Structure Chart.png
- Payroll Processing Flow.jpg
- Tax Forms Template.png

**HR Folder (5 images):**
- Employee Headshots - John Doe.jpg
- Team Meeting Photo.jpg
- Office Building Exterior.jpg
- Employee ID Badge Template.png
- HR Department Group Photo.jpg

**Stock Valuation Folder (3 images):**
- Inventory Valuation Chart.png
- Stock Analysis Dashboard.jpg
- Valuation Report Cover.png

**Inventory Folder (3 images):**
- Warehouse Layout Diagram.jpg
- Inventory Count Sheet.png
- Stock Level Monitoring.jpg

**Sales Folder (3 images):**
- Sales Performance Chart.png
- Sales Team Photo.jpg
- Customer Meeting Room.jpg

**Shared Folder (2 images):**
- Brand 1 Logo Variations.png
- Shared Resources Guide.jpg

**Brand 2 Folder (3 images):**
- Brand 2 Marketing Materials.png
- Brand 2 Campaign Images.jpg
- Brand 2 Product Shots.jpg

**Brand 1 Folder (3 images):**
- Brand 1 Logo Guidelines.png
- Brand 1 Product Catalog.jpg
- Brand 1 Social Media Assets.png

**Internal Folder (3 images):**
- Company Policy Handbook.png
- Internal Communication Template.jpg
- Employee Directory Photo.jpg

**Products Folder (3 images):**
- Product Line Overview.jpg
- Product Development Process.png
- Product Testing Results.jpg

**Spreadsheet Folder (3 images):**
- Financial Data Visualization.png
- Budget Planning Chart.jpg
- Data Analysis Dashboard.png

**Support Folder (3 images):**
- Customer Support Team.jpg
- Support Process Flow.png
- Help Desk Setup.jpg

**Marketing Folder (3 images):**
- Marketing Campaign Assets.jpg
- Social Media Graphics.png
- Marketing Analytics Dashboard.jpg

**Finance Folder (3 images):**
- Financial Reports Cover.png
- Budget Allocation Chart.jpg
- Finance Team Photo.jpg

## Usage

1. **Navigate to Folder Browser**: The main page shows folders and files
2. **Double-click a Folder**: Double-click on any folder card to open the image gallery
3. **View Images**: Browse images in grid or list view
4. **Search**: Use the search bar to filter images
5. **Lightbox**: Click any image to view in full-screen mode
6. **Navigate**: Use arrow keys or buttons to navigate between images in lightbox
7. **Back**: Click the back button to return to the folder browser

## Technical Implementation

### Components
- `ImageGalleryComponent`: Main gallery component with grid/list views and lightbox
- `FolderBrowserComponent`: Updated with double-click handlers

### Routing
- Route: `/image-gallery`
- Query parameters: `folderName` and `folderId`

### Dependencies
- Angular Router for navigation
- Bootstrap for styling
- Font Awesome icons (optional, fallback to Unicode)

## File Structure
```
src/app/
├── image-gallery/
│   ├── image-gallery.component.ts
│   ├── image-gallery.component.html
│   └── image-gallery.component.scss
├── folder-browser/
│   ├── folder-browser.component.ts (updated)
│   ├── folder-browser.component.html (updated)
│   └── folder-browser.component.scss (updated)
├── app-routing.module.ts (updated)
└── app.module.ts (updated)
```
