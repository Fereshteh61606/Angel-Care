# Angel Care QR Code System

A beautiful, user-friendly web application that allows people to create personal information profiles and generate QR codes for easy sharing and emergency access.

## Features

- **Bilingual Support**: Full Persian (فارسی) and English language support
- **Personal Information Management**: Store name, address, phone, medical info, and emergency notes
- **QR Code Generation**: Automatic QR code creation for each person's profile
- **Print & Download**: Print QR codes directly or download them as PNG files
- **Emergency Information**: Special highlighting for medical conditions and emergency notes
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Local Storage**: All data is stored locally in your browser

## How to Use the System

### For End Users:
1. **Add Information**: Click "Add New Person" and fill out the form with personal details
2. **Generate QR Code**: The system automatically creates a unique QR code for each person
3. **Share QR Code**: Print or download the QR code to share with others
4. **Scan to View**: Anyone can scan the QR code to instantly view the person's information

### For Administrators:
1. **View All People**: Click "View All People" to see everyone's information
2. **Print QR Codes**: Use the printer icon to print individual QR codes
3. **Download QR Codes**: Use the download icon to save QR codes as image files
4. **Manage Data**: Edit or delete person records as needed

## Deployment Options

### Option 1: Web Hosting (Recommended)
1. **Build the Application**:
   ```bash
   npm run build
   ```
2. **Deploy to Web Hosting**:
   - Upload the `dist` folder to any web hosting service
   - Popular options: Netlify, Vercel, GitHub Pages, or your own web server
   - The system will be accessible via web browser on any device

### Option 2: Local Desktop Application
While this is a web application, you can run it locally:

1. **Install Node.js** from https://nodejs.org
2. **Download the project files**
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Run locally**:
   ```bash
   npm run dev
   ```
5. **Access at**: http://localhost:5173

### Option 3: Convert to Desktop App (Advanced)
To create an .exe file, you can use Electron:

1. **Install Electron**:
   ```bash
   npm install electron electron-builder --save-dev
   ```
2. **Add Electron configuration** to package.json
3. **Build desktop application**:
   ```bash
   npm run electron:build
   ```

## System Requirements

- **Web Browser**: Chrome, Firefox, Safari, or Edge (modern versions)
- **Internet Connection**: Required for initial loading and QR code scanning
- **Local Storage**: Enabled in browser for data persistence

## Data Management

- **Storage**: All data is stored locally in your browser's localStorage
- **Backup**: Export data by copying from browser developer tools
- **Privacy**: No data is sent to external servers
- **Portability**: Data stays on the device where it was created

## Printing QR Codes

1. Go to "View All People" page
2. Click the printer icon next to any person
3. A print-ready page will open with:
   - Person's name
   - Large, scannable QR code
   - Instructions for scanning
4. Print on standard paper or sticker labels

## Emergency Use

The system is designed for emergency situations:
- **Medical Information**: Clearly highlighted in red
- **Emergency Notes**: Prominently displayed
- **Quick Access**: QR codes provide instant access to critical information
- **Offline Viewing**: Once loaded, information can be viewed without internet

## Technical Details

- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with pastel color scheme
- **QR Generation**: High-quality QR codes with error correction
- **Responsive**: Mobile-first design approach
- **Accessibility**: Screen reader friendly with proper ARIA labels

## Support

For technical issues or questions:
1. Check browser console for error messages
2. Ensure localStorage is enabled
3. Try clearing browser cache and reloading
4. Test with different browsers

## License

This project is open source and free to use for personal and commercial purposes.