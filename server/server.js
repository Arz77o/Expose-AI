import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// إعداد المسارات
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ميدلويرات
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// تقديم ملفات HTML و CSS و JS
app.use(express.static(path.join(__dirname, "..", "public")));


// ================================
// 🔵 1) نقطة تشغيل Gemini API
// ================================
app.post("/api/generate", async (req, res) => {
  try {
    const { title, language, template, structure } = req.body;

    if (!title || !language || !template || !structure) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // قراءة قالب البحث من ملف
    const templatePath = path.join(__dirname, "templates", `${template}.txt`);
    const templateContent = fs.readFileSync(templatePath, "utf8");

    const prompt = `
انت نظام لإعداد البحوث الجامعية.
لغة البحث: ${language}
عنوان البحث: ${title}

هيكل البحث المطلوب:
${structure}

القالب المستعمل:
${templateContent}

قم الآن بإنشاء البحث بدقة وبطريقة أكاديمية.
`;

    // إرسال الطلب إلى Gemini API
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        params: { key: process.env.GOOGLE_API_KEY },
      }
    );

    const output =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "خطأ: لم يتم استلام نص من Gemini";

    res.json({ result: output });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gemini API Error" });
  }
});


// ================================
// 🔵 2) نقطة الدفع عبر Chargily (لاحقاً)
// ================================
app.post("/api/pay", async (req, res) => {
  res.json({ message: "سيتم إضافة الدفع لاحقاً" });
});


// ================================
// 🔵 3) تشغيل السيرفر
// ================================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
