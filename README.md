# Marketing Operations Status

A professional status monitoring page for marketing tools and services using [Upptime](https://upptime.js.org).

## 🚀 Features

- **Real-time Monitoring**: Monitors critical marketing platforms and services
- **Custom Branding**: Professional design matching Hratchyan brand
- **Webhook Notifications**: Custom webhook integration for alerts
- **Responsive Design**: Mobile-friendly interface
- **GitHub Pages Deployment**: Serverless hosting via GitHub Pages

## 📊 Monitored Services

- **Zapier** - Automation platform status
- **Salesforce** - CRM platform status
- **Google Cloud** - Cloud infrastructure status
- **Microsoft Azure** - Cloud platform status
- **CallRail** - Call tracking and analytics
- **WordPress Site** (hratchyan.com) - Main website monitoring

## 🛠️ Setup Instructions

### 1. Repository Setup

This repository is already configured for Upptime. The main configuration is in `.uptimerc.yml`.

### 2. Webhook Configuration

To receive notifications when services go down or recover:

1. Update the webhook URL in `.uptimerc.yml`:
   ```yaml
   notifications:
     - type: webhook
       url: https://your-webhook-endpoint.com/upptime-notification
       headers:
         Authorization: "Bearer YOUR_WEBHOOK_TOKEN"
   ```

2. Replace `YOUR_WEBHOOK_TOKEN` with your actual authentication token.

### 3. DNS Configuration

Point your custom domain to GitHub Pages:

1. Add a CNAME record for `statuscheck.hratchyan.com` pointing to `hratchyan.github.io`
2. The CNAME file is already configured in the repository.

### 4. Deployment

The status page automatically deploys to GitHub Pages when changes are pushed to the main branch.

## 🎨 Customization

### Branding

- **Logo**: Update the logo URL in `.uptimerc.yml`
- **Colors**: Modify the color scheme in the configuration
- **Fonts**: Custom fonts are loaded via Google Fonts

### Adding New Services

To add a new service to monitor:

1. Add it to the `sites` section in `.uptimerc.yml`:
   ```yaml
   sites:
     - name: "New Service"
       url: "https://api.newservice.com/status"
       method: GET
   ```

2. Commit and push the changes

### Custom HTML Template

The status page uses a custom HTML template (`index.html`) for enhanced branding and user experience.

## 🔧 Configuration

### Key Files

- `.uptimerc.yml` - Main configuration file
- `index.html` - Custom HTML template
- `.gitignore` - Git ignore rules
- `README.md` - This documentation

### Environment Variables

No environment variables are required as this uses GitHub Actions for monitoring.

## 📈 Monitoring Details

- **Check Frequency**: Every 5 minutes
- **Response Time Tracking**: Every 6 hours
- **Graph Generation**: Daily
- **Incident Management**: Automatic GitHub Issues

## 🔔 Notifications

Currently configured for webhook notifications. To add Slack or other notification methods, update the `notifications` section in `.uptimerc.yml`.

## 🌐 Live Status

View the live status page at: [statuscheck.hratchyan.com](https://statuscheck.hratchyan.com)

## 📄 License

This project uses Upptime, which is licensed under MIT.
