import React from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Cube({angles, ...props }) {
  const mesh = useRef();
  // rotate the box
  useFrame((state, delta) => {
    mesh.current.rotation.x = -angles.pitch*3.1415/180 + 3.1415/2;
    mesh.current.rotation.y = -angles.roll*3.1415/180;
    mesh.current.rotation.z = -angles.yaw*3.1415/180;
  });
  // draw the box
  return (
    <mesh {...props} ref={mesh}>
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial attach="material-0" color="#00FF00" />
      <meshBasicMaterial attach="material-1" color="#FF0000" />
      <meshBasicMaterial attach="material-2" color="#0000FF" />
      <meshBasicMaterial attach="material-3" color="#FFFF00" />
      <meshBasicMaterial attach="material-4" color="#FF00FF" />
      <meshBasicMaterial attach="material-5" color="#00FFFF" />
    </mesh>
  );
}