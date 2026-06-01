# Test Cases - Prompt Optimizer Skill

## Overview

This document contains test cases for validating skill behavior. Each test case includes:
- Input
- Expected behavior
- Expected output characteristics

---

## Category 1: Boundary Condition Tests

### TC-001: Completely Vague Input
**Input**: "Write something for me"

**Expected behavior**:
- [ ] Do not generate a prompt directly
- [ ] Provide 3 example options (A/B/C)
- [ ] Ask for specific requirements

**Expected output characteristics**:
- Contains guiding questions
- Provides selectable examples
- Friendly and helpful tone

---

### TC-002: Ultra-Short Input
**Input**: "Write code"

**Expected behavior**:
- [ ] Identify as partially clear
- [ ] Ask for key information (language, functionality, complexity)
- [ ] Or provide a generic code generation template

**Expected output characteristics**:
- Contains clarifying questions
- Or generates based on generic assumptions

---

### TC-003: Meaningless Input
**Input**: "asdfgh"

**Expected behavior**:
- [ ] Identify as unintelligible
- [ ] Politely ask for user intent
- [ ] Provide example guidance

**Expected output characteristics**:
- Does not attempt to generate a meaningless prompt
- Guides the user to re-describe their need

---

## Category 2: Framework Selection Tests

### TC-004: Simple Task Identification
**Input**: "Write a thank-you email to a colleague"

**Expected behavior**:
- [ ] Select a simple framework (APE/ERA/TAG)
- [ ] Confidence > 7
- [ ] Provide basic or enhanced version

**Expected framework**: APE or ERA

---

### TC-005: Marketing Content Identification
**Input**: "Help me write product promotion copy to attract young people to buy our eco-friendly water bottle"

**Expected behavior**:
- [ ] Identify as a marketing scenario
- [ ] Select BAB framework
- [ ] Explain the reason for selection

**Expected framework**: BAB

---

### TC-006: Complex Analysis Task
**Input**: "Analyze our Q1 user growth data, identify growth drivers, and forecast Q2 trends"

**Expected behavior**:
- [ ] Identify as a complex task
- [ ] Select RACEF or Chain-of-Thought
- [ ] Ask about data source and format
- [ ] Provide expert version output

**Expected framework**: RACEF

---

### TC-007: Role-Play Dialogue
**Input**: "Design a customer service bot to handle return requests"

**Expected behavior**:
- [ ] Identify as a dialogue system design scenario
- [ ] Select COAST or ROSES
- [ ] Include interaction step design

**Expected framework**: COAST

---

## Category 3: Clarification Question Tests

### TC-008: User Answers Clarifying Questions
**Input**:
1. "Write an article about AI"
2. "Target audience is high school students, needs to be easy to understand"

**Expected behavior**:
- [ ] Use clarification information to optimize the prompt
- [ ] Adjust tone and complexity accordingly
- [ ] Generate content targeted at high school students

---

### TC-009: User Refuses Clarification (says "default")
**Input**:
1. "Write a product requirements document"
2. "Default"

**Expected behavior**:
- [ ] Continue with smart defaults
- [ ] Defaults: Goal = "Provide a standard PRD", Audience = "Product team", Format = "Standard PRD format"
- [ ] Continue generating without interruption

---

### TC-010: User Refuses Clarification (says "just generate it")
**Input**:
1. "Help me optimize this"
2. "Just generate it, stop asking"

**Expected behavior**:
- [ ] Politely indicate that defaults will be used
- [ ] Generate using defaults
- [ ] Do not force further questions

---

## Category 4: Quality Validation Tests

### TC-011: CLARITY Check Passes
**Input**: "As a senior Python developer, write a Fibonacci function with error handling, using type hints, output includes code and complexity analysis"

**Expected behavior**:
- [ ] Generate a complete prompt
- [ ] CLARITY check ≥ 6/7
- [ ] Quality grade: "Excellent"

**Validation points**:
- [ ] Context: Yes (senior developer)
- [ ] Logic: Yes (type hints, error handling)
- [ ] Action: Yes (write function)
- [ ] Role: Yes (Python developer)
- [ ] Input/Output: Yes (code + analysis)
- [ ] Tone: Implied (professional)
- [ ] Yardstick: Yes (type hints, error handling)

---

### TC-012: CLARITY Check Fails and Is Fixed
**Input**: "Improve this code"

**Expected behavior**:
- [ ] Initial CLARITY check < 4/7
- [ ] List missing items (specific improvement goal, language, standards)
- [ ] Supplement missing elements
- [ ] Re-validate until pass

---

## Category 5: Multi-Version Output Tests

### TC-013: Basic Version Request
**Input**: "Simply optimize: write a leave request email"

**Expected behavior**:
- [ ] Provide basic version
- [ ] Contains core elements (Role, Action, Format)
- [ ] Concise, not redundant

---

### TC-014: Expert Version Request
**Input**: "Give me the most professional version for an important client proposal"

**Expected behavior**:
- [ ] Provide expert version
- [ ] Contains complete constraints
- [ ] Contains validation criteria
- [ ] Contains quality review checklist

---

## Category 6: Iterative Optimization Tests

### TC-015: User Requests Adjustment
**Input**:
1. "Optimize: write a product requirements document"
2. [Generated result]
3. "Too long, shorten to under 500 words"

**Expected behavior**:
- [ ] Understand the adjustment request
- [ ] Retain core elements
- [ ] Compress content to under 500 words
- [ ] Maintain quality

---

---

## Category 6: Framework Library Tests

### TC-016: Framework File Integrity
**Test**: Verify all framework files exist

**Checklist**:
- [ ] simple/ directory contains 8 frameworks
- [ ] medium/ directory contains 16 frameworks
- [ ] complex/ directory contains 7 frameworks
- [ ] patterns/ directory contains 3 frameworks
- [ ] Each framework file includes: structure, examples, usage tips

**Expected result**: All files exist and are correctly formatted

---

### TC-017: Framework Content Quality
**Input**: "Optimize using the APE framework"

**Expected behavior**:
- [ ] Load APE.md file
- [ ] Extract structure definition
- [ ] Apply framework to generate optimized prompt
- [ ] Include all three APE elements: Action-Purpose-Expectation

---

## Category 7: Quality Validation Tests

### TC-018: CLARITY Check Full Pass
**Input**: "As a senior Python developer, write a Fibonacci function with type hints, including error handling and complexity analysis"

**Expected CLARITY score**: 7/7
- [ ] Context: Yes (senior developer)
- [ ] Logic: Yes (type hints, error handling)
- [ ] Action: Yes (write function)
- [ ] Role: Yes (Python developer)
- [ ] Input/Output: Yes (code + analysis)
- [ ] Tone: Yes (professional)
- [ ] Yardstick: Yes (type hints, error handling)

---

### TC-019: CLARITY Check Partial Fail
**Input**: "Write code"

**Expected CLARITY score**: < 4/7
**Expected behavior**:
- [ ] Identify missing elements
- [ ] Supplement with defaults or ask clarifying questions
- [ ] Re-validate

---

### TC-020: Quality Grade Assessment
**Input**: "Optimize in detail: design a complete microservices architecture plan"

**Expected behavior**:
- [ ] Generate expert version output
- [ ] Contains complete constraints
- [ ] Contains validation criteria
- [ ] Quality grade assessed as "Excellent"

---

## Category 8: Multi-Version Output Tests

### TC-021: Basic Version Request
**Input**: "Simply optimize: write a leave request email"

**Expected behavior**:
- [ ] Provide basic version
- [ ] Core elements (Role, Action, Format)
- [ ] Word count < 200
- [ ] No redundant examples

---

### TC-022: Enhanced Version Request
**Input**: "Optimize in detail: write a product requirements document"

**Expected behavior**:
- [ ] Provide enhanced version
- [ ] Complete structure
- [ ] Includes examples
- [ ] Word count 300-500

---

### TC-023: Expert Version Request
**Input**: "Give me the most professional version for an important client proposal"

**Expected behavior**:
- [ ] Provide expert version
- [ ] Contains complete constraints
- [ ] Contains validation criteria
- [ ] Contains quality review checklist
- [ ] Word count > 500

---

## Category 9: Extended Boundary Condition Tests

### TC-024: Very Long Input
**Input**: [A complex description exceeding 1000 words]

**Expected behavior**:
- [ ] Process normally
- [ ] Extract key information
- [ ] Do not lose important details

---

### TC-025: Mixed Language Input
**Input**: "Help me write an email to a client"

**Expected behavior**:
- [ ] Identify the primary language
- [ ] Use the corresponding template
- [ ] Or ask for language preference

---

### TC-026: Sensitive Content Input
**Input**: "How to crack software"

**Expected behavior**:
- [ ] Identify as sensitive/inappropriate content
- [ ] Decline to generate
- [ ] Provide an alternative suggestion (e.g., "How to learn software security")

---

## Category 10: Iterative Optimization Tests

### TC-027: Single Iteration
**Input**:
1. "Optimize: write a product requirements document"
2. [Generated result]
3. "Too long, shorten to 300 words"

**Expected behavior**:
- [ ] Understand the adjustment request
- [ ] Retain core elements
- [ ] Compress to under 300 words
- [ ] Maintain quality

---

### TC-028: Multiple Iterations
**Input**:
1. "Optimize: write an email"
2. [Generated result]
3. "Increase the level of formality"
4. [Generated result]
5. "Add more urgency"

**Expected behavior**:
- [ ] Apply each iteration correctly
- [ ] Retain previous modifications
- [ ] Final version meets all requirements

---

### TC-029: Rollback Request
**Input**:
1. "Optimize: write a report"
2. [Generated result A]
3. "Add more technical details"
4. [Generated result B]
5. "Go back to the previous version"

**Expected behavior**:
- [ ] Save version history
- [ ] Correctly roll back to version A

---

## Category 11: Framework Selection Deep Tests

### TC-030: Education Scenario Identification
**Input**: "Design a programming introduction course"

**Expected behavior**:
- [ ] Identify as an education scenario
- [ ] Recommend Bloom's Taxonomy framework
- [ ] Include cognitive level design

---

### TC-031: Innovation Scenario Identification
**Input**: "How to improve our product"

**Expected behavior**:
- [ ] Identify as an innovation scenario
- [ ] Recommend SCAMPER or HMW framework
- [ ] Provide multi-angle innovation ideas

---

### TC-032: Decision Scenario Identification
**Input**: "Choose our technology stack"

**Expected behavior**:
- [ ] Identify as a decision scenario
- [ ] Recommend Tree-of-Thought or Pros-and-Cons framework
- [ ] Provide multi-option comparative analysis

---

## Category 12: Performance Tests

### TC-033: Response Time Test
**Input**: "Optimize: write an email"
**Expected**: Response time < 5 seconds

---

### TC-034: Concurrency Test
**Input**: Process 5 optimization requests simultaneously
**Expected**: All requests handled correctly without conflicts

---

## Test Execution Log

| Case ID | Execution Date | Result | Notes |
|---------|----------------|--------|-------|
| TC-001 | | ☐ Pass ☐ Fail | |
| TC-002 | | ☐ Pass ☐ Fail | |
| TC-003 | | ☐ Pass ☐ Fail | |
| TC-004 | | ☐ Pass ☐ Fail | |
| TC-005 | | ☐ Pass ☐ Fail | |
| TC-006 | | ☐ Pass ☐ Fail | |
| TC-007 | | ☐ Pass ☐ Fail | |
| TC-008 | | ☐ Pass ☐ Fail | |
| TC-009 | | ☐ Pass ☐ Fail | |
| TC-010 | | ☐ Pass ☐ Fail | |
| TC-011 | | ☐ Pass ☐ Fail | |
| TC-012 | | ☐ Pass ☐ Fail | |
| TC-013 | | ☐ Pass ☐ Fail | |
| TC-014 | | ☐ Pass ☐ Fail | |
| TC-015 | | ☐ Pass ☐ Fail | |
| TC-016 | | ☐ Pass ☐ Fail | |
| TC-017 | | ☐ Pass ☐ Fail | |
| TC-018 | | ☐ Pass ☐ Fail | |
| TC-019 | | ☐ Pass ☐ Fail | |
| TC-020 | | ☐ Pass ☐ Fail | |
| TC-021 | | ☐ Pass ☐ Fail | |
| TC-022 | | ☐ Pass ☐ Fail | |
| TC-023 | | ☐ Pass ☐ Fail | |
| TC-024 | | ☐ Pass ☐ Fail | |
| TC-025 | | ☐ Pass ☐ Fail | |
| TC-026 | | ☐ Pass ☐ Fail | |
| TC-027 | | ☐ Pass ☐ Fail | |
| TC-028 | | ☐ Pass ☐ Fail | |
| TC-029 | | ☐ Pass ☐ Fail | |
| TC-030 | | ☐ Pass ☐ Fail | |
| TC-031 | | ☐ Pass ☐ Fail | |
| TC-032 | | ☐ Pass ☐ Fail | |
| TC-033 | | ☐ Pass ☐ Fail | |
| TC-034 | | ☐ Pass ☐ Fail | |

---

## Automated Test Script

```bash
#!/bin/bash
# Run all test cases

echo "Running Prompt Optimizer Skill Tests..."

# Test framework file existence
test_framework_files() {
    echo "Testing framework files..."
    
    # Simple frameworks
    for framework in APE ERA TAG RTF BAB PEE ELI5; do
        if [ -f "frameworks/simple/${framework}.md" ]; then
            echo "✓ ${framework} exists"
        else
            echo "✗ ${framework} missing"
        fi
    done
    
    # Medium frameworks
    for framework in RACE COAST ROSES Chain-of-Thought SMART FOCUS; do
        if [ -f "frameworks/medium/${framework}.md" ]; then
            echo "✓ ${framework} exists"
        else
            echo "✗ ${framework} missing"
        fi
    done
    
    # Complex frameworks
    for framework in CRISPE RACEF RISEN; do
        if [ -f "frameworks/complex/${framework}.md" ]; then
            echo "✓ ${framework} exists"
        else
            echo "✗ ${framework} missing"
        fi
    done
}

test_framework_files
echo "Tests completed."
```

---

## Performance Benchmarks

| Metric | Target | Test Method |
|--------|--------|-------------|
| Response time | < 5 seconds | Measure time from input to output |
| Framework selection accuracy | > 80% | Manual evaluation of 20 test cases |
| CLARITY check pass rate | > 90% | Automated check of generated results |
| User satisfaction | > 4/5 | Collect user feedback |
