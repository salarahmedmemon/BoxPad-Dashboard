import { useEffect, useState } from "react";

const HEX_ICONS = {
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  automation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
  inbox: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
    </svg>
  ),
};


const HEXAGONS: Array<{
  top: string; left: string; delay: number; icon: keyof typeof HEX_ICONS; size: number;
}> = [
    { top: "10%", left: "17%", delay: 0, icon: "ai", size: 52 },
    { top: "8%", left: "82%", delay: 0.8, icon: "users", size: 52 },
    { top: "22%", left: "70%", delay: 1.4, icon: "automation", size: 56 },
    { top: "38%", left: "22%", delay: 0.5, icon: "inbox", size: 44 },
    { top: "38%", left: "82%", delay: 1.8, icon: "target", size: 52 },
    { top: "62%", left: "14%", delay: 1.1, icon: "chat", size: 44 },
  ];

function DashboardPreview() {
  return (
    <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-white text-xs font-sans select-none pointer-events-none">
      {/* Nav bar */}
      <div className="flex items-center gap-4 px-4 py-2.5 border-b border-gray-100 bg-white">
        <span className="text-blue-600 font-bold text-sm tracking-wide">BOXpad</span>
        {["Inbox", "Contacts", "AI Employees", "Workflows", "Campaigns"].map(t => (
          <span key={t} className={`text-[10px] px-2 py-0.5 rounded ${t === "Inbox" ? "bg-gray-100 text-gray-800 font-medium" : "text-gray-400"}`}>{t}</span>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-[8px] font-bold">MJ</div>
          <span className="text-[10px] text-gray-500">Michael Johnson</span>
        </div>
      </div>
      <div className="flex" style={{ height: 180 }}>

        <div className="w-32 border-r border-gray-100 p-2 bg-gray-50/60 shrink-0">
          <p className="text-[9px] font-semibold text-gray-500 mb-1 px-1">Inbox</p>
          {["My Inbox", "All 28", "Unassigned 5"].map(i => (
            <div key={i} className="text-[9px] text-gray-500 px-1 py-0.5 rounded hover:bg-gray-100">{i}</div>
          ))}
          <p className="text-[9px] font-semibold text-gray-500 mt-2 mb-1 px-1">Teams</p>
          {["Sales 7", "Customer Support 16"].map(i => (
            <div key={i} className="text-[9px] text-gray-500 px-1 py-0.5">{i}</div>
          ))}
        </div>

        <div className="w-44 border-r border-gray-100 p-2 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-gray-700">Michael Johnson</span>
          </div>
          {[
            { name: "Olivia Mckinsey", msg: "Oh my god 😅 I'll try it ASAP, than...", time: "23:23" },
            { name: "Sara Williams", msg: "Good Evening, Emily! Hope you are...", time: "23:16" },
            { name: "Frank Thompson", msg: "Thank you for signing up Frank! If t...", time: "22:28" },
          ].map(c => (
            <div key={c.name} className={`flex items-start gap-1.5 p-1.5 rounded-lg mb-1 ${c.name === "Olivia Mckinsey" ? "bg-blue-50 border border-blue-100" : ""}`}>
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 shrink-0 flex items-center justify-center text-white text-[7px] font-bold mt-0.5">{c.name[0]}</div>
              <div className="min-w-0">
                <div className="flex justify-between">
                  <span className="text-[9px] font-medium text-gray-700 truncate">{c.name}</span>
                  <span className="text-[8px] text-gray-400 ml-1 shrink-0">{c.time}</span>
                </div>
                <p className="text-[8px] text-gray-400 truncate">{c.msg}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 p-2 bg-gray-50/40 flex flex-col gap-1.5 overflow-hidden">
          <div className="text-[8px] text-center text-gray-400 mb-1">28 August 2025</div>
          <div className="self-start max-w-[70%] bg-white rounded-lg p-1.5 shadow-sm text-[8px] text-gray-600 leading-relaxed">
            Hi, I recently joined Fit4Life and I'm trying to access my workout plan, but I can't login. Can you help?
          </div>
          <div className="self-end max-w-[70%] bg-blue-500 rounded-lg p-1.5 text-[8px] text-white leading-relaxed">
            Hello Olivia I'm Michael, your AI customer support assistant. Let's fix this quickly.
          </div>
          <div className="self-start max-w-[70%] bg-white rounded-lg p-1.5 shadow-sm text-[8px] text-gray-600">
            Yes, it's olivia.mckinsey@gmail.com
          </div>
        </div>
        {/* Details panel */}
        <div className="w-36 border-l border-gray-100 p-2 bg-white shrink-0 hidden lg:block">
          <p className="text-[9px] font-semibold text-gray-700 mb-2">Details</p>
          <p className="text-[8px] font-medium text-gray-500 mb-1">Contact Data</p>
          {[["First Name", "Olivia"], ["Last Name", "Mckinsey"], ["Phone", "+1 (312) 555-0134"]].map(([k, v]) => (
            <div key={k} className="mb-1">
              <p className="text-[7px] text-gray-400">{k}</p>
              <p className="text-[8px] text-gray-600 font-medium">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LoadingScreen() {
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTextVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap');

        .ls-root { font-family: 'Sora', sans-serif; }

        /* Rotating outer ring */
        @keyframes ring-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        /* Counter-rotating inner ring */
        @keyframes ring-spin-rev {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        /* Pulsing glow */
        @keyframes glow-pulse {
          0%,100% { opacity: 0.6; filter: blur(18px); }
          50%      { opacity: 1;   filter: blur(28px); }
        }
        /* Floating hex icons */
        @keyframes float-up {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-14px); }
        }
        @keyframes float-down {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(14px); }
        }
        /* Fade in */
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        /* Moving gradient shimmer */
        @keyframes bg-shift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        /* Orbiting dot */
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(54px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(54px) rotate(-360deg); }
        }
        @keyframes orbit2 {
          from { transform: rotate(180deg) translateX(54px) rotate(-180deg); }
          to   { transform: rotate(540deg) translateX(54px) rotate(-540deg); }
        }

        .hex-float-even { animation: float-up   4s ease-in-out infinite; }
        .hex-float-odd  { animation: float-down 4s ease-in-out infinite; }

        .text-fade { animation: fade-in-up 0.9s ease-out both; }

        .ring-outer { animation: ring-spin     3s linear infinite; }
        .ring-inner { animation: ring-spin-rev 2s linear infinite; }
        .glow-blob  { animation: glow-pulse    2.5s ease-in-out infinite; }
        .orbit-dot1 { animation: orbit  2.5s linear infinite; }
        .orbit-dot2 { animation: orbit2 2.5s linear infinite; }
      `}</style>

      <div className="ls-root relative w-full min-h-screen overflow-hidden flex flex-col items-center"
        style={{
          background: "linear-gradient(135deg, #010814 0%, #020d24 35%, #041638 55%, #0a2555 75%, #0d3a7a 90%, #1a5cb8 100%)",
        }}
      >

        <div className="w-full h-full absolute top-0 left-0 overflow-hidden">

          {/* Bottom Left Image */}
          <div className="absolute bottom-[-20%] left-[-26%] w-[80%] h-[100%]">
            <img
              src="/assets/img/loaderimage.png"
              alt="bottom-left"
              className="w-full h-full object-contain opacity-80 rotate-[30deg]"
            />
          </div>

          {/* Top Right Image */}
          <div className="absolute top-[-26%] right-[-38%] w-[100%] h-[144%]">
            <img
              src="/assets/img/loaderimage.png"
              alt="top-right"
              className="w-full h-full object-contain opacity-80 rotate-[-120deg]"
            />
          </div>

        </div>

        {/* MAIN GLASS CONTAINER */}
        <div className="relative z-20 w-full h-[600px] flex items-center justify-center px-4 py-10">
          <div
            className="w-full max-w-6xl rounded-[32px] border border-white/15 backdrop-blur-3xl bg-white/0 shadow-[0_25px_80px_rgba(0,0,0,0.45)] overflow-hidden"
          >


            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none"></div>


            <div className="relative z-10 flex flex-col items-center pt-12 pb-8 px-4 w-full max-w-4xl mx-auto">

              <div
                className="glow-blob absolute pointer-events-none"
                style={{
                  width: 520, height: 520,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(56,160,255,0.35) 0%, rgba(30,100,220,0.15) 50%, transparent 75%)",
                  right: -80, top: "10%",
                }}
              />

              <div className="absolute pointer-events-none" style={{
                width: 300, height: 300, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(30,80,200,0.18) 0%, transparent 70%)",
                left: -60, bottom: "15%",
              }} />

              {HEXAGONS.map((h, i) => (
                <div
                  key={i}
                  className={`absolute ${i % 2 === 0 ? "hex-float-even" : "hex-float-odd"}`}
                  style={{
                    top: h.top, left: h.left,
                    animationDelay: `${h.delay}s`,
                  }}
                >
                  <Hexagon size={h.size} icon={HEX_ICONS[h.icon]} />
                </div>
              ))}

              <div className="relative z-10 flex flex-col items-center pb-8 px-4 w-full max-w-4xl mx-auto">

                <div className="loader relative w-[240px] h-[240px]  rounded-full mb-10">
                  <img src="/assets/img/loader.gif" />
                  <div className="w-[140px] h-[140px] absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 rounded-full
                  bg-[linear-gradient(135deg,_#0b162d_0%,_#0c1832_35%,_#0b1a37_55%,_#0a1534_75%,_#0b1937_90%,_#0b1c3e_100%)]
                  "></div>
                </div>

                {textVisible && (
                  <div className="text-center px-4">
                    <h1
                      className="text-fade font-bold text-white mb-3 tracking-tight mt-[-60px]"
                      style={{
                        fontSize: "38px",
                        textShadow: "0 0 30px rgba(96,180,255,0.5)",
                        animationDelay: "0s",
                      }}
                    >
                      Extracting Information...
                    </h1>
                    <p
                      className="text-fade text-blue-100/70 max-w-sm mx-auto leading-[1.2]"
                      style={{ fontSize: "18px", animationDelay: "0.25s" }}
                    >
                      We are extracting information from the above honey combs to your system
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-2 mt-6 mb-10">
                  {[0, 1, 2, 3].map(i => (
                    <div
                      key={i}
                      className="rounded-full bg-blue-400"
                      style={{
                        width: i === 1 ? 20 : 6,
                        height: 6,
                        opacity: 0.7,
                        animation: `glow-pulse 1.4s ease-in-out infinite`,
                        animationDelay: `${i * 0.2}s`,
                        transition: "width 0.3s",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="w-[80%] h-[200px] bg-white absolute bottom-0 left-1/2 transform -translate-x-1/2 z-[100]">
          <DashboardPreview />
        </div>
      </div>
    </>
  );
}

function Hexagon({ size, icon }: { size: number; icon: React.ReactNode }) {
  return (
    <div
      className="relative flex items-center justify-center text-blue-300/70"
      style={{
        width: size, height: size,
        filter: "drop-shadow(0 0 8px rgba(56,140,255,0.4))",
      }}
    >

      <svg
        viewBox="0 0 100 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
      >
        <polygon
          points="50,2 98,27 98,88 50,113 2,88 2,27"
          fill="rgba(8,30,80,0.45)"
          stroke="rgba(56,120,255,0.35)"
          strokeWidth="3"
        />
      </svg>
      <span className="relative z-10" style={{ width: size * 0.38, height: size * 0.38 }}>
        {icon}
      </span>
    </div>
  );
}