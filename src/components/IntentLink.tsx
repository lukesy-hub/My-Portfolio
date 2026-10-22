"use client";

import { useRef } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

type Props = React.ComponentProps<typeof NextLink>;

/**
 * `next/link` that prefetches on intent (pointer over, focus, touch) instead of
 * whenever it scrolls into view. Pages are static and small, so navigation stays
 * instant — without speculatively preloading every route's CSS on page load.
 */
export function Link({ href, onPointerEnter, onFocus, onTouchStart, ...rest }: Props) {
  const router = useRouter();
  const done = useRef(false);

  const prefetch = () => {
    if (done.current || typeof href !== "string" || !href.startsWith("/")) return;
    done.current = true;
    router.prefetch(href);
  };

  return (
    <NextLink
      href={href}
      prefetch={false}
      onPointerEnter={(e) => {
        prefetch();
        onPointerEnter?.(e);
      }}
      onFocus={(e) => {
        prefetch();
        onFocus?.(e);
      }}
      onTouchStart={(e) => {
        prefetch();
        onTouchStart?.(e);
      }}
      {...rest}
    />
  );
}
