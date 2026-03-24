import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ArrowUpRight, 
  MessageSquare, 
  Terminal, 
  Zap, 
  BarChart, 
  Layers, 
  Globe, 
  Clock, 
  Check,
  Menu,
  X
} from 'lucide-react';

const WHATSAPP_NUMBER = "2348119132994";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
const EMAIL_ADDRESS = "seventechsolu@gmail.com";

const triggerMailto = (emailHref: string) => {
  const email = emailHref.replace('mailto:', '');
  navigator.clipboard.writeText(email).catch(() => {});
  
  // Create a temporary link and click it to reliably trigger the email client
  const link = document.createElement('a');
  link.href = emailHref;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// --- Reusable Components ---

const Button = ({ children, variant = 'primary', className = '', href, onClick }: any) => {
  const [copied, setCopied] = useState(false);
  const baseStyle = "inline-flex items-center justify-center px-6 py-4 font-mono text-sm uppercase tracking-wider transition-all duration-200 border";
  const variants = {
    primary: "bg-[var(--color-accent)] text-black border-[var(--color-accent)] hover:bg-white hover:border-white hover:text-black",
    secondary: "bg-transparent text-white border-white/20 hover:bg-white hover:text-black",
    ghost: "bg-transparent text-white border-transparent hover:border-white/20"
  };

  const Component = href ? 'a' : 'button';
  const isExternalHttp = href && href.startsWith('http');
  const isMailto = href && href.startsWith('mailto:');
  
  const handleClick = (e: React.MouseEvent) => {
    if (isMailto) {
      e.preventDefault();
      triggerMailto(href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    if (onClick) onClick(e);
  };

  return (
    <Component 
      href={href} 
      onClick={handleClick}
      target={isExternalHttp ? "_blank" : undefined}
      rel={isExternalHttp ? "noopener noreferrer" : undefined}
      className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`}
    >
      {copied ? "Email Copied!" : children}
    </Component>
  );
};

const SectionHeader = ({ id, title, index }: { id: string, title: string, index: string }) => (
  <div id={id} className="grid-line-b py-8 px-6 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-4 bg-[var(--color-bg)] sticky top-[73px] z-30 scroll-mt-[73px]">
    <div className="flex items-start gap-4">
      <span className="font-mono text-[var(--color-accent)] text-lg leading-none">[{index}]</span>
      <h2 className="text-4xl md:text-6xl font-black leading-none tracking-tighter uppercase">{title}</h2>
    </div>
  </div>
);

// --- Sections ---

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg)] grid-line-b">
      <div className="flex items-center justify-between px-6 md:px-12 h-[73px]">
        <a href="#top" className="text-2xl font-black tracking-tighter uppercase flex items-center gap-2">
          <Terminal className="text-[var(--color-accent)]" size={24} />
          <span>Seventech<span className="text-[var(--color-accent)]">_</span></span>
        </a>

        <div className="hidden md:flex items-center h-full">
          <a href="#services" className="h-full flex items-center px-6 font-mono text-sm uppercase tracking-wider grid-line-l hover:bg-white/5 transition-colors">Services</a>
          <a href="#work" className="h-full flex items-center px-6 font-mono text-sm uppercase tracking-wider grid-line-l hover:bg-white/5 transition-colors">Work</a>
          <a href="#process" className="h-full flex items-center px-6 font-mono text-sm uppercase tracking-wider grid-line-l hover:bg-white/5 transition-colors">Process</a>
          <div className="h-full grid-line-l flex items-center pl-6">
            <Button href="#contact" className="!py-2 !px-6">Init Project</Button>
          </div>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[var(--color-surface)] grid-line-b overflow-hidden"
          >
            <div className="flex flex-col font-mono text-sm uppercase tracking-wider">
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="p-6 grid-line-b">Services</a>
              <a href="#work" onClick={() => setMobileMenuOpen(false)} className="p-6 grid-line-b">Work</a>
              <a href="#process" onClick={() => setMobileMenuOpen(false)} className="p-6 grid-line-b">Process</a>
              <div className="p-6">
                <Button href="#contact" onClick={() => setMobileMenuOpen(false)} className="w-full">Init Project</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="pt-[73px] min-h-screen flex flex-col">
      <div className="flex-1 grid md:grid-cols-12 bg-tech-grid">
        <div className="md:col-span-8 p-6 md:p-12 lg:p-20 flex flex-col justify-center grid-line-r">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-[var(--color-border)] bg-[var(--color-surface)] font-mono text-xs uppercase tracking-widest mb-12">
              <span className="w-2 h-2 bg-[var(--color-accent)] animate-pulse"></span>
              System Status: Ready
            </div>
            
            <h1 className="text-[12vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase mb-8">
              Build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">Assets</span> <br />
              That <span className="text-[var(--color-accent)]">Grow.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/60 font-mono max-w-2xl mb-12 leading-relaxed">
              We engineer fast, brutal, conversion-focused websites for serious businesses. Stop losing customers to bloated design.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="#contact" className="gap-3">
                Execute Project <ArrowRight size={18} />
              </Button>
              <Button href={WHATSAPP_LINK} variant="secondary" className="gap-3">
                <MessageSquare size={18} /> Ping WhatsApp
              </Button>
            </div>
          </motion.div>
        </div>
        
        <div className="md:col-span-4 flex flex-col">
          <div className="flex-1 p-6 md:p-12 flex flex-col justify-center grid-line-b relative overflow-hidden group">
            <div className="absolute inset-0 bg-[var(--color-accent)]/5 group-hover:bg-[var(--color-accent)]/10 transition-colors"></div>
            <div className="relative z-10">
              <div className="font-mono text-sm text-[var(--color-accent)] mb-2">Metric_01</div>
              <div className="text-6xl font-black tracking-tighter mb-2">&lt;2s</div>
              <div className="text-white/50 font-mono text-sm uppercase">Avg Load Time</div>
            </div>
          </div>
          <div className="flex-1 p-6 md:p-12 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors"></div>
            <div className="relative z-10">
              <div className="font-mono text-sm text-white/50 mb-2">Metric_02</div>
              <div className="text-6xl font-black tracking-tighter mb-2">+42%</div>
              <div className="text-white/50 font-mono text-sm uppercase">Conversion Lift</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="marquee-container font-mono text-sm uppercase tracking-widest font-bold">
        <div className="marquee-content">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-8 flex items-center gap-8">
              <span>Conversion-Focused Design</span>
              <span className="w-2 h-2 bg-[var(--color-bg)]"></span>
              <span>Fast Delivery</span>
              <span className="w-2 h-2 bg-[var(--color-bg)]"></span>
              <span>Clean UI/UX</span>
              <span className="w-2 h-2 bg-[var(--color-bg)]"></span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { id: "01", title: "Business Websites", desc: "High-converting architecture that establishes authority." },
    { id: "02", title: "E-commerce", desc: "Scalable transaction engines optimized for maximum AOV." },
    { id: "03", title: "Web Applications", desc: "Custom operational portals built to solve specific challenges." },
    { id: "04", title: "Optimization", desc: "Performance tuning and CRO for existing digital assets." }
  ];

  return (
    <section>
      <SectionHeader id="services" title="Capabilities" index="01" />
      <div className="grid md:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <div key={index} className="p-8 md:p-12 grid-line-r grid-line-b flex flex-col group hover:bg-[var(--color-surface)] transition-colors">
            <div className="font-mono text-3xl text-white/20 font-bold mb-12 group-hover:text-[var(--color-accent)] transition-colors">
              {service.id}
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">{service.title}</h3>
            <p className="text-white/50 font-mono text-sm leading-relaxed mt-auto">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const USP = () => {
  const usps = [
    { title: "Conversion First", desc: "Every pixel is engineered to turn visitors into revenue." },
    { title: "Rapid Deployment", desc: "We launch premium assets weeks faster than legacy agencies." },
    { title: "Scalable Stack", desc: "Built on robust tech that won't break when you grow." },
    { title: "Ongoing Support", desc: "Continuous maintenance to keep your systems operational." }
  ];

  return (
    <section className="grid md:grid-cols-2 grid-line-b">
      <div className="p-8 md:p-16 lg:p-24 grid-line-r bg-[var(--color-accent)] text-black flex flex-col justify-center">
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
          Why Premium <br/>Brands Choose <br/>Our Systems.
        </h2>
        <p className="font-mono text-black/70 max-w-md">
          We bridge the gap between brutalist aesthetics and measurable business results. No fluff, just performance.
        </p>
      </div>
      <div className="flex flex-col">
        {usps.map((usp, index) => (
          <div key={index} className="p-8 md:p-12 grid-line-b last:border-b-0 flex items-start gap-6 group hover:bg-white hover:text-black transition-colors">
            <div className="w-12 h-12 shrink-0 border border-current flex items-center justify-center font-mono font-bold">
              <Zap size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-2">{usp.title}</h3>
              <p className="font-mono text-sm opacity-60">{usp.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Portfolio = () => {
  const projects = [
    { title: "FinTech Dashboard", industry: "Finance", metric: "+120% Engagement" },
    { title: "Luxury Real Estate", industry: "Property", metric: "3x Lead Gen" },
    { title: "Modern E-commerce", industry: "Retail", metric: "-40% Bounce Rate" },
    { title: "SaaS Landing Page", industry: "Tech", metric: "2.5x Conversion" }
  ];

  return (
    <section>
      <SectionHeader id="work" title="Selected Output" index="02" />
      <div className="flex flex-col">
        {projects.map((project, index) => (
          <a key={index} href="#contact" className="data-row flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 grid-line-b group cursor-pointer">
            <div className="flex items-center gap-8 mb-4 md:mb-0">
              <span className="font-mono text-sm text-muted opacity-50 w-8">0{index + 1}</span>
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">{project.title}</h3>
            </div>
            <div className="flex items-center gap-8 md:gap-16 ml-16 md:ml-0">
              <div className="font-mono text-sm uppercase text-muted opacity-70">{project.industry}</div>
              <div className="font-mono text-sm uppercase bg-[var(--color-accent)] text-black px-3 py-1 font-bold hidden sm:block">
                {project.metric}
              </div>
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                <ArrowUpRight size={24} />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

const Pricing = () => {
  return (
    <section className="py-32 px-6 md:px-12 grid-line-b bg-tech-grid relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-accent)]/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="font-mono text-[var(--color-accent)] uppercase tracking-widest mb-8">System Architecture Pricing</div>
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
          Custom Scoped. <br/>
          Value Driven.
        </h2>
        <p className="font-mono text-white/50 max-w-2xl mx-auto mb-12">
          Every project requires unique architecture. We price based on your specific goals, required infrastructure, and desired outcomes.
        </p>
        <Button href="#contact" className="text-lg px-12 py-6">Request Quote</Button>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { num: "01", title: "Discovery", desc: "Deep dive into business logic and target parameters." },
    { num: "02", title: "Architecture", desc: "Wireframing and conversion-optimized UI/UX design." },
    { num: "03", title: "Development", desc: "Building the system with modern, scalable tech." },
    { num: "04", title: "Deployment", desc: "Rigorous testing and launch sequence initiation." }
  ];

  return (
    <section>
      <SectionHeader id="process" title="Execution Protocol" index="03" />
      <div className="grid md:grid-cols-4">
        {steps.map((step, index) => (
          <div key={index} className="p-8 md:p-12 grid-line-r grid-line-b relative group">
            <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-accent)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            <div className="font-mono text-xl font-bold mb-8 text-[var(--color-accent)]">PHASE_{step.num}</div>
            <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">{step.title}</h3>
            <p className="text-white/50 font-mono text-sm leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    { q: "Timeline for deployment?", a: "Standard builds: 2-4 weeks. Complex systems: 6-12 weeks." },
    { q: "Post-launch support?", a: "Yes. We offer dedicated maintenance retainers for continuous optimization." },
    { q: "System redesigns?", a: "We specialize in migrating legacy systems to modern, high-performance architectures." },
    { q: "Global operations?", a: "We deploy solutions for clients worldwide with async communication protocols." }
  ];

  return (
    <section className="grid md:grid-cols-12 grid-line-b">
      <div className="md:col-span-4 p-8 md:p-12 grid-line-r bg-[var(--color-surface)]">
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Query <br/>Database</h2>
        <p className="font-mono text-sm text-white/50">Frequently asked questions regarding our operational protocols.</p>
      </div>
      <div className="md:col-span-8 flex flex-col">
        {faqs.map((faq, index) => (
          <div key={index} className="p-8 md:p-12 grid-line-b last:border-b-0">
            <h3 className="text-xl font-bold uppercase tracking-tight mb-4 flex gap-4">
              <span className="text-[var(--color-accent)] font-mono">Q.</span> {faq.q}
            </h3>
            <p className="font-mono text-white/50 pl-8">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const FinalCTA = () => {
  return (
    <section id="contact" className="py-32 px-6 md:px-12 bg-[var(--color-accent)] text-black text-center scroll-mt-[73px]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-12">
          Initiate <br/>Sequence.
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button href={`mailto:${EMAIL_ADDRESS}`} className="bg-black text-white border-black hover:bg-transparent hover:text-black hover:border-black text-lg px-12 py-6">
            Email Protocol
          </Button>
          <Button href={WHATSAPP_LINK} className="bg-transparent text-black border-black hover:bg-black hover:text-white text-lg px-12 py-6">
            WhatsApp Link
          </Button>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const [copied, setCopied] = useState(false);
  
  return (
    <footer className="bg-[var(--color-bg)] pt-16 pb-8 px-6 md:px-12">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <a href="#top" className="text-2xl font-black tracking-tighter uppercase flex items-center gap-2 mb-6">
            <Terminal className="text-[var(--color-accent)]" size={24} />
            <span>Seventech<span className="text-[var(--color-accent)]">_</span></span>
          </a>
          <p className="font-mono text-sm text-white/50 max-w-sm mb-8">
            Engineering brutal, conversion-focused digital assets for serious enterprises.
          </p>
        </div>
        
        <div>
          <h4 className="font-mono text-sm uppercase tracking-widest text-white/30 mb-6">Index</h4>
          <ul className="space-y-4 font-mono text-sm uppercase">
            <li><a href="#services" className="hover:text-[var(--color-accent)] transition-colors">Services</a></li>
            <li><a href="#work" className="hover:text-[var(--color-accent)] transition-colors">Work</a></li>
            <li><a href="#process" className="hover:text-[var(--color-accent)] transition-colors">Process</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-mono text-sm uppercase tracking-widest text-white/30 mb-6">Comms</h4>
          <ul className="space-y-4 font-mono text-sm uppercase">
            <li>
              <a 
                href={`mailto:${EMAIL_ADDRESS}`} 
                onClick={(e) => {
                  e.preventDefault();
                  triggerMailto(`mailto:${EMAIL_ADDRESS}`);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="hover:text-[var(--color-accent)] transition-colors"
              >
                {copied ? "Email Copied!" : EMAIL_ADDRESS}
              </a>
            </li>
            <li><a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] transition-colors">+234 811 913 2994</a></li>
          </ul>
        </div>
      </div>
      
      <div className="pt-8 grid-line-t flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs uppercase text-white/30">
        <p>SYS.DATE: {new Date().getFullYear()} // SEVENTECH SOLUTIONS</p>
        <div className="flex gap-6">
          <span>All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
};

const StickyWhatsApp = () => {
  return (
    <a 
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-black flex items-center justify-center hover:scale-110 transition-transform duration-300 border-2 border-black"
      aria-label="Chat on WhatsApp"
    >
      <MessageSquare size={24} className="fill-current" />
    </a>
  );
};

export default function App() {
  return (
    <div id="top" className="min-h-screen selection:bg-[var(--color-accent)] selection:text-black flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <USP />
        <Portfolio />
        <Pricing />
        <Process />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyWhatsApp />
    </div>
  );
}
