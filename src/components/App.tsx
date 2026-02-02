import React, { useState, useEffect, useRef } from 'react';
import { 
  Flame, Terminal, Shield, Zap, 
  Cpu, CheckCircle2, X,
  BarChart3, Lock, Globe,
  Briefcase, ArrowRight, Share2, Target,
  Clock, AlertCircle, ChevronRight, Code2,
  Activity, Wallet, Layers, Copy, Users
} from 'lucide-react';

// --- SHARED COMPONENTS ---

const TerminalLog = ({ logs }) => {
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [logs]);
  return (
    <div className="bg-black/80 border border-white/10 rounded-lg p-4 font-mono text-[10px] h-56 overflow-y-auto shadow-inner backdrop-blur-sm scrollbar-none">
      {logs.map((log, i) => (
        <div key={i} className={`${log.color || 'text-zinc-400'} mb-1.5 flex items-start`}>
          <span className="opacity-30 mr-3 w-12 shrink-0 text-right select-none font-light">{log.time}</span>
          <span className="tracking-wide">{log.text}</span>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
};

const ButtonPrimary = ({ children, onClick, disabled, className }) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className={`relative group w-full overflow-hidden rounded-lg bg-orange-600 px-6 py-4 font-bold uppercase tracking-widest text-white shadow-[0_0_20px_-5px_rgba(234,88,12,0.4)] transition-all hover:bg-orange-500 hover:shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed border border-white/10 ${className}`}
  >
    <span className="relative flex items-center justify-center">
      {children}
    </span>
  </button>
);

// --- SUB-VIEWS ---

const IntroView = ({ onStart }) => (
  <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
     <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>
     
     <div className="z-10 text-center max-w-md w-full animate-fadeIn flex flex-col items-center">
        <div className="mb-10 relative group cursor-default">
           <div className="absolute -inset-4 bg-orange-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
           <div className="relative p-6 border border-white/10 bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-2xl ring-1 ring-black/50">
             <Flame className="w-12 h-12 text-orange-500 fill-orange-500/20" />
           </div>
        </div>
        
        <h1 className="text-8xl font-black tracking-tighter text-white mb-6 italic uppercase bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-200 to-zinc-500 drop-shadow-sm">FORGE</h1>
        
        <div className="flex items-center justify-center space-x-4 mb-12 opacity-80">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-zinc-700"></div>
          <p className="text-xs text-orange-500 font-mono uppercase tracking-[0.3em] font-bold">Don't Chat. Build.</p>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-zinc-700"></div>
        </div>

        <div className="w-full space-y-8">
          <ButtonPrimary onClick={onStart}>
            Audit Your Profile
          </ButtonPrimary>
          
          <div className="flex justify-center space-x-8 text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
             <span className="flex items-center transition-colors hover:text-zinc-300">
                <Shield className="w-3 h-3 mr-2 text-zinc-600" /> 
                AI Verified
             </span>
             <span className="flex items-center transition-colors hover:text-zinc-300">
                <Lock className="w-3 h-3 mr-2 text-zinc-600" /> 
                Access Limited
             </span>
          </div>
        </div>
     </div>
  </div>
);

const InputView = ({ userType, setUserType, inputValue, setInputValue, onBack, onAudit }) => (
  <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6">
     <div className="max-w-md w-full animate-slideUp">
        <button onClick={onBack} className="group flex items-center text-xs font-bold text-zinc-600 uppercase tracking-widest mb-10 hover:text-white transition-colors">
          <div className="p-1 rounded-full border border-zinc-800 mr-3 group-hover:border-zinc-500 transition-colors bg-zinc-900"><ArrowRight className="w-3 h-3 rotate-180" /></div>
          Back
        </button>
        
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Identity Verification</h2>
        <p className="text-zinc-400 text-sm mb-8 leading-relaxed">Select your archetype to begin the deep scan.</p>

        <div className="grid grid-cols-2 gap-4 mb-8">
           <button 
             onClick={() => setUserType('builder')} 
             className={`relative p-5 rounded-xl border text-left transition-all duration-300 group overflow-hidden ${userType === 'builder' ? 'border-orange-500 bg-zinc-900 ring-1 ring-orange-500 shadow-[0_0_20px_-10px_rgba(234,88,12,0.3)]' : 'border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900 hover:border-zinc-600'}`}
           >
              <div className={`absolute top-3 right-3 transition-all duration-300 ${userType === 'builder' ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}><CheckCircle2 className="w-4 h-4 text-orange-500" /></div>
              <Code2 className={`w-8 h-8 mb-4 transition-colors ${userType === 'builder' ? 'text-orange-500' : 'text-zinc-600 group-hover:text-zinc-400'}`} />
              <div className="font-bold text-white text-sm mb-1">Builder</div>
              <div className="text-[11px] text-zinc-500 font-medium">Engineering & Product</div>
           </button>
           
           <button 
             onClick={() => setUserType('operator')} 
             className={`relative p-5 rounded-xl border text-left transition-all duration-300 group overflow-hidden ${userType === 'operator' ? 'border-orange-500 bg-zinc-900 ring-1 ring-orange-500 shadow-[0_0_20px_-10px_rgba(234,88,12,0.3)]' : 'border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900 hover:border-zinc-600'}`}
           >
              <div className={`absolute top-3 right-3 transition-all duration-300 ${userType === 'operator' ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}><CheckCircle2 className="w-4 h-4 text-orange-500" /></div>
              <BarChart3 className={`w-8 h-8 mb-4 transition-colors ${userType === 'operator' ? 'text-orange-500' : 'text-zinc-600 group-hover:text-zinc-400'}`} />
              <div className="font-bold text-white text-sm mb-1">Operator</div>
              <div className="text-[11px] text-zinc-500 font-medium">Growth & Operations</div>
           </button>
        </div>

        <div className="relative group mb-8">
           <div className="relative flex items-center bg-zinc-900 border border-zinc-700 rounded-xl p-1 transition-colors group-focus-within:border-orange-500 group-focus-within:bg-zinc-900 group-focus-within:ring-1 group-focus-within:ring-orange-500/50">
             <div className="pl-4 pr-3 text-zinc-500"><Globe className="w-5 h-5" /></div>
             <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder={userType === 'builder' ? "github.com/username" : "linkedin.com/in/username"} className="w-full bg-transparent border-none text-white text-sm h-12 focus:outline-none font-mono placeholder-zinc-600" autoFocus spellCheck={false} />
           </div>
        </div>
        
        <ButtonPrimary onClick={onAudit} disabled={!inputValue} className="w-full">Calculate Forge Score</ButtonPrimary>
     </div>
  </div>
);

const AuditView = ({ auditLogs }) => (
  <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6">
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

const ScoreRevealView = ({ myProfile, onClaim }) => (
  <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>

     <div className="max-w-md w-full relative z-10 animate-in fade-in zoom-in-95 duration-700">
        
        <div className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl text-center overflow-hidden relative ring-1 ring-black/50">
           
           <h2 className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Verification Complete</h2>
           
           <div className="relative mb-8 inline-block">
             <span className="text-9xl font-black text-white tracking-tighter drop-shadow-2xl">{myProfile.score}</span>
             <div className="absolute -right-6 top-2 flex flex-col items-start bg-zinc-800 px-2 py-1 rounded border border-zinc-700 transform rotate-12">
                <span className="text-xs font-bold text-zinc-200">/100</span>
             </div>
           </div>

           <div className="inline-flex items-center px-3 py-1.5 bg-emerald-950/30 border border-emerald-900/50 rounded-full text-emerald-500 text-[10px] font-bold uppercase tracking-wide mb-8">
              <CheckCircle2 className="w-3 h-3 mr-1.5" />
              {myProfile.role} Class Verified
           </div>

           <div className="space-y-4">
              <ButtonPrimary onClick={onClaim}>
                 Claim Score & Join Waitlist
              </ButtonPrimary>
           </div>
        </div>
     </div>
  </div>
);

const EmailCaptureView = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!email) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onSubmit(email);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6">
       <div className="max-w-md w-full animate-fadeIn text-center">
          <div className="mb-8 flex justify-center">
            <div className="p-4 bg-zinc-900 rounded-full border border-zinc-800">
               <Lock className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          
          <h2 className="text-2xl font-black text-white uppercase mb-2">Secure Your Spot</h2>
          <p className="text-zinc-400 text-sm mb-8 px-4">
             Your score qualifies you for the High-Signal Tier. Enter your email to lock your position on the ledger.
          </p>

          <div className="relative mb-4 text-left">
             <input 
               type="email" 
               value={email} 
               onChange={(e) => setEmail(e.target.value)}
               placeholder="founder@startup.com" 
               className="w-full bg-zinc-900 border border-zinc-700 text-white text-sm h-14 px-4 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 transition-all font-mono"
               autoFocus
             />
          </div>

          <ButtonPrimary onClick={handleSubmit} disabled={loading || !email}>
             {loading ? "Registering..." : "Complete Registration"}
          </ButtonPrimary>
       </div>
    </div>
  );
};

const DashboardView = ({ myProfile, email }) => {
  const [copied, setCopied] = useState(false);
  const referralLink = `forge.build/join/${email.split('@')[0]}-${myProfile.score}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Background FX */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600"></div>
      
      <div className="w-full max-w-md animate-slideUp">
         
         {/* Status Card */}
         <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10"><Flame className="w-24 h-24" /></div>
            
            <div className="flex justify-between items-start mb-6">
               <div>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Waitlist Position</p>
                  <h1 className="text-5xl font-black text-white tracking-tighter">#4,203</h1>
               </div>
               <div className="flex flex-col items-end">
                   <div className="px-2 py-1 bg-orange-950/30 border border-orange-500/20 rounded text-[10px] font-bold text-orange-500 uppercase mb-1">
                      Score: {myProfile.score}
                   </div>
                   <div className="px-2 py-1 bg-zinc-800 rounded text-[10px] font-bold text-zinc-400 uppercase">
                      Top 12%
                   </div>
               </div>
            </div>

            <div className="bg-zinc-950/50 rounded-lg p-4 border border-zinc-800/50 mb-2">
               <div className="flex items-start space-x-3">
                  <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                  <div>
                     <p className="text-xs font-bold text-white uppercase mb-1">Priority Access Locked</p>
                     <p className="text-[10px] text-zinc-400 leading-relaxed">
                        You are currently in the General Queue. To skip the line and get verified access within 48h, refer 3 high-signal founders.
                     </p>
                  </div>
               </div>
            </div>
         </div>

         {/* Referral Section */}
         <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold text-white uppercase flex items-center">
                   <Users className="w-4 h-4 mr-2 text-zinc-500" /> Referrals
                </h3>
                <span className="text-xs font-mono text-zinc-500">0 / 3 Verified</span>
             </div>

             <div className="flex space-x-2 mb-4">
                {[1, 2, 3].map((i) => (
                   <div key={i} className="h-2 flex-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-600 w-0"></div>
                   </div>
                ))}
             </div>

             <div className="relative group">
                <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-lg p-3 pr-28">
                   <Globe className="w-4 h-4 text-zinc-600 mr-3 shrink-0" />
                   <span className="text-xs text-zinc-400 font-mono truncate">{referralLink}</span>
                </div>
                <button 
                  onClick={copyLink}
                  className="absolute right-1 top-1 bottom-1 px-4 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold uppercase rounded-md transition-all flex items-center"
                >
                   {copied ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                   {copied ? "Copied" : "Copy"}
                </button>
             </div>
         </div>

         <div className="text-center space-y-4">
            <button className="w-full bg-[#1DA1F2] hover:bg-[#1a91da] text-white font-bold py-4 rounded-lg uppercase tracking-widest text-xs flex items-center justify-center transition-all shadow-lg">
               <Share2 className="w-4 h-4 mr-2" /> Share Score on Twitter
            </button>
            <p className="text-[10px] text-zinc-600 uppercase tracking-widest">Estimated Wait: 3 Weeks</p>
         </div>
      </div>
    </div>
  );
};

// --- MAIN CONTROLLER ---

export default function App() {
  const [view, setView] = useState('intro');
  const [userType, setUserType] = useState('builder');
  const [inputValue, setInputValue] = useState('');
  const [auditLogs, setAuditLogs] = useState([]);
  const [myProfile, setMyProfile] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  const startAudit = () => {
    if (!inputValue) return;
    setView('audit');
    let t = 0;
    const addLog = (text, color, delay) => {
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
        score: Math.floor(Math.random() * (98 - 85) + 85), // Random score between 85-98
        role: userType === 'builder' ? 'BUILDER' : 'OPERATOR'
      });
      setView('score');
    }, t + 1500);
  };

  const handleEmailSubmit = (email) => {
    setUserEmail(email);
    // In a real app, this is where you'd save to DB
    setView('dashboard');
  };

  return (
    <>
      {view === 'intro' && <IntroView onStart={() => setView('input')} />}
      {view === 'input' && <InputView userType={userType} setUserType={setUserType} inputValue={inputValue} setInputValue={setInputValue} onBack={() => setView('intro')} onAudit={startAudit} />}
      {view === 'audit' && <AuditView auditLogs={auditLogs} />}
      {view === 'score' && <ScoreRevealView myProfile={myProfile} onClaim={() => setView('email')} />}
      {view === 'email' && <EmailCaptureView onSubmit={handleEmailSubmit} />}
      {view === 'dashboard' && <DashboardView myProfile={myProfile} email={userEmail} />}
    </>
  );
}
