import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import { FileText, Search } from 'lucide-react';
import { mockTemplates } from '../lib/mockData';

const Templates = () => {
  const navigate = useNavigate();
  const { loadTemplate } = useAppStore();
  const [templates, setTemplates] = useState(mockTemplates);
  const [search, setSearch] = useState('');

  const filteredTemplates = templates.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleUseTemplate = (template: typeof mockTemplates[0]) => {
    loadTemplate(template);
    navigate('/wizard');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Templates Library</h1>
          <p className="text-gray-600 mt-1">Pre-configured templates for quick machine setup</p>
        </div>
        <Button variant="outline">
          <FileText className="h-4 w-4 mr-2" />
          Create Custom Template
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <Badge protocol={template.protocol} className="mt-2">
                    {template.protocol.toUpperCase()}
                  </Badge>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{template.description}</p>

              <div className="flex flex-wrap gap-1">
                {template.tags.map((tag) => (
                  <Badge key={tag} variant="gray" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => handleUseTemplate(template)}
                  className="flex-1"
                >
                  Use Template
                </Button>
                <Button variant="outline">
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No templates found matching your search</p>
        </div>
      )}
    </div>
  );
};

export default Templates;
