import React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function NeonInput({ className }: { className?: string }) {
  return (
    <div className={cn("neon-input-wrapper", className)}>
      <style dangerouslySetInnerHTML={{ __html: `
        .neon-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: scale(0.7); /* Scale down to fit in header */
          transform-origin: right center;
        }
        
        .neon-white,
        .neon-border,
        .neon-darkBorderBg,
        .neon-glow {
          max-height: 70px;
          max-width: 314px;
          height: 100%;
          width: 100%;
          position: absolute;
          overflow: hidden;
          z-index: -1;
          border-radius: 12px;
          filter: blur(3px);
        }
        
        .neon-input {
          background-color: #010201;
          border: none;
          width: 301px;
          height: 56px;
          border-radius: 10px;
          color: white;
          padding-inline: 59px;
          font-size: 18px;
        }
        
        .neon-input::placeholder {
          color: #c0b9c0;
        }

        .neon-input:focus {
          outline: none;
        }

        #neon-main:focus-within > #neon-input-mask {
          display: none;
        }

        #neon-input-mask {
          pointer-events: none;
          width: 100px;
          height: 20px;
          position: absolute;
          background: linear-gradient(90deg, transparent, black);
          top: 18px;
          left: 70px;
        }
        
        #neon-pink-mask {
          pointer-events: none;
          width: 30px;
          height: 20px;
          position: absolute;
          background: #cf30aa;
          top: 10px;
          left: 5px;
          filter: blur(20px);
          opacity: 0.8;
          transition: all 2s;
        }
        
        #neon-main:hover > #neon-pink-mask {
          opacity: 0;
        }

        .neon-white {
          max-height: 63px;
          max-width: 307px;
          border-radius: 10px;
          filter: blur(2px);
        }

        .neon-white::before {
          content: "";
          z-index: -2;
          text-align: center;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(83deg);
          position: absolute;
          width: 600px;
          height: 600px;
          background-repeat: no-repeat;
          background-position: 0 0;
          filter: brightness(1.4);
          background-image: conic-gradient(
            rgba(0, 0, 0, 0) 0%,
            #a099d8,
            rgba(0, 0, 0, 0) 8%,
            rgba(0, 0, 0, 0) 50%,
            #dfa2da,
            rgba(0, 0, 0, 0) 58%
          );
          transition: all 2s;
        }
        
        .neon-border {
          max-height: 59px;
          max-width: 303px;
          border-radius: 11px;
          filter: blur(0.5px);
        }
        
        .neon-border::before {
          content: "";
          z-index: -2;
          text-align: center;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(70deg);
          position: absolute;
          width: 600px;
          height: 600px;
          filter: brightness(1.3);
          background-repeat: no-repeat;
          background-position: 0 0;
          background-image: conic-gradient(
            #1c191c,
            #402fb5 5%,
            #1c191c 14%,
            #1c191c 50%,
            #cf30aa 60%,
            #1c191c 64%
          );
          transition: all 2s;
        }
        
        .neon-darkBorderBg {
          max-height: 65px;
          max-width: 312px;
        }
        
        .neon-darkBorderBg::before {
          content: "";
          z-index: -2;
          text-align: center;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(82deg);
          position: absolute;
          width: 600px;
          height: 600px;
          background-repeat: no-repeat;
          background-position: 0 0;
          background-image: conic-gradient(
            rgba(0, 0, 0, 0),
            #18116a,
            rgba(0, 0, 0, 0) 10%,
            rgba(0, 0, 0, 0) 50%,
            #6e1b60,
            rgba(0, 0, 0, 0) 60%
          );
          transition: all 2s;
        }
        
        .neon-input-wrapper:hover > .neon-darkBorderBg::before {
          transform: translate(-50%, -50%) rotate(-98deg);
        }
        .neon-input-wrapper:hover > .neon-glow::before {
          transform: translate(-50%, -50%) rotate(-120deg);
        }
        .neon-input-wrapper:hover > .neon-white::before {
          transform: translate(-50%, -50%) rotate(-97deg);
        }
        .neon-input-wrapper:hover > .neon-border::before {
          transform: translate(-50%, -50%) rotate(-110deg);
        }

        .neon-input-wrapper:focus-within > .neon-darkBorderBg::before {
          transform: translate(-50%, -50%) rotate(442deg);
          transition: all 4s;
        }
        .neon-input-wrapper:focus-within > .neon-glow::before {
          transform: translate(-50%, -50%) rotate(420deg);
          transition: all 4s;
        }
        .neon-input-wrapper:focus-within > .neon-white::before {
          transform: translate(-50%, -50%) rotate(443deg);
          transition: all 4s;
        }
        .neon-input-wrapper:focus-within > .neon-border::before {
          transform: translate(-50%, -50%) rotate(430deg);
          transition: all 4s;
        }

        .neon-glow {
          overflow: hidden;
          filter: blur(30px);
          opacity: 0.4;
          max-height: 130px;
          max-width: 354px;
        }
        
        .neon-glow:before {
          content: "";
          z-index: -2;
          text-align: center;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(60deg);
          position: absolute;
          width: 999px;
          height: 999px;
          background-repeat: no-repeat;
          background-position: 0 0;
          background-image: conic-gradient(
            #000,
            #402fb5 5%,
            #000 38%,
            #000 50%,
            #cf30aa 60%,
            #000 87%
          );
          transition: all 2s;
        }

        #neon-filter-icon {
          position: absolute;
          top: 8px;
          right: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          max-height: 40px;
          max-width: 38px;
          height: 100%;
          width: 100%;
          isolation: isolate;
          overflow: hidden;
          border-radius: 10px;
          background: linear-gradient(180deg, #161329, black, #1d1b4b);
          border: 1px solid transparent;
        }
        
        .neon-filterBorder {
          height: 42px;
          width: 40px;
          position: absolute;
          overflow: hidden;
          top: 7px;
          right: 7px;
          border-radius: 10px;
        }

        .neon-filterBorder::before {
          content: "";
          text-align: center;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(90deg);
          position: absolute;
          width: 600px;
          height: 600px;
          background-repeat: no-repeat;
          background-position: 0 0;
          filter: brightness(1.35);
          background-image: conic-gradient(
            rgba(0, 0, 0, 0),
            #3d3a4f,
            rgba(0, 0, 0, 0) 50%,
            rgba(0, 0, 0, 0) 50%,
            #3d3a4f,
            rgba(0, 0, 0, 0) 100%
          );
          animation: rotate 4s linear infinite;
        }
        
        @keyframes rotate {
          100% {
            transform: translate(-50%, -50%) rotate(450deg);
          }
        }
        
        #neon-main {
          position: relative;
        }
        
        #neon-search-icon {
          position: absolute;
          left: 20px;
          top: 15px;
        }
      `}} />

      <div className="neon-glow" />
      <div className="neon-darkBorderBg" />
      <div className="neon-darkBorderBg" />
      <div className="neon-darkBorderBg" />
      <div className="neon-white" />
      <div className="neon-border" />
      
      <div id="neon-main">
        <input placeholder="Search..." type="text" name="text" className="neon-input" />
        <div id="neon-input-mask" />
        <div id="neon-pink-mask" />
        <div className="neon-filterBorder" />
        <div id="neon-filter-icon">
          <svg preserveAspectRatio="none" height={27} width={27} viewBox="4.8 4.56 14.832 15.408" fill="none">
            <path d="M8.16 6.65002H15.83C16.47 6.65002 16.99 7.17002 16.99 7.81002V9.09002C16.99 9.56002 16.7 10.14 16.41 10.43L13.91 12.64C13.56 12.93 13.33 13.51 13.33 13.98V16.48C13.33 16.83 13.1 17.29 12.81 17.47L12 17.98C11.24 18.45 10.2 17.92 10.2 16.99V13.91C10.2 13.5 9.97 12.98 9.73 12.69L7.52 10.36C7.23 10.08 7 9.55002 7 9.20002V7.87002C7 7.17002 7.52 6.65002 8.16 6.65002Z" stroke="#d6d6e6" strokeWidth={1} strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div id="neon-search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width={24} viewBox="0 0 24 24" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" height={24} fill="none" className="feather feather-search">
            <circle stroke="url(#search)" r={8} cy={11} cx={11} />
            <line stroke="url(#searchl)" y2="16.65" y1={22} x2="16.65" x1={22} />
            <defs>
              <linearGradient gradientTransform="rotate(50)" id="search">
                <stop stopColor="#f8e7f8" offset="0%" />
                <stop stopColor="#b6a9b7" offset="50%" />
              </linearGradient>
              <linearGradient id="searchl">
                <stop stopColor="#b6a9b7" offset="0%" />
                <stop stopColor="#837484" offset="50%" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
