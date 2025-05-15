import nodemailer from 'nodemailer';
import {
  MAILTRAP_HOST,
  MAILTRAP_PORT,
  MAILTRAP_USER,
  MAILTRAP_PASS,
} from './config.js';

const transporter = nodemailer.createTransport({
  host: MAILTRAP_HOST,
  port: MAILTRAP_PORT,
  secure: false,
  auth: {
    user: MAILTRAP_USER,
    pass: MAILTRAP_PASS,
  },
});

export function createEmailTemplate(items) {
  // Generate the list of articles dynamically
  const articles = items.map(item => `
    <tr>
      <td style="padding: 16px 0 0 0; border-bottom:1px solid #eee;">
        <h3 style="margin:0 0 8px 0; color:#1976d2; font-size:18px; font-weight:bold;">
          ${item.title}
        </h3>
        <div style="color:#444; font-size:15px; line-height:1.7; margin-bottom:6px;">
          ${item.content ? item.content.slice(0, 120) + '...' : ''}
        </div>
        <a href="${item.link}" style="color:#1976d2; text-decoration:none; font-size:14px;">مطالعه بیشتر</a>
      </td>
    </tr>
  `).join('');

  return `
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>خبرنامه هفتگی</title>
  <style>
    body {
      background: #f5f5f5;
      margin: 0;
      padding: 0;
      font-family: Tahoma, 'Vazirmatn', 'IRANSans', Arial, sans-serif;
      direction: rtl;
    }
    .container {
      max-width: 600px;
      margin: 24px auto;
      background: #fff;
      border-radius: 14px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.07);
      padding: 0 20px 20px 20px;
    }
    .header {
      text-align: center;
      padding: 30px 0 10px 0;
    }
    .header h1 {
      margin: 0;
      color: #1976d2;
      font-size: 28px;
      font-weight: bold;
      letter-spacing: -1px;
    }
    .header p {
      color: #888;
      margin: 8px 0 0 0;
      font-size: 16px;
    }
    .footer {
      text-align: center;
      color: #aaa;
      font-size: 12px;
      margin-top: 32px;
      border-top: 1px solid #eee;
      padding-top: 16px;
    }
    @media (max-width: 650px) {
      .container { max-width: 98vw; padding: 0 4vw 4vw 4vw; }
      .header h1 { font-size: 22px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📬 خبرنامه هفتگی</h1>
      <p>جدیدترین مطالب از منابع منتخب فارسی</p>
    </div>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
      ${articles}
    </table>
    <div style="text-align:center; margin-top:30px;">
      <a href="https://yourwebsite.com"
         style="display:inline-block; background:#1976d2; color:#fff; padding:12px 32px; border-radius:6px; text-decoration:none; font-size:16px; font-weight:bold;">
        مشاهده وبسایت
      </a>
    </div>
    <div class="footer">
      اگر دیگر مایل به دریافت این ایمیل نیستید،
      <a href="https://yourwebsite.com/unsubscribe" style="color:#1976d2;">لغو اشتراک</a>
      کنید.<br>
      © 2025 خبرنامه شما
    </div>
  </div>
</body>
</html>
  `;
}


export async function sendNewsletter(recipients, htmlContent) {
  const results = [];
  
  for (const email of recipients) {
    try {
      const info = await transporter.sendMail({
        from: '"Newsletter Service" <newsletter@example.com>',
        to: email,
        subject: 'Your Daily News Digest',
        html: htmlContent
      });
      results.push({ email, status: 'success', messageId: info.messageId });
    } catch (error) {
      results.push({ email, status: 'failed', error: error.message });
    }
  }
  return results;
}