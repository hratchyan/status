# Technology Stack & Architecture

## Overview

This status monitoring system is built entirely on serverless technologies, using GitHub as the infrastructure platform. No traditional servers, databases, or hosting providers are required - everything runs on GitHub's free services.

## Core Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   GitHub Actions │ -> │  JSON Data Files │ -> │   Next.js Site   │
│   (Monitoring)   │    │  (Git Storage)  │    │ (Dashboard UI)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  GitHub Pages   │
                    │   (Free CDN)    │
                    └─────────────────┘
```

## Technology Components

### 1. Monitoring Engine (Upptime + GitHub Actions)

**What it does:** Automatically checks service health every 5 minutes

**Technologies:**
- **Upptime Framework:** Open-source uptime monitoring tool
- **GitHub Actions:** Serverless CI/CD platform for running checks
- **HTTP/HTTPS Checks:** Standard web requests to monitor endpoints
- **Custom Scripts:** Bash/Python scripts for complex monitoring logic

**How it works:**
```yaml
# .github/workflows/uptime.yml
name: Uptime Checks
on:
  schedule:
    - cron: "*/5 * * * *"  # Every 5 minutes
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - name: Check service health
        run: curl -f https://api.example.com/health
```

### 2. Data Storage (Git + JSON Files)

**What it does:** Stores monitoring results in version-controlled JSON files

**Technologies:**
- **Git:** Distributed version control system
- **JSON:** Structured data format for metrics
- **GitHub Repository:** Free storage with unlimited history

**Data Structure:**
```
public/api/
├── zapier/
│   ├── uptime.json          # {"message": "99.9%", "color": "brightgreen"}
│   └── response-time.json   # {"message": "187ms", "color": "blue"}
├── salesforce/
│   ├── uptime.json
│   └── response-time.json
└── ...
```

**Benefits:**
- **Version Control:** Full history of all status changes
- **Audit Trail:** Git commits show exactly when services went up/down
- **Free Storage:** Unlimited history at no cost
- **Reliability:** Data survives system failures

### 3. Dashboard UI (Next.js + React)

**What it does:** Beautiful, responsive web interface displaying service status

**Technologies:**
- **Next.js 16:** React framework with static site generation
- **React 19:** Component-based UI library
- **TypeScript:** Type-safe JavaScript
- **Tailwind CSS:** Utility-first CSS framework

**Key Features:**
- **Static Generation:** `next build` creates optimized HTML/CSS/JS
- **Client-side Fetching:** React components load JSON data dynamically
- **Responsive Design:** Mobile-first approach with Tailwind
- **Real-time Updates:** Auto-refresh every 30 seconds

### 4. Hosting & Delivery (GitHub Pages)

**What it does:** Serves the static website with global CDN

**Technologies:**
- **GitHub Pages:** Free static site hosting
- **Fastly CDN:** Global content delivery network
- **SSL Certificates:** Automatic HTTPS encryption
- **Custom Domains:** Support for custom domain names

**Performance:**
- **Global CDN:** Content served from edge locations worldwide
- **HTTP/2:** Modern protocol for faster loading
- **Compression:** Automatic gzip/brotli compression
- **Caching:** Intelligent caching headers

## Data Flow

### Monitoring Phase (Every 5 minutes)
1. **GitHub Actions** triggers on schedule
2. **Upptime** runs monitoring checks
3. **Results saved** as JSON files
4. **Git commit** updates repository

### Display Phase (Every 30 seconds)
1. **User visits** dashboard URL
2. **GitHub Pages** serves static HTML/JS
3. **React app loads** and fetches JSON data
4. **Dashboard updates** with current status

## Serverless Advantages

### Cost Benefits
- **$0 Hosting:** GitHub Pages is completely free
- **$0 Monitoring:** GitHub Actions has generous free tier
- **$0 Storage:** Unlimited Git storage included
- **$0 CDN:** Global delivery at no cost

### Scalability Benefits
- **Infinite Scale:** GitHub's infrastructure handles any load
- **Global Distribution:** CDN serves content worldwide
- **Zero Maintenance:** No servers to maintain or update
- **Auto-scaling:** Handles traffic spikes automatically

### Reliability Benefits
- **GitHub SLA:** 99.9%+ uptime guarantee
- **Redundant Systems:** Multiple data centers worldwide
- **Version Control:** All data is backed up and versioned
- **Disaster Recovery:** Git-based recovery from any state

## Security Considerations

### Data Security
- **HTTPS Only:** All connections encrypted
- **GitHub Security:** Enterprise-grade security
- **Public Repository:** Monitoring data is publicly visible
- **No Secrets:** No sensitive data stored

### Access Control
- **GitHub Teams:** Control who can modify monitoring
- **Branch Protection:** Prevent unauthorized changes
- **Audit Logs:** Full history of all changes

## Performance Metrics

### Monitoring Performance
- **Check Frequency:** Every 5 minutes (288 checks/day)
- **Response Timeout:** 10 seconds maximum
- **Data Retention:** Unlimited (Git history)
- **Alert Delay:** Maximum 5 minutes to detection

### Dashboard Performance
- **Page Load:** <2 seconds (static HTML)
- **Data Fetch:** <500ms (JSON from CDN)
- **Update Frequency:** Every 30 seconds
- **Mobile Score:** 95+ on Lighthouse

## Limitations & Considerations

### Rate Limits
- **GitHub Actions:** 2,000 minutes/month free tier
- **GitHub API:** 5,000 requests/hour for monitoring
- **Custom Domains:** 100 domains per account

### Monitoring Limits
- **Check Frequency:** Minimum 5 minutes between checks
- **Timeout Limits:** 10 seconds maximum per check
- **Concurrent Checks:** Limited by GitHub Actions runners

### Scaling Considerations
- **Repository Size:** Git history grows with monitoring data
- **API Limits:** Respect rate limits of monitored services
- **Dashboard Load:** Static site handles high traffic

## Future Enhancements

### Potential Improvements
- **Real-time WebSockets:** Instant status updates
- **Advanced Analytics:** Response time trends and graphs
- **Incident Management:** Automatic issue creation
- **Multi-region Monitoring:** Global health checks
- **Custom Notifications:** Email/SMS alerts

### Technology Evolution
- **Edge Computing:** Cloudflare Workers for faster checks
- **Database Integration:** External DB for advanced analytics
- **Machine Learning:** Predictive failure detection
- **Containerization:** Docker-based monitoring jobs

## Troubleshooting

### Common Issues
- **Workflow Failures:** Check GitHub Actions logs
- **Data Not Updating:** Verify workflow permissions
- **Site Not Loading:** Check GitHub Pages configuration
- **CORS Errors:** Ensure proper headers in API responses

### Debug Tools
- **GitHub Actions Logs:** Detailed execution logs
- **Browser DevTools:** Network and console debugging
- **Git History:** Audit trail of all changes
- **Lighthouse:** Performance and accessibility testing

This architecture demonstrates how modern serverless technologies can create powerful, scalable, and cost-effective monitoring solutions without traditional infrastructure costs.
