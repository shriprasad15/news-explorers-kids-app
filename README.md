# News Explorers Kids News App

A React-based news application for kids built with Vite, TypeScript, and Tailwind CSS.

## 🚀 Live Demo

Once deployed, your app will be available at: `https://yourusername.github.io/news-explorers-kids-app/`

## 📋 Setup Instructions for GitHub Pages

Follow these steps to deploy your app to GitHub Pages:

### 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner and select "New repository"
3. Name your repository: `news-explorers-kids-app`
4. Make sure it's set to **Public** (required for free GitHub Pages)
5. **Do NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### 2. Connect Your Local Repository to GitHub

In your terminal, run these commands:

```bash
# Add the remote origin (replace 'yourusername' with your GitHub username)
git remote add origin https://github.com/yourusername/news-explorers-kids-app.git

# Push your code to GitHub
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "GitHub Actions"
5. The workflow will automatically run and deploy your site

### 4. Configure Repository Settings (Important!)

1. In your repository settings, go to "Actions" → "General"
2. Under "Workflow permissions", select "Read and write permissions"
3. Check "Allow GitHub Actions to create and approve pull requests"
4. Click "Save"

### 5. Update the Base URL (if needed)

If your GitHub username is different from the repository name, update the `base` URL in [`vite.config.ts`](vite.config.ts):

```typescript
base: '/your-repository-name/',
```

## 🛠️ Development

### Prerequisites

- Node.js 18 or higher
- npm

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build the app
npm run build

# Preview the build locally
npm run preview
```

### Manual Deployment

If you prefer to deploy manually using gh-pages:

```bash
# Deploy to GitHub Pages
npm run deploy
```

## 🎯 Features

- Modern React with TypeScript
- Tailwind CSS for styling
- Responsive design
- Component-based architecture
- Automatic deployment with GitHub Actions

## 📁 Project Structure

```
src/
├── components/          # React components
├── styles/             # Global styles
├── main.tsx           # App entry point
└── App.tsx            # Main app component

public/
├── images/            # Static images
└── index.html         # HTML template
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages (manual)

## 📝 GitHub Actions Workflow

The app uses GitHub Actions for automatic deployment. Every push to the `main` branch will:

1. Install dependencies
2. Build the application
3. Deploy to GitHub Pages automatically

## 🚨 Troubleshooting

### Deployment Issues

1. **Pages not loading**: Check if GitHub Pages is enabled and source is set to "GitHub Actions"
2. **404 errors**: Verify the `base` URL in [`vite.config.ts`](vite.config.ts) matches your repository name
3. **Build fails**: Check the Actions tab in your GitHub repository for error logs
4. **Permissions error**: Ensure "Read and write permissions" are enabled in repository settings

### Common Fixes

- Make sure your repository is public (required for free GitHub Pages)
- Verify all files are committed and pushed to GitHub
- Check that the workflow file is in `.github/workflows/deploy.yml`
- Ensure Node.js version in workflow matches your local development version

## 📄 License

This project is open source and available under the MIT License.