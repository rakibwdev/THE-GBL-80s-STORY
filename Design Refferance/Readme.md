# PROJECT: THE GBL 80s STORY
## Full-Stack Historical Basketball Archive Platform

Act as a Senior Full-Stack Software Architect, Senior React Developer, Node.js Backend Engineer, PostgreSQL Database Architect, UI/UX Designer, and Security Engineer.

Your task is to architect and develop a complete, production-ready web application called "The GBL 80s Story".

This is a historical basketball archive platform dedicated to preserving the history of the Gippsland Basketball League (GBL) during the 1980s.

The platform must allow the public to explore historical basketball content, while approved club representatives can contribute photographs and memorabilia through a secure submission system. A central administrative team must review and approve all submissions before they become publicly accessible.

IMPORTANT: This is a real production-oriented application, not just a UI prototype.

# 1. TECHNOLOGY STACK

Frontend:
- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- TanStack Query
- React Hook Form
- Zod
- Axios

Backend:
- Node.js
- Express.js
- TypeScript
- REST API architecture
- Prisma ORM
- PostgreSQL
- Zod validation
- JWT authentication
- Refresh token rotation
- Role-based access control

File management:
- Multer for multipart uploads
- S3-compatible object storage or Cloudinary
- Support JPEG, PNG and PDF
- Multiple file uploads
- Preserve original uploaded files
- Generate optimized image versions and thumbnails

Testing:
- Vitest
- Supertest
- React Testing Library

Documentation:
- Swagger / OpenAPI
- Environment variable documentation
- Database schema documentation

# 2. PROJECT OBJECTIVES

Build a platform that:

1. Preserves Gippsland Basketball League's 1980s history.
2. Organizes historical photographs, newspaper clippings, programmes, scorecards and memorabilia.
3. Provides individual galleries for each club.
4. Allows authorized club representatives to contribute historical materials.
5. Provides a central approval and publishing workflow.
6. Allows the public to nominate people for recognition.
7. Provides a searchable historical archive.
8. Allows non-technical administrators to manage the website easily.

# 3. WEBSITE STRUCTURE

Create the following public pages.

## Home
- Hero section with historical basketball imagery.
- Introduction to The GBL 80s Story.
- Featured historical photographs.
- Latest archive additions.
- Featured clubs.
- Recognition highlights.
- Community contribution call-to-action.

## Our Story
- Background of the Gippsland Basketball League.
- Historical information about East and West divisions.
- League development during the 1980s.
- People and clubs involved.

## Clubs

Create two directories:

EAST DIVISION (8):
- Bairnsdale
- Stratford
- Sale
- Maffra
- Heyfield
- Traralgon
- Morwell
- Moe

WEST DIVISION (7):
- Pakenham
- Sherbrooke
- Warragul
- Poowong
- Korumburra
- Leongatha
- Wonthaggi

Each club must have:
- Club introduction.
- Historical photographs.
- Memorabilia gallery.
- Teams and player information.
- Achievements and premiership records.
- Related archive materials.

Do not include Lakes Entrance, Drouin or Phillip Island as active clubs. Historical references to these locations can remain in archival content.

## Archive

Create searchable collections for:
- Historical photographs.
- Newspaper clippings.
- Programmes.
- Scorecards.
- Grand finals.
- Premierships.
- East vs West.
- Players and personalities.

Provide filters:
- Club.
- Person.
- Year.
- Decade.
- Event.
- Content type.

Support unknown dates and historically corrected labels.

## Recognition

Create three separate recognition categories:

1. Remarkables
2. Legends
3. Tributes

Each category needs:
- Dedicated listing page.
- Individual profile/detail page.
- Historical photographs.
- Biography or contribution story.
- Nomination form.

All nominations must remain private until approved by the administrative team.

## Reunions & News
- Reunion information.
- 2026 reunion.
- Announcements.
- Historical reunion records.
- Community updates.

## Contribute / Contact
- Upload instructions.
- Permission information.
- Correction requests.
- Copyright and removal requests.
- Contact form.

# 4. USER ROLES AND PERMISSIONS

Implement three primary user roles.

## Public Visitor
- Browse all published content.
- Search the historical archive.
- View club galleries.
- Submit recognition nominations.
- Submit enquiries.

## Club Contributor
- Secure login.
- Access contributor dashboard.
- Upload multiple photographs and documents.
- Select their authorized club.
- Add title, caption, year, people, team names and event details.
- Add photographer/source attribution.
- Submit permission declaration.
- View submission status.
- Edit their own drafts.
- Correct submissions when requested by administrators.
- Cannot publish content.
- Cannot access or modify other clubs' submissions.

Each contributor can only access the club or clubs explicitly assigned by the administrator.

## Central Administrator
- Full dashboard access.
- Create and manage clubs.
- Create and manage contributor accounts.
- Assign contributors to clubs.
- Review all submissions.
- Approve, reject or request corrections.
- Publish and unpublish archive content.
- Manage recognition nominations.
- Manage news and reunion content.
- Manage historical archive records.
- Review correction and removal requests.
- Manage users and permissions.

Enforce all permissions on the backend. Never rely on frontend-only access restrictions.

# 5. CONTRIBUTOR SUBMISSION WORKFLOW

Build a complete submission system.

Submission form fields:
- Club.
- Content type.
- Title.
- Caption/description.
- Approximate year.
- Date unknown option.
- Player/team names.
- Event/location.
- Photographer/source.
- Submitter contact information.
- Permission declaration.
- Attribution preference.

Support multiple image and PDF uploads.

Submission statuses:

- Draft
- Pending Review
- Under Review
- Changes Requested
- Approved
- Rejected
- Withdrawn

Workflow:

1. Contributor uploads material.
2. Submission is saved as Pending Review.
3. Administrator reviews the material.
4. Administrator can approve, reject or request corrections.
5. Contributor can respond to correction requests.
6. Approved material becomes publicly visible.
7. Public archive automatically includes approved content.

Maintain a submission activity history with timestamps and the user responsible for each action.

Never display pending, rejected or private materials publicly.

# 6. RECOGNITION NOMINATION SYSTEM

Create nomination forms for Remarkables, Legends and Tributes.

Required fields:
- Recognition category.
- Nominee name.
- Associated clubs.
- Roles.
- Approximate years.
- Achievements and personal story.
- Supporting photographs/documents.
- Nominator name.
- Nominator email/contact.
- Sources and permissions.
- Family consultation confirmation, especially for Tributes.

Nomination statuses:
- Pending
- Under Review
- Changes Requested
- Approved
- Rejected

Important:
- Nominations must remain private.
- Only administrators can review nominations.
- Approved nominations can become public recognition profiles.
- Include acknowledgement that nomination does not guarantee inclusion.

# 7. DATABASE ARCHITECTURE

Use PostgreSQL with Prisma ORM.

Design a normalized relational database.

Consider these entities:

- users
- roles
- user_clubs
- clubs
- divisions
- archive_items
- archive_media
- archive_people
- people
- archive_item_people
- submissions
- submission_media
- submission_history
- recognition_categories
- nominations
- nomination_media
- recognition_profiles
- events
- news
- correction_requests
- removal_requests
- activity_logs
- refresh_tokens

Define:
- Primary keys.
- Foreign keys.
- Relationships.
- Unique constraints.
- Indexes.
- Created/updated timestamps.
- Soft deletion where appropriate.
- Appropriate status enums.

Use proper database relationships rather than storing everything in JSON fields.

Support historical records where:
- Exact dates are unknown.
- Only approximate years are available.
- Multiple people are associated with one photograph.
- One person belongs to multiple clubs.
- One archive item belongs to multiple relevant categories.

Before implementation, explain the database structure and relationships.

# 8. BACKEND ARCHITECTURE

Build a clean modular Express.js application.

Suggested structure:

server/
  src/
    config/
    controllers/
    services/
    repositories/
    routes/
    middleware/
    validators/
    utils/
    types/
    modules/
      auth/
      users/
      clubs/
      archive/
      submissions/
      nominations/
      recognition/
      events/
      news/
      uploads/
      admin/
    app.ts
    server.ts
  prisma/
    schema.prisma
    migrations/
    seed.ts
  tests/

Use separation of concerns:
- Routes handle endpoints.
- Controllers handle HTTP requests/responses.
- Services contain business logic.
- Repositories handle database access.
- Middleware handles authentication, authorization and error handling.
- Validators handle request validation.

Create REST APIs with consistent response structures.

Include:
- Authentication APIs.
- Club APIs.
- Archive APIs.
- Search and filtering APIs.
- Contributor APIs.
- Submission APIs.
- Nomination APIs.
- Recognition APIs.
- Admin APIs.
- Upload APIs.
- News and reunion APIs.

Implement pagination, sorting, filtering and appropriate database indexes.

# 9. SECURITY REQUIREMENTS

Security is extremely important.

Implement:
- Password hashing using Argon2 or bcrypt.
- Short-lived access tokens.
- Secure refresh token rotation.
- HTTP-only, Secure and SameSite cookies where appropriate.
- Role-based access control.
- Club-level authorization.
- Input validation.
- SQL injection protection through Prisma.
- Rate limiting.
- Helmet security headers.
- CORS configuration.
- File type and size validation.
- Upload access restrictions.
- Secure environment variables.
- Audit logs for administrative actions.
- Protection against unauthorized file access.
- CSRF protection where cookie-based authentication requires it.

Never expose secrets in frontend code.

Never allow contributors to approve or publish their own submissions.

# 10. FRONTEND ARCHITECTURE

Use a reusable component-based architecture.

Suggested structure:

client/
  src/
    assets/
    components/
      common/
      layout/
      navigation/
      archive/
      clubs/
      recognition/
      forms/
      dashboard/
    pages/
      public/
      contributor/
      admin/
    layouts/
    hooks/
    services/
    api/
    context/
    types/
    utils/
    routes/
    styles/

Separate public pages, contributor dashboard and admin dashboard.

Use:
- Reusable components.
- Shared layouts.
- Protected routes.
- API service layer.
- TanStack Query for server state.
- React Hook Form and Zod for forms.
- Loading, error and empty states.
- Responsive design.

# 11. UI/UX DESIGN DIRECTION

The website should feel like a modern digital basketball history museum.

Design direction:
- Nostalgic 1980s basketball identity.
- Premium editorial layout.
- Warm cream/off-white backgrounds.
- Deep navy typography.
- Vintage orange accents.
- Large historical photography.
- Clean typography.
- Modern card-based archive galleries.
- Subtle vintage-inspired details.
- Smooth but restrained animations.

Avoid:
- Generic dashboard templates.
- Excessive gradients.
- Overly flashy animations.
- Cluttered layouts.
- Unnecessary UI elements.

The contributor and admin dashboards should be modern, simple and easy for non-technical volunteers.

Ensure accessibility and mobile responsiveness.

# 12. SEARCH AND ARCHIVE FUNCTIONALITY

Implement a robust searchable archive.

Users should be able to search by:
- Person name.
- Club.
- Year.
- Event.
- Content type.
- Keywords.

Support multiple filters simultaneously.

Use PostgreSQL full-text search or an appropriate indexed search strategy.

Only publicly approved archive content should be searchable.

# 13. DEVELOPMENT PROCESS

Do not attempt to build the entire application in one response.

Work in the following phases:

PHASE 1: Architecture and planning
- Analyze the requirements.
- Define system architecture.
- Design database relationships.
- Define API structure.
- Define frontend structure.
- Define security strategy.
- Create implementation roadmap.

PHASE 2: Project setup
- Initialize frontend and backend.
- Configure TypeScript.
- Configure Tailwind and shadcn/ui.
- Configure PostgreSQL and Prisma.
- Configure environment variables.
- Configure development scripts.

PHASE 3: Database and authentication
- Create Prisma schema.
- Create migrations.
- Seed the 15 clubs.
- Implement authentication.
- Implement roles and permissions.
- Test protected APIs.

PHASE 4: Public website
- Implement shared layouts.
- Build homepage.
- Build Our Story.
- Build club directories.
- Build individual club pages.
- Build archive.
- Build recognition pages.
- Build news and reunion pages.

PHASE 5: Contributor dashboard
- Build login.
- Build contributor dashboard.
- Build multiple-file uploads.
- Build submission management.
- Build status tracking.

PHASE 6: Admin dashboard
- Build user management.
- Build club management.
- Build submission review.
- Build nomination review.
- Build archive publishing.
- Build activity logs.

PHASE 7: Search and nomination
- Implement archive search.
- Implement filters and pagination.
- Build nomination forms.
- Build approval workflow.

PHASE 8: Testing and deployment
- Test all user roles.
- Test permissions.
- Test file uploads.
- Test submission workflows.
- Test nomination workflows.
- Test mobile responsiveness.
- Configure production deployment.
- Document backup and restoration procedures.

# 14. DEVELOPMENT RULES

Follow these rules throughout development:

1. Never generate the entire application at once.
2. Never make major architecture decisions without explaining them.
3. Keep frontend and backend properly separated.
4. Write clean, maintainable TypeScript.
5. Avoid unnecessary dependencies.
6. Never use mock data as a replacement for real backend functionality in production.
7. Use realistic sample data only for development.
8. Never invent historical facts, player names or achievements.
9. Maintain database migration history.
10. Add tests for critical business logic.
11. Verify that permissions work at the API and database levels.
12. Do not silently remove or rewrite existing functionality.
13. Keep a DEVELOPMENT_PROGRESS.md file updated.
14. Document important technical decisions in an ARCHITECTURE.md file.
15. Explain commands before running destructive operations.

# 15. FIRST TASK — DO NOT START CODING YET

For now, only complete Phase 1.

I want you to:

1. Analyze the complete project requirements.
2. Propose the overall system architecture.
3. Explain the frontend/backend communication.
4. Design the complete PostgreSQL database schema.
5. Explain all database relationships.
6. Design the authentication and authorization system.
7. Define all REST API endpoints.
8. Propose the project folder structure.
9. Identify technical risks and potential challenges.
10. Provide an estimated implementation roadmap.

Present the architecture in a clear and professional format.
