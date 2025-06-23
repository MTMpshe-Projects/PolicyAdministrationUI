# Policy Management System - Angular 20

This is a comprehensive policy management system built with Angular 20, featuring components for viewing policy details, transactions, claims, workflows, and status history.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or later recommended)
- npm (v9 or later) or yarn
- Angular CLI (v20 or later)

## Installation

### 1. Install Angular CLI globally

```bash
npm install -g @angular/cli@20
# or
yarn global add @angular/cli@20
```

### 2. Clone the repository

```bash
git clone https://github.com/your-repo/policy-management-system.git
cd policy-management-system
```

### 3. Install dependencies

```bash
npm install
# or
yarn install
```

## Configuration

### 1. Environment Setup

Create an environment file in `src/environments/`:

```bash
cp src/environments/environment.example.ts src/environments/environment.ts
```

Edit the file with your specific configuration:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api', // Your API endpoint
  // Add other environment-specific settings
};
```

### 2. JSON Data Files

Place your JSON data files in the `src/assets/data/` directory. The application expects the following files:

- `contract_detail_view.json`
- `components.json`
- `time_line.json`
- `claims.json`
- `status_history.json`
- `roles.json`
- `workflows.json`
- `transactions.json`
- `movement_values.json`

## Development Server

Run the development server:

```bash
ng serve
```

The application will be available at `http://localhost:4200/`.

## Build for Production

To build the application for production:

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## Running Unit Tests

Run unit tests via Karma:

```bash
ng test
```

## Running End-to-End Tests

Run end-to-end tests via Cypress:

```bash
ng e2e
```

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── claims-movements/
│   │   ├── policy-components/
│   │   ├── policy-header/
│   │   ├── policy-summary/
│   │   ├── roles/
│   │   ├── status-history/
│   │   ├── timeline/
│   │   ├── transactions/
│   │   └── workflows/
│   ├── services/
│   │   └── policy.service.ts
│   ├── model/
│   │   └── policy.model.ts
│   └── app.component.*
├── assets/
│   └── data/  # JSON data files
├── environments/
└── styles/    # Global styles
```

## Angular 20 Features Used

This project utilizes several Angular 20 features:

- Standalone Components
- Signals for state management
- New control flow syntax (`@if`, `@for`)
- Deferrable views
- Built-in hydration for better SSR

## Additional Setup for New Developers

### 1. Setting Up Angular for the First Time

If you're new to Angular development, follow these steps:

1. Install Node.js from [nodejs.org](https://nodejs.org/)
2. Verify installation:

```bash
node -v
npm -v
```

3. Install Angular CLI:

```bash
npm install -g @angular/cli@20
```

4. Verify Angular CLI installation:

```bash
ng version
```

### 2. IDE Configuration

We recommend using Visual Studio Code with these extensions:

- Angular Language Service
- ESLint
- Prettier - Code formatter
- Material Icon Theme

### 3. Code Style

This project uses:

- ESLint for linting
- Prettier for code formatting
- Angular's built-in style guide conventions

Run linting:

```bash
ng lint
```

## Troubleshooting

### Common Issues

1. **JSON data not loading**:
   - Verify files are in `src/assets/data/`
   - Check filenames match exactly
   - Ensure CORS is properly configured if loading from external API

2. **Dependency issues**:
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again

3. **Angular CLI version mismatch**:
   - Ensure you're using Angular CLI v20
   - Run `ng update @angular/core @angular/cli` to update

## Deployment

### For Production

1. Build the application:

```bash
ng build --configuration production
```

2. Deploy the contents of the `dist/` folder to your web server.

### For Development

Use Angular's built-in development server:

```bash
ng serve
```

Access the application at `http://localhost:4200`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.