"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

export function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    // Générer des particules aléatoires
    const generateParticles = () => {
      const newParticles: Particle[] = []
      const particleCount = 15

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 100 + 50, // Entre 50 et 150px
          duration: Math.random() * 20 + 15, // Entre 15 et 35 secondes
          delay: Math.random() * 5, // Délai entre 0 et 5 secondes
        })
      }
      setParticles(newParticles)
    }

    generateParticles()
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient de fond animé */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#10B981]/5 via-transparent to-[#059669]/5"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(16,185,129,0.08), transparent 50%)",
            "radial-gradient(circle at 80% 70%, rgba(5,150,105,0.08), transparent 50%)",
            "radial-gradient(circle at 50% 50%, rgba(16,185,129,0.08), transparent 50%)",
            "radial-gradient(circle at 20% 30%, rgba(16,185,129,0.08), transparent 50%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Boules animées */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-[#10B981]/20 to-[#059669]/10 blur-xl"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            x: [
              Math.random() * 200 - 100,
              Math.random() * 200 - 100,
              Math.random() * 200 - 100,
            ],
            y: [
              Math.random() * 200 - 100,
              Math.random() * 200 - 100,
              Math.random() * 200 - 100,
            ],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.3, 0.6, 0.4, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Grille animée en arrière-plan */}
      <motion.div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(16,185,129,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,185,129,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "50px 50px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Lignes de connexion animées */}
      {particles.slice(0, 5).map((particle, index) => (
        <motion.svg
          key={`line-${particle.id}`}
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 0 }}
        >
          <motion.line
            x1={`${particle.x}%`}
            y1={`${particle.y}%`}
            x2={`${(particle.x + Math.random() * 30) % 100}%`}
            y2={`${(particle.y + Math.random() * 30) % 100}%`}
            stroke="rgba(16,185,129,0.1)"
            strokeWidth="1"
            animate={{
              opacity: [0.1, 0.3, 0.1],
              pathLength: [0, 1, 0],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5,
            }}
          />
        </motion.svg>
      ))}
    </div>
  )
}

