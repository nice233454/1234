import { useState } from 'react';
import { Upload, Plus, Trash2 } from 'lucide-react';
import type { EmailTemplate, SiteLink } from '../lib/supabase';

interface EmailEditorProps {
  template: EmailTemplate | null;
  onUpdate: (updates: Partial<EmailTemplate>) => void;
}

export function EmailEditor({ template, onUpdate }: EmailEditorProps) {
  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');

  if (!template) return null;

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({ logo_url: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const addSiteLink = () => {
    if (newLinkTitle && newLinkUrl) {
      const updatedLinks = [...template.site_links, { title: newLinkTitle, url: newLinkUrl }];
      onUpdate({ site_links: updatedLinks });
      setNewLinkTitle('');
      setNewLinkUrl('');
    }
  };

  const removeSiteLink = (index: number) => {
    const updatedLinks = template.site_links.filter((_, i) => i !== index);
    onUpdate({ site_links: updatedLinks });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Логотип</h2>
        <div className="space-y-3">
          {template.logo_url && (
            <div className="flex justify-center p-4 bg-gray-50 rounded-lg">
              <img src={template.logo_url} alt="Logo" className="max-h-24 object-contain" />
            </div>
          )}
          <label className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
            <Upload className="w-4 h-4" />
            Загрузить логотип
            <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
          </label>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Текст письма</h2>
        <textarea
          value={template.email_text}
          onChange={(e) => onUpdate({ email_text: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={6}
          placeholder="Введите текст письма..."
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Контактные данные менеджера</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Имя</label>
            <input
              type="text"
              value={template.manager_name}
              onChange={(e) => onUpdate({ manager_name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Иван Иванов"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
            <input
              type="text"
              value={template.manager_phone}
              onChange={(e) => onUpdate({ manager_phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+7 (999) 123-45-67"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={template.manager_email}
              onChange={(e) => onUpdate({ manager_email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="manager@company.com"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Ссылки на сайт</h2>
        <div className="space-y-4">
          {template.site_links.map((link: SiteLink, index: number) => (
            <div key={index} className="flex gap-2 items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="font-medium text-gray-800">{link.title}</div>
                <div className="text-sm text-gray-500">{link.url}</div>
              </div>
              <button
                onClick={() => removeSiteLink(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <div className="flex gap-2">
            <input
              type="text"
              value={newLinkTitle}
              onChange={(e) => setNewLinkTitle(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Название ссылки"
            />
            <input
              type="text"
              value={newLinkUrl}
              onChange={(e) => setNewLinkUrl(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://..."
            />
            <button
              onClick={addSiteLink}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Добавить
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Кнопка презентации</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Текст кнопки</label>
            <input
              type="text"
              value={template.presentation_button_text}
              onChange={(e) => onUpdate({ presentation_button_text: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Скачать презентацию"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ссылка на презентацию</label>
            <input
              type="text"
              value={template.presentation_url}
              onChange={(e) => onUpdate({ presentation_url: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
