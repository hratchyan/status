# Configuration Guide

## Adding New Services to Monitor

This guide explains how to add new services to your status monitoring dashboard. The process involves updating the configuration file and ensuring the service can be monitored.

## Prerequisites

Before adding a new service, ensure:
- The service has a publicly accessible URL or API endpoint
- You have permission to monitor the service
- The service responds to HTTP/HTTPS requests
- You're not violating any terms of service

## Configuration File

All monitoring configuration is stored in `.uptimerc.yml` in the root of your repository.

### Current Configuration Structure

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

# WordPress Sites
- name: Main WordPress Site (hratchyan.com)
  url: https://hratchyan.com/wp-admin/admin-ajax.php?action=heartbeat
  method: POST
  expectedStatusCodes: [200]
  maxResponseTime: 10000

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

  # Custom branding
  logo: https://hratchyan.com/wp-content/uploads/2024/01/hratchyan-logo.png
  favicon: https://hratchyan.com/favicon.ico

  # Custom colors
  colors:
    primary: "#1a365d"  # Dark blue
    secondary: "#2d3748" # Gray
    success: "#38a169"  # Green
    warning: "#d69e2e"  # Yellow
    danger: "#e53e3e"   # Red
    info: "#3182ce"     # Blue

  # Custom template
  htmlTemplate: index.html
```

## Adding a New Service

### Step 1: Choose a Service to Monitor

Select a service that:
- Is critical to your operations
- Has a stable, publicly accessible endpoint
- Returns consistent responses
- Won't cause issues if monitored regularly

### Step 2: Determine the Monitoring Endpoint

For each service type, use the appropriate endpoint:

#### Websites (Simple HTTP Check)
```yaml
- name: My Company Website
  url: https://www.mycompany.com
  method: GET
  expectedStatusCodes: [200]
```

#### API Endpoints
```yaml
- name: Payment API
  url: https://api.payments.com/health
  method: GET
  expectedStatusCodes: [200]
```

#### Status Page APIs (Preferred)
```yaml
- name: Cloud Service
  url: https://status.cloudservice.com/api/v2/status.json
  method: GET
  expectedStatusCodes: [200]
```

#### Custom Health Checks
```yaml
- name: Database Service
  url: https://api.myservice.com/healthcheck
  method: GET
  expectedStatusCodes: [200, 201]
  headers:
    Authorization: "Bearer YOUR_API_TOKEN"
```

### Step 3: Configure Monitoring Parameters

#### Basic Configuration
```yaml
- name: "Service Name"
  url: "https://api.service.com/status"
  method: GET
  expectedStatusCodes: [200]
```

#### Advanced Configuration
```yaml
- name: "Advanced Service Monitor"
  url: "https://api.service.com/health"
  method: POST
  body: '{"check": "deep"}'
  headers:
    Content-Type: "application/json"
    Authorization: "Bearer YOUR_TOKEN"
  expectedStatusCodes: [200, 201, 202]
  maxResponseTime: 5000
  __dangerous: true  # Skip SSL verification if needed
```

### Step 4: Update the Dashboard Code

After adding the service to `.uptimerc.yml`, you need to update the dashboard code to display it.

#### Update `src/lib/api.ts`

Add the new service to the SERVICES array:

```typescript
const SERVICES = [
  // ... existing services
  {
    id: 'New Service',
    name: 'New Service Display Name',
    url: 'https://api.service.com/status',
    statusUrl: 'https://status.service.com/'
  },
];
```

#### Update Directory Mapping

Add the service to the SERVICE_DIR_MAP:

```typescript
const SERVICE_DIR_MAP: Record<string, string> = {
  // ... existing mappings
  'New Service': 'new-service',
};
```

### Step 5: Test the Configuration

#### Local Testing
1. Run the monitoring workflow manually in GitHub Actions
2. Check that JSON files are created in `public/api/new-service/`
3. Verify the dashboard displays the new service

#### Validate Monitoring
- Check GitHub Actions logs for any errors
- Verify response times are reasonable
- Ensure uptime calculations are working
- Test different failure scenarios

## Service Types and Examples

### 1. SaaS Applications

```yaml
- name: Slack
  url: https://status.slack.com/api/v2/status.json
  method: GET

- name: GitHub
  url: https://www.githubstatus.com/api/v2/status.json
  method: GET
```

### 2. Cloud Services

```yaml
- name: AWS Health
  url: https://health.aws.amazon.com/health/status
  method: GET

- name: Google Cloud
  url: https://status.cloud.google.com/summary.json
  method: GET
```

### 3. APIs and Microservices

```yaml
- name: User Authentication API
  url: https://api.myapp.com/auth/health
  method: GET
  headers:
    X-API-Key: "${{ secrets.API_KEY }}"

- name: Payment Processing
  url: https://api.payments.com/status
  method: GET
  expectedStatusCodes: [200, 204]
```

### 4. Websites and Landing Pages

```yaml
- name: Company Homepage
  url: https://www.mycompany.com
  method: GET

- name: Marketing Site
  url: https://marketing.mycompany.com
  method: GET
  maxResponseTime: 3000
```

### 5. Internal Services

```yaml
- name: Internal Dashboard
  url: https://internal.mycompany.com/health
  method: GET
  headers:
    Authorization: "${{ secrets.INTERNAL_AUTH }}"

- name: Database Health Check
  url: https://db.mycompany.com/status
  method: GET
```

## Configuration Parameters

### Core Parameters

| Parameter | Description | Required | Default |
|-----------|-------------|----------|---------|
| `name` | Display name for the service | Yes | - |
| `url` | Endpoint URL to monitor | Yes | - |
| `method` | HTTP method (GET, POST, PUT, etc.) | No | GET |
| `expectedStatusCodes` | Array of acceptable HTTP status codes | No | [200] |
| `maxResponseTime` | Maximum allowed response time (ms) | No | 10000 |

### Advanced Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `headers` | Custom HTTP headers | `Authorization: "Bearer token"` |
| `body` | Request body for POST/PUT | `{"check": "deep"}` |
| `__dangerous` | Skip SSL certificate verification | `true` |
| `followRedirects` | Follow HTTP redirects | `true` |

## Monitoring Best Practices

### Endpoint Selection
- **Choose stable endpoints** that don't change frequently
- **Prefer official status APIs** over main application endpoints
- **Use health check endpoints** designed for monitoring
- **Avoid rate-limited endpoints** that could cause issues

### Response Time Expectations
- **Websites:** <3000ms
- **APIs:** <1000ms
- **Internal services:** <500ms
- **Global services:** <5000ms

### Status Code Handling
- **Success codes:** 200, 201, 202, 204
- **Redirect codes:** Usually not acceptable for APIs
- **Client errors:** 400-499 (may indicate API issues)
- **Server errors:** 500-599 (definitely indicate problems)

## Troubleshooting

### Common Issues

#### Service Shows as Down
- Check GitHub Actions logs for error details
- Verify the URL is accessible
- Check if authentication is required
- Ensure the service isn't blocking the monitoring requests

#### Incorrect Response Times
- Some services return cached responses
- Network latency can affect measurements
- Consider using `maxResponseTime` to adjust thresholds

#### JSON Parsing Errors
- Verify the API returns valid JSON
- Check for authentication requirements
- Ensure proper Content-Type headers

#### Rate Limiting
- Some services block frequent requests
- Consider increasing check intervals
- Use different endpoints if available

### Debug Steps

1. **Check GitHub Actions logs** for detailed error messages
2. **Test URLs manually** with curl or Postman
3. **Verify authentication** if required
4. **Check network connectivity** from GitHub's servers
5. **Review rate limits** and terms of service

### Getting Help

- Check the [Upptime documentation](https://upptime.js.org)
- Review GitHub Actions workflow logs
- Test endpoints manually before adding to monitoring
- Start with simple GET requests before complex configurations

## Advanced Configuration

### Custom Monitoring Scripts

For complex monitoring requirements, you can create custom scripts:

```yaml
- name: "Complex Service Check"
  url: "https://api.service.com/custom-check"
  method: POST
  body: |
    {
      "checks": ["database", "cache", "api"],
      "timeout": 5000
    }
  headers:
    Content-Type: "application/json"
    X-API-Key: "${{ secrets.CUSTOM_API_KEY }}"
```

### Environment Variables

Use GitHub Secrets for sensitive configuration:

```yaml
- name: "Secure API Monitor"
  url: "https://api.secure.com/status"
  headers:
    Authorization: "Bearer ${{ secrets.SECURE_API_TOKEN }}"
```

### Conditional Monitoring

You can create conditional checks based on environment:

```yaml
- name: "Production API"
  url: "${{ secrets.PROD_API_URL }}"
  method: GET
  expectedStatusCodes: [200]
```

Remember to update both the `.uptimerc.yml` configuration AND the dashboard code (`src/lib/api.ts`) when adding new services!
