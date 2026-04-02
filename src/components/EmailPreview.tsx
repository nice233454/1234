import type { EmailTemplate } from '../lib/supabase';

interface EmailPreviewProps {
  template: EmailTemplate | null;
}

export function EmailPreview({ template }: EmailPreviewProps) {
  if (!template) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3">
        <h3 className="text-white font-semibold">Превью письма</h3>
      </div>
      <div className="p-4 bg-gray-50">
        <div
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          }}
        >
          <table
            cellPadding="0"
            cellSpacing="0"
            style={{ width: '100%', borderCollapse: 'collapse' }}
          >
            {template.logo_url && (
              <tr>
                <td style={{ padding: '40px 20px 20px', textAlign: 'center' }}>
                  <img
                    src={template.logo_url}
                    alt="Logo"
                    style={{ maxWidth: '200px', height: 'auto', display: 'inline-block' }}
                  />
                </td>
              </tr>
            )}

            <tr>
              <td style={{ padding: '20px 30px', color: '#333333', fontSize: '16px', lineHeight: '1.6' }}>
                <div style={{ whiteSpace: 'pre-wrap' }}>{template.email_text}</div>
              </td>
            </tr>

            {template.site_links.length > 0 && (
              <tr>
                <td style={{ padding: '20px 30px' }}>
                  {template.site_links.map((link, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                      <a
                        href={link.url}
                        style={{
                          color: '#2563eb',
                          textDecoration: 'none',
                          fontSize: '15px',
                          fontWeight: '500',
                        }}
                      >
                        → {link.title}
                      </a>
                    </div>
                  ))}
                </td>
              </tr>
            )}

            {template.presentation_url && (
              <tr>
                <td style={{ padding: '30px', textAlign: 'center' }}>
                  <a
                    href={template.presentation_url}
                    style={{
                      display: 'inline-block',
                      backgroundColor: '#2563eb',
                      color: '#ffffff',
                      padding: '14px 32px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontSize: '16px',
                      fontWeight: '600',
                    }}
                  >
                    {template.presentation_button_text}
                  </a>
                </td>
              </tr>
            )}

            <tr>
              <td
                style={{
                  padding: '30px',
                  borderTop: '1px solid #e5e7eb',
                  backgroundColor: '#f9fafb',
                }}
              >
                <div style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6' }}>
                  <div style={{ fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    {template.manager_name}
                  </div>
                  <div>
                    <a
                      href={`tel:${template.manager_phone}`}
                      style={{ color: '#2563eb', textDecoration: 'none' }}
                    >
                      {template.manager_phone}
                    </a>
                  </div>
                  <div>
                    <a
                      href={`mailto:${template.manager_email}`}
                      style={{ color: '#2563eb', textDecoration: 'none' }}
                    >
                      {template.manager_email}
                    </a>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}
