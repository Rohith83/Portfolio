import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLinkedin, FiGithub, FiMapPin, FiCheck } from 'react-icons/fi';
import { personal } from '../data/content.js';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import { slideInLeft, slideInRight, viewportOnce } from '../hooks/motionVariants';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email';
    if (!form.message.trim()) next.message = 'Message is required';
    return next;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validate();
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length === 0) {
   try {
  await emailjs.send(
    'service_jmafogv',
    'template_66hfvwm',
    {
      name: form.name,
      email: form.email,
      message: form.message,
    },
    'xuIxKbSAIHCmNcCkA'
  );

  setSubmitted(true);
  setForm({ name: '', email: '', message: '' });

  setTimeout(() => {
    setSubmitted(false);
  }, 4000);

} catch (error) {
  console.error(error);
  alert('Failed to send message');
}
  }
};

  const contactItems = [
    { icon: <FiMail size={18} />, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
    { icon: <FiLinkedin size={18} />, label: 'LinkedIn', value: 'Connect with me', href: personal.linkedin },
    { icon: <FiGithub size={18} />, label: 'GitHub', value: 'View my code', href: personal.github },
    { icon: <FiMapPin size={18} />, label: 'Location', value: personal.location, href: null },
  ];

  return (
    <section id="contact" className="section-pad">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something great together."
          description="Open to Frontend Developer and UI/UX Designer opportunities. Whether it's a full-time role, internship, or collaboration, I'd love to connect and discuss how I can contribute."
        />

        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="space-y-4"
          >
            {contactItems.map((item) => {
              const Wrapper = item.href ? 'a' : 'div';
              return (
                <Wrapper
                  key={item.label}
                  href={item.href || undefined}
                  target={item.href?.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 glass rounded-2xl p-5 group hover:border-brand/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center text-brand shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-slate-custom dark:text-white/50">{item.label}</p>
                    <p className="text-sm font-medium text-ink dark:text-white group-hover:text-brand transition-colors">
                      {item.value}
                    </p>
                  </div>
                </Wrapper>
              );
            })}
          </motion.div>

          <motion.form
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            onSubmit={handleSubmit}
            noValidate
            className="glass rounded-2xl p-7 sm:p-8 space-y-5"
          >
            <div>
              <label htmlFor="name" className="text-sm font-medium text-ink dark:text-white mb-1.5 block">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl bg-white/70 dark:bg-white/5 border border-ink/10 dark:border-white/10 px-4 py-3 text-sm text-ink dark:text-white placeholder:text-slate-custom/60 focus:border-brand outline-none transition-colors"
              />
              {errors.name && <p className="text-xs text-red-500 mt-1.5">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-ink dark:text-white mb-1.5 block">
                Email
              </label>
              <input
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl bg-white/70 dark:bg-white/5 border border-ink/10 dark:border-white/10 px-4 py-3 text-sm text-ink dark:text-white placeholder:text-slate-custom/60 focus:border-brand outline-none transition-colors"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-medium text-ink dark:text-white mb-1.5 block">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="What are you looking to build?"
                className="w-full rounded-xl bg-white/70 dark:bg-white/5 border border-ink/10 dark:border-white/10 px-4 py-3 text-sm text-ink dark:text-white placeholder:text-slate-custom/60 focus:border-brand outline-none transition-colors resize-none"
              />
              {errors.message && <p className="text-xs text-red-500 mt-1.5">{errors.message}</p>}
            </div>

            <Button type="submit" variant="primary" className="w-full sm:w-auto">
              {submitted ? (
                <span className="flex items-center gap-2">
                  <FiCheck size={16} /> Message Sent
                </span>
              ) : (
                'Send Message'
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
