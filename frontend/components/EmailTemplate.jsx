import React from "react";

// Render React elements with replaced dynamic placeholders & bolded variables
function renderDynamicTextReact(text, { companyName = "ALSI Global", clientName = "Syam", shortName = "ALSI" }) {
  if (!text) return "";
  const activeShort = (shortName || (companyName ? companyName.split(" ")[0] : "ALSI")).trim();
  const trimmedCompany = (companyName || "ALSI Global").trim();
  const trimmedClient = (clientName || "Syam").trim();

  let textWithValues = text
    .replaceAll("{{company_name}}", trimmedCompany)
    .replaceAll("{{client_name}}", trimmedClient)
    .replaceAll("{{short_name}}", activeShort)
    .replaceAll("{{team_name}}", activeShort);

  const terms = Array.from(new Set([trimmedCompany, trimmedClient, activeShort]))
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);

  if (terms.length === 0) return textWithValues;

  const escapedTerms = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escapedTerms.join("|")})`, "g");
  const parts = textWithValues.split(regex);

  return parts.map((part, i) => {
    if (terms.includes(part)) {
      return <strong key={i} className="font-bold text-slate-950">{part}</strong>;
    }
    return part;
  });
}

// Render HTML string with replaced dynamic placeholders for generateEmailHTML
function renderDynamicTextHTML(text, { companyName = "ALSI Global", clientName = "Syam", shortName = "ALSI" }) {
  if (!text) return "";
  const activeShort = (shortName || (companyName ? companyName.split(" ")[0] : "ALSI")).trim();
  const trimmedCompany = (companyName || "ALSI Global").trim();
  const trimmedClient = (clientName || "Syam").trim();

  let textWithValues = text
    .replaceAll("{{company_name}}", trimmedCompany)
    .replaceAll("{{client_name}}", trimmedClient)
    .replaceAll("{{short_name}}", activeShort)
    .replaceAll("{{team_name}}", activeShort);

  const terms = Array.from(new Set([trimmedCompany, trimmedClient, activeShort]))
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);

  if (terms.length === 0) return textWithValues;

  const escapedTerms = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escapedTerms.join("|")})`, "g");

  return textWithValues.replace(regex, (match) => `<strong>${match}</strong>`);
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
  buttonText = "Watch MarketBytes Onam 2k26",
  buttonUrl = "https://youtu.be/DLJwI_ETPds?si=ohZEKjREvNEPMmIa"
}) {
  const activeShort = shortName || (companyName ? companyName.split(" ")[0] : "ALSI");

  const p1 = bodyText1 ?? `As the season of Onam brings with it the spirit of togetherness, gratitude, and prosperity, we extend our heartfelt wishes to you, your family and everyone at {{company_name}}.`;
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
        <div className="w-full bg-white pt-1.5 sm:pt-3 pb-0.5 sm:pb-3 px-3.5 sm:px-7 relative shadow-xs">
          {/* Top Header Row */}
          <div className="flex justify-between items-start mb-0.5">
            <div className="flex items-center gap-1.5">
              <img
                src="/logo2.png"
                alt=""
                className="h-6 sm:h-8 w-auto object-contain"
              />
            </div>
          </div>

          {/* Centered Happy Onam Logo Header */}
          <div className="flex flex-col items-center justify-center pt-0.5 pb-0.5 text-center">
            <img
              src="/Group 1.png"
              alt="Happy Onam"
              className="h-12 sm:h-20 w-auto object-contain mx-auto mb-0.5"
            />
            
            <p className="text-[11px] sm:text-xs text-gray-600 font-medium tracking-wide mt-0">
              {subtitle}
            </p>
          </div>

          {/* Curved Bottom SVG Divider */}
          <div className="absolute left-0 bottom-0 w-full overflow-hidden leading-none translate-y-[99%] pointer-events-none">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-3 sm:h-7 text-white fill-current">
              <path d="M0,0 C300,90 900,90 1200,0 L1200,0 L0,0 Z"></path>
            </svg>
          </div>
        </div>

        {/* Content Section (Middle) - Shifted slightly downwards with text-shadow for maximum readability */}
        <div 
          className="px-4 sm:pl-20 sm:pr-14 pt-0.5 sm:pt-6 pb-2 flex-1 flex flex-col justify-start text-gray-900 leading-relaxed font-sans text-[13px] sm:text-sm text-left"
          style={{ textShadow: "0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.9)" }}
        >
          {/* Main Heading & Greeting */}
          <div className="mb-1 sm:mb-2.5 text-left">
            <p className="font-normal text-slate-900 text-left mt-0 sm:mt-2 text-[13.5px] sm:text-base">
              Dear {clientName ? <strong className="font-bold text-slate-950">{clientName}</strong> : <><strong className="font-bold text-slate-950">{companyName}</strong> Team</>},
            </p>
          </div>

          {/* Body Paragraphs & Quotes - Left Aligned */}
          <div className="space-y-2 sm:space-y-2.5 text-slate-900 text-[13px] sm:text-sm leading-relaxed text-left font-medium">
            {p1 && (
              <p className="text-slate-900 text-left">
                {renderDynamicTextReact(p1, contextVars)}
              </p>
            )}

            {p2 && (
              <p className="text-slate-900 text-left">
                {renderDynamicTextReact(p2, contextVars)}
              </p>
            )}

            {p3 && (
              <p className="text-slate-900 text-left">
                {renderDynamicTextReact(p3, contextVars)}
              </p>
            )}

            {quote && (
              <p className="text-slate-900 text-left mt-2 sm:mt-0 font-medium">
                {renderDynamicTextReact(quote, contextVars)}
              </p>
            )}

            {subQuote && (
              <p className="font-bold text-slate-950 text-left text-[13.5px] sm:text-sm">
                {renderDynamicTextReact(subQuote, contextVars)}
              </p>
            )}
          </div>

          {/* Sign off - Left Aligned with extra left indent */}
          <div className="mt-4 sm:mt-4 text-[13px] sm:text-sm text-slate-900 font-sans text-left pb-0 font-normal">
            <p className="text-left font-normal text-slate-900">With warm regards,</p>
            <p className="font-bold text-slate-950 mt-0.5 text-left">{senderName}.</p>
          </div>
        </div>

        {/* Spacer for Boat Graphic area at bottom of card - Increased to push boat down on mobile */}
        <div className="pb-[350px] sm:pb-48 z-10 pointer-events-none"></div>
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
  buttonText = "Watch MarketBytes Onam 2k26",
  buttonUrl = "https://youtu.be/DLJwI_ETPds?si=ohZEKjREvNEPMmIa"
}) {
  const activeShort = shortName || (companyName ? companyName.split(" ")[0] : "ALSI");

  const p1 = bodyText1 ?? `As the season of Onam brings with it the spirit of togetherness, gratitude, and prosperity, we extend our heartfelt wishes to you, your family and everyone at {{company_name}}.`;
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
      padding: 10px 28px 6px 28px;
    }
    .brand-title {
      font-size: 20px;
      font-weight: 800;
      color: #0f172a !important;
      text-align: left;
      margin: 0 0 4px 0;
    }
    .onam-logo-img {
      max-height: 72px;
      width: auto;
      display: inline-block;
      margin: 2px auto;
    }
    .onam-logo-subtitle {
      color: #475569 !important;
      font-size: 12px;
      font-weight: 500;
      margin-top: 2px;
      text-align: center;
    }
    .curve-divider {
      width: 100%;
      height: 24px;
      overflow: hidden;
      line-height: 0;
      margin-top: -1px;
    }
    .content-body {
      padding: 16px 44px 10px 72px;
      color: #0f172a !important;
      font-size: 14px;
      line-height: 1.6;
      text-align: left;
      text-shadow: 0 1px 3px rgba(255, 255, 255, 0.95), 0 0 6px rgba(255, 255, 255, 0.9);
    }
    .main-heading {
      color: #0f172a !important;
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 8px;
      text-align: left;
    }
    .green-text { color: #059669 !important; }
    .dear-text { font-weight: 400; color: #0f172a !important; margin-bottom: 8px; margin-top: 6px; text-align: left; font-size: 14.5px; }
    .paragraph { margin-bottom: 9px; color: #0f172a !important; font-size: 13.5px; line-height: 1.6; font-weight: 500; text-align: left; }
    .sign-off { margin-top: 14px; font-size: 14px; color: #0f172a !important; font-weight: 400; text-align: left; }
    .bottom-section {
      text-align: left;
      padding: 0 48px 240px 48px;
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
        line-height: 1.6 !important;
        margin-bottom: 9px !important;
        text-align: left !important;
      }
      .sign-off {
        margin-top: 14px !important;
        text-align: left !important;
      }
      .bottom-section {
        padding: 0 48px 240px 48px !important;
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
        padding: 6px 14px 2px 14px !important;
      }
      .brand-title {
        font-size: 16px !important;
        margin-bottom: 2px !important;
      }
      .onam-logo-img {
        max-height: 46px !important;
      }
      .onam-logo-subtitle {
        font-size: 11px !important;
        margin-top: 1px !important;
      }
      .curve-divider {
        height: 12px !important;
      }
      .curve-divider svg {
        height: 12px !important;
      }
      .content-body {
        padding: 2px 16px 4px 16px !important;
        text-align: left !important;
        text-shadow: 0 1px 3px #ffffff, 0 0 6px #ffffff !important;
      }
      .main-heading {
        font-size: 14.5px !important;
        margin-bottom: 4px !important;
        text-align: left !important;
      }
      .dear-text {
        font-size: 13.5px !important;
        margin-top: 0px !important;
        margin-bottom: 6px !important;
        color: #0f172a !important;
        font-weight: 400 !important;
        text-align: left !important;
      }
      .paragraph {
        font-size: 13px !important;
        line-height: 1.55 !important;
        margin-bottom: 7px !important;
        color: #0f172a !important;
        font-weight: 500 !important;
        text-align: left !important;
      }
      .paragraph.quote-text {
        margin-top: 6px !important;
      }
      .sign-off {
        margin-top: 12px !important;
        padding-bottom: 0px !important;
        font-size: 13.5px !important;
        color: #0f172a !important;
        font-weight: 400 !important;
        text-align: left !important;
      }
      .bottom-section {
        padding: 0 14px 350px 14px !important;
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
      .content-body { color: #0f172a !important; text-align: left !important; }
      .main-heading { color: #0f172a !important; text-align: left !important; }
      .green-text { color: #059669 !important; }
      .dear-text { color: #0f172a !important; text-align: left !important; }
      .paragraph { color: #0f172a !important; text-align: left !important; }
      .sign-off { color: #0f172a !important; text-align: left !important; }
      .black-footer { background-color: #0d0d0d !important; }
    }

    /* Target Mobile Gmail App Dark Mode Inversion Override */
    u + .body .card-container { background-color: #ffffff !important; }
    u + .body .top-header { background-color: #ffffff !important; }
    u + .body .brand-title { color: #0f172a !important; }
    u + .body .onam-logo-subtitle { color: #475569 !important; }
    u + .body .content-body { color: #0f172a !important; text-align: left !important; }
    u + .body .main-heading { color: #0f172a !important; text-align: left !important; }
    u + .body .green-text { color: #059669 !important; }
    u + .body .dear-text { color: #0f172a !important; text-align: left !important; }
    u + .body .paragraph { color: #0f172a !important; text-align: left !important; }
    u + .body .sign-off { color: #0f172a !important; text-align: left !important; }
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
          <img src="${finalLogo2Url}" alt="" style="max-height:32px; width:auto; display:inline-block;" />
        </div>
        <div style="text-align: center; margin: 2px 0 2px 0;">
          <img src="${finalLogoUrl}" alt="Happy Onam" class="onam-logo-img" style="max-height:72px; width:auto; display:inline-block;" />
        </div>
        <div class="onam-logo-subtitle" style="color: #475569 !important;">${subtitle}</div>
      </div>
      <div class="curve-divider">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style="width: 100%; height: 24px; display: block;">
          <path d="M0,0 C300,90 900,90 1200,0 L1200,0 L0,0 Z" fill="#ffffff"></path>
        </svg>
      </div>

      <div class="content-body" style="color: #0f172a !important; text-align: left;">
        <div class="dear-text" style="color: #0f172a !important; font-weight: 400; text-align: left; margin-top: 0px;">Dear ${clientName ? `<strong style="font-weight: 700;">${clientName}</strong>` : `<strong style="font-weight: 700;">${companyName}</strong> Team`},</div>
        ${p1 ? `<div class="paragraph" style="color: #0f172a !important; font-weight: 500; text-align: left;">${renderDynamicTextHTML(p1, contextVars)}</div>` : ''}
        ${p2 ? `<div class="paragraph" style="color: #0f172a !important; font-weight: 500; text-align: left;">${renderDynamicTextHTML(p2, contextVars)}</div>` : ''}
        ${p3 ? `<div class="paragraph" style="color: #0f172a !important; font-weight: 500; text-align: left;">${renderDynamicTextHTML(p3, contextVars)}</div>` : ''}
        ${quote ? `<div class="paragraph quote-text" style="color: #0f172a !important; font-weight: 500; text-align: left;">${renderDynamicTextHTML(quote, contextVars)}</div>` : ''}
        ${subQuote ? `<div class="paragraph" style="color: #020617 !important; font-weight: 700; text-align: left;">${renderDynamicTextHTML(subQuote, contextVars)}</div>` : ''}
        <div class="sign-off" style="color: #0f172a !important; text-align: left;">
          <p style="margin:0; color: #0f172a !important; font-weight: 400; text-align: left;">With warm regards,</p>
          <p style="margin:2px 0 0 0; font-weight: 700; color: #020617 !important; text-align: left;">${senderName}.</p>
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

