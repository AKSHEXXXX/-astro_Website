import React from 'react';
import { useTranslation } from 'react-i18next';
import { track } from '../posthog';

const CALENDLY_URL = 'https://calendly.com/shreeyushsaxena/15min-free';
const WHATSAPP_NUMBER = '91XXXXXXXXXX'; 

export function FreeConsultCTA() {
  const { i18n } = useTranslation();
  const isHindi = i18n.language.startsWith('hi');

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(201,161,74,0.08) 0%, rgba(83,74,183,0.08) 100%)',
      border: '1px solid rgba(201,161,74,0.35)',
      borderRadius: '16px',
      padding: '28px 24px',
      marginTop: '24px',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '24px', marginBottom: '10px' }}>☽</div>
      <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c9a14a', marginBottom: '8px' }}>
        {isHindi ? 'विशेष ऑफर' : 'Limited Time Offer'}
      </div>
      <h3 style={{ fontSize: '20px', fontWeight: 500, color: '#f5efe0', marginBottom: '8px', lineHeight: 1.3 }}>
        {isHindi
          ? 'पहली परामर्श — बिल्कुल मुफ्त'
          : 'Your First Consultation — Completely Free'}
      </h3>
      <p style={{ fontSize: '14px', color: 'rgba(245,239,224,0.6)', marginBottom: '20px', lineHeight: 1.6, maxWidth: '420px', margin: '0 auto 20px' }}>
        {isHindi
          ? 'आयुष के साथ 15 मिनट की व्यक्तिगत Zoom/WhatsApp कॉल। अपने चार्ट के बारे में कोई भी प्रश्न पूछें — कोई शुल्क नहीं, कोई दबाव नहीं।'
          : 'A personal 15-minute Zoom or WhatsApp call with Ayush. Ask anything about your chart — no charge, no pressure.'}
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noreferrer"
          onClick={() => track('free_consult_cta_clicked', { source: 'post_prediction', method: 'calendly' })}
          style={{
            background: '#c9a14a', color: '#1a1208',
            padding: '12px 24px', borderRadius: '10px',
            fontSize: '14px', fontWeight: 600, textDecoration: 'none',
            display: 'inline-block'
          }}
        >
          {isHindi ? '📅 अभी बुक करें — मुफ्त' : '📅 Book Free Call Now'}
        </a>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            isHindi
              ? 'नमस्ते आयुष जी, मैंने अभी अपनी निःशुल्क कुंडली देखी। क्या मैं 15 मिनट की मुफ्त परामर्श बुक कर सकता/सकती हूं?'
              : 'Hi Ayush, I just saw my free cosmic reading. Can I book the free 15-min consultation call?'
          )}`}
          target="_blank"
          rel="noreferrer"
          onClick={() => track('free_consult_cta_clicked', { source: 'post_prediction', method: 'whatsapp' })}
          style={{
            background: 'rgba(37,211,102,0.15)', color: '#25D366',
            border: '1px solid rgba(37,211,102,0.4)',
            padding: '12px 24px', borderRadius: '10px',
            fontSize: '14px', fontWeight: 500, textDecoration: 'none',
            display: 'inline-block'
          }}
        >
          {isHindi ? '💬 WhatsApp पर बात करें' : '💬 Chat on WhatsApp'}
        </a>
      </div>
      <p style={{ fontSize: '11px', color: 'rgba(245,239,224,0.3)', marginTop: '12px' }}>
        {isHindi
          ? '✓ कोई क्रेडिट कार्ड नहीं  ✓ तत्काल पुष्टि  ✓ 100% गोपनीय'
          : '✓ No credit card  ✓ Instant confirmation  ✓ 100% confidential'}
      </p>
    </div>
  );
}
