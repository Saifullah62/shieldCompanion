# Shield Companion

## Dedication

This application is dedicated to Officer Amirah Daugherty of the Auburn, Maine Police Department as she begins her career in law enforcement. May this tool support you in your noble journey of protecting and serving your community. Your dedication to public service inspires us, and we hope Shield Companion will be a faithful companion throughout your career, helping you document your experiences, maintain your well-being, and grow as an officer.

Stay safe, stay strong, and know that your family is proud of your commitment to making a difference in the lives of others.

---

Shield Companion is a comprehensive digital companion for law enforcement officers, designed to help them track their daily experiences, manage resources, and maintain their well-being.

## Features

- **Digital Journal**: Track daily shifts, calls attended, and reflections
- **Resource Hub**: Access department resources, training materials, and wellness content
- **Memory Vault**: Store and organize important career memories and achievements
- **Insights Dashboard**: Gain valuable insights from journal entries and track patterns

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher

## Installation

### For Users
1. Download the latest Shield Companion installer from the releases page
2. Run the installer and follow the installation wizard
3. Choose your installation directory
4. Launch Shield Companion from your desktop or start menu

### For Developers

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
# Run in development mode with hot reload
npm run electron:dev

# Or build the application
npm run electron:build
```

### Building the Executable

To create a Windows executable:

1. Ensure all dependencies are installed:
```bash
npm install
```

2. Build the application:
```bash
npm run electron:build
```

The executable will be created in the `dist-electron` directory. The installer will:
- Create a desktop shortcut
- Add a start menu entry
- Allow choosing the installation directory
- Handle automatic updates (when configured)

### Development Scripts

- `npm run dev` - Start Vite development server
- `npm run electron:dev` - Start Electron in development mode
- `npm run electron:build` - Build the application for distribution
- `npm run electron:preview` - Preview the built application

## Desktop Application

Shield Companion is available as a standalone Windows desktop application, making it easily accessible for officers while maintaining data privacy and offline functionality.

### Windows Executable

The Shield Companion executable (`Shield Companion Setup 1.0.0.exe`) provides several key features:

#### Installation
- **Custom Installation Directory**: Choose where to install the application
- **Desktop Shortcut**: Quick access from your desktop
- **Start Menu Entry**: Available in Windows Start Menu under "Shield Companion"
- **Uninstaller**: Clean removal option through Windows Control Panel

#### Security Features
- **Local Data Storage**: All data is stored locally on your device
- **No Internet Requirement**: Works completely offline
- **Data Persistence**: Information persists between sessions
- **Windows Integration**: Runs natively as a Windows application

#### System Requirements
- Windows 10 or later
- 4GB RAM minimum
- 100MB free disk space
- 1280x720 minimum screen resolution

#### Running the Application
1. **First Time Setup**:
   - Double-click `Shield Companion Setup 1.0.0.exe`
   - Choose installation directory
   - Select additional options (desktop shortcut, start menu)
   - Click "Install"

2. **Launching**:
   - Use desktop shortcut
   - Or find in Start Menu under "Shield Companion"
   - Or use the executable in installation directory

3. **Updates**:
   - The application will notify you when updates are available
   - Updates can be installed automatically or manually

#### Troubleshooting
- **If the application won't start**: 
  - Ensure you have administrator privileges
  - Check Windows Event Viewer for errors
  - Try running as administrator

- **If data isn't saving**:
  - Verify write permissions in installation directory
  - Check available disk space
  - Ensure no antivirus is blocking file access

#### Uninstallation
1. Open Windows Control Panel
2. Go to "Programs and Features" or "Apps & Features"
3. Find "Shield Companion"
4. Click "Uninstall"
5. Follow uninstallation wizard

**Note**: Uninstalling will not automatically remove your data. To completely remove all data, manually delete the application data folder after uninstallation.

## Project Structure

```
shield-companion/
├── src/
│   ├── components/
│   │   ├── common/         # Shared components
│   │   ├── journal/        # Journal-related components
│   │   ├── insights/       # Analytics and insights
│   │   ├── resources/      # Resource management
│   │   └── vault/          # Memory vault components
│   ├── hooks/              # Custom React hooks
│   ├── services/           # Business logic and API services
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── public/                 # Static assets
└── tests/                  # Test files
```

## Key Components

### Journal System
- **JournalEntry**: Main component for creating and editing journal entries
- **ShiftDetails**: Manages shift timing and type information
- **CallsList**: Handles the list of calls attended during a shift
- **MoodSelector**: UI for selecting shift mood with emoji indicators

### Resource Management
- **ResourceHub**: Central component for accessing and managing resources
- **ResourceCard**: Displays individual resource items
- **ResourceFilter**: Filters resources by category and tags

### Memory Vault
- **MemoryVault**: Main component for storing and viewing memories
- **MemoryCard**: Displays individual memory items
- **MemoryUpload**: Handles memory creation and file uploads

## State Management

The application uses a combination of:
- React's built-in useState and useContext for component-level state
- Custom hooks for business logic
- Local storage for data persistence

## Error Handling

- **ErrorBoundary**: Catches and handles React component errors
- Comprehensive error reporting in development mode
- User-friendly error messages in production
- Retry mechanisms for recoverable errors

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
