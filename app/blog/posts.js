// Single source of truth for blog posts. Shared by the index (app/blog/page.js)
// and the post view (app/blog/[slug]/page.js). Add a post here and it appears in
// both places. Content is HTML rendered under the `.prose-minimal` styles.

export const posts = [
  {
    slug: "coding-with-guardrails-not-line-by-line",
    title: "The new way to code: guardrails and tests, not line-by-line control",
    excerpt:
      "When code can be generated and even executed for you, the leverage moves. You stop verifying every line and start engineering systems that can't fail silently.",
    date: "August 11, 2026",
    readTime: 10,
    category: "Engineering",
    author: "David Kieu",
    content: `
      <h2>Where the leverage went</h2>
      <p>For a long time, the core skill of programming was writing every line correctly. You read the line, you reasoned about it, you made sure it was right. That's still valuable — but it's no longer where the most leverage is. Once tools can generate code and even run it for you, reading every line stops scaling. There's too much code, produced too fast, to verify by eye.</p>
      <p>The skill that compounds now is different: <strong>building guardrails and test cases so that faulty output is caught and minimised.</strong> You stop asking "is this line correct?" and start asking "can this system be silently wrong?" If the answer is no — because a schema, a contract, or a test would force the error into the open — then it barely matters whether every individual line is pristine. The system is correct by construction, or wrong in a way you'll hear about.</p>

      <h2>This is the opposite of trusting the AI</h2>
      <p>People hear "AI writes my code" and assume it means trusting the output. It's the reverse. The whole premise is that the output <em>might</em> be wrong, so you design the system so that wrongness can't pass undetected. You assume the generative part is unreliable, and you make the scaffolding around it cheap to trust.</p>

      <h2>Four guardrails, from real projects</h2>
      <p>I keep arriving at the same four moves. Each one converts "I hope this is right" into "this is verifiably right, or loudly wrong."</p>
      <ol>
        <li><strong>Schemas that reject bad output.</strong> In my LLM journaling app, nothing an extraction model produces is stored until it passes a Zod schema. Malformed JSON physically cannot reach the database. The check sits at the boundary, so the code inside doesn't have to be defensive about it.</li>
        <li><strong>Contracts that constrain the task.</strong> In my multi-agent swarm, a file-based data contract is the spec the builder implements against and the verifier checks against. The agents don't have to agree on what "done" means — the contract defines it.</li>
        <li><strong>Deterministic tests that pin behaviour.</strong> In my reinforcement-learning project, the agent, environment, and feature extraction each have unit tests with fixed seeds that assert exact numeric values. A regression isn't a hunch that the agent "seems worse" — it's a red test with a number attached.</li>
        <li><strong>Restricted tools that limit blast radius.</strong> In the swarm, the planning agent has no tool to edit code and the verifying agent has no tool to write anything. They can't break what they can't touch. The constraint is structural, not a request.</li>
      </ol>

      <h2>The mindset shift</h2>
      <p>Line-by-line verification asks the human to be the test. Guardrail-first design makes the system the test. You invest once in the scaffolding that makes correctness cheap to check — a schema, a contract, a seeded test, a restricted toolset — and then the generative part is free to be generative, because its failures are bounded and visible.</p>
      <p>The layer that's hard to replace isn't writing code. It's designing the guardrails well enough that you can stop reading every line and still trust the result. That's the skill worth building.</p>
    `,
  },
  {
    slug: "multi-agent-data-engineering-swarm",
    title: "Designing an autonomous multi-agent data-engineering swarm",
    excerpt:
      "Why I stopped asking one LLM to build a pipeline end-to-end — and split the job into three agents that can't lie to each other.",
    date: "August 4, 2026",
    readTime: 12,
    category: "Agents",
    author: "David Kieu",
    content: `
      <h2>The problem with one big agent</h2>
      <p>Ask a language model to "build a data pipeline" in a single shot and you get something that looks plausible and quietly drifts. It invents column names, skips the parts that are hard to verify, and folds the spec, the implementation, and the verdict on whether it worked into one opaque response. When something goes wrong, there's no seam to inspect — the model is simultaneously the architect, the builder, and its own inspector.</p>
      <p>I wanted a system that could take a vague data-engineering request and return a <strong>machine-checkable pass or fail</strong> — not a paragraph claiming it worked. The fix wasn't a better prompt. It was giving different jobs to different agents, each with the wrong tools for the others' work.</p>

      <h2>Three roles, three toolsets</h2>
      <p>The swarm is a plan → build → verify loop built from three role-specialised agents. The key design decision is that each role has a deliberately restricted toolset, so an agent literally cannot do another agent's job.</p>
      <ul>
        <li><strong>The Planner</strong> (a data architect) reads the request and writes a data contract and a plan. It has no tool to edit code and no shell — it can only write files under <code>docs/</code>. Its output is a specification, never code. It cannot start implementing even if it wanted to.</li>
        <li><strong>The Builder</strong> (a pipeline engineer) implements against the contract. It can read, edit, write, and run shell commands — but its brief is "implement to spec, do not invent scope." It builds exactly what the contract says exists.</li>
        <li><strong>The Verifier</strong> (a data-quality engineer) checks the result. It can read and run things, but it has <em>no Write and no Edit</em>. It cannot fix a problem it finds — it can only report one. Its final output is a structured verdict: pass, or fail with a list of what's broken.</li>
      </ul>
      <p>Restricting tools is more reliable than instructing behaviour. A prompt that says "don't edit code" can be ignored under pressure; an agent that doesn't have the Edit tool <em>cannot</em> edit code. You move the constraint from something the model has to remember to something the system enforces.</p>

      <h2>The contract is the only hand-off</h2>
      <p>Agents don't talk to each other. The only thing passed from one stage to the next is a file — a data contract that names the grain, the columns, the types, the SLAs, and the acceptance criteria. The Planner writes it; the Builder builds to it; the Verifier compares the actual data against it.</p>
      <p>This is the part that makes the result checkable instead of vibes-y. Correctness is no longer "the model said it worked." Correctness is: does the real schema match the contract? Are the keys unique where the contract says they must be? Is freshness within the SLA? Those questions have yes/no answers a machine can return.</p>

      <h2>The loop returns a verdict, not a story</h2>
      <pre><code>plan (architect) ──▶ build (engineer) ──▶ verify (qa)
        ▲                                       │
        └────── fix-back (max 2 rounds) ────────┘ fail</code></pre>
      <p>If the Verifier fails, the work goes back to the Builder with the specific failures attached — not a vague "try again." After two failed rounds it stops and reports failure. The system's final output is a structured object: <code>passed: true|false</code>, plus the list of failures if any. A human (or a CI step) can act on that without reading a single line the model wrote.</p>

      <h2>What I learned</h2>
      <p>Reliability in agentic systems comes from <strong>architecture, not prompting</strong>. Splitting roles, restricting tools, and replacing agent-to-agent chat with a file-based contract are all ways of making the system's state inspectable and its failures specific. The goal isn't an agent that's smarter — it's a system where, when something is wrong, you can tell.</p>
    `,
  },
  {
    slug: "llm-app-reliability-routing-retries",
    title: "Reliability for LLM apps: routing, retries, and deterministic control",
    excerpt:
      "Getting a language model to talk is easy. Getting its output trustworthy enough to persist is the whole job. Three techniques from a production LLM app.",
    date: "July 28, 2026",
    readTime: 11,
    category: "LLM",
    author: "David Kieu",
    content: `
      <h2>The output is the product</h2>
      <p>I built an agentic journaling app — Voice Debrief — that turns a daily debrief into structured, queryable rows. The interesting work isn't getting the model to produce text. It's making sure the model's output is reliable enough to <strong>store</strong>. The moment you persist what an LLM generates, every failure mode becomes data corruption. So the design problem is sharp: how do you make malformed or hallucinated output unable to reach the database?</p>
      <p>Three techniques carried most of the weight.</p>

      <h2>1. Route by stakes, not by capability</h2>
      <p>The app uses two models: a fast, cheap one and a strong, expensive one. The naive approach is "use the strong model for everything important." The better question is: <em>what's the cost of being wrong here?</em></p>
      <ul>
        <li>The interview driver and the two-sentence overview are low-stakes — if they're a little off, nothing breaks. A fast model handles them, and its fluency is more than good enough.</li>
        <li>Structured extraction is high-stakes — these rows become the data layer. Precision matters far more than speed or cost. The strong model does this.</li>
      </ul>
      <p>Routing by cost-of-being-wrong lets you spend the expensive model where mistakes are expensive and a cheap model everywhere else. It's a reliability decision dressed up as a cost decision.</p>

      <h2>2. Schema-validated extraction with a retry loop</h2>
      <p>The strong model is asked to return JSON matching a schema. The moment it comes back, a validator (Zod) checks it. If it fails — wrong shape, missing field, bad type — the error is fed straight back to the model and it tries again, up to a fixed number of attempts.</p>
      <pre><code>for attempt in range(max_attempts):
    raw = model.complete(prompt, mode="json")
    parsed = try_parse_json(raw)        # must be valid JSON
    result = schema.safe_parse(parsed) # must match the schema
    if result.ok:
        return result.value
    prompt = prompt + "\\n\\nThat failed: " + result.error
raise ExtractionError</code></pre>
      <p>The contract is absolute: <strong>nothing reaches the store unless it passes the schema.</strong> A malformed payload isn't "stored with a warning" — it's rejected, retried, and if it keeps failing, the whole extraction fails loudly. There is no code path that writes unvalidated data, so the store physically cannot be poisoned by bad model output.</p>

      <h2>3. Deterministic control via an explicit checklist</h2>
      <p>The interview has to know when it's covered enough. The tempting design is to ask the model "are you done?" — which hands a reliability-critical decision to the least reliable component in the system. Instead, the model is never asked that. It's asked only one thing: <em>which of these three fields did the user's latest message actually address?</em></p>
      <p>The model sets coverage flags; ordinary code merges them into a running checklist. Completion is a deterministic computation — "all three flags are true" — not a feeling the model has. The model can't decide to wrap up early, because the decision isn't its to make.</p>

      <h2>The principle underneath all three</h2>
      <p>Each technique does the same thing in a different place: it makes wrongness either <strong>impossible</strong> (the schema rejects it) or <strong>loudly detected</strong> (the checklist exposes it). You don't make an LLM reliable by hoping. You accept that it will sometimes produce garbage, and you engineer the surrounding system so that garbage can't pass silently. The model stays generative; the guardrails do the verifying.</p>
    `,
  },
];
