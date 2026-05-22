import { Navigate, Route, Routes } from 'react-router-dom';
import { projects } from './data/projects';
import { SiteLayout } from './layouts/SiteLayout';
import { AboutPage } from './pages/AboutPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/projects/interactive-portfolio-website"
          element={<ProjectDetailPage project={projects[0]} />}
        />
        <Route
          path="/projects/404-self-live2d-interactive-avatar"
          element={<ProjectDetailPage project={projects[1]} />}
        />
        <Route
          path="/projects/ai-assisted-ecommerce-brand-system"
          element={<ProjectDetailPage project={projects[2]} />}
        />
        <Route
          path="/projects/portrait-persona-system"
          element={<ProjectDetailPage project={projects[3]} />}
        />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
