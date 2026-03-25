# Profile Page Plan (Dashboard-Style + Supabase)

**Summary**
- Add a new `/profile` route that visually matches the dashboard layout, with a full profile form and inline password change.
- Use Supabase Auth for email/password and a `profiles` table for all non-secret fields.
- Save changes via an explicit “Save Changes” button with validation.

**Key Changes**
- **Routing**
  - Add `react-router-dom` and wrap the app in `BrowserRouter`.
  - Define routes: `/` (landing/login), `/dashboard`, `/profile`.
  - Convert the existing `view` state to an auth-guarded routing flow (redirect unauthenticated users to `/`).
- **Auth Flow**
  - Replace mock login with Supabase `signInWithPassword`.
  - Use Supabase session state to determine logged-in status.
  - Keep “Sign Out” mapped to `supabase.auth.signOut()`.
- **Profile UI**
  - New profile page uses the dashboard header, nav, spacing, and card styling.
  - Form fields: First Name, Last Name, Email Address, Password (inline change section), Address (Street1, Street2, City, State=CA-only select), Zip Code, Phone Number.
  - “Save Changes” validates required fields and persists to Supabase.
  - “Change Password” expands inline form (current + new + confirm), verifies current password by re-sign-in, then calls `updateUser({ password })`.
  - Email field is editable; on save, update Supabase Auth email as well as the profile record for display consistency.
- **Data Loading/Saving**
  - On profile page load, fetch profile row for the current user.
  - If no row exists, create one on first save.
  - Keep Street2 optional; all other fields required.

**Supabase Data Model**
- Create table `profiles` (public schema):
  - `id uuid primary key references auth.users(id)`
  - `first_name text not null`
  - `last_name text not null`
  - `email text not null`
  - `phone text not null`
  - `street1 text not null`
  - `street2 text`
  - `city text not null`
  - `state text not null default 'CA'`
  - `zip text not null`
  - `updated_at timestamptz default now()`
- RLS policies:
  - `SELECT` and `UPDATE` allowed where `auth.uid() = id`
  - `INSERT` allowed where `auth.uid() = id`

**Public Interfaces**
- New dependency: `react-router-dom`.
- New environment variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
- New route: `/profile`.

**Test Plan**
1. Login with valid Supabase Auth user.
2. Navigate to `/profile` from the dashboard profile menu.
3. Fill fields and Save; refresh and confirm data persists.
4. Change email; ensure Supabase Auth email updates.
5. Change password inline with current + new password; verify login works with new password.
6. Sign out and confirm routes are guarded.

**Assumptions**
- All fields required except Street2.
- State is always CA and is a single-option select.
- Supabase project already exists and you’ll provide URL + anon key.
