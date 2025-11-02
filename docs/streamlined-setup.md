# Streamlined Multi-Location Monitoring Setup

This document explains the new streamlined configuration system for managing services and monitoring locations.

## Overview

Instead of manually editing `.uptimerc.yml` and keeping multiple files in sync, we now have a **single source of truth** configuration system that automatically generates everything you need.

## Quick Start

### Adding a New Service

1. **Edit `config/services.yml`:**
   ```yaml
   services:
     - name: My New Service
       url: https://mynewservice.com/api/status
       statusUrl: https://status.mynewservice.com
       method: GET
   ```

2. **Run the generator:**
   ```bash
   npm run generate-config
   ```

3. **Commit and push:**
   ```bash
   git add .
   git commit -m "Add My New Service to monitoring"
   git push
   ```

That's it! The service will now be monitored from all 5 global locations.

### Adding a New Location

1. **Edit `config/locations.yml`:**
   ```yaml
   locations:
     - name: Tokyo
       code: tk
       globalping: tokyo
       coordinates: [139.6917, 35.6895]
       region: Asia-Pacific
   ```

2. **Run the generator:**
   ```bash
   npm run generate-config
   ```

3. **Commit and push**

All services will automatically be monitored from the new location.

## Configuration Files

### `config/services.yml`

Defines all services to monitor:

```yaml
services:
  - name: Service Name          # Display name
    url: https://api.url        # URL to monitor
    statusUrl: https://status   # Link to status page
    method: GET                 # HTTP method (optional)
    expectedStatusCodes: [200]  # Expected response codes (optional)
    maxResponseTime: 5000       # Max response time in ms (optional)
```

**Supported Options:**
- `name` (required): Service display name
- `url` (required): URL to monitor
- `statusUrl` (required): Link to service status page
- `method` (optional): HTTP method (GET, POST, etc.)
- `expectedStatusCodes` (optional): Array of acceptable status codes
- `maxResponseTime` (optional): Maximum acceptable response time in milliseconds

### `config/locations.yml`

Defines monitoring locations:

```yaml
locations:
  - name: Location Name      # Display name
    code: la                 # Short code (2-3 chars)
    globalping: los angeles  # Globalping location string
    coordinates: [-118, 34]  # [longitude, latitude]
    region: North America    # Geographic region
```

**Globalping Location Strings:**
- City names: `london`, `new york`, `singapore`
- Regions: `europe`, `asia`, `north america`
- Combined: `amazon+germany`, `google+california`
- ASNs/ISPs: Specific network providers
- Custom probes: Your own deployed probes

[Full Globalping location docs](https://github.com/jsdelivr/globalping#test-with-magic-)

## Generated Files

The `npm run generate-config` script creates:

### 1. `.uptimerc.yml`

Upptime configuration with all service×location combinations.

**Example output:**
```yaml
sites:
  - name: Zapier (Los Angeles)
    url: https://status.zapier.com
    type: globalping
    location: los angeles
    slug: zapier-la
  # ... 29 more entries
```

### 2. `src/lib/api.ts`

TypeScript API file with:
- `SERVICES` array - All configured services
- `LOCATIONS` array - All monitoring locations
- `getServiceStatus()` - Fetch status for service/location
- `getAllServicesStatus()` - Fetch all statuses
- `getServiceStatusByLocation()` - Fetch one service from all locations

## Workflow

### Development Workflow

1. **Make changes** to `config/services.yml` or `config/locations.yml`
2. **Generate config:** `npm run generate-config`
3. **Test locally:** `npm run dev`
4. **Commit and push**

### Automatic Generation

The configuration is **automatically generated** before each build:
- `npm run build` runs `npm run generate-config` first (prebuild hook)
- GitHub Actions deployment triggers generation automatically
- No manual intervention needed in CI/CD

## Globalping Integration

### Without Token (Free Tier)
- **250 tests/hour** from shared IP
- May hit limits faster with cloud runners
- Still fully functional

### With Token (Recommended)
- **500 tests/hour** per account
- More reliable for CI/CD
- Free to sign up

### Adding Globalping Token

1. **Register at** https://dash.globalping.io
2. **Get token** from "Tokens" menu
3. **Add to GitHub secrets:**
   - Go to repo Settings → Secrets → Actions
   - Click "New repository secret"
   - Name: `GLOBALPING_TOKEN`
   - Value: Your token
4. **Done!** Upptime automatically uses it

**No code changes needed** - Upptime checks for `GLOBALPING_TOKEN` environment variable automatically.

## Monitoring Formula

```
Total Endpoints = Services × Locations
Checks per Hour = (Endpoints × 12)  # Every 5 minutes
```

**Current Setup:**
- 6 services × 5 locations = **30 endpoints**
- 30 × 12 = **360 checks/hour**
- **Requires Globalping token** (exceeds 250 free limit)

## File Structure

```
status/
├── config/
│   ├── services.yml       # Service definitions (EDIT THIS)
│   └── locations.yml      # Location definitions (EDIT THIS)
├── scripts/
│   └── generate-config.js # Generator script (don't edit)
├── .uptimerc.yml         # Generated Upptime config
└── src/lib/api.ts        # Generated API file
```

## Troubleshooting

### "Service not found" errors

**Cause:** Service removed from config but data still exists  
**Fix:** Run `npm run generate-config` and rebuild

### "Unable to fetch data" for new services

**Cause:** Upptime hasn't created data files yet  
**Fix:** Wait 5-10 minutes for first monitoring cycle

### Build fails with "Cannot find module 'js-yaml'"

**Cause:** Dependencies not installed  
**Fix:** Run `npm install`

### All locations show same response time

**Cause:** Globalping not enabled  
**Fix:** Ensure `type: globalping` is in generated `.upptimerc.yml`

## Migration from Manual Config

If you have existing services in `src/lib/api.ts`:

1. **Extract services** to `config/services.yml`
2. **Run generator:** `npm run generate-config`
3. **Review diff** to ensure nothing lost
4. **Test build:** `npm run build`
5. **Commit when satisfied**

The old `src/lib/api.ts` will be completely replaced.

## Best Practices

### Service Names
- Use consistent, recognizable names
- Avoid special characters
- Keep under 30 characters

### Location Codes
- Use 2-3 character codes
- Make them intuitive (la = Los Angeles)
- Avoid conflicts

### URL Selection
- Monitor API endpoints for accurate status
- Use `/health` or `/status` when available
- Avoid rate-limited endpoints

### Response Times
- Set realistic `maxResponseTime` values
- Consider geographic distance
- Account for API processing time

## Advanced Usage

### Per-Service Location Override

Want to monitor a service from fewer locations? Edit the generator script or:

```yaml
# In config/services.yml, add a comment
services:
  - name: Regional Service  # Only monitor from NA
    url: https://regional.com
    statusUrl: https://regional.com
```

Then manually filter in the generator script.

### Custom Globalping Strings

```yaml
locations:
  - name: AWS US-East
    code: aws-use1
    globalping: amazon+virginia
    coordinates: [-77.04, 38.90]
    region: North America
```

### Environment-Specific Services

Create `config/services.dev.yml` and `config/services.prod.yml`, then modify the generator to read based on `NODE_ENV`.

## Support

- **Globalping Docs:** https://github.com/jsdelivr/globalping
- **Upptime Docs:** https://upptime.js.org/docs
- **Issues:** Open a GitHub issue with `[config]` prefix

## Changelog

### v1.0.0 (Current)
- Initial streamlined configuration system
- Multi-location monitoring with Globalping
- Automatic config generation
- 6 services × 5 locations = 30 endpoints
