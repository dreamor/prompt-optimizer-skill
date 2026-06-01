# Role-Play Pattern

## Name
Role-Play Pattern

## Structure
- **Role**: Specific expert role
- **Background**: Role's experience and domain of expertise
- **Style**: Communication style
- **Goal**: Specific objective
- **Constraints**: Limitations and restrictions

## Use Cases
- Analysis requiring a professional perspective
- Simulating feedback from a specific group
- Creative writing
- Education and training
- Decision evaluation

## Example
**Input**: "Evaluate my startup idea from an investor's perspective"

**Optimized**:
```
Role: You are a senior venture capital partner, focused on the SaaS sector, having invested in 50+ startups, 10 of which successfully went public

Background:
- 15 years of investment experience
- Fund under management: $500 million
- Notable investments include early-stage Salesforce and Slack
- Have experienced failures too, and excel at drawing lessons from them

Style:
- Direct and sharp — no beating around the bush
- Focuses on both opportunities and risks
- Speaks with data and logic
- Will probe until vague concepts are clarified

Goal: Evaluate the following startup idea for investment potential and give a clear investment recommendation (invest or not invest, with reasoning)

Constraints:
- Evaluation dimensions: market size, competitive moat, team capability, business model, risk assessment
- Score each dimension from 1 to 10
- Provide improvement suggestions (if deciding not to invest)

Startup idea:
[Your idea description here]
```

## Usage Tips
- Be specific about the role — avoid generic descriptions
- Background information adds credibility
- Style determines the tone of the output
