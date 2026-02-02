import React, { useState, useEffect, useRef } from 'react';
import { 
  Flame, Terminal, Shield, Zap, 
  Cpu, CheckCircle2, X,
  BarChart3, Lock, Globe,
  Briefcase, ArrowRight, Share2, Target,
  Clock, AlertCircle, ChevronRight, Code2,
  Activity, Wallet, Layers, Copy, Users
} from 'lucide-react';

// --- TYPES ---

interface Signal {
  label: string;
  value: string;
  bar?: number;
}

interface Profile {
  id?: number;
  name?: string;
  role: string;
  subclass?: string;
  headline?: string;
  score: number;
  signals?: Signal[];
  equityAsk?: string;
  traits?: string[];
  imgSeed?: string;
}

interface Log {
  text: string;
  color?: string;
  time: string;
}

// --- MOCK DATA ---

const MOCK_DB: Record<string, Profile[]> = {
  builders: [
    {
      id: 1,
      name: "Kaelen V.",
      role: "BUILDER",
      subclass: "Systems Architect",
      headline: "Ex-OpenAI Infra. I build systems that don't break.",
      score: 94,
      signals: [
        { label: "GitHub Gravity", value: "Top 2%", bar: 98 },
        { label: "Consistency", value: "Diamond", bar: 95 },
        { label: "Stack", value: "Rust/C++", bar: 90 }
      ],
      equityAsk: "40%",
      traits: ["Async-First", "High Risk", "Deep Work"],
      imgSeed: "Kaelen"
    },
    {
      id: 2,
      name: "Sarah C.",
      role: "BUILDER",
      subclass: "Full Stack AI",
      headline: "Shipped 3 SaaS apps in 2024. Need GTM help.",
      score: 88,
      signals: [
        { label: "Shipping Speed", value: "Elite", bar: 92 },
        { label: "Product Sense", value: "High", bar: 85 },
        { label: "Stack", value: "Next/Py", bar: 88 }
      ],
      equityAsk: "50%",
      traits: ["Rapid Iteration", "Design-Led", "Bootstrapped"],
      imgSeed: "Sarah"
    }
  ],
  operators: [
    {
      id: 3,
      name: "Elena R.",
      role: "OPERATOR",
      subclass: "Growth & Scale",
      headline: "I took a SaaS from $0 to $2M ARR. I can sell ice to eskimos.",
      score: 91,
      signals: [
        { label: "Rev Managed", value: "$5M+", bar: 95 },
        { label: "Exits", value: "1", bar: 100 },
        { label: "Network", value: "Tier 1", bar: 90 }
      ],
      equityAsk: "50%",
      traits: ["Sales-Led", "Fundraising", "Aggressive"],
      imgSeed: "Elena"
    }
  ]
};

// --- SHARED COMPONENTS ---

const TerminalLog = ({ logs }: { logs: Log[] }) => {
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [logs]);
  return (
    <div className="bg-black/80 border border-white/10 rounded-lg p-4 font-mono text-[10px] h-48 md:h-56 overflow-y-auto shadow-inner backdrop-blur-sm scrollbar-none">
      {logs.map((log, i) => (
        <div key={i} className={`${log.color || 'text-zinc-400'} mb-1.5 flex items-start`}>
          <span className="opacity-30 mr-3 w-10 shrink-0 text-right select-none font-light">{log.time}</span>
          <span className="tracking-wide break-all">{log.text}</span>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
};

const StatBadge = ({ label, value, bar }: { label: string; value: string; bar?: number }) => (
  <div className="flex flex-col justify-center px-2 py-2 md:px-3 md:py-3 rounded bg-zinc-900 border border-white/5 w-full relative overflow-hidden group">
    <div className="relative z-10">
      <div className="flex justify-between items-end mb-1">
         <span className="text-[8px] md:text-[9px] uppercase tracking-wider text-zinc-500 font-bold">{label}</span>
      </div>
      <span className="font-bold font-mono text-xs md:text-sm text-white truncate block">{value}</span>
    </div>
    <div className="absolute bottom-0 left-0 h-0.5 bg-orange-500/50 transition-all duration-1000" style={{ width: `${bar || 0}%` }}></div>
  </div>
);

const TraitPill = ({ text }: { text: string }) => (
  <span className="px-1.5 py-0.5 md:px-2 md:py-1 rounded-[2px] bg-zinc-900 border border-zinc-700 text-[8px] md:text-[9px] font-bold text-zinc-300 uppercase tracking-wide truncate max-w-full">
    {text}
  </span>
);

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const ButtonPrimary = ({ children, onClick, disabled, className = '' }: ButtonProps) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className={`relative group w-full overflow-hidden rounded-lg bg-orange-600 px-6 py-4 font-bold uppercase tracking-widest text-white shadow-[0_0_20px_-5px_rgba(234,88,12,0.4)] transition-all hover:bg-orange-500 hover:shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed border border-white/10 active:scale-[0.98] ${className}`}
  >
    <span className="relative flex items-center justify-center">
      {children}
    </span>
  </button>
);

// --- SUB-VIEWS ---

const IntroView = ({ onStart }: { onStart: () => void }) => (
  <div className="min-h-[100dvh] bg-zinc-950 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
     <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>
     
     <div className="z-10 text-center max-w-md w-full animate-fadeIn flex flex-col items-center">
        <div className="mb-8 md:mb-10 relative group cursor-default">
           <div className="absolute -inset-4 bg-orange-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
           <div className="relative p-5 md:p-6 border border-white/10 bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-2xl ring-1 ring-black/50">
             <Flame className="w-10 h-10 md:w-12 md:h-12 text-orange-500 fill-orange-500/20" />
           </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6 italic uppercase bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-200 to-zinc-500 drop-shadow-sm">FORGE</h1>
        
        <div className="flex items-center justify-center space-x-4 mb-12 opacity-80">
          <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-zinc-700"></div>
          <p className="text-[10px] md:text-xs text-orange-500 font-mono uppercase tracking-[0.3em] font-bold">Don't Chat. Build.</p>
          <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-zinc-700"></div>
        </div>

        <div className="w-full space-y-6 md:space-y-8">
          <ButtonPrimary onClick={onStart}>
            Enter Protocol
          </ButtonPrimary>
          
          <div className="flex justify-center space-x-6 md:space-x-8 text-[9px] md:text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
             <span className="flex items-center transition-colors hover:text-zinc-300">
                <Shield className="w-3 h-3 mr-1.5 text-zinc-600" /> 
                Deep Scan
             </span>
             <span className="flex items-center transition-colors hover:text-zinc-300">
                <Lock className="w-3 h-3 mr-1.5 text-zinc-600" /> 
                Vetted Only
             </span>
          </div>
        </div>
     </div>
  </div>
);

interface InputViewProps {
  userType: string;
  setUserType: (t: string) => void;
  inputValue: string;
  setInputValue: (v: string) => void;
  onBack: () => void;
  onAudit: () => void;
}

const InputView = ({ userType, setUserType, inputValue, setInputValue, onBack, onAudit }: InputViewProps) => (
  <div className="min-h-[100dvh] bg-zinc-950 flex flex-col items-center justify-center p-6">
     <div className="max-w-md w-full animate-slideUp">
        <button onClick={onBack} className="group flex items-center text-xs font-bold text-zinc-600 uppercase tracking-widest mb-8 hover:text-white transition-colors">
          <div className="p-1 rounded-full border border-zinc-800 mr-3 group-hover:border-zinc-500 transition-colors bg-zinc-900"><ArrowRight className="w-3 h-3 rotate-180" /></div>
          Back
        </button>
        
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Identity Verification</h2>
        <p className="text-zinc-400 text-sm mb-8 leading-relaxed">Select your archetype to begin the audit process.</p>

        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-8">
           <button 
             onClick={() => setUserType('builder')} 
             className={`relative p-4 md:p-5 rounded-xl border text-left transition-all duration-300 group overflow-hidden ${userType === 'builder' ? 'border-orange-500 bg-zinc-900 ring-1 ring-orange-500 shadow-[0_0_20px_-10px_rgba(234,88,12,0.3)]' : 'border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900 hover:border-zinc-600'}`}
           >
              <div className={`absolute top-3 right-3 transition-all duration-300 ${userType === 'builder' ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}><CheckCircle2 className="w-4 h-4 text-orange-500" /></div>
              <Code2 className={`w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4 transition-colors ${userType === 'builder' ? 'text-orange-500' : 'text-zinc-600 group-hover:text-zinc-400'}`} />
              <div className="font-bold text-white text-sm mb-1">Builder</div>
              <div className="text-[10px] md:text-[11px] text-zinc-500 font-medium">Engineering & Product</div>
           </button>
           
           <button 
             onClick={() => setUserType('operator')} 
             className={`relative p-4 md:p-5 rounded-xl border text-left transition-all duration-300 group overflow-hidden ${userType === 'operator' ? 'border-orange-500 bg-zinc-900 ring-1 ring-orange-500 shadow-[0_0_20px_-10px_rgba(234,88,12,0.3)]' : 'border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900 hover:border-zinc-600'}`}
           >
              <div className={`absolute top-3 right-3 transition-all duration-300 ${userType === 'operator' ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}><CheckCircle2 className="w-4 h-4 text-orange-500" /></div>
              <BarChart3 className={`w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4 transition-colors ${userType === 'operator' ? 'text-orange-500' : 'text-zinc-600 group-hover:text-zinc-400'}`} />
              <div className="font-bold text-white text-sm mb-1">Operator</div>
              <div className="text-[10px] md:text-[11px] text-zinc-500 font-medium">Growth & Operations</div>
           </button>
        </div>

        <div className="relative group mb-8">
           <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition duration-500"></div>
           <div className="relative flex items-center bg-zinc-900 border border-zinc-700 rounded-xl p-1 transition-colors group-focus-within:border-orange-500 group-focus-within:bg-zinc-900 group-focus-within:ring-1 group-focus-within:ring-orange-500/50">
             <div className="pl-4 pr-3 text-zinc-500"><Globe className="w-5 h-5" /></div>
             <input 
               type="text" 
               value={inputValue} 
               onChange={(e) => setInputValue(e.target.value)} 
               placeholder={userType === 'builder' ? "github.com/username" : "linkedin.com/in/username"} 
               className="w-full bg-transparent border-none text-white text-base h-12 focus:outline-none font-mono placeholder-zinc-600" 
               autoFocus 
               spellCheck={false} 
             />
           </div>
        </div>
        
        <ButtonPrimary onClick={onAudit} disabled={!inputValue} className="w-full">Run Deep Scan</ButtonPrimary>
     </div>
  </div>
);

const AuditView = ({ auditLogs }: { auditLogs: Log[] }) => (
  <div className="min-h-[100dvh] bg-zinc-950 flex flex-col items-center justify-center p-6">
     <div className="w-full max-w-md animate-fadeIn">
        <div className="flex items-center justify-between mb-6 px-1 border-b border-white/5 pb-4">
           <div className="flex items-center space-x-3">
             <div className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span></div>
             <span className="text-xs font-bold text-white uppercase tracking-widest">Audit in Progress</span>
           </div>
           <span className="font-mono text-[10px] text-zinc-500">{Math.floor(Date.now() / 1000)}</span>
        </div>
        
        <TerminalLog logs={auditLogs} />
        
        <div className="mt-6 flex items-center justify-center space-x-2 text-zinc-500">
          <Cpu className="w-4 h-4 animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-widest">Processing Asset Ledger...</span>
        </div>
     </div>
  </div>
);

interface ScoreRevealViewProps {
  myProfile: Profile;
  onClaim: () => void;
}

const ScoreRevealView = ({ myProfile, onClaim }: ScoreRevealViewProps) => (
  <div className="min-h-[100dvh] bg-zinc-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
     {/* Ambient Glow */}
     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>

     <div className="max-w-md w-full relative z-10 animate-in fade-in zoom-in-95 duration-700">
        
        <div className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl text-center overflow-hidden relative ring-1 ring-black/50">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50"></div>
           
           <div className="mb-8 inline-flex p-4 rounded-full bg-zinc-950 border border-zinc-800 shadow-inner">
             <Shield className="w-8 h-8 text-orange-500 fill-orange-500/10" />
           </div>
           
           <h2 className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Verification Complete</h2>
           
           <div className="relative mb-10 inline-block">
             <span className="text-8xl md:text-9xl font-black text-white tracking-tighter drop-shadow-2xl">{myProfile.score}</span>
             <div className="absolute -right-6 top-2 flex flex-col items-start bg-zinc-800 px-2 py-1 rounded border border-zinc-700 transform rotate-12">
                <span className="text-xs font-bold text-zinc-200">/100</span>
             </div>
           </div>

           <div className="bg-zinc-950/50 rounded-xl border border-white/5 p-6 mb-8 text-left">
              <div className="flex items-start space-x-4">
                 <div className="p-2 bg-orange-950/20 rounded-lg border border-orange-500/20 shrink-0"><Clock className="w-5 h-5 text-orange-500" /></div>
                 <div><h3 className="text-sm font-bold text-white uppercase mb-1">Manual Review Required</h3><p className="text-xs text-zinc-400 leading-relaxed">Your assets exceed the automated threshold. A human auditor must finalize your entry to prevent fraud.</p></div>
              </div>
           </div>

           <div className="space-y-4">
              <ButtonPrimary onClick={onClaim}>
                 Enter Read-Only Mode
              </ButtonPrimary>
              <button className="w-full flex items-center justify-center text-zinc-500 text-xs font-bold uppercase py-3 hover:text-white transition-colors">
                 <Share2 className="w-4 h-4 mr-2" /> Share Score Priority Access
              </button>
           </div>
        </div>
     </div>
  </div>
);

interface FeedViewProps {
  feed: Profile[];
  myProfile: Profile;
  onMatch: () => void;
}

const FeedView = ({ feed, myProfile, onMatch }: FeedViewProps) => {
  const [feedIndex, setFeedIndex] = useState(0);
  const candidate = feed[feedIndex];

  const nextCandidate = () => {
    if (feedIndex < feed.length - 1) setFeedIndex(i => i + 1);
    else alert("You have reached the end of your verified batch.");
  };

  return (
    <div className="min-h-[100dvh] bg-zinc-950 flex flex-col font-sans text-zinc-200 overflow-hidden">
      {/* Top Nav */}
      <header className="h-14 md:h-16 border-b border-white/5 flex justify-between items-center px-4 md:px-6 bg-zinc-950/90 backdrop-blur sticky top-0 z-50 shrink-0">
         <div className="flex items-center space-x-3">
            <div className="p-1.5 bg-orange-500 rounded-sm"><Flame className="w-4 h-4 text-black fill-black" /></div>
            <span className="font-black italic text-white tracking-tighter text-lg md:text-xl">FORGE</span>
         </div>
         <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-zinc-900 rounded-full border border-zinc-800">
               <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>
               <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wide">Review Pending</span>
            </div>
            <div className="w-8 h-8 md:w-9 md:h-9 bg-zinc-900 rounded border border-white/10 flex items-center justify-center shadow-sm">
               <span className="text-xs font-bold text-white">{myProfile.score}</span>
            </div>
         </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-y-auto">
         
         {/* The Profile "Trading Card" - Constrained Height for Mobile */}
         <div className="w-full max-w-sm bg-zinc-900 rounded-[1.5rem] border border-white/10 shadow-2xl flex flex-col relative overflow-hidden animate-in fade-in zoom-in-95 duration-500 ring-1 ring-black mb-20 md:mb-0 aspect-[9/16] max-h-[80vh]">
            
            {/* Header Section */}
            <div className="p-5 border-b border-white/5 bg-zinc-900/50 relative z-10 backdrop-blur-sm">
               <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3 md:space-x-4">
                     {/* Avatar */}
                     <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl border border-white/10 bg-zinc-800 overflow-hidden shadow-xl ring-1 ring-black/40 shrink-0">
                        <img src={`https://api.dicebear.com/9.x/initials/svg?seed=${candidate.imgSeed}&backgroundColor=18181b`} className="w-full h-full object-cover" alt="Avatar" />
                     </div>
                     
                     {/* Identity */}
                     <div className="min-w-0">
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase leading-none tracking-tight drop-shadow-md truncate">{candidate.name}</h2>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                           <span className="px-2 py-0.5 bg-white/5 text-zinc-300 text-[9px] md:text-[10px] font-bold uppercase tracking-wider rounded border border-white/10 whitespace-nowrap">{candidate.role}</span>
                           <span className="text-[9px] md:text-[10px] font-bold text-orange-500 uppercase tracking-wide truncate">{candidate.subclass}</span>
                        </div>
                     </div>
                  </div>
                  
                  {/* Score */}
                  <div className="flex flex-col items-center justify-center w-10 h-12 md:w-12 md:h-14 bg-zinc-950 border border-orange-500/30 clip-path-polygon shadow-[0_0_15px_-3px_rgba(234,88,12,0.2)] shrink-0">
                      <span className="text-[7px] md:text-[8px] text-zinc-500 font-bold uppercase mb-0.5">Score</span>
                      <span className="text-lg md:text-xl font-black text-white leading-none">{candidate.score}</span>
                  </div>
               </div>
            </div>

            {/* Body Content */}
            <div className="p-5 space-y-5 bg-zinc-900 flex-1 flex flex-col relative">
               <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20"></div>

               <div className="relative z-10 flex flex-col h-full">
                  <div className="relative pl-4 border-l-4 border-orange-600 mb-5">
                     <p className="text-base md:text-lg text-white font-medium italic leading-snug">
                        "{candidate.headline}"
                     </p>
                  </div>

                  <div className="mb-5">
                     <div className="flex items-center text-[10px] font-bold text-zinc-500 uppercase mb-2 tracking-widest">
                        <Target className="w-3 h-3 mr-2 text-orange-500" /> Asset Ledger
                     </div>
                     <div className="grid grid-cols-3 gap-2">
                        {candidate.signals?.map((s, i) => (
                           <StatBadge key={i} label={s.label} value={s.value} bar={s.bar} />
                        ))}
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-auto">
                     <div className="bg-black/40 rounded border border-white/5 p-3 flex flex-col justify-between hover:border-orange-500/30 transition-colors group">
                        <div className="flex items-center text-[9px] font-bold text-zinc-500 uppercase mb-1 group-hover:text-orange-500 transition-colors">
                           <Wallet className="w-3 h-3 mr-1.5" /> Equity Ask
                        </div>
                        <div className="text-xl md:text-2xl font-black text-white tracking-tight">{candidate.equityAsk}</div>
                     </div>

                     <div className="bg-black/40 rounded border border-white/5 p-3 flex flex-col justify-between">
                         <div className="flex items-center text-[9px] font-bold text-zinc-500 uppercase mb-2">
                           <Activity className="w-3 h-3 mr-1.5" /> Style
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                           {candidate.traits?.map((t, i) => (
                              <TraitPill key={i} text={t} />
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Action Bar - Floating at Bottom, Adjusted for Mobile */}
         <div className="fixed bottom-6 flex items-center space-x-8 z-50 md:absolute md:bottom-8">
            <button 
              onClick={nextCandidate} 
              className="group w-14 h-14 md:w-16 md:h-16 bg-zinc-900/90 backdrop-blur border border-zinc-700 rounded-full flex items-center justify-center transition-all hover:border-red-500/50 hover:shadow-[0_0_30px_-10px_rgba(239,68,68,0.5)] active:scale-95 shadow-lg"
            >
               <X className="w-6 h-6 md:w-7 md:h-7 text-zinc-500 group-hover:text-red-500 transition-colors" />
            </button>
            <button 
              onClick={onMatch} 
              className="group w-18 h-18 md:w-20 md:h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-[0_0_40px_-10px_rgba(234,88,12,0.6)] transition-all hover:scale-105 hover:shadow-orange-500/50 active:scale-95 border border-white/10"
            >
               <Zap className="w-8 h-8 md:w-10 md:h-10 text-white fill-white transition-transform group-hover:rotate-12" />
            </button>
         </div>
      </div>
    </div>
  );
};

const MatchView = ({ onBack }: { onBack: () => void }) => (
   <div className="min-h-[100dvh] bg-zinc-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="z-10 text-center max-w-sm w-full bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl animate-in zoom-in-95 duration-300 shadow-2xl ring-1 ring-black">
         <div className="flex justify-center mb-8">
            <div className="p-5 bg-emerald-500/10 rounded-full border border-emerald-500/20 ring-4 ring-emerald-500/5">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
         </div>
         
         <h2 className="text-3xl font-black text-white italic uppercase mb-3 tracking-tight">Protocol Initiated</h2>
         
         <div className="bg-zinc-950/50 rounded-xl border border-white/5 p-5 mb-8 text-left">
           <p className="text-zinc-400 text-sm font-medium leading-relaxed mb-4">
              Connection request logged with Forge Central.
           </p>
           <div className="flex items-start space-x-3">
              <Clock className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
              <p className="text-xs text-zinc-500 leading-relaxed">
                 To preserve network density, all initial Build Protocols require manual clearance by a Human Auditor. We prioritize quality over volume.
              </p>
           </div>
         </div>

         <div className="flex items-center justify-between px-2 mb-8">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Status</span>
            <span className="text-xs font-mono font-bold text-orange-500 bg-orange-950/20 px-2 py-1 rounded border border-orange-500/20 animate-pulse">Pending Clearance (~24h)</span>
         </div>
         
         <ButtonPrimary onClick={onBack} className="bg-white text-black hover:bg-zinc-200 border-none shadow-none">Return to Feed</ButtonPrimary>
      </div>
   </div>
);

// --- MAIN CONTROLLER ---

export default function App() {
  const [view, setView] = useState('intro');
  const [userType, setUserType] = useState('builder');
  const [inputValue, setInputValue] = useState('');
  const [auditLogs, setAuditLogs] = useState<Log[]>([]);
  const [myProfile, setMyProfile] = useState<Profile | null>(null);
  const [feed, setFeed] = useState<Profile[]>([]);

  const startAudit = () => {
    if (!inputValue) return;
    setView('audit');
    let t = 0;
    const addLog = (text: string, color?: string, delay: number = 0) => {
      setTimeout(() => {
        const time = new Date().toISOString().split('T')[1].slice(0, 8);
        setAuditLogs(p => [...p, { text, color, time }]);
      }, t += delay);
    };

    addLog(`INIT_PROTOCOL: ${userType.toUpperCase()}_VERIFICATION`, 'text-white', 100);
    addLog(`CONNECTING: ${inputValue}...`, 'text-orange-500', 500);
    addLog(`HANDSHAKE: 200 OK`, 'text-emerald-500', 400);
    if (userType === 'builder') {
      addLog(`SCANNING: Repositories...`, 'text-zinc-400', 600);
      addLog(`ANALYSIS: Commit Frequency > 98th Percentile`, 'text-blue-400', 800);
      addLog(`VERIFYING: "Production Ready" Architecture`, 'text-zinc-400', 700);
      addLog(`DETECTED: Rust, TypeScript, Python`, 'text-zinc-300', 500);
    } else {
      addLog(`SCANNING: Employment History...`, 'text-zinc-400', 600);
      addLog(`EXTRACTION: Keyword "ARR" detected (x12)`, 'text-emerald-400', 800);
      addLog(`VALIDATING: Domain Authority of past employers`, 'text-zinc-400', 700);
    }
    addLog(`CALCULATING: Forge Score...`, 'text-orange-500 animate-pulse', 1000);

    setTimeout(() => {
      setMyProfile({
        score: Math.floor(Math.random() * (98 - 85) + 85),
        role: userType === 'builder' ? 'BUILDER' : 'OPERATOR'
      });
      // Load OPPOSITE type for feed
      setFeed(userType === 'builder' ? MOCK_DB.operators : MOCK_DB.builders);
      setView('score');
    }, t + 1500);
  };

  return (
    <>
      {view === 'intro' && <IntroView onStart={() => setView('input')} />}
      {view === 'input' && <InputView userType={userType} setUserType={setUserType} inputValue={inputValue} setInputValue={setInputValue} onBack={() => setView('intro')} onAudit={startAudit} />}
      {view === 'audit' && <AuditView auditLogs={auditLogs} />}
      {view === 'score' && myProfile && <ScoreRevealView myProfile={myProfile} onClaim={() => setView('feed')} />}
      {view === 'feed' && myProfile && <FeedView feed={feed} myProfile={myProfile} onMatch={() => setView('match')} />}
      {view === 'match' && <MatchView onBack={() => setView('feed')} />}
    </>
  );
}
