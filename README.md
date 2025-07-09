# KanmiSuite CLI

Developer-first CLI tools for Google Search Console, GA4, and Looker Studio.
Automate your site audits, analytics, and reporting — right from your terminal.

[![npm](https://img.shields.io/npm/v/kanmi-gsc-cli)](https://www.npmjs.com/package/kanmi-gsc-cli)
[![npm](https://img.shields.io/npm/v/kanmi-ga4-cli)](https://www.npmjs.com/package/kanmi-ga4-cli)
[![npm](https://img.shields.io/npm/v/kanmi-looker-cli)](https://www.npmjs.com/package/kanmi-looker-cli)

## 🚀 Quick Install

```bash
# Install all three tools
npm install -g kanmi-gsc-cli kanmi-ga4-cli kanmi-looker-cli

# Or install individually
npm install -g kanmi-gsc-cli    # Google Search Console CLI
npm install -g kanmi-ga4-cli    # Google Analytics 4 CLI
npm install -g kanmi-looker-cli # Looker Studio CLI
```

## 🛠 Available Tools

| Tool           | Package            | Binary       | Use                                                   |
| -------------- | ------------------ | ------------ | ----------------------------------------------------- |
| **GSC CLI**    | `kanmi-gsc-cli`    | `gsc-cli`    | Run SEO audits, pull Core Web Vitals, keyword reports |
| **GA4 CLI**    | `kanmi-ga4-cli`    | `ga4-cli`    | Query traffic data, events, user metrics              |
| **Looker CLI** | `kanmi-looker-cli` | `looker-cli` | Export dashboards, clone reports, backup to JSON      |

## 📦 Example Usage

```bash
# Google Search Console - Get site performance data
gsc-cli sites                           # List all your sites
gsc-cli query https://example.com       # Get search analytics
gsc-cli sitemaps https://example.com    # Check sitemap status

# Google Analytics 4 - Query your traffic data
ga4-cli report -p 123456 -m users -d country    # Users by country
ga4-cli events -p 123456 -s 2024-01-01          # Top events from date
ga4-cli compare -p 123456 -s1 2024-01-01 -e1 2024-01-31 -s2 2024-02-01 -e2 2024-02-28

# Looker Studio - Manage your dashboards
looker-cli list                         # List all accessible reports
looker-cli export -i report_id          # Export report as PDF
looker-cli clone -i report_id -n "New Report"  # Clone existing report
```

## 🔒 Authentication Setup

Each CLI uses browser-based OAuth on first run. You'll need to:

1. **Set up Google Cloud Project** with appropriate APIs enabled
2. **Create OAuth2 credentials** (Desktop application type)
3. **Configure environment** with your client credentials

### Required APIs:

- **GSC CLI**: Google Search Console API
- **GA4 CLI**: Google Analytics Reporting API + Google Analytics Data API
- **Looker CLI**: Google Drive API

### Environment Setup:

Each tool looks for a `.env` file or environment variables:

```bash
CLIENT_ID=your-google-oauth-client-id
CLIENT_SECRET=your-google-oauth-client-secret
```

📚 **Detailed setup instructions** are available in each tool's individual repository.

## 🌟 Key Features

### 🔍 GSC CLI

- **Site Management**: List and monitor all your Search Console properties
- **Search Analytics**: Query clicks, impressions, CTR, and position data
- **Sitemap Operations**: Submit, delete, and monitor sitemap status
- **OAuth Authentication**: Secure browser-based authentication flow
- **Flexible Queries**: Filter by date range, dimensions, and search type

### 📊 GA4 CLI

- **Custom Reports**: Generate reports with any metrics and dimensions
- **Period Comparison**: Compare performance across different time periods
- **Event Analytics**: Deep dive into your top events and conversions
- **Page Performance**: Analyze your top-performing pages and content
- **Multiple Output Formats**: JSON, CSV, and formatted table output

### 📈 Looker CLI

- **Report Management**: List, export, and clone Looker Studio reports
- **Multiple Export Formats**: PDF, CSV, and other supported formats
- **Report Cloning**: Duplicate reports with custom names and settings
- **Google Drive Integration**: Direct integration with Google Drive API
- **Batch Operations**: Process multiple reports efficiently

## 🌍 Roadmap

- ✅ **gsc-cli** - Google Search Console integration
- ✅ **ga4-cli** - Google Analytics 4 data retrieval
- ✅ **looker-cli** - Looker Studio report management
- 🔜 **Unified CLI wrapper** - Single `kanmi` command for all tools
- 🔜 **Automated reporting** - Schedule reports via email/Slack
- 🔜 **GitHub Actions integration** - Automated SEO and analytics monitoring
- 🔜 **Data export pipelines** - Direct export to databases and data warehouses
- 🔜 **Custom dashboards** - Build and deploy custom analytics dashboards

## 🛡️ Security & Privacy

- **OAuth2 Flow**: Industry-standard authentication
- **Local Token Storage**: Credentials stored securely on your machine
- **No Data Collection**: Your analytics data stays with you
- **Open Source**: All code is available for review and contribution

## 📖 Documentation

- [GSC CLI Documentation](https://github.com/konfirmed/kanmi-gsc-cli) - Complete guide for Google Search Console CLI
- [GA4 CLI Documentation](https://github.com/konfirmed/kanmi-ga4-cli) - Comprehensive GA4 CLI reference
- [Looker CLI Documentation](https://github.com/konfirmed/kanmi-looker-cli) - Looker Studio CLI manual

## 🤝 Contributing

We welcome contributions! Please see our individual repositories for contribution guidelines:

- [Contribute to GSC CLI](https://github.com/konfirmed/kanmi-gsc-cli/blob/main/CONTRIBUTING.md)
- [Contribute to GA4 CLI](https://github.com/konfirmed/kanmi-ga4-cli/blob/main/CONTRIBUTING.md)
- [Contribute to Looker CLI](https://github.com/konfirmed/kanmi-looker-cli/blob/main/CONTRIBUTING.md)

## 📄 License

All KanmiSuite CLI tools are released under the [MIT License](LICENSE).

## 🧑🏾‍💻 About

Built by [Kanmi Obasa](https://github.com/konfirmed)  
Learn more at [knfrmd.com](https://www.knfrmd.com)

---

### 💡 Pro Tips

1. **Use npx** for one-time runs without global installation:

   ```bash
   npx kanmi-gsc-cli sites
   npx kanmi-ga4-cli events -p 123456
   ```

2. **Set up aliases** for frequently used commands:

   ```bash
   alias gsc="gsc-cli"
   alias ga4="ga4-cli"
   alias looker="looker-cli"
   ```

3. **Pipe output** to other tools for advanced processing:
   ```bash
   gsc-cli query https://example.com --format json | jq '.rows[]'
   ga4-cli report -p 123456 -m users -d country --format csv > users_by_country.csv
   ```

---

**Ready to automate your analytics workflow?** Start with any of the tools above and streamline your data operations today! 🚀
