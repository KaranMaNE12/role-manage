import { useParams } from 'react-router-dom';

export default function Placeholder() {
  const { name } = useParams();

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-semibold">{decodeURIComponent(name)}</h1>
      <p className="text-gray-600 mt-2">This is a placeholder page for the permission.</p>
    </div>
  );
}