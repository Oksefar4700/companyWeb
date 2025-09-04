"use client";

import React, { useRef, forwardRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Users,
  Heart,
  Lightbulb,
  Code,
  Globe,
  Zap,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import AnimatedHeading from "./AnimatedHeading";

// Animation constants
const SMOOTH_EASE = [0.25, 0.1, 0.25, 1];

// StoryItem
const StoryItem = forwardRef(function StoryItem(
  { icon: Icon, title, text, index, cardInView, isRight },
  ref
) {
  return (
    <motion.div
      ref={ref}
      className={`flex items-start gap-8 ${
        isRight ? "lg:flex-row-reverse" : ""
      } max-w-4xl mx-auto`}
      initial={{ opacity: 0, x: isRight ? 60 : -60 }}
      animate={cardInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.215, 0.61, 0.355, 1],
        type: "spring",
        stiffness: 100,
        damping: 25,
      }}
      style={{
        willChange: "transform, opacity",
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
      }}
    >
      {/* Icon */}
      <div className="w-24 h-24 bg-gradient-to-br from-[var(--color-brand-blue)] to-[var(--color-brand-blue-darker)] rounded-3xl flex items-center justify-center shadow-xl flex-shrink-0">
        <Icon className="w-12 h-12 text-white" />
      </div>

      {/* Content */}
      <div className={`flex-1 ${isRight ? "lg:text-right" : ""}`}>
        <h3 className="text-3xl font-bold text-[var(--color-foreground)] font-[var(--font-heading)] mb-4 leading-tight">
          {title}
        </h3>
        <p className="text-xl text-[var(--color-foreground)]/70 font-[var(--font-body)] leading-relaxed">
          {text}
        </p>
      </div>
    </motion.div>
  );
});

// TeamCard
const TeamCard = forwardRef(function TeamCard(
  { name, role, image, index, cardInView },
  ref
) {
  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={cardInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.215, 0.61, 0.355, 1],
        type: "spring",
        stiffness: 120,
        damping: 25,
      }}
      style={{
        willChange: "transform, opacity",
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
      }}
    >
      <div className="relative w-36 h-36 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="144px"
        />
      </div>
      <h3 className="text-xl font-bold text-[var(--color-foreground)] font-[var(--font-heading)] mb-2">
        {name}
      </h3>
      <p className="text-[var(--color-brand-blue)] font-[var(--font-body)] font-medium">
        {role}
      </p>
    </motion.div>
  );
});

// MissionItem
const MissionItem = forwardRef(function MissionItem(
  { icon: Icon, title, text, index, cardInView, bulletPoints },
  ref
) {
  return (
    <motion.div
      ref={ref}
      className="max-w-sm mx-auto h-full flex flex-col"
      initial={{ opacity: 0, y: 40 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.215, 0.61, 0.355, 1],
        type: "spring",
        stiffness: 100,
        damping: 25,
      }}
      style={{
        willChange: "transform, opacity",
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
      }}
    >
      {/* Icon med lyseblå gradient */}
      <div
        className="
          w-20 h-20
          bg-gradient-to-br
          from-[var(--color-brand-blue-lighter-bg)]
          to-[var(--color-brand-blue)]
          rounded-2xl
          flex items-center justify-center
          mx-auto mb-6 shadow-lg
        "
      >
        <Icon className="w-10 h-10 text-[var(--color-brand-blue)]" />
      </div>

      {/* Titel */}
      <h3 className="text-2xl font-bold text-[var(--color-foreground)] font-[var(--font-heading)] mb-4 leading-tight text-center">
        {title}
      </h3>

      {/* Hovedtekst */}
      <p className="text-base text-[var(--color-foreground)]/70 font-[var(--font-body)] leading-relaxed mb-6 flex-grow text-left">
        {text}
      </p>

      {/* Bullets */}
      <div className="space-y-3 text-left mt-auto">
        {bulletPoints.map((point, pointIndex) => (
          <div key={pointIndex} className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[var(--color-brand-blue)] flex-shrink-0" />
            <span className="text-sm text-[var(--color-foreground)] font-medium">
              {point}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
});

const AboutSection = () => {
  const t = useTranslations("about");

  // refs og InView hooks...
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const storyRef = useRef(null);
  const teamRef = useRef(null);
  const videoRef = useRef(null);
  const missionRef = useRef(null);

  const sectionInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const introInView = useInView(introRef, { once: true, margin: "-50px" });
  const storyInView = useInView(storyRef, { once: true, margin: "-100px" });
  const teamInView = useInView(teamRef, { once: true, margin: "-100px" });
  const videoInView = useInView(videoRef, { once: true, margin: "-100px" });
  const missionInView = useInView(missionRef, { once: true, margin: "-100px" });

  const storyPoints = [
    {
      icon: Users,
      title: t("story.meeting.title"),
      text: t("story.meeting.text"),
    },
    {
      icon: Heart,
      title: t("story.passion.title"),
      text: t("story.passion.text"),
    },
    {
      icon: Lightbulb,
      title: t("story.vision.title"),
      text: t("story.vision.text"),
    },
  ];

  const teamMembers = [
    {
      name: "Frederik Brosen",
      role: t("team.frederik.role"),
      image: "/images/team/Frederik_Broesen.jpg",
    },
    {
      name: "Oliver Larsen",
      role: t("team.oliver.role"),
      image: "/images/team/Oliver_Larsen.jpg",
    },
    {
      name: "Daniel Bonne",
      role: t("team.daniel.role"),
      image: "/images/team/Daniel_Bonne.png",
    },
  ];

  const missionPoints = [
    {
      icon: Code,
      title: t("mission.passion.title"),
      text: t("mission.passion.text"),
      bulletPoints: [
        t("mission.passion.bullets.frontend"),
        t("mission.passion.bullets.modern"),
        t("mission.passion.bullets.practices"),
      ],
    },
    {
      icon: Globe,
      title: t("mission.expertise.title"),
      text: t("mission.expertise.text"),
      bulletPoints: [
        t("mission.expertise.bullets.react"),
        t("mission.expertise.bullets.database"),
        t("mission.expertise.bullets.scalable"),
      ],
    },
    {
      icon: Zap,
      title: t("mission.innovation.title"),
      text: t("mission.innovation.text"),
      bulletPoints: [
        t("mission.innovation.bullets.cutting"),
        t("mission.innovation.bullets.custom"),
        t("mission.innovation.bullets.innovation"),
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-[var(--color-background)] to-[var(--color-secondary-light)] relative overflow-hidden"
    >
      {/* Baggrundscirkler */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-[var(--color-brand-blue)]/6 rounded-full" />
        <div className="absolute -bottom-24 -right-32 w-72 h-72 bg-[var(--color-secondary-light)]/80 rounded-full" />
        <div className="absolute top-1/2 -right-20 w-48 h-48 bg-[var(--color-brand-blue)]/4 rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Titel */}
        <div className="text-center mb-16">
          <AnimatedHeading
            title={t("title")}
            direction="right"
            className="text-4xl md:text-5xl text-[var(--color-foreground)]"
          />
        </div>

        {/* Intro */}
        <motion.div
          ref={introRef}
          className="max-w-5xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={introInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            ease: SMOOTH_EASE,
            delay: 0.2,
            type: "spring",
            stiffness: 100,
            damping: 25,
          }}
          style={{
            willChange: "transform, opacity",
            transform: "translate3d(0,0,0)",
            backfaceVisibility: "hidden",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Venstre */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[var(--color-brand-blue)] rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span className="bg-[var(--color-brand-blue)]/10 text-[var(--color-brand-blue)] px-4 py-2 rounded-full text-sm font-semibold">
                  {t("intro.badge")}
                </span>
              </div>

              <h2 className="text-4xl font-bold text-[var(--color-foreground)] font-[var(--font-heading)] mb-6 leading-tight">
                {t("intro.heading.part1")}{" "}
                <span className="text-[var(--color-brand-blue)]">
                  {t("intro.heading.part2")}
                </span>
              </h2>

              <p className="text-xl text-[var(--color-foreground)]/80 font-[var(--font-body)] leading-relaxed mb-6 text-left">
                {t("intro.description")}
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[var(--color-brand-blue)] rounded-full" />
                  <span className="text-lg text-[var(--color-foreground)]/80 font-[var(--font-body)]">
                    {t("intro.points.classmates")}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[var(--color-brand-blue)] rounded-full" />
                  <span className="text-lg text-[var(--color-foreground)]/80 font-[var(--font-body)]">
                    {t("intro.points.vision")}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[var(--color-brand-blue)] rounded-full" />
                  <span className="text-lg text-[var(--color-foreground)]/80 font-[var(--font-body)]">
                    {t("intro.points.built")}
                  </span>
                </div>
              </div>
            </div>

            {/* Højre */}
            <div className="space-y-6">
              <motion.div
                className="p-8 bg-gradient-to-br from-white/80 to-[var(--color-brand-blue)]/5 backdrop-blur-sm rounded-3xl border border-[var(--color-brand-blue)]/10 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={introInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="w-16 h-16 bg-[var(--color-brand-blue)] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-foreground)] font-[var(--font-heading)] mb-2">
                  {t("intro.cards.passion.title")}
                </h3>
                <p className="text-[var(--color-foreground)]/70 font-[var(--font-body)]">
                  {t("intro.cards.passion.text")}
                </p>
              </motion.div>

              <motion.div
                className="p-8 bg-gradient-to-br from-white/80 to-[var(--color-brand-blue)]/5 backdrop-blur-sm rounded-3xl border border-[var(--color-brand-blue)]/10 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={introInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="w-16 h-16 bg-[var(--color-brand-blue)] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-foreground)] font-[var(--font-heading)] mb-2">
                  {t("intro.cards.communication.title")}
                </h3>
                <p className="text-[var(--color-foreground)]/70 font-[var(--font-body)]">
                  {t("intro.cards.communication.text")}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Story */}
        <div className="mb-28">
          <div ref={storyRef} className="space-y-20">
            {storyPoints.map((point, i) => (
              <StoryItem
                key={i}
                {...point}
                index={i}
                cardInView={storyInView}
                isRight={i % 2 === 1}
              />
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <AnimatedHeading
              title={t("teamTitle")}
              direction="left"
              className="text-[var(--color-foreground)]"
            />
          </div>
          <div
            ref={teamRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto"
          >
            {teamMembers.map((member, i) => (
              <TeamCard key={i} {...member} index={i} cardInView={teamInView} />
            ))}
          </div>
        </div>

        {/* Video */}
        <div className="mb-24">
          <motion.div
            ref={videoRef}
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={videoInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.8,
              ease: [0.215, 0.61, 0.355, 1],
              type: "spring",
              stiffness: 100,
              damping: 25,
            }}
            style={{
              willChange: "transform, opacity",
              transform: "translate3d(0,0,0)",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <video
                className="w-full h-auto max-h-[500px] object-cover"
                controls
                preload="metadata"
              >
                <source src="/video/why_us_demo.mp4" type="video/mp4" />
                <div className="flex items-center justify-center h-64 bg-[var(--color-primary-darkest)] text-white">
                  <p>{t("video.notSupported")}</p>
                </div>
              </video>
            </div>
            <motion.p
              className="text-center text-lg text-[var(--color-foreground)]/70 mt-6 font-[var(--font-body)]"
              initial={{ opacity: 0 }}
              animate={videoInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {t("video.description")}
            </motion.p>
          </motion.div>
        </div>

        {/* Mission */}
        <div>
          <div className="text-center mb-16">
            <AnimatedHeading
              title={t("missionTitle")}
              direction="right"
              className="text-[var(--color-foreground)]"
            />
            <motion.p
              className="max-w-3xl mx-auto text-xl text-[var(--color-foreground)]/70 mt-8 font-[var(--font-body)] leading-relaxed text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={missionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: SMOOTH_EASE, delay: 0.2 }}
            >
              {t("missionIntro")}
            </motion.p>
          </div>
          <div
            ref={missionRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {missionPoints.map((point, i) => (
              <div key={i} className="h-full">
                <MissionItem {...point} index={i} cardInView={missionInView} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
