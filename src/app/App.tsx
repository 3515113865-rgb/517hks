import { HashRouter, Routes, Route } from 'react-router-dom';
import VideoFeed from './pages/VideoFeed';
import CurrentMoment from './pages/CurrentMoment';
import DailyAssessment from './pages/DailyAssessment';
import Timeline from './pages/Timeline';

export default function App() {
  return (
    <div className="size-full">
      <HashRouter>
        <Routes>
          <Route path="/" element={<VideoFeed />} />
          <Route path="/current" element={<CurrentMoment />} />
          <Route path="/daily" element={<DailyAssessment />} />
          <Route path="/timeline" element={<Timeline />} />
        </Routes>
      </HashRouter>
    </div>
  );
}