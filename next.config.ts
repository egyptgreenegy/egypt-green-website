import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    domains: ['source.unsplash.com', 'res.cloudinary.com'],
  },
};

export default withNextIntl(nextConfig);
