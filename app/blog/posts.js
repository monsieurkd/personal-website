// Single source of truth for blog posts. Shared by the index (app/blog/page.js)
// and the post view (app/blog/[slug]/page.js). Add a post here and it appears in
// both places. Content is HTML rendered under the `.prose-minimal` styles.

export const posts = [
  {
    slug: "3d-representation-training-speed",
    title: "Does how you store 3D data change how fast you can train on it?",
    excerpt:
      "Same 3D objects, four representations, same hardware: total training time spread by about 10x. The fastest had the most parameters, and the densest representation cooked the chip it ran on. A small controlled study in measuring real cost.",
    date: "August 12, 2026",
    readTime: 11,
    category: "ML",
    author: "David Kieu",
    content: `
      <h2>The question</h2>
      <p>Most comparisons in 3D deep learning are between <em>models</em> — a new point-cloud network against an old one, a fresh voxel architecture against the previous best. Far fewer hold the task fixed and ask a simpler question: if you store the same 3D object in different <em>representations</em>, does that choice change how fast you can train on it and serve predictions from it?</p>
      <p>This is not an academic distinction. A robot perceiving the world, or a phone running AR, has to pick a representation for its 3D input and live with the cost. So I ran a small, controlled study: take the same objects, convert each into four common representations, train a small appropriate network on each, and time everything on the same hardware.</p>

      <h2>The setup</h2>
      <p>I used ModelNet40, the standard 12,311-mesh, 40-class benchmark of CAD objects. Every mesh gets normalised to the unit sphere, then converted into four representations, each fed to a small, deliberately old-school network so the cost reflects the representation rather than a heavy modern backbone:</p>
      <ul>
        <li><strong>Point cloud</strong> — 1,024 points sampled on the surface. A PointNet.</li>
        <li><strong>Dense voxel grid</strong> — the shape voxelised into a 32x32x32 occupancy cube. A small 3D-convolution net (VoxNet).</li>
        <li><strong>Sparse voxel</strong> — only the occupied cells, stored as a coordinate list. The representation real lidar pipelines use.</li>
        <li><strong>Multi-view 2D</strong> — the mesh rendered into eight 2D silhouette images from different angles. A 2D-convolution net, like the classic multi-view CNNs.</li>
      </ul>
      <p>Same objects, same train and test split, same hardware, same epoch budget. The only thing that varies is the representation.</p>

      <h2>The result: roughly a 10x spread</h2>
      <p>Total wall-clock time to train for 15 epochs, on a passively-cooled Apple Silicon laptop (the kind of thermally-constrained hardware an edge device or a deployed robot actually runs on):</p>
      <pre><code>representation       total train      inference        accuracy
multi-view 2D         2.7 min         0.4 ms/sample      81.0%
sparse voxel         11.4 min         1.5 ms/sample      83.5%
point cloud        12-13 min         1.4-1.9 ms/sample   82.9%
dense voxel          25-29 min        2.8-3.4 ms/sample   84.9%</code></pre>
      <p>Two things jump out. The spread is large — about 10x from the fastest representation to the slowest. And the ranking is not what you would guess from model size.</p>

      <h2>Parameter count does not predict speed</h2>
      <p>Here is the counterintuitive part. The fastest representation, multi-view 2D, has the <em>most</em> parameters of the four. The slowest, dense voxel, is in the middle of the pack on parameter count. If you tried to estimate training cost from model size, you would get the ranking exactly wrong.</p>
      <p>What actually predicts speed is how well the representation's compute maps onto the hardware. 2D convolution is what GPUs and the Apple Neural Engine are built for; the whole chip is tuned for it. 3D convolution over a dense cube is structurally similar but far less optimised on most hardware, and it moves far more memory per useful operation. The representation's <em>fit to the silicon</em> dominates the raw parameter count, every time.</p>

      <h2>The thing I did not expect: dense representations cook themselves</h2>
      <p>I expected dense voxel to be slow. I did not expect to watch it get slower as it ran. Within a single 15-epoch training run, the per-epoch time climbs — the chip heats up under sustained load and throttles itself, and the heaviest representation heats the chip the most and throttles the hardest. Run it again from a cold start and you get a different number; the variance between two runs of the same representation sits around 12 to 17 percent.</p>
      <p>My first guess was that the later runs in my sequence were slow because the machine was already warm from the earlier ones. That turned out to be wrong — a cold re-run of the dense voxel model was actually <em>slower</em> than the warm one. The workload reheats the chip during the run itself; cooling it down beforehand does not help.</p>
      <p>This is the part I want to dwell on, because it changes what "fast" means.</p>

      <h2>Why I measured wall-clock, not FLOPs</h2>
      <p>The usual way to compare compute cost is theoretical FLOPs, or peak TFLOPs under ideal cooling. That number is clean and reproducible, and on a big actively-cooled data-centre GPU it is close to what you actually experience. On a laptop, a Jetson, or any thermally-constrained device a real robot or edge system runs on, it is a fiction. The chip throttles, and the heaviest representations throttle the most.</p>
      <p>So I treated the throttle as part of the measurement rather than noise to scrub away. The headline numbers are wall-clock times a practitioner actually waits through, on hardware that resembles a deployment target. That makes them messier than a FLOP count — but messier and honest beats clean and misleading. A benchmark that hides throttling tells you nothing about what deploying the representation will actually cost on the hardware you have.</p>
      <p>There is a real finding hiding in that mess. On thermally-constrained hardware, dense 3D representations pay a <em>super-linear</em> penalty. They cost more operations, and those operations heat the chip, which slows the next batch, which extends the run. The cost compounds. A clean-room benchmark would flatten that effect and miss it entirely.</p>

      <h2>What this does not prove</h2>
      <p>I want to be careful not to overclaim, because this is a personal study, not a paper.</p>
      <ul>
        <li><strong>One machine.</strong> The absolute numbers are specific to a passively-cooled laptop. On an actively-cooled data-centre GPU the ranking could shift, and the throttle effect would largely vanish. The thermal-coupling finding is a property of edge-class hardware, not of the representations in general.</li>
        <li><strong>Deliberately small, older models.</strong> I used PointNet and VoxNet on purpose, so the cost reflects the representation rather than a modern optimised backbone. That means the accuracy numbers sit below the current state of the art, and the speed numbers would move with better nets. The relative ranking is the point, not the absolutes.</li>
        <li><strong>Sparse voxel was approximated.</strong> Production sparse-voxel pipelines use sparse 3D convolution (spconv), which I could not run on this hardware. I read the occupied cells as a point set through a PointNet instead, which tests the sparse-storage idea honestly but is not the production-grade net. Treat that column as indicative.</li>
        <li><strong>One dataset, one task, light training.</strong> ModelNet40 object classification, 15 epochs. Real claims need multiple datasets, segmentation and detection tasks, and converged training.</li>
      </ul>
      <p>In other words, this is a directional, honestly-measured study that reflects real edge-hardware costs. It is the kind of thing that informs an engineering choice. It is not the kind of thing that settles a research question.</p>

      <h2>What I would run next</h2>
      <ul>
        <li><strong>A resolution sweep</strong> — re-run the dense voxel grid at 32, 64, and 128, to show the cubic-cost curve directly. The point cloud and multi-view representations stay roughly flat; the dense cube blows up. That single chart is the cleanest argument against going dense.</li>
        <li><strong>Multiple seeds, monitored temperature.</strong> Three seeds per representation, each from a cold start, with the chip temperature logged, so the variance becomes a reported quantity instead of a confound.</li>
        <li><strong>A real edge device and a real data-centre GPU.</strong> Run the same four representations on a Jetson and on an actively-cooled GPU. That separates the representation effect from the thermal-coupling effect, which a single-machine study cannot.</li>
      </ul>

      <h2>The practical takeaway</h2>
      <p>If you are picking a 3D representation for something that runs on constrained hardware — a robot, a phone, an edge device — treat it as an engineering decision, not a given. Prefer 2D or sparse representations when you can; reach for dense 3D only when its accuracy edge is worth roughly an order of magnitude more wall-clock, plus the thermal tax. And do not estimate the cost from the number of parameters. Estimate it from how the representation's compute maps onto the silicon you actually have.</p>
      <p>The code, the conversions, the timing harness, and the full numbers are on <a href="https://github.com/monsieurkd/3d-repr-benchmark" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>

      <p class="further"><strong>Further reading:</strong></p>
      <ul>
        <li>Qi et al., <em>PointNet</em> (CVPR 2017) — learning directly on raw point sets: <a href="https://arxiv.org/abs/1612.00593" target="_blank" rel="noopener noreferrer">arxiv.org/abs/1612.00593</a></li>
        <li>Su et al., <em>Multi-View CNN for 3D Shape Recognition</em> (ICCV 2015) — rendering 3D shapes to 2D views for recognition: <a href="https://arxiv.org/abs/1505.00880" target="_blank" rel="noopener noreferrer">arxiv.org/abs/1505.00880</a></li>
        <li>Qi et al., <em>Volumetric and Multi-View CNNs for Object Classification on 3D Data</em> (ECCV 2016) — the closest precedent, a controlled volumetric-versus-multi-view comparison: <a href="https://arxiv.org/abs/1604.03265" target="_blank" rel="noopener noreferrer">arxiv.org/abs/1604.03265</a></li>
        <li>Liu et al., <em>Point-Voxel CNN</em> (NeurIPS 2019) — a hybrid that uses points for memory and voxels for convolution, evidence that no single pure representation wins: <a href="https://arxiv.org/abs/1907.03739" target="_blank" rel="noopener noreferrer">arxiv.org/abs/1907.03739</a></li>
      </ul>
    `,
  },
  {
    slug: "coding-with-guardrails-not-line-by-line",
    title: "The new way to code: guardrails and tests, not line-by-line control",
    excerpt:
      "When code can be generated and even executed for you, the leverage moves. You stop verifying every line and start engineering systems that can't fail silently — an idea older than AI.",
    date: "August 11, 2026",
    readTime: 12,
    category: "Engineering",
    author: "David Kieu",
    content: `
      <h2>Where the leverage went</h2>
      <p>For most of computing history, the core skill of a programmer was writing every line correctly. You wrote the line, you read the line, you reasoned about whether it was right. That is still a valuable skill — but it is no longer where the most leverage is. Once tools can generate code and even run it for you, reading every line stops scaling. There is too much code, produced too fast, to verify by eye.</p>
      <p>The skill that compounds now is different: <strong>building guardrails and test cases so that faulty output is caught and minimised.</strong> You stop asking "is this line correct?" and start asking "can this system be silently wrong?" If the answer is no — because a schema, a contract, or a test would force the error into the open — then it barely matters whether every individual line is pristine. The system is correct by construction, or wrong in a way you will hear about.</p>
      <p>Here is the part that surprised me: this is not a new idea. It is a very old idea, from typed functional programming and 1980s language design, that the AI era has made newly relevant. Let me show you what I mean.</p>

      <h2>The old way: correctness by inspection</h2>
      <p>The traditional mental model is <em>correctness by inspection</em>. The program is a glass box; you make it correct by reading it carefully. Reviews exist to put more eyes on the glass. This works when humans write all the code and the codebase grows at the speed a human can type. It breaks down when a model can emit a few hundred lines in seconds. You simply cannot inspect your way to confidence at that volume.</p>
      <p>Notice the assumption hidden inside inspection: the human is the test. Every line is trusted only because a person looked at it. If nobody looks, nothing is verified.</p>

      <h2>The new way: correctness by construction and detection</h2>
      <p>Replace that with two complementary moves:</p>
      <ul>
        <li><strong>Correctness by construction</strong> — design the system so that certain wrong states cannot be expressed at all. The error is prevented, not detected.</li>
        <li><strong>Correctness by detection</strong> — for the wrong states you cannot prevent, make sure they are caught loudly and early, before they can cause harm.</li>
      </ul>
      <p>Together these let you trust a body of code you did not personally read, because the system itself is doing the checking. The human stops being the test; the system becomes the test.</p>

      <h2>This is older than AI</h2>
      <p>If you have been around software a while, none of this is new. The vocabulary is.</p>
      <p>Yaron Minsky, of Jane Street, famously framed the construction half as <strong>"make illegal states unrepresentable."</strong> The argument is that you should design your types so that an invalid state cannot even be written down in the language — not "validated at runtime," but impossible to express. If your type system makes a negative bank balance unconstructable, you do not need a runtime check for it; the bug category is gone.</p>
      <p>The detection half is <strong>Design by Contract</strong>, Bertrand Meyer's framework from Eiffel: every function carries a <em>precondition</em> (what it demands from its caller), a <em>postcondition</em> (what it guarantees), and every type carries an <em>invariant</em> (what must always hold). Violations are bugs, and they fire loudly at the boundary. Here is the shape of it, in plain Python so the idea is clear regardless of the language you use:</p>
      <pre><code>def deposit(account, amount):
    assert amount &gt; 0, "precondition: amount must be positive"
    before = account.balance
    account.balance += amount
    assert account.balance == before + amount, "postcondition"
    assert account.balance &gt;= 0, "invariant: balance never negative"</code></pre>
      <p>The precondition is the caller's obligation; the postcondition and invariant are the function's promise. Contracts are executable documentation — they say precisely what a function requires and delivers, and they fail fast when someone lies.</p>
      <p>What AI-assisted coding did was not invent these ideas. It made them stop being optional.</p>

      <h2>Four guardrails, from real projects</h2>
      <p>I keep arriving at the same four moves. Each one converts "I hope this is right" into "this is verifiably right, or loudly wrong."</p>

      <h3>1. Schemas at the boundary</h3>
      <p>In my LLM journaling app, nothing a model produces is stored until it passes a Zod schema. Malformed JSON physically cannot reach the database — there is no code path that writes unvalidated data, because the write sits behind the validator. This is "make illegal states unrepresentable" applied to a data store: the illegal row cannot be constructed, so it cannot be persisted. The check lives at the boundary, which means the code inside the boundary does not have to be defensive about model output. It can assume well-formed data, because bad data cannot get in.</p>

      <h3>2. Contracts as specs</h3>
      <p>In my multi-agent swarm, a file-based data contract is the specification the builder agent implements against and the verifier agent checks against. The contract names the grain, the columns and types, the freshness SLA, and the acceptance criteria. This is Design by Contract at the scale of a whole system: the contract is the invariant, and the verifier's job is to check that the running pipeline satisfies it. The agents do not have to agree on what "done" means — the contract defines it.</p>

      <h3>3. Deterministic, seeded tests</h3>
      <p>In my reinforcement-learning project, the agent, the environment, and the feature extraction each have unit tests with fixed random seeds that assert exact numeric values. A regression is not a hunch that the agent "seems worse" — it is a red test with a number attached. This is the testing analogue of the same principle: pin the behaviour you care about with a check that a machine runs, so that "did this change break something" has an objective answer instead of a vibe. (Take this further with property-based testing — tools like Hypothesis generate hundreds of inputs and assert invariants over all of them, which catches edge cases no human would think to write a test for.)</p>

      <h3>4. Restricted tools that limit blast radius</h3>
      <p>In the swarm, the planning agent has no tool to edit code, and the verifying agent has no tool to write anything. They cannot break what they cannot touch. The constraint is structural, not a polite request in a prompt. This is the principle of <em>least privilege</em> applied to agents: give each component the narrowest capability it needs, so that a failure or hallucination in one place cannot reach the things it was never supposed to touch.</p>

      <h2>The meta-skill: knowing where to put the guardrail</h2>
      <p>The hard part is not knowing that guardrails exist. It is knowing <em>where</em> to put them. The cheapest place to put a check is almost always at a boundary — the edge of a system, a module, a trust domain — rather than scattered through the interior. Boundaries are chokepoints: there are few of them, all traffic passes through, and validating once at the boundary lets everything inside stay simple.</p>
      <p>Think about where untrusted data enters your system. User input, file uploads, third-party API responses, and — now — model output are all untrusted data. If you validate each of them exactly once, at the moment they cross in, the rest of your code can treat them as trusted. If you skip the boundary check, you end up re-checking the same thing in a dozen interior functions, inconsistently, and inevitably missing one. The guardrail at the boundary is a force multiplier; the guardrail sprinkled through the interior is a maintenance burden.</p>
      <p>This is also the right frame for thinking about agents. An LLM is, technically, an untrusted subprocess that produces text. Treat its output the way you treat user input: validate it at the boundary before it touches anything that matters.</p>

      <h2>Where this still breaks (be honest)</h2>
      <p>Guardrails are not a complete substitute for reading code, and pretending otherwise is dangerous. A few places still demand a human eye:</p>
      <ul>
        <li><strong>Security and auth.</strong> A schema confirms a token is well-formed; it does not confirm the auth logic is correct. Read the security-critical lines yourself.</li>
        <li><strong>Currency and irreversible actions.</strong> Anything that moves money, sends email, or deletes data deserves inspection plus guardrails, not guardrails instead of inspection.</li>
        <li><strong>Currency of meaning.</strong> An output can be schema-valid and still be wrong — a model can return a plausible-but-fabricated value that passes every type check. Schemas prevent malformed data; they do not prevent confident nonsense. For high-stakes fields, you still need a human or a second, independent check.</li>
      </ul>
      <p>There is also a recursion problem: someone has to write the guardrails, and that code can itself be wrong. You cannot solve trust entirely by adding checks; you can only push the trusted core smaller and smaller until it is something a human can actually hold in their head. The goal is a small, audited trusted core surrounded by generative machinery whose failures are bounded and visible.</p>

      <h2>How to start, if this is new</h2>
      <p>If you want to apply this to an existing codebase, don't try to add every guardrail at once. Find the boundaries first — the places untrusted data crosses in (user input, file uploads, API responses, model output) — and put one strong validation check at each. That alone removes a large class of bugs, because everything inside can start assuming well-formed input.</p>
      <p>Then pick the one invariant your system most depends on — the thing whose violation would cause the worst failure — and write a deterministic test for it with a fixed seed or a fixed input. You now have a tripwire: if anyone, human or model, breaks that invariant, a red test tells you.</p>
      <p>Then, only if a component is risky enough to justify it, restrict its tools. Most code does not need capability limits; agents and external integrations do. Match the guardrail to the blast radius.</p>

      <h2>The recursion, and the trusted core</h2>
      <p>Here is the honest limit of the whole approach. Guardrails are code, and code can be wrong — so who validates the validator? You cannot solve trust entirely by adding checks; you only push the problem down a level. The practical resolution is the <strong>trusted core</strong>: keep shrinking the part of the system that must be correct-by-human-review until it is small enough to hold in your head. Everything around that core can be generated, probabilistic, or agent-produced, because its failures are caught at the edges before they reach the core. The goal is not to eliminate trust. It is to concentrate it into the smallest, most auditable place possible — and then defend that core by hand.</p>

      <h2>The mindset shift</h2>
      <p>Line-by-line verification asks the human to be the test. Guardrail-first design makes the system the test. You invest once in the scaffolding that makes correctness cheap to check — a schema at a boundary, a contract between agents, a seeded test, a restricted toolset — and then the generative part is free to be generative, because its failures are caught at the edges rather than hidden in the middle.</p>
      <p>The layer that is hard to replace is not writing code. It is designing the guardrails well enough that you can stop reading every line and still trust the result. That is the skill worth building — and, conveniently, it is the skill that was already valuable long before the models showed up.</p>

      <p class="further"><strong>Further reading:</strong></p>
      <ul>
        <li>Yaron Minsky, <em>Effective ML</em> (talks) — the original framing of "make illegal states unrepresentable," from Jane Street's OCaml practice: <a href="https://blog.janestreet.com" target="_blank" rel="noopener noreferrer">blog.janestreet.com</a></li>
        <li>Bertrand Meyer, <em>Object-Oriented Software Construction</em> — the definitive reference for Design by Contract (preconditions, postconditions, invariants).</li>
        <li>Hypothesis — property-based testing for Python, to assert invariants over generated inputs: <a href="https://hypothesis.readthedocs.io" target="_blank" rel="noopener noreferrer">hypothesis.readthedocs.io</a></li>
      </ul>
    `,
  },
  {
    slug: "multi-agent-data-engineering-swarm",
    title: "Designing an autonomous multi-agent data-engineering swarm",
    excerpt:
      "Why one agent can't reliably build a pipeline end-to-end — and how splitting the job into three roles with the wrong tools for each other's work makes the result actually checkable.",
    date: "August 4, 2026",
    readTime: 11,
    category: "Agents",
    author: "David Kieu",
    content: `
      <h2>The dream, and the trap</h2>
      <p>The promise of agentic AI is seductively simple: describe the task, get a working result. The reality, for anything non-trivial, is that a single agent asked to build an entire data pipeline will hand you something that <em>looks</em> done and isn't. It invents columns that don't exist in the source. It quietly skips the deduplication step, because that part is hard to verify. And because the same model wrote the spec, the code, and the verdict on whether the code is correct, there is no independent place to look when something is wrong.</p>
      <p>I wanted a system that could take a vague data-engineering request and return a <strong>machine-checkable pass or fail</strong> — not a paragraph assuring me it worked. This is the story of how breaking one agent into three, each unable to do the others' job, got me there.</p>

      <h2>First, do it the wrong way</h2>
      <p>My first version was the obvious one: one capable agent, a long prompt, full tool access. "Here's the source data; build a tested pipeline and tell me if it's correct." It produced impressive output and was wrong in ways I couldn't easily see. Three failure modes kept repeating:</p>
      <ol>
        <li><strong>Conflated roles.</strong> The agent that wrote the schema was also the agent that "validated" the schema. A model rarely catches its own mistakes — it has every incentive to declare its own work correct.</li>
        <li><strong>Unverifiable claims.</strong> "The pipeline handles duplicates correctly" is a sentence a model can write whether or not it is true. There was no machine-readable signal behind the claim.</li>
        <li><strong>Context pollution.</strong> Spec, code, errors, and justification all lived in one context window. When it went wrong, the failure was buried in a wall of text.</li>
      </ol>

      <h2>The key idea: separate capability from authority</h2>
      <p>The fix came from a shift in how I thought about agents. An LLM is broadly <em>capable</em> — given tools, it can read, write, and reason about almost anything. But capability is not the same as <em>authority</em>. A senior engineer is capable of writing code, doing QA, and designing architecture, but on a real team we still don't let the same person merge their own pull request. We separate roles not because people aren't capable, but because separation makes the result checkable.</p>
      <p>So instead of one agent with all the tools, I built three agents, each with a deliberately restricted toolset. The constraint isn't "please focus on X" — it's "you physically cannot do Y."</p>

      <h2>The three roles</h2>
      <p>The swarm is a plan → build → verify loop. Each stage is a different agent with the wrong tools for the other two.</p>
      <ul>
        <li><strong>The Planner (a data architect).</strong> Reads the request and produces two documents: a plan, and a <em>data contract</em>. The contract is the spec the rest of the system works against — it names the grain (one row per what?), every column with its type, the freshness SLA, the partition key, the idempotency strategy, and the acceptance criteria. Its toolset is Read, Grep, Glob, and Write to <code>docs/</code> — but <strong>no Edit and no Bash</strong>. It cannot write or run code even if it tries. Its output is a specification, by construction.</li>
        <li><strong>The Builder (a pipeline engineer).</strong> Implements the pipeline against the contract — bronze (raw), silver (cleaned), gold (business-facing) layers, typed schemas, incremental models, partitioning. It has Read, Edit, Write, Bash, Glob, Grep — full implementation power. But its brief is "implement to spec; do not invent scope." It builds exactly what the contract says exists, no more.</li>
        <li><strong>The Verifier (a data-quality engineer).</strong> Checks the result against the contract on two axes: do the code tests pass, and is the data actually correct? It checks schema drift, nulls, uniqueness, referential integrity, row-count sanity, freshness, and idempotency (a re-run yields identical output). Its toolset is Read, Grep, Glob, Bash — and crucially, <strong>no Write and no Edit</strong>. It cannot fix a bug it finds. It can only report one.</li>
      </ul>

      <h3>What the contract actually looks like</h3>
      <p>The contract is the backbone of the whole system, so it's worth showing its shape. A real one is longer, but the skeleton is this:</p>
      <pre><code># docs/data-contract.md
grain:          one row per order_line
source:         raw.orders + raw.order_items
columns:
  order_line_id : uuid, not null, unique
  order_id      : uuid, not null   # FK to orders
  amount        : decimal(10,2), not null, &gt;= 0
  created_at    : timestamptz, not null
partition_key:  created_at
freshness_sla:  max(now() - max(created_at)) &lt; 24 hours
idempotency:    re-running on the same input yields byte-identical output
acceptance:
  - no duplicate order_line_id
  - every order_id exists in orders
  - no null amount</code></pre>
      <p>Every line there is something the Verifier can turn into a query with a yes/no answer. That is the point: correctness expressed as checkable facts, not prose.</p>

      <h2>Why restricted tools beat better prompting</h2>
      <p>This is the part I want to emphasise, because it is the opposite of how most people try to improve agents. A prompt that says "don't edit code" is a request the model can ignore, especially under complexity. An agent that does not have the Edit tool <em>cannot</em> edit code — that is enforced by the system, not by the model's compliance. You have moved the constraint from something the model has to remember to something the system guarantees.</p>
      <p>Anthropic's write-up on multi-agent research systems makes the same point from the other direction: the orchestrator-worker pattern works because each subagent gets its own context window and a focused objective, and handoffs happen through files rather than long in-context monologues. My swarm is a stricter version of that idea — not just separate contexts, but separate and deliberately incompatible toolsets.</p>

      <h2>The contract is the only hand-off</h2>
      <p>Agents don't pass messages to each other. The only thing that moves between stages is a file: the data contract. The Planner writes it; the Builder reads it before writing a line of code; the Verifier reads it to know what "correct" means. This is what turns correctness from a vibe into a checkable property. "The model said it worked" becomes a set of questions with yes/no answers: does the actual schema match the contract? Are the keys unique where the contract requires uniqueness? Is freshness inside the SLA? Does a re-run produce identical output?</p>
      <p>If you know design by contract or typed functional programming, this should feel familiar — it is the same instinct as "make illegal states unrepresentable," applied at the boundary between two agents instead of inside one program.</p>

      <h2>The loop returns a verdict, not a story</h2>
      <pre><code>plan (architect) ──▶ build (engineer) ──▶ verify (qa)
      ▲                                       │
      └────── fix-back (max 2 rounds) ────────┘  fail</code></pre>
      <p>If the Verifier's verdict is fail, the specific failures go back to the Builder — not "try again," but "these three acceptance criteria failed; here they are." After two failed rounds the system stops and reports failure rather than looping forever. The final output is a structured object:</p>
      <pre><code>{
  "passed": false,
  "qa_failures": [
    "duplicate order_line_id: 3 rows",
    "2 order_id values missing in orders"
  ]
}</code></pre>
      <p>A human — or a CI step — can act on that without reading anything the model wrote. That is the goal: a result you trust because it was checked by an independent agent against an explicit contract, not because a model asserted it.</p>

      <h2>Trade-offs (for the sceptics)</h2>
      <p>This isn't free, and I don't want to oversell it. Multi-agent systems burn more tokens — cost roughly scales with the number of agents, because each carries its own context. They are slower: stages run sequentially, and the fix-back loop adds round-trips. They are more complex to build and debug than a single prompt. So this pattern earns its keep on tasks where correctness matters and "looks plausible but is wrong" is expensive — building a pipeline someone will make decisions on, generating code that runs in production, anything where a silent failure costs more than the extra tokens. For a one-shot "summarise this," a single agent is the right call. Don't reach for three agents when one will do.</p>

      <h2>What I'd do differently</h2>
      <p>The contract can be wrong. A Planner that misunderstands the source produces a confidently incorrect spec, and the Builder will faithfully implement the wrong thing — the Verifier catches implementation bugs, not spec bugs. Catching spec bugs means a human (or a fourth, adversarial agent) reviewing the contract itself before any code is written. I would also add hard cost guardrails: token caps and a strict fix-back ceiling per run, so a stuck loop fails fast instead of burning budget.</p>

      <h2>What a run actually looks like</h2>
      <p>Abstract architecture is cheap; let me ground it. Suppose the request is: "build a daily pipeline that turns raw order events into one row per order line, fresh within 24 hours." Here is what each agent does.</p>
      <p>The Planner reads the source schema and writes the contract: grain is one row per order line; columns are order_line_id (uuid, unique), order_id (foreign key), amount (decimal, non-negative), created_at; partition on created_at; freshness under 24 hours; idempotent on input; and acceptance criteria — no duplicate ids, every order_id resolves, no null amount. It cannot touch code, so it spends its budget on getting the spec right.</p>
      <p>The Builder implements three models — bronze (raw copy), silver (cleaned, typed, deduped), gold (one row per order line, joined) — plus the tests for those acceptance criteria. It works strictly inside the contract: if the contract doesn't mention a column, it doesn't invent one.</p>
      <p>The Verifier runs the tests and queries the data directly — counts duplicate order_line_ids, checks every order_id exists in the orders table, asserts freshness, and re-runs the pipeline to confirm identical output. It returns a structured verdict: pass, or fail with the specific broken criteria. It writes nothing; it only reports.</p>
      <p>Notice what is missing from this loop. There is no point at which a model simply declares the pipeline correct. Correctness is established by an independent agent querying the data against an explicit spec. That is the entire reason the architecture exists.</p>

      <h2>The takeaway</h2>
      <p>Reliability in agentic systems comes from <strong>architecture, not prompting</strong>. Splitting roles, restricting tools, and replacing agent-to-agent chat with a file-based contract are all ways of making the system's state inspectable and its failures specific. The goal was never a smarter agent. It was a system where, when something is wrong, you can tell.</p>

      <p class="further"><strong>Further reading:</strong></p>
      <ul>
        <li>Anthropic — <em>Multi-agent research systems</em> (the orchestrator-worker pattern, context isolation, file-based handoffs): <a href="https://www.anthropic.com/engineering/multi-agent-research-system" target="_blank" rel="noopener noreferrer">anthropic.com/engineering</a></li>
        <li>Medallion architecture — the bronze / silver / gold layering the Builder targets: <a href="https://www.databricks.com/glossary/medallion-architecture" target="_blank" rel="noopener noreferrer">databricks.com/glossary/medallion-architecture</a></li>
      </ul>
    `,
  },
  {
    slug: "llm-app-reliability-routing-retries",
    title: "Reliability for LLM apps: routing, retries, and deterministic control",
    excerpt:
      "Getting a language model to talk is easy. Getting its output trustworthy enough to persist is the whole job. Four techniques from a production LLM app — and the one principle underneath all of them.",
    date: "July 28, 2026",
    readTime: 9,
    category: "LLM",
    author: "David Kieu",
    content: `
      <h2>The output is the product</h2>
      <p>I built an agentic journaling app — Voice Debrief — that turns a daily debrief into structured, queryable rows. The interesting work isn't getting the model to produce text. It's making sure the model's output is reliable enough to <strong>store</strong>. The moment you persist what an LLM generates, every failure mode becomes data corruption: a hallucinated value doesn't disappear when you refresh the page, it sits in your database quietly poisoning every downstream query.</p>
      <p>So the design problem is sharp: how do you make malformed or hallucinated output unable to reach the database? Here are the techniques that carried most of the weight — and, more importantly, the single principle underneath all of them.</p>

      <h2>Start with the right mental model</h2>
      <p>Before any technique, adopt this framing: <strong>an LLM is an untrusted subprocess that produces text.</strong> Treat its output the way you treat user input, form submissions, or third-party API responses. You would never pipe raw user input straight into your database; you validate it at the boundary first. Model output deserves the same distrust — arguably more, because a model's output is plausible by design, which makes its errors harder to spot than a user's typos.</p>
      <p>Everything below follows from that one shift.</p>

      <h2>1. Route by stakes, not by capability</h2>
      <p>The app uses two models: a fast, cheap one and a strong, expensive one. The naive approach is "use the strong model for everything important." The better question is: <em>what's the cost of being wrong here?</em></p>
      <ul>
        <li>The interview driver and the two-sentence overview are low-stakes — if they're a little off, nothing breaks. A fast model handles them, and its fluency is more than good enough.</li>
        <li>Structured extraction is high-stakes — these rows become the data layer. Precision matters far more than speed or cost. The strong model does this.</li>
      </ul>
      <p>Routing by cost-of-being-wrong lets you spend the expensive model where mistakes are expensive and a cheap model everywhere else. It is a reliability decision dressed up as a cost decision. The heuristic I use: if the output feeds a decision or gets stored verbatim, route to the strong model; if it is ephemeral or cosmetic, the fast model is fine.</p>

      <h2>2. Schema-validated extraction with a retry loop</h2>
      <p>The strong model is asked to return JSON matching a schema. The moment it comes back, a validator (Zod) checks it. If it fails — wrong shape, missing field, bad type — the error is fed straight back to the model and it tries again, up to a fixed number of attempts.</p>
      <pre><code>for attempt in range(max_attempts):
    raw = model.complete(prompt, response_format="json")
    parsed = try_parse_json(raw)         # must be valid JSON
    result = schema.safe_parse(parsed)  # must match the schema
    if result.ok:
        return result.value
    prompt = prompt + "\\n\\nThat failed: " + result.error
raise ExtractionError   # fail loud, store nothing</code></pre>
      <p>The contract is absolute: <strong>nothing reaches the store unless it passes the schema.</strong> A malformed payload isn't "stored with a warning" — it is rejected, retried, and if it keeps failing, the whole extraction fails loudly. There is no code path that writes unvalidated data, so the store physically cannot be poisoned by bad model output.</p>
      <p>If you have followed the platforms lately, you know there are now stronger versions of this. Plain "JSON mode" only guarantees the output is valid JSON — it does not guarantee it matches <em>your</em> schema. Structured outputs (OpenAI) and tool/function calling (OpenAI, Anthropic) go further: they constrain decoding so the model's tokens are forced to conform to a JSON Schema as they are generated. That is a harder guarantee than validating after the fact — it makes many malformed outputs <em>ungeneratable</em>. But it does not replace the boundary validator. Constrained decoding catches structural errors; your schema at the boundary catches semantic ones (a well-formed number that is still wrong). Use both.</p>

      <h2>3. Deterministic control via an explicit checklist</h2>
      <p>The interview has to know when it has covered enough. The tempting design is to ask the model "are you done?" — which hands a reliability-critical decision to the least reliable component in the system. A model that wants to be helpful will often say yes too early; a model that is uncertain will ramble. Either way, you have given control of your state machine to a probability distribution.</p>
      <p>Instead, the model is never asked that. It is asked only one thing: <em>which of these three fields did the user's latest message actually address?</em> The model sets coverage flags; ordinary code merges them into a running checklist. Completion is a deterministic computation — "all three flags are true" — not a feeling the model has. The model can't decide to wrap up early, because the decision isn't the model's to make.</p>
      <p>The general pattern: use the LLM as a <strong>sensor</strong> (it reads the user's message and reports what it saw), not as a <strong>controller</strong> (it decides what happens next). Sensors can be noisy without breaking the system, because the control logic that consumes them is deterministic. This is just the classic state-machine rule — keep control flow out of the unreliable component — rediscovered for the LLM era.</p>

      <h2>4. Make the write atomic and idempotent</h2>
      <p>One more, because it saves you on bad days. When extraction succeeds, write the results in a single database transaction, so a partial failure can't leave half a session stored. And make the write idempotent on the session id, so a retry (from a network blip, or the user re-submitting) updates the same rows instead of creating duplicates. The model does not need to know about any of this; the storage layer enforces it regardless of what the model produced.</p>

      <h2>The principle underneath all of them</h2>
      <p>Each technique does the same thing in a different place: it makes wrongness either <strong>impossible</strong> (the schema rejects it; the unvalidated write path does not exist) or <strong>loudly detected</strong> (the checklist exposes it; the transaction rolls back). You do not make an LLM reliable by hoping. You accept that it will sometimes produce garbage, and you engineer the surrounding system so that garbage can't pass silently. The model stays generative; the guardrails do the verifying.</p>
      <p>If you remember one thing, remember the boundary. Put the check at the place untrusted data crosses into trusted territory — once, thoroughly — and let everything inside that boundary assume the data is good.</p>

      <h2>Trade-offs and limits</h2>
      <ul>
        <li><strong>Latency.</strong> Retries add round-trips. A failing extraction can take several attempts before it gives up, and the user waits. Set <code>max_attempts</code> low, and fall back gracefully (show the raw input, let the user edit) rather than blocking.</li>
        <li><strong>Valid but wrong.</strong> A schema cannot catch a confident hallucination that happens to be well-formed. For high-stakes fields, pair the schema with a human-in-the-loop edit step — which is exactly why my app lets the user correct extracted rows and writes those corrections back with a flag.</li>
        <li><strong>Free text.</strong> Not every field is structured. Overview paragraphs and summaries can't be schema-validated the way a typed row can; for those, length limits and a separate review path are the best you can do. Don't pretend a schema covers what it can't.</li>
      </ul>

      <h2>Test the model like you test code</h2>
      <p>Schemas catch malformed output. But how do you know the model's <em>correct</em> output is still correct after you change a prompt, swap a model, or bump a temperature? The answer is the same as for any other code: you write tests.</p>
      <p>Keep a golden set — a few dozen real inputs paired with the output you expect — and run the extraction over them on every change. If a prompt tweak makes three of them flip, your test suite tells you before a user does. This is just regression testing, applied to a component people forget is code. The model is a function; the prompt is its source; treat changes to the prompt with the same discipline as changes to a function body.</p>
      <p>The same logic guards the schema itself. A schema that rejects everything is technically "safe" and totally useless — it fails every extraction. Your golden set catches that too: if a schema change drops your success rate from 95% to 40%, that is a regression, not a reliability win. Reliability means reliably <em>succeeding</em>, not just reliably refusing bad output.</p>

      <h2>Takeaway</h2>
      <p>Treat the model as an untrusted subprocess. Validate its output at the boundary, route by the cost of being wrong, keep control flow deterministic, and make writes atomic and idempotent. Do those four things and your database stops being at the mercy of a probability distribution — which, if you are building anything you want people to depend on, is the whole game.</p>

      <p class="further"><strong>Further reading:</strong></p>
      <ul>
        <li>OpenAI — <em>Structured Outputs</em> (constrained decoding to a JSON Schema, vs plain JSON mode): <a href="https://platform.openai.com/docs/guides/structured-outputs" target="_blank" rel="noopener noreferrer">platform.openai.com/docs/guides/structured-outputs</a></li>
        <li>OpenAI — <em>Function calling</em> (tool/function-calling as another constrained-output mechanism): <a href="https://platform.openai.com/docs/guides/function-calling" target="_blank" rel="noopener noreferrer">platform.openai.com/docs/guides/function-calling</a></li>
        <li>Zod — schema validation at the TypeScript boundary: <a href="https://zod.dev" target="_blank" rel="noopener noreferrer">zod.dev</a></li>
      </ul>
    `,
  },
];
