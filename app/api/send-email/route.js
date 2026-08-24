import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
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

    // Ensure To address is present
    const recipientList = Array.isArray(to) ? to.filter(Boolean) : [to].filter(Boolean);
    const ccList = Array.isArray(cc) ? cc.filter(Boolean) : [cc].filter(Boolean);

    if (recipientList.length === 0) {
      return NextResponse.json(
        { success: false, error: "At least one recipient email ('To') is required." },
        { status: 400 }
      );
    }

    const logoPath = path.join(process.cwd(), "public", "Group 1.png");
    const bgPath = path.join(process.cwd(), "public", "marketbytesonamwish.png");

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
      logoUrl: "cid:onam_logo",
      bgImageUrl: "cid:onam_bg"
    });

    const attachments = [];
    if (fs.existsSync(logoPath)) {
      attachments.push({
        filename: "Group 1.png",
        path: logoPath,
        cid: "onam_logo",
        contentDisposition: "inline"
      });
    }
    if (fs.existsSync(bgPath)) {
      attachments.push({
        filename: "marketbytesonamwish.png",
        path: bgPath,
        cid: "onam_bg",
        contentDisposition: "inline"
      });
    }

    // Check if custom SMTP parameters are supplied or fall back to environment / Hostinger credentials
    const host = smtpConfig?.host || process.env.SMTP_HOST || "smtp.hostinger.com";
    const port = smtpConfig?.port || process.env.SMTP_PORT || "465";
    const user = smtpConfig?.user || process.env.SMTP_USER || "work@marketbyteswebworks.com";
    const pass = smtpConfig?.pass || process.env.SMTP_PASS || "@jRvt&vnte:0";

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

      const info = await transporter.sendMail({
        from: `"${senderName}" <${user}>`,
        to: recipientList.join(", "),
        cc: ccList.length > 0 ? ccList.join(", ") : undefined,
        subject,
        html: htmlContent,
        attachments
      });

      return NextResponse.json({
        success: true,
        message: `Email successfully dispatched to ${recipientList.length} recipient(s).`,
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
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process email dispatch." },
      { status: 500 }
    );
  }
}
