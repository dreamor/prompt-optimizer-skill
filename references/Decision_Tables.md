# Decision Tables

> Reference tables extracted from SKILL.md — consult these for framework selection decisions. For intent-to-framework lookup, see [Quick_Reference.md](Quick_Reference.md). For the full 61-framework list, see [Frameworks_Summary.md](Frameworks_Summary.md).

---

## Framework Selection Guide by Domain

| Domain | Recommended Frameworks |
|--------|----------------------|
| Marketing Content | BAB, SMART, FOCUS |
| Decision Analysis | Chain-of-Thought, SMART, RACEF |
| Education & Training | ELI5, PEE |
| Product Development | SMART, FOCUS, RACEF |
| AI Dialogue/Assistant | COAST, ROSES, RACE |
| Writing & Creation | APE, ERA, TAG |
| Complex Reasoning | Chain-of-Thought, RACEF, CRISPE |

---

## Advanced Techniques

Apply these techniques based on task complexity:

| Technique | When to Use | Example |
|-----------|-------------|---------|
| **Role Assignment** | Always apply | "You are a senior software architect..." |
| **Chain-of-Thought** | Complex reasoning tasks | "Think step by step and show your reasoning" |
| **Few-Shot Examples** | Pattern-based tasks | Provide 2–3 input/output examples |
| **Structured Output** | Data extraction, analysis | "Output in JSON format with keys: ..." |
| **Constraint Specification** | All prompts | Word limits, format requirements, exclusions |
| **Meta-Prompting** | Self-improvement tasks | "Review and improve your answer before finalizing" |

---

## Element Definitions

Used during Step 1 — Complexity Assessment.

| Element | Examples |
|---------|----------|
| Role / persona | "as a lawyer", "act as a senior dev" |
| Action / task | "write", "summarize", "classify" |
| Context / background | "for a startup pitch", "the API returns 500 errors" |
| Audience | "for executives", "for beginners" |
| Output format | "in JSON", "as a table", "bullet points" |
| Constraints / limits | "under 200 words", "no jargon", "must include X" |
| Examples / references | "like this: …", "similar to Notion's" |
| Reasoning method | "step by step", "compare alternatives" |
| Quality criteria | "must be accurate", "cite sources" |

---

## Version Characteristics

| Version | Use Case | Characteristics |
|---------|----------|-----------------|
| **Basic** | Quick use, simple tasks | Core elements, concise and clear |
| **Enhanced** | Regular work, team collaboration | Complete structure with examples |
| **Expert** | Complex projects, high-quality requirements | Full elements + constraints + validation criteria |

---

## CLARITY Framework

When optimizing prompts, apply the **CLARITY** framework:

| Element | Description |
|---------|-------------|
| **C**ontext | Provide relevant background and situation |
| **L**ogic | Define the reasoning approach (step-by-step, first principles, etc.) |
| **A**ction | Specify the exact task or action to perform |
| **R**ole | Assign a specific expert role to the AI |
| **I**nput/Output | Define input format and expected output structure |
| **T**one | Specify writing style, tone, and voice |
| **Y**ardstick | Set constraints, requirements, and quality criteria |

---

## Additional Quality Checks

Each is pass/fail.

| Check | Pass criterion |
|-------|----------------|
| Clarity | No vague verbs ("improve", "optimize", "handle") used as the primary action |
| Specificity | At least one measurable metric, threshold, or named entity |
| Completeness | Every user-stated requirement appears in the output |
| Feasibility | A reasonable AI could execute the task without external tools beyond what's named |
| Safety | No harmful, illegal, or privacy-violating instructions |

---

## Anti-Patterns

| Anti-pattern | Why it's wrong | What to do instead |
|--------------|---------------|-------------------|
| Picking CRISPE for a 1-sentence polish | Forces 6 elements onto a task that only needs 2–3 | Use APE or ERA for simple tasks |
| Choosing Chain-of-Thought for formatting tasks | CoT adds reasoning overhead to non-reasoning tasks | Use TAG or RTF when the task is about format, not reasoning |
| Defaulting to the most complex framework "just in case" | Over-engineering produces bloated prompts that confuse the AI | Match framework complexity to task complexity from Step 1 |
| Selecting a framework before counting elements | Skips the complexity gate, leading to mismatched selections | Always count elements first (Step 1), then pick from the matching tier |