# RICE Framework

## Name
Reach-Impact-Confidence-Effort

## Structure
- **Reach**: Scope of impact (how many users)
- **Impact**: Degree of impact (how important)
- **Confidence**: Confidence level (how certain)
- **Effort**: Resource investment (how much)
- **RICE Score**: (Reach × Impact × Confidence) / Effort

## Use Cases
- SaaS product feature prioritization
- Marketing campaign planning
- Content creation strategy
- Product launch planning
- Customer support improvement
- Social media strategy
- Budget allocation decisions

## Example
**Input**: "Determine feature priorities for the next iteration"

**Optimized**:
```
Candidate feature list:

Feature A: Dark Mode
- Reach: 80% of users (available to all users)
- Impact: 3 (medium, improves experience but doesn't affect core functionality)
- Confidence: 90% (users have clearly expressed this need)
- Effort: 2 weeks
- RICE Score: (80 × 3 × 0.9) / 2 = 108

Feature B: AI Smart Recommendations
- Reach: 100% of users
- Impact: 5 (high, significantly improves conversion rate)
- Confidence: 50% (uncertain effectiveness)
- Effort: 8 weeks
- RICE Score: (100 × 5 × 0.5) / 8 = 31.25

Feature C: Bulk Export
- Reach: 20% of users (mainly enterprise users)
- Impact: 4 (high, addresses a pain point)
- Confidence: 95% (users have strongly requested this)
- Effort: 1 week
- RICE Score: (20 × 4 × 0.95) / 1 = 76

Feature D: Performance Optimization
- Reach: 100% of users
- Impact: 4 (high, improves experience)
- Confidence: 80%
- Effort: 4 weeks
- RICE Score: (100 × 4 × 0.8) / 4 = 80

Priority ranking:
1. Feature A (108) - High value, low investment
2. Feature D (80) - High impact, medium investment
3. Feature C (76) - Addresses pain points, fast delivery
4. Feature B (31.25) - High investment, high risk, defer

Notes:
- RICE is a reference, not an absolute standard
- Consider strategic alignment and dependencies
- High-risk items require additional evaluation
```

## Usage Tips
- Use specific numbers for Reach (number of users, percentages)
- Use multiples of 0.25-3 for Impact
- Use percentages for Confidence
- Use person-months or person-weeks for Effort
- Re-evaluate priorities regularly
