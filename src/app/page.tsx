import { App } from '../App';
import { businessStructuredData, faqStructuredData, jsonLd, profileStructuredData, websiteStructuredData } from '../seo';

export default function HomePage() {
  return (
    <>
      {[profileStructuredData, businessStructuredData, websiteStructuredData, faqStructuredData].map(data => (
        <script key={data['@type']} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />
      ))}
      <App />
    </>
  );
}
