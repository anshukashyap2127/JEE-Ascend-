import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Flame, Target, BookOpen, AlertTriangle, CheckCircle2, Clock, Plus, X,
  BarChart3, RotateCcw, ChevronRight, Trash2, TrendingUp, Calendar as CalendarIcon,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell,
} from "recharts";

/* ---------------------------------- data ---------------------------------- */

const SUBJECTS = {
  Physics: [
    "Units & Measurements","Kinematics","Laws of Motion","Work, Energy & Power",
    "Rotational Motion","Gravitation","Solids & Elasticity","Fluid Mechanics",
    "Thermal Properties","Thermodynamics","Kinetic Theory of Gases","Oscillations",
    "Waves","Electrostatics","Current Electricity","Magnetic Effects of Current",
    "Magnetism & Matter","Electromagnetic Induction","Alternating Current",
    "EM Waves","Ray Optics","Wave Optics","Dual Nature of Matter","Atoms",
    "Nuclei","Semiconductor Electronics",
  ],
  Chemistry: [
    "Mole Concept","Structure of Atom","Periodicity","Chemical Bonding",
    "States of Matter","Thermodynamics","Equilibrium","Redox Reactions",
    "Hydrogen","s-Block Elements","p-Block (13-14)","GOC & Isomerism",
    "Hydrocarbons","Solid State","Solutions","Electrochemistry",
    "Chemical Kinetics","Surface Chemistry","p-Block (15-18)","d & f Block",
    "Coordination Compounds","Haloalkanes & Haloarenes","Alcohols, Phenols & Ethers",
    "Aldehydes, Ketones & Acids","Amines","Biomolecules & Polymers",
  ],
  Mathematics: [
    "Sets, Relations & Functions","Complex Numbers","Quadratic Equations",
    "Sequences & Series","Permutations & Combinations","Binomial Theorem",
    "Matrices & Determinants","Trigonometry","Straight Lines","Circles",
    "Conic Sections","Limits, Continuity & Differentiability",
    "Applications of Derivatives","Integral Calculus","Differential Equations",
    "Vectors & 3D Geometry","Probability & Statistics",
  ],
};

const REVISION_INTERVALS = [1, 3, 7, 15, 30, 60, 120];
const MISTAKE_TYPES = ["Silly Mistake", "Conceptual Gap", "Guesswork", "Time Management"];
const SUBJECT_COLOR = { Physics: "var(--blue)", Chemistry: "var(--green)", Mathematics: "var(--amber)" };
const STORAGE_KEY = "jee-ascend-data-v1";

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function addDays(dateStr, days) {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function daysBetween(a, b) {
  const d1 = new Date(a + "T00:00:00");
  const d2 = new Date(b + "T00:00:00");
  return Math.round((d2 - d1) / 86400000);
}

function defaultChapter(name) {
  return {
    id: makeId("ch"),
    name,
    lecture: false,
    notes: false,
    dpp: false,
    pyqMain: false,
    pyqAdv: false,
    questionsSolved: 0,
    accuracy: 0,
    confidence: 3,
    revisionCount: 0,
    lastRevised: null,
  };
}

function defaultState() {
  const subjects = {};
  Object.entries(SUBJECTS).forEach(([subject, chapters]) => {
    subjects[subject] = chapters.map(defaultChapter);
  });
  return {
    targetDate: "2027-01-01",
    streak: 0,
    lastStudyDate: null,
    studyLog: {},
    subjects,
    mistakes: [],
  };
}

function nextRevisionDate(chapter) {
  if (!chapter.lecture) return null;
  if (!chapter.lastRevised) return todayStr();
  const idx = Math.min(chapter.revisionCount, REVISION_INTERVALS.length - 1);
  return addDays(chapter.lastRevised, REVISION_INTERVALS[idx]);
}

function revisionStatus(chapter) {
  const next = nextRevisionDate(chapter);
  if (!next) return "not-started";
  const diff = daysBetween(todayStr(), next);
  if (diff < 0) return "overdue";
  if (diff === 0) return "due-today";
  if (diff <= 3) return "upcoming";
  return "scheduled";
}

const STATUS_META = {
  "not-started": { label: "Not started", color: "var(--text-dim)" },
  overdue: { label: "Overdue", color: "var(--red)" },
  "due-today": { label: "Due today", color: "var(--amber)" },
  upcoming: { label: "Upcoming", color: "var(--blue)" },
  scheduled: { label: "Scheduled", color: "var(--green)" },
};

function chapterCompletion(ch) {
  const flags = [ch.lecture, ch.notes, ch.dpp, ch.pyqMain, ch.pyqAdv];
  return (flags.filter(Boolean).length / flags.length) * 100;
}

/* ------------------------------- small pieces ------------------------------ */

function Ring({ pct, size = 96, stroke = 9, color = "var(--blue)", label, sub }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.max(0, Math.min(100, pct)) / 100) * c;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--surface2)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none"
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div className="font-disp" style={{ fontSize: size * 0.22, fontWeight: 700, color: "var(--text)", lineHeight: 1 }}>{label}</div>
        {sub && <div style={{ fontSize: size * 0.1, color: "var(--text-dim)", marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, accent }) {
  return (
    <div className="panel" style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-dim)" }}>
        <Icon size={15} color={accent || "var(--text-dim)"} />
        <span style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</span>
      </div>
      <div className="font-disp" style={{ fontSize: 26, fontWeight: 700, color: "var(--text)" }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: "var(--text-dim)" }}>{sub}</div>}
    </div>
  );
}

function Pill({ active, onClick, children, color }) {
  return (
    <button
      onClick={onClick}
      className="pill"
      style={{
        background: active ? (color || "var(--blue)") : "var(--surface2)",
        color: active ? "#0B0D12" : "var(--text)",
        fontWeight: active ? 700 : 500,
      }}
    >
      {children}
    </button>
  );
}

/* ---------------------------------- app ------------------------------------ */

export default function JEEAscend() {
  const [state, setState] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState("dashboard");
  const [activeSubject, setActiveSubject] = useState("Physics");
  const [openChapter, setOpenChapter] = useState(null); // {subject, id}
  const [hoursInput, setHoursInput] = useState("");
  const [mistakeForm, setMistakeForm] = useState({ subject: "Physics", chapter: "", type: MISTAKE_TYPES[0], note: "" });
  const [saveError, setSaveError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get(STORAGE_KEY, false);
        setState(res && res.value ? JSON.parse(res.value) : defaultState());
      } catch {
        setState(defaultState());
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!loaded || !state) return;
    (async () => {
      try {
        const ok = await window.storage.set(STORAGE_KEY, JSON.stringify(state), false);
        setSaveError(!ok);
      } catch {
        setSaveError(true);
      }
    })();
  }, [state, loaded]);

  const updateChapter = useCallback((subject, id, patch) => {
    setState((prev) => ({
      ...prev,
      subjects: {
        ...prev.subjects,
        [subject]: prev.subjects[subject].map((c) => (c.id === id ? { ...c, ...patch } : c)),
      },
    }));
  }, []);

  const markRevised = useCallback((subject, id) => {
    setState((prev) => ({
      ...prev,
      subjects: {
        ...prev.subjects,
        [subject]: prev.subjects[subject].map((c) =>
          c.id === id ? { ...c, lastRevised: todayStr(), revisionCount: c.revisionCount + 1 } : c
        ),
      },
    }));
  }, []);

  const logHours = useCallback(() => {
    const val = parseFloat(hoursInput);
    if (!val || val <= 0) return;
    setState((prev) => {
      const today = todayStr();
      const prevHours = prev.studyLog[today] || 0;
      const yesterday = addDays(today, -1);
      let streak = prev.streak;
      if (prev.lastStudyDate !== today) {
        streak = prev.lastStudyDate === yesterday ? prev.streak + 1 : 1;
      }
      return {
        ...prev,
        studyLog: { ...prev.studyLog, [today]: prevHours + val },
        lastStudyDate: today,
        streak,
      };
    });
    setHoursInput("");
  }, [hoursInput]);

  const addMistake = useCallback(() => {
    if (!mistakeForm.note.trim() || !mistakeForm.chapter) return;
    setState((prev) => ({
      ...prev,
      mistakes: [
        { id: makeId("mk"), ...mistakeForm, date: todayStr(), fixed: false },
        ...prev.mistakes,
      ],
    }));
    setMistakeForm((f) => ({ ...f, note: "" }));
  }, [mistakeForm]);

  const toggleMistakeFixed = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      mistakes: prev.mistakes.map((m) => (m.id === id ? { ...m, fixed: !m.fixed } : m)),
    }));
  }, []);

  const deleteMistake = useCallback((id) => {
    setState((prev) => ({ ...prev, mistakes: prev.mistakes.filter((m) => m.id !== id) }));
  }, []);

  const allChapters = useMemo(() => {
    if (!state) return [];
    return Object.entries(state.subjects).flatMap(([subject, chs]) => chs.map((c) => ({ ...c, subject })));
  }, [state]);

  const overallPct = useMemo(() => {
    if (!allChapters.length) return 0;
    return allChapters.reduce((sum, c) => sum + chapterCompletion(c), 0) / allChapters.length;
  }, [allChapters]);

  const subjectPct = useMemo(() => {
    const out = {};
    if (!state) return out;
    Object.entries(state.subjects).forEach(([s, chs]) => {
      out[s] = chs.length ? chs.reduce((sum, c) => sum + chapterCompletion(c), 0) / chs.length : 0;
    });
    return out;
  }, [state]);

  const revisionBuckets = useMemo(() => {
    const buckets = { overdue: [], "due-today": [], upcoming: [] };
    allChapters.forEach((c) => {
      const st = revisionStatus(c);
      if (buckets[st]) buckets[st].push(c);
    });
    return buckets;
  }, [allChapters]);

  const weakChapters = useMemo(
    () => allChapters.filter((c) => c.questionsSolved > 0 && c.accuracy < 60).sort((a, b) => a.accuracy - b.accuracy),
    [allChapters]
  );
  const strongChapters = useMemo(
    () => allChapters.filter((c) => c.questionsSolved > 0 && c.accuracy >= 85).sort((a, b) => b.accuracy - a.accuracy),
    [allChapters]
  );

  const weeklyChartData = useMemo(() => {
    if (!state) return [];
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = addDays(todayStr(), -i);
      const label = new Date(d + "T00:00:00").toLocaleDateString("en-US", { weekday: "short" });
      days.push({ day: label, hours: Math.round((state.studyLog[d] || 0) * 10) / 10 });
    }
    return days;
  }, [state]);

  const daysUntilJEE = state ? daysBetween(todayStr(), state.targetDate) : 0;

  if (!loaded || !state) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 400, color: "var(--text-dim)", fontFamily: "Inter, sans-serif" }}>
        Loading JEE Ascend…
      </div>
    );
  }

  const openCh = openChapter ? state.subjects[openChapter.subject].find((c) => c.id === openChapter.id) : null;

  return (
    <div className="jee-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');
        .jee-root {
          --bg: #0B0D12;
          --surface: #12151C;
          --surface2: #1B1F29;
          --border: #262B36;
          --text: #EDEFF4;
          --text-dim: #8992A6;
          --blue: #4C8DFF;
          --green: #34D399;
          --amber: #F5B942;
          --red: #F0576B;
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', sans-serif;
          border-radius: 16px;
          padding: 20px;
          min-height: 100%;
        }
        .jee-root .font-disp { font-family: 'Space Grotesk', sans-serif; }
        .jee-root .panel {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
        }
        .jee-root .pill {
          border: none;
          border-radius: 999px;
          padding: 7px 16px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.15s ease;
          font-family: 'Inter', sans-serif;
        }
        .jee-root .navtab {
          border: none;
          background: transparent;
          color: var(--text-dim);
          font-size: 13px;
          font-weight: 600;
          padding: 9px 14px;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.15s ease;
          white-space: nowrap;
        }
        .jee-root .navtab.active { background: var(--surface2); color: var(--text); }
        .jee-root .navtab:hover:not(.active) { color: var(--text); }
        .jee-root input, .jee-root select, .jee-root textarea {
          background: var(--surface2);
          border: 1px solid var(--border);
          color: var(--text);
          border-radius: 8px;
          padding: 8px 10px;
          font-size: 13px;
          font-family: 'Inter', sans-serif;
          outline: none;
        }
        .jee-root input:focus, .jee-root select:focus, .jee-root textarea:focus { border-color: var(--blue); }
        .jee-root button.solid {
          border: none; border-radius: 8px; padding: 8px 14px; font-size: 13px;
          font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif;
        }
        .jee-root .chapcard {
          background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
          padding: 14px; cursor: pointer; transition: border-color 0.15s ease;
        }
        .jee-root .chapcard:hover { border-color: var(--blue); }
        .jee-root .check {
          width: 20px; height: 20px; border-radius: 5px; border: 1.5px solid var(--border);
          display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0;
        }
        .jee-root .scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
        .jee-root .scrollbar::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
        .jee-root *:focus-visible { outline: 2px solid var(--blue); outline-offset: 2px; }
      `}</style>

      {/* header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
        <div>
          <div className="font-disp" style={{ fontSize: 22, fontWeight: 700 }}>JEE Ascend</div>
          <div style={{ fontSize: 12, color: "var(--text-dim)" }}>Systems, not motivation.</div>
        </div>
        <div style={{ display: "flex", gap: 6, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 4, overflowX: "auto" }} className="scrollbar">
          {[
            ["dashboard", "Dashboard", Target],
            ["subjects", "Subjects", BookOpen],
            ["mistakes", "Mistake Book", AlertTriangle],
            ["analytics", "Analytics", BarChart3],
          ].map(([key, label, Icon]) => (
            <button key={key} className={`navtab ${tab === key ? "active" : ""}`} onClick={() => setTab(key)}>
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>
      </div>

      {saveError && (
        <div style={{ marginBottom: 14, padding: "8px 12px", borderRadius: 8, background: "rgba(240,87,107,0.12)", color: "var(--red)", fontSize: 12 }}>
          Couldn't save your last change — it may not persist. Try again in a moment.
        </div>
      )}

      {/* -------- DASHBOARD -------- */}
      {tab === "dashboard" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
            <div className="panel" style={{ padding: 16, display: "flex", alignItems: "center", gap: 14 }}>
              <Ring pct={overallPct} label={`${Math.round(overallPct)}%`} sub="complete" color="var(--blue)" />
              <div>
                <div style={{ fontSize: 12, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Overall progress</div>
                <div className="font-disp" style={{ fontSize: 15, fontWeight: 600, marginTop: 4 }}>{allChapters.filter(c => c.lecture).length} / {allChapters.length} chapters started</div>
              </div>
            </div>
            <StatCard icon={CalendarIcon} label="Days until JEE" value={daysUntilJEE >= 0 ? daysUntilJEE : "—"} sub={state.targetDate} accent="var(--red)" />
            <StatCard icon={Flame} label="Streak" value={`${state.streak} ${state.streak === 1 ? "day" : "days"}`} sub={state.lastStudyDate === todayStr() ? "logged today" : "log today's hours"} accent="var(--amber)" />
            <StatCard icon={Clock} label="Pending revisions" value={revisionBuckets.overdue.length + revisionBuckets["due-today"].length} sub={`${revisionBuckets.overdue.length} overdue`} accent="var(--red)" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
            {Object.entries(subjectPct).map(([s, pct]) => (
              <div key={s} className="panel" style={{ padding: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{s}</span>
                  <span style={{ fontSize: 13, color: SUBJECT_COLOR[s] }}>{Math.round(pct)}%</span>
                </div>
                <div style={{ height: 6, background: "var(--surface2)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: SUBJECT_COLOR[s], transition: "width 0.4s ease" }} />
                </div>
              </div>
            ))}
          </div>

          <div className="panel" style={{ padding: 16, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, color: "var(--text-dim)" }}>Log today's study hours</span>
            <input type="number" step="0.5" min="0" placeholder="e.g. 3.5" value={hoursInput} onChange={(e) => setHoursInput(e.target.value)} style={{ width: 90 }} />
            <button className="solid" style={{ background: "var(--blue)", color: "#0B0D12" }} onClick={logHours}>Add</button>
            <span style={{ fontSize: 12, color: "var(--text-dim)", marginLeft: "auto" }}>Today logged: {(state.studyLog[todayStr()] || 0).toFixed(1)}h</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 12 }}>
            <div className="panel" style={{ padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>This week</div>
              <div style={{ width: "100%", height: 160 }}>
                <ResponsiveContainer>
                  <BarChart data={weeklyChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="day" stroke="var(--text-dim)" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--text-dim)" fontSize={11} tickLine={false} axisLine={false} width={24} />
                    <Tooltip contentStyle={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="hours" fill="var(--blue)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="panel" style={{ padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Due for revision</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 190, overflowY: "auto" }} className="scrollbar">
                {[...revisionBuckets.overdue, ...revisionBuckets["due-today"]].slice(0, 8).map((c) => {
                  const st = revisionStatus(c);
                  return (
                    <div key={c.id} onClick={() => setOpenChapter({ subject: c.subject, id: c.id })} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: STATUS_META[st].color, flexShrink: 0 }} />
                      <span style={{ fontSize: 12.5, flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</span>
                      <span style={{ fontSize: 11, color: "var(--text-dim)" }}>{c.subject}</span>
                    </div>
                  );
                })}
                {revisionBuckets.overdue.length + revisionBuckets["due-today"].length === 0 && (
                  <div style={{ fontSize: 12.5, color: "var(--text-dim)" }}>Nothing due — mark chapters as started to begin the revision cycle.</div>
                )}
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="panel" style={{ padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: "var(--red)" }}>Weak chapters</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {weakChapters.slice(0, 8).map((c) => (
                  <span key={c.id} style={{ fontSize: 11.5, padding: "4px 9px", borderRadius: 999, background: "rgba(240,87,107,0.12)", color: "var(--red)" }}>{c.name} · {c.accuracy}%</span>
                ))}
                {weakChapters.length === 0 && <span style={{ fontSize: 12.5, color: "var(--text-dim)" }}>None yet — log accuracy on chapters to see weak spots.</span>}
              </div>
            </div>
            <div className="panel" style={{ padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: "var(--green)" }}>Strong chapters</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {strongChapters.slice(0, 8).map((c) => (
                  <span key={c.id} style={{ fontSize: 11.5, padding: "4px 9px", borderRadius: 999, background: "rgba(52,211,153,0.12)", color: "var(--green)" }}>{c.name} · {c.accuracy}%</span>
                ))}
                {strongChapters.length === 0 && <span style={{ fontSize: 12.5, color: "var(--text-dim)" }}>None yet.</span>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------- SUBJECTS -------- */}
      {tab === "subjects" && (
        <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            {Object.keys(SUBJECTS).map((s) => (
              <Pill key={s} active={activeSubject === s} onClick={() => setActiveSubject(s)} color={SUBJECT_COLOR[s]}>{s}</Pill>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 10 }}>
            {state.subjects[activeSubject].map((c) => {
              const pct = chapterCompletion(c);
              const st = revisionStatus(c);
              return (
                <div key={c.id} className="chapcard" onClick={() => setOpenChapter({ subject: activeSubject, id: c.id })}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{c.name}</span>
                    <ChevronRight size={15} color="var(--text-dim)" style={{ flexShrink: 0 }} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
                    <div style={{ flex: 1, height: 5, background: "var(--surface2)", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: SUBJECT_COLOR[activeSubject] }} />
                    </div>
                    <span style={{ fontSize: 11, color: "var(--text-dim)" }}>{Math.round(pct)}%</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                    <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 999, color: STATUS_META[st].color, background: `${STATUS_META[st].color}20` }}>{STATUS_META[st].label}</span>
                    {c.questionsSolved > 0 && <span style={{ fontSize: 11, color: "var(--text-dim)" }}>{c.accuracy}% acc</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* -------- MISTAKE BOOK -------- */}
      {tab === "mistakes" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="panel" style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Log a mistake</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <select value={mistakeForm.subject} onChange={(e) => setMistakeForm((f) => ({ ...f, subject: e.target.value, chapter: "" }))}>
                {Object.keys(SUBJECTS).map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <select value={mistakeForm.chapter} onChange={(e) => setMistakeForm((f) => ({ ...f, chapter: e.target.value }))} style={{ minWidth: 160 }}>
                <option value="">Select chapter…</option>
                {SUBJECTS[mistakeForm.subject].map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <select value={mistakeForm.type} onChange={(e) => setMistakeForm((f) => ({ ...f, type: e.target.value }))}>
                {MISTAKE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <textarea rows={2} placeholder="What went wrong, and the correct concept…" value={mistakeForm.note} onChange={(e) => setMistakeForm((f) => ({ ...f, note: e.target.value }))} />
            <button className="solid" style={{ background: "var(--blue)", color: "#0B0D12", alignSelf: "flex-start" }} onClick={addMistake}>
              <Plus size={14} style={{ marginRight: 4, verticalAlign: "-2px" }} />Add mistake
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {state.mistakes.length === 0 && <div style={{ fontSize: 13, color: "var(--text-dim)", padding: 8 }}>No mistakes logged yet — this fills in as you review tests and DPPs.</div>}
            {state.mistakes.map((m) => (
              <div key={m.id} className="panel" style={{ padding: 12, display: "flex", gap: 10, alignItems: "flex-start" }}>
                <button className="check" onClick={() => toggleMistakeFixed(m.id)} style={{ marginTop: 2, background: m.fixed ? "var(--green)" : "transparent", borderColor: m.fixed ? "var(--green)" : "var(--border)" }}>
                  {m.fixed && <CheckCircle2 size={13} color="#0B0D12" />}
                </button>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: SUBJECT_COLOR[m.subject] }}>{m.subject}</span>
                    <span style={{ fontSize: 12, color: "var(--text-dim)" }}>{m.chapter}</span>
                    <span style={{ fontSize: 11, padding: "2px 7px", borderRadius: 999, background: "var(--surface2)", color: "var(--text-dim)" }}>{m.type}</span>
                    <span style={{ fontSize: 11, color: "var(--text-dim)", marginLeft: "auto" }}>{m.date}</span>
                  </div>
                  <div style={{ fontSize: 13, color: m.fixed ? "var(--text-dim)" : "var(--text)", textDecoration: m.fixed ? "line-through" : "none" }}>{m.note}</div>
                </div>
                <button onClick={() => deleteMistake(m.id)} style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4 }}>
                  <Trash2 size={14} color="var(--text-dim)" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* -------- ANALYTICS -------- */}
      {tab === "analytics" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="panel" style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Subject completion</div>
            {Object.entries(subjectPct).map(([s, pct]) => (
              <div key={s} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 4 }}>
                  <span>{s}</span><span style={{ color: "var(--text-dim)" }}>{Math.round(pct)}%</span>
                </div>
                <div style={{ height: 8, background: "var(--surface2)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: SUBJECT_COLOR[s] }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="panel" style={{ padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Revision pipeline</div>
              <div style={{ width: "100%", height: 180 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Overdue", value: revisionBuckets.overdue.length, color: "var(--red)" },
                        { name: "Due today", value: revisionBuckets["due-today"].length, color: "var(--amber)" },
                        { name: "Upcoming", value: revisionBuckets.upcoming.length, color: "var(--blue)" },
                        { name: "Not due", value: Math.max(0, allChapters.filter(c => c.lecture).length - revisionBuckets.overdue.length - revisionBuckets["due-today"].length - revisionBuckets.upcoming.length), color: "var(--green)" },
                      ]}
                      dataKey="value" nameKey="name" innerRadius={40} outerRadius={70} paddingAngle={2}
                    >
                      {[
                        "var(--red)", "var(--amber)", "var(--blue)", "var(--green)",
                      ].map((c, i) => <Cell key={i} fill={c} stroke="var(--surface)" />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="panel" style={{ padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Hours this week</div>
              <div style={{ width: "100%", height: 180 }}>
                <ResponsiveContainer>
                  <BarChart data={weeklyChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="day" stroke="var(--text-dim)" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--text-dim)" fontSize={11} tickLine={false} axisLine={false} width={24} />
                    <Tooltip contentStyle={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="hours" fill="var(--green)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="panel" style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Mistake breakdown</div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {MISTAKE_TYPES.map((t) => {
                const count = state.mistakes.filter((m) => m.type === t).length;
                return (
                  <div key={t} style={{ textAlign: "center" }}>
                    <div className="font-disp" style={{ fontSize: 22, fontWeight: 700 }}>{count}</div>
                    <div style={{ fontSize: 11, color: "var(--text-dim)" }}>{t}</div>
                  </div>
                );
              })}
              <div style={{ textAlign: "center" }}>
                <div className="font-disp" style={{ fontSize: 22, fontWeight: 700, color: "var(--green)" }}>{state.mistakes.filter(m => m.fixed).length}</div>
                <div style={{ fontSize: 11, color: "var(--text-dim)" }}>Fixed</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------- CHAPTER MODAL -------- */}
      {openCh && (
        <div
          onClick={() => setOpenChapter(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 16 }}
        >
          <div onClick={(e) => e.stopPropagation()} className="panel" style={{ width: "min(480px, 100%)", maxHeight: "85vh", overflowY: "auto", padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
              <div>
                <div style={{ fontSize: 11, color: SUBJECT_COLOR[openChapter.subject], fontWeight: 600 }}>{openChapter.subject}</div>
                <div className="font-disp" style={{ fontSize: 17, fontWeight: 700 }}>{openCh.name}</div>
              </div>
              <button onClick={() => setOpenChapter(null)} style={{ background: "transparent", border: "none", cursor: "pointer" }}>
                <X size={18} color="var(--text-dim)" />
              </button>
            </div>

            <div style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 10, marginBottom: 8 }}>Progress checklist</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
              {[["lecture", "Lecture"], ["notes", "Notes"], ["dpp", "DPP"], ["pyqMain", "PYQ – Main"], ["pyqAdv", "PYQ – Advanced"]].map(([key, label]) => (
                <label key={key} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer" }}>
                  <span className="check" style={{ background: openCh[key] ? "var(--blue)" : "transparent", borderColor: openCh[key] ? "var(--blue)" : "var(--border)" }}
                    onClick={() => updateChapter(openChapter.subject, openCh.id, { [key]: !openCh[key] })}>
                    {openCh[key] && <CheckCircle2 size={13} color="#0B0D12" />}
                  </span>
                  {label}
                </label>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              <label style={{ fontSize: 12, color: "var(--text-dim)" }}>
                Questions solved
                <input type="number" min="0" value={openCh.questionsSolved} onChange={(e) => updateChapter(openChapter.subject, openCh.id, { questionsSolved: Number(e.target.value) })} style={{ width: "100%", marginTop: 4 }} />
              </label>
              <label style={{ fontSize: 12, color: "var(--text-dim)" }}>
                Accuracy (%)
                <input type="number" min="0" max="100" value={openCh.accuracy} onChange={(e) => updateChapter(openChapter.subject, openCh.id, { accuracy: Math.min(100, Number(e.target.value)) })} style={{ width: "100%", marginTop: 4 }} />
              </label>
            </div>

            <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 6 }}>Confidence: {openCh.confidence}/5</div>
            <input type="range" min="1" max="5" value={openCh.confidence} onChange={(e) => updateChapter(openChapter.subject, openCh.id, { confidence: Number(e.target.value) })} style={{ width: "100%", marginBottom: 16, accentColor: "var(--blue)" }} />

            <div className="panel" style={{ padding: 12, background: "var(--surface2)", border: "none", marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12.5 }}>
                <span style={{ color: "var(--text-dim)" }}>Revision cycle</span>
                <span style={{ color: STATUS_META[revisionStatus(openCh)].color, fontWeight: 600 }}>{STATUS_META[revisionStatus(openCh)].label}</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 6 }}>
                Round {openCh.revisionCount} done{openCh.lastRevised ? ` · last on ${openCh.lastRevised}` : ""}
                {nextRevisionDate(openCh) && ` · next due ${nextRevisionDate(openCh)}`}
              </div>
            </div>

            <button className="solid" style={{ background: "var(--green)", color: "#0B0D12", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }} onClick={() => markRevised(openChapter.subject, openCh.id)}>
              <RotateCcw size={14} /> Mark revised today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
