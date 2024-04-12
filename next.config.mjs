import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["faberlick.pythonanywhere.com", "tecdn.b-cdn.net"],
  },
};
export default withNextIntl(nextConfig);
