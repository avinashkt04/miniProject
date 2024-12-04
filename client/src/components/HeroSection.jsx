import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "./index";
import { HoverBorderGradient } from "./index";
import { NavLink } from "react-router-dom";

export function HeroSection() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="flex flex-col gap-4 items-center justify-center px-4 text-white text-center"
      >
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome to MediBot
        </h1>
        <h2 className="mt-2 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Your Personal Health Assistant
        </h2>
        <p className="leading-7 [&:not(:first-child)]:my-2 max-w-2xl">
          MediBot is an advanced AI-powered medical diagnostic tool designed to
          help you understand your symptoms and provide accurate health
          suggestions. Simply enter your symptoms, and let MediBot guide you to
          the right course of action.
        </p>
        <NavLink to="/login">
        <HoverBorderGradient
          containerClassName="rounded-full"
          className="text-lg tems-center px-6 py-3 bg-[#020817c1]"
        >
          Get Started
        </HoverBorderGradient>
        </NavLink>
      </motion.div>
    </AuroraBackground>
  );
}
