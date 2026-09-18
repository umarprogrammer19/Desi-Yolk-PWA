"use client";

export function NewsletterForm() {
  return (
    <form
      className="mt-3 flex overflow-hidden rounded-full bg-cream/10 pl-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="Your email address"
        className="w-full bg-transparent py-2.5 text-sm text-cream placeholder:text-cream/40 focus:outline-none"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-forest-dark transition-colors hover:bg-accent-dark"
      >
        Subscribe
      </button>
    </form>
  );
}
