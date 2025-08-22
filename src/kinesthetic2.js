import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Rocket, Pause, Play, RefreshCw, Info, TimerReset, Target } from "lucide-react";

// ⭐️ Solar System Quest — single-file React game interface
// TailwindCSS + framer-motion + shadcn/ui
// All graphics are CSS gradients — no external assets.

const PLANETS = [
  { id: "mercury", name: "Mercury", color: "from-stone-400 to-stone-300", size: 12, radius: 40, period: 8, hint: "Closest planet to the Sun." },
  { id: "venus", name: "Venus", color: "from-amber-400 to-yellow-300", size: 16, radius: 60, period: 12, hint: "Earth's hot twin." },
  { id: "earth", name: "Earth", color: "from-sky-400 to-emerald-400", size: 18, radius: 80, period: 15, hint: "The blue marble." },
  { id: "mars", name: "Mars", color: "from-red-500 to-orange-500", size: 14, radius: 100, period: 20, hint: "The red planet." },
  { id: "jupiter", name: "Jupiter", color: "from-orange-300 to-amber-600", size: 28, radius: 130, period: 28, hint: "The gas giant with a big storm." },
  { id: "saturn", name: "Saturn", color: "from-yellow-300 to-amber-400", size: 24, radius: 160, period: 34, hint: "Famous for its rings." },
  { id: "uranus", name: "Uranus", color: "from-cyan-300 to-sky-300", size: 20, radius: 185, period: 40, hint: "An ice giant that spins on its side." },
  { id: "neptune", name: "Neptune", color: "from-blue-500 to-indigo-600", size: 20, radius: 210, period: 46, hint: "The windy blue giant." },
];

const FACTS = {
  mercury: ["No atmosphere to speak of.", "Extreme temperature swings."],
  venus: ["Hottest planet due to greenhouse effect.", "Rotates backwards (retrograde)."],
  earth: ["Only known planet with life.", "71% covered by oceans."],
  mars: ["Home to Olympus Mons, tallest volcano.", "Appears red due to iron oxide."],
  jupiter: ["Largest planet in the Solar System.", "Great Red Spot is a giant storm."],
  saturn: ["Spectacular ring system.", "Less dense than water."],
  uranus: ["Axis tilt ~98° (it rolls!).", "Faint ring system."],
  neptune: ["Strongest winds recorded.", "Deep blue due to methane."],
};

function useCountdown(active, key, seconds, onComplete) {
  const [time, setTime] = useState(seconds);
  const saved = useRef({ onComplete, seconds });
  useEffect(() => { saved.current = { onComplete, seconds }; }, [onComplete, seconds]);
  useEffect(() => setTime(seconds), [key, seconds]);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(id);
          saved.current.onComplete?.();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [active, key]);
  return time;
}

function Planet({ data, paused, onClick, focused }) {
  const sizePx = data.size;
  const orbitStyle = {
    width: data.radius * 2,
    height: data.radius * 2,
  };
  const duration = data.period;
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Orbit ring */}
      <div
        className="rounded-full border border-white/20"
        style={orbitStyle}
      />
      {/* Planet container */}
      <motion.button
        aria-label={data.name}
        title={data.name}
        onClick={() => onClick?.(data)}
        className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 rounded-full focus:outline-none focus:ring-2 focus:ring-white/70`}        
        style={{ width: sizePx, height: sizePx }}
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: duration, pause: paused }}
      >
        <span
          className={`block w-full h-full rounded-full bg-gradient-to-br ${data.color} shadow-[0_0_12px_rgba(255,255,255,0.4)]`}
        />
        {/* Decorative ring for Saturn */}
        {data.id === "saturn" && (
          <span className="absolute inset-0 -rotate-12 pointer-events-none">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[40%] rounded-full border border-amber-200/60" />
          </span>
        )}
      </motion.button>
    </div>
  );
}

export default function SolarSystemGame() {
  // Game State
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [energy, setEnergy] = useState(3);
  const [roundKey, setRoundKey] = useState(0);
  const [target, setTarget] = useState(null);
  const [showInfo, setShowInfo] = useState(null);
  const [message, setMessage] = useState("");

  // Mission queue
  const order = useMemo(() => PLANETS.map(p => p.id), []);
  const Icon = paused ? Play : Pause;
  const remaining = useMemo(() => order.filter(id => id !== target?.id), [order, target]);

  // Timer per mission
  const timeLeft = useCountdown(started && !paused && !!target, roundKey, 20, () => {
    setEnergy(e => Math.max(0, e - 1));
    setMessage("⏳ Time's up! New mission issued.");
    nextMission();
  });

  function startGame() {
    setScore(0);
    setEnergy(3);
    setStarted(true);
    setPaused(false);
    setMessage("");
    nextMission(true);
  }

  function pauseToggle() {
    if (!started) return;
    setPaused(p => !p);
  }

  function nextMission(reset=false) {
    const pool = reset ? PLANETS : PLANETS.filter(p => p.id !== target?.id);
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setTarget(pick);
    setRoundKey(k => k + 1);
  }

  function handlePlanetClick(p) {
    if (!started || paused) return;
    if (!target) return;
    if (p.id === target.id) {
      setScore(s => s + 100);
      setMessage(`✅ Correct! You found ${p.name}.`);
      nextMission();
    } else {
      setEnergy(e => Math.max(0, e - 1));
      setMessage(`❌ That's ${p.name}. Look for ${target.name}.`);
    }
  }

  // End condition
  const gameOver = energy <= 0;

  useEffect(() => {
    if (gameOver) {
      setStarted(false);
      setPaused(true);
      setMessage("💥 Ship energy depleted. Game Over.");
    }
  }, [gameOver]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-indigo-900 via-slate-900 to-black text-white p-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[360px,1fr] gap-6">
        {/* Sidebar / HUD */}
        <div className="space-y-4">
          <Card className="bg-white/5 border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-white">
                <Rocket className="w-5 h-5" /> Solar System Quest
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm opacity-90">
                <span className="flex items-center gap-2"><Trophy className="w-4 h-4"/>Score</span>
                <span className="font-semibold">{score}</span>
              </div>
              <div className="flex items-center justify-between text-sm opacity-90">
                <span className="flex items-center gap-2"><TimerReset className="w-4 h-4"/>Time</span>
                <span className="font-semibold">{started && !paused && target ? timeLeft : "—"}s</span>
              </div>
              <div className="text-sm opacity-90 flex items-center justify-between">
                <span>Energy</span>
                <div className="w-40"><Progress value={(energy/3)*100} /></div>
              </div>
              <div className="text-sm opacity-90 flex items-center justify-between">
                <span className="flex items-center gap-2"><Target className="w-4 h-4"/>Mission</span>
                <span className="font-semibold truncate max-w-[180px]">{target ? `Scan ${target.name}` : "—"}</span>
              </div>
              <div className="flex gap-2 pt-2">
                {!started ? (
                  <Button className="w-full" onClick={startGame}><Play className="w-4 h-4 mr-2"/>Start</Button>
                ) : (
                  <>
                   const Icon = paused ? Play : Pause;
                    <Button variant="secondary" onClick={pauseToggle}>
                      <Icon className="w-4 h-4 mr-2" />
                              {paused ? "Resume" : "Pause"}
                    </Button>

                    <Button variant="destructive" onClick={() => setStarted(false)}><RefreshCw className="w-4 h-4 mr-2"/>Stop</Button>
                    <Button onClick={startGame}><RefreshCw className="w-4 h-4 mr-2"/>Restart</Button>
                  </>
                )}
              </div>
              <p className="text-xs text-white/70 min-h-[1.5rem]">{message}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm">Click a planet to learn more</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              {PLANETS.map(p => (
                <Button key={p.id} variant="outline" className="justify-start bg-white/10 border-white/20 text-white" onClick={() => setShowInfo(p.id)}>
                  <span className={`inline-block w-3 h-3 rounded-full bg-gradient-to-br ${p.color} mr-2`} />{p.name}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Game Board */}
        <Card className="relative bg-gradient-to-b from-slate-900/70 to-black/70 border-white/10 overflow-hidden">
          <CardHeader className="pb-0">
            <CardTitle className="text-white flex items-center gap-2">
              <Info className="w-5 h-5"/> {started ? (gameOver ? "Game Over" : `Find: ${target?.name ?? "—"}`) : "Press Start to Begin"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative mx-auto my-6 w-[520px] h-[520px] max-w-full max-h-[70vh] aspect-square">
              {/* Starfield background */}
              <div className="absolute inset-0 bg-[radial-gradient(transparent,rgba(0,0,0,0.8))]"/>

              {/* Sun */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-500 shadow-[0_0_30px_rgba(255,200,50,0.9)]"/>

              {/* Planets */}
              {PLANETS.map(p => (
                <Planet key={p.id} data={p} paused={paused || !started} onClick={(d)=>{handlePlanetClick(d); setShowInfo(d.id);}} />
              ))}

              {/* Floating hint */}
              <AnimatePresence>
                {started && !paused && target && (
                  <motion.div
                    key={target.id}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute left-1/2 -translate-x-1/2 top-3 text-center text-white/80 text-sm"
                  >
                    Hint: {PLANETS.find(p=>p.id===target.id)?.hint}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Planet Info Modal */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowInfo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-slate-900/90 border border-white/10 rounded-2xl p-5 text-white shadow-2xl"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span className={`inline-block w-3 h-3 rounded-full bg-gradient-to-br ${PLANETS.find(p=>p.id===showInfo)?.color}`} />
                  {PLANETS.find(p=>p.id===showInfo)?.name}
                </h3>
                <Button variant="ghost" className="text-white" onClick={()=>setShowInfo(null)}>Close</Button>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {FACTS[showInfo]?.map((f, i) => (
                  <li key={i} className="text-white/90">{f}</li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
