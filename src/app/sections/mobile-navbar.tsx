/*
 * Copyright 2025 Praveen Kumar
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { portfolioConfig } from "@/app/config";

interface MobileNavBarProps {
  menuOpen: boolean;
  activeSection: string;
  setMenuOpen: (menuOpen: boolean) => void;
}

const MobileNavBar: React.FC<MobileNavBarProps> = ({
  menuOpen,
  activeSection,
  setMenuOpen,
}) => {
  const { links } = portfolioConfig.navigation;

  const menuVariants = {
    closed: { opacity: 0, x: 300 },
    open: { opacity: 1, x: 0 },
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-40 lg:hidden"
        >
          {/* Backdrop with blur effect */}
          <motion.div
            className="absolute inset-0 bg-gray-900/95 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Menu content */}
          <div className="relative h-full flex flex-col items-center justify-center">
            {/* Dynamic glow effect */}
            <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />

            {/* Nav links */}
            <div className="flex flex-col items-center space-y-8 relative z-10">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={menuItemVariants}
                >
                  <a
                    href={`#${link.href}`}
                    onClick={handleLinkClick}
                    className={`text-3xl font-medium transition-all duration-300 hover:text-emerald-400 relative
                      ${
                        activeSection === link.href
                          ? "text-emerald-400 font-semibold"
                          : "text-gray-200"
                      }`}
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { MobileNavBar };
