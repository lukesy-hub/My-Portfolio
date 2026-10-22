import type { NextConfig } from "next";

// Every page is static (no request-time data), so the default static
// generation is used — Cache Components / partial prerendering add nothing here.
const nextConfig: NextConfig = {};

export default nextConfig;
