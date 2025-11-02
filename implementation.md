# Upptime Status Page Implementation Plan

## Overview
This document outlines the comprehensive plan to configure and customize your Upptime status page for monitoring marketing operations services. The goal is to create a centralized dashboard at `statuscheck.hratchyan.com` to monitor your key marketing tools and services.

## Current Setup
- ✅ Git repository initialized and connected to GitHub
- ✅ Upptime template pulled from repository
- ✅ Basic project structure in place

## Service Monitoring Configuration

### Core Services to Monitor
1. **Zapier** - Automation platform
2. **Salesforce** - CRM platform
3. **Google Cloud/Azure** - Cloud infrastructure
4. **Google Workspace** - Productivity suite
5. **CallRail** - Call tracking
6. **WordPress Sites** - Content management
7. **Custom Landing Pages** - Marketing pages

### Configuration Strategy

#### 1. Core Configuration (`.uptimerc.yml`)
```yaml
owner: hratchyan
repo: status
user-agent: hratchyan-status-monitor

sites:
# Major Platforms with Status APIs
- name: Zapier
  url: https://status.zapier.com/api/v2/status.json
  method: GET
  expectedStatusCodes: [200]

- name: Salesforce
  url: https://api.status.salesforce.com/v1/instances/status
  method: GET

- name: Google Cloud
  url: https://status.cloud.google.com/summary.json
  method: GET

- name: Microsoft Azure
  url: https://azure.status.microsoft.com/en-us/status/feed/
  method: GET

- name: CallRail
  url: https://status.callrail.com/api/v2/status.json
  method: GET

# WordPress Sites
- name: Main WordPress Site (hratchyan.com)
  url: https://hratchyan.com/wp-admin/admin-ajax.php?action=heartbeat
  method: POST
  expectedStatusCodes: [200]
  maxResponseTime: 10000

# Landing Pages (to be added later)
# - name: Marketing Landing Page
#   url: https://your-landing-page.com
#   method: GET
```

#### 2. Status Page Branding
```yaml
status-website:
  name: "Marketing Operations Status"
  cname: statuscheck.hratchyan.com
  baseUrl: /

  introTitle: "**Marketing Operations Status**"
  introMessage: "Real-time monitoring of marketing tools and services"

  theme: light
  navbar:
    - title: Status
      href: /
    - title: History
      href: /history
```

## Implementation Phases

### Phase 1: Core Setup ✅
- [x] Initialize Git repository
- [x] Pull Upptime template
- [x] Create .gitignore
- [x] Create .uptimerc.yml configuration
- [x] Test configuration
- [x] Deploy to GitHub Pages
- [x] Switch to hratchyan GitHub authentication
- [x] Push configuration to repository
- [x] Enable GitHub Pages deployment
- [ ] Test all service endpoints
- [ ] Add landing pages (future)
- [ ] Verify status page functionality

### Phase 3: Automation Integration
- [ ] Set up webhook endpoints for Zapier/relay.app
- [ ] Test incident creation workflow
- [ ] Configure custom automation rules

## DNS Configuration for statuscheck.hratchyan.com

### Required DNS Records
```
Type: CNAME
Name: statuscheck
Value: hratchyan.github.io
```

## Monitoring Strategy

### API-Based Monitoring (Preferred)
- Use official status APIs where available
- Parse JSON responses for status information
- Set appropriate response time expectations

### HTTP Monitoring (Fallback)
- Monitor main service URLs
- Check for specific status indicators
- Use custom body checks for status validation

### Custom Monitoring
- WordPress sites: Check admin-ajax.php endpoint
- Landing pages: Standard HTTP checks
- APIs: Custom endpoint validation

## Webhook Integration for Automation

Since you use Zapier and relay.app, we can configure webhooks that post to these services:

### GitHub Actions Webhook Configuration
```
# In GitHub repository settings → Webhooks
# Add webhook URL from Zapier/relay.app
# Trigger on: Issues (for incidents)
# Content type: application/json
```

This allows you to:
- Receive notifications through Zapier/relay.app
- Create custom automation workflows
- Send alerts via email, SMS, or other channels

## Key Benefits
- **100% Serverless**: Runs entirely on GitHub infrastructure
- **No Hosting Costs**: Free GitHub Pages deployment
- **Webhook Ready**: Integrates with your existing Zapier/relay.app setup
- **Git-Native**: Full audit trail of all status changes
- **Automated**: Self-maintaining status checks

## Monitoring Frequency
- **Default**: Every 5 minutes (GitHub Actions default)
- **Acceptable Range**: 5 minutes to 1 hour
- **No custom scheduling needed** - stick with reliable 5-minute intervals

## Future Enhancements
- Custom branding and theming
- Additional service monitoring
- Advanced notification workflows
- Performance analytics
- Custom incident response procedures
