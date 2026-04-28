import type { NextConfig } from "next";
import type { RuleSetRule } from "webpack";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },

  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule: RuleSetRule | '...') =>
      rule !== '...' && (rule.test as RegExp)?.test?.('.svg')
    ) as RuleSetRule;

    if (fileLoaderRule) {
      config.module.rules.push(
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/,
        },
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [...((fileLoaderRule.resourceQuery as any)?.not || []), /url/] },
          use: ["@svgr/webpack"],
        },
      );
      fileLoaderRule.exclude = /\.svg$/i;
    }

    return config;
  },

  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
};

export default nextConfig;