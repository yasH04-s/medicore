require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { FAQ, Module, Feature, Testimonial, Partner, User, Hospital, PatientRecord } = require('./models');

const faqsData = [
  { q: 'How long does implementation take?', a: 'Typically 4-8 weeks depending on facility size and complexity. Our dedicated onboarding team works closely with your staff to ensure a smooth transition with minimal disruption to daily operations.' },
  { q: 'Is Medicore Vault HIPAA compliant?', a: 'Yes, Medicore Vault is fully HIPAA compliant with enterprise-grade encryption, regular security audits, and comprehensive access controls. We maintain SOC 2 Type II certification and undergo annual third-party security assessments.' },
  { q: 'Can I integrate with existing systems?', a: 'Absolutely! We offer robust API integrations with major EHR systems, billing platforms, lab systems, and pharmacy management tools. Our integration team can build custom connectors for proprietary systems as well.' },
  { q: 'What kind of support do you provide?', a: '24/7 support is available for Professional and Enterprise plans via phone, email, and live chat. Starter plans include email support during business hours. All plans have access to our comprehensive knowledge base and video tutorials.' },
  { q: 'Is training included?', a: 'Yes! Comprehensive training is included during implementation at no additional cost. We provide role-based training sessions, video tutorials, and documentation. Ongoing training webinars are available monthly for all users.' },
  { q: 'What happens to my data if I cancel?', a: 'You retain full ownership of your data at all times. Upon cancellation, you have 90 days to export all your data in standard formats. We can also assist with data migration to another platform if needed.' },
  { q: 'Do you offer a free trial?', a: 'We offer personalized demos and pilot programs tailored to your facility. Contact our sales team to schedule a live demo and discuss a pilot program that lets you experience Medicore Vault with your own workflows.' },
  { q: 'How secure is the cloud infrastructure?', a: 'Our platform runs on AWS/Azure with military-grade AES-256 encryption at rest and TLS 1.3 in transit. We guarantee 99.9% uptime SLA, with automatic failover, daily backups, and disaster recovery across multiple geographic regions.' }
];

const modulesData = [
  { name: 'Super Admin', desc: 'Complete system control with full access to all modules and configurations.', icon: 'Shield', bg: 'bg-navy' },
  { name: 'Hospital Admin', desc: 'Manage hospital operations, departments, and staff assignments efficiently.', icon: 'Building2', bg: 'bg-magenta' },
  { name: 'Doctor', desc: 'Patient consultations, prescriptions, and treatment planning tools.', icon: 'Stethoscope', bg: 'bg-navy' },
  { name: 'Nurse', desc: 'Patient care tracking, vitals monitoring, and shift management.', icon: 'Heart', bg: 'bg-magenta' },
  { name: 'Patient', desc: 'Appointment booking, medical history, and health record access.', icon: 'CircleUser', bg: 'bg-navy' },
  { name: 'Lab', desc: 'Test ordering, sample tracking, and automated report generation.', icon: 'TestTube', bg: 'bg-magenta' },
  { name: 'Pharmacy', desc: 'Medicine inventory, prescription fulfillment, and drug interaction alerts.', icon: 'Pill', bg: 'bg-navy' },
  { name: 'Inventory', desc: 'Stock management, purchase orders, and supply chain tracking.', icon: 'Package', bg: 'bg-magenta' },
  { name: 'Insurance', desc: 'Claims processing, policy verification, and coverage management.', icon: 'CreditCard', bg: 'bg-navy' },
  { name: 'HR', desc: 'Employee management, payroll processing, and attendance tracking.', icon: 'Users', bg: 'bg-magenta' },
  { name: 'Billing', desc: 'Invoice generation, payment processing, and financial reporting.', icon: 'CreditCard', bg: 'bg-navy' },
  { name: 'Ambulance', desc: 'Fleet tracking, dispatch management, and emergency response coordination.', icon: 'Ambulance', bg: 'bg-magenta' }
];

const featuresData = [
  { title: 'Role-Based Access', description: 'Granular permissions ensure every user sees only what they need, keeping data secure and workflows focused.', icon: 'Lock', bg: 'bg-navy/10', textColor: 'text-navy' },
  { title: 'Real-Time Operations', description: 'Live dashboards and instant notifications keep your team synchronized across all departments.', icon: 'Zap', bg: 'bg-magenta/10', textColor: 'text-magenta' },
  { title: 'Cloud-Based', description: 'Access your hospital data securely from anywhere with our reliable cloud infrastructure.', icon: 'Cloud', bg: 'bg-navy/10', textColor: 'text-navy' },
  { title: 'Secure Records', description: 'End-to-end encryption and compliance-ready storage protect sensitive patient information.', icon: 'Shield', bg: 'bg-magenta/10', textColor: 'text-magenta' },
  { title: 'Automated Workflows', description: 'Reduce manual tasks with intelligent automation for approvals, alerts, and routine processes.', icon: 'Workflow', bg: 'bg-navy/10', textColor: 'text-navy' },
  { title: 'Analytics Dashboard', description: 'Actionable insights and visual reports to drive data-informed decisions across your organization.', icon: 'ChartColumn', bg: 'bg-magenta/10', textColor: 'text-magenta' }
];

const testimonialsData = [
  { name: 'Dr. Sarah Johnson', role: 'Chief Medical Officer', hospital: 'Metro Health Institute', initials: 'SJ', quote: 'Medicore Vault has revolutionized how we manage patient care. The integrated system has reduced our administrative overhead by 40% and improved patient satisfaction scores significantly.' },
  { name: 'Michael Chen', role: 'Hospital Administrator', hospital: 'City General Hospital', initials: 'MC', quote: 'The analytics dashboard provides insights we never had before. Making data-driven decisions has become effortless, and our operational efficiency has never been better.' },
  { name: 'Dr. Emily Rodriguez', role: 'Department Head', hospital: "St. Mary's Medical Center", initials: 'ER', quote: 'Transitioning to Medicore Vault was seamless. The support team was exceptional, and the platform has streamlined workflows across all our departments. Highly recommended!' },
  { name: 'Robert Williams', role: 'IT Director', hospital: 'Regional Care Hospital', initials: 'RW', quote: "As an IT professional, I appreciate the robust security, scalability, and ease of integration. The cloud-based infrastructure ensures we're always up-to-date with minimal maintenance." }
];

const partnersData = [
  { name: 'City General Hospital', icon: 'Building2' },
  { name: "St. Mary's Medical Center", icon: 'Building2' },
  { name: 'Metro Health Institute', icon: 'Building2' },
  { name: 'Regional Care Hospital', icon: 'Building2' },
  { name: 'Advanced Medical Group', icon: 'Building2' },
  { name: 'Wellness Health System', icon: 'Building2' }
];

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
  console.log('Connected to MongoDB Atlas for seeding...');

  try {
    // Clear existing data (optional, but good for fresh seeding)
    await FAQ.deleteMany({});
    await Module.deleteMany({});
    await Feature.deleteMany({});
    await Testimonial.deleteMany({});
    await Partner.deleteMany({});
    await User.deleteMany({});
    await Hospital.deleteMany({});
    await PatientRecord.deleteMany({});
    console.log('Cleared old data...');

    // Insert new content data
    await FAQ.insertMany(faqsData);
    await Module.insertMany(modulesData);
    await Feature.insertMany(featuresData);
    await Testimonial.insertMany(testimonialsData);
    await Partner.insertMany(partnersData);
    console.log('Seeded static content...');

    // Seed Dummy Accounts
    const hospitalName = "Apollo Hospital";
    const hospital = await Hospital.create({ name: hospitalName });

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);

    const admin = await User.create({
      name: "Dr. Admin Smith",
      email: "admin@apollo.com",
      hospitalName,
      password,
      role: "Admin"
    });

    const doctor = await User.create({
      name: "Dr. Jane Doe",
      email: "doctor@apollo.com",
      hospitalName,
      password,
      role: "Doctor"
    });

    const patient = await User.create({
      name: "John Patient",
      email: "john@email.com",
      hospitalName,
      password,
      role: "Patient"
    });

    // Seed Patient Records
    await PatientRecord.create([
      {
        patientId: patient._id,
        doctorName: doctor.name,
        diagnosis: "Seasonal Flu",
        notes: "Prescribed rest and fluids for 3 days.",
        hospitalName
      },
      {
        patientId: patient._id,
        doctorName: doctor.name,
        diagnosis: "Routine Checkup",
        notes: "All vitals normal. Follow up next year.",
        hospitalName
      }
    ]);
    
    console.log('Successfully seeded database with Users and Records!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.connection.close();
  }
})
.catch(err => {
  console.error('Could not connect to MongoDB:', err.message);
  console.log('Please ensure your MONGO_URI in the .env file is correct.');
});
