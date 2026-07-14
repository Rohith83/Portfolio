import { useParams, Navigate } from 'react-router-dom';
import { getCaseStudyBySlug } from '../data/caseStudies';
import CaseStudyTemplate from '../components/CaseStudyTemplate';

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const data = getCaseStudyBySlug(slug);

  if (!data) return <Navigate to="/case-studies" replace />;

  return <CaseStudyTemplate data={data} />;
}
