import { useRef } from 'react'
import Spline from '@splinetool/react-spline'

function Section({ title, children, id }) {
  return (
    <section id={id} className="max-w-4xl mx-auto mb-12 px-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
      <div className="bg-white/80 backdrop-blur rounded-xl shadow-sm border border-gray-200 p-5 leading-relaxed text-gray-800 whitespace-pre-wrap">
        {children}
      </div>
    </section>
  )
}

export default function App() {
  const pageRef = useRef(null)

  const copyAll = async () => {
    try {
      const text = document.getElementById('full-spec')?.innerText || ''
      await navigator.clipboard.writeText(text)
      alert('All content copied to clipboard!')
    } catch (e) {
      alert('Copy failed. You can select and copy manually.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-teal-50 text-gray-900">
      {/* Hero */}
      <div className="relative h-[420px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/50 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-10">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur px-3 py-1 rounded-full border border-gray-200 text-sm text-gray-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Tech, portfolio, interactive, playful, modern
          </div>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Typing Recorder Keyboard App + PHP Backend
          </h1>
          <p className="mt-3 max-w-2xl text-gray-700">
            Copy-ready product brief with exact features, formats, and backend contract. Use the button below to copy everything.
          </p>
          <div className="mt-6">
            <button onClick={copyAll} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow">
              Copy Entire Spec
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <main ref={pageRef} className="py-10">
        <div id="full-spec" className="sr-only">
{`
Typing Recorder Keyboard App + PHP Backend”

(इसे पूरा कॉपी–पेस्ट करो)


---

📌 PROJECT: Android Keyboard App with Typing Recorder + Clean Summary + PHP Backend Storage

Build a complete Android Keyboard App (IME) in Kotlin that records what the user types and generates a clean, structured typing summary.
The keyboard will also send this summary to a PHP + MySQL backend for backup.

Below are the exact, mandatory features:


---

1️⃣ ANDROID KEYBOARD (IME) – FEATURES TO BUILD

✔ A. Real-time Key Capture

Keyboard must record:

English letters

Hindi IME composing letters (handle composition events)

Numbers

Space → record as [Space]

Enter → record as [Enter]

Backspace → group as [Backspace × N]

Symbols and punctuation

Multi-character IME output (है, क्या, मेरे)


Keyboard must NOT record text typed in password fields.
Detect using:
EditorInfo.TYPE_TEXT_VARIATION_PASSWORD
EditorInfo.TYPE_NUMBER_VARIATION_PASSWORD


---

✔ B. Clean Summary Generator (Very Important)

Convert captured keystrokes into this exact multi-line format:

h, e, l, l, o, [Space], w, o, r, l, d
[Backspace × 3]
r, a, m
[Backspace × 12]

Rules:

1. Normal characters → comma-separated


2. Continuous backspaces → group as [Backspace × N]


3. Space → [Space]


4. Enter → [Enter]


5. Hindi IME final characters only (ignore intermediate composition letters)


6. New line after each Backspace group


7. New line when typing continues after a Backspace burst



This summary must be exactly like above.


---

✔ C. Local Database (Room / SQLite)

Store each typing session with:

id

user_id

summary (TEXT)

raw_keys (JSON array)

wpm (optional)

accuracy (optional)

created_at timestamp



---

✔ D. Auto-Upload Summary to Backend

Keyboard must send JSON to PHP backend via POST:

{
  "user_id": 7,
  "summary": "clean multiline summary",
  "raw_keys": ["h","e","l","l","o"],
  "wpm": 32,
  "accuracy": 87
}

Use OkHttp / Retrofit / Volley.


---

✔ E. Settings App (Companion App)

Create a small settings app with:

Recording ON/OFF switch

List of saved sessions (from Room DB)

Button: “Send summary to Gmail”

Button: “Upload summary again to server”

Button: “Delete all history”

Privacy Notice & Terms page



---

✔ F. Export/Share Options

User must be able to:

Save summary as a .txt file

Share summary (Gmail, WhatsApp, Telegram)

Sync summary to PHP backend manually



---

✔ G. Security & Privacy Rules

Do NOT record keystrokes in password fields

Recording starts only after user gives consent

Show clear message: “This keyboard records your typing summary for analysis.”

Data stays local + backend (ONLY what user types, no hidden logging)



---

2️⃣ BACKEND – PHP + MYSQL

Build a simple backend that receives typing summaries and stores them.


---

✔ A. Database Table

Create MySQL table:

typing_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  summary TEXT,
  raw_keys JSON,
  wpm INT,
  accuracy FLOAT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


---

✔ B. PHP API: save.php

This file must:

1. Read JSON input


2. Insert data into MySQL


3. Return success response



Example:

<?php
$data = json_decode(file_get_contents("php://input"), true);

$conn = new mysqli("localhost","root","","typing_db");

$stmt = $conn->prepare("
  INSERT INTO typing_data (user_id, summary, raw_keys, wpm, accuracy)
  VALUES (?,?,?,?,?)
");

$stmt->bind_param(
  "issii",
  $data['user_id'],
  $data['summary'],
  json_encode($data['raw_keys']),
  $data['wpm'],
  $data['accuracy']
);

$stmt->execute();

echo json_encode(["status"=>"ok"]);
?>


---

3️⃣ EXACT INPUT/OUTPUT FORMAT

✔ Input to backend (from keyboard):

{
  "user_id": 7,
  "summary": "h, e, l, [Space], o\n[Backspace × 3]\nr, a, m",
  "raw_keys": ["h","e","l","l","o"],
  "wpm": 42,
  "accuracy": 90
}


---

✔ Output to user:

Save in local DB

Upload to backend

Clean summary preview in settings



---

4️⃣ DELIVERABLES REQUIRED

AI must generate:

1. Full Android Studio Project
✔ Custom Keyboard
✔ Key Recorder
✔ Summary Generator
✔ Room Database
✔ Settings App
✔ Backend Sync Code


2. Complete PHP Backend
✔ save.php
✔ MySQL schema


3. Documentation
✔ Install keyboard
✔ Enable IME
✔ How to connect backend
✔ How to export/share summary



---

5️⃣ RULES

Output must be clean, complete, production-ready code

Must support Hindi IME + English both

Summary format must be EXACT as specified

Must not record passwords

Both local + server backup required

All code must work on Android 8+



[SYSTEM: Auto-enhanced with Spline asset]

Use this Spline as the main object for the hero section: https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode

This asset has the theme: "tech, portfolio, interactive, playful, modern"

Asset type: 3D Object

[END SYSTEM]
`}
        </div>

        <Section id="intro" title="Typing Recorder Keyboard App + PHP Backend">
{`(इसे पूरा कॉपी–पेस्ट करो)

---

📌 PROJECT: Android Keyboard App with Typing Recorder + Clean Summary + PHP Backend Storage

Build a complete Android Keyboard App (IME) in Kotlin that records what the user types and generates a clean, structured typing summary.
The keyboard will also send this summary to a PHP + MySQL backend for backup.

Below are the exact, mandatory features:`}
        </Section>

        <Section id="ime" title="1️⃣ ANDROID KEYBOARD (IME) – FEATURES TO BUILD">
{`✔ A. Real-time Key Capture

Keyboard must record:
• English letters
• Hindi IME composing letters (handle composition events)
• Numbers
• Space → record as [Space]
• Enter → record as [Enter]
• Backspace → group as [Backspace × N]
• Symbols and punctuation
• Multi-character IME output (है, क्या, मेरे)

Must NOT record password fields (EditorInfo.TYPE_TEXT_VARIATION_PASSWORD / TYPE_NUMBER_VARIATION_PASSWORD).`}
        </Section>

        <Section id="summary" title="✔ B. Clean Summary Generator (Exact Format)">
{`Example:

h, e, l, l, o, [Space], w, o, r, l, d
[Backspace × 3]
r, a, m
[Backspace × 12]

Rules:
1) Normal characters → comma-separated
2) Continuous backspaces → [Backspace × N]
3) Space → [Space]
4) Enter → [Enter]
5) Hindi IME final characters only
6) New line after each Backspace group
7) New line when typing continues after a Backspace burst`}
        </Section>

        <Section id="db" title="✔ C. Local Database (Room / SQLite)">
{`Store: id, user_id, summary (TEXT), raw_keys (JSON array), wpm (optional), accuracy (optional), created_at timestamp.`}
        </Section>

        <Section id="upload" title="✔ D. Auto-Upload Summary to Backend (PHP)">
{`POST JSON:
{
  "user_id": 7,
  "summary": "clean multiline summary",
  "raw_keys": ["h","e","l","l","o"],
  "wpm": 32,
  "accuracy": 87
}
Use OkHttp / Retrofit / Volley.`}
        </Section>

        <Section id="settings" title="✔ E. Settings App (Companion App)">
{`Recording toggle, list saved sessions, send to Gmail, re-upload to server, delete all history, Privacy & Terms.`}
        </Section>

        <Section id="share" title="✔ F. Export/Share Options">
{`Save as .txt, share (Gmail/WhatsApp/Telegram), manual sync to backend.`}
        </Section>

        <Section id="privacy" title="✔ G. Security & Privacy Rules">
{`No passwords. Start only after consent. Clear message: “This keyboard records your typing summary for analysis.” Data stays local + backend; no hidden logging.`}
        </Section>

        <Section id="backend" title="2️⃣ BACKEND – PHP + MYSQL">
{`MySQL Table:

typing_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  summary TEXT,
  raw_keys JSON,
  wpm INT,
  accuracy FLOAT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

save.php:

<?php
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

$conn = new mysqli('localhost','root','','typing_db');
if ($conn->connect_error) { http_response_code(500); echo json_encode(['error'=>'db']); exit; }

$stmt = $conn->prepare('INSERT INTO typing_data (user_id, summary, raw_keys, wpm, accuracy) VALUES (?,?,?,?,?)');
$stmt->bind_param('issii', $data['user_id'], $data['summary'], json_encode($data['raw_keys']), $data['wpm'], $data['accuracy']);
$stmt->execute();

echo json_encode(['status'=>'ok']);
?>`}
        </Section>

        <Section id="io" title="3️⃣ EXACT INPUT/OUTPUT FORMAT">
{`Input:
{
  "user_id": 7,
  "summary": "h, e, l, [Space], o\n[Backspace × 3]\nr, a, m",
  "raw_keys": ["h","e","l","l","o"],
  "wpm": 42,
  "accuracy": 90
}

Output:
• Save locally
• Upload to backend
• Preview clean summary in settings`}
        </Section>

        <Section id="deliverables" title="4️⃣ DELIVERABLES REQUIRED">
{`1) Full Android Studio Project: Custom Keyboard, Recorder, Summary Generator, Room DB, Settings, Backend Sync
2) Complete PHP Backend: save.php + MySQL schema
3) Documentation: Install keyboard, enable IME, connect backend, export/share summary`}
        </Section>

        <Section id="rules" title="5️⃣ RULES">
{`Production-ready, Hindi + English, exact summary format, skip passwords, local + server backup, Android 8+`}
        </Section>
      </main>

      <footer className="py-8 text-center text-sm text-gray-500">
        Built for quick copy-paste and reference.
      </footer>
    </div>
  )
}
