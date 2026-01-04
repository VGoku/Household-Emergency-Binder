🏠 Household Emergency Binder
A calming, customizable, user‑friendly web app designed to help individuals and families organize essential emergency information in one place.

This project started as a simple idea and grew into a polished, modern application with personalization, theming, responsive design, and thoughtful UX touches. It’s built to feel warm, approachable, and genuinely helpful — something people would actually want to use.

✨ Features
🧩 Organize Important Information
Contacts

Medications

Pets (with vet info)

Insurance policies

Personal notes (multiple, editable)

🎨 Beautiful, Calming UI
Color‑psychology‑based themes

Soft blues, teals, slates, and warm tones

Glass‑morphism inspired transparency

Smooth animations and transitions

Consistent design system across all sections

🌙 Dark / Light Mode
Toggle button in the header

Saves user preference

Fully themed UI in both modes

🖼️ Custom Backgrounds
Upload your own photo (pets, kids, family, etc.)

Or paste an image URL

Background scales cleanly on all devices

No blur on the background image

Blur only on UI panels for readability

💾 Local Persistence
All data saved automatically in LocalStorage

Survives refreshes and browser restarts

📤📥 Import / Export Backups
Export your entire binder as a JSON file

Import it later to restore everything

Great for switching devices or keeping backups

🔍 Global Search
Search across all sections

Real‑time filtering

📝 Full Editing Support
Add, edit, delete items in every section

Custom confirmation modal (no boring browser popups)

📱 Fully Responsive
Works beautifully on desktop, tablet, and mobile

Adaptive layout and spacing

Background behaves correctly on all screen sizes

🛠️ Tech Stack
Frontend
React

TypeScript

Tailwind CSS

Heroicons

Vite

Backend
Node.js

Express

TypeScript

(Optional future upgrade: Supabase)

State & Persistence
React state

LocalStorage

JSON import/export

Design
Color psychology

Glass‑morphism

Responsive design

Custom modals and tooltips

🚧 Challenges & What I Learned
This project wasn’t perfect — and that’s exactly why it was valuable.
Here are some of the real issues I ran into and solved:

🔹 Dark mode variable error (isDark is not defined)
A missing variable caused a runtime crash.
I learned to trace errors to the exact line and ensure state is properly initialized.

🔹 Background image blur issues
Originally the background was blurry, which made personal photos look bad.
I learned how to separate background styling from foreground blur.

🔹 LocalStorage overwriting data
Early versions overwrote saved data with defaults.
I fixed this with lazy initialization and migration logic.

🔹 Phone number formatting
Creating a formatter that auto‑formats (123) 456‑7890 taught me about controlled inputs and regex cleanup.

🔹 Custom confirmation modal
Replacing the default browser confirm() required building a reusable modal component with animations and accessibility in mind.

🔹 Color psychology & design consistency
I learned how to build a cohesive design system using Tailwind’s utility classes, transparency, and gradients.

🔹 Responsive background behavior
background-attachment: fixed breaks on mobile — I learned how to conditionally switch to scroll for mobile devices.

These challenges made the project stronger and helped me grow as a developer.

🚀 Future Improvements
Supabase integration for cloud sync

User accounts & authentication

Shareable binders for family members

Printable “emergency binder” PDF mode

Offline-first PWA support

Drag-and-drop reordering

💡 Why I Built This
I wanted to create something meaningful — a tool that helps people feel prepared, calm, and organized. Emergencies are stressful, and having important information in one place can make a huge difference. I also wanted to challenge myself with UI/UX polish, theming, and real-world features like import/export and persistence.

This project became a way to grow my skills while building something that could genuinely help someone.