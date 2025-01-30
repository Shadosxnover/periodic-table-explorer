import React, { useEffect, useRef } from "react"
import { $3Dmol } from '3dmol/build/3Dmol.js'

function Atom3DViewer({ element }) {
  const viewerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!element || !containerRef.current) return;

    if (typeof window.$3Dmol === 'undefined') {
      console.error('3DMol.js not loaded');
      return;
    }

    try {
      const config = {
        backgroundColor: 'white',
        id: `viewer-${element.atomicNumber}`,
        width: containerRef.current.clientWidth,
        height: 300,
      };

      const existingViewer = document.getElementById(config.id);
      if (existingViewer) {
        existingViewer.remove();
      }

      const viewer = window.$3Dmol.createViewer(
        containerRef.current,
        config
      );
      
      viewerRef.current = viewer;

      viewer.addSphere({
        center: {x: 0, y: 0, z: 0},
        radius: 1.5,
        color: 'red',
        opacity: 0.8
      });

      const shells = element.electronConfiguration.split(" ")
        .map(shell => Number.parseInt(shell.match(/\d+$/)[0]));
      
      shells.forEach((electrons, shellIndex) => {
        const radius = (shellIndex + 1) * 2.5;
        
        viewer.addSphere({
          center: {x: 0, y: 0, z: 0},
          radius: radius,
          color: 'gray',
          opacity: 0.2,
          wireframe: true
        });

        for (let i = 0; i < electrons; i++) {
          const angle = (2 * Math.PI * i) / electrons;
          viewer.addSphere({
            center: {
              x: radius * Math.cos(angle),
              y: radius * Math.sin(angle),
              z: radius * Math.cos(angle * 2) * 0.5
            },
            radius: 0.3,
            color: 'blue',
            opacity: 0.8
          });
        }
      });

      viewer.zoomTo();
      viewer.render();
    } catch (error) {
      console.error('Error initializing 3DMol viewer:', error);
    }

    return () => {
      if (viewerRef.current) {
        try {
          viewerRef.current.clear();
          const canvas = containerRef.current.querySelector('canvas');
          if (canvas) {
            canvas.remove();
          }
        } catch (error) {
          console.error('Error cleaning up viewer:', error);
        }
      }
    };
  }, [element]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[300px] bg-white rounded-lg shadow-inner relative"
      style={{ 
        border: '1px solid #e5e7eb',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div id={`viewer-${element?.atomicNumber}`} 
           style={{ 
             width: '100%', 
             height: '100%',
             position: 'absolute',
             top: 0,
             left: 0
           }} 
      />
    </div>
  );
}

function ElectronShellDiagram({ electronConfiguration }) {
  const shells = electronConfiguration.split(" ").map((shell) => Number.parseInt(shell.match(/\d+$/)[0]))
  const maxShells = shells.length
  const baseSize = Math.min(40, 300 / (maxShells * 2)) // Adjust shell size based on number of shells

  return (
    <div className="flex justify-center items-center mt-4 relative w-full h-[200px] overflow-hidden">
      {shells.map((electrons, shellIndex) => {
        const size = (shellIndex + 1) * baseSize
        return (
          <div key={shellIndex} className="absolute flex items-center justify-center">
            {/* Shell circle */}
            <div
              className="border-2 border-gray-400 rounded-full absolute"
              style={{
                width: `${size * 2}px`,
                height: `${size * 2}px`,
              }}
            />
            
            {/* Electrons */}
            {Array.from({ length: electrons }).map((_, electronIndex) => {
              const angle = (2 * Math.PI * electronIndex) / electrons
              const radius = size
              const x = radius * Math.cos(angle)
              const y = radius * Math.sin(angle)
              
              return (
                <div
                  key={electronIndex}
                  className="absolute w-2 h-2 bg-blue-500 rounded-full"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default function ElementDetails({ element }) {
  if (!element) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow dark:shadow-gray-700">
        <p className="text-gray-500 dark:text-gray-400">Select an element to view details</p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow dark:shadow-gray-700 dark:text-white transition-colors duration-200 max-w-full overflow-x-hidden">
      <h2 className="text-2xl font-bold mb-4">{element.name}</h2>
      <p>
        <strong>Symbol:</strong> {element.symbol}
      </p>
      <p>
        <strong>Atomic Number:</strong> {element.atomicNumber}
      </p>
      <p>
        <strong>Atomic Mass:</strong> {element.mass}
      </p>
      <p>
        <strong>Category:</strong> {element.category}
      </p>
      <p>
        <strong>State at Room Temperature:</strong> {element.state}
      </p>
      <p>
        <strong>Electron Configuration:</strong> {element.electronConfiguration}
      </p>
      <div className="mt-4 w-full overflow-hidden">
        <h3 className="text-lg font-semibold mb-2">Electron Shell Diagram</h3>
        <div className="relative h-[200px] max-w-full">
          <ElectronShellDiagram electronConfiguration={element.electronConfiguration} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">3D Atomic Structure</h3>
        <Atom3DViewer element={element} />
      </div>
    </div>
  )
}

