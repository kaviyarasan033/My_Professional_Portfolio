import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, BellRing, Loader2, Send, Github, Linkedin, Phone } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { firebaseService } from '../services/firebase';

const Contact: React.FC = () => {
  const contactSectionRef = useRef<HTMLDivElement>(null);
  const { success, error, loading, dismiss } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotifCta, setShowNotifCta] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize Firebase
    firebaseService.init();

    // Show notification CTA only if permission not yet decided
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
      setShowNotifCta(true);
    }

    if (contactSectionRef.current) {
        const header = contactSectionRef.current.querySelectorAll('.contact-header');
        const items = contactSectionRef.current.querySelectorAll('.contact-item');

        gsap.fromTo(
          [...Array.from(header), ...Array.from(items)],
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contactSectionRef.current,
              start: 'top 80%',
            }
          }
        );
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const isInvalid = (field: string) => {
    if (!touched[field]) return false;
    if (field === 'email') {
        return !formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    }
    return !formData[field as keyof typeof formData];
  };

  const enableNotifications = async () => {
    const token = await firebaseService.requestPermissionAndGetToken();
    setShowNotifCta(false);
    if (token) {
      success('🔔 Notifications enabled! You\'ll get updates when I reply.');
      await firebaseService.sendTokenToBackend(token);
    } else {
      error('Could not enable notifications. Please allow in browser settings.');
    }
  };

  const playNotificationSound = () => {
    try {
      const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      const playTone = (freq: number, start: number, duration: number, gainVal: number) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
        gainNode.gain.setValueAtTime(0, ctx.currentTime + start);
        gainNode.gain.linearRampToValueAtTime(gainVal, ctx.currentTime + start + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + duration);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + duration);
      };

      playTone(523.25, 0.0, 0.3, 0.3);   // C5
      playTone(659.25, 0.15, 0.3, 0.3);  // E5
      playTone(783.99, 0.30, 0.5, 0.3);  // G5
    } catch (e) {
      // Audio context not available — silently skip
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newTouched = { name: true, email: true, subject: true, message: true };
    setTouched(newTouched);
    
    const isValid = !isInvalid('name') && !isInvalid('email') && !isInvalid('subject') && !isInvalid('message');
    
    if (isValid) {
      setIsSubmitting(true);
      const loadingId = loading('Sending message...');

      try {
        const response = await fetch('https://portkaviapi.techtigers.in/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        setIsSubmitting(false);
        dismiss(loadingId);

        if (data.success) {
          success('✅ Message sent successfully!');
          playNotificationSound();

          const userName = formData.name || 'there';
          const subject = formData.subject || 'your inquiry';
          firebaseService.showBrandedNotification(
            '🎉 Thanks for reaching out, ' + userName + '!',
            `Your message about "${subject}" has been received. Kaviyarasan will get back to you shortly. Click to visit the portfolio.`
          );

          setFormData({ name: '', email: '', subject: '', message: '' });
          setTouched({});
        } else {
          error('Failed to send message.');
        }
      } catch (err) {
        setIsSubmitting(false);
        dismiss(loadingId);
        console.error('API Error:', err);
        error('Server error. Please try again.');
      }
    } else {
      error('Please fill in all required fields correctly.');
    }
  };

  return (
    <section id="section-contact" className="py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={contactSectionRef}>
        <div className="text-center mb-16 contact-header opacity-0">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary-green mx-auto rounded-full"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Interested in collaborating or have a project in mind? Let's discuss how we can build something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="contact-item opacity-0 space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-primary-green/10 flex items-center justify-center text-primary-green shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Email</h4>
                    <a href="mailto:mkaviyarasan003@gmail.com" className="text-lg font-medium text-slate-900 dark:text-white hover:text-primary-green transition-colors">mkaviyarasan003@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-primary-green/10 flex items-center justify-center text-primary-green shrink-0 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Location</h4>
                    <p className="text-lg font-medium text-slate-900 dark:text-white">Available Worldwide (Remote)</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">Connect with me</h4>
                <div className="flex gap-4">
                  <a href="https://github.com/kaviyarasan033" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-primary-green hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/kaviyarasan-m-172542299" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-[#0A66C2] hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="https://wa.me/8618924949" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-[#25D366] hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md">
                    <Phone className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Notification Permission CTA */}
            {showNotifCta && (
              <div className="bg-gradient-to-r from-primary-green/10 to-emerald-500/10 border border-primary-green/30 dark:border-primary-green/20 rounded-2xl p-6 flex items-center gap-4 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary-green/20 flex items-center justify-center text-primary-green shrink-0">
                  <BellRing className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">Stay connected!</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Enable notifications to get a confirmation when I receive your message.</p>
                </div>
                <button onClick={enableNotifications} className="px-4 py-2 rounded-lg bg-primary-green text-white text-xs font-semibold hover:bg-primary-green/90 transition-all shadow hover:shadow-md whitespace-nowrap">
                  Enable
                </button>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div className="contact-item opacity-0">
            <form onSubmit={onSubmit} className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send a Message</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('name')}
                    className={`w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border ${isInvalid('name') ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors text-slate-900 dark:text-white`} 
                    placeholder="John Doe"
                  />
                  {isInvalid('name') && <p className="text-red-500 text-xs mt-1">Name is required</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('email')}
                    className={`w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border ${isInvalid('email') ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors text-slate-900 dark:text-white`} 
                    placeholder="john@example.com"
                  />
                  {isInvalid('email') && <p className="text-red-500 text-xs mt-1">Valid email is required</p>}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    value={formData.subject}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('subject')}
                    className={`w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border ${isInvalid('subject') ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors text-slate-900 dark:text-white`} 
                    placeholder="Project Inquiry"
                  />
                  {isInvalid('subject') && <p className="text-red-500 text-xs mt-1">Subject is required</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    value={formData.message}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('message')}
                    rows={4} 
                    className={`w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border ${isInvalid('message') ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors text-slate-900 dark:text-white resize-none`} 
                    placeholder="Tell me about your project..."
                  ></textarea>
                  {isInvalid('message') && <p className="text-red-500 text-xs mt-1">Message is required</p>}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full py-4 rounded-lg bg-primary-green text-white font-medium hover:bg-primary-green/90 transition-all shadow-md shadow-primary-green/20 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
