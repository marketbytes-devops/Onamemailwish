"use client";

import React, { useState } from "react";
import { OnamEmailCard, generateEmailHTML } from "./EmailTemplate.jsx";
import {
  Send,
  X,
  Copy,
  Download,
  Mail,
  Building,
  User,
  Sparkles,
  Check,
  Eye,
  Code,
  Settings,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  FileText,
  Tag,
  ChevronUp,
  ChevronDown,
  EyeOff
} from "lucide-react";

export default function Dashboard() {
  // Top Header Visibility State
  const [showHeader, setShowHeader] = useState(true);

  // Recipients State
  const [toEmails, setToEmails] = useState(["client@alsiglobal.com", "operations@alsiglobal.com"]);
  const [toInput, setToInput] = useState("");
  const [ccEmails, setCcEmails] = useState(["team@marketbytes.com"]);
  const [ccInput, setCcInput] = useState("");

  // Personalization State (Dynamic inputs)
  const [companyName, setCompanyName] = useState("ALSI Global");
  const [shortName, setShortName] = useState("ALSI");
  const [clientName, setClientName] = useState("Syam");
  const [senderName, setSenderName] = useState("Team MarketBytes");
  const [subject, setSubject] = useState("Happy Onam - Celebrating Meaningful Partnerships & New Beginnings");

  // Content State (Dynamic text templates)
  const [subtitle, setSubtitle] = useState("Celebrating Meaningful Partnerships & New Beginnings");
  const [bodyText1, setBodyText1] = useState(
    "As the season of Onam brings with it the spirit of togetherness, gratitude, and prosperity, we extend our heartfelt wishes to you, your family and everyone at {{company_name}}."
  );
  const [bodyText2, setBodyText2] = useState(
    "Onam is a beautiful time to celebrate the people and relationships that make every journey meaningful. We truly appreciate the opportunity to work with you and the {{short_name}} team and value the connection we have built along the way."
  );
  const [bodyText3, setBodyText3] = useState(
    "Your support and collaboration have made our association a wonderful experience. As we look ahead, we hope to continue sharing ideas, achieving new milestones and being part of many more meaningful moments together."
  );
  const [bottomQuote, setBottomQuote] = useState(
    "May this Onam bring your home the warmth of family, the joy of togetherness and a year ahead filled with peace, good health, prosperity and new beginnings."
  );
  const [bottomSubQuote, setBottomSubQuote] = useState("Wishing you and your family a blessed and joyful Onam.");
  const [buttonText, setButtonText] = useState("▶︎ Watch MarketBytes Onam 2k26 ↗︎");
  const [buttonUrl, setButtonUrl] = useState("https://youtu.be/DLJwI_ETPds?si=ohZEKjREvNEPMmIa");

  // SMTP Settings
  const [smtpConfig, setSmtpConfig] = useState({
    host: "",
    port: "587",
    user: "",
    pass: ""
  });

  // Navigation & UI state
  const [activeTab, setActiveTab] = useState("recipients"); // recipients | content | settings
  const [viewMode, setViewMode] = useState("card"); // card | mobile | html
  const [zoomLevel, setZoomLevel] = useState("fit"); // fit | 85% | 100%
  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // Dynamic Placeholder Replacer Helper
  const processPlaceholder = (text) => {
    if (!text) return "";
    const activeShort = shortName.trim() || (companyName ? companyName.split(" ")[0] : "ALSI");
    return text
      .replaceAll("{{company_name}}", companyName || "ALSI Global")
      .replaceAll("{{client_name}}", clientName || "Syam")
      .replaceAll("{{short_name}}", activeShort)
      .replaceAll("{{team_name}}", activeShort);
  };

  // Add Email Tag handler
  const handleAddEmail = (type, value) => {
    const raw = value.trim();
    if (!raw) return;

    const emailsToAdd = raw
      .split(/[,;\s]+/)
      .map((e) => e.trim().toLowerCase())
      .filter((e) => e && e.includes("@"));

    if (type === "to") {
      setToEmails((prev) => Array.from(new Set([...prev, ...emailsToAdd])));
      setToInput("");
    } else {
      setCcEmails((prev) => Array.from(new Set([...prev, ...emailsToAdd])));
      setCcInput("");
    }
  };

  const handleKeyDown = (e, type, inputVal) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddEmail(type, inputVal);
    }
  };

  const handleRemoveEmail = (type, emailToRemove) => {
    if (type === "to") {
      setToEmails((prev) => prev.filter((e) => e !== emailToRemove));
    } else {
      setCcEmails((prev) => prev.filter((e) => e !== emailToRemove));
    }
  };

  // Copy HTML to Clipboard
  const handleCopyHTML = () => {
    const htmlStr = generateEmailHTML({
      companyName,
      clientName,
      shortName,
      senderName,
      subtitle,
      bodyText1: processPlaceholder(bodyText1),
      bodyText2: processPlaceholder(bodyText2),
      bodyText3: processPlaceholder(bodyText3),
      bottomQuote: processPlaceholder(bottomQuote),
      bottomSubQuote: processPlaceholder(bottomSubQuote),
      buttonText,
      buttonUrl,
      bgImageUrl: typeof window !== "undefined" ? `${window.location.origin}/marketbytesonamwish.png` : "/marketbytesonamwish.png"
    });

    navigator.clipboard.writeText(htmlStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Download HTML file
  const handleDownloadHTML = () => {
    const htmlStr = generateEmailHTML({
      companyName,
      clientName,
      shortName,
      senderName,
      subtitle,
      bodyText1: processPlaceholder(bodyText1),
      bodyText2: processPlaceholder(bodyText2),
      bodyText3: processPlaceholder(bodyText3),
      bottomQuote: processPlaceholder(bottomQuote),
      bottomSubQuote: processPlaceholder(bottomSubQuote),
      buttonText,
      buttonUrl,
      bgImageUrl: typeof window !== "undefined" ? `${window.location.origin}/marketbytesonamwish.png` : "/marketbytesonamwish.png"
    });

    const blob = new Blob([htmlStr], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Happy_Onam_${companyName.replaceAll(" ", "_")}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Send Email Handler
  const handleSendEmails = async () => {
    if (toEmails.length === 0) {
      alert("Please add at least one recipient email address in the 'To' field.");
      return;
    }

    setIsSending(true);
    setSendResult(null);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: toEmails,
          cc: ccEmails,
          subject,
          companyName,
          clientName,
          shortName,
          senderName,
          subtitle,
          bodyText1: processPlaceholder(bodyText1),
          bodyText2: processPlaceholder(bodyText2),
          bodyText3: processPlaceholder(bodyText3),
          bottomQuote: processPlaceholder(bottomQuote),
          bottomSubQuote: processPlaceholder(bottomSubQuote),
          buttonText,
          buttonUrl,
          smtpConfig: smtpConfig.host ? smtpConfig : undefined
        })
      });

      const data = await res.json();
      setSendResult(data);
    } catch (err) {
      setSendResult({ success: false, error: err.message });
    } finally {
      setIsSending(false);
    }
  };

  const currentHTMLSnippet = generateEmailHTML({
    companyName,
    clientName,
    shortName,
    senderName,
    subtitle,
    bodyText1: processPlaceholder(bodyText1),
    bodyText2: processPlaceholder(bodyText2),
    bodyText3: processPlaceholder(bodyText3),
    bottomQuote: processPlaceholder(bottomQuote),
    bottomSubQuote: processPlaceholder(bottomSubQuote),
    buttonText,
    buttonUrl,
    bgImageUrl: typeof window !== "undefined" ? `${window.location.origin}/marketbytesonamwish.png` : "/marketbytesonamwish.png"
  });

  return (
    <div className="h-screen w-full bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-rose-500 selection:text-white overflow-hidden">
      {/* Top Navbar (Collapsible) */}
      {showHeader && (
        <header className="h-14 shrink-0 border-b border-slate-200 bg-white/90 backdrop-blur-md px-6 flex items-center justify-between z-30 shadow-xs transition-all">
          <div className="flex items-center gap-3">
            <img
              src="/logo2.png"
              alt=""
              className="h-9 w-auto object-contain max-w-[160px]"
            />
            <div className="h-6 w-px bg-slate-200" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base text-slate-900 tracking-tight">
                  Onam Dispatcher
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide bg-rose-50 text-rose-600 border border-rose-200 rounded-full">
                  Dynamic Studio
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Personalized Greeting & Multi-Recipient Email Studio
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopyHTML}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-xs hover:border-slate-300 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              {copied ? "Copied!" : "Copy HTML"}
            </button>

            <button
              onClick={handleDownloadHTML}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-xs hover:border-slate-300 transition"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              Download
            </button>

            <button
              onClick={handleSendEmails}
              disabled={isSending}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white shadow-md shadow-rose-600/20 transition transform active:scale-95 disabled:opacity-50"
            >
              {isSending ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
              {isSending
                ? "Sending..."
                : `Dispatch (${toEmails.length} To${ccEmails.length > 0 ? ` + ${ccEmails.length} CC` : ""})`}
            </button>

            {/* Hide Header Button */}
            <button
              onClick={() => setShowHeader(false)}
              title="Hide top portion for full view"
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition shadow-2xs"
            >
              <ChevronUp className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">Hide Header</span>
            </button>
          </div>
        </header>
      )}

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
        {/* Left Side: Controls & Editor */}
        <div className="w-full lg:w-[480px] xl:w-[520px] bg-white border-r border-slate-200 flex flex-col h-full overflow-y-auto shadow-xs shrink-0">
          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50/80 p-1.5 gap-1 sticky top-0 z-20">
            <button
              onClick={() => setActiveTab("recipients")}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition ${activeTab === "recipients"
                  ? "bg-white text-rose-600 border border-slate-200 shadow-xs font-bold"
                  : "text-slate-500 hover:text-slate-800 font-medium"
                }`}
            >
              <Mail className="w-3.5 h-3.5" />
              Recipients & Client
            </button>
            <button
              onClick={() => setActiveTab("content")}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition ${activeTab === "content"
                  ? "bg-white text-rose-600 border border-slate-200 shadow-xs font-bold"
                  : "text-slate-500 hover:text-slate-800 font-medium"
                }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Message Text
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition ${activeTab === "settings"
                  ? "bg-white text-rose-600 border border-slate-200 shadow-xs font-bold"
                  : "text-slate-500 hover:text-slate-800 font-medium"
                }`}
            >
              <Settings className="w-3.5 h-3.5" />
              SMTP Server
            </button>
          </div>

          <div className="p-6 space-y-6 flex-1">
            {/* TAB 1: RECIPIENTS & CLIENT DETAILS */}
            {activeTab === "recipients" && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-1">
                    <Mail className="w-4 h-4 text-rose-600" />
                    Recipient Emails (To)
                  </h3>
                  <p className="text-xs text-slate-500 mb-2.5">
                    Add single or multiple recipient emails. Press Enter or type a comma.
                  </p>

                  {/* To Chips Input Container */}
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-rose-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-rose-500/10 transition min-h-[70px] flex flex-wrap gap-2 items-center">
                    {toEmails.map((email) => (
                      <span
                        key={email}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold"
                      >
                        {email}
                        <button
                          onClick={() => handleRemoveEmail("to", email)}
                          className="hover:text-rose-900 text-rose-400 transition"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    <input
                      type="email"
                      placeholder={toEmails.length === 0 ? "e.g. client@alsiglobal.com" : "Add recipient email..."}
                      value={toInput}
                      onChange={(e) => setToInput(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, "to", toInput)}
                      onBlur={() => handleAddEmail("to", toInput)}
                      className="flex-1 bg-transparent border-none text-xs text-slate-900 placeholder-slate-400 focus:outline-none min-w-[140px]"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-1">
                    <Mail className="w-4 h-4 text-amber-600" />
                    CC Emails (Optional)
                  </h3>
                  <p className="text-xs text-slate-500 mb-2.5">
                    Add CC recipients to receive copies of the greeting.
                  </p>

                  {/* CC Chips Input Container */}
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-amber-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-amber-500/10 transition min-h-[56px] flex flex-wrap gap-2 items-center">
                    {ccEmails.map((email) => (
                      <span
                        key={email}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold"
                      >
                        {email}
                        <button
                          onClick={() => handleRemoveEmail("cc", email)}
                          className="hover:text-amber-950 text-amber-500 transition"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    <input
                      type="email"
                      placeholder={ccEmails.length === 0 ? "e.g. manager@alsiglobal.com" : "Add CC email..."}
                      value={ccInput}
                      onChange={(e) => setCcInput(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, "cc", ccInput)}
                      onBlur={() => handleAddEmail("cc", ccInput)}
                      className="flex-1 bg-transparent border-none text-xs text-slate-900 placeholder-slate-400 focus:outline-none min-w-[140px]"
                    />
                  </div>
                </div>

                {/* Personalization Section */}
                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <User className="w-4 h-4 text-rose-600" />
                    Dynamic Client & Company Variables
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-rose-600" />
                        Client / Contact Name
                      </label>
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Syam"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-rose-500 focus:outline-none transition font-medium placeholder-slate-400"
                      />
                      <p className="text-[10px] text-slate-500 mt-1">
                        Updates <code className="text-rose-600 font-semibold">{`Dear ${clientName || 'Syam'},`}</code> and <code className="text-rose-600 font-semibold">{`{{client_name}}`}</code>
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-rose-600" />
                        Target Company Name
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. ALSI Global"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-rose-500 focus:outline-none transition font-medium placeholder-slate-400"
                      />
                      <p className="text-[10px] text-slate-500 mt-1">
                        Replaces <code className="text-rose-600 font-semibold">{`{{company_name}}`}</code>
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-rose-600" />
                      Company Short / Team Name
                    </label>
                    <input
                      type="text"
                      value={shortName}
                      onChange={(e) => setShortName(e.target.value)}
                      placeholder="e.g. ALSI"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-rose-500 focus:outline-none transition font-medium placeholder-slate-400"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">
                      Replaces <code className="text-rose-600 font-semibold">{`{{short_name}}`}</code> (e.g. ALSI team)
                    </p>
                  </div>

                  {/* Variable Helper Box */}
                  <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl space-y-2 text-xs">
                    <p className="font-bold text-rose-700 flex items-center gap-1.5 text-xs">
                      <Sparkles className="w-3.5 h-3.5" /> Active Dynamic Tags
                    </p>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Type these tags in any paragraph box on the Message Text tab to insert live values:
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="px-2 py-1 bg-white rounded-lg border border-rose-200/80 text-[11px] font-mono text-slate-700 shadow-2xs">
                        <span className="text-rose-600 font-semibold">{`{{client_name}}`}</span> = &quot;{clientName || "Syam"}&quot;
                      </span>
                      <span className="px-2 py-1 bg-white rounded-lg border border-rose-200/80 text-[11px] font-mono text-slate-700 shadow-2xs">
                        <span className="text-rose-600 font-semibold">{`{{company_name}}`}</span> = &quot;{companyName || "ALSI Global"}&quot;
                      </span>
                      <span className="px-2 py-1 bg-white rounded-lg border border-rose-200/80 text-[11px] font-mono text-slate-700 shadow-2xs">
                        <span className="text-rose-600 font-semibold">{`{{short_name}}`}</span> = &quot;{shortName || "ALSI"}&quot;
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Email Subject Line
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Email subject..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-rose-500 focus:outline-none transition placeholder-slate-400"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CONTENT EDITOR */}
            {activeTab === "content" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Card Subtitle / Tagline
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Paragraph 1
                  </label>
                  <textarea
                    rows={3}
                    value={bodyText1}
                    onChange={(e) => setBodyText1(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-rose-500 focus:outline-none leading-relaxed font-sans"
                  />
                  <p className="text-[10px] text-slate-500 mt-0.5 flex gap-2">
                    <span>Tags: <code className="text-rose-600 font-semibold">{`{{client_name}}`}</code>, <code className="text-rose-600 font-semibold">{`{{company_name}}`}</code></span>
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Paragraph 2
                  </label>
                  <textarea
                    rows={3}
                    value={bodyText2}
                    onChange={(e) => setBodyText2(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-rose-500 focus:outline-none leading-relaxed font-sans"
                  />
                  <p className="text-[10px] text-slate-500 mt-0.5 flex gap-2">
                    <span>Tags: <code className="text-rose-600 font-semibold">{`{{short_name}}`}</code>, <code className="text-rose-600 font-semibold">{`{{client_name}}`}</code></span>
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Paragraph 3
                  </label>
                  <textarea
                    rows={3}
                    value={bodyText3}
                    onChange={(e) => setBodyText3(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-rose-500 focus:outline-none leading-relaxed font-sans"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Sender Signature
                    </label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-rose-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Bottom Sub-Greeting
                    </label>
                    <input
                      type="text"
                      value={bottomSubQuote}
                      onChange={(e) => setBottomSubQuote(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-rose-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Bottom Quote (Above Boat)
                  </label>
                  <textarea
                    rows={2}
                    value={bottomQuote}
                    onChange={(e) => setBottomQuote(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-rose-500 focus:outline-none leading-relaxed font-sans"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">CTA Button Settings</h4>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={buttonText}
                      onChange={(e) => setButtonText(e.target.value)}
                      placeholder="e.g. Watch MarketBytes Onam 2k26"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-rose-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      CTA Link URL
                    </label>
                    <input
                      type="text"
                      value={buttonUrl}
                      onChange={(e) => setButtonUrl(e.target.value)}
                      placeholder="e.g. https://youtu.be/..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-rose-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: SMTP SETTINGS */}
            {activeTab === "settings" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-rose-900">Live Send vs Simulation Mode</p>
                    <p className="text-[11px] text-rose-800 mt-0.5 leading-relaxed">
                      By default, the dashboard runs in full simulation mode for instant testing and preview. To send real emails to inbox, enter your SMTP server credentials below (e.g. Gmail / SendGrid / Amazon SES).
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    SMTP Server Host
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. smtp.gmail.com or smtp.sendgrid.net"
                    value={smtpConfig.host}
                    onChange={(e) => setSmtpConfig({ ...smtpConfig, host: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-rose-500 focus:outline-none placeholder-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    SMTP Port
                  </label>
                  <input
                    type="text"
                    placeholder="587 or 465"
                    value={smtpConfig.port}
                    onChange={(e) => setSmtpConfig({ ...smtpConfig, port: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-rose-500 focus:outline-none placeholder-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    SMTP Username / Email
                  </label>
                  <input
                    type="text"
                    placeholder="your-email@domain.com"
                    value={smtpConfig.user}
                    onChange={(e) => setSmtpConfig({ ...smtpConfig, user: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-rose-500 focus:outline-none placeholder-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    SMTP Password / App Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={smtpConfig.pass}
                    onChange={(e) => setSmtpConfig({ ...smtpConfig, pass: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-rose-500 focus:outline-none placeholder-slate-400"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Live Interactive Canvas & Code Preview */}
        <div className="flex-1 bg-slate-100/70 flex flex-col h-full overflow-hidden min-h-0">
          {/* Canvas Controls Header */}
          <div className="h-12 border-b border-slate-200 bg-white px-4 sm:px-6 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 hidden sm:inline">View Mode:</span>
                <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                  <button
                    onClick={() => setViewMode("card")}
                    className={`px-3 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5 transition ${viewMode === "card"
                        ? "bg-rose-600 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900 font-medium"
                      }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Card Canvas
                  </button>
                  <button
                    onClick={() => setViewMode("mobile")}
                    className={`px-3 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5 transition ${viewMode === "mobile"
                        ? "bg-rose-600 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900 font-medium"
                      }`}
                  >
                    Mobile View
                  </button>
                  <button
                    onClick={() => setViewMode("html")}
                    className={`px-3 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5 transition ${viewMode === "html"
                        ? "bg-rose-600 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900 font-medium"
                      }`}
                  >
                    <Code className="w-3.5 h-3.5" />
                    HTML Source
                  </button>
                </div>
              </div>

              {/* Canvas Scale / Zoom Selector */}
              {viewMode === "card" && (
                <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
                  <span className="text-[10px] font-bold text-slate-400 px-1 uppercase tracking-wider">Scale:</span>
                  <button
                    onClick={() => setZoomLevel("fit")}
                    className={`px-2 py-0.5 text-[11px] font-semibold rounded transition ${zoomLevel === "fit"
                        ? "bg-white text-rose-600 shadow-2xs font-bold"
                        : "text-slate-600 hover:text-slate-900"
                      }`}
                  >
                    Fit Screen
                  </button>
                  <button
                    onClick={() => setZoomLevel("85%")}
                    className={`px-2 py-0.5 text-[11px] font-semibold rounded transition ${zoomLevel === "85%"
                        ? "bg-white text-rose-600 shadow-2xs font-bold"
                        : "text-slate-600 hover:text-slate-900"
                      }`}
                  >
                    85%
                  </button>
                  <button
                    onClick={() => setZoomLevel("100%")}
                    className={`px-2 py-0.5 text-[11px] font-semibold rounded transition ${zoomLevel === "100%"
                        ? "bg-white text-rose-600 shadow-2xs font-bold"
                        : "text-slate-600 hover:text-slate-900"
                      }`}
                  >
                    100%
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {!showHeader && (
                <button
                  onClick={() => setShowHeader(true)}
                  title="Show Top Header"
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 shadow-2xs transition"
                >
                  <ChevronDown className="w-3.5 h-3.5 text-rose-600" />
                  <span>Show Header</span>
                </button>
              )}
              <span className="text-xs text-slate-500 font-medium hidden lg:inline">
                Live Template Preview
              </span>
            </div>
          </div>

          {/* Render Area */}
          <div className="flex-1 overflow-hidden p-2 sm:p-4 flex items-center justify-center bg-slate-100/60 relative">
            {viewMode === "card" && (
              <div className="w-full h-full flex items-center justify-center overflow-auto">
                <div
                  className={`transition-all duration-300 transform origin-center flex items-center justify-center my-auto ${zoomLevel === "fit"
                      ? "scale-[0.68] sm:scale-[0.75] xl:scale-[0.82] my-0"
                      : zoomLevel === "85%"
                        ? "scale-[0.85]"
                        : "scale-100"
                    }`}
                >
                  <OnamEmailCard
                    companyName={companyName}
                    clientName={clientName}
                    shortName={shortName}
                    senderName={senderName}
                    subtitle={subtitle}
                    bodyText1={processPlaceholder(bodyText1)}
                    bodyText2={processPlaceholder(bodyText2)}
                    bodyText3={processPlaceholder(bodyText3)}
                    bottomQuote={processPlaceholder(bottomQuote)}
                    bottomSubQuote={processPlaceholder(bottomSubQuote)}
                    buttonText={buttonText}
                    buttonUrl={buttonUrl}
                    bgImageUrl="/marketbytesonamwish.png"
                  />
                </div>
              </div>
            )}

            {viewMode === "mobile" && (
              <div className="w-[375px] h-[720px] bg-slate-900 border-[8px] border-slate-800 rounded-[36px] overflow-hidden shadow-2xl relative flex flex-col">
                <div className="h-5 bg-slate-800 w-full flex items-center justify-center">
                  <div className="w-16 h-3 bg-slate-900 rounded-full"></div>
                </div>
                <div className="flex-1 overflow-y-auto p-0 bg-slate-100">
                  <OnamEmailCard
                    companyName={companyName}
                    clientName={clientName}
                    shortName={shortName}
                    senderName={senderName}
                    subtitle={subtitle}
                    bodyText1={processPlaceholder(bodyText1)}
                    bodyText2={processPlaceholder(bodyText2)}
                    bodyText3={processPlaceholder(bodyText3)}
                    bottomQuote={processPlaceholder(bottomQuote)}
                    bottomSubQuote={processPlaceholder(bottomSubQuote)}
                    buttonText={buttonText}
                    buttonUrl={buttonUrl}
                    bgImageUrl="/marketbytesonamwish.png"
                  />
                </div>
              </div>
            )}

            {viewMode === "html" && (
              <div className="w-full h-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl p-4 overflow-auto font-mono text-xs text-rose-300/90 leading-relaxed select-all shadow-lg">
                <pre>{currentHTMLSnippet}</pre>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dispatch Response Modal */}
      {sendResult && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {sendResult.success ? (
                  <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {sendResult.success ? "Greeting Dispatched!" : "Dispatch Failed"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {sendResult.isSimulated ? "Simulation Complete" : "SMTP Live Dispatch"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSendResult(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed mb-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
              {sendResult.message || sendResult.error}
            </p>

            {(sendResult.isRateLimit || (sendResult.error && (sendResult.error.toLowerCase().includes("ratelimit") || sendResult.error.includes("451")))) && (
              <div className="mb-4 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-2">
                <p className="font-bold text-amber-900 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  Hostinger SMTP Rate Limit Info
                </p>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  Hostinger server (<code className="font-mono bg-amber-100/70 px-1 py-0.5 rounded">smtp.hostinger.com</code>) counts every CC email as an extra recipient towards your hourly limit (<code className="font-mono bg-amber-100/70 px-1 py-0.5 rounded">hostinger_out_ratelimit</code>).
                </p>
                <div className="pt-2 border-t border-amber-200/70 text-[11px] text-amber-900 space-y-1">
                  <p className="font-semibold">How to resolve:</p>
                  <ul className="list-disc list-inside space-y-1 text-amber-800">
                    <li><strong className="text-amber-900">Wait 5–10 minutes:</strong> Hostinger&apos;s per-minute / hourly sending limit key will reset automatically.</li>
                    <li><strong className="text-amber-900">Send without CC:</strong> Removing CC uses only 1 recipient slot instead of 2.</li>
                    <li>
                      <strong className="text-amber-900">Use Custom SMTP:</strong> Configure your own SMTP (SendGrid / Gmail / Amazon SES) in the{" "}
                      <button
                        onClick={() => {
                          setSendResult(null);
                          setActiveTab("settings");
                        }}
                        className="font-bold underline text-rose-700 hover:text-rose-900"
                      >
                        SMTP Server tab
                      </button>.
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {sendResult.recipients && (
              <div className="space-y-2 text-xs text-slate-600 mb-6 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="flex justify-between">
                  <span>To Recipients ({sendResult.recipients.to.length}):</span>
                  <span className="text-slate-900 font-mono font-semibold">{sendResult.recipients.to.join(", ")}</span>
                </div>
                {sendResult.recipients.cc.length > 0 && (
                  <div className="flex justify-between">
                    <span>CC Recipients ({sendResult.recipients.cc.length}):</span>
                    <span className="text-slate-900 font-mono font-semibold">{sendResult.recipients.cc.join(", ")}</span>
                  </div>
                )}
                {sendResult.messageId && (
                  <div className="flex justify-between pt-1 border-t border-slate-200">
                    <span>Message ID:</span>
                    <span className="text-rose-600 font-mono text-[10px] font-semibold">{sendResult.messageId}</span>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => setSendResult(null)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition shadow-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
