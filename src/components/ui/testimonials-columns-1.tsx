"use client";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          y: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-8 rounded-2xl border border-gray-800 bg-gray-900 shadow-lg shadow-blue-500/10 max-w-xs w-full" key={i}>
                  <div className="text-gray-300 text-sm leading-relaxed">{text}</div>
                  <div className="flex items-center gap-3 mt-6">
                    <Image
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5 text-white">{name}</div>
                      <div className="leading-5 opacity-70 tracking-tight text-gray-400 text-sm">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

// Export testimonials data for external use
export const testimonials = [
  {
    text: "Atomiv's AI receptionist transformed our salon. We went from missing 30% of calls to capturing every appointment. Our booking increased by 40% in just two months.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    name: "Sarah Chen",
    role: "Salon Owner",
  },
  {
    text: "As a medical clinic, we needed something reliable. Atomiv handles patient inquiries perfectly and integrates seamlessly with our scheduling system. It's like having a 24/7 receptionist.",
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
    text: "We save 25+ hours per week on phone management. Atomiv handles everything - appointments, questions, even complex service inquiries. Our staff can focus on actual dental work.",
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
    text: "Our real estate business never sleeps, and now neither does our phone line. Atomiv captures leads 24/7 and schedules viewings even when we're with other clients.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    name: "Rachel Green",
    role: "Real Estate Agent",
  },
  {
    text: "The natural conversation flow amazes me daily. Clients get answers to complex fitness questions, and class bookings have increased by 35% since implementation.",
    image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop&crop=face",
    name: "Mark Stevens",
    role: "Fitness Center Owner",
  },
  {
    text: "Emergency calls are handled with care and urgency. Atomiv knows when to schedule routine appointments vs. when to connect urgent cases immediately. It's been a game-changer.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    name: "Dr. Jennifer Davis",
    role: "Veterinary Clinic Director",
  },
]; 