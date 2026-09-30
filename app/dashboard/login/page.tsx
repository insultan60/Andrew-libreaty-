import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard sign in | Andrew Liberty Team",
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: Promise<{ error?: string; next?: string }>;
}

export default async function DashboardLogin({ searchParams }: Props) {
  const { error, next } = await searchParams;

  return (
    <main className="dash-login">
      <div className="dash-login-inner">
        <p className="dash-login-eyebrow">Andrew Liberty Team</p>
        <h1 className="dash-login-title">Performance dashboard</h1>
        <p className="dash-login-lead">
          This page is private. Enter the dashboard password to continue.
        </p>

        <form action="/api/dashboard/login" method="POST" className="dash-login-form">
          {/* Where to land after signing in. The value is re-sanitised on the
              server — anything arriving here could have been typed into the
              address bar. */}
          <input type="hidden" name="next" value={next ?? "/dashboard"} />
          <label htmlFor="password" className="visually-hidden">
            Dashboard password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            autoFocus
            required
            className="dash-login-input"
            placeholder="Password"
          />

          {error ? (
            <p role="alert" className="dash-login-error">
              That password was not correct.
            </p>
          ) : null}

          <button type="submit" className="dash-login-btn">
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
