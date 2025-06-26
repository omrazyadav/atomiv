"use client";

import { motion } from "motion/react";
import Image from "next/image";

const testimonials = [
  {
    text: "Atomiv's AI receptionist transformed our salon. We went from missing 30% of calls to capturing every appointment. Our booking increased by 40% in just two months.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    name: "Sarah Chen",
    role: "Salon Owner",
  },
  {
    text: "As a medical clinic, we needed something reliable. Atomiv handles patient inquiries perfectly and integrates seamlessly with our scheduling system.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    name: "Dr. Michael Rodriguez",
    role: "Clinic Director",
  },
  {
    text: "The setup was incredibly smooth. Within 3 days, our AI was handling calls naturally. Customers can't tell it's not human - the conversations are that good.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    name: "Emma Thompson",
    role: "Restaurant Manager",
  },
  {
    text: "We save 25+ hours per week on phone management. Atomiv handles everything - appointments, questions, even complex service inquiries.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    name: "Dr. James Wilson",
    role: "Dental Practice Owner",
  },
  {
    text: "The ROI is incredible. We've captured leads that would have been lost to voicemail, and our customer satisfaction scores have improved dramatically.",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face",
    name: "Lisa Martinez",
    role: "Spa Director",
  },
  {
    text: "Atomiv understands legal terminology and handles client intake calls professionally. It's reduced our admin overhead while improving client experience.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    name: "Attorney David Kim",
    role: "Law Firm Partner",
  },
  {
    text: "Our real estate business never sleeps, and now neither does our phone line. Atomiv captures leads 24/7 and schedules viewings automatically.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    name: "Rachel Green",
    role: "Real Estate Agent",
  },
  {
    text: "The natural conversation flow amazes me daily. Clients get answers to complex fitness questions, and class bookings have increased by 35%.",
    image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop&crop=face",
    name: "Mark Stevens",
    role: "Fitness Center Owner",
  },
  {
    text: "Emergency calls are handled with care and urgency. Atomiv knows when to schedule routine appointments vs. when to connect urgent cases immediately.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    name: "Dr. Jennifer Davis",
    role: "Veterinary Clinic Director",
  },
];

export function TestimonialsDemo() {
  return (
    <section className="bg-black py-16 md:py-24 relative">
      <div className="container z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border border-blue-500/30 bg-blue-500/10 py-2 px-4 rounded-lg backdrop-blur-sm">
              <span className="text-blue-300 font-medium text-sm">Testimonials</span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mt-6 text-center text-white">
            Trusted by <span className="text-blue-400">Local Businesses</span>
          </h2>
          <p className="text-center mt-5 text-gray-300 leading-relaxed">
            See how Atomiv AI is transforming customer service for businesses just like yours.
          </p>
        </motion.div>

        {/* Grid Layout for Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl border border-gray-800 bg-gray-900 shadow-lg"
            >
              <div className="text-gray-300 text-sm leading-relaxed mb-4">
                "{testimonial.text}"
              </div>
              <div className="flex items-center gap-3">
                <Image
                  width={40}
                  height={40}
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <div className="font-medium tracking-tight leading-5 text-white">
                    {testimonial.name}
                  </div>
                  <div className="leading-5 opacity-70 tracking-tight text-gray-400 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsDemo; 