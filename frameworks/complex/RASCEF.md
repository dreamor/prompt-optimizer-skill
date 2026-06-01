# RASCEF Framework

## Name
Role-Action-Steps-Context-Examples-Format

## Structure
- **Role**: Role
- **Action**: Action
- **Steps**: Steps
- **Context**: Background
- **Examples**: Examples
- **Format**: Format

## Use Cases
- Technical documentation
- Instructional design
- Creative storytelling
- Detailed analysis projects
- Complex task execution
- Marketing strategy development

## Example
**Input**: "Create a detailed user manual"

**Optimized**:
```
Role:
You are a senior technical documentation engineer with 10 years of experience writing SaaS product documentation. You excel at transforming complex technical concepts into user-friendly guidance and are familiar with information architecture and UX design.

Action:
Create a complete user onboarding manual for our product to help new users get up and running with core features within 30 minutes.

Steps:

Step 1: Planning and Structure
- Analyze the target user group (personas, technical level, usage scenarios)
- Define the documentation scope and depth
- Design the information architecture (table of contents, navigation)
- Establish a writing style guide

Step 2: Content Creation
- Write a quick start guide (get started in 5 minutes)
- Write detailed guides for core features
- Write an FAQ section
- Write a troubleshooting guide
- Add a glossary

Step 3: Visual Design
- Design screenshot annotation standards
- Create flowcharts and diagrams
- Add video tutorial links
- Design a printable quick-reference card

Step 4: Review and Optimization
- Technical accuracy review
- User experience testing (have real users read it)
- Readability assessment (Flesch score)
- SEO optimization (if applicable)

Step 5: Publishing and Maintenance
- Choose a publishing platform (Help Center, PDF, video)
- Establish an update mechanism
- Collect user feedback
- Continuously iterate and improve

Context:

Product Information:
- Product: Team collaboration tool
- Core features: Task management, file sharing, instant messaging, calendar
- Target users: SME teams (10–100 people)
- User technical level: Beginner to intermediate
- Competitors: Slack, Teams, DingTalk

Available Resources:
- Product screenshot library
- Feature demo videos (5)
- Customer service FAQ list (50 entries)
- User feedback report

Constraints:
- Documentation must be completed within 2 weeks
- Must support bilingual (English and Chinese)
- Must be adapted for mobile reading
- Must comply with WCAG 2.0 accessibility standards

Examples:

Chapter structure example:
```
Chapter 3: Task Management
3.1 Creating Tasks
    - Quick create vs. detailed create
    - Setting deadlines and priority
    - Assigning tasks to team members
    [Screenshot + Video link]

3.2 Tracking Task Progress
    - Using the Kanban view
    - Gantt chart view
    - Setting reminders and notifications

3.3 FAQs
    Q: How do I bulk edit tasks?
    A: ...

    Q: How do I set task dependencies?
    A: ...
```

Writing style examples:
- Use second person ("You can...")
- Start each step with a verb
- Bold key actions
- Use yellow background boxes for warnings
- Use blue background boxes for tips

Format:

Document structure:
1. Cover (product name, version, date)
2. Table of contents (with page numbers / links)
3. Quick start (1 page)
4. Core feature guides (2–3 pages per feature)
5. Advanced features (optional reading)
6. Troubleshooting
7. Glossary
8. Index

Visual standards:
- Font: Body 14px, headings at 18/16/14px hierarchy
- Colors: Primary #1890ff, warning #faad14, error #f5222d
- Screenshots: 1440px wide, annotations use red arrows
- Code: Monospace font with syntax highlighting

Output format:
- Online version: Markdown format, compatible with Help Center
- PDF version: A4 paper, printable
- Mobile: Responsive HTML
```

## Usage Tips
- The most comprehensive framework — ideal for complex projects
- Define each element in detail
- Examples should be specific and directly usable
- Format standards ensure consistency
