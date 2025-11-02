# Setup Guide

## Setting Up Your Own Status Monitoring Dashboard

This guide walks you through creating your own serverless status monitoring dashboard using GitHub Pages. The entire setup is free and requires no servers or hosting costs.

## Prerequisites

Before you begin, ensure you have:
- A GitHub account
- Basic knowledge of Git and GitHub
- Familiarity with YAML configuration files
- Node.js installed locally (for development)

## Quick Setup (5 minutes)

### Step 1: Fork the Repository

1. Go to [https://github.com/hratchyan/status](https://github.com/hratchyan/status)
2. Click the **"Fork"** button in the top-right corner
3. Select your GitHub account as the destination
4. Wait for the fork to complete

### Step 2: Enable GitHub Pages

1. In your forked repository, go to **Settings** tab
2. Scroll down to **Pages** section in the left sidebar
3. Under **Source**, select **"Deploy from a branch"**
4. Under **Branch**, select **"main"** and **"/ (root)"**
5. Click **Save**

### Step 3: Configure Your Services

Edit `.uptimerc.yml` to add your services:

```yaml
sites:
- name: My Website
  url: https://www.mywebsite.com
  method: GET
  expectedStatusCodes: [200]

- name: My API
  url: https://api.mywebsite.com/health
  method: GET
  expectedStatusCodes: [200]
```

### Step 4: Update Dashboard Code

Edit `src/lib/api.ts` to match your services:

```typescript
const SERVICES = [
  { id: 'My Website', name: 'My Website', url: 'https://www.mywebsite.com', statusUrl: 'https://www.mywebsite.com' },
  { id: 'My API', name: 'My API', url: 'https://api.mywebsite.com/health', statusUrl: 'https://api.mywebsite.com/docs' },
];

const SERVICE_DIR_MAP: Record<string, string> = {
  'My Website': 'my-website',
  'My API': 'my-api',
};
```

### Step 5: Deploy

1. The system will automatically deploy when you push changes
2. Your dashboard will be available at: `https://YOUR_USERNAME.github.io/status`

## Detailed Setup Instructions

### Local Development Setup

If you want to customize the dashboard further, set up a local development environment:

#### Install Dependencies

```bash
# Clone your forked repository
git clone https://github.com/YOUR_USERNAME/status.git
cd status

# Install dependencies
npm install
```

#### Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your dashboard.

#### Make Changes

- Edit `src/app/page.tsx` to customize the dashboard layout
- Modify `src/components/ServiceCard.tsx` to change how services are displayed
- Update `src/lib/api.ts` to add or remove services
- Edit styles in the component files or add custom CSS

#### Build for Production

```bash
npm run build
```

This creates optimized static files in the `out/` directory.

### GitHub Configuration

#### Repository Settings

1. **Enable GitHub Pages:**
   - Go to repository **Settings** → **Pages**
   - Source: **Deploy from a branch**
   - Branch: **main** with **/(root)** folder

2. **Enable GitHub Actions** (if not already enabled):
   - Go to repository **Settings** → **Actions** → **General**
   - Ensure **"Allow all actions and reusable workflows"** is selected

#### Custom Domain (Optional)

To use a custom domain instead of `github.io`:

1. Go to repository **Settings** → **Pages**
2. Under **Custom domain**, enter your domain (e.g., `status.mycompany.com`)
3. Configure DNS records with your domain provider:
   - **Type:** CNAME
   - **Name:** status (or your subdomain)
   - **Value:** `YOUR_USERNAME.github.io`

### Service Configuration

#### Basic Service Addition

1. **Edit `.uptimerc.yml`:**
   ```yaml
   sites:
   - name: "New Service"
     url: "https://api.service.com/health"
     method: GET
     expectedStatusCodes: [200]
   ```

2. **Update `src/lib/api.ts`:**
   ```typescript
   const SERVICES = [
     // ... existing services
     {
       id: 'New Service',
       name: 'New Service',
       url: 'https://api.service.com/health',
       statusUrl: 'https://status.service.com/'
     },
   ];

   const SERVICE_DIR_MAP = {
     // ... existing mappings
     'New Service': 'new-service',
   };
   ```

3. **Commit and push** your changes

#### Advanced Service Configuration

For services requiring authentication or custom headers:

```yaml
sites:
- name: "Secure API"
  url: "https://api.myapp.com/health"
  method: GET
  headers:
    Authorization: "Bearer ${{ secrets.API_TOKEN }}"
    X-API-Key: "${{ secrets.API_KEY }}"
  expectedStatusCodes: [200, 201]
  maxResponseTime: 5000
```

### Environment Variables and Secrets

#### GitHub Secrets Setup

For services requiring API keys or tokens:

1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Add your secrets (e.g., `API_TOKEN`, `API_KEY`)

#### Using Secrets in Configuration

```yaml
sites:
- name: "Authenticated Service"
  url: "https://api.service.com/status"
  headers:
    Authorization: "Bearer ${{ secrets.API_TOKEN }}"
```

### Testing Your Setup

#### Manual Workflow Trigger

To test monitoring immediately:

1. Go to repository **Actions** tab
2. Select the **"Uptime Checks"** workflow
3. Click **"Run workflow"**
4. Select **main** branch and click **"Run workflow"**

#### Verify Dashboard

1. Visit your dashboard URL
2. Check that services appear with status indicators
3. Verify response times are updating
4. Test the refresh functionality

## Troubleshooting Common Issues

### Dashboard Shows "No Services Found"

**Cause:** Services not configured or JSON files missing

**Solutions:**
1. Check that services are added to both `.uptimerc.yml` and `src/lib/api.ts`
2. Run the monitoring workflow manually
3. Verify JSON files are created in `public/api/`
4. Check browser console for fetch errors

### Services Show as Down

**Cause:** Monitoring endpoint issues

**Solutions:**
1. Check GitHub Actions logs for error details
2. Test URLs manually with curl: `curl -I https://api.service.com/health`
3. Verify authentication headers if required
4. Check if service blocks automated requests

### Build Failures

**Cause:** Node.js version or dependency issues

**Solutions:**
1. Ensure Node.js 20+ is used in GitHub Actions
2. Clear node_modules: `rm -rf node_modules && npm install`
3. Check for TypeScript errors: `npm run build`

### Custom Domain Not Working

**Cause:** DNS configuration issues

**Solutions:**
1. Wait 24-48 hours for DNS propagation
2. Verify CNAME record points to `YOUR_USERNAME.github.io`
3. Check repository Pages settings has the custom domain
4. Ensure domain doesn't have conflicting records

## Advanced Customization

### Dashboard Styling

Modify `src/app/page.tsx` and component files to customize appearance:

```tsx
// Change colors, layout, or add new features
<div className="custom-dashboard-styles">
  {/* Your custom dashboard content */}
</div>
```

### Adding New Metrics

Extend the monitoring to track additional metrics:

```typescript
interface ServiceStatus {
  // ... existing fields
  sslExpiry?: string;
  lastIncident?: string;
  region?: string;
}
```

### Custom Monitoring Scripts

For complex monitoring logic, create custom GitHub Actions steps:

```yaml
- name: Custom Health Check
  run: |
    # Your custom monitoring script
    curl -f https://api.service.com/health || exit 1
```

## Performance Optimization

### Monitoring Frequency

Adjust check frequency based on your needs:

```yaml
# Check every 5 minutes (default)
on:
  schedule:
    - cron: "*/5 * * * *"

# Check every hour
on:
  schedule:
    - cron: "0 * * * *"
```

### Response Time Thresholds

Configure appropriate timeouts:

```yaml
sites:
- name: "Fast API"
  url: "https://api.service.com/health"
  maxResponseTime: 1000  # 1 second

- name: "Global Service"
  url: "https://global.service.com/status"
  maxResponseTime: 5000  # 5 seconds
```

## Security Considerations

### Public Repository

- Monitoring data is publicly visible
- Avoid storing sensitive information in configuration
- Use GitHub Secrets for API keys and tokens

### Rate Limiting

- Respect service rate limits
- Space out monitoring requests appropriately
- Monitor for 429 (Too Many Requests) responses

### Access Control

- Configure repository permissions appropriately
- Use branch protection for main branch
- Enable required reviews for configuration changes

## Getting Help

### Documentation Resources

- [Upptime Documentation](https://upptime.js.org)
- [Next.js Documentation](https://nextjs.org/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

### Community Support

- [Upptime GitHub Issues](https://github.com/upptime/upptime/issues)
- [GitHub Community Forum](https://github.community)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/upptime)

### Debug Tools

- **GitHub Actions Logs:** Detailed workflow execution
- **Browser DevTools:** Network and console debugging
- **curl/Postman:** Manual API testing
- **Git History:** Audit trail of changes

## Next Steps

Once your dashboard is running:

1. **Add more services** to monitor critical infrastructure
2. **Customize the design** to match your brand
3. **Set up notifications** for when services go down
4. **Monitor performance trends** over time
5. **Share the dashboard** with your team and stakeholders

Your serverless status monitoring system is now ready to provide 24/7 visibility into your service health!
