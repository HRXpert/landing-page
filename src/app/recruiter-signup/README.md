# Recruiter Sign-Up Flow

## Overview
This feature implements a standalone recruiter invitation and sign-up flow that is completely separate and independent from the general sign-in page. Admin recruiters can invite new recruiters via email, and the invited recruiters complete their registration through this dedicated page.

## Key Features
- **Completely Independent**: This page operates separately from the main sign-in flow
- **Email Invitation Based**: Only accessible through valid invitation links
- **Direct Dashboard Access**: Successful registration redirects directly to recruiter dashboard
- **Consistent Theme**: Maintains HRXpert design consistency while being standalone

## Components

### 1. Standalone Recruiter Sign-Up Page (`/recruiter-signup`)
- **Location**: `frontend/src/app/recruiter-signup/page.tsx`
- **Purpose**: Independent recruiter registration from email invitations
- **Features**:
  - Validates invitation token from URL parameters
  - Pre-fills email if provided in invitation
  - Form fields: email, username, password, confirm password
  - Password visibility toggles
  - Form validation (email format, password match, minimum length)
  - Standalone theme consistent with HRXpert design
  - No dependency on general sign-in page

### 2. Dedicated Auth API
- **Location**: `frontend/src/app/api/auth/auth.ts`
- **Function**: `signUpRecruiter()`
- **Purpose**: Handles API call for recruiter registration with invitation token

## Flow Description

1. **Admin Recruiter Invitation**: 
   - Admin recruiter sends invitation email to potential recruiter
   - Email contains a link to `/recruiter-signup?token=INVITATION_TOKEN&email=RECRUITER_EMAIL`

2. **Independent Recruiter Registration**:
   - Recruiter clicks the link in email
   - Lands on standalone `/recruiter-signup` page
   - Email is pre-filled (if provided)
   - Completes form with username, password, and confirm password
   - Form validates all fields and password requirements

3. **Registration Submission**:
   - Calls `signUpRecruiter()` API with invitation token
   - Backend validates invitation token
   - If successful, recruiter account is created

4. **Direct Dashboard Access**:
   - Redirects directly to `/recruiter-dashboard?welcome=true`
   - No intermediate sign-in step required
   - Recruiter immediately accesses their dashboard

## URL Parameters

### `/recruiter-signup`
- `token` (required): Invitation token for validation
- `email` (optional): Pre-fills email field

### `/recruiter-dashboard` (after successful registration)
- `welcome=true`: Indicates new recruiter welcome flow

## Independence Features

- **No Sign-In Dependency**: Does not rely on or redirect to the general sign-in page
- **Direct Navigation**: Back button goes to home page, not sign-in
- **Standalone Support**: Help link goes to contact support, not general auth flow
- **Direct Dashboard**: Successful registration goes straight to recruiter dashboard
- **Separate Error Handling**: Independent error states and messaging

## Security Features

- Invitation token validation prevents unauthorized access
- Email field is disabled when pre-filled from invitation
- Password requirements (minimum 8 characters)
- Password confirmation validation
- Form validation prevents submission of invalid data

## Backend Requirements

The backend should implement:
- `/auth/signup-recruiter` endpoint
- Invitation token validation
- Recruiter account creation
- Direct authentication after successful registration

## Styling

- Consistent with existing HRXpert design system
- Dark theme with indigo accents
- Responsive design
- Accessibility features (ARIA labels, proper form structure)
- Loading states and error handling
- Independent visual identity

## Error Handling

- Invalid/missing invitation token
- Form validation errors
- API errors
- Network errors
- Standalone success/failure feedback

## Usage Example

1. Admin sends invitation email with link:
   ```
   https://yourdomain.com/recruiter-signup?token=abc123&email=recruiter@company.com
   ```

2. Recruiter clicks link, completes form, and registers

3. Redirects directly to recruiter dashboard with welcome message

4. Recruiter immediately starts using the platform

## Separation from General Authentication

This page is intentionally separate from the general sign-in flow to provide:
- Streamlined onboarding for invited recruiters
- Reduced confusion between different user types
- Dedicated experience for recruiter invitation flow
- Independent security and validation for recruiter accounts
