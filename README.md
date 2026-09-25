# Complix

**Software System to Check Compliance of Packaged Commodities under the Legal Metrology (Packaged Commodities) Rules, 2011**
Smart India Hackathon — Problem Statement ID `SIH26034` · Team `Complix` (Team ID 18)

Complix scans a photo of a product label and automatically checks it against the mandatory declarations required by the LMPC Rules, 2011 (and its 2017/2022 amendments), producing a pass/fail verdict per field, a compliance score, and a downloadable PDF evidence report.

## How it maps to the proposed solution

| Slide feature | Where it lives in the code |
|---|---|
| Automated Label Scanning (OCR + rule engine) | `backend/src/services/ocrService.js`, `backend/src/services/ruleEngine.js` |
| Declaration & Compliance Checks | `backend/src/config/lmpcRules.js` (the rule catalogue) |
| Evidence & Report Generation | `backend/src/services/reportService.js` (PDF with embedded label image) |
| Cross-platform dashboard, inspection history & trends | `frontend/index.html` + `backend/src/controllers/dashboardController.js` |
| 4-step workflow: Capture → Extract → Validate → Report | `inspectionController.createInspection` (capture/extract/validate) + `generateReportById` (report) |
| Image pre-processing mitigation | `backend/src/services/imagePreprocessing.js` (grayscale, contrast, sharpen, binarize via `sharp`) |
| Secure MongoDB layer, RBAC, audit logs | `backend/src/models/*`, `backend/src/middleware/rbac.js`, `backend/src/services/auditService.js` |
| Microservices / CI-CD | `docker-compose.yml`, `backend/Dockerfile`, `.github/workflows/ci.yml` |

## Architecture

```
complix/
├── backend/                  Node.js + Express API
│   ├── server.js             entrypoint
│   └── src/
│       ├── app.js            express app, security middleware
│       ├── config/           db connection + LMPC rule catalogue
│       ├── models/           User, Product, Inspection, AuditLog (Mongoose)
│       ├── middleware/       JWT auth, RBAC, upload, error handling
│       ├── services/         OCR, image preprocessing, rule engine, PDF reports, audit
│       ├── controllers/      auth, inspection, dashboard
│       └── routes/           REST endpoints
├── frontend/
│   └── index.html            single-page dashboard (upload, results, history, trend charts)
├── docker-compose.yml         API + MongoDB
└── .github/workflows/ci.yml   CI pipeline
```

## Running it locally

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env        # edit JWT_SECRET, MONGO_URI as needed
npm run seed                 # creates demo admin / reviewer / inspector accounts
npm run dev                  # http://localhost:5000
```

Demo accounts (see `src/utils/seed.js`):

| Role | Email | Password |
|---|---|---|
| Admin | admin@complix.dev | Admin@123 |
| Reviewer | reviewer@complix.dev | Reviewer@123 |
| Inspector | inspector@complix.dev | Inspector@123 |

You'll need a local or Atlas MongoDB instance, or just run `docker compose up` from the project root, which starts MongoDB and the API together.

### 2. Frontend

`frontend/index.html` is a static file — open it directly in a browser, or serve it (`npx serve frontend`). It talks to the API at `http://localhost:5000/api` (edit the `API` constant at the top of the `<script>` block if you deploy the backend elsewhere).

### 3. Try it

1. Sign in with the inspector demo account.
2. Upload a photo of a packaged product's label.
3. Complix preprocesses the image, runs OCR, and checks it against the LMPC Rule 6 declarations (manufacturer details, net quantity, MRP, unit sale price, mfg. date, consumer care, country of origin, QR declaration).
4. Review the pass/fail breakdown and compliance score, then generate a PDF report.
5. Check **Dashboard & Trends** for the compliance rate, a 30-day verdict trend, and which declaration fields fail most often across all inspections.

## API surface

| Method | Path | Access |
|---|---|---|
| POST | `/api/auth/register` | public |
| POST | `/api/auth/login` | public |
| GET | `/api/auth/me` | authenticated |
| POST | `/api/inspections` (multipart `image`) | inspector/reviewer/admin |
| GET | `/api/inspections` | inspector/reviewer/admin |
| GET | `/api/inspections/:id` | inspector/reviewer/admin |
| POST | `/api/inspections/:id/report` | reviewer/admin |
| GET | `/api/inspections/:id/report/download` | inspector/reviewer/admin |
| GET | `/api/dashboard/summary` \| `/trends` \| `/field-violations` | authenticated |

## Notes on the rule engine

The LMPC field checks in `src/config/lmpcRules.js` use ordered regex heuristics tuned for common label phrasing ("MRP", "Net Qty", "Mfg by", "Customer Care", etc.), each tagged `critical` / `major` / `minor`. A single missing critical field (manufacturer details, net quantity, or MRP) automatically fails the package regardless of the numeric score — mirroring how a real inspector would treat those as non-negotiable. Extend the catalogue by adding entries to the `RULES` array; no other code changes are needed for a new field to show up in scoring, the API response, the PDF report, and the dashboard's violation chart.

## Extending further

- Swap `tesseract.js` for a hosted OCR provider if you need higher accuracy on low-quality photos.
- Add a `barcode`/`QR` decode step (e.g. `@zxing/library`) to auto-fill `Product` from a scanned barcode.
- Add SMS/email alerting on `non_compliant` verdicts using the existing `AuditLog` event stream.
