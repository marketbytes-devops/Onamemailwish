import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { generateEmailHTML } from "@/frontend/components/EmailTemplate.jsx";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      to = [],
      cc = [],
      subject = "Happy Onam - Celebrating Meaningful Partnerships & New Beginnings",
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
      buttonText,
      buttonUrl,
      smtpConfig
    } = body;

    // Ensure To and CC addresses are valid arrays of email strings
    const recipientList = (Array.isArray(to) ? to : [to])
      .map((e) => (typeof e === "string" ? e.trim() : ""))
      .filter((e) => e && e.includes("@"));

    const ccList = (Array.isArray(cc) ? cc : [cc])
      .map((e) => (typeof e === "string" ? e.trim() : ""))
      .filter((e) => e && e.includes("@"));

    if (recipientList.length === 0) {
      return NextResponse.json(
        { success: false, error: "At least one recipient email ('To') is required." },
        { status: 400 }
      );
    }

    const htmlContent = generateEmailHTML({
      companyName,
      clientName,
      shortName,
      senderName,
      subtitle,
      bodyText1,
      bodyText2,
      bodyText3,
      bottomQuote,
      bottomSubQuote,
      buttonText,
      buttonUrl,
      logoUrl: "https://onamwish.marketbytes.in/Group%201.png",
      logo2Url: "https://onamwish.marketbytes.in/logo2.png",
      bgImageUrl: "https://onamwish.marketbytes.in/marketbytesonamwish.jpg"
    });

    const attachments = [];

    const activeShort = shortName || (companyName ? companyName.split(" ")[0] : "ALSI");
    const p1 = bodyText1 || `As the season of Onam brings with it the spirit of togetherness, gratitude, and prosperity, we extend our heartfelt wishes to you, your family and everyone at ${companyName}.`;
    const p2 = bodyText2 || `Onam is a beautiful time to celebrate the people and relationships that make every journey meaningful. We truly appreciate the opportunity to work with you and the ${activeShort} team and value the connection we have built along the way.`;
    const p3 = bodyText3 || `Your support and collaboration have made our association a wonderful experience. As we look ahead, we hope to continue sharing ideas, achieving new milestones and being part of many more meaningful moments together.`;
    const quote = bottomQuote || `May this Onam bring your home the warmth of family, the joy of togetherness and a year ahead filled with peace, good health, prosperity and new beginnings.`;
    const subQuote = bottomSubQuote || `Wishing you and your family a blessed and joyful Onam.`;

    const textContent = `Dear ${clientName ? clientName : `${companyName} Team`},\n\n${p1}\n\n${p2}\n\n${p3}\n\n${quote}\n\n${subQuote}\n\nWith warm regards,\n${senderName}.`;

    // Check if custom SMTP parameters are supplied or fall back to environment / Hostinger credentials
    const host = smtpConfig?.host || process.env.SMTP_HOST || "smtp.hostinger.com";
    const port = smtpConfig?.port || process.env.SMTP_PORT || "465";
    const user = smtpConfig?.user || process.env.SMTP_USER || "info@marketbytes.in";
    const pass = smtpConfig?.pass || process.env.SMTP_PASS || "@axuwa31froxebamUfuf";

    if (host && user && pass) {
      // Create real SMTP Transporter
      const transporter = nodemailer.createTransport({
        host,
        port: Number(port) || 465,
        secure: Number(port) === 465,
        auth: { user, pass },
        tls: {
          rejectUnauthorized: false
        }
      });

      let info;
      try {
        // Attempt 1: Standard send with CC
        info = await transporter.sendMail({
          from: `"${senderName}" <${user}>`,
          replyTo: user,
          to: recipientList.join(", "),
          cc: ccList.length > 0 ? ccList.join(", ") : undefined,
          subject,
          text: textContent,
          html: htmlContent,
          attachments
        });
      } catch (sendErr) {
        const errMsg = sendErr.message || "";
        const isCcRateLimit =
          ccList.length > 0 &&
          (errMsg.toLowerCase().includes("ratelimit") ||
            errMsg.includes("451") ||
            errMsg.toLowerCase().includes("exceeded"));

        if (isCcRateLimit) {
          console.warn(
            "Hostinger rate-limited multi-recipient CC dispatch. Executing automatic separate dispatch fallback..."
          );

          // Fallback Dispatch 1: Send to primary 'To' recipients with CC header
          info = await transporter.sendMail({
            from: `"${senderName}" <${user}>`,
            replyTo: user,
            to: recipientList.join(", "),
            headers: {
              Cc: ccList.join(", ")
            },
            subject,
            text: textContent,
            html: htmlContent,
            attachments
          });

          // Brief delay between connections
          await new Promise((res) => setTimeout(res, 800));

          // Fallback Dispatch 2: Send copy to 'CC' recipients
          try {
            await transporter.sendMail({
              from: `"${senderName}" <${user}>`,
              replyTo: user,
              to: ccList.join(", "),
              headers: {
                Cc: ccList.join(", ")
              },
              subject,
              text: textContent,
              html: htmlContent,
              attachments
            });
          } catch (ccErr) {
            console.error("Secondary CC dispatch failed:", ccErr.message);
            // Main 'To' recipient already succeeded, so return partial success notice
            return NextResponse.json({
              success: true,
              message: `Email successfully delivered to To recipient(s) (${recipientList.join(
                ", "
              )}). CC delivery skipped due to Hostinger rate limit.`,
              messageId: info.messageId,
              recipients: { to: recipientList, cc: [] },
              isSimulated: false
            });
          }
        } else {
          throw sendErr;
        }
      }

      return NextResponse.json({
        success: true,
        message: `Email successfully dispatched to ${recipientList.length} To recipient(s)${
          ccList.length > 0 ? ` and ${ccList.length} CC recipient(s)` : ""
        }.`,
        messageId: info.messageId,
        recipients: { to: recipientList, cc: ccList },
        isSimulated: false
      });
    }

    // Simulation / Demo Mode when no SMTP configured
    await new Promise((res) => setTimeout(res, 1200)); // realistic network delay

    return NextResponse.json({
      success: true,
      message: `[Demo Mode] Email simulation completed for ${recipientList.length} recipient(s) & ${ccList.length} CC(s). Configure SMTP to send live emails.`,
      messageId: `sim_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      recipients: { to: recipientList, cc: ccList },
      isSimulated: true,
      htmlPreviewSnippet: htmlContent.substring(0, 300) + "..."
    });
  } catch (error) {
    console.error("Error in send-email API:", error);
    const errStr = error.message || "";
    const isRateLimit =
      errStr.toLowerCase().includes("ratelimit") ||
      errStr.includes("451 4.7.1") ||
      errStr.toLowerCase().includes("exceeded");

    return NextResponse.json(
      {
        success: false,
        error: errStr || "Failed to process email dispatch.",
        isRateLimit,
        rateLimitDetails: isRateLimit
          ? "Hostinger SMTP rate limit reached. Hostinger counts each CC email as an additional recipient towards your hourly limit. Wait 5-10 minutes for Hostinger's quota to reset, or configure custom SMTP credentials in the SMTP Server tab."
          : undefined
      },
      { status: 500 }
    );
  }
}
