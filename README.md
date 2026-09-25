# Complix – OIML R76 Test Report Automation System

## Overview

Complix is a web-based Test Report Automation System developed to automate the inspection, testing, compliance verification, and report generation process for **Non-Automatic Weighing Instruments (NAWI)** according to the **OIML R 76** international standard.

The system eliminates manual calculations, reduces human errors, and generates standardized calibration reports by automatically validating observations against OIML permissible limits.

---

## Features

### Authentication
- Secure Login System
- Role-Based Access Control
- Multiple User Roles
  - Administrator
  - Laboratory Engineer
  - Reviewer
  - Approver

### Dashboard
- Live Testing Statistics
- Monthly Pass/Fail Reports
- Pending Reports
- Recent Activities
- Instrument Summary

### Manufacturer Management
- Add Manufacturer
- Edit Manufacturer
- Delete Manufacturer
- Manufacturer Registry

### Instrument Management
- Register Instruments
- Edit Instrument Details
- Instrument Database
- Serial Number Validation

### OIML R76 Testing Modules

The software supports:

- Visual Examination
- Zero Setting Test
- Span Test
- Repeatability Test
- Eccentric Loading Test
- Discrimination Test
- Warm-up Test
- Stability Test
- Environmental Test
- Software Examination

---

## Smart Compliance Engine

The rule-based compliance engine automatically:

- Calculates Measurement Error
- Calculates Maximum Permissible Error (MPE)
- Identifies OIML Accuracy Band
- Performs Pass/Fail Validation
- Supports Initial Verification
- Supports In-Service Verification
- Automatically doubles MPE for In-Service verification
- Detects invalid observations
- Prevents incomplete report submission

---

## Calibration Workflow

1. Login
2. Register Manufacturer
3. Register Instrument
4. Select Instrument
5. Enter Laboratory Conditions
6. Perform OIML Tests
7. Automatic Error Calculation
8. Automatic Compliance Check
9. Engineer Review
10. Reviewer Approval
11. Final Approval
12. Generate Test Report

---

## Report Generation

The software generates professional calibration reports containing:

- Laboratory Details
- Instrument Information
- Manufacturer Details
- Test Observations
- Error Calculations
- MPE Calculations
- Compliance Results
- Pass/Fail Decision
- Engineer Remarks
- Reviewer Approval
- Digital Workflow Status

---

## Validation

The system automatically validates:

- Missing Data
- Environmental Conditions
- Observation Completeness
- Instrument Selection
- OIML MPE Limits
- Test Results
- Overall Compliance Status

---

## Audit Trail

Every activity is recorded including:

- User Login
- Report Creation
- Report Modification
- Review Actions
- Approval Actions
- Report Generation

This ensures complete traceability and accountability.

---

## Technology Stack

### Frontend

- HTML5
- CSS3
- JavaScript (Vanilla)

### Storage

- Browser Local Storage

### Standards

- OIML R76
- Rule-Based Validation Engine

---

## User Roles

| Role | Responsibilities |
|------|------------------|
| Administrator | Manage users, instruments, manufacturers and settings |
| Laboratory Engineer | Perform calibration tests and create reports |
| Reviewer | Verify reports and observations |
| Approver | Final approval and report authorization |

---

## Project Structure

```
Complix/
│
├── index.html
├── README.md
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
└── reports/
```

---

## Advantages

- Eliminates Manual Calculations
- Reduces Human Error
- Faster Report Generation
- OIML R76 Compliance
- Secure Role-Based Workflow
- Automatic Pass/Fail Decision
- Centralized Instrument Management
- Complete Audit Trail
- Easy Report Retrieval
- User-Friendly Interface

---

## Future Enhancements

- Database Integration (MySQL/PostgreSQL)
- QR Code Based Instrument Identification
- Barcode Scanner Support
- Digital Signature Integration
- PDF Report Export
- Cloud Backup
- Email Notifications
- IoT Integration for Automatic Data Capture
- Multi-Laboratory Support

---

## Installation

1. Clone the repository

```bash
git clone https://github.com/Pranav200611/Complix.git
```

2. Navigate to the project

```bash
cd Complix
```

3. Open the project

Simply open `index.html` in your preferred web browser.

No additional installation or server setup is required.

---

## License

This project has been developed for educational, research, and laboratory automation purposes.

---

## Authors

**Pranav Gowda N G**

Department of Information Science and Technology

Bapuji Institute of Engineering and Technology (BIET)

---

## Acknowledgements

- OIML R76 International Recommendation
- Legal Metrology Department
- Smart India Hackathon (SIH)
- Open Source Community
