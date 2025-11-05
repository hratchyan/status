# Service Status Monitor

A beautiful, real-time status dashboard that monitors your critical services and infrastructure - completely serverless and hosted on GitHub Pages.

![Service Status Dashboard](https://img.shields.io/badge/status-operational-brightgreen)
![GitHub Pages](https://img.shields.io/badge/hosted-GitHub%20Pages-blue)
![Serverless](https://img.shields.io/badge/architecture-serverless-orange)

## 🌟 What This Does

**In Simple Terms:** This is like a "digital heartbeat monitor" for your online services. It automatically checks if your websites, APIs, and tools are working properly and shows you a beautiful dashboard with real-time status updates.

**For Example:** If your Zapier automations stop working, this dashboard will show you immediately with a red indicator, along with how long it's been down and what the response time is.

## 🚀 Live Demo

Visit the live status dashboard: **[statuscheck.hratchyan.com](https://statuscheck.hratchyan.com)**

## ✨ Features

- **🎨 Beautiful UI** - Clean, modern design with status-based colors
- **⚡ Real-time Updates** - Refreshes every 30 seconds
- **📱 Responsive** - Works perfectly on desktop, tablet, and mobile
- **🔄 Auto-monitoring** - Checks services every 5 minutes automatically
- **📊 Detailed Metrics** - Uptime percentages and response times
- **🔗 Status Links** - Direct links to service status pages
- **🚀 Serverless** - No hosting costs, runs entirely on GitHub
- **📈 Historical Data** - Git-based history of all status changes

## 🏗️ How It Works (Technical)

This system uses **GitHub Actions** as a serverless monitoring platform:

1. **Automated Checks** - GitHub Actions runs every 5 minutes to ping your services
2. **Data Storage** - Results are stored as JSON files in the Git repository
3. **Static Site** - Next.js generates a beautiful dashboard from the data
4. **Free Hosting** - Everything runs on GitHub Pages at no cost

### Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS
- **Monitoring:** Upptime (GitHub Actions + custom checks)
- **Hosting:** GitHub Pages (CDN, SSL, free)
- **Data:** JSON files committed to Git (version controlled)

## 📁 Project Structure

```
├── .github/workflows/     # GitHub Actions for monitoring
├── public/api/           # Service status data (JSON)
├── src/
│   ├── app/             # Next.js app router
│   ├── components/      # React components
│   └── lib/             # Utilities and API functions
├── .uptimerc.yml        # Upptime configuration
└── docs/                # Documentation
```

## 🚀 Quick Start

### For Users (View Status)

Just visit: **[statuscheck.hratchyan.com](https://statuscheck.hratchyan.com)**

The dashboard updates automatically and shows real-time status of all monitored services.

### For Developers (Setup Your Own)

1. **Fork this repository**
2. **Configure your services** in `.uptimerc.yml`
3. **Set up GitHub Pages** in repository settings
4. **Customize the dashboard** in `src/app/page.tsx`

See the [Setup Guide](docs/setup.md) for detailed instructions.

## 📊 Monitored Services

Currently monitoring:

- **Zapier** - Automation platform
- **Salesforce** - CRM platform
- **Google Cloud** - Cloud infrastructure
- **Microsoft Azure** - Cloud platform
- **CallRail** - Call tracking
- **WordPress Site** - Content management

## 📚 Documentation

- **[Simple Overview](docs/simple-overview.md)** - How it works in plain English
- **[Technology](docs/technology.md)** - Technical architecture details
- **[Configuration](docs/configuration.md)** - Adding new services to monitor
- **[Setup](docs/setup.md)** - Setting up your own instance
- **[Domain](docs/domain.md)** - Custom domain configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **[Upptime](https://upptime.js.org)** - The monitoring framework that makes this possible
- **[Next.js](https://nextjs.org)** - React framework for the dashboard
- **[GitHub Actions](https://github.com/features/actions)** - Serverless monitoring platform
- **[GitHub Pages](https://pages.github.com)** - Free hosting and CDN

---

**Built with ❤️ using serverless technologies**

# Status Dashboard - Sat Nov 1 22:54:50 PDT 2025
