"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Terminal,
  Github,
  Mail,
  Twitter,
  Wifi,
  ArrowRight,
} from "lucide-react";

type Log = {
  sender: "SYSTEM" | "USER" | "GUEST";
  message: string;
  timestamp: string;
  action?: "link";
};

type FormStep = "IDLE" | "NAME" | "SUBJECT" | "MESSAGE" | "CONFIRM";

export default function Contact() {
  const [input, setInput] = useState("");
  const [step, setStep] = useState<FormStep>("IDLE");
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: "",
  });

  const [logs, setLogs] = useState<Log[]>([
    {
      sender: "SYSTEM",
      message: "Secure channel initialized.",
      timestamp: getTime(),
    },
    {
      sender: "SYSTEM",
      message: 'To initiate transmission, type "start" or click the terminal.',
      timestamp: getTime(),
    },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function getTime() {
    return new Date().toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  const addLog = (
    sender: Log["sender"],
    message: string,
    action?: Log["action"],
  ) => {
    setLogs((prev) => [
      ...prev,
      { sender, message, timestamp: getTime(), action },
    ]);
  };

  const processCommand = (cmd: string) => {
    const cleanCmd = cmd.trim();

    addLog("GUEST", cleanCmd);

    switch (step) {
      case "IDLE":
        if (
          cleanCmd.toLowerCase() === "start" ||
          cleanCmd.toLowerCase() === "hello"
        ) {
          setStep("NAME");
          setTimeout(
            () => addLog("SYSTEM", "Identify yourself. Enter NAME:"),
            400,
          );
        } else {
          setTimeout(
            () =>
              addLog(
                "SYSTEM",
                'Command not recognized. Type "start" to begin transmission.',
              ),
            400,
          );
        }
        break;

      case "NAME":
        setFormData((prev) => ({ ...prev, name: cleanCmd }));
        setStep("SUBJECT");
        setTimeout(
          () =>
            addLog(
              "SYSTEM",
              `Identity confirmed [${cleanCmd}]. Enter SUBJECT of inquiry:`,
            ),
          400,
        );
        break;

      case "SUBJECT":
        setFormData((prev) => ({ ...prev, subject: cleanCmd }));
        setStep("MESSAGE");
        setTimeout(
          () => addLog("SYSTEM", "Subject logged. Enter MESSAGE payload:"),
          400,
        );
        break;

      case "MESSAGE":
        setFormData((prev) => ({ ...prev, message: cleanCmd }));
        setStep("CONFIRM");
        setTimeout(() => {
          addLog(
            "SYSTEM",
            'Packet compiled. Type "send" to transmit via default mail client, or "cancel" to abort.',
          );
        }, 400);
        break;

      case "CONFIRM":
        if (cleanCmd.toLowerCase() === "send") {
          const mailtoLink = `mailto:nyychttv21@gmail.com?subject=[PORTFOLIO] ${encodeURIComponent(formData.subject)}&body=Sender: ${encodeURIComponent(formData.name)}%0D%0A%0D%0A${encodeURIComponent(formData.message)}`;

          setTimeout(() => {
            addLog("SYSTEM", "Opening SMTP port... Transmission successful.");
            window.open(mailtoLink, "_blank");
            setStep("IDLE");
            setFormData({ name: "", subject: "", message: "" });
            setTimeout(
              () => addLog("SYSTEM", "Channel reset. Ready for new input."),
              2000,
            );
          }, 500);
        } else {
          setStep("IDLE");
          addLog("SYSTEM", "Transmission aborted. Channel reset.");
        }
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    processCommand(input);
    setInput("");
  };

  return (
    <div className="max-w-4xl w-full flex flex-col gap-6 h-full pb-20">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <h2 className="text-signal text-xl font-bold flex items-center gap-2">
          <Terminal size={20} className="text-[#379634]" />
          COMM_LINK: [DIRECT]
        </h2>
        <div className="flex gap-4 text-xs text-concrete font-mono">
          <div className="flex items-center gap-1">
            <Wifi
              size={12}
              className={
                step !== "IDLE" ? "text-[#379634] animate-pulse" : "text-muted"
              }
            />
            <span>{step === "IDLE" ? "IDLE" : "UPLINK ACTIVE"}</span>
          </div>
          <div className="hidden sm:block">LATENCY: 12ms</div>
        </div>
      </div>

      <div
        className="flex-1 min-h-[400px] bg-black/40 border border-border rounded-sm p-4 flex flex-col font-mono text-sm relative overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)]"
        onClick={() => inputRef.current?.focus()}
      >
        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-2 mb-4">
          {logs.map((log, i) => (
            <div
              key={i}
              className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300"
            >
              <span className="text-muted text-[10px] min-w-[65px] pt-1 select-none">
                [{log.timestamp}]
              </span>
              <div className="flex flex-col max-w-[85%]">
                <span
                  className={`text-xs font-bold ${
                    log.sender === "SYSTEM"
                      ? "text-[#379634]"
                      : "text-green-500"
                  }`}
                >
                  {log.sender}:
                </span>
                <span className="text-concrete break-words leading-relaxed">
                  {log.message}
                </span>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex gap-2 border-t border-border/50 pt-3 mt-2 bg-black/20"
        >
          <span className="text-green-500 font-bold select-none">{">"}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-signal placeholder-muted/30 font-mono"
            placeholder={
              step === "IDLE" ? 'Type "start" to begin...' : "Enter data..."
            }
            autoComplete="off"
          />
          <button
            type="submit"
            className="text-muted hover:text-alert transition-colors"
          >
            <ArrowRight size={16} />
          </button>
        </form>
      </div>

      <div>
        <h3 className="text-xs uppercase text-muted tracking-wider mb-4 border-b border-border/50 pb-1 flex justify-between">
          <span>External Protocols</span>
          <span className="text-[10px]">HTTP/1.1</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="https://github.com/GitRavioli"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 border border-border/50 bg-void/50 hover:bg-white/5 hover:border-alert transition-all group"
          >
            <Github
              size={20}
              className="text-concrete group-hover:text-signal"
            />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-signal group-hover:text-alert">
                GITHUB
              </span>
              <span className="text-[10px] text-muted">View Source Codes</span>
            </div>
          </a>

          <a
            href="https://x.com/iamnitchx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 border border-border/50 bg-void/50 hover:bg-white/5 hover:border-alert transition-all group"
          >
            <Twitter
              size={20}
              className="text-concrete group-hover:text-signal"
            />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-signal group-hover:text-alert">
                X / TWITTER
              </span>
              <span className="text-[10px] text-muted">Encrypted Stream</span>
            </div>
          </a>

          <a
            href="mailto:nyychttv21@gmail.com"
            className="flex items-center gap-3 p-4 border border-border/50 bg-void/50 hover:bg-white/5 hover:border-alert transition-all group"
          >
            <Mail size={20} className="text-concrete group-hover:text-signal" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-signal group-hover:text-alert">
                EMAIL
              </span>
              <span className="text-[10px] text-muted">
                nyychttv21@gmail.com
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
