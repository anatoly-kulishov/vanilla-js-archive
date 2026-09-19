/**
 * Revolut · Live coding · Task 02
 *
 * Pagination with a "Load more" button.
 *
 * API:
 *   GET /transactions?from=<lastTransactionDate>&limit=2
 *
 * Key insight (where candidates lose time):
 * - This is cursor-based pagination, NOT page/offset.
 * - `from` = date (or id) of the LAST item in the current list.
 * - `limit` = batch size (example uses 2; any small number is fine).
 *
 * Flow:
 * 1. Fetch initial batch (no `from` or default cursor).
 * 2. Store the last transaction's date.
 * 3. On "Load more", pass that date as `from`.
 * 4. Append new items and update the cursor.
 */

import { useCallback, useEffect, useState } from 'react';

const TOKEN = 'token-from-interviewer';
const PAGE_SIZE = 2;

async function fetchTransactions(from) {
    const params = new URLSearchParams({ limit: String(PAGE_SIZE) });

    if (from) {
        params.set('from', from);
    }

    const response = await fetch(`/transactions?${params}`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
    });

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    return response.json();
}

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [cursor, setCursor] = useState(null); // date of the last loaded item
    const [status, setStatus] = useState('loading'); // loading | error | success
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        let cancelled = false;

        fetchTransactions()
            .then((batch) => {
                if (cancelled) return;

                setTransactions(batch);
                setCursor(batch.at(-1)?.date ?? null);
                setHasMore(batch.length === PAGE_SIZE);
                setStatus('success');
            })
            .catch(() => {
                if (!cancelled) {
                    setStatus('error');
                }
            });

        return () => {
            cancelled = true;
        };
    }, []);

    const loadMore = useCallback(async () => {
        if (!cursor || isLoadingMore || !hasMore) {
            return;
        }

        setIsLoadingMore(true);

        try {
            const batch = await fetchTransactions(cursor);

            setTransactions((prev) => [...prev, ...batch]);
            setCursor(batch.at(-1)?.date ?? cursor);
            setHasMore(batch.length === PAGE_SIZE);
        } catch {
            setStatus('error');
        } finally {
            setIsLoadingMore(false);
        }
    }, [cursor, hasMore, isLoadingMore]);

    if (status === 'loading') {
        return <p>Loading transactions…</p>;
    }

    if (status === 'error') {
        return <p>Failed to load transactions</p>;
    }

    return (
        <section>
            <ul>
                {transactions.map((tx) => (
                    <li key={tx.id ?? tx.date}>
                        {tx.date}: {tx.amount}
                    </li>
                ))}
            </ul>

            {hasMore && (
                <button type="button" onClick={loadMore} disabled={isLoadingMore}>
                    {isLoadingMore ? 'Loading…' : 'Load more'}
                </button>
            )}
        </section>
    );
}

/**
 * Interview tips:
 * - Clarify the API first (1–2 min): what field is `from`? ISO date? id?
 * - First request usually omits `from`; only subsequent calls need the cursor.
 * - Append with spread — do not replace the whole list.
 * - Hide/disable "Load more" when the last batch is shorter than `limit`.
 * - Task is easy once you understand `from`; most time is lost on misreading the spec.
 */
