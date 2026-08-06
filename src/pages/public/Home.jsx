// src/pages/public/Home.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 sm:px-12">
        <span className="text-xl font-bold text-blue-600">🐾 PawPulse</span>
        <div className="flex gap-3">
          <Link to="/login" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
            Log In
          </Link>
          <Link to="/register" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-20 text-center sm:px-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-4xl font-bold text-gray-900 sm:text-5xl"
        >
          Smart Veterinary Care, Anywhere, Anytime.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-4 max-w-xl text-lg text-gray-600"
        >
          Connect with licensed veterinarians, manage your pets' health records, and get expert
          advice — all from your phone or laptop.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex justify-center gap-4"
        >
          <Link
            to="/register"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-lg hover:bg-blue-700"
          >
            Book a Consultation
          </Link>
          <Link
            to="/doctors"
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-50"
          >
            Meet Our Doctors
          </Link>
        </motion.div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-6 py-16 sm:px-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            { icon: '🩺', title: 'Remote Consultations', desc: 'Video and chat with licensed vets, no clinic visit needed.' },
            { icon: '📋', title: 'Digital Health Records', desc: 'Every visit, prescription, and diagnosis, organized in one place.' },
            { icon: '⏰', title: 'Smart Reminders', desc: 'Never miss a vaccination or medication dose again.' },
          ].map((feature) => (
            <motion.div
              key={feature.title}
              whileHover={{ y: -4 }}
              className="rounded-2xl bg-white p-6 text-center shadow-md"
            >
              <div className="text-4xl">{feature.icon}</div>
              <h3 className="mt-3 font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA footer */}
      <section className="bg-blue-600 px-6 py-16 text-center sm:px-12">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Ready to give your pet the care they deserve?
        </h2>
        <Link
          to="/register"
          className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-medium text-blue-600 hover:bg-blue-50"
        >
          Create Your Free Account
        </Link>
      </section>
    </div>
  );
};

export default Home;