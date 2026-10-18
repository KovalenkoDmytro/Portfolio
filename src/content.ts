export const profile = {
  name: 'Dmytro Kovalenko',
  email: 'dmytrokovalenko.new@gmail.com',
  github: 'https://github.com/KovalenkoDmytro',
  linkedin: 'https://linkedin.com/in/dmytrokovalenko-new',
  resume: './Dmytro-Kovalenko-Resume.pdf',
};

export const experience = [
  { company: 'GrowME Marketing', industry: 'Digital marketing agency', specialties: ['Custom CRM', 'Fintech applications', 'Production systems'], dates: '2024 — Present', role: 'Senior Full-Stack Developer', summary: 'Custom Laravel + React platform replacing HubSpot. API integrations, production infrastructure and engineering standards. Sole developer of an international money transfer application, independently owning ongoing development across backend, frontend, integrations and deployment. The product supports identity verification, recipient management, upfront exchange rates and fees, and transfer tracking.', result: '~$50k / year in SaaS licensing savings', location: 'Calgary, Canada' },
  { company: 'WeBeeline', industry: 'Software company', specialties: ['Hospitality SaaS', 'Multi-tenant architecture', 'API integrations'], dates: '2022 — Present', role: 'Senior Full-Stack Developer · Contractor', summary: 'Backend architecture for a multi-property hospitality SaaS. Multi-tenant data isolation, service integrations and developer mentoring.', result: '36-hotel European chain', location: 'Remote · After-hours' },
  { company: 'IdoSell', industry: 'Ecommerce software company', specialties: ['Ecommerce & ERP', 'Booking platforms', 'API optimisation'], dates: '2019 — 2022', role: 'Full-Stack Developer · Junior → Senior', summary: 'Developed PHP ERP and booking platforms at an ecommerce software company. Improved APIs, mentored developers and progressed from junior to senior through two promotions and sustained technical ownership.', result: 'Booking platform serving 1,000+ hotels', location: 'Szczecin, Poland' },
] as const;

export const estateRoles = {
  Buyer: { title: 'A clear path to your next home.', steps: ['Discover a property', 'Schedule a viewing', 'Make an offer', 'Track the closing'], detail: 'Map-based discovery, saved properties and a structured transaction workspace.' },
  Seller: { title: 'Every offer. One workspace.', steps: ['Publish a listing', 'Manage viewings', 'Review offers', 'Complete the sale'], detail: 'Listings, incoming offers, documents and transaction milestones in one place.' },
  Lawyer: { title: 'Keep every detail connected.', steps: ['Join a transaction', 'Review documents', 'Advise both parties', 'Support closing'], detail: 'Shared documentation and visibility into the transaction lifecycle.' },
} as const;
export type EstateRole = keyof typeof estateRoles;

export const arcCategories = {
  General: ['Profitability', 'Financial health', 'Growth', 'Valuation'],
  Banks: ['Bank-specific metrics', 'Sector-aware thresholds', 'Category scores', 'Overall analysis'],
} as const;
export type ArcCategory = keyof typeof arcCategories;
