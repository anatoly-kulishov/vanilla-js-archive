/**
 * Revolut · Live coding · Task 01
 *
 * Requirements:
 * - Two API requests from App.tsx
 * - Interview token goes into the Authorization header
 * - Each request lives in its own useEffect (both fire on mount)
 * - Track loading / error / success per request
 * - Render both results on screen
 *
 * Pace matters: keep it flat, no abstractions — finish in ~10–12 min.
 */

import { useEffect, useState } from 'react';

const TOKEN = 'token-from-interviewer';

const headers = {
    Authorization: `Bearer ${TOKEN}`,
};

const initialRequestState = {
    status: 'loading', // 'loading' | 'error' | 'success'
    data: null,
};

async function fetchJson(url) {
    const response = await fetch(url, { headers });

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    return response.json();
}

export default function App() {
    const [users, setUsers] = useState(initialRequestState);
    const [accounts, setAccounts] = useState(initialRequestState);

    useEffect(() => {
        let cancelled = false;

        fetchJson('/api/users')
            .then((data) => {
                if (!cancelled) {
                    setUsers({ status: 'success', data });
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setUsers({ status: 'error', data: null });
                }
            });

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        let cancelled = false;

        fetchJson('/api/accounts')
            .then((data) => {
                if (!cancelled) {
                    setAccounts({ status: 'success', data });
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setAccounts({ status: 'error', data: null });
                }
            });

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <main>
            <section>
                <h2>Users</h2>
                {users.status === 'loading' && <p>Loading users…</p>}
                {users.status === 'error' && <p>Failed to load users</p>}
                {users.status === 'success' && (
                    <pre>{JSON.stringify(users.data, null, 2)}</pre>
                )}
            </section>

            <section>
                <h2>Accounts</h2>
                {accounts.status === 'loading' && <p>Loading accounts…</p>}
                {accounts.status === 'error' && <p>Failed to load accounts</p>}
                {accounts.status === 'success' && (
                    <pre>{JSON.stringify(accounts.data, null, 2)}</pre>
                )}
            </section>
        </main>
    );
}

/**
 * Solution notes:
 * - Two separate effects = two parallel requests on mount (no waterfall).
 * - Shared `{ status, data }` shape keeps render logic predictable.
 * - Cleanup flag avoids setState after unmount if the interview sandbox is strict.
 * - Replace endpoint URLs with whatever the interviewer provides.
 */
