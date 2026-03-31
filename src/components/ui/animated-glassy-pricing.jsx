import React, { useRef, useEffect, useState } from 'react';
import { RippleButton } from "./multi-type-ripple-buttons";

// --- Internal Helper Components (Not exported) --- //

const CheckIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="3"
    strokeLinecap="round" strokeLinejoin="round"
    className={className}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const ShaderCanvas = () => {
  const canvasRef = useRef(null);
  const glProgramRef = useRef(null);
  const glBgColorLocationRef = useRef(null);
  const glRef = useRef(null);
  // Default light background for clear mode
  const [backgroundColor, setBackgroundColor] = useState([0.97, 0.98, 1.0]);

  useEffect(() => {
    const gl = glRef.current;
    const program = glProgramRef.current;
    const location = glBgColorLocationRef.current;
    if (gl && program && location) {
      gl.useProgram(program);
      gl.uniform3fv(location, new Float32Array(backgroundColor));
    }
  }, [backgroundColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) { console.error("WebGL not supported"); return; }
    glRef.current = gl;

    const vertexShaderSource = `attribute vec2 aPosition; void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }`;
    const fragmentShaderSource = `
      precision highp float;
      uniform float iTime;
      uniform vec2 iResolution;
      uniform vec3 uBackgroundColor;
      mat2 rotate2d(float angle){ float c=cos(angle),s=sin(angle); return mat2(c,-s,s,c); }
      float variation(vec2 v1,vec2 v2,float strength,float speed){ return sin(dot(normalize(v1),normalize(v2))*strength+iTime*speed)/100.0; }
      vec3 paintCircle(vec2 uv,vec2 center,float rad,float width){
        vec2 diff = center-uv;
        float len = length(diff);
        len += variation(diff,vec2(0.,1.),5.,2.);
        len -= variation(diff,vec2(1.,0.),5.,2.);
        float circle = smoothstep(rad-width,rad,len)-smoothstep(rad,rad+width,len);
        return vec3(circle);
      }
      void main(){
        vec2 uv = gl_FragCoord.xy/iResolution.xy;
        uv.x *= 1.5; uv.x -= 0.25;
        float mask = 0.0;
        float radius = .35;
        vec2 center = vec2(.5);
        mask += paintCircle(uv,center,radius,.035).r;
        mask += paintCircle(uv,center,radius-.018,.01).r;
        mask += paintCircle(uv,center,radius+.018,.005).r;
        vec2 v=rotate2d(iTime)*uv;
        vec3 foregroundColor=vec3(v.x,v.y,.7-v.y*v.x);
        vec3 color=mix(uBackgroundColor,foregroundColor,mask);
        color=mix(color,vec3(1.),paintCircle(uv,center,radius,.003).r);
        gl_FragColor=vec4(color,1.);
      }`;

    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Could not create shader");
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(shader) || "Shader compilation error");
      }
      return shader;
    };

    const program = gl.createProgram();
    if (!program) throw new Error("Could not create program");
    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    glProgramRef.current = program;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const aPosition = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const iTimeLoc = gl.getUniformLocation(program, 'iTime');
    const iResLoc = gl.getUniformLocation(program, 'iResolution');
    glBgColorLocationRef.current = gl.getUniformLocation(program, 'uBackgroundColor');
    gl.uniform3fv(glBgColorLocationRef.current, new Float32Array(backgroundColor));

    let animationFrameId;
    const render = (time) => {
      gl.uniform1f(iTimeLoc, time * 0.001);
      gl.uniform2f(iResLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    animationFrameId = requestAnimationFrame(render);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Static CSS background - WebGL disabled for performance (no scroll jank)
  return <div className="absolute top-0 left-0 w-full h-full z-0 bg-gradient-to-br from-white via-slate-50 to-cyan-50/30 pointer-events-none" />;
};


// --- EXPORTED Building Blocks --- //

export const PricingCard = ({
  planName, description, price, features, buttonText, isPopular = false, buttonVariant = 'primary', badgeText = ''
}) => {
  const cardClasses = `
    bg-white rounded-3xl flex-1 max-w-sm px-8 py-10 flex flex-col transition-all duration-300
    border text-slate-900 z-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)]
    ${isPopular ? 'scale-105 relative ring-2 ring-cyan-600/40 border-cyan-200 shadow-[0_12px_40px_rgb(8,145,178,0.12)]' : 'border-slate-100'}
  `;
  const buttonClasses = `
    mt-8 w-full py-3.5 rounded-xl font-bold text-[15px] transition-all duration-200 font-sans cursor-pointer
    ${buttonVariant === 'primary' 
      ? 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-md border-0' 
      : 'bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 hover:border-slate-400 shadow-sm'
    }
  `;

  return (
    <div className={cardClasses.trim()}>
      {isPopular && (
        <div className="absolute -top-4 right-6 px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full bg-cyan-600 text-white shadow-md">
          {badgeText || 'Popular'}
        </div>
      )}
      <div className="mb-4">
        <h2 className="text-4xl font-display font-bold text-slate-900 mb-2">{planName}</h2>
        <p className="text-sm text-slate-600 font-sans leading-relaxed min-h-[40px]">{description}</p>
      </div>
      <div className="my-6 py-6 border-y border-slate-100 flex items-baseline gap-2">
        <span className="text-5xl font-display font-extrabold text-slate-900">{price}</span>
      </div>
      <ul className="flex flex-col gap-4 text-sm text-slate-700 mb-6 font-sans flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckIcon className="text-cyan-600 w-5 h-5 flex-shrink-0 mt-0.5" /> 
            <span className="leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>
      <RippleButton variant={buttonVariant === 'primary' ? 'hover' : 'ghost'} className={buttonClasses.trim()}>{buttonText}</RippleButton>
    </div>
  );
};


// --- EXPORTED Customizable Page Component --- //

export const ModernPricingPage = ({
  title,
  subtitle,
  plans,
  showAnimatedBackground = true,
}) => {
  return (
    <div className="relative bg-slate-50 text-slate-900 min-h-screen w-full overflow-hidden pt-24 pb-24">
      {showAnimatedBackground && <ShaderCanvas />}
      
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-100/40 rounded-full blur-[120px] pointer-events-none"></div>
      
      <main className="relative z-10 w-full flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-800 to-slate-600 mb-6">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-sans">
            {subtitle}
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 md:gap-8 justify-center items-stretch w-full max-w-6xl">
          {plans.map((plan, idx) => <PricingCard key={idx} {...plan} />)}
        </div>
      </main>
    </div>
  );
};
