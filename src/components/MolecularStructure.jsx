import React, { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere } from "@react-three/drei"

function Atom({ position, color }) {
  return (
    <Sphere position={position} args={[0.5, 32, 32]}>
      <meshStandardMaterial color={color} />
    </Sphere>
  )
}

function Molecule() {
  const groupRef = useRef()

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={groupRef}>
      <Atom position={[0, 0, 0]} color="red" />
      <Atom position={[1, 1, 0]} color="blue" />
      <Atom position={[-1, -1, 0]} color="green" />
    </group>
  )
}

export default function MolecularStructure() {
  return (
    <div className="h-64 w-full">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Molecule />
      </Canvas>
    </div>
  )
}

