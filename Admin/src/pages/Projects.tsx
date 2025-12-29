import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import api from '../lib/api';
import toast from 'react-hot-toast';

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/projects');
      setProjects(data.data);
    } catch (error) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await api.delete(`/projects/${id}`);
      toast.success('Project deleted successfully');
      fetchProjects();
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-2">Manage your portfolio projects</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Plus size={20} />
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {project.image_url && (
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {project.category}
                </span>
                <span className={`px-3 py-1 text-xs rounded-full ${
                  project.status === 'completed' ? 'bg-green-100 text-green-800' :
                  project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {project.status}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                  <Edit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
