import React from "react";

// Helper to replace variable tags like {{client_name}}, {{company_name}}, {{short_name}}
function replacePlaceholders(text, { companyName = "ALSI Global", clientName = "Syam", shortName = "ALSI" }) {
  if (!text) return "";
  const activeShort = shortName || (companyName ? companyName.split(" ")[0] : "ALSI");
  return text
    .replaceAll("{{company_name}}", companyName)
    .replaceAll("{{client_name}}", clientName)
    .replaceAll("{{short_name}}", activeShort)
    .replaceAll("{{team_name}}", activeShort);
}

// Render React elements with replaced dynamic placeholders
function renderDynamicTextReact(text, { companyName = "ALSI Global", clientName = "Syam", shortName = "ALSI" }) {
  return replacePlaceholders(text, { companyName, clientName, shortName });
}

// Render HTML string with replaced dynamic placeholders for generateEmailHTML
function renderDynamicTextHTML(text, { companyName = "ALSI Global", clientName = "Syam", shortName = "ALSI" }) {
  return replacePlaceholders(text, { companyName, clientName, shortName });
}

export function OnamEmailCard({
  companyName = "ALSI Global",
  clientName = "Syam",
  shortName = "ALSI",
  senderName = "Team MarketBytes",
  subtitle = "Celebrating Meaningful Partnerships & New Beginnings",
  bodyText1,
  bodyText2,
  bodyText3,
  bottomQuote,
  bottomSubQuote,
  bgImageUrl = "/marketbytesonamwish.jpg",
  buttonText = "Visit MarketBytes",
  buttonUrl = "https://www.marketbytes.in/"
}) {
  const activeShort = shortName || (companyName ? companyName.split(" ")[0] : "ALSI");

  const p1 = bodyText1 ?? `As the season of Onam brings with it the spirit of togetherness, gratitude, and prosperity, we extend our heartfelt wishes to you, your family and everyone at ${companyName}.`;
  const p2 = bodyText2 ?? `Onam is a beautiful time to celebrate the people and relationships that make every journey meaningful. We truly appreciate the opportunity to work with you and the ${activeShort} team and value the connection we have built along the way.`;
  const p3 = bodyText3 ?? `Your support and collaboration have made our association a wonderful experience. As we look ahead, we hope to continue sharing ideas, achieving new milestones and being part of many more meaningful moments together.`;
  const quote = bottomQuote ?? `May this Onam bring your home the warmth of family, the joy of togetherness and a year ahead filled with peace, good health, prosperity and new beginnings.`;
  const subQuote = bottomSubQuote ?? `Wishing you and your family a blessed and joyful Onam.`;

  const contextVars = { companyName, clientName, shortName: activeShort };

  return (
    <div className="w-full max-w-[600px] mx-auto bg-white text-gray-800 shadow-2xl sm:rounded-2xl rounded-none overflow-hidden relative sm:border sm:border-gray-200 border-none font-sans select-none flex flex-col">
      {/* Background Image Container */}
      <div
        className="relative w-full bg-[length:100%_100%] bg-no-repeat min-h-0 sm:min-h-[960px] flex flex-col justify-between flex-1"
        style={{ backgroundImage: `url(${bgImageUrl})` }}
      >
        {/* Top Arc Layer */}
        <div className="w-full bg-white pt-2.5 sm:pt-5 pb-1.5 sm:pb-7 px-3.5 sm:px-7 relative shadow-xs">
          {/* Top Header Row */}
          <div className="flex justify-between items-start mb-1">
            <div className="flex items-center gap-1.5">
              <img
                src="/logo2.png"
                alt=""
                className="h-7 sm:h-9 w-auto object-contain"
              />
            </div>
          </div>

          {/* Centered Happy Onam Logo Header */}
          <div className="flex flex-col items-center justify-center pt-1 pb-1 text-center">
            <img
              src="/Group 1.png"
              alt="Happy Onam"
              className="h-14 sm:h-24 w-auto object-contain mx-auto mb-1"
            />
            
            <p className="text-[11px] sm:text-xs text-gray-600 font-medium tracking-wide mt-0.5">
              {subtitle}
            </p>
          </div>

          {/* Curved Bottom SVG Divider */}
          <div className="absolute left-0 bottom-0 w-full overflow-hidden leading-none translate-y-[99%] pointer-events-none">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-4 sm:h-10 text-white fill-current">
              <path d="M0,0 C300,90 900,90 1200,0 L1200,0 L0,0 Z"></path>
            </svg>
          </div>
        </div>

        {/* Content Section (Middle) - Mobile responsive padding */}
        <div className="pl-[52px] pr-3.5 sm:pl-20 sm:pr-14 pt-12 sm:pt-4 pb-2 flex-1 flex flex-col justify-start text-gray-800 leading-relaxed font-sans text-xs sm:text-sm text-left">
          {/* Main Heading & Greeting */}
          <div className="mb-2.5 sm:mb-3 text-left">
            <p className="font-semibold text-gray-900 text-left mt-1 sm:mt-4">
              Dear {clientName ? clientName : `${companyName} Team`},
            </p>
          </div>

          {/* Body Paragraphs & Quotes - Left Aligned */}
          <div className="space-y-2 sm:space-y-3 text-slate-800 text-xs sm:text-sm leading-relaxed text-left">
            {p1 && (
              <p className="text-slate-800 text-left">
                {renderDynamicTextReact(p1, contextVars)}
              </p>
            )}

            {p2 && (
              <p className="text-slate-800 text-left">
                {renderDynamicTextReact(p2, contextVars)}
              </p>
            )}

            {p3 && (
              <p className="text-slate-800 text-left">
                {renderDynamicTextReact(p3, contextVars)}
              </p>
            )}

            {quote && (
              <p className="text-slate-800 text-left mt-4 sm:mt-0">
                {renderDynamicTextReact(quote, contextVars)}
              </p>
            )}

            {subQuote && (
              <p className="text-slate-800 text-left">
                {renderDynamicTextReact(subQuote, contextVars)}
              </p>
            )}
          </div>

          {/* Sign off - Left Aligned with extra left indent */}
          <div className="mt-8 sm:mt-5 text-xs sm:text-sm text-slate-800 font-sans text-left pb-28 sm:pb-0">
            <p className="text-left">With warm regards,</p>
            <p className="font-bold text-slate-900 mt-0.5 text-left">{senderName}.</p>
          </div>
        </div>

        {/* Spacer for Boat Graphic area at bottom of card */}
        <div className="pb-40 sm:pb-48 z-10 pointer-events-none"></div>
      </div>

      {/* Black Footer Section */}
      <div className="w-full bg-[#0d0d0d] py-3 sm:py-4 px-4 sm:px-6 text-center z-20">
        <a
          href={buttonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#f89a1c] hover:bg-[#e0880f] text-white font-bold text-xs sm:text-sm py-2.5 px-8 rounded-full shadow-md transition-colors tracking-wide"
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
}

// Generate pure, self-contained inline-styled HTML string for email dispatch / export
export function generateEmailHTML({
  companyName = "ALSI Global",
  clientName = "Syam",
  shortName = "ALSI",
  senderName = "Team MarketBytes",
  subtitle = "Celebrating Meaningful Partnerships & New Beginnings",
  bodyText1,
  bodyText2,
  bodyText3,
  bottomQuote,
  bottomSubQuote,
  bgImageUrl,
  logoUrl,
  logo2Url,
  buttonText = "Visit MarketBytes",
  buttonUrl = "https://www.marketbytes.in/"
}) {
  const activeShort = shortName || (companyName ? companyName.split(" ")[0] : "ALSI");

  const p1 = bodyText1 ?? `As the season of Onam brings with it the spirit of togetherness, gratitude, and prosperity, we extend our heartfelt wishes to you, your family and everyone at ${companyName}.`;
  const p2 = bodyText2 ?? `Onam is a beautiful time to celebrate the people and relationships that make every journey meaningful. We truly appreciate the opportunity to work with you and the ${activeShort} team and value the connection we have built along the way.`;
  const p3 = bodyText3 ?? `Your support and collaboration have made our association a wonderful experience. As we look ahead, we hope to continue sharing ideas, achieving new milestones and being part of many more meaningful moments together.`;
  const quote = bottomQuote ?? `May this Onam bring your home the warmth of family, the joy of togetherness and a year ahead filled with peace, good health, prosperity and new beginnings.`;
  const subQuote = bottomSubQuote ?? `Wishing you and your family a blessed and joyful Onam.`;

  const contextVars = { companyName, clientName, shortName: activeShort };

  const rawLogoUrl = logoUrl || (typeof window !== "undefined" ? `${window.location.origin}/Group%201.png` : "https://onamwish.marketbytes.in/Group%201.png");
  const finalLogoUrl = rawLogoUrl.replace(/ /g, "%20");
  const finalLogo2Url = logo2Url || (typeof window !== "undefined" ? `${window.location.origin}/logo2.png` : "https://onamwish.marketbytes.in/logo2.png");
  const finalBgImageUrl = bgImageUrl || (typeof window !== "undefined" ? `${window.location.origin}/marketbytesonamwish.jpg` : "https://onamwish.marketbytes.in/marketbytesonamwish.jpg");
  const vmlBgImageUrl = (bgImageUrl && bgImageUrl.startsWith("http")) ? bgImageUrl : (bgImageUrl || "https://onamwish.marketbytes.in/marketbytesonamwish.jpg");

  return `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light only">
  <title>Happy Onam - ${companyName}</title>
  <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <style>
    :root {
      color-scheme: light only;
      supported-color-schemes: light only;
    }
    body {
      margin: 0;
      padding: 0;
      background-color: #f1f5f9;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .card-container {
      width: 100%;
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      border: 1px solid #e2e8f0;
    }
    .bg-wrapper {
      background-image: url('${finalBgImageUrl}');
      background-size: 100% 100%;
      background-position: top center;
      background-repeat: no-repeat;
    }
    .top-header {
      background-color: #ffffff !important;
      padding: 20px 28px 14px 28px;
    }
    .brand-title {
      font-size: 20px;
      font-weight: 800;
      color: #0f172a !important;
      text-align: left;
      margin: 0 0 6px 0;
    }
    .onam-logo-img {
      max-height: 85px;
      width: auto;
      display: inline-block;
      margin: 2px auto;
    }
    .onam-logo-subtitle {
      color: #475569 !important;
      font-size: 12px;
      font-weight: 500;
      margin-top: 4px;
      text-align: center;
    }
    .curve-divider {
      width: 100%;
      height: 36px;
      overflow: hidden;
      line-height: 0;
      margin-top: -1px;
    }
    .content-body {
      padding: 16px 44px 10px 72px;
      color: #1e293b !important;
      font-size: 14px;
      line-height: 1.65;
      text-align: left;
    }
    .main-heading {
      color: #0f172a !important;
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 12px;
      text-align: left;
    }
    .green-text { color: #059669 !important; }
    .dear-text { font-weight: 700; color: #0f172a !important; margin-bottom: 12px; text-align: left; }
    .paragraph { margin-bottom: 12px; color: #334155 !important; font-size: 13.5px; line-height: 1.65; text-align: left; }
    .sign-off { margin-top: 20px; font-size: 14px; color: #1e293b !important; text-align: left; }
    .bottom-section {
      text-align: left;
      padding: 0 48px 220px 48px;
    }
    .black-footer {
      background-color: #0d0d0d !important;
      padding: 16px 20px;
      text-align: center;
    }
    .cta-button {
      display: inline-block;
      background-color: #f89a1c;
      color: #ffffff !important;
      font-weight: 700;
      font-size: 14px;
      text-decoration: none;
      padding: 10px 32px;
      border-radius: 50px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    /* Desktop View (> 600px) */
    @media only screen and (min-width: 601px) {
      .card-container {
        width: 600px !important;
        margin: 20px auto !important;
      }
      .bg-wrapper {
        min-height: 940px !important;
      }
      .content-body {
        padding: 16px 44px 10px 72px !important;
        text-align: left !important;
      }
      .main-heading {
        text-align: left !important;
      }
      .paragraph {
        font-size: 13.5px !important;
        line-height: 1.65 !important;
        margin-bottom: 12px !important;
        text-align: left !important;
      }
      .sign-off {
        text-align: left !important;
      }
      .bottom-section {
        padding: 0 48px 220px 48px !important;
      }
    }

    /* Mobile Responsive Overrides ONLY (< 600px) */
    @media only screen and (max-width: 600px) {
      .card-container {
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 auto !important;
        border-radius: 0px !important;
        border: none !important;
      }
      .bg-wrapper {
        min-height: 0 !important;
        background-size: 100% 100% !important;
        background-position: top center !important;
      }
      .top-header {
        padding: 10px 14px 4px 14px !important;
      }
      .brand-title {
        font-size: 16px !important;
        margin-bottom: 3px !important;
      }
      .onam-logo-img {
        max-height: 56px !important;
      }
      .onam-logo-subtitle {
        font-size: 11px !important;
      }
      .curve-divider {
        height: 14px !important;
      }
      .curve-divider svg {
        height: 14px !important;
      }
      .content-body {
        padding: 12px 14px 8px 52px !important;
        text-align: left !important;
      }
      .main-heading {
        font-size: 14.5px !important;
        margin-bottom: 6px !important;
        text-align: left !important;
      }
      .dear-text {
        font-size: 13px !important;
        margin-bottom: 6px !important;
        text-align: left !important;
      }
      .paragraph {
        font-size: 12.5px !important;
        line-height: 1.5 !important;
        margin-bottom: 8px !important;
        text-align: left !important;
      }
      .paragraph.quote-text {
        margin-top: 16px !important;
      }
      .sign-off {
        margin-top: 28px !important;
        padding-bottom: 80px !important;
        font-size: 13px !important;
        text-align: left !important;
      }
      .bottom-section {
        padding: 0 14px 140px 14px !important;
      }
      .black-footer {
        padding: 12px 8px !important;
      }
      .cta-button {
        padding: 8px 24px !important;
        font-size: 13px !important;
      }
    }

    /* Dark Mode Protection for Mobile Mail Clients (Gmail, iOS Mail, Outlook) */
    @media (prefers-color-scheme: dark) {
      .card-container { background-color: #ffffff !important; }
      .top-header { background-color: #ffffff !important; }
      .brand-title { color: #0f172a !important; }
      .onam-logo-subtitle { color: #475569 !important; }
      .content-body { color: #1e293b !important; text-align: left !important; }
      .main-heading { color: #0f172a !important; text-align: left !important; }
      .green-text { color: #059669 !important; }
      .dear-text { color: #0f172a !important; text-align: left !important; }
      .paragraph { color: #334155 !important; text-align: left !important; }
      .sign-off { color: #1e293b !important; text-align: left !important; }
      .black-footer { background-color: #0d0d0d !important; }
    }

    /* Target Mobile Gmail App Dark Mode Inversion Override */
    u + .body .card-container { background-color: #ffffff !important; }
    u + .body .top-header { background-color: #ffffff !important; }
    u + .body .brand-title { color: #0f172a !important; }
    u + .body .onam-logo-subtitle { color: #475569 !important; }
    u + .body .content-body { color: #1e293b !important; text-align: left !important; }
    u + .body .main-heading { color: #0f172a !important; text-align: left !important; }
    u + .body .green-text { color: #059669 !important; }
    u + .body .dear-text { color: #0f172a !important; text-align: left !important; }
    u + .body .paragraph { color: #334155 !important; text-align: left !important; }
    u + .body .sign-off { color: #1e293b !important; text-align: left !important; }
  </style>
</head>
<body class="body">
  <div class="card-container">
    <!--[if gte mso 9]>
    <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;height:940px;">
      <v:fill type="frame" src="${vmlBgImageUrl}" color="#ffffff" />
      <v:textbox inset="0,0,0,0">
    <![endif]-->
    <div class="bg-wrapper" style="background-image: url('${finalBgImageUrl}');">
      <div class="top-header" style="background-color: #ffffff !important;">
        <div class="brand-title">
          <img src="${finalLogo2Url}" alt="" style="max-height:36px; width:auto; display:inline-block;" />
        </div>
        <div style="text-align: center; margin: 2px 0 4px 0;">
          <img src="${finalLogoUrl}" alt="Happy Onam" class="onam-logo-img" style="max-height:85px; width:auto; display:inline-block;" />
        </div>
        <div class="onam-logo-subtitle" style="color: #475569 !important;">${subtitle}</div>
      </div>
      <div class="curve-divider">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style="width: 100%; height: 36px; display: block;">
          <path d="M0,0 C300,90 900,90 1200,0 L1200,0 L0,0 Z" fill="#ffffff"></path>
        </svg>
      </div>

      <div class="content-body" style="color: #1e293b !important; text-align: left;">
        <div class="dear-text" style="color: #0f172a !important; text-align: left; margin-top: 16px;">Dear ${clientName ? clientName : `${companyName} Team`},</div>
        ${p1 ? `<div class="paragraph" style="color: #334155 !important; text-align: left;">${renderDynamicTextHTML(p1, contextVars)}</div>` : ''}
        ${p2 ? `<div class="paragraph" style="color: #334155 !important; text-align: left;">${renderDynamicTextHTML(p2, contextVars)}</div>` : ''}
        ${p3 ? `<div class="paragraph" style="color: #334155 !important; text-align: left;">${renderDynamicTextHTML(p3, contextVars)}</div>` : ''}
        ${quote ? `<div class="paragraph quote-text" style="color: #334155 !important; text-align: left;">${renderDynamicTextHTML(quote, contextVars)}</div>` : ''}
        ${subQuote ? `<div class="paragraph" style="color: #334155 !important; text-align: left;">${renderDynamicTextHTML(subQuote, contextVars)}</div>` : ''}
        <div class="sign-off" style="color: #1e293b !important; text-align: left;">
          <p style="margin:0; color: #1e293b !important; text-align: left;">With warm regards,</p>
          <p style="margin:4px 0 0 0; font-weight: 700; color: #0f172a !important; text-align: left;">${senderName}.</p>
        </div>
      </div>

      <div class="bottom-section"></div>
    </div>
    <!--[if gte mso 9]>
      </v:textbox>
    </v:rect>
    <![endif]-->

    <div class="black-footer" style="background-color: #0d0d0d !important;">
      <a href="${buttonUrl}" class="cta-button" target="_blank">${buttonText}</a>
    </div>
  </div>
</body>
</html>`;
}
