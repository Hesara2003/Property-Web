# Property Scout - Unified Dashboard

## Overview

Property Scout is a property matching platform that connects buyers and sellers through an intelligent matching system with admin oversight and a pay-to-unlock model.

## App Structure & Workflow

### 🏠 Unified Dashboard (`/dashboard`)
- **Dual Mode Interface**: Users can toggle between "Buying" and "Selling" modes
- **Buying Mode**: 
  - Create property requests with specific criteria
  - View matched properties (locked until payment)
  - Track request status through approval workflow
- **Selling Mode**:
  - Add property listings for approval
  - Manage existing listings
  - View inquiries and matches

### 🔍 Property Request Workflow

1. **Buyer Submits Request** → Status: `pending`
2. **Admin Reviews** → Approves/Rejects → Status: `active` 
3. **System Finds Matches** → Creates potential matches
4. **Admin Reviews Matches** → Approves quality matches
5. **Seller Confirms Availability** → Match becomes `available`
6. **Buyer Pays to Unlock** → Gets full details & contact info

### 👑 Admin Dashboard (`/admin`)
- **Property Matches**: Review and approve system-generated matches
- **Purchase Requests**: Approve/reject buyer property requests  
- **Property Listings**: Approve/reject seller property listings
- **Overview**: System status and recent activity

### 🎯 Matches Page (`/matches`)
- **Match Status Tracking**:
  - `pending_admin`: Awaiting admin approval
  - `admin_approved`: Admin approved, awaiting seller
  - `seller_confirmed`/`available`: Ready to unlock
  - `unlocked`: Payment made, full details visible
- **Unlock System**: Pay LKR 5,000 to unlock property details
- **Contact Integration**: Direct seller contact after unlock

## Key Features

### 🔄 Status Management
- **Request Status**: `pending` → `active` → `matched` → `completed`
- **Match Status**: `pending_admin` → `admin_approved` → `available` → `unlocked`
- **Listing Status**: `pending` → `approved` → `active`

### 💰 Revenue Model
- **Unlock Fees**: Buyers pay to access full property details
- **Verification**: Admin-approved matches ensure quality
- **Seller Confirmation**: Ensures property availability

### 🛡️ Quality Control
- **Admin Oversight**: All matches reviewed before buyer access
- **Seller Verification**: Confirms current availability
- **Property Verification**: Listings approved before going live

## File Structure

```
app/
├── dashboard/
│   ├── page.tsx          # Unified buyer/seller dashboard
│   └── loading.tsx       # Loading state
├── admin/
│   ├── page.tsx          # Admin approval interface
│   └── loading.tsx       # Admin loading state
├── matches/
│   ├── page.tsx          # Property matches with unlock system
│   └── loading.tsx       # Match loading state
└── page.tsx              # Landing page (updated links)
```

## User Journey

### For Buyers:
1. Visit `/dashboard` → Switch to "Buying" mode
2. Create property request with criteria
3. Wait for admin approval
4. Receive notifications of approved matches
5. Pay unlock fee to view full details
6. Contact seller directly

### For Sellers:
1. Visit `/dashboard` → Switch to "Selling" mode  
2. Add property listing with details
3. Wait for admin approval
4. Receive match notifications when buyers interested
5. Confirm property availability when requested
6. Receive inquiries from unlocked matches

### For Admins:
1. Visit `/admin` dashboard
2. Review pending property requests → Approve quality requests
3. Review system-generated matches → Approve suitable matches
4. Review property listings → Approve legitimate listings
5. Monitor system health and user activity

## Revenue Streams

1. **Unlock Fees**: Primary revenue from buyers unlocking matches
2. **Premium Listings**: Enhanced visibility for sellers
3. **Verification Services**: Premium verification for high-value properties
4. **Subscription Plans**: Monthly plans for frequent users

## Technical Implementation

### State Management
- Uses React `useState` for local state
- Mock data for demonstration
- Status transitions handled through UI actions

### Matching Algorithm
- Location-based matching
- Price range compatibility  
- Bedroom/bathroom requirements
- Feature preferences
- Admin quality review

### Payment Integration
- Simulated unlock process
- Real integration would use Stripe/PayPal
- Fee structure: LKR 5,000 per unlock

## Next Steps

1. **Backend Integration**: Connect to real database and APIs
2. **Payment Gateway**: Implement actual payment processing
3. **Notification System**: Real-time updates for status changes
4. **Advanced Matching**: ML-based property recommendation
5. **Mobile App**: React Native implementation
6. **Analytics Dashboard**: Business intelligence for admins

## Getting Started

1. Navigate to `/` for the landing page
2. Click "Dashboard" to access the main interface
3. Toggle between Buying/Selling modes as needed
4. Use `/admin` for administrative functions
5. Visit `/matches` for detailed match management

The system provides a complete property marketplace with quality control, revenue generation, and user-friendly interfaces for all stakeholders.