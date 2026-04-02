import { useEffect, useState } from 'react';
import { Save, Copy, Check } from 'lucide-react';
import { supabase, type EmailTemplate } from './lib/supabase';
import { EmailEditor } from './components/EmailEditor';
import { EmailPreview } from './components/EmailPreview';
import { SkeletonLoader } from './components/SkeletonLoader';
import { generateEmailHTML } from './utils/generateEmailHTML';

function App() {
  const [template, setTemplate] = useState<EmailTemplate | null>(null);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadTemplate();
  }, []);

  const loadTemplate = async () => {
    const { data } = await supabase
      .from('email_templates')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (data) {
      setTemplate(data);
    } else {
      const { data: newTemplate } = await supabase
        .from('email_templates')
        .insert({
          logo_url: '',
          email_text: 'Добрый день!\n\nМы рады предложить вам наши услуги.',
          manager_name: 'Иван Иванов',
          manager_phone: '+7 (999) 123-45-67',
          manager_email: 'manager@company.com',
          site_links: [],
          presentation_url: '',
          presentation_button_text: 'Скачать презентацию',
        })
        .select()
        .single();

      if (newTemplate) {
        setTemplate(newTemplate);
      }
    }
  };

  const handleUpdate = (updates: Partial<EmailTemplate>) => {
    if (template) {
      setTemplate({ ...template, ...updates });
    }
  };

  const handleSave = async () => {
    if (!template) return;

    setSaving(true);
    await supabase
      .from('email_templates')
      .update({
        logo_url: template.logo_url,
        email_text: template.email_text,
        manager_name: template.manager_name,
        manager_phone: template.manager_phone,
        manager_email: template.manager_email,
        site_links: template.site_links,
        presentation_url: template.presentation_url,
        presentation_button_text: template.presentation_button_text,
        updated_at: new Date().toISOString(),
      })
      .eq('id', template.id);

    setSaving(false);
  };

  const copyHTMLCode = () => {
    if (!template) return;

    const html = generateEmailHTML(template);
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Email шаблон для рассылки</h1>
          <p className="text-gray-600">Создайте красивое письмо для отправки через Bitrix24</p>
        </div>

        {template && (
          <div className="flex gap-4 mb-6">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Сохранение...' : 'Сохранить'}
            </button>

            <button
              onClick={copyHTMLCode}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-sm"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied ? 'Скопировано!' : 'Копировать HTML для Bitrix24'}
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            {!template ? (
              <SkeletonLoader />
            ) : (
              <EmailEditor template={template} onUpdate={handleUpdate} />
            )}
          </div>

          <div className="lg:sticky lg:top-8 h-fit">
            <EmailPreview template={template} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
