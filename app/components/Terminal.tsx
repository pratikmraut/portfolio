"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type TerminalEntry = {
  id: number;
  kind: "command" | "output" | "error";
  text: string;
};

const navigationCommands: Record<string, { target: string; message: string }> = {
  impact: { target: "impact", message: "Opening measured outcomes..." },
  experience: { target: "experience", message: "Opening production history..." },
  projects: { target: "projects", message: "Opening selected repositories..." },
  skills: { target: "stack", message: "Reading technical manifest..." },
  stack: { target: "stack", message: "Reading technical manifest..." },
  achievements: { target: "credentials", message: "Tailing achievement log..." },
  contact: { target: "contact", message: "Starting contact script..." },
};

const quickCommands = ["help", "impact", "experience", "projects", "skills", "status"];
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

export function Terminal() {
  const [input, setInput] = useState("");
  const [entries, setEntries] = useState<TerminalEntry[]>([
    { id: 1, kind: "output", text: "PRATIK_OS v1.0.0 · secure session established" },
    { id: 2, kind: "output", text: "Type 'help' to inspect available commands." },
  ]);
  const nextId = useRef(3);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [entries]);

  const append = (kind: TerminalEntry["kind"], text: string) => {
    setEntries((current) =>
      [...current, { id: nextId.current++, kind, text }].slice(-50),
    );
  };

  const runCommand = async (rawCommand: string) => {
    const command = rawCommand.trim().toLowerCase();
    if (!command) return;

    append("command", command);
    setInput("");

    if (command === "clear") {
      setEntries([]);
      return;
    }

    if (command === "help") {
      append("output", "help · whoami · impact · experience · projects · skills · achievements · contact · status · resume · clear");
      return;
    }

    if (command === "whoami" || command === "about") {
      append("output", "Pratik Raut — backend engineer building reliable banking systems with Java, Spring Boot, Oracle DB, and measurable automation.");
      return;
    }

    if (command === "resume") {
      append("output", "Opening Pratik_Raut_Resume.pdf...");
      window.open(`${basePath}/Pratik_Raut_Resume.pdf`, "_blank", "noopener,noreferrer");
      return;
    }

    if (command === "status") {
      if (isStaticExport) {
        append("output", `PORTFOLIO ONLINE · GITHUB PAGES · ${new Date().toLocaleString()}`);
        return;
      }

      append("output", "Pinging server runtime...");
      try {
        const response = await fetch("/api/status", { cache: "no-store" });
        const result = (await response.json()) as { ok: boolean; service: string; serverTime: string };
        append(result.ok ? "output" : "error", `${result.ok ? "API ONLINE" : "API DEGRADED"} · ${result.service} · ${new Date(result.serverTime).toLocaleString()}`);
      } catch {
        append("error", "API UNREACHABLE · local content remains available");
      }
      return;
    }

    const navigation = navigationCommands[command];
    if (navigation) {
      append("output", navigation.message);
      document.getElementById(navigation.target)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    append("error", `command not found: ${command}. Try 'help'.`);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void runCommand(input);
  };

  return (
    <div className="terminal" role="region" aria-label="Interactive portfolio terminal">
      <div className="terminal-bar">
        <div className="terminal-controls" aria-hidden="true"><span /><span /><span /></div>
        <span>pratik@portfolio:~</span>
        <span className="terminal-secure"><i aria-hidden="true" /> SECURE</span>
      </div>

      <div
        className="terminal-log"
        ref={logRef}
        role="log"
        tabIndex={0}
        aria-label="Terminal command history"
        aria-live="polite"
        aria-relevant="additions"
      >
        {entries.map((entry) => (
          <p className={`terminal-${entry.kind}`} key={entry.id}>
            {entry.kind === "command" && <span aria-hidden="true">pratik@portfolio:~$ </span>}
            {entry.kind === "error" && <span aria-hidden="true">[error] </span>}
            {entry.text}
          </p>
        ))}
      </div>

      <form className="terminal-form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="terminal-command">Enter a portfolio command</label>
        <span aria-hidden="true">pratik@portfolio:~$</span>
        <input
          id="terminal-command"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          autoComplete="off"
          spellCheck={false}
          placeholder="type a command..."
        />
      </form>

      <div className="command-chips" role="group" aria-label="Suggested terminal commands">
        {quickCommands.map((command) => (
          <button type="button" key={command} onClick={() => void runCommand(command)}>{command}</button>
        ))}
      </div>
    </div>
  );
}
