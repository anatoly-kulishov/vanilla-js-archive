/**
 * Revolut · Senior Frontend Engineer · Screening (Stage 01)
 *
 * Format: explain concepts in Google Meet chat — short, precise, text-only.
 * They evaluate how you formulate ideas, not just whether you "know" the topic.
 *
 * Topics reported in 2026:
 * 1. React reconciliation
 * 2. TypeScript: any / unknown / never, generics
 * 3. Event loop
 */

/**
 * 1. React reconciliation
 *
 * Q: What happens when React state/props change?
 * A:
 * - React builds a new Virtual DOM tree and diffs it against the previous one.
 * - Only changed nodes are patched in the real DOM (reconciliation).
 * - `key` helps match list items across renders; unstable keys cause remounts.
 * - Updates may be batched (React 18+: automatic batching in promises/timeouts too).
 *
 * Senior tip: mention fiber architecture briefly — work can be split and interrupted.
 */

/**
 * 2. TypeScript: any vs unknown vs never
 *
 * any     — opt-out of type checking; anything assignable both ways. Avoid in app code.
 * unknown — top type for "we don't know yet"; must narrow before use (safe alternative to any).
 * never   — bottom type; values that never occur (exhaustive checks, unreachable code).
 *
 * Q: What is a generic?
 * A: A type-level parameter that lets a function/class work with multiple types
 *    while preserving type relationships, e.g. identity<T>(value: T): T.
 *
 * Example:
 */
function identity(value) {
    return value;
}

/**
 * 3. Event loop
 *
 * Q: In what order does this run?
 *
 *   console.log('1');
 *   setTimeout(() => console.log('2'), 0);
 *   Promise.resolve().then(() => console.log('3'));
 *   console.log('4');
 *
 * A: 1 → 4 → 3 → 2
 *
 * - Sync code runs first (call stack).
 * - Microtasks (promises, queueMicrotask) run before the next macrotask.
 * - Macrotasks (setTimeout, setInterval, I/O) run after microtasks are drained.
 */

console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
