import type { EmailTemplate } from '../lib/supabase';

export function generateEmailHTML(template: EmailTemplate): string {
  return `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Email Newsletter</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        .logo-section {
            padding: 40px 20px 20px;
            text-align: center;
        }
        .logo-section img {
            max-width: 200px;
            height: auto;
            display: inline-block;
        }
        .content-section {
            padding: 20px 30px;
            color: #333333;
            font-size: 16px;
            line-height: 1.6;
        }
        .links-section {
            padding: 20px 30px;
        }
        .link-item {
            margin-bottom: 10px;
        }
        .link-item a {
            color: #2563eb;
            text-decoration: none;
            font-size: 15px;
            font-weight: 500;
        }
        .button-section {
            padding: 30px;
            text-align: center;
        }
        .download-button {
            display: inline-block;
            background-color: #2563eb;
            color: #ffffff;
            padding: 14px 32px;
            border-radius: 8px;
            text-decoration: none;
            font-size: 16px;
            font-weight: 600;
        }
        .footer-section {
            padding: 30px;
            border-top: 1px solid #e5e7eb;
            background-color: #f9fafb;
            font-size: 14px;
            color: #6b7280;
            line-height: 1.6;
        }
        .manager-name {
            font-weight: 600;
            color: #374151;
            margin-bottom: 8px;
        }
        .footer-section a {
            color: #2563eb;
            text-decoration: none;
        }

        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
            }
            .content-section {
                padding: 15px 20px !important;
                font-size: 15px !important;
            }
            .links-section {
                padding: 15px 20px !important;
            }
            .button-section {
                padding: 20px !important;
            }
            .download-button {
                padding: 12px 24px !important;
                font-size: 15px !important;
            }
            .footer-section {
                padding: 20px !important;
            }
            .logo-section {
                padding: 30px 20px 15px !important;
            }
            .logo-section img {
                max-width: 150px !important;
            }
        }
    </style>
</head>
<body>
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 20px 0;">
        <tr>
            <td align="center">
                <table class="email-container" cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff;">
                    ${template.logo_url ? `
                    <tr>
                        <td class="logo-section">
                            <img src="${template.logo_url}" alt="Logo" />
                        </td>
                    </tr>
                    ` : ''}

                    <tr>
                        <td class="content-section">
                            ${template.email_text.replace(/\n/g, '<br>')}
                        </td>
                    </tr>

                    ${template.site_links.length > 0 ? `
                    <tr>
                        <td class="links-section">
                            ${template.site_links.map(link => `
                            <div class="link-item">
                                <a href="${link.url}">→ ${link.title}</a>
                            </div>
                            `).join('')}
                        </td>
                    </tr>
                    ` : ''}

                    ${template.presentation_url ? `
                    <tr>
                        <td class="button-section">
                            <a href="${template.presentation_url}" class="download-button">
                                ${template.presentation_button_text}
                            </a>
                        </td>
                    </tr>
                    ` : ''}

                    <tr>
                        <td class="footer-section">
                            <div class="manager-name">${template.manager_name}</div>
                            <div><a href="tel:${template.manager_phone}">${template.manager_phone}</a></div>
                            <div><a href="mailto:${template.manager_email}">${template.manager_email}</a></div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}
