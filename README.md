# NPKnows Frontend

A React + Vite frontend for **NPKnows**, a capstone project focused on detecting nutrient deficiencies in bitter gourd leaves from images.

From the current codebase, this app lets users upload a leaf photo, sends it to a prediction API, maps the result to nutrient metadata (N, P, K, or Healthy), and shows fertilizer-oriented recommendations in a dashboard UI.

## What It Does

- Upload a bitter gourd leaf image for analysis
- Call a backend prediction endpoint using `multipart/form-data`
- Display classification output with confidence and nutrient context
- Show nutrient legend and tailored recommendation card
- Provide built-in error handling for common API responses (400, 422, 429, network)
- Include an About page with team profiles, links, and CV assets
- Support light/dark theme toggling with local persistence

## Tech Stack

- **React 19**
- **Vite 7**
- **Tailwind CSS 4** (with `@tailwindcss/vite`)
- **ESLint 9**

## Project Structure

```text
npknows-frontend/
  public/
    team/          # member profile images
    cv/            # linked CV PDFs
    gourd.png
  src/
    api/
      api.js       # prediction API client
    components/    # dashboard/about UI cards and layout pieces
    constants/
      nutrients.js # N/P/K/Healthy metadata and label mapping
    context/
      RouterContext.jsx
      ThemeContext.jsx
    data/
      team.json    # about-page member content
    pages/
      DashboardPage.jsx
      AboutPage.jsx
    App.jsx
    main.jsx
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a `.env` file in the project root:

```bash
VITE_API_URL=http://localhost:5000/predict
```

`VITE_API_URL` should point to your backend prediction route that accepts:

- method: `POST`
- body: `FormData` with key `image`

### 3) Run the development server

```bash
npm run dev
```

### 4) Build for production

```bash
npm run build
```

### 5) Preview production build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - start local Vite dev server
- `npm run build` - create production build
- `npm run preview` - preview built app locally
- `npm run lint` - run ESLint

## Typical User Flow

1. Open the dashboard.
2. Upload a clear image of a bitter gourd leaf.
3. Click analyze.
4. Review prediction output and nutrient type.
5. Read recommended actions in the recommendation panel.

## Notes

- The frontend currently uses an internal context-based page switch (`Dashboard` and `About`) rather than `react-router`.
- API behavior described here is based on the current `src/api/api.js` implementation.
- Backend/model details (for example exact model architecture and deployment topology) are not fully defined in this frontend repository.

## Team and Assets

- Team profile data: `src/data/team.json`
- Public profile images: `public/team`
- Public CV files: `public/cv`

## License

No license file is currently present in this repository. Add one if you plan to distribute or open-source the project.
