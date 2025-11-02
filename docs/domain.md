# Custom Domain Configuration

## Using Your Own Domain Name

This guide explains how to configure a custom domain (like `status.yourcompany.com`) instead of the default GitHub Pages URL (`yourusername.github.io/status`).

## Prerequisites

Before setting up a custom domain:
- Own a domain name (purchase from any registrar: Namecheap, GoDaddy, etc.)
- Have access to your domain's DNS settings
- GitHub Pages enabled on your repository

## Quick Domain Setup

### Step 1: Configure Repository Settings

1. Go to your repository **Settings** → **Pages**
2. Under **Custom domain**, enter your domain:
   ```
   status.yourcompany.com
   ```
3. Click **Save** (don't check "Enforce HTTPS" yet)

### Step 2: Configure DNS Records

Add a CNAME record in your domain's DNS settings:

| Type  | Name/Host | Value/Target | TTL |
|-------|-----------|--------------|-----|
| CNAME | status    | `YOUR_USERNAME.github.io` | 3600 |

**Examples for different providers:**

#### Namecheap
```
Type: CNAME Record
Host: status
Value: YOUR_USERNAME.github.io
TTL: Automatic
```

#### GoDaddy
```
Type: CNAME
Name: status
Value: YOUR_USERNAME.github.io
TTL: 1 Hour
```

#### Cloudflare
```
Type: CNAME
Name: status
Content: YOUR_USERNAME.github.io
Proxy status: DNS only
TTL: Auto
```

### Step 3: Enable HTTPS

After DNS propagation (24-48 hours):
1. Go back to repository **Settings** → **Pages**
2. Check **"Enforce HTTPS"**
3. GitHub will automatically provision an SSL certificate

## Domain Options

### Subdomain (Recommended)

Use a subdomain like `status.yourcompany.com`:

**DNS Configuration:**
```
Type: CNAME
Name: status
Value: YOUR_USERNAME.github.io
```

**Repository Setting:**
```
Custom domain: status.yourcompany.com
```

### Root Domain

Use your root domain (`yourcompany.com`) - **not recommended** for status pages:

**DNS Configuration:**
```
Type: A
Name: @
Value: 185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153
```

**Repository Setting:**
```
Custom domain: yourcompany.com
```

**⚠️ Warning:** Using root domain prevents other GitHub Pages sites on the same account.

### Apex Domain with Redirect

Use `www.yourcompany.com` and redirect root to www:

**DNS Configuration:**
```
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
```

**Repository Setting:**
```
Custom domain: www.yourcompany.com
```

## DNS Propagation

### How Long Does It Take?

- **Typical:** 1-2 hours
- **Maximum:** 24-48 hours
- **Factors:** DNS provider, TTL settings, global propagation

### Checking Propagation

Use these tools to verify DNS changes:

#### Online DNS Checkers
- [DNS Checker](https://dnschecker.org/)
- [What's My DNS](https://whatsmydns.net/)
- [DNS Propagation Checker](https://www.whatsmydns.net/)

#### Command Line
```bash
# Check CNAME record
dig CNAME status.yourcompany.com

# Check A records (for root domain)
dig A yourcompany.com
```

### Expected Results

**For subdomain setup:**
```
status.yourcompany.com. 3600 IN CNAME YOUR_USERNAME.github.io.
```

## Troubleshooting Domain Issues

### Domain Not Resolving

**Symptoms:** Browser shows "DNS_PROBE_FINISHED_NXDOMAIN"

**Solutions:**
1. Wait longer for DNS propagation (up to 48 hours)
2. Check DNS records are correct
3. Verify domain spelling in repository settings
4. Clear local DNS cache:
   ```bash
   # Windows
   ipconfig /flushdns

   # macOS
   sudo killall -HUP mDNSResponder

   # Linux
   sudo systemd-resolve --flush-caches
   ```

### SSL Certificate Issues

**Symptoms:** Browser shows security warnings

**Solutions:**
1. Ensure "Enforce HTTPS" is checked in Pages settings
2. Wait for SSL certificate provisioning (can take 1-2 hours)
3. Check domain resolves correctly before enabling HTTPS

### Repository Settings Not Saving

**Symptoms:** Custom domain field doesn't save

**Solutions:**
1. Ensure domain format is correct (no https://, no trailing slash)
2. Check repository has Pages enabled
3. Try refreshing the page and re-entering the domain

### GitHub Pages Shows 404

**Symptoms:** Domain resolves but shows 404 page

**Solutions:**
1. Verify repository has content in the correct branch
2. Check Pages source settings (branch and folder)
3. Ensure `index.html` exists in the Pages root
4. Check build status in Actions tab

## Advanced Domain Configuration

### Multiple Status Pages

If you need multiple status pages:

**Option 1: Separate Repositories**
```
status.yourcompany.com  → Repository A
api-status.yourcompany.com → Repository B
```

**Option 2: Single Repository with Redirects**
Use client-side routing or server redirects to show different dashboards.

### Domain Aliases

Create multiple domains pointing to the same status page:

```
status.yourcompany.com  → CNAME YOUR_USERNAME.github.io
statuspage.yourcompany.com → CNAME YOUR_USERNAME.github.io
monitor.yourcompany.com → CNAME YOUR_USERNAME.github.io
```

### CDN Configuration

For better performance, consider:

#### Cloudflare
1. Add your domain to Cloudflare
2. Set DNS records as above
3. Enable CDN features (caching, minification, etc.)
4. Set SSL mode to "Full (strict)"

#### Benefits
- Faster global loading
- Additional security features
- Analytics and monitoring
- DDoS protection

## Domain Transfer Process

### Moving from Default GitHub Domain

1. **Set up custom domain** as described above
2. **Update any bookmarks/links** to use new domain
3. **Monitor for 24-48 hours** to ensure stability
4. **Update documentation** with new URL

### Changing Custom Domains

1. **Enter new domain** in repository Pages settings
2. **Update DNS records** for new domain
3. **Wait for propagation** of new DNS records
4. **Remove old DNS records** after confirmation

## Security Considerations

### SSL/TLS
- GitHub Pages automatically provides SSL certificates
- Certificates are renewed automatically
- Only HTTPS access is supported

### Domain Validation
- GitHub validates domain ownership through DNS records
- Custom domains require proper DNS configuration
- Domain must be publicly resolvable

### Access Control
- Status pages are publicly accessible
- Consider password protection for sensitive status pages
- Use GitHub's repository visibility settings appropriately

## Monitoring Domain Health

### Uptime Monitoring
Monitor your status page itself:

```yaml
sites:
- name: Status Page Domain
  url: https://status.yourcompany.com
  method: GET
  expectedStatusCodes: [200]
```

### SSL Certificate Monitoring
GitHub handles SSL automatically, but you can monitor certificate expiry:

```yaml
- name: SSL Certificate Check
  url: https://status.yourcompany.com
  method: GET
  # GitHub Pages handles SSL automatically
```

## Common Domain Providers

### Popular Registrars

| Provider | Features | Pricing |
|----------|----------|---------|
| Namecheap | Good DNS, cheap domains | $8.88/year |
| Porkbun | No frills, very cheap | $6.75/year |
| Google Domains | Simple interface | $12/year |
| GoDaddy | Feature-rich | $17.99/year |

### DNS Hosting Services

| Service | Features | Free Tier |
|---------|----------|-----------|
| Cloudflare | CDN, DNS, security | Yes (limited) |
| Route 53 (AWS) | Highly reliable | No |
| DigitalOcean | Simple DNS | No |
| Namecheap | Included with domain | Yes |

## Getting Help

### GitHub Pages Support
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Custom Domain Troubleshooting](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages)

### DNS Tools
- [DNS Lookup](https://mxtoolbox.com/DNSLookup.aspx)
- [DNS Propagation Checker](https://dnschecker.org/)
- [DNSSEC Analyzer](https://dnssec-analyzer.verisignlabs.com/)

### Community Resources
- [GitHub Community Forum](https://github.community/c/github-pages/24)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/github-pages)

## Next Steps

Once your custom domain is working:

1. **Update all documentation** with the new domain
2. **Share the new URL** with your team and stakeholders
3. **Set up monitoring** for the domain itself
4. **Configure redirects** if needed from old URLs
5. **Update any integrations** that reference the old domain

Your professional status dashboard is now available at your custom domain! 🎉
