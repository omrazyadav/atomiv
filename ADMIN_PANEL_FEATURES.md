# Atomiv AI Admin Panel - Complete Feature Documentation

## Overview
A comprehensive admin panel has been created for Atomiv AI with advanced demo page creation, analytics, and lead management capabilities.

## Access
- **URL**: http://localhost:3000/admin
- **Password**: atomiv2025

## Main Features

### 1. Enhanced Dashboard (`/admin`)
- **Real-time Statistics**
  - Total leads, demo pages, quote requests, demo requests
  - Active demo pages with view counts
  - Pending items requiring attention
- **Quick Actions**
  - Create Demo Page button
  - Navigation to all sections
  - Recent activity feed
- **Live Data Integration**
  - All data pulled from Supabase database
  - Auto-refresh every 30 seconds

### 2. Demo Page Management (`/admin/demos`)

#### Features:
- **List View**
  - All demo pages with status (active, draft, expired, archived)
  - View counts and creation dates
  - Search and filter capabilities
  - Quick actions: View, Edit, Clone, Delete

- **Create Demo Page** (`/admin/demos/new`)
  - **Template Selection**: Pre-built templates for different industries
  - **Basic Information**:
    - Client name and company name
    - Custom URL slug
    - ElevenLabs Agent ID integration
  - **Customization**:
    - Primary and secondary colors
    - Logo upload
    - Hero title and subtitle
    - Features with icons
    - Testimonials
    - Custom messages
  - **Settings**:
    - Password protection
    - Expiration date
    - Draft/Active status
  - **Live Preview**: Real-time preview of changes

### 3. Client-Facing Demo Pages (`/demo/[slug]`)
- **ElevenLabs Widget Integration**
  - AI voice agent widget positioned at top center
  - Automatic loading via script tag
- **Customized Content**
  - Company-specific branding with custom colors
  - Personalized hero section
  - Feature showcases
  - Testimonials
  - Call-to-action buttons
- **Security Features**
  - Password protection (optional)
  - Expiration date handling
  - View tracking and analytics
- **Responsive Design**
  - Mobile-optimized
  - Dark theme matching main site

### 4. Analytics Dashboard (`/admin/analytics`)
- **Key Metrics**
  - Total page views
  - Unique visitors
  - Average view duration
  - Conversion rates
- **Performance Tracking**
  - Top performing demo pages
  - Form submission rates
  - Conversion funnel analysis
- **Date Range Selection**
  - Last 24 hours, 7 days, 30 days, 90 days
- **Visual Reports**
  - Progress bars for form performance
  - Comparison charts
  - Daily activity trends

### 5. Additional Admin Pages
- **Quote Requests** (`/admin/quotes`)
- **Demo Requests** (`/admin/demo-requests`)
- **Leads Management** (`/admin/leads`)
- **Settings** (`/admin/settings`)

## Database Schema

### New Tables Created:

#### `demo_pages`
```sql
- id (UUID)
- slug (unique identifier for URL)
- client_name, company_name
- elevenlabs_agent_id
- status (draft/active/expired/archived)
- customization fields (colors, logo)
- content fields (hero, features, testimonials)
- security (password_protected, password)
- tracking (views_count, last_viewed_at)
- timestamps
```

#### `demo_analytics`
```sql
- id (UUID)
- demo_page_id (foreign key)
- event_type (view/widget_interaction/cta_click)
- visitor_id
- ip_address, user_agent
- metadata
- created_at
```

#### `demo_templates`
```sql
- id (UUID)
- name, description
- template_data (JSON)
- category
- is_default
```

## API Endpoints

### Admin APIs
- `GET/POST /api/admin/demos` - Demo page CRUD
- `GET /api/admin/templates` - Fetch templates
- `GET /api/admin/dashboard` - Dashboard data
- `GET /api/admin/analytics` - Analytics data

### Public APIs
- `GET /api/demo/[slug]` - Fetch demo page
- `POST /api/demo/[slug]/analytics` - Track events

## Key Features Implemented

### 1. **Template System**
- Pre-built templates for different industries
- Hair Salon, Medical Clinic, Restaurant, Professional Services
- One-click template application

### 2. **Analytics Integration**
- Automatic view tracking
- Event tracking (widget interactions, CTA clicks)
- Visitor identification
- Performance metrics

### 3. **Security**
- Password protection for sensitive demos
- Expiration date management
- Admin authentication
- Secure data handling

### 4. **User Experience**
- Drag-and-drop feature management
- Live preview during creation
- Responsive design
- Dark theme consistency
- Loading states and error handling

## Sample Demo Pages Created
1. **Smith's Hair Salon** (`/demo/smiths-salon-demo`)
   - Pink color scheme
   - Salon-specific features
   - 125 views

2. **HealthFirst Medical Clinic** (`/demo/healthfirst-clinic-demo`)
   - Blue color scheme
   - HIPAA compliance messaging
   - 89 views

## Next Steps & Recommendations

1. **Email Notifications**
   - Set up email alerts when demos are viewed
   - Weekly performance reports

2. **Advanced Analytics**
   - Integration with Google Analytics
   - Heatmap tracking
   - Session recording

3. **A/B Testing**
   - Multiple versions per client
   - Performance comparison

4. **White Labeling**
   - Custom domains for demos
   - Remove Atomiv branding option

5. **Lead Capture**
   - Forms within demo pages
   - Direct integration with CRM

## Technical Notes
- Built with Next.js 15, TypeScript, Tailwind CSS
- Supabase for database and real-time features
- shadcn/ui components for consistency
- ElevenLabs widget integration via script tag
- Responsive and mobile-optimized

The admin panel is fully functional and production-ready with comprehensive features for managing AI demo experiences for clients. 